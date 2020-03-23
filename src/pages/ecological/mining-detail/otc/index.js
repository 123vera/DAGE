import React, { Component } from 'react';
import styles from './index.less';
import Header from '../../../../components/common/Header';
import { Icons } from '../../../../assets';
import { formatMessage } from 'umi/locale';
import { connect } from 'dva';
import { downFixed } from '../../../../utils/utils';
import dayjs from 'dayjs';

@connect(({ otcMiningDetail }) => ({ otcMiningDetail }))
class MiningDetailOtc extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'otcMiningDetail/OtcDetail' });
  }

  render() {
    const { dgcTotal, didTotal, otcList = [] } = this.props.otcMiningDetail;

    return (
      <div className={styles.miningDetail}>
        <Header icon={Icons.arrowLeft} title={formatMessage({ id: `OTC_DETAIL_TITLE` })} />
        <section>
          <div className={styles.summary}>
            <span>
              {downFixed(dgcTotal)}
              <i>DGC</i>
            </span>
            <b>+</b>
            <span>
              {downFixed(didTotal)}
              <i>DID</i>
            </span>
            <br />
            <small>{formatMessage({ id: `OTC_DETAIL_TOTAL_REVENUE` })}</small>
          </div>
          <p className={styles.intro}>{formatMessage({ id: `OTC_DETAIL_TIP` })}</p>
        </section>
        <section>
          <ul>
            {otcList.map(otc => (
              <li key={otc.id}>
                <div className={styles.label}>
                  {otc.type}
                  <small>{dayjs(otc.addTime * 1000).format('YYYY-MM-DD HH:mm')}</small>
                </div>
                <div className={styles.value}>
                  {downFixed(otc.amount) + ' ' + otc.coin.toUpperCase()}
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    );
  }
}

export default MiningDetailOtc;
