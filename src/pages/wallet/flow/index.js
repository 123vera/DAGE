import React, { Component } from 'react';
import styles from './index.less';
import Header from '../../../components/common/Header';
import { Icons } from '../../../assets';
import { connect } from 'dva';

@connect(({ walletFlow }) => ({ walletFlow }))
class WalletFlow extends Component {
  render() {
    return (
      <div className={styles.walletFlow}>
        <section className={styles.header}>
          <Header
            title="资金流水"
            icon={{ src: Icons.arrowLeft, width: '21px' }}
            action={{ icon: { src: Icons.more } }}
            onAction={(e) => this.onShowMenus(e)}
          />
        </section>
      </div>
    );
  }
}

export default WalletFlow;
