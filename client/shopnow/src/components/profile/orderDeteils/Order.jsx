import React, { useEffect, useState } from 'react';
import styles from './Style.module.css';
import { orderTableColums } from '../../../utils/tableColums';
import { Table, Tag } from 'antd';
import { getAllUserOrder } from '../../../utils/paymentApi';
import { useSelector } from 'react-redux';
import moment from 'moment';
import ViewOrderModel from '../viewOrderModel/ViewOrderModel';
const Order = () => {
  const [data, setData] = useState([]);

  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    getAllUserOrder(currentUser?._id)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  const tableData = data.map((data, index) => ({
    no: index + 1,
    trackingNumber: data.trackingId,
    date: moment(data.createdAt).format('DD/MM/YYYY'),
    amount: `$ ${data.amount}`,
    paymentStatus: (
      <Tag
        className={styles.paymentTag}
        color={data.paymentStatus == 'paid' ? 'success' : 'error'}
      >
        {data.paymentStatus}
      </Tag>
    ),
    option: <ViewOrderModel order={data} />,
  }));

  return (
    <div className={styles.mainContainer}>
      <Table
        dataSource={tableData}
        columns={orderTableColums}
        pagination={{ pageSize: 6 }}
      />
      ;
    </div>
  );
};

export default Order;
