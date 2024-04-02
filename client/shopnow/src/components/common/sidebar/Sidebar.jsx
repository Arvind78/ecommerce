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
import { AiOutlineHome } from 'react-icons/ai';
import { BiCategoryAlt } from 'react-icons/bi';
import { MdOutlineContacts } from 'react-icons/md';
const { SubMenu } = Menu;
import styles from './style.module.css';
import { SiAboutdotme } from 'react-icons/si';
import { TfiHeadphoneAlt } from 'react-icons/tfi';
import { IoMdLogIn, IoMdLogOut } from 'react-icons/io';
import { CgEditShadows } from 'react-icons/cg';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { GoHeart } from 'react-icons/go';
import { logoutHandler } from '../../../utils/userApi';
import { logout } from '../../../store/userSlice';
import { ToastContainer, toast } from 'react-toastify';
function Sidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { currentUser } = useSelector((state) => state.user);
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    logoutHandler()
      .then((res) => {
        dispatch(logout());
        localStorage.removeItem('accessToken');
        toast.success(res.data.message, {
          theme: 'colored',
          autoClose: 3000,
          closeOnClick: true,
        });
        setTimeout(() => Navigate('/'), 4000);
      })
      .catch((err) => {
        return toast.error(err.response.data.message, {
          theme: 'colored',
          autoClose: 3000,
          closeOnClick: true,
        });
      });
  };

  const categoryChange=(path)=>{
    window.location.href=path
  }

  return (
    <>
      <RiMenuUnfoldLine
        size={25}
        style={{ cursor: 'pointer' }}
        onClick={onOpen}
      />
      <ToastContainer />
      <Drawer placement={'left'} onClose={onClose} isOpen={isOpen}>
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px" padding="0%">
            <div className={styles.accountContainer}>
              <Link to={currentUser ? '/myaccount' : '/login'}>
                <div className={styles.account}>
                  <Avatar src={currentUser?.profileImg} size="sm"></Avatar>
                  <div className={styles.accountInfo}>
                    <h3>Hi , {currentUser?.name || 'User'}</h3>
                    <span>My Account</span>
                  </div>
                </div>
                </Link>
              <Link to={currentUser ? '/myaccount' : '/login'}>
              <IconButton rounded={80} size="sm">
                <MdOutlineSettings size={20} />
              </IconButton>
              </Link>
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
                icon={<CgEditShadows size={16} />}
              >
                Product
              </Menu.Item>

              <Menu.Item
                key="wishlist"
                onClick={() => Navigate('/wishlist')}
                icon={<GoHeart />}
              >
                Wishlist
              </Menu.Item>
              <SubMenu key="SubMenu" icon={<BiCategoryAlt />} title="Category">
                <Menu.Item
                  key="electronics"
                  onClick={() => categoryChange('/product?category=electronics')}
                >
                  {' '}
                  Electronics{' '}
                </Menu.Item>

                <Menu.Item
                  key="sports"
                  onClick={() => categoryChange('/product?category=sports')}
                >
                  {' '}
                  Sports{' '}
                </Menu.Item>

                <Menu.Item
                  key="accessories"
                  onClick={() => categoryChange('/product?category=accessories')}
                >
                  {' '}
                  Accessories{' '}
                </Menu.Item>

                <Menu.Item
                  key="beauty"
                  onClick={() => categoryChange('/product?category=beauty')}
                >
                  {' '}
                  Beauty{' '}
                </Menu.Item>

                <Menu.Item
                  key="fashion"
                  onClick={() => categoryChange('/product?category=fashion')}
                >
                 
                  Fashion{' '}
                </Menu.Item>

                <Menu.Item
                  key="furniture"
                  onClick={() => categoryChange('/product?category=furniture')}
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

              <Menu.Item
                key="login"
                onClick={() => Navigate('/login')}
                icon={<IoMdLogIn size={16} />}
              >
                Login
              </Menu.Item>

              <Menu.Item
                key="logout"
                onClick={handleLogout}
                icon={<IoMdLogOut size={16} />}
              >
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
