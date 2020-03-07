import React, { Component } from 'react';
import styles from './index.less';
import { COUNT_DOWN, REG } from '../../../utils/constants';
import { formatMessage } from 'umi/locale';

class SmsCode extends Component {
  state = {
    count: COUNT_DOWN,
  };

  componentWillUnmount() {
    this.reset();
  }

  reset = () => {
    this.setState({ count: COUNT_DOWN });
    clearTimeout(this.timer);
  };

  countDown = () => {
    // const { getSmsCode } = this.props;
    const { count } = this.state;
    // if (count === COUNT_DOWN) {
    //   getSmsCode && getSmsCode().then(success => !success && this.reset());
    // }

    this.setState({ count: count - 1 }, () => {
      const { count } = this.state;
      this.timer = setTimeout(() => {
        (count >= 0 && count < COUNT_DOWN)
          ? this.countDown()
          : this.reset();
      }, 1000);
    });
  };

  getCode = async () => {
    const { getSmsCode } = this.props;
    return getSmsCode().then(isTrue => {
      if (!isTrue) return;
      this.countDown();
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
            autoComplete="off"
            onChange={e => this.onChange(e.target.value)}
            placeholder={formatMessage({ id: `COMMON_PLACEHOLDER_CODE` })}
          />
          <button disabled={isCountDown} onClick={this.getCode}>
            {btnLabel}
          </button>
        </div>
      </div>
    );
  }
}

export default SmsCode;
