import React, { Component } from 'react';
import { Button } from 'antd-mobile';
import PageHeader from '@/components/common/PageHeader';
import ARROW_LEFT from '@/assets/dark/arrow-left.png';
import DAGE_LOGO from '@/assets/dark/dage-logo.png';
import TIPS from '@/assets/icons/tips.png';
import styles from './index.less';
import { formatMessage } from 'umi/locale';

class Index extends Component {
  render() {
    return (
      <div id={styles.promotion}>
        <PageHeader
          title={formatMessage({ id: `PROMOTION_TITLE` })}
          leftContent={{ icon: ARROW_LEFT }}
        />

        <section className={styles.banner}>
          <span className={styles.income}>{formatMessage({ id: `PROMOTION_INCOME` })}</span>
          <h2>3000</h2>
          <Button>{formatMessage({ id: `PROMOTION_IMMEDIATE` })}</Button>
          <img src={DAGE_LOGO} alt="DAGE_LOGO" />
        </section>

        <section className={styles.explain}>
          <h4>
            {formatMessage({ id: `PROMOTION_RECOMMENDATION` })}
            <img src={TIPS} alt="TIPS" />
          </h4>
          <ul className={styles.explainList}>
            <li>
              <span>{formatMessage({ id: `PROMOTION_GENERATION` })}</span>
              <p>8</p>
            </li>
            <li>
              <span>{formatMessage({ id: `PROMOTION_SECONDARY` })}</span>
              <p>10</p>
            </li>
          </ul>
        </section>

        <section className={styles.group}>
          <h4>{formatMessage({ id: `PROMOTION_RECOMMENDATION_TEAM` })}</h4>

          <ul className={styles.chartGroup}>
            <li className={styles.item}>
              <span>SPOOT</span>
              <span>{formatMessage({ id: `PROMOTION_MEDAL_GRADE` })}</span>
            </li>
            <li className={styles.item}>
              <span>SPOOT</span>
              <span>{formatMessage({ id: `PROMOTION_REBATE_RATIO` })}</span>
            </li>
          </ul>
        </section>

        <section className={styles.firstRecommend}>
          <h4>{formatMessage({ id: `PROMOTION_MY_GENERATION` })}</h4>
          <table>
            <tr>
              <td>{formatMessage({ id: `PROMOTION_USER` })}</td>
              <td>{formatMessage({ id: `PROMOTION_TIME` })}</td>
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
