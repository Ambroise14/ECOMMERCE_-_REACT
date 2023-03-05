
import Dashboard from "../components/admin/Dashboard";
import Profile from "../components/admin/Profile";
import Addcategory from "../components/Category/Addcategory";
import CategoryList from "../components/Category/CategogryList";
import CategoryEdit from "../components/Category/CategoryEdit";
import AddProduct from "../components/Product/AddProduct";
import ProductLit from "../components/Product/ProductList";
import Login from "../components/User/Login";
import Details2 from "../components/frontend/Details2";

import AddUser from "../components/User/Register";
import Test from "../Test/Test";
import DetailsProduct from "../components/frontend/DetailsProduct";
import EditProduct from "../components/Product/EditProduct";
import ViewCart from "../components/frontend/ViewCart";
import Checkout from "../components/frontend/Checkout";
import Historique from "../components/frontend/HistoriquePedido";
const routes=[
  {path:"/",exact:true,name:"Admin"},

  {path:"/dashboard",exact:true,name:"Dashboard",component:Dashboard},
  {path:"/profile",exact:true,name:"Profile",component:Profile},
  {path:"/admin/add-category",exact:true,name:"add-category",component:Addcategory},
  {path:"/admin/category/all",exact:true,name:"category/all",component:CategoryList},
  {path:"/admin/category/edit/:id",exact:true,name:"category/edit",component:CategoryEdit},



  {path:"/admin/product/add",exact:true,name:"/product/add",component:AddProduct},
  {path:"/admin/product/all",exact:true,name:"/product/all",component:ProductLit},
  {path:"/admin/product/test",exact:true,name:"/product/all",component:Test},



  {path:"/admin/user/register",exact:true,name:"/user/register",component:AddUser},

  {path:"/admin/user/login",exact:true,name:"/user/login",component:Login},

  {path:"/admin/product/detail/:id",exact:true,name:"details/product",component:DetailsProduct},
  {path:"/admin/product/detail2/:id",exact:true,name:"details/product",component:Details2},

  {path:"/admin/product/edit/:id",exact:true,name:"details/product",component:EditProduct},


  {path:"/admin/user/viewcart",exact:true,name:"/user/viewcart",component:ViewCart},
  {path:"/admin/user/checkout",exact:true,name:"/user/checkout",component:Checkout},


  {path:"/admin/user/checkout/historiquepedido",exact:true,name:"/user/historique",component:Historique},













];
export default routes;
