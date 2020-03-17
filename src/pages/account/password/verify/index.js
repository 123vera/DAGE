import React, { Component } from 'react';
import { formatMessage } from 'umi-plugin-locale';
import { connect } from 'dva';
import router from 'umi/router';
import { Icons } from '../../../../assets';
import PageHeader from '../../../../components/common/PageHeader';
import TelPrefix from '../../../../components/partials/TelPrefix';
import Captcha from '../../../../components/partials/Captcha';
import { REG } from '../../../../utils/constants';
import styles from './index.less';
import { Toast } from 'antd-mobile';
import Cookies from 'js-cookie';
import SmsCode from '../../../../components/partials/SmsCode';
import SubmitBtn from '../../../../components/common/SubmitBtn';

@connect(({ password, globalModel }) => ({ password, globalModel }))
class Home extends Component {
  state = {
    errMsg: {
      type: '',
      value: '',
    },
    showPrefix: false,
  };

  componentDidMount() {
    const { location } = this.props;
    const type = location.pathname.includes('find_password') ? 'find_password' : 'reset_password';
    this.props.dispatch({ type: 'password/ClearInput' });
    this.props.dispatch({
      type: 'password/UpdateState',
      payload: {
        type,
        phone: (location.query && location.query.phone) || '',
        prefix: (location.query && location.query.prefix) || '',
      },
    });
    this.getCaptcha();
  }

  onOpenPrefix = e => {
    const { type } = this.props.password;
    if (type !== 'find_password') return;
    e.preventDefault();
    this.setState({ showPrefix: true });
  };

  onInputChange = (value, key) => {
    const { dispatch } = this.props;
    if (key === 'code' && value.length > 4) return;
    if (key === 'phone' || key === 'code') {
      if (!/^[0-9]*$/.test(value)) return; // 数字
    }
    dispatch({
      type: 'password/UpdateState',
      payload: { [key]: value },
    });
  };

  getCaptcha = () => {
    this.props.dispatch({ type: 'password/GetCaptcha', payload: +new Date() });
  };

  getSmsCode = async () => {
    const { prefix, phone, captcha } = this.props.password;
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
        type: 'password/GetSmsCode',
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

  toNext = () => {
    const { phone, code, type } = this.props.password;

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

    this.props.dispatch({ type: 'password/FindPassword' }).then(res => {
      if (res.status !== 1) {
        Toast.fail(res.msg);
        return;
      }
      Cookies.set('ACCOUNT_TOKEN', res.data.accountToken);
      router.push(type === 'find_password' ? '/find_password/edit' : '/reset_password/edit');
    });
  };

  render() {
    const { globalModel } = this.props;
    const { prefix, phone, code, captchaSrc, captcha, type } = this.props.password;
    const { errMsg, showPrefix } = this.state;
    const initPrefix = prefix ? `+${prefix}` : formatMessage({ id: `COMMON_SELECT_AREA` });

    return (
      <div className={styles.findPassword}>
        <PageHeader leftContent={{ icon: Icons.arrowLeft }}/>
        <section>
          <p>
            {formatMessage({
              id: type === 'find_password' ? `LOGIN_FIND_PASSWORD` : 'LOGIN_RESET_PASSWORD',
            })}
          </p>
          <div className={styles.mainWrapper}>
            <div className={styles.content}>
              <label className={styles.label}>
                <span>{formatMessage({ id: `COMMON_LABEL_PHONE` })}</span>
                <div
                  className={`${styles.pickerWrapper} ${
                    errMsg.type === 'phone' ? styles.inputErr : ''
                    }`}
                >
                  <span onClick={this.onOpenPrefix}>
                    {type !== 'find_password' ? `+${globalModel.myInfo.phonePrefix}` : initPrefix}
                    <img src={Icons.arrowDown} alt=""/>
                  </span>
                  <input
                    type="text"
                    autoComplete="off"
                    value={type !== 'find_password' ? globalModel.myInfo.phoneNo : phone}
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
                value={code}
                getSmsCode={this.getSmsCode}
                onChange={value => this.onInputChange(value, 'code')}
              />
              <h4>{errMsg.value || ''}</h4>
              <SubmitBtn value={formatMessage({ id: `COMMON_NEXT_STEP` })} onClick={this.toNext}/>
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
