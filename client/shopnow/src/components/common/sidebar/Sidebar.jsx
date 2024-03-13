import {
  Avatar,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import { RiMenuUnfoldLine } from 'react-icons/ri';
import { MdOutlineSettings } from 'react-icons/md';
import { Menu } from 'antd';
import { AppstoreOutlined } from '@ant-design/icons';
import { AiOutlineHome } from 'react-icons/ai';
import { BiCategoryAlt } from 'react-icons/bi';
import { MdOutlineContacts } from 'react-icons/md';
const { SubMenu } = Menu;
import styles from './style.module.css';
import { SiAboutdotme } from 'react-icons/si';
import { TfiHeadphoneAlt } from 'react-icons/tfi';
import { IoMdLogOut } from 'react-icons/io';
import { CgEditShadows } from 'react-icons/cg';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { GoHeart } from 'react-icons/go';
function Sidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { currentUser } = useSelector((state) => state.user);
  const Navigate = useNavigate();
  return (
    <>
      <RiMenuUnfoldLine size={25} onClick={onOpen} />

      <Drawer placement={'left'} onClose={onClose} isOpen={isOpen}>
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px" padding="0%">
            <div className={styles.accountContainer}>
              <Link to="/myaccount">
                <div className={styles.account}>
                  <Avatar size="sm"></Avatar>
                  <div className={styles.accountInfo}>
                    <h3>Hi , {currentUser?.name || 'User'}</h3>
                    <span>My Account</span>
                  </div>
                </div>
              </Link>
              <IconButton rounded={80} size="sm">
                <MdOutlineSettings size={20} />
              </IconButton>
            </div>
          </DrawerHeader>
          <DrawerBody>
            <Menu mode="inline">
              <Menu.Item
                key="mail"
                onClick={() => Navigate('/')}
                icon={<AiOutlineHome fs />}
              >
                Home
              </Menu.Item>
              <Menu.Item
                key="product"
                onClick={() => Navigate('/product')}
                icon={<CgEditShadows />}
              >
                Product
              </Menu.Item>

              <Menu.Item
                key="product"
                onClick={() => Navigate('/wishlist')}
                icon={<GoHeart />}
              >
                Wishlist
              </Menu.Item>
              <SubMenu key="SubMenu" icon={<BiCategoryAlt />} title="Category">
                <Menu.Item
                  key="electronics"
                  onClick={() => Navigate('/product?category=electronics')}
                >
                  {' '}
                  Electronics{' '}
                </Menu.Item>

                <Menu.Item
                  key="sports"
                  onClick={() => Navigate('/product?category=sports')}
                >
                  {' '}
                  Sports{' '}
                </Menu.Item>

                <Menu.Item
                  key="accessories"
                  onClick={() => Navigate('/product?category=accessories')}
                >
                  {' '}
                  Accessories{' '}
                </Menu.Item>

                <Menu.Item
                  key="beauty"
                  onClick={() => Navigate('/product?category=beauty')}
                >
                  {' '}
                  Beauty{' '}
                </Menu.Item>

                <Menu.Item
                  key="fashion"
                  onClick={() => Navigate('/product?category=fashion')}
                >
                  {' '}
                  Fashion{' '}
                </Menu.Item>

                <Menu.Item
                  key="furniture"
                  onClick={() => Navigate('/product?category=furniture')}
                >
                  {' '}
                  Furniture{' '}
                </Menu.Item>
              </SubMenu>
              <Menu.Item
                key="about"
                onClick={() => Navigate('/about')}
                icon={<SiAboutdotme />}
              >
                About Us
              </Menu.Item>
              <Menu.Item
                key="contect"
                onClick={() => Navigate('/contact')}
                icon={<MdOutlineContacts />}
              >
                Contect Us
              </Menu.Item>

              <Menu.Item key="logout" icon={<IoMdLogOut />}>
                Logout
              </Menu.Item>

              <div className={styles.support}>
                <TfiHeadphoneAlt size={22} />
                <div className={styles.supportInfo}>
                  <h3>24/7 Support Center</h3>
                  <span>+91 8948837171</span>
                </div>
              </div>
            </Menu>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default Sidebar;
