import React, { Component } from 'react';
import { Icons } from '../../../assets';
import { router } from 'umi';
import { connect } from 'dva';
import Header from '../../../components/common/Header';
import styles from './index.less';
import Menus from '../../../components/common/Menus';
import Captcha from '../../../components/partials/Captcha';
import SmsCode from '../../../components/partials/SmsCode';
import { Toast } from 'antd-mobile';
import { REG } from '../../../utils/constants';
import { downFixed } from '../../../utils/utils';
import { formatMessage } from 'umi/locale';

const menus = [
  {
    value: 'dgt',
    label: 'DGT',
  },
  {
    value: 'usdt',
    label: 'USDT',
  },
];

@connect(({ withdraw, globalModel }) => ({ withdraw, globalModel }))
class Recharge extends Component {
  state = {
    showMenus: true,
    getSmsSuccess: false,
  };

  componentDidMount() {
    this.changeCoin(menus[1]);
    this.getCaptcha();
  }

  toggleShowMenus = e => {
    const { showMenus } = this.state;
    this.setState({ showMenus: !showMenus });
    e.stopPropagation();
  };

  changeCoin = coin => {
    const { dispatch } = this.props;
    dispatch({
      type: 'withdraw/UpdateState',
      payload: { coin },
    });
    dispatch({ type: 'withdraw/WithdrawInit' });
    this.setState({ showMenus: false });
  };

  getCaptcha = () => {
    this.props.dispatch({ type: 'globalModel/GetCaptcha' });
  };

  onWalletChange = value => {
    if (!REG.WALLET_ADDRESS.test(value)) {
      return;
    }
    this.props.dispatch({
      type: 'withdraw/UpdateState',
      payload: { walletTo: value },
    });
  };

  onAmountChange = value => {
    if (value && !/^[0-9.]+$/.test(value)) {
      return;
    }
    this.props.dispatch({
      type: 'withdraw/UpdateState',
      payload: { amount: value },
    });
  };

  onCodeChange = value => {
    this.props.dispatch({
      type: 'withdraw/UpdateState',
      payload: { code: value },
    });
  };

  onCaptchaChange = value => {
    this.props.dispatch({
      type: 'globalModel/UpdateState',
      payload: { captcha: value },
    });
  };

  getSmsCode = () => {
    const { captcha } = this.props.globalModel;
    if (!captcha) {
      Toast.info(formatMessage({ id: `COMMON_PLACEHOLDER_CAPTCHA` }));
      return;
    }
    this.props
      .dispatch({
        type: 'globalModel/GetSmsCode',
        payload: { type: 'cash' },
      })
      .then(res => {
        this.setState({ getSmsSuccess: res.status === 1 });
        if (res.status === 1) {
          Toast.info(formatMessage({ id: `TOAST_GET_CODE_SUCCESS` }));
          return;
        }
        Toast.info(res.msg || formatMessage({ id: `TOAST_GET_CODE_FAIL` }));
      });
  };

  onSubmit = () => {
    const { initInfo, walletTo, amount, code } = this.props.withdraw;
    if (!walletTo) return Toast.info(formatMessage({ id: `COMMON_PLACEHOLDER_WALLET_ADDRESS` }));

    if (!REG.WALLET_ADDRESS.test(walletTo))
      return Toast.info(formatMessage({ id: `TOAST_ERR_WALLET_ADDRESS` }));

    if (!amount) return Toast.info(formatMessage({ id: `COMMON_PLACEHOLDER_WITHDRAW_AMOUNT` }));
    if (initInfo.balance < amount)
      return Toast.info(formatMessage({ id: `TOAST_ERR_BALANCE_NOT_ENOUGH` }));

    if (!code) return Toast.info(formatMessage({ id: `COMMON_PLACEHOLDER_CODE` }));

    this.props.dispatch({ type: 'withdraw/Withdraw' }).then(res => {
      if (res.status !== 1) return Toast.info(res.msg);
      Toast.info(formatMessage({ id: `TOAST_SET_WITHDRAW_SUCCESS` }), 2, () =>
        window.location.reload(),
      );
    });
  };

