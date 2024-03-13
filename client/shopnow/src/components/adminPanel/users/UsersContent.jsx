import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { getUsers } from '../../../utils/adminPanelApi';
import { userTableColumns } from './tableColumns';
import styles from './Style.module.css';
import { Spinner } from '@chakra-ui/react';
import UserUpdateModel from './UserUpdateModel';

const UsersContent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userList, setUserList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await getUsers();
        setUserList(response.data.user); // Assuming the data structure has `users` property
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const userData = userList?.map((user, index) => ({
    no: index + 1,
    image: user.profileImg ? (
      <img src={user.profileImg} className={styles.image} />
    ) : null,
    name: user.name,
    email: user.email,
    phone: user.phone,
    update: <UserUpdateModel data={user} />,
  }));

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase()); // Ensure case-insensitive search
    const filteredUsers = userData.filter((user) => {
      const lowerName = user.name?.toLowerCase();
      const lowerEmail = user.email?.toLowerCase();
      const phoneNumber = user.phone?.toLowerCase();
      return (
        (lowerName && lowerName.includes(searchTerm)) ||
        (lowerEmail && lowerEmail.includes(searchTerm)) ||
        (phoneNumber && lowerEmail.includes(searchTerm))
      );
    });
    setFilteredData(filteredUsers);
  };

  const dataSource = searchTerm ? filteredData : userData;

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

  return (
    <div>
      <div className={styles.searchContainer}>
        <input
          type="text"
          value={searchTerm}
          placeholder="Search users..."
          onChange={handleSearch}
        />
      </div>
      <Table
        columns={userTableColumns}
        loading={isLoading}
        dataSource={dataSource}
        pagination={{ pageSize: 4 }}
      />
    </div>
  );
};

export default UsersContent;
