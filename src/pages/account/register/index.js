import React, { Component } from 'react';
import { formatMessage } from 'umi-plugin-locale';
import { connect } from 'dva';
import { Picker, List } from 'antd-mobile';
import Header from '@/components/common/Header';
import NEXT_STEP from '@/assets/dark/next-step.png';
import { REG } from '@/utils/constants';
import styles from './index.less';

@connect(({ register }) => ({ register }))
class Home extends Component {
  state = {
    password: '',
    repassword: '',
    errMsg: {
      type: '',
      value: '',
    },
  };

  onPickerChange = val => {
    const { dispatch } = this.props;
    dispatch({
      type: 'register/UpdateState',
      payload: { prefix: val },
    });
  };

  regInput = (type, e) => {
    const {
      target: { value },
    } = e;
    const { password, repassword } = this.state;

    setTimeout(() => {
      if (!value) return;
      if (type === 'phone' && !REG.MOBILE.test(value)) {
        this.setState({ errMsg: { type, value: '手机号格式错误' } });
        return;
      }

      if (type === 'password' && !REG.PASSWORD.test(value)) {
        this.setState({ errMsg: { type, value: '密码格式错误' } });
        return;
      }

      if (type === 'repassword' && !!password && password !== repassword) {
        this.setState({ errMsg: { type, value: '两次密码不一致' } });
        return;
      }

      if (type === 'code' && value.length !== 6) {
        this.setState({ errMsg: { type, value: '验证码格式错误' } });
        return;
      }

      this.setState({ errMsg: { type: '', value: '' } });
    }, 100);
  };

  render() {
    const {
      register: { prefix },
    } = this.props;
    const { errMsg } = this.state;

    return (
      <div id={styles.userRegister}>
        <Header />
        <section>
          <p>{formatMessage({ id: `REGISTER_TITLE` })}</p>
          <div className={styles.mainWrapper}>
            <label htmlFor="phone">
              <span>{formatMessage({ id: `COMMON_LABEL_PHONE` })}</span>
              <div
                className={`${styles.pickerWrapper} ${errMsg.type === 'phone' && styles.inputErr}`}
              >
                <Picker
                  data={[
                    { label: '+86', value: '+86' },
                    { label: '+33', value: '+33' },
                  ]}
                  cols={1}
                  extra={prefix || '+86'}
                  value={prefix}
                  onOk={v => this.onPickerChange(v)}
                >
                  <List.Item arrow="down" />
                </Picker>
                <input
                  id="phone"
                  type="text"
                  autoComplete="off"
                  placeholder={formatMessage({ id: `COMMON_PLACEHOLDER_PHONE` })}
                  onBlur={e => this.regInput('phone', e)}
                  onChange={e => this.setState({ phone: e.target.value })}
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
                onBlur={e => this.regInput('password', e)}
                onChange={e => this.setState({ password: e.target.value })}
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
                onBlur={e => this.regInput('repassword', e)}
                onChange={e => this.setState({ repassword: e.target.value })}
              />
            </label>

            <label htmlFor="code">
              <span>{formatMessage({ id: `COMMON_LABEL_VERFICATION_CODE` })}</span>
              <div className={`${styles.codeWrapper} ${errMsg.type === 'code' && styles.inputErr}`}>
                <input
                  id="code"
                  type="text"
                  autoComplete="off"
                  placeholder={formatMessage({ id: `COMMON_PLACEHOLDER_CODE` })}
                  onBlur={e => this.regInput('code', e)}
                  onChange={e => this.setState({ code: e.target.value })}
                />
                <span className={styles.codeNumber}>
                  {formatMessage({ id: `REGISTER_GET_CODE` })}
                </span>
              </div>
              <h4>{errMsg.value || ''}</h4>
            </label>

            <img className={styles.nextStep} src={NEXT_STEP} alt="" />
          </div>
        </section>
      </div>
    );
  }
}
export default Home;
