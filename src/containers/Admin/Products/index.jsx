import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { CheckCircleIcon, PencilIcon, XCircleIcon } from '@phosphor-icons/react';
import {
    Container,
    ContainerButton,
    ProductImage,
    EditButton,
} from "./styles"

import { api } from "../../../services/api"

import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';

import { formatPrice } from "../../../utils/formatPrice"

export default function Products() {
    const [products, setProducts] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        async function loadProducts() {
            const { data } = await api.get("/products");
            setProducts(data);
        }
        loadProducts();
    }, []);

    function isOffer(offer) {
        if(offer) {
            return <CheckCircleIcon color='green' size="32"/>
        } else {
            return <XCircleIcon color='red' size="32"/>
        }
    }

    function editProduct(product) {
        navigate('/admin/editar-produto', { state: { product } });
    }

    return (
        <Container>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>Nome</TableCell>
                            <TableCell align='center'>Preço</TableCell>
                            <TableCell align='center'>Produto em Oferta</TableCell>
                            <TableCell align='center'>Imagem do Produto</TableCell>
                            <TableCell align='center'>Editar Produto</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow
                                key={product.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {product.name}
                                </TableCell>

                                <TableCell align="center">
                                    {formatPrice(product.price)}
                                </TableCell>

                                <TableCell align="center">
                                    {isOffer(product.offer)}
                                </TableCell>

                                <TableCell align="center">
                                    <ProductImage src={product.url} alt={product.name} />
                                </TableCell>

                                <TableCell align="center">
                                    <ContainerButton>
                                        <EditButton onClick={() => editProduct(product)}>
                                            <PencilIcon />
                                        </EditButton>
                                    </ContainerButton>
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    )
}