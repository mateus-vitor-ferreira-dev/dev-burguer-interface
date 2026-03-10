import Skeleton from "@mui/material/Skeleton"
import {
  Container,
  ProductCard
} from "./styles"

function ProductsLoader() {
  return (
    <Container>
      {[1,2,3,4,5,6].map(item => (
        <ProductCard key={item}>
          <Skeleton variant="rectangular" width="100%" height={150} />

          <Skeleton variant="text" width="80%" height={30} />

          <Skeleton variant="text" width="40%" height={30} />

          <Skeleton variant="rounded" width="100%" height={40} />
        </ProductCard>
      ))}
    </Container>
  )
}

export default ProductsLoader
