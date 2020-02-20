import React, { Component } from 'react';
import { Button } from 'antd-mobile';
import PageHeader from '@/components/common/PageHeader';
import ARROW_LEFT from '@/assets/dark/arrow-left.png';
import DAGE_LOGO from '@/assets/dark/dage-logo.png';
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
          <img src={DAGE_LOGO} alt="" />
        </section>

        <section className={styles.explain}>
          <h4>
            推荐说明
            <img src="" alt="" />
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
          <h4>
            推荐团队
            <img src="" alt="" />
          </h4>

          <ul className={styles.chartGroup}>
            <li>
              <img src="" alt="" />
            </li>
          </ul>
        </section>
      </div>
    );
  }
}

export default Index;
