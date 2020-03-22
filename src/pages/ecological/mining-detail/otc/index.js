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
        <Header icon={Icons.arrowLeft} title={'OTC挖矿详情'}/>
        <section>
          <div className={styles.summary}>
            <span>
              {downFixed(dgcTotal)}<i>DGC</i>
            </span>
            <b>+</b>
            <span>
              {downFixed(didTotal)}<i>DID</i>
            </span>
            <br/>
            <small>{'OTC挖矿总收益'}</small>
          </div>
          <p className={styles.intro}>仅显示最近三天的收益详情，若想查看过往内容，请至资金流水中查看</p>
        </section>
        <section>
          <ul>
            {
              otcList.map(otc =>
                <li key={otc.id}>
                  <div className={styles.label}>
                    {otc.remark}
                    <small>{dayjs(otc.addTime * 1000).format('YYYY-MM-DD HH:mm')}</small>
                  </div>
                  <div className={styles.value}>{downFixed(otc.amount)}</div>
                </li>,
              )
            }
          </ul>
        </section>
      </div>
    );
  }
}

export default MiningDetailOtc;
