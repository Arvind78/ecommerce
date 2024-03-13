import React, { useEffect, useState } from 'react';
import { Input, Table, Tag } from 'antd';
import { productTableColumns } from './productTableColumns';
import AddProductModel from './AddProductModel';
import {
  deleteProductById,
  fetchAllProducts,
} from '../../../utils/adminPanelApi';
import { Spinner } from '@chakra-ui/react';

import styles from './Style.module.css';
import ViewProductModel from './ViewProductModel';
import { ToastContainer, toast } from 'react-toastify';

const ProductsContent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const getData = async () => {
    setIsLoading(true);
    try {
      const response = await fetchAllProducts();
      setProducts(response.data.products);
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

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

  const transformedProducts = products.map((product) => ({
    key: product._id, // Assuming _id is unique for each product
    name: product.name,
    price: product.price,
    image: product.image,
    category: product.category,
    subCategory: product.subCategory,
    brand: product.brand,
    color: product.color.map((color) => <Tag key={color}>{color}</Tag>), // Convert color array to Tag components
    isAvailable: product.isAvailable,
    rating: product.rating,
    update: <ViewProductModel id={product._id} />,
    delete: (
      <Tag
        color={'error'}
        onClick={() => {
          deleteProductById(product._id)
            .then(() => {
              getData();
            })
            .catch((err) => toast.error(err.response.data.message));
        }}
      >
        Remove
      </Tag>
    ),
  }));

  return (
    <div className={styles.container}>
      <ToastContainer />
      <div className={styles.header}>
        <input
          type="text"
          placeholder="Search Products..."
          className={styles.searchInput}
        />
        <AddProductModel className={styles.addProductModel} />
      </div>
      <Table
        columns={productTableColumns}
        loading={isLoading}
        dataSource={transformedProducts}
        pagination={{ pageSize: 4 }}
        className={styles.table}
      />
    </div>
  );
};

export default ProductsContent;
