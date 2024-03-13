import React, { useState } from 'react';
import styles from './Style.module.css';
import { useDispatch } from 'react-redux';
import { addAddress } from '../../store/addressSlice';
import { isAddressValidate } from '../../utils/validation';
import { ToastContainer } from 'react-toastify';

const ShippingAddressModal = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [address, setAddress] = useState({
    title: '',
    address: '',
    country: '',
    state: '',
    city: '',
    pincode: '',
    phone: '',
  });

  const openModelHandel = () => {
    setIsOpen(true);
  };

  const closeModelHandel = () => {
    setIsOpen(false);
  };

  const handleChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (!isAddressValidate(address)) {
      return false;
    } else {
      dispatch(addAddress(address));
      setAddress({
        title: '',
        address: '',
        country: '',
        state: '',
        city: '',
        pincode: '',
        phone: '',
      });
      closeModelHandel();
    }
    return;
  };

  return (
    <div className={styles.addressContainer}>
      <h4 onClick={openModelHandel}>
        <b>&#43;</b> Add New
      </h4>
      {isOpen && (
        <div className={styles.model}>
          <div className={styles.content}>
            <ToastContainer />
            <div className={styles.Heading}>
              <h2>Add Address</h2>
              <span onClick={closeModelHandel}>X</span>
            </div>

            <div className={styles.Form}>
              <div className={styles.inputField}>
                <label htmlFor="">Title</label>
                <input
                  type="text"
                  name="title"
                  placeholder="Home, Office, etc"
                  value={address.title}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.inputField}>
                <label htmlFor="">Address</label>
                <input
                  type="text"
                  placeholder="Address"
                  name="address"
                  value={address.address}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.groupField}>
                <div>
                  <label htmlFor="">Country</label>
                  <input
                    type="text"
                    name="country"
                    placeholder="Country"
                    value={address.country}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="">State</label>
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={address.state}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className={styles.groupField}>
                <div>
                  <label htmlFor="">City</label>
                  <input
                    type="text"
                    placeholder="City"
                    name="city"
                    value={address.city}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="">Pincode</label>
                  <input
                    type="text"
                    name="pincode"
                    placeholder="Pincode"
                    value={address.pincode}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className={styles.inputField}>
                <label htmlFor="">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  value={address.phone}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.btnGoup}>
                <button onClick={closeModelHandel} className={styles.cancelBtn}>
                  Cancel
                </button>
                <button onClick={handleSubmit} className={styles.submitBtn}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShippingAddressModal;
