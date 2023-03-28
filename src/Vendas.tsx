import { List, Datagrid, TextField, EditButton, Create, ReferenceInput, ReferenceField} from "react-admin";
import { Edit, SimpleForm, Pagination, TextInput, SelectInput, DateField, DateInput, required,DateFieldProps, DateTimeInput  } from 'react-admin';



export const VendasList = (props) => (
  <List {...props} 
    page={2} perPage={5} pagination={<Pagination/>}
    sort={{ field: 'timestamp', order: 'DESC',  }}
  >
    <Datagrid rowClick="edit">
      <TextField source="date" />
      <TextField source="estoque"/>
      <TextField source="produto" />
      <TextField source="preco" />
      <TextField source="quantidade"/>
      <TextField source="total_venda"/>
      <EditButton />
    </Datagrid>
  </List>
);

export const VendasCreate = (props) => (
    <Create {...props}>
      <SimpleForm>
        <DateInput source="date" label="data" validate={required()} />
        <TextInput source="preco" />
        <ReferenceInput label="Produto" source="produto" reference="produtos" allowEmpty>
            <SelectInput optionText="produto" />
        </ReferenceInput>
        <TextInput source="quantidade" />
      </SimpleForm>
    </Create>
);


export const VendasEdit = (props) => (
    <Edit {...props}>
      <SimpleForm>
        <TextInput source="id" disabled />
        <ReferenceInput label="Produto" source="produto" reference="produtos" allowEmpty>
            <SelectInput optionText="produto" />
        </ReferenceInput>
        <DateInput source="date" label="data" validate={required()} />
        <TextInput source="preco" />
        <TextInput source="quantidade" />
      </SimpleForm>
    </Edit>
  );