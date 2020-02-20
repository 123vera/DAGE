import React, { Component } from 'react';
import { Button } from 'antd-mobile';
import PageHeader from '@/components/common/PageHeader';
import ARROW_LEFT from '@/assets/dark/arrow-left.png';
import DAGE_LOGO from '@/assets/dark/dage-logo.png';
import TIPS from '@/assets/icons/tips.png';
import styles from './index.less';

class Index extends Component {
  render() {
    return (
      <div id={styles.promotion}>
        <PageHeader title="我的推广" leftContent={{ icon: ARROW_LEFT }} />

        <section className={styles.banner}>
          <span className={styles.income}>昨日挖矿动态收益</span>
          <h2>3000</h2>
          <Button>立即推广</Button>
          <img src={DAGE_LOGO} alt="DAGE_LOGO" />
        </section>

        <section className={styles.explain}>
          <h4>
            推荐说明
            <img src={TIPS} alt="TIPS" />
          </h4>
          <ul className={styles.explainList}>
            <li>
              <span>一代推荐人数</span>
              <p>8</p>
            </li>
            <li>
              <span>二代推荐人数</span>
              <p>10</p>
            </li>
          </ul>
        </section>

        <section className={styles.group}>
          <h4>推荐团队</h4>

          <ul className={styles.chartGroup}>
            <li className={styles.item}>
              <span>SPOOT</span>
              <span>勋章等级</span>
            </li>
            <li className={styles.item}>
              <span>SPOOT</span>
              <span>返利比例</span>
            </li>
          </ul>
        </section>

        <section className={styles.firstRecommend}>
          <h4>我的一代推荐人员</h4>
          <table>
            <tr>
              <td>用户</td>
              <td>推广时间</td>
            </tr>
            <tr>
              <td>111232@163.com</td>
              <td>2010.4.44</td>
            </tr>
            <tr>
              <td>111232@163.com</td>
              <td>2010.4.44</td>
            </tr>
          </table>
        </section>
      </div>
    );
  }
}

export default Index;
