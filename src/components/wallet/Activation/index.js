import { Component } from 'react';
import styles from './index.less';
import React from 'react';
import { Icons, Images } from '../../../assets';
import { connect } from 'dva';
import { Toast } from 'antd-mobile';
import { formatMessage } from 'umi-plugin-locale';
import GroupTitle from '../GroupTitle';
import { Link } from 'react-router-dom';

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
    const { myInfo } = this.props.globalModel;
    const isActivate = myInfo.activate === 1;

    return (
      <div className={styles.activation}>
        <GroupTitle
          icon={Icons.dIcon}
          title={formatMessage({ id: `WALLET_ACTIVITY_ID` })}
          msg={myInfo.activate === 1 ? '已激活' : '未激活'}
        />
        {!isActivate ?
          <div className={styles.content}>
            <p>
              <Link to="/wallet/recharge?type=USDT">充值USDT</Link>
              并在去中心化交易所
              <Link to="/exchange">兑换DID</Link>
              ，使用DID激活账户
            </p>
            <div className={styles.toActivation}>
              <span>消耗：10DID</span>
              <button onClick={this.onSubmit}>确认激活</button>
            </div>
          </div> :
          <div className={styles.content}>
            <p>
              <Link to="/wallet/withdraw?type=DID">转账DID</Link>
              给好友，好友激活成功后，可快速提升你的VIP等级，等级详情请在个人中心查看
            </p>
            <div className={styles.hasActivation}>
              <Link to="/wallet/reward-detail">推广收益详情</Link>
              <Link to='/referral_code'>获取邀请码</Link>
            </div>
          </div>
        }
        <div className={styles.banner} style={{ backgroundImage: `url(${Images.cardBg})` }}>
          <label>去中心化交易所</label>
          <small>
            使用闪电网络快速实现USDT
            <br/>
            与DID，DGT的兑换
          </small>
          <Link to="/exchange">立即闪兑</Link>
        </div>
      </div>
    );
  }
}

export default Activation;
