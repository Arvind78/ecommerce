import React, { useEffect, useState } from 'react';
import styles from './DashboardContent.module.css';
import SalesPieChart from '../charts/SalesPieChart';
import SalesByMonthChart from '../charts/SalesByMonthChart';
import SalesByCategoryChart from '../charts/SalesByCategoryChart';
import { dashboardData } from './../../../utils/adminPanelApi';
import { Spinner } from '@chakra-ui/react';
const DashboardContent = () => {
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dashboardData()
      .then((res) => {
        setSalesData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  if (loading) {
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

  const quaterSalesData = salesData?.quarterlySales?.map((item) => ({
    name: item.quarter,
    y: item.totalAmount,
  }));

  const categorySalesData = salesData?.salesByCategory?.map((item) => ({
    name: item.category,
    y: item.amount,
  }));

  const monthlySalesData = salesData?.monthlySales?.map((item) => ({
    name: item.month,
    y: item.totalAmount,
  }));

  console.log(monthlySalesData);
  return (
    <div className={styles.mainContainer}>
      <div className={styles.salesInfoContainer}>
        <div className={styles.first}>
          <span>Total Sales </span>
          <p> $ {salesData?.totalSales}</p>
        </div>

        <div className={styles.second}>
          <span>Total Units </span>
          <p> {salesData?.totalUnits}</p>
        </div>

        <div className={styles.third}>
          <span>Total Tax </span>
          <p>$ {salesData?.totalTaxs?.toFixed(2)}</p>
        </div>

        <div className={styles.fourth}>
          <span>Total Shipping </span>
          <p>$ {salesData?.totalShipping?.toFixed(2)}</p>
        </div>
      </div>

      <div className={styles.salesChartContainer}>
        <div className={styles.chartSection}>
          <div>
            <SalesPieChart data={quaterSalesData} />
          </div>

          <div>
            <SalesByCategoryChart data={categorySalesData} />
          </div>
        </div>
        <div className={styles.chartSection2}>
          <div>
            <SalesByMonthChart data={monthlySalesData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
