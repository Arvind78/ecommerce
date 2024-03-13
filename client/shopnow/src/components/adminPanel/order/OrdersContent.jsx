import React, { useEffect, useState } from 'react';
import { Table, Tag } from 'antd';
import { orderTableColumns } from './tableColumns';
import { fetchAdminOrders } from '../../../utils/adminPanelApi'; // Assuming fetchAdminOrders calls getAdminOrder
import { BsThreeDotsVertical } from 'react-icons/bs';
import styles from './Style.module.css';
import moment from 'moment';
import ViewOrderModal from './ViewOrderModel';
import { Spinner } from '@chakra-ui/react';

const OrdersContent = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [orderCounts, setOrderCounts] = useState([]);

  useEffect(() => {
    const fetchOrderData = async () => {
      setIsLoading(true);
      try {
        const response = await fetchAdminOrders();
        setOrders(response.data.data);
        setOrderCounts(response.data.orderCounts);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderData();
  }, [setIsOpen, isOpen]);

  if (isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '80vh',
        }}
      >
        <Spinner
          thickness="4px"
          speed="0.50s"
          emptyColor="gray.200"
          color="#38A169"
          size="lg"
        />
      </div>
    );
  }

  const formattedTableData = orders
    ?.map((order, index) => ({
      key: order.id,
      no: index + 1,
      date: moment(order?.createdAt).format('DD-MMM-YYYY'),
      customerName: order?.userId?.name,
      phoneNumber: order?.userId?.phone,
      amount: `$ ${order?.amount}`,
      orderStatus: (
        <Tag
          color={
            order.status === 'completed'
              ? 'success'
              : order.status === 'delivered'
                ? 'success'
                : 'error'
          }
        >
          {order?.status}
        </Tag>
      ),
      paymentStatus: (
        <Tag color={order.paymentStatus === 'paid' ? 'success' : 'error'}>
          {order.paymentStatus}
        </Tag>
      ),
      moreActions: (
        <ViewOrderModal id={order?._id} isOpen={isOpen} setIsOpen={setIsOpen} />
      ),
    }))
    .filter((item) => item); // Remove potentially undefined rows

  return (
    <div>
      <div className={styles.orderInfo}>
        {orderCounts.map((orderCount, index) => (
          <div className={styles.orderInfoGroup} key={index}>
            <span className={styles.title}>{orderCount._id}</span>
            <p className={styles.value}>{orderCount.count}</p>
          </div>
        ))}
      </div>

      <Table
        columns={orderTableColumns}
        loading={isLoading}
        dataSource={formattedTableData}
        pagination={{ pageSize: 7 }}
      />
    </div>
  );
};

export default OrdersContent;
