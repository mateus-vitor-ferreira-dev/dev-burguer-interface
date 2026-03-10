import { useEffect, useState } from "react"

import { CategoriesCarousel, OfferCarousel } from "../../components"
import ProductsLoader from "../../components/ProductsLoader"

import { Banner, Container } from "./styles"

export default function Home() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <main>
      <Banner>
        <h1>Bem-vindo(a)!</h1>
      </Banner>

      <Container>
        {loading ? (
          <ProductsLoader />
        ) : (
          <div>
            <CategoriesCarousel />
            <OfferCarousel />
          </div>
        )}
      </Container>
    </main>
  )
}
