import React, { Component } from 'react';
import { Icons } from '../../../../assets';
import { connect } from 'dva';
import { router } from 'umi';
import { formatMessage } from 'umi/locale';
import Header from '../../../../components/common/Header';
import styles from './index.less';
import Coins from '../../../../components/wallet/Coins';
import { Toast } from 'antd-mobile';

@connect(({ cnyRecharge }) => ({ cnyRecharge }))
class Index extends Component {
  state = {
    showMenus: false,
    steps: [
      {
        label: formatMessage({ id: 'RECHARGE_BY_ALIPAY' }),
        value: 0,
      },
      {
        label: formatMessage({ id: 'RECHARGE_BY_CARD' }),
        value: 1,
      },
    ],
    step: 0, // 0：支付宝 1：银行卡
  };

  componentDidMount() {
    this.props.dispatch({ type: 'cnyRecharge/GetRmbIni' });
  }

  changeStep = value => {
    this.setState({ step: value });
  };

  changeCoin = coin => {
    this.setState({ showMenus: false });
    if (coin === 'DGT') return;
    router.push('/home/recharge?type=' + coin);
  };

  changeAmount = amount => {
    const reg = /^\d+(\.)?\d{0,2}?$/;
    if (amount && !reg.test(amount)) {
      return;
    }
    this.props.dispatch({
      type: 'cnyRecharge/UpdateState',
      payload: { amount },
    });
  };

  submit = () => {
    const { minAmount, maxAmount, amount } = this.props.cnyRecharge;
    if (!amount) {
      return Toast.info(formatMessage({ id: `COMMON_PLACEHOLDER_RECHARGE_AMOUNT` }));
    }
    if (amount < minAmount) {
      return Toast.info(`${formatMessage({ id: `TOAST_MINIMUM_RECHARGE` })}${minAmount}`);
    }
    if (amount > maxAmount) {
      return Toast.info(`${formatMessage({ id: `TOAST_MAXIMUM_RECHARGE` })}${maxAmount}`);
    }

    // TODO 确认支付宝充值还是银行卡充值
    if (this.state.step === 1) {
      this.props
        .dispatch({
          type: 'cnyRecharge/RmbRecharge',
          payload: { payType: 'bank' },
        })
        .then(res => {
          if (res.status !== 1) {
            res.msg && Toast.info(res.msg);
            return;
          }
          console.log(res);
          router.push({
            pathname: '/home/cny/bank-pay',
            state: res.data,
          });
        });
      return;
    }
    this.props.dispatch({ type: 'cnyRecharge/RmbRecharge' }).then(res => {
      if (res.status !== 1) {
        res.msg && Toast.info(res.msg);
        return;
      }
      const { payimg: payImg, endtime: endTime, orderno: orderNo, num } = res.data;
      router.push({
        pathname: '/home/cny/alipay',
        state: { payImg, endTime, orderNo, num },
      });
    });
  };

  render() {
    const { step, steps, showMenus } = this.state;
    const { amountOptions, amount, minAmount, maxAmount } = this.props.cnyRecharge;
    // const { ratio } = this.props.dgtRecharge;
    // const realAmount = Number(amount) * Number(ratio);

    return (
      <div id={styles.cnyRecharge}>
        <div className={styles.header}>
          <Header
            icon={Icons.arrowLeft}
            title={formatMessage({ id: `DGT_RECHARGE_TITLE` })}
            rightContent={{
              icon: Icons.record,
              // text: formatMessage({ id: `DGT_RECORD_TITLE` }),
              onHandle: () => router.push('/fabi/rechargeRecord'),
            }}
          />
          <div className={`${styles.menus} ${showMenus ? styles.show : ''}`}>
            <Coins coin="DGT" onHandle={this.changeCoin} />
          </div>
        </div>
        <section className={styles.steps}>
          {steps.map(i => (
            <div
              key={i.value}
              className={`${styles.step} ${step === i.value ? styles.active : ''}`}
              onClick={() => this.changeStep(i.value)}
            >
              <span>{i.label}</span>
            </div>
          ))}
        </section>

        <section className={styles.inputContent}>
          <label>
            {/*<span>{formatMessage({ id: `DGT_RECHARGE_LABEL` })}</span>*/}
            <span>
              {step === 0
                ? formatMessage({ id: 'PAY_BY_ALIPAY' })
                : formatMessage({ id: `PAY_BY_CARD` })}
            </span>
            <input
              value={amount}
              type="text"
              autoComplete="off"
              placeholder={formatMessage({ id: `DGT_RECHARGE_PLACEHOLDER` })}
              onChange={e => this.changeAmount(e.target.value)}
            />
          </label>
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
