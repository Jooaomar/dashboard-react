import { Admin, Resource } from "react-admin";
import produtosDataProvider from "./api/dataProvider";
import vendasDataProvider from "./api/vendasDataProvider";
import { ProdutoEdit, ProdutoList, ProdutoCreate } from "./Produtos";
import { VendasList, VendasCreate } from "./Vendas";
import authProvider from '../src/api/authProvider';


const App = () => (
 <Admin authProvider={authProvider} dataProvider={produtosDataProvider}>
   <Resource name="produtos" list={ProdutoList} edit={ProdutoEdit} create={ProdutoCreate} />
   <Resource name="vendas" list={VendasList}  create={VendasCreate} />
 </Admin>
);

export default App;