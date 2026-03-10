// src/containers/Checkout/index.jsx
import { Elements } from "@stripe/react-stripe-js";
import { useLocation } from "react-router-dom";
import stripePromise from "../../config/stripeConfig";
import { CheckoutForm } from "../../components";

export default function Checkout() {
  const location = useLocation();

  const clientSecret = location.state?.clientSecret;

  if (!clientSecret) {
    return <div>Erro, volte e tente novamente</div>;
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm />
    </Elements>
  );
}