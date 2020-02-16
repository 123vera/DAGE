import React, { Component } from 'react';
import styles from './index.less';
import ARROW_LEFT from '@/assets/dark/arrow-left.png';
import router from 'umi/router';

class PageHeader extends Component {
  render() {
    return (
      <header id={styles.pageHeader}>
        <img src={ARROW_LEFT} alt="" onClick={() => router.goBack()} />
      </header>
    );
  }
}

export default PageHeader;
