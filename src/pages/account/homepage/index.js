import React, { Component } from 'react';
import SelectLang from '../../../components/common/SelectLang';
import styles from './index.less';
import { router } from 'umi';

class Homepage extends Component {
  render() {
    return (
      <div id={styles.homepageBg}>
        <div className={styles.langWrapper}>
          <SelectLang />
        </div>

        <h2>欢迎使用DAGE</h2>

        <div className={styles.btnGroup}>
          <button onClick={() => router.push('/login')} className={`${styles.btn} ${styles.login}`}>
            登录
          </button>
          <button
            onClick={() => router.push('/register')}
            className={`${styles.btn} ${styles.reg}`}
          >
            注册
          </button>
        </div>
      </div>
    );
  }
}
export default Homepage;