  render() {
    const { showMenus, getSmsSuccess } = this.state;
    const { captchaSrc, captcha } = this.props.globalModel;
    const { coin, initInfo, walletTo, amount, code } = this.props.withdraw;
    const fee = amount * initInfo.serviceCharge;
    const realIncome = amount - fee;

    return (
      <div className={styles.withdraw} onClick={() => this.setState({ showMenus: false })}>
        <div className={styles.header}>
          <Header
            icon={Icons.arrowLeft}
            onHandle={() => router.push('/home/wallet')}
            centerContent={{
              text: coin.label,
              icon: Icons.arrowDown,
              reverse: true,
              onHandle: e => this.toggleShowMenus(e),
            }}
            rightContent={{
              icon: Icons.record,
              onHandle: () => router.push('/wallet/withdraw-record'),
            }}
          />
          {showMenus && (
            <div className={styles.menus}>
              <Menus menus={menus} hasBorder onHandle={this.changeCoin} />
            </div>
          )}
        </div>

        <div className={styles.content}>
          <div className={styles.row}>
            <small>
              {formatMessage({ id: `EXCHANGE_CAN_USE` })}：{initInfo.balance || '--'}
            </small>
          </div>
          <div className={styles.row}>
            <label>{formatMessage({ id: `WITHDRAW_ADDRESS` })}</label>
            <div className={styles.inputBox}>
              <input
                type="text"
                value={walletTo}
                placeholder={formatMessage({ id: `WITHDRAW_PLACEHOLDER` })}
                onChange={e => this.onWalletChange(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.row}>
            <label>数量（USDT）</label>
            <div className={styles.inputBox}>
              <input
                type="text"
                value={amount}
                placeholder={`${formatMessage({ id: `WITHDRAW_MIN` })}0.01`}
                onChange={e => this.onAmountChange(e.target.value)}
              />
            </div>
            <aside>
              {formatMessage({ id: `WITHDRAW_FEE` })}
              {initInfo.serviceCharge * 100 || '--'}%
            </aside>
          </div>
          <Captcha
            captchaSrc={captchaSrc}
            value={captcha}
            onChange={e => this.onCaptchaChange(e.target.value)}
            getCaptcha={this.getCaptcha}
          />
          <div className={styles.row}>
            <SmsCode
              value={code}
              getSmsSuccess={getSmsSuccess}
              getSmsCode={this.getSmsCode}
              onChange={this.onCodeChange}
            />
          </div>
          <div className={styles.group}>
            <small>{formatMessage({ id: `EXCHANGE_FEE` })}</small>
            <small>{fee ? downFixed(fee) : '--'}</small>
          </div>
          <div className={styles.group}>
            <span>{formatMessage({ id: `EXCHANGE_PAIDIN_AMOUNT` })}</span>
            <span>{realIncome ? downFixed(realIncome) : '--'}</span>
          </div>
        </div>
        <div className={styles.submit}>
          <button onClick={this.onSubmit}>{formatMessage({ id: `COMMON_SUBMIT` })}</button>
        </div>
        <aside className={styles.aside}>
          <label>{formatMessage({ id: `WITHDRAW_TIPS_TITLE` })}</label>
          <ul>
            <li>
              {formatMessage({ id: `WITHDRAW_TIPS_CONTENT_01` })} {initInfo.dayMax}
              IPT，{formatMessage({ id: `WITHDRAW_TIPS_CONTENT_02` })} {initInfo.amountMin || '--'}-
              {initInfo.amountMax || '--'} IPT，{formatMessage({ id: `WITHDRAW_TIPS_CONTENT_03` })}
              {initInfo.serviceCharge} IPT
            </li>
            <li>{formatMessage({ id: `WITHDRAW_TIPS_CONTENT_04` })}</li>
          </ul>
        </aside>
      </div>
    );
  }
}

export default Recharge;
