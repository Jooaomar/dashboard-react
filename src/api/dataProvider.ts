import { fetchUtils } from 'react-admin';
// import { fetchUtils } from "ra-core";
import { useDeleteMany } from 'react-admin';



const apiUrl = 'http://localhost:8080';
const httpClient = fetchUtils.fetchJson;


const dataProvider = {
  getList: async (resource, params) => {
    //  devovlve lista atualizada
    const url = `${apiUrl}/${resource}`;
    const { json } = await httpClient(url);

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
    const response = await fetch(url);
    const data = await response.json();
    return { data };
  },
  // outros métodos do react-admin podem ser implementados aqui

};

export default dataProvider