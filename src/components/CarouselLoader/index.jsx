import Skeleton from "@mui/material/Skeleton"
import { Container, Card } from "./styles"

function CarouselLoader() {
  return (
    <Container>
      {[1,2,3,4].map(item => (
        <Card key={item}>
          <Skeleton variant="rectangular" width="100%" height={160} />
          <Skeleton variant="text" width="80%" height={25} />
          <Skeleton variant="text" width="40%" height={25} />
        </Card>
      ))}
    </Container>
  )
}

export default CarouselLoader
