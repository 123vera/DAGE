import React, { Component } from 'react';
import styles from './index.less';
import Header from '../../../../components/common/Header';
import { Icons } from '../../../../assets';
import { formatMessage } from 'umi/locale';

class MiningDetailOtc extends Component {
  render() {
    return (
      <div className={styles.miningDetail}>
        <Header icon={Icons.arrowLeft} title={'OTC挖矿详情'} />
        <section>
          <div className={styles.summary}>
            <span>
              1460<i>DGC</i>
            </span>
            <br />
            <small>{'OTC挖矿总收益'}</small>
          </div>
          <p className={styles.intro}>仅显示最近三天的收益详情，若想查看过往内容，请至资金流水中查看</p>
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

export default MiningDetailOtc;
