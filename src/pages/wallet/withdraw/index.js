import React, { Component } from 'react';
import { Icons } from '../../../assets';
import { router } from 'umi';
import { connect } from 'dva';
import PageHeader from '../../../components/common/PageHeader';
import styles from './index.less';
import Captcha from '../../../components/partials/Captcha';
import SmsCode from '../../../components/partials/SmsCode';
import { Toast } from 'antd-mobile';
import { REG } from '../../../utils/constants';
import { downFixed } from '../../../utils/utils';
import { formatMessage } from 'umi/locale';
import { getLocale } from 'umi-plugin-locale';
import CoinSwitch from '../../../components/wallet/CoinSwitch';

@connect(({ withdraw, globalModel }) => ({ withdraw, globalModel }))
class Recharge extends Component {
  state = {
    showMenus: false,
  };

  componentDidMount() {
    this.getCaptcha();
    this.getInitCoins().then();
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'globalModel/UpdateState',
      payload: { captcha: '' },
    });
    this.clearInput();
  }

  clearInput = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'withdraw/UpdateState',
      payload: { walletTo: '', amount: '', code: '' },
    });
    dispatch({
      type: 'globalModel/UpdateState',
      payload: { captcha: '' },
    });
  };

  getInitCoins = async () => {
    const { dispatch, location } = this.props;
    const { type = '' } = location.query;

    const coins =
      (await dispatch({
        type: 'globalModel/GetCurrencyList',
        payload: {},
      })) || [];
    const coin = type || coins[0];
    const menus = coins.map(coin => ({
      label: coin,
      value: coin,
    }));
    await dispatch({
      type: 'withdraw/UpdateState',
      payload: { coin, menus },
    });
    this.changeCoin({
      label: coin,
      value: coin,
    });
  };

  toggleShowMenus = e => {
    const { showMenus } = this.state;
    this.setState({ showMenus: !showMenus });
    e.stopPropagation();
  };

  changeCoin = async menu => {
    const { dispatch } = this.props;
    await this.clearInput();
    await dispatch({ type: 'withdraw/WithdrawInit', payload: { coin: menu.value } });
    // await dispatch({ type: 'withdraw/UpdateState', payload: { coin: menu.value } });
    await this.setState({ showMenus: false });
    router.replace(`/wallet/withdraw?type=${menu.value}`);
  };

  getCaptcha = () => {
    this.props.dispatch({ type: 'globalModel/GetCaptcha' });
  };

  onWalletChange = value => {
    if (!REG.WALLET_ADDRESS.test(value)) {
      return;
    }
    const { dispatch } = this.props;
    dispatch({
      type: 'withdraw/UpdateState',
      payload: { walletTo: value },
    });

    setTimeout(() => {
      const { walletTo } = this.props.withdraw;
      if (value !== walletTo) return;
      dispatch({ type: 'withdraw/GetServiceCharge' });
    }, 500);
  };

  onAmountChange = value => {
    const reg = /^\d+(\.)?\d{0,2}?$/;
    if (value && !reg.test(value)) {
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

  getSmsCode = async () => {
    const { captcha } = this.props.globalModel;

    if (!captcha) {
      Toast.info(formatMessage({ id: `COMMON_PLACEHOLDER_CAPTCHA` }));
      return;
    }

    return this.props
      .dispatch({
        type: 'globalModel/GetSmsCode',
        payload: { type: 'cash' },
      })
      .then(res => {
        if (res.status === 1) {
          Toast.info(formatMessage({ id: `TOAST_GET_CODE_SUCCESS` }));
          return true;
        }
        Toast.info(res.msg || formatMessage({ id: `TOAST_GET_CODE_FAIL` }));
        return false;
      });
  };

  onSubmit = () => {
    const { initInfo, walletTo, amount, code } = this.props.withdraw;

    if (!walletTo) return Toast.info(formatMessage({ id: `COMMON_PLACEHOLDER_WALLET_ADDRESS` }));

    if (!REG.WALLET_ADDRESS.test(walletTo))
      return Toast.info(formatMessage({ id: `TOAST_ERR_WALLET_ADDRESS` }));

    if (!amount) return Toast.info(formatMessage({ id: `COMMON_PLACEHOLDER_WITHDRAW_AMOUNT` }));

    if (initInfo.balance < Number(amount))
      return Toast.info(formatMessage({ id: `TOAST_ERR_BALANCE_NOT_ENOUGH` }));

    if (!code) return Toast.info(formatMessage({ id: `COMMON_PLACEHOLDER_CODE` }));

    this.props.dispatch({ type: 'withdraw/Withdraw' }).then(res => {
      if (res.status === 1) {
        Toast.info(formatMessage({ id: `TOAST_SET_WITHDRAW_SUCCESS` }), 2, () =>
          window.location.reload(),
        );
      } else {
        res.msg && Toast.info(res.msg);
      }
      // if (res.status !== 1) return Toast.info(res.msg);
      // Toast.info(formatMessage({ id: `TOAST_SET_WITHDRAW_SUCCESS` }), 2, () =>
      //   window.location.reload(),
      // );
    });
  };

  render() {
    const { showMenus } = this.state;
    const { captchaSrc, captcha } = this.props.globalModel;
    const { coin, initInfo, walletTo, amount, code, menus } = this.props.withdraw;

    // 计算收入和手续费
    let { serviceCharge } = this.props.withdraw;
    serviceCharge =
      walletTo && serviceCharge !== undefined ? serviceCharge : initInfo.serviceCharge;
    const fee = serviceCharge ? Number(amount) * serviceCharge : 0.0;
    const realIncome = amount - fee;

    return (
      <div className={styles.withdraw}>
        <PageHeader
          title={formatMessage({ id: `WALLET_WITHDRAW` })}
          leftContent={{ icon: Icons.arrowLeft }}
          rightContent={{
            icon: Icons.record,
            onHandle: () => router.push(`/wallet/withdraw-record?type=${coin}`),
          }}
        />

        <div className={styles.selectArea} onClick={() => this.setState({ showMenus: !showMenus })}>
          <CoinSwitch
            showMenus={showMenus}
            coin={coin}
            menus={menus}
            click={() => this.setState({ showMenus: !showMenus })}
            change={this.changeCoin}
          />
        </div>

        <div className={styles.content}>
          <div className={styles.row}>
            <small>
              {formatMessage({ id: `EXCHANGE_CAN_USE` })}：{downFixed(initInfo.balance) || '--'}
            </small>
          </div>
          <div className={styles.row}>
            <label>{formatMessage({ id: `WITHDRAW_ADDRESS` })}</label>
            <div className={styles.inputBox}>
              <input
                type="text"
                value={walletTo}
                autoComplete="off"
                placeholder={formatMessage({ id: `WITHDRAW_PLACEHOLDER` })}
                onChange={e => this.onWalletChange(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.row}>
            <label>
              {formatMessage({ id: `RECORD_LI_AMOUNT` })}（{coin}）
            </label>
            <div className={styles.inputBox}>
              <input
                type="text"
                value={amount}
                autoComplete="off"
                onBlur={() =>
                  amount &&
                  this.props.dispatch({
                    type: 'withdraw/UpdateState',
                    payload: { amount: downFixed(amount) },
                  })
                }
                placeholder={`${formatMessage({ id: `WITHDRAW_MIN` })} ${initInfo.amountMin ||
                  '--'}`}
                onChange={e => this.onAmountChange(e.target.value)}
              />
            </div>
            <aside>
              {formatMessage({ id: `WITHDRAW_FEE` })}
              &nbsp;{serviceCharge !== '' ? downFixed(serviceCharge * 100) : '--'}%
            </aside>
          </div>
          <Captcha
            captchaSrc={captchaSrc}
            value={captcha}
            onChange={e => this.onCaptchaChange(e.target.value)}
            getCaptcha={this.getCaptcha}
          />
          <div className={styles.row}>
            <SmsCode value={code} getSmsCode={this.getSmsCode} onChange={this.onCodeChange} />
          </div>
          <div className={styles.group}>
            <small>{formatMessage({ id: `EXCHANGE_FEE` })}</small>
            <small>{amount ? downFixed(fee) : '--'}</small>
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
              {formatMessage({ id: `WITHDRAW_TIPS_CONTENT_01` })}
              {downFixed(initInfo.dayMax)}
              &nbsp;{coin}，{formatMessage({ id: `WITHDRAW_TIPS_CONTENT_02` })}
              {/* 英文语言下 文案显示不一样 */}
              {getLocale() === 'en-US' && downFixed(initInfo.amountMin || '--')}
              {/* 其他语言下 显示一样 */}
              {getLocale() !== 'en-US' &&
                (downFixed(initInfo.amountMin) || '--') +
                  ' - ' +
                  (downFixed(initInfo.amountMax) || '--')}
              &nbsp;{coin}，{formatMessage({ id: `WITHDRAW_TIPS_CONTENT_03` })}
              {serviceCharge !== '' ? downFixed(serviceCharge * 100, 1) : '--'}%
            </li>
            <li>{formatMessage({ id: `WITHDRAW_TIPS_CONTENT_04` })}</li>
          </ul>
        </aside>
      </div>
    );
  }
}

export default Recharge;
