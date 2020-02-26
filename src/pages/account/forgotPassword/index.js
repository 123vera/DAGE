import React, { Component } from 'react';
import { formatMessage } from 'umi-plugin-locale';
import { connect } from 'dva';
import router from 'umi/router';
import { COUNT_DOWN } from '@/utils/constants';
import PageHeader from '@/components/common/PageHeader';
import TelPrefix from '@/components/partials/TelPrefix';
import Captcha from '@/components/common/Captcha';
import NEXT_STEP from '@/assets/dark/next-step.png';
import ARROW_DOWN from '@/assets/icons/arrow-down.png';
import ARROW_LEFT from '@/assets/dark/arrow-left.png';
import { REG } from '../../../utils/constants';
import { getQueryParam } from '../../../utils/utils';
import styles from './index.less';

@connect(({ forgotPassword }) => ({ forgotPassword }))
class Home extends Component {
  state = {
    phone: '',
    prefix: '86',
    smsCode: '',
    count: COUNT_DOWN,
    showPrefix: false,
    imgSrc: 'http://47.75.138.157/api/captchapng/png',
    captcha: '',
    captchaKey: +new Date(),
    errMsg: {
      type: '',
      value: '',
    },
  };

  onOpenPrefix = e => {
    e.preventDefault();
    this.setState({ showPrefix: true });
  };

  onChangePhone = e => {
    const {
      target: { value },
    } = e;
    if (value && !REG.NUMBER.test(value)) return; // 数字
    this.setState({ phone: value });
  };

  onChangeCode = e => {
    const {
      target: { value },
    } = e;
    if (value && !REG.NUMBER.test(value)) return; // 数字
    this.setState({ smsCode: e.target.value });
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

  toNext = () => {
    const { phone, smsCode } = this.state;
    if (!phone) {
      this.setState({ errMsg: { type: 'phone', value: '请输入手机号码' } });
      return;
    }

    if (phone && !REG.MOBILE.test(phone)) {
      this.setState({ errMsg: { type: 'phone', value: '手机号格式错误' } });
      return;
    }

    if (!smsCode) {
      this.setState({ errMsg: { type: 'smsCode', value: '请输入验证码' } });
      return;
    }

    this.setState({ errMsg: { type: '', value: '' } });

    router.push('/set_password');
  };

  render() {
    const { errMsg, count, captcha, imgSrc, phone, smsCode, prefix, showPrefix } = this.state;
    return (
      <div id={styles.forgotPassword}>
        <PageHeader leftContent={{ icon: ARROW_LEFT }} />
        <section>
          <p>{getQueryParam('name') || formatMessage({ id: `LOGIN_FIND_PASSWORD` })}</p>
          <div className={styles.mainWrapper}>
            <div className={styles.content}>
              <label htmlFor="phone">
                <span className={styles.label}>{formatMessage({ id: `COMMON_LABEL_PHONE` })}</span>
                <div
                  className={`${styles.pickerWrapper} ${
                    errMsg.type === 'phone' ? styles.inputErr : ''
                  }`}
                >
                  <span onClick={this.onOpenPrefix}>
                    +{prefix}
                    <img src={ARROW_DOWN} alt="" />
                  </span>

                  <input
                    id="phone"
                    type="text"
                    placeholder={formatMessage({ id: `COMMON_PLACEHOLDER_PHONE` })}
                    value={phone}
                    autoComplete="off"
                    maxLength={11}
                    onChange={this.onChangePhone}
                  />
                </div>
              </label>

              <Captcha
                imgSrc={imgSrc}
                value={captcha}
                onChange={e => this.onInputChange(e, 'captcha')}
                getCaptchaPng={this.getCaptchaPng}
              />

              <label htmlFor="smsCode">
                <span className={styles.label}>
                  {formatMessage({ id: `COMMON_LABEL_VERFICATION_CODE` })}
                </span>
                <div
                  className={`${styles.codeWrapper} ${
                    errMsg.type === 'smsCode' ? styles.inputErr : ''
                  }`}
                >
                  <input
                    id="smsCode"
                    type="text"
                    autoComplete="off"
                    value={smsCode}
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

              <img className={styles.nextStep} src={NEXT_STEP} onClick={this.toNext} alt="" />
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
