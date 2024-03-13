import { Button, Form, Input, Modal, Select } from 'antd';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { addNewProduct } from '../../../utils/adminPanelApi';
import styles from './addProduct.module.css';
import Loading from 'react-loading';
const { Option } = Select;

const AddProductModel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [inputType, setInputType] = useState('file');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    subCategory: '',
    brand: '',
    color: [],
    productSize: [],
    isAvailable: true,
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

  const handleSubmit = () => {
    console.log(formData);

    if (
      formData.name === '' ||
      formData.price === '' ||
      formData.category === '' ||
      formData.subCategory === '' ||
      formData.brand === '' ||
      image === null
    ) {
      toast.error('Please fill in all fields');
      return;
    } else {
      const data = new FormData();
      data.append('image', image);
      data.append('name', formData.name);
      data.append('price', formData.price);
      data.append('category', formData.category);
      data.append('subCategory', formData.subCategory);
      data.append('brand', formData.brand);
      data.append('color', formData.color);
      data.append('productSize', formData.productSize);
      data.append('isAvailable', formData.isAvailable);
      setLoading(true);
      addNewProduct(data)
        .then((res) => {
          toast.success(res.data.message);
          setFormData({
            name: '',
            price: '',
            category: '',
            subCategory: '',
            brand: '',
            color: [],
            productSize: [],
            isAvailable: true,
          });
          setImage(null);
          setInputType('text');
        })
        .catch((err) => {
          return toast.error(err.response.data.message);
        })
        .finally(() => {
          setInputType('file');
          setLoading(false);
        });
    }
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
      <Button type="primary" onClick={openModal}>
        New Product
      </Button>
      <Modal
        title="Add New Product"
        open={isOpen}
        onCancel={closeModal}
        footer={[
          <Button key="cancel" onClick={closeModal}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleSubmit}>
            {loading ? (
              <div>
                <Loading type="bubbles" color="white" width={50} height={20} />
              </div>
            ) : (
              'Submit'
            )}
          </Button>,
        ]}
      >
        <ToastContainer />

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
            <Select
              mode="tags"
              placeholder="Select a category"
              value={formData.category}
              onChange={(value) => handleChange('category', value)}
            >
              <Option value="electronics">Electronics</Option>
              <Option value="sports">Sports</Option>
              <Option value="accessories">Accessories</Option>
              <Option value="fashion">Fashion</Option>
              <Option value="beauty">Beauty</Option>
              <Option value="furniture">Furniture</Option>
            </Select>
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
              <Option key="N/A">N/A</Option>
              <Option key="red">Red</Option>
              <Option key="blue">Blue</Option>
              <Option key="black">Black</Option>
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
              type={inputType}
              name="image"
              className={styles.imageInput}
              onChange={(e) => setImage(e.target.files[0])}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddProductModel;
