import React from 'react';
import WECHAT_MSG from '@/assets/dark/wechat-msg.jpg';
import styles from './index.less';

export default function WechatMsg(props) {
  // const { closeShade } = props;
  return (
    // <div className={styles.tipBox} onClick={closeShade}>
    <div className={styles.tipBox}>
      <img src={WECHAT_MSG} alt="" />
    </div>
  );
}
