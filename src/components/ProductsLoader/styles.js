import styled from "styled-components"

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  width: 100%;
`

export const ProductCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 15px;
  border-radius: 10px;
  background: #fff;
`
