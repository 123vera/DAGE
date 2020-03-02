import React, { Component } from 'react';
import { formatMessage } from 'umi/locale';
import { connect } from 'dva';
import { Toast, Button } from 'antd-mobile';
import PageHeader from '@/components/common/PageHeader';
import Captcha from '../../../components/partials/Captcha';
// import SmsCode from '@/components/common/SmsCode';
import ARROW_LEFT from '@/assets/icons/arrow-left.png';
import ARROW_DOWN from '@/assets/icons/arrow-down.png';
import { COUNT_DOWN, REG } from '../../../utils/constants';
import styles from './index.less';

@connect(({ globalModel, login, exchange }) => ({ globalModel, login, exchange }))
class Index extends Component {
  state = {
    count: COUNT_DOWN,
    timer: null,
    position: null,
    currency1: 'USDT',
    currency2: 'DID',
    getSmsSuccess: false,
  };

  checkAside = (e, type) => {
    e.stopPropagation();
    if (type === 'left') {
      this.setState({ position: { left: '10%', display: 'block' } });
    } else {
      this.setState({ position: { right: '10%', display: 'block' } });
    }
  };

  getCaptcha = () => {
    this.props.dispatch({ type: 'exchange/GetCaptcha', payload: +new Date() });
  };

  countDown = () => {
    const { timer } = this.state;
    clearInterval(Number(timer));
    this.getSmsCode();
    this.state.getSmsSuccess &&
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
    const {
      dispatch,
      globalModel: { myInfo },
      exchange: { captcha },
    } = this.props;

    if (!captcha) {
      Toast.info('请输入图形验证码');
      return;
    }

    dispatch({
      type: 'exchange/GetSmsCode',
      payload: {
        prefix: myInfo.phonePrefix,
        phone: myInfo.phoneNo,
        imgcode: captcha,
        type: 'exchange',
      },
    }).then(res => {
      this.setState({ getSmsSuccess: res.status === 1 });
      if (res.status === 1) {
        Toast.info('获取验证码成功');
        return;
      }
      Toast.info(res.msg || '获取验证码失败');
    });
  };

  checkCurrency = val => {
    const { position } = this.state;
    const currency = position.left ? 'currency1' : 'currency2';

    this.setState({ [currency]: val });
  };

  onInputChange = (value, key) => {
    const { dispatch } = this.props;
    if (key !== 'captcha') {
      if (!REG.NUMBER.test(value)) return;
    }
    dispatch({
      type: 'exchange/UpdateState',
      payload: { [key]: value },
    });
  };

  ensureExchange = () => {
    const {
      dispatch,
      exchange: { balance },
    } = this.props;
    const { amount, smsCode, currency1, currency2 } = this.state;
    if (!amount) {
      Toast.info('请输入兑换数量');
      return;
    }
    if (amount > balance) {
      Toast.info('余额不足');
      return;
    }
    if (!smsCode) {
      Toast.info('请输入手机验证码');
      return;
    }
    dispatch({
      type: 'exchange/SubmitExchange',
      payload: {
        currency1,
        currency2,
        amount,
        code: smsCode,
      },
    });
  };
  render() {
    const {
      exchange: { amount, smsCode, balance, exini, captchaSrc, captcha },
    } = this.props;
    const { count, position, currency1, currency2 } = this.state;

    return (
      <div id={styles.exchange}>
        <PageHeader title="生态" leftContent={{ icon: ARROW_LEFT }} />

        <div className={styles.wrapper} onClick={() => this.setState({ position: null })}>
          <div className={styles.mainContent}>
            <div className={styles.selectCurrency}>
              <span onClick={e => this.checkAside(e, 'left')}>
                {currency1} <img src={ARROW_DOWN} alt="" />
              </span>
              <img
                style={{ transform: 'rotate(180deg)', margin: ' 0 60px' }}
                src={ARROW_LEFT}
                alt=""
              />
              <span onClick={e => this.checkAside(e, 'right')}>
                {currency2} <img src={ARROW_DOWN} alt="" />
              </span>

              <div className={styles.popover} style={{ ...position }}>
                <button
                  disabled={position && position.left}
                  className={`${styles.checkItem} ${
                    position && position.left ? styles.disabled : ''
                  }`}
                  onClick={() => this.checkCurrency('DID')}
                >
                  DID
                </button>

                <button
                  disabled={position && position.right}
                  className={`${styles.checkItem} ${
                    position && position.right ? styles.disabled : ''
                  }`}
                  onClick={() => this.checkCurrency('USDT')}
                >
                  USDT
                </button>
              </div>
            </div>

            <small className={styles.notice}>
              当前兑换比例：1 {currency1} = {exini.RATIO || '--'} {currency2}
            </small>
            <label>
              <span className={styles.label}>兑换数量</span>
              <input
                type="text"
                autoComplete="off"
                value={amount}
                onChange={e => this.onInputChange(e.target.value, 'amount')}
                placeholder={`最小兑换数量${exini.MIN || '--'}`}
              />
              <p className={styles.tips}>
                可用{currency1}：{balance} <small>手续费率：{exini.CHARGE * 100 || '--'}%</small>
              </p>
            </label>

            <Captcha
              captchaSrc={captchaSrc}
              value={captcha}
              onChange={e => this.onInputChange(e.target.value, 'captcha')}
              getCaptcha={this.getCaptcha}
            />
            <label>
              <span className={styles.label}>手机验证码</span>
              <div className={styles.codeWrapper}>
                <input
                  type="number"
                  autoComplete="off"
                  value={smsCode}
                  maxLength={4}
                  placeholder={formatMessage({ id: `COMMON_PLACEHOLDER_CODE` })}
                  onChange={e => this.onInputChange(e.target.value, 'smsCode')}
                />
                <button
                  disabled={count > 0 && count < COUNT_DOWN}
                  className={styles.codeNumber}
                  onClick={this.countDown}
                >
                  {count > 0 && count < COUNT_DOWN
                    ? count + 's'
                    : formatMessage({ id: `REGISTER_GET_CODE` })}
                </button>
              </div>
            </label>

            <p className={`${styles.labelTag} ${styles.small}`}>
              手续费 <small>{amount * exini.CHARGE || '--'}</small>
            </p>
            <p className={styles.labelTag}>
              到账数量
              <small>
                {amount > exini.CHARGE * 100
                  ? Number(amount - amount * exini.CHARGE).toFixed(2)
                  : '--'}
              </small>
            </p>
          </div>
          <p className={styles.reminder}>温馨提示：推广期间兑换手续费减免</p>

          <Button className={styles.btn} onClick={this.ensureExchange}>
            确认
          </Button>
        </div>
      </div>
    );
  }
}

export default Index;
