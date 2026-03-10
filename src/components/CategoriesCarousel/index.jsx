import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { api } from "../../services/api";
import {
  Container,
  Title,
  ContainerItems,
  CategoryButton,
} from "./styles";

import { useNavigate, useSearchParams } from "react-router-dom";

export function CategoriesCarousel() {
  const [categories, setCategories] = useState([]);
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  useEffect(() => {
    async function loadCategories() {
      const response = await api.get("/categories");
      setCategories(response.data);
    }
    loadCategories();
  }, []);

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 4 },
    desktop: { breakpoint: { max: 3000, min: 1280 }, items: 3 },
    tablet: { breakpoint: { max: 1280, min: 690 }, items: 3 },
    mobile: { breakpoint: { max: 690, min: 0 }, items: 2 },
  };

  return (
    <Container>
      <Title>Categorias</Title>

      <Carousel
        responsive={responsive}
        infinite
        partialVisible={false}
        itemClass="carousel-item"
      >
        {categories.map((category) => (
          <ContainerItems
            key={category.id}
            $imageURL={category.url}
            onClick={() => {
              navigate(`/cardapio?categoria=${category.id}`);
            }}
          >
            <CategoryButton>
              {category.name}
            </CategoryButton>
          </ContainerItems>

        ))}
      </Carousel>
    </Container>
  );
}