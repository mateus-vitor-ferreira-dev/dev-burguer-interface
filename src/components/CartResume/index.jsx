import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useCart } from '../../hooks/CartContext';
import { api } from '../../services/api';
import { formatPrice } from '../../utils/formatPrice';

import { Container } from './styles';
import { Button } from '../Button';

export function CartResume() {
    const [finalPrice, setFinalPrice] = useState(0);
    const [deliveryTax, setDeliveryTax] = useState(500); //5 reais

    const navigate = useNavigate();

    const { cartProducts, clearCart } = useCart();

    useEffect(() => {
        const sumAllItems = cartProducts.reduce((acc, current) => {
            return current.price * current.quantity + acc;
        }, 0);
        setFinalPrice(sumAllItems);
    }, [cartProducts]);

    const submitOrder = async () => {
        const products = cartProducts.map((product) => {
            return {
                id: product.id,
                quantity: product.quantity,
                price: product.price
            };
        });

        try {
            const response = await api.post('/create-payment-intent', { products });
            navigate('/checkout', {
                state: response.data,
            });
        } catch (err) {
            toast.error('Erro, tente novamente!',
                {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
        }

    };

    return (
        <div>
            <Container>
                <div className="container-top">
                    <h2 className="title">Resumo do Pedido</h2>
                    <p className="items">Itens</p>
                    <p className="items-price">{formatPrice(finalPrice)}</p>
                    <p className="delivery-tax">Taxa de Entrega</p>
                    <p className="delivery-tax-price">{formatPrice(deliveryTax)}</p>
                </div>
                <div className="container-bottom">
                    <p className='total'>Total</p>
                    <p className='total-price'>{formatPrice(finalPrice + deliveryTax)}</p>
                </div>
            </Container>

            <Button 
                onClick={submitOrder}
                disabled={cartProducts.length === 0}
            >
                    Finalizar Pedido
            </Button>
        </div>
    );
}