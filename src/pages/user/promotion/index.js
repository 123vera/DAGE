import React, { Component } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import PageHeader from '@/components/common/PageHeader';
import ARROW_LEFT from '@/assets/dark/arrow-left.png';
import DAGE_LOGO from '@/assets/dark/dage-logo.png';
import TIPS from '@/assets/icons/tips.png';
import { LEVEL_LIST } from '../../../utils/constants';
import { formatMessage } from 'umi/locale';
import styles from './index.less';
import dayjs from 'dayjs';
import ListView from '../../../components/common/ListView';
import { getLocale } from 'umi-plugin-locale';

@connect(({ promotion }) => ({ promotion }))
class Index extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'promotion/GetRecommendList',
    });
  }

  hrefToTip = () => {
    const lang = getLocale();
    let url;
    if (lang.includes('zh')) {
      url =
        ' https://dage.zendesk.com/hc/zh-cn/articles/900000463446-%E5%A6%82%E4%BD%95%E6%8F%90%E5%8D%87%E6%88%91%E7%9A%84%E7%AD%89%E7%BA%A7 ';
    } else if (lang.includes('en')) {
      url = 'https://dage.zendesk.com/hc/zh-cn/articles/900000463466-How-to-improve-my-level';
    }
    window.location.href = url;
  };

  render() {
    const {
      list = [],
      hasMore,
      mystatus,
      achievement,
      recommendCount,
      // teamCount,
      teamLevelOtc,
      teamLevel,
    } = this.props.promotion;
    console.log(teamLevelOtc);
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
            onHandle: () => router.push('/referral_code'),
          }}
        />

        <section className={styles.banner}>
          <div className={styles.content}>
            <span className={styles.income}>{formatMessage({ id: `PROMOTION_USER_LEVEL` })}</span>
            <h2>{teamLevel || teamLevel === 0 ? `VIP ${teamLevel}` : '--'}</h2>
          </div>

          {/* 版本2.0临时隐藏 */}
          <div className={styles.content}>
            <span className={styles.income}>{formatMessage({ id: `PROMOTION_LEVEL` })}</span>
            <h2>
              {teamLevelOtc !== 0
                ? `${LEVEL_LIST()[teamLevelOtc || 0]}${formatMessage({
                    id: `PROMOTION_POINT_02`,
                  })}`
                : formatMessage({ id: `PROMOTION_NONE` })}
            </h2>
          </div>
          <img src={DAGE_LOGO} alt="DAGE_LOGO" />
        </section>

        {/* 版本2.0临时隐藏 */}
        <section className={styles.explain}>
          <h4>
            {formatMessage({ id: `PROMOTION_RECOMMENDATION` })}
            <img src={TIPS} alt="TIPS" onClick={this.hrefToTip} />
          </h4>
          <ul className={styles.explainList}>
            <li>
              <span>{formatMessage({ id: `PROMOTION_GENERATION` })}</span>
              <p className={styles.first}>{recommendCount}</p>
            </li>
          </ul>
        </section>

        {/* 版本2.0临时隐藏 */}
        <section className={styles.explain}>
          <ul className={styles.explainList}>
            <li>
              <span>{formatMessage({ id: `PROMOTION_TOTAL` })}</span>
              <p>{achievement && achievement.dgt}&nbsp;DGT</p>
            </li>
          </ul>
        </section>

        {/* 版本2.0临时隐藏 */}
        <section className={styles.explain}>
          <ul className={styles.explainList}>
            <li>
              <span>{formatMessage({ id: `PROMOTION_STATUS` })}</span>
              <p className={styles.activity}>
                {mystatus === 0
                  ? formatMessage({ id: `PROMOTION_UNACTIVITY` })
                  : formatMessage({ id: `PROMOTION_ACTIVITY` })}
              </p>
            </li>
          </ul>
        </section>

        {/* 2.0隐藏 */}
        {/* <section style={{ display: 'none' }} className={styles.group}>
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
        </section> */}

        {/* 版本2.0临时隐藏 */}
        <section className={styles.firstRecommend}>
          <h4>
            {formatMessage({ id: `PROMOTION_MY_GENERATION` })} （
            {formatMessage({ id: `PROMOTION_ONLY_SHOW` })}）
          </h4>
          <ListView hasMore={hasMore} onLoadMore={this.getNotices}>
            <table>
              <thead>
                <tr>
                  <td>{formatMessage({ id: `PROMOTION_USER` })}</td>
                  <td>{formatMessage({ id: `PROMOTION_TIME` })}</td>
                </tr>
              </thead>
              <tbody>
                {list.map(item => (
                  <tr key={item.regTime}>
                    <td>{item.userName}</td>
                    <td>{dayjs(item.regTime * 1000).format('YYYY-MM-DD HH:mm')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ListView>
        </section>
      </div>
    );
  }
}

export default Index;
