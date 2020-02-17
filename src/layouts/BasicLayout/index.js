import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './index.less';

@connect(({ global }) => ({ global }))
class Index extends Component {
  render() {
    const { children } = this.props;
    return <div className={styles.basicLayout}>{children}</div>;
  }
}

export default Index;
