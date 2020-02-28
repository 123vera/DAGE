import React, { Component } from 'react';
import { Toast } from 'antd-mobile';
import { formatMessage } from 'umi-plugin-locale';
import { connect } from 'dva';
import router from 'umi/router';
import Cookies from 'js-cookie';
import { REG } from '../../../utils/constants';
import styles from './index.less';
import TelPrefix from '../../../components/partials/TelPrefix';
import { Icons, Images } from '../../../assets';

@connect(({ globalModel, login }) => ({ globalModel, login }))
class Home extends Component {
  state = {
    showPrefix: false,
    errMsg: {
      type: '',
      value: '',
    },
  };

  onOpenPrefix = e => {
    e.preventDefault();
    this.setState({ showPrefix: true });
  };

  onInputChange = (value, key) => {
    const { dispatch } = this.props;
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
    if (!phone) {
      this.setState({ errMsg: { type: 'phone', value: '请输入手机号码' } });
      return;
    }
    if (!REG.MOBILE.test(phone)) {
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

    this.props.dispatch({ type: 'login/Login' }).then(res => {
      if (res.status !== 1) {
        Toast.fail(res.msg);
        return;
      }
      const { accountToken, userList } = res.data;
      this.props.dispatch({
        type: 'login/UpdateState',
        payload: { accountToken, userList },
      });
      Cookies.set('ACCOUNT_TOKEN', accountToken);
      Cookies.set('USER_PHONE', phone);
      Cookies.set('USER_PREFIX', prefix);
      this.setState({ errMsg: { type: '', value: '' } }, () => {
        router.push('/select_account');
      });
    });
  };

  render() {
    const { prefix } = this.props.login;
    const { errMsg, showPrefix } = this.state;

    return (
      <div id={styles.userLogin}>
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
                    +{prefix}
                    <img src={Icons.arrowDown} alt="" />
                  </span>
                  <input
                    type="number"
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
                  className={errMsg.type === 'password' ? styles.inputErr : ''}
                  onChange={this.onChangePassword}
                  placeholder={formatMessage({ id: `COMMON_PLACEHOLDER_PASSWORD` })}
                />
                <h4>{errMsg.value || ''}</h4>
              </label>

              <div className={styles.tipsInput}>
                <span onClick={() => router.push(`/register`)}>
                  {formatMessage({ id: `REGISTER_TITLE` })}
                </span>
                <span onClick={() => router.push(`/reset_password/code`)}>
                  {formatMessage({ id: `LOGIN_FORGET_PASSWORD` })}
                </span>
              </div>

              <img className={styles.nextStep} src={Images.nextStep} onClick={this.toNext} alt="" />
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

export default Home;
