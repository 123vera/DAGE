import React, { Component } from 'react';
import styles from './index.less';
import PageHeader from '../../../components/common/PageHeader';
import { connect } from 'dva';
import { Icons } from '../../../assets';


@connect(({ walletFlow }) => ({ walletFlow }))
class WalletFlow extends Component {
  render() {
    return (
      <div className={styles.walletFlow}>
        <section className={styles.header}>
          <PageHeader
            leftContent={{ icon: Icons.arrowLeft }}
            title="资金流水"
          />
        </section>
        <section>
          <div className={styles.summary}>
            <div className={styles.select}>
              DGC
              <img src={Icons.arrowUpDown} alt=""/>
            </div>
            <div>余额：300.04</div>
          </div>
        </section>
        <section>
          <ul>
            <li>
              <div className={styles.label}>
                充值
                <small>02-14 14:43</small>
              </div>
              <div className={styles.value}>
                + 300
              </div>
            </li>
            <li>
              <div className={styles.label}>
                充值
                <small>02-14 14:43</small>
              </div>
              <div className={styles.value}>
                + 300
              </div>
            </li>
            <li>
              <div className={styles.label}>
                充值
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

export default WalletFlow;
