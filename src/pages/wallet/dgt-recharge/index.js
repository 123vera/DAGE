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
  };

  componentDidMount() {
    this.props.dispatch({ type: 'dgtRecharge/GetRmbIni' });
  }

  changeCoin = coin => {
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
    const { minAmount, maxAmount, amount } = this.props.dgtRecharge;
    if (!amount) {
      return Toast.info(formatMessage({ id: `COMMON_PLACEHOLDER_RECHARGE_AMOUNT` }));
    }
    if (amount < minAmount) {
      return Toast.info(`${formatMessage({ id: `TOAST_MINIMUM_RECHARGE` })}${minAmount}`);
    }
    if (amount > maxAmount) {
      return Toast.info(`${formatMessage({ id: `TOAST_MAXIMUM_RECHARGE` })}${maxAmount}`);
    }

    this.props.dispatch({ type: 'dgtRecharge/RmbRecharge' }).then(res => {
      if (res.status !== 1) {
        res.msg && Toast.info(res.msg);
        return;
      }
      const { payimg: payImg, endtime: endTime, orderno: orderNo, num } = res.data;
      router.push({
        pathname: '/wallet/dgt_pay',
        state: { payImg, endTime, orderNo, num },
      });
    });
  };

  render() {
    const { showMenus } = this.state;
    const { amountOptions, amount, minAmount, maxAmount } = this.props.dgtRecharge;
    // const { ratio } = this.props.dgtRecharge;
    // const realAmount = Number(amount) * Number(ratio);

    return (
      <div id={styles.dgtRecharge}>
        <div className={styles.header}>
          <Header
            icon={Icons.arrowLeft}
            title={formatMessage({ id: `DGT_RECHARGE_TITLE` })}
            rightContent={{
              icon: Icons.record,
              // text: formatMessage({ id: `DGT_RECORD_TITLE` }),
              onHandle: () => router.push('/wallet/dgt_record'),
            }}
            onHandle={() => router.push('/main/home')}
          />
          <div className={`${styles.menus} ${showMenus ? styles.show : ''}`}>
            <Coins coin="DGT" onHandle={this.changeCoin}/>
          </div>
        </div>

        <section className={styles.inputContent}>
          <label>
            <span>{formatMessage({ id: `DGT_RECHARGE_LABEL` })}</span>
            <input
              value={amount}
              type="text"
              autoComplete="off"
              placeholder={formatMessage({ id: `DGT_RECHARGE_PLACEHOLDER` })}
              onChange={e => this.changeAmount(e.target.value)}
            />
          </label>
          {/* <p>
            {formatMessage({ id: `DGT_RECHARGE_RATIO` })}1 CNY = {ratio} DGT
          </p> */}
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
          {/* <p>
            {formatMessage({ id: `DGT_RECHARGE_ACTUAL_ARRIVAL` })}
            {realAmount || '--'} DGT
          </p> */}
          <button className={`${styles.btn} ${styles.submit}`} onClick={this.submit}>
            {formatMessage({ id: `DGT_RECHARGE_ALIPAY` })}
          </button>
        </section>

        <ul className={styles.tips}>
          <li>
            {formatMessage({ id: `DGT_RECHARGE_TIPS_00` })}
            {minAmount} RMB {formatMessage({ id: `DGT_RECHARGE_TIPS_01` })}
            {maxAmount} RMB {formatMessage({ id: `DGT_RECHARGE_TIPS_01_A` })}。
          </li>
          <li>{formatMessage({ id: `DGT_RECHARGE_TIPS_02` })}</li>
          <li>{formatMessage({ id: `DGT_RECHARGE_TIPS_03` })}</li>
          <li>{formatMessage({ id: `DGT_RECHARGE_TIPS_04` })}</li>
          <li>{formatMessage({ id: `DGT_RECHARGE_TIPS_05` })}</li>
          <li>{formatMessage({ id: `DGT_RECHARGE_TIPS_06` })}</li>
        </ul>
      </div>
    );
  }
}

export default Index;
