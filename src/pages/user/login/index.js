import styles from './index.less';
import React, { Component } from 'react';
import { formatMessage, setLocale, getLocale } from 'umi-plugin-locale';
import { connect } from 'dva';

@connect(({ pageHome }) => ({ pageHome }))
class Home extends Component {
  render() {
    return (
      <div className={styles.normal}>
        <div className={styles.title}>Yay! Welcome to umi!{formatMessage({ id: `HOME` })}</div>
        <button onClick={this.changeLang}>切换语言</button>
      </div>
    );
  }
}
export default Home;
