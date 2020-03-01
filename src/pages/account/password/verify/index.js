import React, { Component } from 'react';
import { formatMessage } from 'umi-plugin-locale';
import { connect } from 'dva';
import router from 'umi/router';
import { Icons, Images } from '../../../../assets';
import PageHeader from '@/components/common/PageHeader';
import TelPrefix from '../../../../components/partials/TelPrefix';
import Captcha from '../../../../components/common/Captcha';
import { REG, COUNT_DOWN } from '../../../../utils/constants';
import styles from './index.less';
import { Toast } from 'antd-mobile';
import Cookies from 'js-cookie';

@connect(({ password }) => ({ password }))
class Home extends Component {
  state = {
    count: COUNT_DOWN,
    errMsg: {
      type: '',
      value: '',
    },
    showPrefix: false,
    isGetSms: false,
  };

  componentDidMount() {
    const { location } = this.props;
    const type = location.pathname.includes('find_password') ? 'find_password' : 'reset_password';
    this.props.dispatch({
      type: 'password/UpdateState',
      payload: { type },
    });
    this.getCaptcha();
  }

  onOpenPrefix = e => {
    e.preventDefault();
    this.setState({ showPrefix: true });
  };

  onInputChange = (value, key) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'password/UpdateState',
      payload: { [key]: value },
    });
  };

  getCaptcha = () => {
    this.props.dispatch({ type: 'password/GetCaptcha', payload: +new Date() });
  };

  countDown = () => {
    const { timer } = this.state;
    clearInterval(Number(timer));
    this.getSmsCode();
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
    const { phone, captcha } = this.props.password;
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
        type: 'password/GetSmsCode',
      })
      .then(res => {
        if (res.status === 1) {
          Toast.info('获取验证码成功');
          return;
        }
        Toast.info(res.msg || '获取验证码失败');
      });
  };

  toNext = () => {
    const { phone, code, type } = this.props.password;
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

    this.props.dispatch({ type: 'password/FindPassword' })
      .then(res => {
        if (res.status !== 1) {
          Toast.fail(res.msg);
          return;
        }
        Cookies.set('ACCOUNT_TOKEN', res.data.accountToken);
        router.push(type === 'find_password' ? '/find_password/edit' : '/reset_password/edit');
      });
  };

  render() {
    const {
      prefix,
      phone,
      code,
      captchaSrc,
      captcha,
      type,
    } = this.props.password;
    const { errMsg, count, showPrefix } = this.state;

    return (
      <div className={styles.findPassword}>
        <PageHeader leftContent={{ icon: Icons.arrowLeft }}/>
        <section>
          <p>{formatMessage({ id: type === 'find_password' ? `LOGIN_FIND_PASSWORD` : 'LOGIN_SET_PASSWORD' })}</p>
          <div className={styles.mainWrapper}>
            <div className={styles.content}>
              <label>
                <span className={styles.label}>{formatMessage({ id: `COMMON_LABEL_PHONE` })}</span>
                <div
                  className={`${styles.pickerWrapper} ${
                    errMsg.type === 'phone' ? styles.inputErr : ''
                    }`}
                >
                  <span onClick={this.onOpenPrefix}>
                    +{prefix}
                    <img src={Icons.arrowDown} alt=""/>
                  </span>
                  <input
                    type="number"
                    autoComplete="off"
                    value={phone}
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
                <span className={styles.label}>
                  {formatMessage({ id: `COMMON_LABEL_VERFICATION_CODE` })}
                </span>
                <div
                  className={`${styles.codeWrapper} ${
                    errMsg.type === 'smsCode' ? styles.inputErr : ''
                    }`}
                >
                  <input
                    type="number"
                    autoComplete="off"
                    value={code}
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
                <h4>{errMsg.value || ''}</h4>
              </label>
              <img className={styles.nextStep} src={Images.nextStep} onClick={this.toNext} alt=""/>
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

export default Home;
