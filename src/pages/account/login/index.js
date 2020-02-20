import React, { Component } from 'react';
import { formatMessage } from 'umi-plugin-locale';
import { connect } from 'dva';
import router from 'umi/router';
import { Picker, List, Toast } from 'antd-mobile';
import styles from './index.less';
import NEXT_STEP from '@/assets/dark/next-step.png';
import { REG } from '../../../utils/constants';

@connect(({ login }) => ({ login }))
class Home extends Component {
  state = {
    phone: '',
    prefix: '',
    password: '',
  };
  onPickerChange = val => {
    const { dispatch } = this.props;
    dispatch({
      type: 'login/UpdateState',
      payload: { prefix: val },
    });
  };

  toNext = () => {
    const { phone, prefix, password } = this.state;
    if (phone === '') {
      Toast.info('请输入手机号');
      return;
    }

    if (password === '') {
      Toast.info('请输入密码');
      return;
    }

    router.push('/select_account');
  };

  onChangePhone = e => {
    if (!/^[0-9]*$/.test(e.target.value)) return; // 数字
    this.setState({ phone: e.target.value });
  };

  onChangePassword = e => {
    if (!/^[0-9A-Za-z]*$/.test(e.target.value)) return; // 数字或大小写字母
    this.setState({ password: e.target.value });
  };

  render() {
    const { phone, prefix, password } = this.state;
    return (
      <div id={styles.userLogin}>
        <section>
          <p>{formatMessage({ id: `LOGIN_TITLE` })}</p>
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
                  value={phone}
                  maxLength={11}
                  onChange={this.onChangePhone}
                  placeholder={formatMessage({ id: `COMMON_PLACEHOLDER_PHONE` })}
                />
              </div>
            </label>

            <label htmlFor="password">
              <span>{formatMessage({ id: `COMMON_LABEL_PASSWORD` })}</span>
              <input
                id="password"
                type="text"
                value={password}
                maxLength={20}
                onChange={this.onChangePassword}
                placeholder={formatMessage({ id: `COMMON_PLACEHOLDER_PASSWORD` })}
              />
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
    );
  }
}
export default Home;
