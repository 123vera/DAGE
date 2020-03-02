import React, { Component } from 'react';
import styles from './index.less';
import { COUNT_DOWN } from '../../../utils/constants';

class Index extends Component {
  state = {
    count: COUNT_DOWN,
  };

  countDown = () => {
    const { getSmsCode, getSmsSuccess = false } = this.props;
    const { count } = this.state;
    if (count === COUNT_DOWN) getSmsCode && getSmsCode();
    getSmsSuccess &&
      this.setState({ count: count - 1 }, () => {
        const { count } = this.state;
        const timer = setTimeout(() => {
          if (count >= 0 && count < COUNT_DOWN) {
            this.countDown();
          } else {
            this.setState({ count: COUNT_DOWN });
            clearTimeout(timer);
          }
        }, 1000);
      });
  };

  render() {
    const { value, onChange } = this.props;
    const { count } = this.state;
    const isCountDown = count > 0 && count < COUNT_DOWN;
    const btnLabel = isCountDown ? `${count} s` : '获取验证码';

    return (
      <div className={styles.smsCode}>
        <label>手机验证码</label>
        <div className={styles.inputBox}>
          <input
            type="text"
            value={value}
            onChange={onChange || null}
            placeholder="请输入手机验证码"
          />
          <button disabled={isCountDown} onClick={this.countDown}>
            {btnLabel}
          </button>
        </div>
      </div>
    );
  }
}

export default Index;
