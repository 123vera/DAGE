import React, { Component } from 'react';
import { Button } from 'antd-mobile';
import router from 'umi/router';
import ARROW_LEFT from '@/assets/dark/arrow-left.png';
import PageHeader from '@/components/common/PageHeader';
import { formatMessage } from 'umi/locale';
import styles from './index.less';

class Index extends Component {
  render() {
    return (
      <div className={styles.no}>
        <PageHeader leftContent={{ icon: ARROW_LEFT }} />

        <img src="https://cdn.cnviinet.com/APP2.0/404-201912040442.svg" alt="" />
        <p className={styles.sorry}>{formatMessage({ id: `PAGE_NO_FOUND` })}</p>
        <Button className={`${styles.btn} ${styles.goBack}`} onClick={() => router.goBack()}>
          返回上一页
        </Button>
      </div>
    );
  }
}

export default Index;
