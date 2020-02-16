import React, { Component } from 'react';
import styles from './index.less';
import ARROW_LEFT from '@/assets/dark/arrow-left.png';

class PageHeader extends Component {
  render() {
    return (
      <header id={styles.pageHeader}>
        <img src={ARROW_LEFT} alt="" />
      </header>
    );
  }
}

export default PageHeader;
