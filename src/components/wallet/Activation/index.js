import { Component } from 'react';
import styles from './index.less';
import React from 'react';
import { Icons } from '../../../assets';
import { connect } from 'dva';
import { Toast } from 'antd-mobile';

@connect(({ wallet, globalModel }) => ({ wallet, globalModel }))
class Activation extends Component {
  onSubmit = () => {
    const { dispatch, globalModel } = this.props;
    const { myInfo } = globalModel;
    if (myInfo.dgt < 10) {
      return Toast.info('DID余额不足，请前往去中心化交易所购买');
    }
    dispatch({ type: 'wallet/ActivateRole' }).then(res => {
      if (res.status !== 1) {
        return Toast.info(res.msg);
      }
      Toast.info('激活成功', 2, () => {
        dispatch({ type: 'globalModel/GetMyInfo' });
      });
    });
  };

  render() {
    return (
      <div className={styles.activation}>
        <h3>
          <img src={Icons.dIcon} alt="" />
          激活ID
        </h3>
        <p>
          激活DID后您才可进行购买矿机，赚取收益，邀请好友等操作。
          <span>需支付 10 DID</span>
        </p>
        {/*<input type="text" placeholder="请输入DID邀请码"/>*/}
        {/*<p className={styles.hint}>需支付 10 DID</p>*/}
        <button onClick={this.onSubmit}>确认激活</button>
      </div>
    );
  }
}

export default Activation;
