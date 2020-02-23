import React, { Component } from 'react';
import { formatMessage } from 'umi-plugin-locale';
import { connect } from 'dva';
import PageHeader from '@/components/common/PageHeader';
import NEXT_STEP from '@/assets/dark/next-step.png';
import ARROW_LEFT from '@/assets/dark/arrow-left.png';
import { REG } from '@/utils/constants';
import styles from './index.less';
import { router } from 'umi';
import { Toast } from 'antd-mobile';
import { TOAST_DURATION } from '../../../utils/constants';

@connect(({ setPassword }) => ({ setPassword }))
class Home extends Component {
  state = {
    password: '',
    repassword: '',
    errMsg: {
      type: '',
      value: '',
    },
  };

  onChangePassword = (type, e) => {
    const { value } = e.target;
    if (value && !REG.INPUT_GROUP.test(value)) return; // 数字
    this.setState({ [type]: value });
  };

  toNext = () => {
    const { password, repassword } = this.state;
    if (!password) {
      this.setState({ errMsg: { type: 'password', value: '请设置密码' } });
      return;
    }
    if (password && !REG.PASSWORD.test(password)) {
      this.setState({ errMsg: { type: 'password', value: '请设置包含数字及字母的8~16位密码' } });
      return;
    }

    if (!repassword) {
      this.setState({ errMsg: { type: 'repassword', value: '请确认密码' } });
      return;
    }
    if (repassword && !!password && password !== repassword) {
      this.setState({ errMsg: { type: 'repassword', value: '两次密码不一致' } });
      return;
    }
    this.setState({ errMsg: { type: '', value: '' } }, () => {
      Toast.info('设置成功', TOAST_DURATION, () => router.goBack());
    });
  };

  render() {
    const { repassword, password, errMsg } = this.state;

    return (
      <div id={styles.userRegister}>
        <PageHeader leftContent={{ icon: ARROW_LEFT }} />

        <section>
          <p>{formatMessage({ id: `LOGIN_SET_PASSWORD` })}</p>
          <div className={styles.mainWrapper}>
            <label htmlFor="password">
              <span>{formatMessage({ id: `COMMON_LABEL_PASSWORD` })}</span>
              <input
                id="password"
                type="password"
                className={errMsg.type === 'password' ? styles.inputErr : ''}
                autoComplete="off"
                value={password}
                placeholder={formatMessage({ id: `COMMON_PLACEHOLDER_PASSWORD` })}
                onChange={e => this.onChangePassword('password', e)}
              />
            </label>

            <label htmlFor="repassword">
              <span>{formatMessage({ id: `COMMON_LABEL_REPASSWORD` })}</span>
              <input
                id="repassword"
                type="password"
                autoComplete="off"
                value={repassword}
                className={errMsg.type === 'repassword' ? styles.inputErr : ''}
                placeholder={formatMessage({ id: `COMMON_PLACEHOLDER_REPASSWORD` })}
                onChange={e => this.onChangePassword('repassword', e)}
              />
              <h4>{errMsg.value || ''}</h4>
            </label>

            <img className={styles.nextStep} src={NEXT_STEP} onClick={this.toNext} alt="" />
          </div>
        </section>
      </div>
    );
  }
}
export default Home;
