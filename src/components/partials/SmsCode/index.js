import React, { Component } from 'react';
import styles from './index.less';
import { COUNT_DOWN, REG } from '../../../utils/constants';
import { formatMessage } from 'umi/locale';

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

  onChange = value => {
    if (value && !REG.NUMBER.test(value)) return;
    this.props.onChange(value);
  };

  render() {
    const { value } = this.props;
    const { count } = this.state;
    const isCountDown = count > 0 && count < COUNT_DOWN;
    const btnLabel = isCountDown ? `${count} s` : formatMessage({ id: `REGISTER_GET_CODE` });

    return (
      <div className={styles.smsCode}>
        <label>{formatMessage({ id: `EXCHANGE_LABEL_PHONE` })}</label>
        <div className={styles.inputBox}>
          <input
            type="text"
            value={value}
            maxLength={4}
            autoComplete={false}
            onChange={e => this.onChange(e.target.value)}
            placeholder={formatMessage({ id: `COMMON_PLACEHOLDER_CODE` })}
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
