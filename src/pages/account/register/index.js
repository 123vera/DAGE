import React, { Component } from 'react';
import { formatMessage } from 'umi-plugin-locale';
import { connect } from 'dva';
import { Picker, List } from 'antd-mobile';
import PageHeader from '@/components/common/PageHeader';
import NEXT_STEP from '@/assets/dark/next-step.png';
import { REG } from '@/utils/constants';
import styles from './index.less';

@connect(({ register }) => ({ register }))
class Home extends Component {
  state = {
    errMessage: null,
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
    setTimeout(() => {
      console.log('4343');

      console.log(type, value);
      if (type === 'phone' && REG.MOBILE.test(value)) {
        this.setState({ errMessage: '手机号格式错误' });
        return;
      }

      if (type === 'password' && REG.PASSWORD.test(value)) {
        this.setState({ errMessage: '密码格式错误' });
        return;
      }

      if (type === 'repassword' && this.state.password !== this.state.repassword) {
        this.setState({ errMessage: '两次密码不一致' });
        return;
      }
    }, 100);
  };

  render() {
    const {
      register: { prefix },
    } = this.props;
    const { errMessage } = this.state;
    console.log(errMessage);
    return (
      <div id={styles.userRegister}>
        <PageHeader />
        <section>
          <p>{formatMessage({ id: `REGISTER_TITLE` })}</p>
          <div className={styles.mainWrapper}>
            <label htmlFor="phone">
              <span>{formatMessage({ id: `COMMON_LABEL_PHONE` })}</span>
              <div className={styles.pickerWrapper}>
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
                  placeholder={formatMessage({ id: `COMMON_PLACEHOLDER_PHONE` })}
                  onBlur={e => this.regInput('phone', e)}
                />
              </div>
            </label>

            <label htmlFor="password">
              <span>{formatMessage({ id: `COMMON_LABEL_PASSWORD` })}</span>
              <input
                id="password"
                type="text"
                placeholder={formatMessage({ id: `COMMON_PLACEHOLDER_PASSWORD` })}
                onBlur={e => this.regInput('password', e)}
              />
            </label>

            <label htmlFor="repassword">
              <span>{formatMessage({ id: `COMMON_LABEL_REPASSWORD` })}</span>
              <input
                id="repassword"
                type="text"
                placeholder={formatMessage({ id: `COMMON_PLACEHOLDER_REPASSWORD` })}
                onBlur={e => this.regInput('repassword', e)}
              />
            </label>

            <label htmlFor="code">
              <span>{formatMessage({ id: `COMMON_LABEL_VERFICATION_CODE` })}</span>
              <div className={styles.codeWrapper}>
                <input
                  id="code"
                  type="text"
                  placeholder={formatMessage({ id: `COMMON_PLACEHOLDER_CODE` })}
                  onBlur={e => this.regInput('code', e)}
                />
                <span className={styles.codeNumber}>
                  {formatMessage({ id: `REGISTER_GET_CODE` })}
                </span>
              </div>
            </label>

            {errMessage && <span>{errMessage}</span>}

            <img className={styles.nextStep} src={NEXT_STEP} alt="" />
          </div>
        </section>
      </div>
    );
  }
}
export default Home;
