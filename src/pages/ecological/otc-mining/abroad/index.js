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
            title={'OTC挖矿国际区'}
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
            </small>
          </p>
        </div>
      </div>
    );
  }
}

export default OtcMining;
