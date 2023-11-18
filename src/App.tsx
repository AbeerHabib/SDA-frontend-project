import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { AppDispatch } from "./redux/store";
import { fetchUsers } from "./redux/slices/users/userSlice";
import { fetchProducts } from "./redux/slices/products/productSlice";
import { fetchCategories } from "./redux/slices/categories/categorySlice";
import { fetchOrders } from "./redux/slices/orders/orderSlice";

import Index from "./routes/Index";

import "./styles/App.css";
import "./styles/HomePageStyle.css";
import "./styles/AdminStyle.css";
import "./styles/ProductsStyle.css";
import "./styles/LoginStyle.css";
import "./styles/CartStyle.css";
import "./styles/UserStyle.css";

const App = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchProducts());
    dispatch(fetchCategories());
    dispatch(fetchOrders());
  }, []);

  return <Index />
}

export default App;