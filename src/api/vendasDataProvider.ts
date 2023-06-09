import { fetchUtils } from 'react-admin';
// import { fetchUtils } from "ra-core";
import { useDeleteMany } from 'react-admin';
import axios from 'axios';


const apiUrl = 'http://localhost:8080';
const httpClient = fetchUtils.fetchJson;


const vendasDataProvider = {
  getList: async (resource, params) => {
    //  devovlve lista atualizada
    const url = `${apiUrl}/${resource}`;
    // const { json } = await httpClient(url);

    // const data = json.pyres.map((item) => {
    //   const [id, values] = item.item;
    //   return {
    //     id,
    //     ...values,
    //   };
    // });

    // return {
    //   data,
    //   total: data.length,
    // };
    const response = await axios.get(url);
    const data = response.data;
    const total = data.pyres.length; // Número de itens na lista
    const pyres = data.pyres.map((pyre) => {
      const id = pyre.item[0];
      const values = pyre.item[1];
      return { ...values, id };
    });
    return { 
      data: pyres,
      total: total,
    };
    
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
    const { date, valor, produto, quantidade } = params.data;
    const url = `${apiUrl}/${resource}/adicionar`;
    const response = await axios({
      method: "post",
      url: url,
      data: {
        data: date,
        valor: valor,
        produto: produto,
        quantidade: quantidade
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
      const response = await axios.put(url, data);
      return { 
        data: { ...params.data, id: data.id },
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
  // outros métodos do react-admin podem ser implementados aqui

};

export default vendasDataProvider