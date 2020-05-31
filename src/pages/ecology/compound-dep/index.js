import React, { Component } from 'react';
import Header from '../../../components/common/Header';
import { Icons } from '../../../assets';
import styles from './index.less';

class CompoundDep extends Component {
  render() {
    return (
      <div>
        <Header icon={Icons.arrowLeft} title={'合成DEP'} />
        <article className={styles.article}>
          <section className={styles.content}>
            <div className={styles.proportion}>
              <label>合成比例</label>
              <p>1 DEP = 0.5 SBC + 0.5 USDT</p>
            </div>
            <div className={styles.row}>
              <label>合成DEP数量</label>
              <div className={styles.inputBox}>
                <input
                  type="text"
                  autoComplete="off"
                  placeholder={'请输入DEP数量'}
                  onChange={e => this.onWalletChange(e.target.value)}
                />
              </div>
            </div>
            <div className={styles.expend}>
              <label>需消耗SBC</label>
              <span>--</span>
            </div>
            <div className={styles.expend}>
              <label>需消耗USDT</label>
              <span>--</span>
            </div>
          </section>
          <button className={styles.submit}>确认合成</button>
        </article>
      </div>
    );
  }
}

export default CompoundDep;
