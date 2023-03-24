import { List, Datagrid, TextField, EditButton, Create, ReferenceInput} from "react-admin";
import { Edit, SimpleForm, TextInput } from 'react-admin';

export const ProdutoList = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="nome" />
      <TextField source="preco" />
      <EditButton />
    </Datagrid>
  </List>
);


export const ProdutoEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="nome" />
      <TextInput source="preco" />
    </SimpleForm>
  </Edit>
);

export const ProdutoCreate = () => (
<Create>
    <SimpleForm>
      <TextInput source="nome" />
      <TextInput source="preco" />
    </SimpleForm>
  </Create>
);
