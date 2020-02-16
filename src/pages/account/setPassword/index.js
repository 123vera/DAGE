import React, { Component } from 'react';
import { formatMessage } from 'umi-plugin-locale';
import { connect } from 'dva';
import PageHeader from '@/components/common/PageHeader';
import NEXT_STEP from '@/assets/dark/next-step.png';
import { REG } from '@/utils/constants';
import styles from './index.less';

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

  regInput = (type, e) => {
    const {
      target: { value },
    } = e;
    const { password, repassword } = this.state;

    setTimeout(() => {
      if (!value) return;

      if (type === 'password' && !REG.PASSWORD.test(value)) {
        this.setState({ errMsg: { type, value: '密码格式错误' } });
        return;
      }

      if (type === 'repassword' && !!password && password !== repassword) {
        this.setState({ errMsg: { type, value: '两次密码不一致' } });
        return;
      }

      this.setState({ errMsg: { type: '', value: '' } });
    }, 100);
  };

  render() {
    const { errMsg } = this.state;

    return (
      <div id={styles.userRegister}>
        <PageHeader />
        <section>
          <p>{formatMessage({ id: `LOGIN_SET_PASSWORD` })}</p>
          <div className={styles.mainWrapper}>
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
