import React, { Component } from 'react';
import styles from './index.less';

class Index extends Component {
  render() {
    const { captchaSrc, value, onChange, getCaptcha } = this.props;

    return (
      <div className={styles.captchaBox}>
        <span className={styles.label}>图形验证码</span>
        <input
          type="text"
          maxLength={4}
          placeholder={'请输入图形验证码'}
          value={value}
          onChange={onChange || null}
        />
        <img src={captchaSrc} onClick={getCaptcha} alt="图形验证码"/>
      </div>
    );
  }
}

export default Index;
