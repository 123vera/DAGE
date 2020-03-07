import React, { Component } from 'react';
import styles from './index.less';
import { formatMessage } from 'umi-plugin-locale';

class Index extends Component {
  render() {
    const { captchaSrc, value, onChange, getCaptcha } = this.props;

    return (
      <div className={styles.captchaBox}>
        <span className={styles.label}>{formatMessage({ id: `REGISTER_GET_CAPTCHA` })}</span>
        <input
          type="text"
          maxLength={4}
          placeholder={formatMessage({ id: `COMMON_PLACEHOLDER_CAPTCHA` })}
          value={value}
          onChange={onChange || null}
        />
        <img
          src={captchaSrc}
          onClick={getCaptcha}
          alt={formatMessage({ id: `REGISTER_GET_CAPTCHA` })}
        />
      </div>
    );
  }
}

export default Index;
