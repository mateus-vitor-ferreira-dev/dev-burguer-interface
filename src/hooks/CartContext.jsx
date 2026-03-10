import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext({});

export const CartProvider = ({ children }) => {
    const [cartProducts, setCartProducts] = useState([]);


    const putProductInCart = (product) => {
        const cartIndex = cartProducts.findIndex((prd) => prd.id === product.id);

        let newProductsInCart = [];

        if (cartIndex >= 0) {
            newProductsInCart = cartProducts;
                newProductsInCart[cartIndex].quantity += 1;

            setCartProducts(newProductsInCart);
        } else {
            product.quantity = 1;
            newProductsInCart = [...cartProducts, product];
            setCartProducts(newProductsInCart);
        }

        updateLocalStorage(newProductsInCart);
    }


    const clearCart = () => {
        setCartProducts([]);
        updateLocalStorage([]);
    }

    const deleteProductFromCart = (productId) => {
        const newCart = cartProducts.filter((prd) => prd.id !== productId);

        setCartProducts(newCart);
        updateLocalStorage(newCart);
    }

    const increaseProduct = (productId) => {
        const newCart = cartProducts.map((prd) => {
            return prd.id === productId ? { ...prd, quantity: prd.quantity + 1 } : prd;
        });
        setCartProducts(newCart);
        updateLocalStorage(newCart);
    }

    const decreaseProduct = (productId) => {
        const cartIndex = cartProducts.findIndex((prd) => prd.id === productId);

        if (cartProducts[cartIndex].quantity > 1) {
            const newCart = cartProducts.map((prd) => {
                return prd.id === productId ? { ...prd, quantity: prd.quantity - 1 } : prd;
            });
            setCartProducts(newCart);
            updateLocalStorage(newCart);
        } else {
            deleteProductFromCart(productId);
        }
    }

    const updateLocalStorage = (products) => {
        localStorage.setItem('devburguer:cartInfo', JSON.stringify(products))
    }

    useEffect(() => {
        const clienteCartData = localStorage.getItem('devburguer:cartInfo');

        if(clienteCartData) {
            setCartProducts(JSON.parse(clienteCartData));
        }
    }, []);

    return (
        <CartContext.Provider value={{ cartProducts, putProductInCart, clearCart, deleteProductFromCart, increaseProduct, decreaseProduct }}>
            {children}
        </CartContext.Provider>

    );
}

export const useCart = () => {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error('useCart must be a valid context')
    }
    return context;
}