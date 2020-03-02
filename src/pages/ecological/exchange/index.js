import React, { Component } from 'react';
import { formatMessage } from 'umi/locale';
import { connect } from 'dva';
import { Toast, Button } from 'antd-mobile';
import PageHeader from '../../../components/common/PageHeader';
import Captcha from '../../../components/partials/Captcha';
import { COUNT_DOWN, REG } from '../../../utils/constants';
import styles from './index.less';
import { Icons } from '../../../assets';
import Menus from '../../../components/common/Menus';
import { downFixed } from '../../../utils/utils';

const beforeCoins = [{
  value: 'usdt',
  label: 'USDT',
}];

const afterCoins = [{
  value: 'did',
  label: 'DID',
}];

@connect(({ globalModel, exchange }) => ({ globalModel, exchange }))
class Index extends Component {
  state = {
    showBeforeMenus: false,
    showAfterMenus: false,
    count: COUNT_DOWN,
    timer: null,
  };

  componentDidMount() {
    this.getCaptcha();
    this.props.dispatch({
      type: 'exchange/ExchangeInit',
    }).then(res => {
      if (res.status !== 1) Toast.info(res.msg);
    });
  }

  getCaptcha = () => {
    this.props.dispatch({ type: 'globalModel/GetCaptcha' });
  };

  changeBeforeCoin = (coin) => {
    this.props.dispatch({ type: 'exchange/UpdateState', payload: { beforeCoin: coin } });
  };

  changeAfterCoin = (coin) => {
    this.props.dispatch({ type: 'exchange/UpdateState', payload: { afterCoin: coin } });
  };

  onAmountChange = (value) => {
    if (value && !/^[0-9.]+$/.test(value)) {
      return;
    }
    this.props.dispatch({
      type: 'exchange/UpdateState',
      payload: { amount: value },
    });
  };

  onCaptchaChange = (value) => {
    this.props.dispatch({
      type: 'globalModel/UpdateState',
      payload: { captcha: value },
    });
  };

  countDown = () => {
    const { timer } = this.state;
    clearInterval(Number(timer));
    this.setState({
      count: COUNT_DOWN,
      timer: setInterval(() => {
        let { count } = this.state;
        if (count && count >= 1) {
          this.setState({ count: count - 1 });
        } else {
          clearInterval(Number(timer));
        }
      }, 1000),
    });
  };

  getSmsCode = () => {
    const { dispatch } = this.props;
    const { captcha } = this.props.globalModel;
    if (!captcha) {
      Toast.info('请输入图形验证码');
      return;
    }
    this.countDown();
    dispatch({ type: 'globalModel/GetSmsCode', payload: { type: 'exchange' } })
      .then(res => {
        if (res.status === 1) {
          Toast.info('获取验证码成功');
          return;
        }
        clearInterval(Number(this.state.timer));
        Toast.info(res.msg || '获取验证码失败');
      });
  };

  onCodeChange = (value) => {
    if (value && !REG.NUMBER.test(value)) return;
    this.props.dispatch({
      type: 'exchange/UpdateState',
      payload: { code: value },
    });
  };

  onSubmit = () => {
    const { dispatch, exchange } = this.props;
    const { amount, balance, code } = exchange;
    if (!amount) return Toast.info('请输入兑换数量');
    if (amount > balance) return Toast.info('余额不足');
    if (!code) {
      return Toast.info('请输入手机验证码');
    }
    dispatch({ type: 'exchange/SubmitExchange' })
      .then(res => {
        if (res.status !== 1) return Toast.info(res.msg);
        Toast.info('兑换成功', 2, () => window.location.reload());
      });
  };

  render() {
    const { captchaSrc, captcha } = this.props.globalModel;
    const { beforeCoin, afterCoin, initInfo, balance, amount, code } = this.props.exchange;
    const { showBeforeMenus, showAfterMenus, count } = this.state;

    return (
      <div className={styles.exchange}>
        <PageHeader title="兑换" leftContent={{ icon: Icons.arrowLeft }}/>

        <div className={styles.wrapper} onClick={() => this.setState({ position: null })}>
          <div className={styles.mainContent}>
            <div className={styles.selectCurrency}>
              <span onClick={() => this.setState({ showBeforeMenus: !showBeforeMenus })}>
                {beforeCoin.label} <img src={Icons.arrowDown} alt=""/>
                {showBeforeMenus && (
                  <div className={styles.menus}>
                    <Menus
                      menus={beforeCoins}
                      active={beforeCoin.value}
                      hasBorder
                      textAlign="center"
                      onHandle={this.changeBeforeCoin}
                    />
                  </div>
                )}
              </span>
              <img
                style={{ transform: 'rotate(180deg)', margin: ' 0 60px' }}
                src={Icons.arrowLeft}
                alt=""
              />
              <span onClick={() => this.setState({ showAfterMenus: !showAfterMenus })}>
                {afterCoin.label} <img src={Icons.arrowDown} alt=""/>
                {showAfterMenus && (
                  <div className={styles.menus}>
                    <Menus
                      menus={afterCoins}
                      active={afterCoin.value}
                      hasBorder
                      textAlign="center"
                      onHandle={this.changeAfterCoin}
                    />
                  </div>
                )}
              </span>
            </div>
            <small className={styles.notice}>
              当前兑换比例：1 {beforeCoin.label} = {initInfo.RATIO || '--'} {afterCoin.label}
            </small>
            <label>
              <span className={styles.label}>兑换数量</span>
              <input
                type="text"
                autoComplete="off"
                value={amount}
                onChange={e => this.onAmountChange(e.target.value)}
                placeholder={`最小兑换数量${initInfo.MIN || '--'}`}
              />
              <p className={styles.tips}>
                可用{beforeCoin.label}：{balance}
                <small>手续费率：{initInfo.CHARGE * 100 || '--'}%</small>
              </p>
            </label>
            <Captcha
              captchaSrc={captchaSrc}
              value={captcha}
              onChange={e => this.onCaptchaChange(e.target.value)}
              getCaptcha={this.getCaptcha}
            />
            <label>
              <span className={styles.label}>手机验证码</span>
              <div className={styles.codeWrapper}>
                <input
                  type="number"
                  autoComplete="off"
                  value={code}
                  maxLength={4}
                  placeholder={formatMessage({ id: `COMMON_PLACEHOLDER_CODE` })}
                  onChange={e => this.onCodeChange(e.target.value)}
                />
                <button
                  disabled={count > 0 && count < COUNT_DOWN}
                  className={styles.codeNumber}
                  onClick={this.getSmsCode}
                >
                  {count > 0 && count < COUNT_DOWN
                    ? count + 's'
                    : formatMessage({ id: `REGISTER_GET_CODE` })}
                </button>
              </div>
            </label>

            <p className={`${styles.labelTag} ${styles.small}`}>
              手续费 <small>{downFixed(amount * initInfo.CHARGE) || '--'}</small>
            </p>
            <p className={styles.labelTag}>
              到账数量
              <small>
                {amount > initInfo.CHARGE * 100
                  ? downFixed(amount - amount * initInfo.CHARGE)
                  : '--'}
              </small>
            </p>
          </div>
          <p className={styles.reminder}>温馨提示：推广期间兑换手续费减免</p>
          <Button className={styles.btn} onClick={this.onSubmit}>
            确认
          </Button>
        </div>
      </div>
    );
  }
}

export default Index;
