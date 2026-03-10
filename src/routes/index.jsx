import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

import { UserLayout } from "@/layouts/UserLayout";
import { AdminLayout } from "@/layouts/AdminLayout";

const Home = lazy(() => import("@/containers/Home"));
const Menu = lazy(() => import("@/containers/Menu"));
const Cart = lazy(() => import("@/containers/Cart"));
const Checkout = lazy(() => import("@/containers/Checkout"));
const CompletePayment = lazy(() => import("@/containers/CompletePayment"));

const Login = lazy(() => import("@/containers/Login"));
const Register = lazy(() => import("@/containers/Register"));

const Orders = lazy(() => import("@/containers/Admin/Orders"));
const NewProduct = lazy(() => import("@/containers/Admin/NewProduct"));
const EditProduct = lazy(() => import("@/containers/Admin/EditProduct"));
const Products = lazy(() => import("@/containers/Admin/Products"));

export function Router() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <Routes>

        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="cardapio" element={<Menu />} />
          <Route path="carrinho" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="complete-payment" element={<CompletePayment />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="pedidos" element={<Orders />} />
          <Route path="novo-produto" element={<NewProduct />} />
          <Route path="editar-produto" element={<EditProduct />} />
          <Route path="produtos" element={<Products />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Register />} />

      </Routes>
    </Suspense>
  );
}
