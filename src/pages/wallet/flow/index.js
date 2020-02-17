import React, { Component } from 'react';
import styles from './index.less';
import PageHeader from '@/components/common/PageHeader';
import MORE from '@/assets/icons/more.png';
import { connect } from 'dva';

@connect(({ walletFlow }) => ({ walletFlow }))
class WalletFlow extends Component {
  render() {
    return (
      <div className={styles.walletFlow}>
        <section className={styles.header}>
          <PageHeader
            title="资金流水"
            rightContent={{ icon: MORE, onHandle: e => this.onShowMenus(e) }}
          />
        </section>
      </div>
    );
  }
}

export default WalletFlow;
