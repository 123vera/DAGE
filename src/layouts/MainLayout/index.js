import React, { Component } from 'react';
import { connect } from 'dva';
import Footer from '../../components/common/Footer';

import styles from './index.less';

@connect(({ global }) => ({ global }))
class Index extends Component {
  render() {
    const { children } = this.props;
    return <div className={styles.mainLayout}>
      {children}
      <Footer/>
    </div>;
  }
}

export default Index;
