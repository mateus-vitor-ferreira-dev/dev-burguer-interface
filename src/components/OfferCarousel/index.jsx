import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { api } from "../../services/api";
import { Container, Title } from "./styles";
import { CardProduct } from "../CardProduct";
import CarouselLoader from "../CarouselLoader";

import { formatPrice } from "../../utils/formatPrice";

export function OfferCarousel() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProductsInOffer() {
      const { data } = await api.get("/products");

      const onlyOffers = data
        .filter((product) => product.offer)
        .map((product) => ({
          currencyValue: formatPrice(product.price),
          ...product,
        }));

      setOffers(onlyOffers);
      setLoading(false);
    }

    loadProductsInOffer();
  }, []);

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 4 },
    desktop: { breakpoint: { max: 3000, min: 1280 }, items: 3 },
    tablet: { breakpoint: { max: 1280, min: 690 }, items: 3 },
    mobile: { breakpoint: { max: 690, min: 0 }, items: 2 },
  };

  return (
    <Container>
      <Title>Ofertas do Dia</Title>

      {loading ? (
        <CarouselLoader />
      ) : (
        <Carousel
          responsive={responsive}
          infinite
          partialVisible={false}
          itemClass="carousel-item"
        >
          {offers.map((product) => (
            <CardProduct key={product.id} product={product} />
          ))}
        </Carousel>
      )}
    </Container>
  );
}
