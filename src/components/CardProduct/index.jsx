import { useState } from "react";
import PropTypes from "prop-types";
import Skeleton from "@mui/material/Skeleton";

import { Container, CardImage, ImageContainer } from "./styles";
import { CartButton } from "../CartButton";
import { useCart } from "../../hooks/CartContext";

export function CardProduct({ product }) {
  const { putProductInCart } = useCart();
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <Container>
      <ImageContainer>
        {imageLoading && (
          <Skeleton
            variant="rectangular"
            width="100%"
            height={120}
          />
        )}

        <CardImage
          src={`${product.url}?v=${product.updatedAt ?? product.path ?? product.id}`}
          alt={product.name}
          onLoad={() => setImageLoading(false)}
          style={{ display: imageLoading ? "none" : "block" }}
        />
      </ImageContainer>

      <div>
        <p>{product.name}</p>
        <strong>{product.currencyValue}</strong>
      </div>

      <CartButton onClick={() => putProductInCart(product)} />
    </Container>
  );
}

CardProduct.propTypes = {
  product: PropTypes.object,
};
