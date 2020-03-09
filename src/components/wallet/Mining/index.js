import { Component } from 'react';
import { Link } from 'umi';
import styles from './index.less';
import React from 'react';
import { Icons, Images } from '../../../assets';
import { formatMessage } from 'umi-plugin-locale';
import { downFixed } from '../../../utils/utils';

class Mining extends Component {
  render() {
    const { myInfo } = this.props;

    return (
      <div className={styles.mining}>
        <section>
          <p>{formatMessage({ id: `WALLET_SECTION_TITLE` })}</p>
          <div className={styles.card} style={{ backgroundImage: `url(${Images.cardBg})` }}>
            <p>
              <small>{formatMessage({ id: `WALLET_SECTION_SUBTITLE` })}</small>
            </p>
            <div className={styles.earnings}>
              <span>{downFixed(myInfo.yestodayReward) || '--'}</span>
              <small>DID</small>
            </div>
            <aside>
              <Link to="/wallet/reward-detail">
                <span>{formatMessage({ id: `INCOME_TITLE` })}</span>
              </Link>
              <Link to="/referral_code">
                <span>{formatMessage({ id: `INCOME_GET_INVITER_CODE` })}</span>
              </Link>
            </aside>
          </div>
        </section>
        <section>
          <h3>
            <img src={Icons.dIcon} alt="" />
            {formatMessage({ id: `WALLET_POG_TITLE` })}
          </h3>
          <p>{formatMessage({ id: `WALLET_POG_DESC` })}</p>
          {/*<p>*/}
          {/*自由侠APP下载地址：*/}
          {/*<a href="www.ziyouxia.com">www.ziyouxia.com</a>*/}
          {/*</p>*/}
        </section>
        <section className={styles.openingSoon}>
          <h4>{formatMessage({ id: `WALLET_COMING_SOON` })}</h4>
        </section>
        <section className={styles.buy} style={{ display: 'none' }}>
          <p>{formatMessage({ id: `WALLET_POG_MINE_GRADE` })}</p>
          <ul className={styles.levels}>
            <li className={styles.active}>1{formatMessage({ id: `COMMON_LEVEL` })}</li>
            <li>2{formatMessage({ id: `COMMON_LEVEL` })}</li>
            <li>3{formatMessage({ id: `COMMON_LEVEL` })}</li>
          </ul>
          <aside className={styles.amount}>
            <small>交易额 1000 DAGE</small>
          </aside>
          <button>购买</button>
        </section>
        <section className={styles.detail} style={{ display: 'none' }}>
          <div className={styles.row}>
            <label>当前矿机等级</label>
            <span className={styles.level}>1级</span>
          </div>
          <div className={styles.row}>
            <label>当前折损率</label>
            <span>5/3000</span>
          </div>
          <div className={styles.row}>
            <label>昨日挖矿总收益</label>
            <span>
              119 DGC &nbsp;
              <Link to="/wallet/mining-detail">挖矿详情</Link>
            </span>
          </div>
          <div className={styles.row}>
            <label>当前勋章等级</label>
            <span>1级</span>
          </div>
        </section>
      </div>
    );
  }
}

export default Mining;
