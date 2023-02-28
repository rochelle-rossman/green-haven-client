import PropTypes from 'prop-types';
import {
  Table, TableBody, TableCell, TableHead, TableRow, TableContainer, Button,
} from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import { useRouter } from 'next/router';
import { formatCurrency } from '../../utils/utilityFunctions';

const rootStyle = {
  tableContainer: {
    height: '300px',
    overflow: 'auto',
    marginTop: '10px',
  },
};

export default function OrdersTable({ orders }) {
  const router = useRouter();
  return (
    <TableContainer sx={rootStyle}>
      <h3>Order History</h3>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>
              <b>Order #</b>
            </TableCell>
            <TableCell align="right">
              <b>Status</b>
            </TableCell>
            <TableCell align="right">
              <b>Total</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell component="th" scope="row">
                <Tooltip title="View Details" placement="right">
                  <Button onClick={() => router.push(`/user/order/${order.id}`)}>{order.id}</Button>
                </Tooltip>
              </TableCell>
              <TableCell align="right">{order.status}</TableCell>
              <TableCell align="right">{formatCurrency(order.total)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

OrdersTable.propTypes = {
  orders: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      status: PropTypes.string.isRequired,
      total: PropTypes.number.isRequired,
    }),
  ).isRequired,
};
