import React, { Component } from 'react';
import { formatMessage } from 'umi-plugin-locale';
import { connect, router } from 'dva';
import TelPrefix from '@/components/partials/TelPrefix';
import Captcha from '@/components/common/Captcha';
import PageHeader from '@/components/common/PageHeader';
import NEXT_STEP from '@/assets/dark/next-step.png';
import ARROW_LEFT from '@/assets/dark/arrow-left.png';
import ARROW_DOWN from '@/assets/icons/arrow-down.png';
import { REG, COUNT_DOWN } from '@/utils/constants';
import styles from './index.less';
import { Toast } from 'antd-mobile';
import { TOAST_DURATION } from '../../../utils/constants';

@connect(({ register }) => ({ register }))
class Home extends Component {
  state = {
    imgSrc: 'http://47.75.138.157/api/captchapng/png',
    captcha: '',
    captchaKey: +new Date(),
    count: COUNT_DOWN,
    prefix: '86',
    password: '',
    repassword: '',
    errMsg: {
      type: '',
      value: '',
    },
    showPrefix: false,
    isGetSms: false,
  };

  onPickerChange = val => {
    const { dispatch } = this.props;
    dispatch({
      type: 'register/UpdateState',
      payload: { prefix: val },
    });
  };

  onChangePhone = e => {
    if (!REG.NUMBER.test(e.target.value)) return; // 数字
    this.setState({ phone: e.target.value });
  };

  onChangePassword = e => {
    if (!/^[0-9A-Za-z]*$/.test(e.target.value)) return; // 数字或大小写字母
    this.setState({ password: e.target.value });
  };

  onChangeCode = e => {
    this.setState({ code: e.target.value });
  };

  onConfirmPrefix = prefix => {
    this.setState({ prefix });
  };

  onCancelPrefix = () => {
    this.setState({ showPrefix: false });
  };

  onInputChange = (e, key) => {
    const { value } = e.target;
    this.setState({ [key]: value });
  };

  onOpenPrefix = e => {
    e.preventDefault();
    this.setState({ showPrefix: true });
  };

  toNext = () => {
    const { phone, password, repassword, code } = this.state;
    if (!phone) {
      this.setState({ errMsg: { type: 'phone', value: '请输入手机号码' } });
      return;
    }

    if (phone && !REG.MOBILE.test(phone)) {
      this.setState({ errMsg: { type: 'phone', value: '手机号格式错误' } });
      return;
    }

    if (!password) {
      this.setState({ errMsg: { type: 'password', value: '请输入密码' } });
      return;
    }

    if (password && !REG.PASSWORD.test(password)) {
      this.setState({ errMsg: { type: 'password', value: '密码格式错误' } });
      return;
    }

    if (!repassword) {
      this.setState({ errMsg: { type: 'repassword', value: '请确认密码' } });
      return;
    }

    if (repassword && !!password && password !== repassword) {
      this.setState({ errMsg: { type: 'repassword', value: '两次密码不一致' } });
      return;
    }

    if (!code) {
      this.setState({ errMsg: { type: 'code', value: '请输入验证码' } });
      return;
    }

    if (code && code.length !== 6) {
      this.setState({ errMsg: { type: 'code', value: '验证码格式错误' } });
      return;
    }

    Toast.info('注册成功', TOAST_DURATION, () => {
      router.goBack();
      this.setState({ errMsg: { type: '', value: '' } });
    });
  };

  getSmsCode = () => {
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

  render() {
    const { count, imgSrc, captcha, prefix, errMsg, showPrefix } = this.state;
    return (
      <div id={styles.userRegister}>
        <PageHeader leftContent={{ icon: ARROW_LEFT }} />
        <section>
          <p>{formatMessage({ id: `REGISTER_TITLE` })}</p>
          <div className={styles.mainWrapper}>
            <div className={styles.content}>
              <label htmlFor="phone">
                <span>{formatMessage({ id: `COMMON_LABEL_PHONE` })}</span>
                <div
                  className={`${styles.pickerWrapper} ${errMsg.type === 'phone' &&
                    styles.inputErr}`}
                >
                  <span onClick={this.onOpenPrefix}>
                    +{prefix}
                    <img src={ARROW_DOWN} alt="" />
                  </span>

                  <input
                    id="phone"
                    type="text"
                    autoComplete="off"
                    placeholder={formatMessage({ id: `COMMON_PLACEHOLDER_PHONE` })}
                    onChange={this.onChangePhone}
                  />
                </div>
              </label>

              <label htmlFor="password">
                <span>{formatMessage({ id: `COMMON_LABEL_PASSWORD` })}</span>
                <input
                  id="password"
                  type="text"
                  className={errMsg.type === 'password' ? styles.inputErr : ''}
                  autoComplete="off"
                  placeholder={formatMessage({ id: `COMMON_PLACEHOLDER_PASSWORD` })}
                  onChange={this.onChangePassword}
                />
              </label>

              <label htmlFor="repassword">
                <span>{formatMessage({ id: `COMMON_LABEL_REPASSWORD` })}</span>
                <input
                  id="repassword"
                  type="text"
                  autoComplete="off"
                  className={errMsg.type === 'repassword' ? styles.inputErr : ''}
                  placeholder={formatMessage({ id: `COMMON_PLACEHOLDER_REPASSWORD` })}
                  onChange={e => this.setState({ repassword: e.target.value })}
                />
              </label>

              <Captcha
                imgSrc={imgSrc}
                value={captcha}
                onChange={e => this.onInputChange(e, 'captcha')}
                getCaptchaPng={this.getCaptchaPng}
              />

              <label htmlFor="code">
                <span>{formatMessage({ id: `COMMON_LABEL_VERFICATION_CODE` })}</span>
                <div
                  className={`${styles.codeWrapper} ${errMsg.type === 'code' && styles.inputErr}`}
                >
                  <input
                    id="code"
                    type="number"
                    autoComplete="off"
                    placeholder={formatMessage({ id: `COMMON_PLACEHOLDER_CODE` })}
                    onChange={this.onChangeCode}
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
                <h4>{errMsg.value || ''}</h4>
              </label>

              <img onClick={this.toNext} className={styles.nextStep} src={NEXT_STEP} alt="" />
            </div>
          </div>
        </section>
        <TelPrefix
          show={showPrefix}
          prefix={prefix}
          confirm={this.onConfirmPrefix}
          cancel={this.onCancelPrefix}
        />
      </div>
    );
  }
}
export default Home;
