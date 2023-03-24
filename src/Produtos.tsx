import { List, Datagrid, TextField, EditButton, Create, ReferenceInput} from "react-admin";
import { Edit, SimpleForm, TextInput, SelectInput } from 'react-admin';
import { useState, useEffect } from 'react';



export const ProdutoList = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="produto" />
      <TextField source="custo" />
      <TextField source="quantidade" />
      <EditButton />
    </Datagrid>
  </List>
);

export const ProdutoEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="produto" />
      <TextInput source="custo" />
      <TextInput source="quantidade" />
    </SimpleForm>
  </Edit>
);


export const ProdutoCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="produto" />
      <TextInput source="quantidade" />
      <TextInput source="custo" />
    </SimpleForm>
  </Create>
);
