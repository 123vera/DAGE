import React, { Component } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import PageHeader from '@/components/common/PageHeader';
import ARROW_LEFT from '@/assets/dark/arrow-left.png';
import DAGE_LOGO from '@/assets/dark/dage-logo.png';
// import TIPS from '@/assets/icons/tips.png';
import { formatMessage } from 'umi/locale';
import styles from './index.less';

@connect(({ promotion }) => ({ promotion }))
class Index extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'promotion/GetNoticeList',
    });
  }

  render() {
    const {
      promotion: { teamLevel },
    } = this.props;

    return (
      <div id={styles.promotion}>
        <PageHeader
          title={formatMessage({ id: `PROMOTION_TITLE_01` })}
          leftContent={{ icon: ARROW_LEFT }}
          rightContent={{
            text: (
              <span style={{ color: '#F3AF66' }}>
                {formatMessage({ id: `PROMOTION_IMMEDIATE` })}
              </span>
            ),
            onHandle: () => router.push('/home/user'),
          }}
        />

        <section className={styles.banner}>
          <span className={styles.income}>{formatMessage({ id: `PROMOTION_USER_LEVEL` })}</span>
          <h2>{teamLevel || teamLevel === 0 ? `VIP ${teamLevel}` : '--'}</h2>
          <img src={DAGE_LOGO} alt="DAGE_LOGO" />
        </section>

        {/*  以下暂时隐藏
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
      */}
      </div>
    );
  }
}

export default Index;
