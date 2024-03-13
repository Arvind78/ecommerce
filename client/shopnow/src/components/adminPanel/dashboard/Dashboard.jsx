import React, { useState } from 'react';
import styles from './Style.module.css';
import { IoMenu } from 'react-icons/io5';
import {
  Avatar,
  AvatarBadge,
  Divider,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@chakra-ui/react';
import { MdAdminPanelSettings } from 'react-icons/md';
import { RiLogoutCircleRFill } from 'react-icons/ri';
import { Menu } from 'antd';
import DashboardContent from './DashboardContent';
import {
  MdDashboard,
  MdPeople,
  MdShoppingCart,
  MdStore,
  MdEmail,
} from 'react-icons/md';
import UsersContent from '../users/UsersContent';
import ProductsContent from '../product/ProductsContent';
import OrdersContent from '../order/OrdersContent';
import SettingsContent from '../settings/SettingsContent';
import EnquiriesContent from '../enquiry/EnquiriesContent';
import { IoMdSettings } from 'react-icons/io';

const Dashboard = () => {
  const [isSideMenuOpen, setSideMenuOpen] = useState(false);
  const [currentMenu, setCurrentMenu] = useState('dashboard');
  const isAdmin = JSON?.parse(sessionStorage.getItem('isAdminLogin'));
  console.log(isAdmin);
  const handleMenuClick = (e) => {
    setCurrentMenu(e.key);
  };
  const toggleSideMenu = () => {
    setSideMenuOpen(!isSideMenuOpen);
  };

  const logoutHandler = () => {
    sessionStorage.removeItem('isAdminLogin');
    window.location.reload();
  };

  return (
    <div className={styles.dashboardContainer}>
      <section
        className={isSideMenuOpen ? styles.sideMenuExpanded : styles.sideMenu}
      >
        <div className={styles.headerTitle}>
          <span className={styles.Logo}>S</span> <span>DASHBOARD</span>
        </div>
        <div className={styles.menuOption}>
          <Menu
            mode="inline"
            style={{ background: 'none', color: '#fff' }}
            defaultSelectedKeys={['dashboard']}
            onClick={handleMenuClick}
          >
            <Menu.Item key="dashboard" icon={<MdDashboard />}>
              Dashboard
            </Menu.Item>
            <Menu.Item key="orders" icon={<MdShoppingCart />}>
              Order
            </Menu.Item>
            <Menu.Item key="products" icon={<MdStore />}>
              Product
            </Menu.Item>
            <Menu.Item key="users" icon={<MdPeople />}>
              User
            </Menu.Item>

            <Menu.Item key="enquirys" icon={<MdEmail />}>
              Enquiry
            </Menu.Item>

            <Menu.Item key="settings" icon={<IoMdSettings />}>
              settings
            </Menu.Item>
            <Menu.Item
              key="logout"
              onClick={logoutHandler}
              icon={<RiLogoutCircleRFill />}
            >
              Logout
            </Menu.Item>
          </Menu>
        </div>
      </section>
      <section
        className={
          isSideMenuOpen ? styles.mainContentExpanded : styles.mainContent
        }
      >
        <div className={styles.headerSection}>
          <IoMenu className={styles.menuToggleIcon} onClick={toggleSideMenu} />
          <Popover>
            <PopoverTrigger>
              <Avatar src={isAdmin?.profileImg} className={styles.avatarIcon}>
                <AvatarBadge boxSize="1em" bg="green.500" />
              </Avatar>
            </PopoverTrigger>
            <PopoverContent
              style={{
                width: '120px',
                marginRight: '10px',
                padding: '2px 10px',
              }}
            >
              <div
                onClick={() => setCurrentMenu('settings')}
                className={styles.optionMenu}
              >
                <MdAdminPanelSettings />
                <span>Profile</span>
              </div>
              <hr />
              <div onClick={logoutHandler} className={styles.optionMenu}>
                <RiLogoutCircleRFill />
                <span> Logout</span>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        {/* Main content */}
        <div>
          {currentMenu === 'dashboard' && <DashboardContent />}
          {currentMenu === 'users' && <UsersContent />}
          {currentMenu === 'products' && <ProductsContent />}
          {currentMenu === 'orders' && <OrdersContent />}
          {currentMenu === 'settings' && <SettingsContent />}
          {currentMenu === 'enquirys' && <EnquiriesContent />}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
