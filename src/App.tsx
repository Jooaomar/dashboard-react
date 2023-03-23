import { Admin, Resource, EditGuesser } from "react-admin";
import dataProvider from "./api/dataProvider";
import { ProdutoEdit, ProdutoList, ProdutoCreate } from "./Produtos";

const App = () => (
 <Admin dataProvider={dataProvider}>
   <Resource name="produtos" list={ProdutoList} edit={ProdutoEdit} create={ProdutoCreate} />
 </Admin>
);

export default App;