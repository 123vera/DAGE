import React, { Component } from 'react';
// import { formatMessage } from 'umi-plugin-locale';
import { connect } from 'dva';
import styles from './index.less';

@connect(({ pageHome }) => ({ pageHome }))
class Home extends Component {
  render() {
    return (
      <div id={styles.userLogin}>
        <section>
          <p>登录DAGE</p>
          <div className={styles.mainWrapper}>
            <label htmlFor="phone">
              <span>手机号</span>
              <input id="phone" type="text" placeholder="请输入手机号" />
            </label>

            <label htmlFor="password">
              <span>密码</span>
              <input id="password" type="text" placeholder="请输入密码" />
            </label>
          </div>
        </section>
      </div>
    );
  }
}
export default Home;
