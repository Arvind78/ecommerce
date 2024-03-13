import { Tag } from 'antd';
import ViewProductModel from './ViewProductModel';
import { deleteProductById } from '../../../utils/adminPanelApi';
import { toast } from 'react-toastify';

export const productTableColumns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => (
      <p
        style={{
          width: '100px',
          display: '-webkit-box',
          WebkitLineClamp: 1,
          overflow: 'hidden',
          WebkitBoxOrient: 'vertical',
        }}
      >
        {text}
      </p>
    ),
  },
  {
    title: 'Price ($)',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Image',
    dataIndex: 'image',
    key: 'image',
    render: (url) => (
      <img
        src={url}
        style={{
          width: '50px',
          objectFit: 'contain',
          height: '60px',
        }}
      />
    ),
  },
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
  },
  {
    title: 'Subcategory',
    dataIndex: 'subCategory',
    key: 'subCategory',
  },
  {
    title: 'Brand',
    dataIndex: 'brand',
    key: 'brand',
  },
  {
    title: 'Color',
    dataIndex: 'color',
    key: 'color',
  },
  {
    title: 'Availability',
    dataIndex: 'isAvailable',
    key: 'isAvailable',
    render: (text) => {
      return text ? 'In Stock' : 'Out of Stock';
    },
  },
  {
    title: 'Rating',
    dataIndex: 'rating',
    key: 'rating',
  },
  {
    title: 'Update',
    dataIndex: 'update',
    key: 'update',
  },
  {
    title: 'Remove',
    dataIndex: 'delete',
    key: 'delete',
  },
];
