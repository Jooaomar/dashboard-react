import { fetchUtils } from 'react-admin';
// import { fetchUtils } from "ra-core";
import { useDeleteMany } from 'react-admin';
import axios from 'axios';


const apiUrl = 'https://api-petshob-production.up.railway.app';
const httpClient = fetchUtils.fetchJson;


const produtosDataProvider = {
  getList: async (resource, params) => {
    const { page, perPage } = params.pagination;
    const url = `${apiUrl}/${resource}?page=${page}&per_page=${perPage}`;
    const { data } = await axios.get(url);
  
    const pyres = data.items.map(item => ({ ...item, id: item.id }));
    const total = data.total_items;
  
    return { data: pyres, total };
  },

  
  deleteMany: async (resource, params) => {
    // Exclui a lista
    const { ids } = params;
    const url_del = `${apiUrl}/${resource}/${ids}`;
    const response = await fetch(url_del, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ids),
    });

    //  devovlve lista atualizada
    const url_list = `${apiUrl}/${resource}`;
    const { json } = await httpClient(url_list);

    const data = json.pyres.map((item) => {
      const [id, values] = item.item;
      return {
        id,
        ...values,
      };
    });

    return {
      data,
      total: data.length,
    };
  },
  
  getOne: async (resource, params) => {
    const { id } = params;
    const url = `${apiUrl}/${resource}/${id}`;
    // const response = await fetch(url);
    // const data = await response.json();
    const response = await axios({
      method: "get",
      url: url
    })
    const data = await response;
    return {
      data: { ...params.data, id: data.id },
    };
  },

  create: async (resource, params) => {
    const { produto, quantidade, preco, custo, date, medida} = params.data;
    const url = `${apiUrl}/${resource}/adicionar`;
    const response = await axios({
      method: "post",
      url: url,
      data: {
        // produto: produto,
        produto:produto,
        preco: preco,
        custo_total: custo,
        quantidade: quantidade,
        date: date,
        medida: medida
      },
    })
    const data = await response;
    return {
      data: { ...params.data, id: data.id },
    };
  },

  update: async (resource, params) => {
    const { id, data } = params;
    const url = `${apiUrl}/${resource}/edicao/${id}`;
    try {
      const response = await axios.post(url, data);
      return { 
        data: { ...params.data, id: data.id },
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
  // outros métodos do react-admin podem ser implementados aqui

};

export default produtosDataProvider
