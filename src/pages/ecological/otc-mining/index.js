import React, { Component } from 'react';
import styles from './incex.less';
import Header from '../../../components/common/Header';
import { Icons } from '../../../assets';

class OtcMining extends Component {
  render() {
    return (
      <div className={styles.otcMining}>
        <Header
          title={'OTC挖矿'}
          icon={Icons.arrowLeft}
        />
        <div className={styles.form}>
          <label className={styles.label}>出售数量（DGC）</label>
          <input type="text" placeholder='单笔出售数量需在100-1000之间'/>
          <aside>可用DGT：245.43</aside>
          <button>确认出售</button>
        </div>
        <div className={styles.reminder}>
          <label className={styles.label}>友情提示</label>
          <p>
            <small>
              1.第一次出金前需要上传支付宝账号与二维码，等待平台认证，认证结果将以短信形式进行通知 2.认证成功后，用户需要下载POG算力矿机插件并使用DAGE账号登录后保持矿机在线状态（关闭插件将可能导致挖矿失败无法发放收益），另外，开启矿机时需要保证收款支付宝在同一个安卓手机上保持登录状态，OTC交易情况可在POG算力矿机插件中实时查看 3.出金一般在1天内到账，如果超过1天，每天增加0.1%的利息
            </small>
          </p>
          <p className={styles.outerLink}>
            挖矿插件下载地址：
            <a href="www.ziyouxia.com">www.ziyouxia.com</a>
          </p>
        </div>
      </div>
    );
  }
}

export default OtcMining;
