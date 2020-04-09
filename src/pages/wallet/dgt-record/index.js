import React, { Component } from 'react';
import PageHeader from '../../../components/common/PageHeader';
import ARROW_LEFT from '@/assets/dark/arrow-left.png';
import { connect } from 'dva';
import dayjs from 'dayjs';
import { formatMessage } from 'umi-plugin-locale';
import styles from './index.less';

@connect(({ dgtRecord }) => ({ dgtRecord }))
class Index extends Component {
  render() {
    return (
      <div id={styles.dgtRecord}>
        <PageHeader title="充值记录" leftContent={{ icon: ARROW_LEFT }} />

        <ul>
          <li>
            <span className={`${styles.status} ${styles.success}`}>成功</span>
            <p>订单号：dfsfsf</p>
            <div className={styles.time}>
              <small>时间：{dayjs(324353463453 * 1000).format('HH:mm')}</small>
              <span>2000</span>
            </div>
          </li>
          <li>
            <span className={`${styles.status} ${styles.fail}`}>成功</span>
            <p>订单号：dfsfsf</p>
            <div className={styles.time}>
              <small>时间：{dayjs(new Date() * 1000).format('HH:mm')}</small>
              <span>2000</span>
            </div>
          </li>
          <li>
            <span className={`${styles.status} ${styles.waiting}`}>审核中</span>
            <p>订单号：dfsfsf</p>
            <div className={styles.time}>
              <small>时间：{dayjs(new Date() * 1000).format('HH:mm')}</small>
              <span>2000</span>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

export default Index;
