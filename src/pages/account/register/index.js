import React, { Component } from 'react';
import { formatMessage } from 'umi/locale';
import { connect } from 'dva';
import router from 'umi/router';
import { Icons, Images } from '../../../assets';
import TelPrefix from '../../../components/partials/TelPrefix';
import Captcha from '../../../components/partials/Captcha';
import PageHeader from '../../../components/common/PageHeader';
import { REG, COUNT_DOWN } from '../../../utils/constants';
import styles from './index.less';
import { Toast } from 'antd-mobile';
import { TOAST_DURATION } from '../../../utils/constants';

@connect(({ register }) => ({ register }))
class Register extends Component {
  state = {
    count: COUNT_DOWN,
    errMsg: {
      type: '',
      value: '',
    },
    getSmsSuccess: false,
    showPrefix: false,
    isGetSms: false,
  };

  componentDidMount() {
    this.getCaptcha();
  }

  onChangePassword = (e, key) => {
    if (!/^[0-9A-Za-z]*$/.test(e.target.value)) return; // 数字或大小写字母
    this.onInputChange(e.target.value, key || 'password');
  };

  onInputChange = (value, key) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'register/UpdateState',
      payload: { [key]: value },
    });
  };

  onOpenPrefix = e => {
    e.preventDefault();
    this.setState({ showPrefix: true });
  };

  getCaptcha = () => {
    this.props.dispatch({ type: 'register/GetCaptcha', payload: +new Date() });
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
    const { prefix, phone, captcha } = this.props.register;
    if (!phone) {
      this.setState({ errMsg: { type: 'phone', value: '请输入手机号码' } });
      return;
    }
    if (!REG.MOBILE.test(phone)) {
      this.setState({ errMsg: { type: 'phone', value: '请输入正确的手机号码' } });
      return;
    }
    if (!captcha) {
      this.setState({ errMsg: { type: 'captcha', value: '请输入图形验证码' } });
      return;
    }
    this.props
      .dispatch({
        type: 'register/GetSmsCode',
        payload: { prefix, phone, imgcode: captcha, type: 'reg' },
      })
      .then(res => {
        this.setState({ getSmsSuccess: res.status === 1 });
        if (res.status === 1) {
          Toast.info('获取验证码成功');
          return;
        }
        Toast.info(res.msg || '获取验证码失败');
      });
  };

  toNext = () => {
    const { phone, password, passwordConfirm, code } = this.props.register;
    if (!phone) {
      this.setState({ errMsg: { type: 'phone', value: '请输入手机号码' } });
      return;
    }
    if (!REG.MOBILE.test(phone)) {
      this.setState({ errMsg: { type: 'phone', value: '手机号格式错误' } });
      return;
    }
    if (!code) {
      this.setState({ errMsg: { type: 'code', value: '请输入验证码' } });
      return;
    }
    if (code && code.length !== 4) {
      this.setState({ errMsg: { type: 'code', value: '验证码格式错误' } });
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
    if (password !== passwordConfirm) {
      this.setState({ errMsg: { type: 'passwordConfirm', value: '两次密码不一致' } });
      return;
    }

    this.props.dispatch({ type: 'register/Register' }).then(res => {
      if (res.status !== 1) {
        Toast.fail(res.msg);
        return;
      }

      Toast.info('注册成功', TOAST_DURATION, () => {
        router.push('/login');
        this.setState({ errMsg: { type: '', value: '' } });
      });
    });
  };

  render() {
    const { count, errMsg, showPrefix } = this.state;
    const {
      prefix,
      phone,
      code,
      password,
      passwordConfirm,
      captchaSrc,
      captcha,
    } = this.props.register;
    return (
      <div className={styles.userRegister}>
        <PageHeader
          leftContent={{ icon: Icons.arrowLeft, onHandle: () => router.push('/login') }}
        />
        <section>
          <p>{formatMessage({ id: `REGISTER_TITLE` })}</p>
          <div className={styles.mainWrapper}>
            <div className={styles.content}>
              <label>
                <span>{formatMessage({ id: `COMMON_LABEL_PHONE` })}</span>
                <div
                  className={`${styles.pickerWrapper} ${errMsg.type === 'phone' &&
                    styles.inputErr}`}
                >
                  <span onClick={this.onOpenPrefix}>
                    +{prefix}
                    <img src={Icons.arrowDown} alt="" />
                  </span>
                  <input
                    value={phone}
                    type="number"
                    autoComplete="off"
                    placeholder={formatMessage({ id: `COMMON_PLACEHOLDER_PHONE` })}
                    onChange={e => this.onInputChange(e.target.value, 'phone')}
                  />
                </div>
              </label>
              <Captcha
                captchaSrc={captchaSrc}
                value={captcha}
                onChange={e => this.onInputChange(e.target.value, 'captcha')}
                getCaptcha={this.getCaptcha}
              />
              <label>
                <span>{formatMessage({ id: `COMMON_LABEL_VERFICATION_CODE` })}</span>
                <div
                  className={`${styles.codeWrapper} ${errMsg.type === 'code' && styles.inputErr}`}
                >
                  <input
                    value={code}
                    type="number"
                    autoComplete="off"
                    placeholder={formatMessage({ id: `COMMON_PLACEHOLDER_CODE` })}
                    onChange={e => this.onInputChange(e.target.value, 'code')}
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
              <label>
                <span>{formatMessage({ id: `COMMON_LABEL_PASSWORD` })}</span>
                <input
                  value={password}
                  type="text"
                  className={errMsg.type === 'password' ? styles.inputErr : ''}
                  autoComplete="off"
                  placeholder={formatMessage({ id: `COMMON_PLACEHOLDER_PASSWORD` })}
                  onChange={e => this.onChangePassword(e, 'password')}
                />
              </label>
              <label>
                <span>{formatMessage({ id: `COMMON_LABEL_REPASSWORD` })}</span>
                <input
                  value={passwordConfirm}
                  type="text"
                  autoComplete="off"
                  className={errMsg.type === 'passwordConfirm' ? styles.inputErr : ''}
                  placeholder={formatMessage({ id: `COMMON_PLACEHOLDER_REPASSWORD` })}
                  onChange={e => this.onChangePassword(e, 'passwordConfirm')}
                />
              </label>
              <h4 className={styles.errMsg}>{errMsg.value || ''}</h4>
              <img onClick={this.toNext} className={styles.nextStep} src={Images.nextStep} alt="" />
            </div>
          </div>
        </section>
        <TelPrefix
          show={showPrefix}
          prefix={prefix}
          confirm={prefix => this.onInputChange(prefix, 'prefix')}
          cancel={() => this.setState({ showPrefix: false })}
        />
      </div>
    );
  }
}

export default Register;
