import React, { Component } from 'react';
import styles from './index.less';

class Index extends Component {
  render() {
    const { captchaSrc, value, onChange, getCaptcha } = this.props;

    return (
      <label className={styles.captchaBox}>
        <span>图形验证码</span>
        <input
          type="text"
          maxLength={4}
          placeholder={'请输入图形验证码'}
          value={value}
          onChange={onChange}
        />
        <img src={captchaSrc} onClick={getCaptcha} alt="图形验证码"/>
      </label>
    );
  }
}

export default Index;
