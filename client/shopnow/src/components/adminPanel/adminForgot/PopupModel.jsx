import React, { useState } from 'react';
import styles from './popupStyle.module.css';
import { Player, Controls } from '@lottiefiles/react-lottie-player';
const PopupModel = ({ isOpen, isClose, openModel }) => {
  const openGmail = () => {
    window.open('https://mail.google.com/', '_blank');
    isClose();
  };
  return (
    <div>
      {openModel && (
        <div className={styles.popup}>
          <div className={styles.popup_inner}>
            <div className={styles.closeBtn}>
              <span onClick={isClose}>X</span>
            </div>
            <Player
              autoplay
              loop
              src="https://lottie.host/9e91cc6a-0bc0-4dc4-a23a-551ff0b9f6b4/3UlNNHghls.json"
              className={styles.popupLottie}
            ></Player>
            <button onClick={openGmail}>Click to open your mail</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopupModel;
