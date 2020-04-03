import React, { Component } from 'react';
import { Icons } from '../../../assets';
import { connect } from 'dva';
import { router } from 'umi';
import { formatMessage } from 'umi/locale';
import Menus from '../../../components/common/Menus';
import Header from '../../../components/common/Header';
import styles from './index.less';

@connect(({ globalModel, recharge }) => ({ globalModel, recharge }))
class Index extends Component {
  state = {
    showMenus: false,
  };

  render() {
    const { showMenus } = this.state;

    return (
      <div id={styles.dgtRecharge}>
        <div className={styles.header}>
          <Header
            icon={Icons.arrowLeft}
            centerContent={{
              text: 'DGT法币充值',
              icon: Icons.arrowDown,
              reverse: true,
              onHandle: () => this.setState({ showMenus: !showMenus }),
            }}
            onHandle={() => router.push('/home/wallet')}
          />
          {showMenus && (
            <div className={styles.menus}>
              <Menus menus={[]} textAlign="center" hasBorder onHandle={this.changeCoin} />
            </div>
          )}
        </div>

        <section className={styles.inputContent}>
          <label>
            <span>充值金额（支付宝支付）</span>
            <input type="text" placeholder={'输入充值CNY数量'} />
          </label>
          <p>当前汇率：1CNY = 0.14DGT</p>
        </section>

        <section className={styles.amountList}>
          <ul>
            <li className={styles.activity}>200</li>
            <li>500</li>
            <li>1000</li>
            <li>2000</li>
            <li>5000</li>
            <li>20000</li>
          </ul>
          <p>实际到账：32.4 DGT</p>
          <button className={styles.btn}>充值</button>
        </section>

        <ul className={styles.tips}>
          <li>3232323</li>
          <li>323</li>
          <li>• 单笔最小金额为200CNY，最大金额为20,000CNY。 </li>
          <li>• 充值以实际到账金额为准。 </li>
          <li>• 每次充值必须在钱包充值页面重新获取二维码。 </li>
        </ul>
      </div>
    );
  }
}

export default Index;
