import React, { Component } from 'react';
import { formatMessage } from 'umi-plugin-locale';
import { connect } from 'dva';
import router from 'umi/router';
import { REG } from '@/utils/constants';
import styles from './index.less';
import TelPrefix from '@/components/partials/TelPrefix';
import NEXT_STEP from '@/assets/dark/next-step.png';
import ARROW_DOWN from '@/assets/icons/arrow-down.png';

@connect(({ login }) => ({ login }))
class Home extends Component {
  state = {
    phone: '',
    prefix: '86',
    password: '',
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

  toNext = () => {
    const { phone, password } = this.state;
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

    this.setState({ errMsg: { type: '', value: '' } }, () => {
      router.push('/select_account');
    });
  };

  onChangePhone = e => {
    if (!/^[0-9]*$/.test(e.target.value)) return; // 数字
    this.setState({ phone: e.target.value });
  };

  onChangePassword = e => {
    if (!/^[0-9A-Za-z]*$/.test(e.target.value)) return; // 数字或大小写字母
    this.setState({ password: e.target.value });
  };

  onConfirmPrefix = prefix => {
    this.setState({ prefix });
  };

  onCancelPrefix = () => {
    this.setState({ showPrefix: false });
  };

  render() {
    const { errMsg, phone, prefix, password, showPrefix } = this.state;
    return (
      <div id={styles.userLogin}>
        <div className={styles.contentWrapper}>
          <section>
            <p>{formatMessage({ id: `LOGIN_TITLE` })}</p>
            <div className={styles.mainWrapper}>
              <label htmlFor="phone">
                <span className={styles.label}>{formatMessage({ id: `COMMON_LABEL_PHONE` })}</span>
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
                    value={phone}
                    maxLength={11}
                    onChange={this.onChangePhone}
                    placeholder={formatMessage({ id: `COMMON_PLACEHOLDER_PHONE` })}
                  />
                </div>
              </label>

              <label htmlFor="password">
                <span className={styles.label}>
                  {formatMessage({ id: `COMMON_LABEL_PASSWORD` })}
                </span>
                <input
                  id="password"
                  type="password"
                  value={password}
                  maxLength={20}
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
                <span onClick={() => router.push(`/forgot_password`)}>
                  {formatMessage({ id: `LOGIN_FORGET_PASSWORD` })}
                </span>
              </div>

              <img className={styles.nextStep} src={NEXT_STEP} onClick={this.toNext} alt="" />
            </div>
          </section>
        </div>
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
