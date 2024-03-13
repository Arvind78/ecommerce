import React, { useEffect, useState } from 'react';
import { Tag } from 'antd';
import { Button, Form, Input, Modal, Select } from 'antd';
import {
  getProductById,
  updateProductById,
} from '../../../utils/adminPanelApi';
const { Option } = Select;

const ViewProductModel = ({ id }) => {
  const [product, setProducts] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    subCategory: '',
    brand: '',
    color: [],
    productSize: [],
    isAvailable: true,
    rating: 0,
  });

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    getProductById(id)
      .then((res) => {
        setProducts(res.data.product);
        setFormData({
          name: product.name,
          price: product.price,
          category: product.category,
          subCategory: product.subCategory,
          brand: product.brand,
          color: product.color,
          productSize: product.productSize,
          isAvailable: product.isAvailable,
          rating: product.rating,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isOpen]);

  const handleSubmit = () => {
    console.log(image);
    const data = new FormData();
    data.append('name', formData.name);
    data.append('price', formData.price);
    data.append('image', image);
    data.append('category', formData.category);
    data.append('subCategory', formData.subCategory);
    data.append('brand', formData.brand);
    data.append('color', formData.color);
    data.append('productSize', formData.productSize);
    data.append('isAvailable', formData.isAvailable);
    data.append('rating', formData.rating);
    updateProductById(id, data)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const sizeOptions = {
    na: [''],
    xs: ['28', '30', '32'],
    sm: ['30', '32', '34'],
    m: ['32', '34', '36'],
    l: ['34', '36', '38'],
    xl: ['36', '38', '40'],
    xxl: ['38', '40', '42'],
  };

  return (
    <div>
      <Tag color="blue" onClick={openModal}>
        View&Update
      </Tag>
      <Modal
        title="Add New Product"
        open={isOpen}
        onCancel={closeModal}
        footer={[
          <Button key="cancel" onClick={closeModal}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleSubmit}>
            Submit
          </Button>,
        ]}
      >
        <Form layout="vertical">
          <Form.Item label="Name" style={{ marginBottom: '8px' }}>
            <Input
              placeholder="Enter Product Name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Price" style={{ marginBottom: '8px' }}>
            <Input
              placeholder="Enter Product Price"
              value={formData.price}
              onChange={(e) => handleChange('price', e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Category" style={{ marginBottom: '8px' }}>
            <Input
              placeholder="Enter Product Category"
              value={formData.category}
              onChange={(e) => handleChange('category', e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Sub Category" style={{ marginBottom: '8px' }}>
            <Input
              placeholder="Enter Product Sub Category"
              value={formData.subCategory}
              onChange={(e) => handleChange('subCategory', e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Brand" style={{ marginBottom: '8px' }}>
            <Input
              placeholder="Enter Product Brand"
              value={formData.brand}
              onChange={(e) => handleChange('brand', e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Color" style={{ marginBottom: '8px' }}>
            <Select
              mode="tags"
              placeholder="Select or enter colors"
              value={formData.color}
              onChange={(value) => handleChange('color', value)}
            >
              <Option key="">N/A</Option>
              <Option key="red">Red</Option>
              <Option key="blue">Blue</Option>
              <Option key="green">Green</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Size" style={{ marginBottom: '8px' }}>
            <Select
              mode="tags"
              placeholder="Select or enter sizes"
              value={formData.productSize}
              onChange={(value) => handleChange('productSize', value)}
            >
              {Object.keys(sizeOptions).map((sizeCategory) =>
                sizeOptions[sizeCategory].map((size) => (
                  <Option
                    key={`${sizeCategory}-${size}`}
                  >{`${sizeCategory.toUpperCase()} ${size}`}</Option>
                ))
              )}
            </Select>
          </Form.Item>
          <Form.Item label="Image" style={{ marginBottom: '8px' }}>
            <input
              type="file"
              name="image"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ViewProductModel;
