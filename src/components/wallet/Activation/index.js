import { Component } from 'react';
import styles from './index.less';
import React from 'react';
import { Icons } from '../../../assets';
import { connect } from 'dva';
import { Toast } from 'antd-mobile';
import { formatMessage } from 'umi-plugin-locale';

@connect(({ wallet, globalModel }) => ({ wallet, globalModel }))
class Activation extends Component {
  onSubmit = () => {
    const { dispatch, globalModel } = this.props;
    const { myInfo } = globalModel;
    if (myInfo.did < 10) {
      return Toast.info(formatMessage({ id: `EXCHANGE_BALANCE_NOT_ENOUGH_01` }));
    }
    dispatch({ type: 'wallet/ActivateRole' }).then(res => {
      if (res.status !== 1) {
        return Toast.info(res.msg);
      }
      Toast.info(formatMessage({ id: `EXCHANGE_SUCCESS_01` }), 2, () => {
        dispatch({ type: 'globalModel/GetMyInfo' });
      });
    });
  };

  render() {
    return (
      <div className={styles.activation}>
        <h3>
          <img src={Icons.dIcon} alt="" />
          {formatMessage({ id: `WALLET_ACTIVITY_ID` })}
        </h3>
        <p>
          {formatMessage({ id: `WALLET_ACTIVITY_DESC_01` })}
          <span> {formatMessage({ id: `WALLET_ACTIVITY_DESC_02` })}</span>
        </p>
        {/*<input type="text" placeholder="请输入DID邀请码"/>*/}
        {/*<p className={styles.hint}>需支付 10 DID</p>*/}
        <button onClick={this.onSubmit}>{formatMessage({ id: `WALLET_CONFIRM` })}</button>
      </div>
    );
  }
}

export default Activation;
