import React, { useEffect, useMemo, useState } from 'react';
import { fetchUserEnquiries } from '../../../utils/adminPanelApi';
import { Table, Tag } from 'antd';
import { enquiriesTableColumns } from './tableColumns';
import EnquiryModel from './EnquiryModel';
import styles from './Style.module.css';
import moment from 'moment';
import { Spinner } from '@chakra-ui/react';

const EnquiriesContent = () => {
  const [enquirydata, setEnquiryData] = useState([]);
  const [enquiryDetail, setEnquiryDetail] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchData = () => {
    setLoading(true);
    fetchUserEnquiries()
      .then((res) => {
        setEnquiryData(res.data.data);
        setEnquiryDetail(res.data.other);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        return setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const tableData = enquirydata.map((enquiry) => ({
    ...enquiry,
    key: enquiry._id,
    date: enquiry.createdAt,
    name: enquiry.name,
    email: enquiry.email,
    phone: enquiry.phone,
    message: enquiry.message,
    subject: enquiry.subject,
    status: (
      <Tag color={enquiry.status === 'success' ? 'success' : 'error'}>
        {enquiry.status}
      </Tag>
    ),
    update: <EnquiryModel data={enquiry} fetchData={fetchData} />,
  }));

  const handelSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = tableData.filter((item) => {
    if (searchTerm.trim() === '') {
      return tableData;
    } else {
      return (
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.date
          .toLowerCase()
          .includes(moment(searchTerm.toLowerCase()).format('DD-MMM-YYYY'))
      );
    }
  });
  const dataSource = searchTerm ? filteredData : tableData;
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

  return (
    <div>
      <div className={styles.enquiryDetailContainer}>
        <div className={styles.first}>
          <h2>Total Enquiries</h2>
          <span>{enquiryDetail?.totalEnquiry}</span>
        </div>
        <div className={styles.second}>
          <h2>Total Success Enquiries</h2>
          <span>{enquiryDetail?.totalSuccessEnquiry}</span>
        </div>
        <div className={styles.third}>
          <h2>Total Padding Enquiries</h2>
          <span>{enquiryDetail?.totalPadddingEnquiry}</span>
        </div>
        <div className={styles.fourth}>
          <h2>Today Enquiries</h2>
          <span>{enquiryDetail?.todayEnquiry}</span>
        </div>
        <div className={styles.fifth}>
          <h2>Today Success Enquiries</h2>
          <span>{enquiryDetail?.todaySucessEnquiry}</span>
        </div>
        <div className={styles.sixth}>
          <h2>Today Pending Enquiries</h2>
          <span>{enquiryDetail?.todayPendingEnquiry}</span>
        </div>
      </div>
      <div className={styles.searchInputContainer}>
        <input
          type="text"
          placeholder="Search enquiries..."
          value={searchTerm}
          onChange={handelSearch}
        />
      </div>
      <div className={styles.tableContainar}>
        <Table
          dataSource={dataSource}
          loading={loading}
          pagination={{ pageSize: 10 }}
          columns={enquiriesTableColumns}
        />
      </div>
    </div>
  );
};

export default EnquiriesContent;
