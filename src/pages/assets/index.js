import React, { Component } from 'react';
import styles from './index.less';
import { connect } from 'dva';
import { router } from 'umi';
import { formatMessage } from 'umi/locale';
import { downFixed } from '../../utils/utils';

const list = [
  {
    type: 'USDT',
    amount: '245.32',
    price: 3.3,
  },
  {
    type: 'DGT',
    amount: '245.32',
    price: 3.3,
  },
  {
    type: 'DGT',
    amount: '245.32',
    price: 3.3,
  },
];
@connect(({ assetsHome, globalModel }) => ({ assetsHome, globalModel }))
class Assets extends Component {
  render() {
    const {
      assetsHome: { list, totalAmount },
    } = this.props;

    return (
      <div id={styles.assetsHome}>
        <section className={styles.banner}>
          <label>
            总账户资产折合（USD）<span>{downFixed(totalAmount)}</span>
          </label>
          <ul>
            <li>充币</li>
            <li>提币</li>
            <li>划转</li>
          </ul>
        </section>

        <section className={styles.listHeader}>
          <ul className={styles.bgDark}>
            <li className={styles.active}>DAGE钱包</li>
            <li>游戏钱包</li>
          </ul>
          <div className={`${styles.bgDark} ${styles.totalAmount}`}>
            总账户资产折合（USD）<span>{downFixed(totalAmount)}</span>
          </div>
        </section>

        <section className={styles.listContent}>
          <ul>
            {list.map((item, key) => (
              <li key={key.toString()}>
                <p>{item.type}</p>
                <table>
                  <thead>
                    <tr>
                      <th>可用</th>
                      <th>单价（USD)</th>
                      <th>折合（USD)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{downFixed(item.amount)}</td>
                      <td>{downFixed(item.price)}</td>
                      <td>{downFixed(item.amount * item.price)}</td>
                    </tr>
                  </tbody>
                </table>
              </li>
            ))}
          </ul>
        </section>
      </div>
    );
  }
}

export default Assets;
