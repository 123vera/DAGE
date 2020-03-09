import React, { Component } from 'react';
import ARROW_LEFT from '@/assets/dark/arrow-left.png';
import PageHeader from '@/components/common/PageHeader';
import styles from './index.less';

class Index extends Component {
  render() {
    return (
      <div className={styles.no}>
        <PageHeader leftContent={{ icon: ARROW_LEFT }} />
      </div>
    );
  }
}

export default Index;
