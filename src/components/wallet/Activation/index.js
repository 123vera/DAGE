import { Component } from 'react';
import styles from './index.less';
import React from 'react';
import { Icons } from '../../../assets';

class Activation extends Component {
  render() {
    return <div className={styles.activation}>
      <h3>
        <img src={Icons.dIcon} alt=""/>
        激活ID
      </h3>
      <p>激活DID后您才可进行购买矿机，赚取收益，邀请好友等操作。</p>
      <input type="text" placeholder="请输入DID邀请码"/>
      <p className={styles.hint}>需支付 10 DGT</p>
      <button>确认激活</button>
    </div>;
  }
}

export default Activation;
