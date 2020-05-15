import React, { Component } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import PageHeader from '@/components/common/PageHeader';
import ARROW_LEFT from '@/assets/dark/arrow-left.png';
// import DAGE_LOGO from '@/assets/dark/dage-logo.png';
import TIPS from '@/assets/icons/tips.png';
import { LEVEL_LIST } from '../../../utils/constants';
import { formatMessage } from 'umi/locale';
import styles from './index.less';
import dayjs from 'dayjs';
import ListView from '../../../components/common/ListView';
import { getLocale } from 'umi-plugin-locale';
import { downFixed } from '../../../utils/utils';

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
      teamLevelOtc,
      teamLevel,
      teamCount,
    } = this.props.promotion;

    return (
      <div id={styles.promotion}>
        <PageHeader
          title={formatMessage({ id: `PROMOTION_TITLE_02` })}
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
            <div className={styles.income}>
              <span>VIP</span>
            </div>
            <h2>{teamLevel || teamLevel === 0 ? `LEVEL ${teamLevel}` : '--'}</h2>
          </div>
          <div className={styles.content}>
            <div className={styles.income}>
              <span>{formatMessage({ id: `PROMOTION_MEDAL_LEVEL` })}</span>
            </div>
            <h2>
              {teamLevelOtc !== 0
                ? `${LEVEL_LIST()[teamLevelOtc || 0]}`
                : formatMessage({ id: `PROMOTION_NONE` })}
            </h2>
          </div>
          {/* <img src={DAGE_LOGO} alt="DAGE_LOGO" /> */}
        </section>

        <section className={styles.explain}>
          <h4>
            {formatMessage({ id: `PROMOTION_RECOMMENDATION` })}
            <img src={TIPS} alt="TIPS" onClick={this.hrefToTip} />
          </h4>

          {/* 一代推荐人数 */}
          <ul className={styles.explainList}>
            <li>
              <span>{formatMessage({ id: `PROMOTION_GENERATION` })}</span>
              <p className={styles.first}>{recommendCount}</p>
            </li>
          </ul>
        </section>

        {/* 伞下总人数 */}
        <section className={styles.explain}>
          <ul className={styles.explainList}>
            <li>
              <span>{formatMessage({ id: `PROMOTION_PEOPLE_NUMBER` })}</span>
              <p className={styles.first}>{teamCount}</p>
            </li>
          </ul>
        </section>

        {/* 团队总业绩 */}
        <section className={styles.explain}>
          <ul className={styles.explainList}>
            <li>
              <span>{formatMessage({ id: `PROMOTION_TOTAL_01` })}</span>
              <p>{(achievement && achievement.usd) || 0} USDT</p>
            </li>
          </ul>
        </section>

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

        <section className={styles.firstRecommend}>
          <h4>
            {formatMessage({ id: `PROMOTION_MY_GENERATION` })}
            {/*{formatMessage({ id: `PROMOTION_ONLY_SHOW` })}）*/}
          </h4>
          <ListView key={list} hasMore={hasMore} onLoadMore={this.getNotices}>
            <table>
              <thead>
                <tr>
                  <td>{formatMessage({ id: `PROMOTION_USER` })}</td>
                  <td>{formatMessage({ id: `PROMOTION_PERFORMANCE` })}</td>
                </tr>
              </thead>
              <tbody>
                {list.map(item => (
                  <tr key={item.achievementDgc}>
                    <td>{item.userName}</td>
                    <td>{downFixed(item.achievementDgc)}</td>
                    {/* <td>{dayjs(item.regTime * 1000).format('YYYY-MM-DD HH:mm')}</td> */}
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
