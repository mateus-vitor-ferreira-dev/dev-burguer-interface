import { useEffect, useState } from 'react';

import { CardProduct } from '../../components/CardProduct';
import { BackButton } from '../../components/BackButton';
import { api } from '../../services/api';
import { formatPrice } from '../../utils/formatPrice';
import {
    Container,
    Banner,
    CategoryMenu,
    ProductsContainer,
    CategoryButton,
} from './styles';

import { useSearchParams } from 'react-router-dom';


export default function Menu() {

    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchParams] = useSearchParams();

    const [activeCategory, setActiveCategory] = useState(() => {
        return Number(searchParams.get("categoria")) || 0;
    });


    useEffect(() => {
        async function loadCategories() {
            const { data } = await api.get("/categories");

            const newCategoriies = [{ id: 0, name: "Todos" }, ...data];

            setCategories(newCategoriies);
        }

        async function loadProducts() {
            const { data } = await api.get("/products");

            const newProducts = data.map((product) => ({
                currencyValue: formatPrice(product.price),
                ...product,
            }));
            setProducts(newProducts);
        }
        loadCategories();
        loadProducts();
    }, []);

    useEffect(() => {
        if (activeCategory === 0) {
            setFilteredProducts(products);
        } else {
            const newFilteredProducts = products.filter(
                (product) => Number(product.category_id) === Number(activeCategory)
            );

            setFilteredProducts(newFilteredProducts);
        }
    }, [products, activeCategory])

    useEffect(() => {
        const categoria = Number(searchParams.get("categoria")) || 0;

        setActiveCategory(categoria);

    }, [searchParams]);



    return (
        <Container>

            <Banner>
                <BackButton>
                    Voltar
                </BackButton>
                <h1>
                    O MELHOR
                    <br />
                    HAMBURGUER
                    <br />
                    ESTÁ AQUI!
                    <br />
                    <span>Esse cardápio está irresistível</span>
                </h1>

            </Banner>

            <CategoryMenu>
                {categories.map((category) => (
                    <CategoryButton
                        key={category.id}
                        $isActiveCategory={category.id === activeCategory}
                        to={`/cardapio?categoria=${category.id}`}
                    >

                        {category.name}
                    </CategoryButton>
                ))}
            </CategoryMenu>

            <ProductsContainer>
                {filteredProducts.map((product) => (
                    <CardProduct key={product.id} product={product} />
                ))}
            </ProductsContainer>

        </Container>
    );
}