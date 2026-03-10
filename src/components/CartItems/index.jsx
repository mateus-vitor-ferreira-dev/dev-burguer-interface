import { Table } from '../index';
import { useCart } from '../../hooks/CartContext';
import { formatPrice } from '../../utils/formatPrice';

import TrashIcon from '../../assets/Trash.svg';

import { ProductImage, ButtonGroup, EmptyCart, TrashImage } from './styles';

import { ProductTotalPrice } from '../../components/CartItems/styles';
export function CartItems() {
    const { cartProducts, increaseProduct, decreaseProduct, deleteProductFromCart } = useCart();

    return (
        <div>
            <Table.Root>
                <Table.Header>
                    <Table.Tr>
                        <Table.Th></Table.Th>
                        <Table.Th>Produtos</Table.Th>
                        <Table.Th>Preço</Table.Th>
                        <Table.Th>Quantidade</Table.Th>
                        <Table.Th>Total</Table.Th>
                        <Table.Th></Table.Th>
                    </Table.Tr>
                </Table.Header>
                <Table.Body>
                    {cartProducts?.length ? (
                        cartProducts.map((product) => (
                            <Table.Tr key={product.id}>
                                <Table.Td>
                                    <ProductImage src={product.url} alt={product.name} />
                                </Table.Td>
                                <Table.Td>{product.name}</Table.Td>
                                <Table.Td>{product.currencyValue}</Table.Td>
                                <Table.Td>
                                    <ButtonGroup>
                                        <button onClick={() => decreaseProduct(product.id)}>-</button>
                                        {product.quantity}
                                        <button onClick={() => increaseProduct(product.id)}>+</button>
                                    </ButtonGroup>
                                </Table.Td>
                                <Table.Td>
                                    <ProductTotalPrice>
                                        {formatPrice(product.quantity * product.price)}
                                    </ProductTotalPrice>
                                </Table.Td>
                                <Table.Td>
                                    <TrashImage
                                        src={TrashIcon}
                                        alt="Remover produto"
                                        onClick={() => deleteProductFromCart(product.id)}
                                    />
                                </Table.Td>
                            </Table.Tr>
                        ))
                    ) : (
                        <Table.Tr>
                            <Table.Td colSpan={6}>
                                <EmptyCart>Carrinho Vazio</EmptyCart>
                            </Table.Td>
                        </Table.Tr>
                    )
                    }
                </Table.Body>
            </Table.Root>
        </div>
    )
}