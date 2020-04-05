import React, { Component } from 'react';
import { Icons } from '../../../assets';
import { connect } from 'dva';
import { router } from 'umi';
import { formatMessage } from 'umi/locale';
import Header from '../../../components/common/Header';
import styles from './index.less';
import Coins from '../../../components/wallet/Coins';
import { Toast } from 'antd-mobile';

@connect(({ dgtRecharge }) => ({ dgtRecharge }))
class Index extends Component {
  state = {
    showMenus: false,
    activityKey: 0,
  };

  changeCoin = (coin) => {
    this.setState({ showMenus: false });
    if (coin === 'DGT') return;
    router.push('/wallet/recharge?type=' + coin);
  };

  changeAmount = amount => {
    const reg = /^\d+(\.)?\d{0,2}?$/;
    if (amount && !reg.test(amount)) {
      return;
    }
    this.props.dispatch({
      type: 'dgtRecharge/UpdateState',
      payload: { amount },
    });
  };

  submit = () => {
    const { amount, amountOptions } = this.props.dgtRecharge;
    const minAmount = Number(amountOptions[0]);
    const maxAmount = Number(amountOptions[amountOptions.length - 1]);
    if (!amount) {
      return Toast.info('请输入充值金额');
    }
    if (amount < minAmount) {
      return Toast.info(`最小充值金额为${minAmount}`);
    }
    if (amount > maxAmount) {
      return Toast.info(`最大充值金额为${maxAmount}`);
    }

    this.props.dispatch({ type: 'dgtRecharge/RmbRecharge' })
      .then(res => {
        if (res.status !== 1) {
          return Toast.info(res.msg);
        }
        const { payimg: payImg, endtime: endTime } = res.data;
        router.push({ pathname: '/wallet/dgt_pay', state: { payImg, endTime } });
      });
  };

  render() {
    const { showMenus } = this.state;
    const { ratio, amountOptions, amount } = this.props.dgtRecharge;
    const realAmount = Number(amount) * Number(ratio);

    return (
      <div id={styles.dgtRecharge}>
        <div className={styles.header}>
          <Header
            icon={Icons.arrowLeft}
            centerContent={{
              text: 'DGT法币充值',
              icon: Icons.arrowDown,
              reverse: true,
              onHandle: () => this.setState({ showMenus: !showMenus }),
            }}
            onHandle={() => router.push('/home/wallet')}
          />
          <div className={`${styles.menus} ${showMenus ? styles.show : ''}`}>
            <Coins coin="DGT" onHandle={this.changeCoin}/>
          </div>
        </div>

        <section className={styles.inputContent}>
          <label>
            <span>充值金额（支付宝支付）</span>
            <input
              value={amount}
              type="text"
              placeholder={'输入充值CNY数量'}
              onChange={(e) => this.changeAmount(e.target.value)}
            />
          </label>
          <p>当前汇率：1CNY = {ratio}DGT</p>
        </section>

        <section className={styles.amountList}>
          <ul>
            {amountOptions.map(i => (
              <li
                key={i}
                onClick={() => this.changeAmount(i)}
                className={amount === i ? styles.activity : ''}
              >
                {i}
              </li>
            ))}
          </ul>
          <p>实际到账：{realAmount || '--'} DGT</p>
          <button className={styles.btn} onClick={this.submit}>充值</button>
        </section>

        <ul className={styles.tips}>
          <li>3232323</li>
          <li>323</li>
          <li>• 单笔最小金额为200CNY，最大金额为20,000CNY。</li>
          <li>• 充值以实际到账金额为准。</li>
          <li>• 每次充值必须在钱包充值页面重新获取二维码。</li>
        </ul>
      </div>
    );
  }
}

export default Index;
