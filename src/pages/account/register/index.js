import React, { Component } from 'react';
import { formatMessage } from 'umi/locale';
import { connect } from 'dva';
import router from 'umi/router';
import { Icons } from '../../../assets';
import SelectLang from '../../../components/common/SelectLang';
import TelPrefix from '../../../components/partials/TelPrefix';
import Captcha from '../../../components/partials/Captcha';
import PageHeader from '../../../components/common/PageHeader';
import { REG } from '../../../utils/constants';
import styles from './index.less';
import { Toast } from 'antd-mobile';
import { TOAST_DURATION } from '../../../utils/constants';
import SmsCode from '../../../components/partials/SmsCode';
import SubmitBtn from '../../../components/common/SubmitBtn';

@connect(({ register }) => ({ register }))
class Register extends Component {
  state = {
    errMsg: {
      type: '',
      value: '',
    },
    showPrefix: false,
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
    if (key === 'code' && value.length > 4) return;
    if (key === 'phone' || key === 'code') {
      if (!/^[0-9]*$/.test(value)) return; // 数字
    }
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

  getSmsCode = async () => {
    const { prefix, phone, captcha } = this.props.register;
    if (!prefix) {
      this.setState({
        errMsg: { type: 'prefix', value: formatMessage({ id: `COMMON_PLACEHOLDER_AREA` }) },
      });
      return;
    }
    if (!phone) {
      this.setState({
        errMsg: { type: 'phone', value: formatMessage({ id: `COMMON_PLACEHOLDER_PHONE` }) },
      });
      return;
    }
    if (!REG.MOBILE.test(phone)) {
      this.setState({
        errMsg: { type: 'phone', value: formatMessage({ id: `COMMON_PLACEHOLDER_PHONE_AGAIN` }) },
      });
      return;
    }
    if (!captcha) {
      this.setState({
        errMsg: { type: 'captcha', value: formatMessage({ id: `COMMON_PLACEHOLDER_CAPTCHA` }) },
      });
      return;
    }
    return this.props
      .dispatch({
        type: 'register/GetSmsCode',
        payload: { prefix, phone, imgcode: captcha, type: 'reg' },
      })
      .then(res => {
        this.setState({ getSmsSuccess: res.status === 1 });
        if (res.status === 1) {
          Toast.info(formatMessage({ id: `TOAST_GET_CODE_SUCCESS` }));
          return true;
        }
        Toast.info(res.msg || formatMessage({ id: `TOAST_GET_CODE_FAIL` }));
        return false;
      });
  };

  toNext = () => {
    const { phone, password, passwordConfirm, code, agree } = this.props.register;

    if (!phone) {
      this.setState({
        errMsg: { type: 'phone', value: formatMessage({ id: `COMMON_PLACEHOLDER_PHONE` }) },
      });
      return;
    }
    if (!REG.MOBILE.test(phone)) {
      this.setState({ errMsg: { type: 'phone', value: formatMessage({ id: `TOAST_ERR_PHONE` }) } });
      return;
    }
    if (!code) {
      this.setState({
        errMsg: { type: 'code', value: formatMessage({ id: `COMMON_PLACEHOLDER_CODE` }) },
      });
      return;
    }
    if (code && code.length !== 4) {
      this.setState({
        errMsg: { type: 'code', value: formatMessage({ id: `TOAST_ERR_SMSCODE` }) },
      });
      return;
    }
    if (!password) {
      this.setState({
        errMsg: { type: 'password', value: formatMessage({ id: `COMMON_PLACEHOLDER_PASSWORD` }) },
      });
      return;
    }
    if (password && !REG.PASSWORD.test(password)) {
      this.setState({
        errMsg: { type: 'password', value: formatMessage({ id: `LOGIN_PLACEHOLDER_PASSWORD` }) },
      });
      return;
    }
    if (password !== passwordConfirm) {
      this.setState({
        errMsg: { type: 'passwordConfirm', value: formatMessage({ id: `LOGIN_REPASSWORD` }) },
      });
      return;
    }
    if (password !== passwordConfirm) {
      this.setState({
        errMsg: { type: 'passwordConfirm', value: formatMessage({ id: `LOGIN_REPASSWORD` }) },
      });
      return;
    }
    if (!agree) {
      this.setState({
        errMsg: { type: '', value: formatMessage({ id: `REGISTER_AGREE_PROTOCOL` }) },
      });
      return;
    }

    this.props.dispatch({ type: 'register/Register' }).then(res => {
      if (res.status !== 1) {
        Toast.fail(res.msg);
        return;
      }

      Toast.info(formatMessage({ id: `TOAST_REGISTER_SUCCESS` }), TOAST_DURATION, () => {
        router.push('/login');
        this.setState({ errMsg: { type: '', value: '' } });
      });
    });
  };

  render() {
    const { errMsg, showPrefix } = this.state;
    const {
      prefix,
      phone,
      code,
      password,
      passwordConfirm,
      captchaSrc,
      captcha,
      agree,
    } = this.props.register;
    return (
      <div className={styles.userRegister}>
        <PageHeader
          leftContent={{ icon: Icons.arrowLeft, onHandle: () => router.push('/login') }}
        />
        <div className={styles.langWrapper}>
          <SelectLang />
        </div>

        <div className={styles.mainContent}>
          <section>
            <p>{formatMessage({ id: `REGISTER_TITLE` })}</p>
            <div className={styles.mainWrapper}>
              <div className={styles.content}>
                <label className={styles.row}>
                  <span>{formatMessage({ id: `COMMON_LABEL_PHONE` })}</span>
                  <div
                    className={`${styles.pickerWrapper} ${errMsg.type === 'phone' &&
                      styles.inputErr}`}
                  >
                    <span onClick={this.onOpenPrefix}>
                      {prefix ? `+${prefix}` : formatMessage({ id: `COMMON_SELECT_AREA` })}
                      <img src={Icons.arrowDown} alt="" />
                      &nbsp;|
                    </span>
                    <input
                      value={phone}
                      type="text"
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
                <SmsCode
                  isErrInput={errMsg.type === 'code'}
                  value={code}
                  onChange={value => this.onInputChange(value, 'code')}
                  getSmsCode={this.getSmsCode}
                />
                <label className={styles.row}>
                  <span>{formatMessage({ id: `COMMON_LABEL_PASSWORD` })}</span>
                  <input
                    value={password}
                    type="password"
                    className={errMsg.type === 'password' ? styles.inputErr : ''}
                    autoComplete="off"
                    placeholder={formatMessage({ id: `COMMON_PLACEHOLDER_PASSWORD` })}
                    onChange={e => this.onChangePassword(e, 'password')}
                  />
                </label>
                <label className={styles.row}>
                  <span>{formatMessage({ id: `COMMON_LABEL_REPASSWORD` })}</span>
                  <input
                    value={passwordConfirm}
                    type="password"
                    autoComplete="off"
                    className={errMsg.type === 'passwordConfirm' ? styles.inputErr : ''}
                    placeholder={formatMessage({ id: `COMMON_PLACEHOLDER_REPASSWORD` })}
                    onChange={e => this.onChangePassword(e, 'passwordConfirm')}
                  />
                </label>
                <aside className={styles.aside}>
                  <input
                    id="agree"
                    type="checkbox"
                    checked={agree}
                    onChange={e => this.onInputChange(e.target.checked, 'agree')}
                  />
                  <label
                    htmlFor="agree"
                    dangerouslySetInnerHTML={{ __html: formatMessage({ id: `REGISTER_AGREE` }) }}
                  />
                  <a href="https://dage.zendesk.com/hc/zh-cn/articles/360040817631-%E7%94%A8%E6%88%B7%E5%8D%8F%E8%AE%AE-User-agreement">
                    {formatMessage({ id: `REGISTER_PROTOCOL` })}
                  </a>
                </aside>
                <h4 className={styles.errMsg}>{errMsg.value || ''}</h4>
                <SubmitBtn
                  value={formatMessage({ id: `REGISTER_TITLE_01` })}
                  onClick={this.toNext}
                />
                {/*<img onClick={this.toNext} className={styles.nextStep} src={Images.nextStep} alt=""/>*/}
              </div>
            </div>
          </section>
        </div>

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
