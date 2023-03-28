import { List, Datagrid, TextField, EditButton, Create, ReferenceInput} from "react-admin";
import { Edit, SimpleForm, TextInput, SelectInput } from 'react-admin';
import { Pagination } from 'react-admin';
import { useEffect, useState } from 'react';
import { useGetOne } from 'react-admin';



export const ProdutoList = (props) => {

  return (
    <List {...props} page={2} perPage={5} pagination={<Pagination/>}>
      <Datagrid rowClick="edit">
        <TextField source="produto" />
        <TextField source="custo_total" />
        <TextField source="quantidade" />
        <TextField source="medida" />
        <TextField label="Preço (Un/Kg)" source="preco" />
        <EditButton />
      </Datagrid>
    </List>
);
}

export const ProdutoEdit = (props) => { 
  
  return (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="produto" />
      <TextInput source="custo" />
      <TextInput source="quantidade" />
      <TextInput source="medida" />
      <TextInput source="preco" />
    </SimpleForm>
  </Edit>
);
}


export const ProdutoCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="produto" />
      <TextInput source="quantidade" />
      <TextInput source="custo" />
      <SelectInput source="medida" choices={[
          { id: 'unidade', name: 'Unidade' },
          { id: 'peso', name: 'Peso' }
      ]} />
      <TextInput label="Preço (Un/Kg)" source="preco" />
    </SimpleForm>
  </Create>
);