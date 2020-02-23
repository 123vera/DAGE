import React, { Component } from 'react';
import styles from './index.less';

class Index extends Component {
  render() {
    const { imgSrc, value, onChange, getCaptchaPng, localeStore } = this.props;

    return (
      <label id={styles.captchaBox}>
        <span className={styles.label}>图形验证码</span>
        <input
          type="text"
          maxLength={4}
          placeholder={'请输入图形验证码'}
          value={value}
          onChange={onChange}
        />
        <img id={styles.captcha} src={imgSrc} onClick={getCaptchaPng} alt="图形验证码" />
      </label>
    );
  }
}

export default Index;
