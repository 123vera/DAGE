import { Component } from 'react';
import styles from './index.less';
import React from 'react';
import { Icons } from '../../../assets';

class Activation extends Component {
  render() {
    return <div className={styles.mining}>
      <section>
        <p>推广获得超高返利</p>
        <div className={styles.card}>
          <p>
            <small>昨日获得返点收益</small>
          </p>
          <div>
            200
            <small>DGT</small>
          </div>
          <aside>
            <span>收益详情</span>
            <img src={Icons.dIcon} alt=""/>
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
        <p>请选择购买的矿机等级</p>
        <ul>
          <li>1级</li>
          <li>2级</li>
          <li>3级</li>
        </ul>
        <aside>
          <small>交易额 1000 DAGE</small>
        </aside>
        <button>购买</button>
      </section>
    </div>;
  }
}

export default Activation;
