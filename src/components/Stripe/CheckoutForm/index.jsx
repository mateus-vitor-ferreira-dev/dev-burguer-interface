// src/components/Stripe/CheckoutForm/index.jsx
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";

import { useCart } from "../../../hooks/CartContext";
import { api } from "../../../services/api";
import "../styles.css";

export const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const { cartProducts, clearCart } = useCart();

    const navigate = useNavigate();
    const location = useLocation();
    const dpmCheckerLink = location.state?.dpmCheckerLink;

    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            toast.error("Stripe ou Elements com falha, tente novamente!");
            return;
        }

        if (!cartProducts || cartProducts.length === 0) {
            toast.error("Seu carrinho está vazio.");
            return;
        }

        setIsLoading(true);

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/complete-payment`,
            },
            redirect: "if_required",
        });

        if (error) {
            setMessage(error.message);
            toast.error(error.message);
            setIsLoading(false);
            return;
        }

        if (paymentIntent?.status === "succeeded") {
            try {
                const products = cartProducts.map((product) => ({
                    id: product.id,
                    quantity: product.quantity,
                    price: product.price,
                }));

                const { status } = await api.post(
                    "/orders",
                    { products },
                    { validateStatus: () => true }
                );

                if (status === 201 || status === 200) {
                    toast.success("Pedido realizado com sucesso!");
                    navigate(
                        `/complete-payment?payment_intent_client_secret=${paymentIntent.client_secret}`
                    );
                    clearCart();
                    setIsLoading(false);
                    return;
                }

                toast.error("Falha ao registrar o pedido.");
            } catch {
                toast.error("😭 Falha no sistema! Tente novamente");
            } finally {
                setIsLoading(false);
            }

            return;
        }

        if (paymentIntent?.client_secret) {
            navigate(
                `/complete-payment?payment_intent_client_secret=${paymentIntent.client_secret}`
            );
        } else {
            setMessage("Não foi possível confirmar o pagamento. Tente novamente.");
            toast.error("Não foi possível confirmar o pagamento. Tente novamente.");
        }

        setIsLoading(false);
    };

    const paymentElementOptions = { layout: "accordion" };

    return (
        <div className="container">
            <form id="payment-form" onSubmit={handleSubmit}>
                <PaymentElement id="payment-element" options={paymentElementOptions} />

                <button
                    className="button"
                    disabled={isLoading || !stripe || !elements}
                    id="submit"
                    type="submit"
                >
                    <span id="button-text">
                        {isLoading ? <div className="spinner" id="spinner" /> : "Pagar agora"}
                    </span>
                </button>

                {message && <div id="payment-message">{message}</div>}
            </form>

            <div id="dpm-annotation">
                <p>
                    Os métodos de pagamento são disponibilizados de acordo com a sua
                    região.&nbsp;
                    {dpmCheckerLink && (
                        <a
                            href={dpmCheckerLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            id="dpm-integration-checker"
                        >
                            Ver métodos de pagamentos disponíveis
                        </a>
                    )}
                </p>
            </div>
        </div>
    );
};