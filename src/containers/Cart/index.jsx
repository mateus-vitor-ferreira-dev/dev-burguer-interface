import {
    Container,
    Banner,
    Title,
    Content,
} from './styles';

import Logo from '../../assets/Logo.png';
import { CartItems, CartResume } from '../../components';

export default function Cart() {
    return (
        <Container>
            <Banner>
                <img src={Logo} alt="Logo dev burguer"></img>
            </Banner>
            <Title>Checkout - Pedido</Title>
            <Content>
                <CartItems/>
                <CartResume />
            </Content>
        </Container>
    )
}