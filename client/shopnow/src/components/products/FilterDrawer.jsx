import {
  Drawer,
  Select,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { Rate, Slider, Button } from 'antd';
import React, { useState } from 'react';
import styles from './FilterDrawer.module.css';
import { MdArrowDropDown } from 'react-icons/md';
const FilterDrawer = ({
  category,
  setCategory,
  price,
  setPrice,
  setSize,
  rating,
  setRating,
  resetFilter,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div>
      <Button
        type="primary"
        style={{ backgroundColor: '#0DA487', padding: '0px 15px' }}
        onClick={onOpen}
      >
        Filter
      </Button>
      <Drawer placement={'left'} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Product Filter</DrawerHeader>
          <DrawerBody>
            <div className={styles.filterContainer}>
              {/* Add your filter components here */}

              <div className={styles.category}>
                <h2>Category</h2>
                <Select
                  icon={<MdArrowDropDown />}
                  placeholder="Select category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="electronics">Electronics</option>
                  <option value="sports">Sports</option>
                  <option value="accessories">Accessories</option>
                  <option value="fashion">Fashion</option>
                  <option value="beauty">Beauty</option>
                  <option value="furniture">Furniture</option>
                </Select>
              </div>

              <div className={styles.reating}>
                <h2>Reating</h2>
                <Rate allowHalf defaultValue={rating} onChange={setRating} />
              </div>

              <div className={styles.price}>
                <h2>Price</h2>
                <Slider
                  range
                  max={4999}
                  min={99}
                  defaultValue={price}
                  onChange={setPrice}
                />
                <span>From 99 To 4999</span>
              </div>
              <div className={styles.size}>
                <h2>Size</h2>
                <div>
                  <span onClick={() => setSize('xs')}>XS</span>
                  <span onClick={() => setSize('s')}>S</span>
                  <span onClick={() => setSize('m')}>M</span>
                </div>
                <div>
                  <span onClick={() => setSize('l')}>L</span>
                  <span onClick={() => setSize('xl')}>XL</span>
                  <span onClick={() => setSize('2xl')}>2XL</span>
                </div>
                <div>
                  <span onClick={() => setSize('28')}>28</span>
                  <span onClick={() => setSize('30')}>30</span>
                  <span onClick={() => setSize('32')}>32</span>
                </div>
                <div>
                  <span onClick={() => setSize('34')}>34</span>
                  <span onClick={() => setSize('36')}>36</span>
                  <span onClick={() => setSize('48')}>40</span>
                </div>
              </div>
              <Button onClick={resetFilter}>Reset</Button>
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default FilterDrawer;
