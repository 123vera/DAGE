import React, { Component } from 'react';
import styles from './incex.less';
import Header from '../../../../components/common/Header';
import { Icons } from '../../../../assets';

class OtcMining extends Component {
  render() {
    return (
      <div className={styles.otcMining}>
        <header>
          <Header
            title={'OTC挖矿中国区'}
            icon={Icons.arrowLeft}
            rightContent={{ text: '下载插件', textStyle: { color: '#F3AF66', fontSize: '24px' } }}
          />
        </header>
        <div className={styles.form}>
          <label className={styles.label}>出售数量（DGC）</label>
          <input type="text" placeholder='单笔出售数量需在100-1000之间'/>
          <aside>
            <span>OTC交易额度：245.43</span>
            <span>可用DGT：245.43</span>
          </aside>
          <button>确认出售</button>
        </div>
        <div className={styles.reminder}>
          <label className={styles.label}>友情提示</label>
          <p>
            <small>
              1.第一次出金前需要上传支付宝账号与二维码，等待平台认证，认证结果将以短信形式进行通知
            </small>
          </p>
          <p>
            <small>
              2.认证成功后，用户需要下载POG算力矿机插件并使用DAGE账号登录后保持矿机在线状态（关闭插件将可能导致挖矿失败无法发放收益），另外，开启矿机时需要保证收款支付宝在同一个安卓手机上保持登录状态，OTC交易情况可在POG算力矿机插件中实时查看
            </small>
          </p>
          <p>
            <small>
              3.每次出售数量的0.3%作为OTC挖矿奖金发放给用户，奖金的70%发放DGC，30%发放DID
            </small>
          </p>
          <p>
            <small>
              4.出售DGT需要消耗OTC交易额度，当OTC交易额度不足时，无法进行出售DGT，OTC交易额度可用DID兑换获得。
            </small>
          </p>
          <p>
            <small>
              5.正在进行OTC挖矿的DGT最高为30,000个，若出售DGT导致OTC挖矿的DGT超过30,000个，则此次出售不会成功。
              质押30000个DEP后可以享受额外代数收益，即1代200%，2到10代每代10%。
            </small>
          </p>
        </div>
      </div>
    );
  }
}

export default OtcMining;
