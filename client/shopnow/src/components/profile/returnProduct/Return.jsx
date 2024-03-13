import React, { useEffect, useState } from 'react';
import styles from './Style.module.css';
import { Table, Tag } from 'antd';
import { returnTableColums } from '../../../utils/tableColums';
import { useSelector } from 'react-redux';
import { getReturnOrderRequest } from '../../../utils/returnOrderApi';
import moment from 'moment';
const Return = () => {
  const [data, setData] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    getReturnOrderRequest(currentUser?._id)
      .then((res) => {
        setData(res.data.returnOrder);
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  const tableData = data.map((item, index) => ({
    no: index + 1,
    orderId: item?.orderId,
    status: (
      <Tag
        className={styles.paymentTag}
        color={item.paymentStatus == 'completed' ? 'success' : 'error'}
      >
        {item?.orderStatus}
      </Tag>
    ),
    reason: item?.reason,
    paymentStatus: (
      <Tag
        className={styles.paymentTag}
        color={item.paymentStatus == 'paid' ? 'success' : 'error'}
      >
        {item.paymentStatus}
      </Tag>
    ),
    createAt: moment(item?.createAt).format('DD-MM-YYYY'),
  }));

  // console.log(item)
  return (
    <div className={styles.mainContainer}>
      <Table
        dataSource={tableData}
        columns={returnTableColums}
        pagination={{ pageSize: 6 }}
      />
    </div>
  );
};

export default Return;
