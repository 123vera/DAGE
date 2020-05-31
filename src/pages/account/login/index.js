import React, { Component } from 'react';
import { Toast } from 'antd-mobile';
import { formatMessage } from 'umi-plugin-locale';
import { connect } from 'dva';
import router from 'umi/router';
import Cookies from 'js-cookie';
import { REG } from '../../../utils/constants';
import styles from './index.less';
import TelPrefix from '../../../components/partials/TelPrefix';
import SelectLang from '../../../components/common/SelectLang';
import { Icons } from '../../../assets';
import SubmitBtn from '../../../components/common/SubmitBtn';

@connect(({ globalModel, login }) => ({ globalModel, login }))
class Login extends Component {
  state = {
    showPrefix: false,
    errMsg: {
      type: '',
      value: '',
    },
  };

  componentDidMount() {
    Cookies.remove('ACCOUNT_TOKEN');
    Cookies.remove('USER_ID');
    Cookies.remove('OPENID');
  }

  onOpenPrefix = e => {
    e.preventDefault();
    this.setState({ showPrefix: true });
  };

  onInputChange = (value, key) => {
    const { dispatch } = this.props;

    if (key === 'phone') {
      if (!/^[0-9]*$/.test(value)) return; // 数字
    }
    dispatch({
      type: 'login/UpdateState',
      payload: { [key]: value },
    });
  };

  onChangePassword = e => {
    const { value } = e.target;
    if (!/^[0-9A-Za-z]*$/.test(value)) return; // 数字或大小写字母
    this.onInputChange(value, 'password');
  };

  toNext = () => {
    const { prefix, phone, password } = this.props.login;
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
      this.setState({ errMsg: { type: 'phone', value: formatMessage({ id: `TOAST_ERR_PHONE` }) } });
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
        errMsg: { type: 'password', value: formatMessage({ id: `LOGIN_ERR_PASSWORD` }) },
      });
      return;
    }

    this.props.dispatch({ type: 'login/Login' }).then(res => {
      if (res.status !== 1) {
        res.msg && Toast.fail(res.msg);
        return;
      }
      const { accountToken, userList } = res.data;
      this.props.dispatch({
        type: 'login/UpdateState',
        payload: { accountToken, userList },
      });
      Cookies.set('ACCOUNT_TOKEN', accountToken);
      this.setState({ errMsg: { type: '', value: '' } }, () => {
        router.push('/account/select-account');
      });
    });
  };

  render() {
    const { prefix } = this.props.login;
    const { errMsg, showPrefix } = this.state;

    return (
      <div id={styles.userLogin}>
        <div className={styles.headerWrapper}>
          <img src={Icons.arrowLeft} onClick={() => router.push('/')} alt="" />
          <div className={styles.langWrapper}>
            <SelectLang />
          </div>
        </div>

        <div className={styles.contentWrapper}>
          <section>
            <p>{formatMessage({ id: `LOGIN_TITLE` })}</p>
            <div className={styles.mainWrapper}>
              <label>
                <span className={styles.label}>{formatMessage({ id: `COMMON_LABEL_PHONE` })}</span>
                <div
                  className={`${styles.pickerWrapper} ${errMsg.type === 'phone' &&
                    styles.inputErr}`}
                >
                  <span onClick={this.onOpenPrefix}>
                    {prefix ? `+${prefix}` : formatMessage({ id: `COMMON_SELECT_AREA` })}
                    <img src={Icons.arrowDown} alt="" />
                  </span>
                  <input
                    type="number"
                    autoComplete="off"
                    onChange={e => this.onInputChange(e.target.value, 'phone')}
                    placeholder={formatMessage({ id: `COMMON_PLACEHOLDER_PHONE` })}
                  />
                </div>
              </label>

              <label>
                <span className={styles.label}>
                  {formatMessage({ id: `COMMON_LABEL_PASSWORD` })}
                </span>
                <input
                  type="password"
                  autoComplete="off"
                  className={errMsg.type === 'password' ? styles.inputErr : ''}
                  onChange={this.onChangePassword}
                  placeholder={formatMessage({ id: `COMMON_PLACEHOLDER_PASSWORD` })}
                />
                <h4>{errMsg.value || ''}</h4>
              </label>

              <div className={styles.tipsInput}>
                <span onClick={() => router.push(`/account/email-login`)}>
                  {/*{formatMessage({ id: `REGISTER_TITLE_01` })}*/}
                  邮箱登录
                </span>
                <span onClick={() => router.push(`/account/find-password/verify`)}>
                  {formatMessage({ id: `LOGIN_FORGET_PASSWORD` })}
                </span>
              </div>
              <SubmitBtn value={formatMessage({ id: `LOGIN` })} onClick={this.toNext} />
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

export default Login;

// OP_8333aa05839f989f922b35421a070464
// OP_8333aa05839f989f922b35421a070464
