import React, { Component } from 'react';
import styles from './index.less';
import Header from '../../../components/common/Header';
import { Icons } from '../../../assets';
import { formatMessage } from 'umi/locale';

class MiningDetail extends Component {
  render() {
    return (
      <div className={styles.miningDetail}>
        <Header icon={Icons.arrowLeft} title={formatMessage({ id: `MINING_DETAIL_TITLE` })} />
        <section>
          <div className={styles.summary}>
            <span>
              1460<i>DGT</i>
            </span>
            <br />
            <small>{formatMessage({ id: `MINING_DETAIL_TOTAL_INCOME` })}</small>
          </div>
        </section>
        <section>
          <ul>
            <li>
              <div className={styles.label}>
                {formatMessage({ id: `MINING_DETAIL_MONOMER` })}
                <small>02-14 14:43</small>
              </div>
              <div className={styles.value}>+ 300</div>
            </li>
            <li>
              <div className={styles.label}>
                {formatMessage({ id: `MINING_DETAIL_JOINT` })}
                <small>02-14 14:43</small>
              </div>
              <div className={styles.value}>+ 300</div>
            </li>
            <li>
              <div className={styles.label}>
                {formatMessage({ id: `MINING_DETAIL_COLLECTIVE` })}
                <small>02-14 14:43</small>
              </div>
              <div className={styles.value}>+ 300</div>
            </li>
          </ul>
        </section>
      </div>
    );
  }
}

export default MiningDetail;
