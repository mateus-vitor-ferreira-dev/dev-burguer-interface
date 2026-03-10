import PropTypes from 'prop-types';
import { useState } from 'react';

import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { toast } from 'react-toastify';

import { api } from '../../../services/api';
import { formatDate } from '../../../utils/formatDate';

import { ProductImage, SelectStatus } from './styles';
import { orderStatusOptions } from './orderStatus';

export function Row(props) {
    const { row, setOrders, orders } = props;
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState(row.status);
    const [loading, setLoading] = useState(false);

    async function newStatusOrder(id, newStatus) {
        try {
            setLoading(true);
            await api.put(`orders/${id}`, { status: newStatus });

            const newOrders = orders.map((order) => {
                if (order._id === id) {
                    return { ...order, status: newStatus };
                }
                return order;
            });

            setOrders(newOrders);
            setStatus(newStatus);

            toast.success("Status do pedido atualizado com sucesso!");
        } catch (error) {
            console.error(error);
            toast.error("Erro ao atualizar o status do pedido.");
        }

        finally {
            setLoading(false);
        }
    }

    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>

                <TableCell component="th" scope="row">
                    {row.orderId}
                </TableCell>

                <TableCell>
                    {row.order}
                </TableCell>

                <TableCell>
                    {formatDate(row.date)}
                </TableCell>

                <TableCell>
                    <SelectStatus
                        options={orderStatusOptions.filter((status) => status.id !== 0)}
                        placeholder="Status"
                        value={orderStatusOptions.find(
                            (option) => option.value === status
                        )}
                        onChange={(option) => newStatusOrder(row.orderId, option.value)}
                        isLoading={loading}
                        menuPortalTarget={document.body}
                    />
                </TableCell>
            </TableRow>

            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
                    <Collapse in={open} timeout="auto" unmountOnExit>

                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Pedido
                            </Typography>

                            <Table size="small">

                                <TableHead>
                                    <TableRow>
                                        <TableCell>Quantidade</TableCell>
                                        <TableCell>Produto</TableCell>
                                        <TableCell>Categoria</TableCell>
                                        <TableCell align="center">
                                            Imagem do Produto
                                        </TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {row.products.map((product) => (
                                        <TableRow key={product.id}>

                                            <TableCell component="th">
                                                {product.id}
                                            </TableCell>

                                            <TableCell>
                                                {product.name}
                                            </TableCell>

                                            <TableCell>
                                                {product.category}
                                            </TableCell>

                                            <TableCell align="center">
                                                <ProductImage
                                                    src={product.url}
                                                    alt={product.name}
                                                />
                                            </TableCell>

                                        </TableRow>
                                    ))}
                                </TableBody>

                            </Table>
                        </Box>

                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}

Row.propTypes = {
    orders: PropTypes.array.isRequired,
    setOrders: PropTypes.func.isRequired,
    row: PropTypes.shape({
        orderId: PropTypes.string.isRequired,
        order: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        products: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                category: PropTypes.string.isRequired,
                name: PropTypes.string.isRequired,
                price: PropTypes.number.isRequired,
                url: PropTypes.string.isRequired,
            }),
        ).isRequired,
        status: PropTypes.string.isRequired,
    }).isRequired,
};

