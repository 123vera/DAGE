import { Component } from 'react';
import {Link} from 'umi';
import styles from './index.less';
import React from 'react';
import { Icons, Images } from '../../../assets';

class Mining extends Component {
  render() {
    return <div className={styles.mining}>
      <section>
        <p>推广获得超高返利</p>
        <div
          className={styles.card}
          style={{ backgroundImage: `url(${Images.cardBg})` }}
        >
          <p>
            <small>昨日获得返点收益</small>
          </p>
          <div className={styles.earnings}>
            <span>200</span>
            <small>DGT</small>
          </div>
          <aside>
            <span>收益详情</span>
            <img width="34" src={Icons.arrowWhiteRight} alt=""/>
          </aside>
        </div>
      </section>
      <section>
        <h3>
          <img src={Icons.dIcon} alt=""/>
          POG挖矿
        </h3>
        <p>使用矿机需要您在安卓设备上下载自由侠APP并登录与上传的二维码一样的支付宝账号，保持自由侠始终在打开状态，如果您没有打开自由侠，发现后客服将在后台扣除当日的挖矿奖励。</p>
        <p>
          自由侠APP下载地址：
          <a href="www.ziyouxia.com">www.ziyouxia.com</a>
        </p>
      </section>
      <section className={styles.buy}>
        <p>请选择购买的矿机等级</p>
        <ul className={styles.levels}>
          <li className={styles.active}>1级</li>
          <li>2级</li>
          <li>3级</li>
        </ul>
        <aside className={styles.amount}>
          <small>交易额 1000 DAGE</small>
        </aside>
        <button>购买</button>
      </section>
      <section className={styles.detail}>
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
            119 DGC
            &nbsp;
            <Link to="/wallet/mining-detail">挖矿详情</Link>
          </span>
        </div>
        <div className={styles.row}>
          <label>当前勋章等级</label>
          <span>1级</span>
        </div>
      </section>
    </div>;
  }
}

export default Mining;
