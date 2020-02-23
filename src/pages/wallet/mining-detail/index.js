import React, { Component } from 'react';
import styles from './index.less';
import Header from '../../../components/common/Header';
import { Icons } from '../../../assets';


class MiningDetail extends Component {
  render() {
    return (
      <div className={styles.miningDetail}>
        <Header
          icon={Icons.arrowLeft}
          title="挖矿详情"
        />
        <section>
          <div className={styles.summary}>
            <span>1460<i>DGC</i></span>
            <br/>
            <small>挖矿总收益</small>
          </div>
        </section>
        <section>
          <ul>
            <li>
              <div className={styles.label}>
                单体挖矿
                <small>02-14 14:43</small>
              </div>
              <div className={styles.value}>
                + 300
              </div>
            </li>
            <li>
              <div className={styles.label}>
                联合挖矿
                <small>02-14 14:43</small>
              </div>
              <div className={styles.value}>
                + 300
              </div>
            </li>
            <li>
              <div className={styles.label}>
                集体挖矿
                <small>02-14 14:43</small>
              </div>
              <div className={styles.value}>
                + 300
              </div>
            </li>
          </ul>
        </section>
      </div>
    );
  }
}

export default MiningDetail;
