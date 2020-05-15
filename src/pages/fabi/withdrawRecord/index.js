import React, { Component } from 'react';
import styles from './index.less';
import Header from '../../../components/common/Header';
import { connect } from 'dva';
import { Icons } from '../../../assets';
import dayjs from 'dayjs';
import ListView from '../../../components/common/ListView';
import { formatMessage } from 'umi/locale';
import { downFixed } from '../../../utils/utils';

const withdrawStatus = [
  {
    value: 0,
    label: formatMessage({ id: `RECORD_WITHDRAW` }),
    background: '#0078FF',
  },
  {
    value: 1,
    label: formatMessage({ id: `RECORD_MENTION` }),
    background: '#00C873',
  },
  {
    value: -1,
    label: formatMessage({ id: `RECORD_AUDIT_REJECT` }),
    background: '#FF3750',
  },
  {
    value: -2,
    label: formatMessage({ id: `DGT_RECORD_STATUS_FAIL` }),
    background: '#6D778B',
  },
];

@connect(({ dgtWithdrawRecord }) => ({ dgtWithdrawRecord }))
class Index extends Component {
  componentDidMount() {
    const { location, dispatch } = this.props;
    const { type } = location.query;
    dispatch({
      type: 'dgtWithdrawRecord/UpdateState',
      payload: {
        type,
        list: [],
        page: 1,
        row: 10,
        hasMore: true,
      },
    });
    this.getWithdrawRecord();
  }

  getWithdrawRecord = callback => {
    this.props.dispatch({ type: 'dgtWithdrawRecord/GetWithdrawRecord' }).then(res => {
      callback && callback();
    });
  };

  getStatus = value => {
    return withdrawStatus.find(i => i.value === value) || {};
  };

  render() {
    let { list = [], hasMore = true } = this.props.dgtWithdrawRecord;

    return (
      <div className={styles.withdrawRecord}>
        <section className={styles.header}>
          <Header icon={Icons.arrowLeft} title={formatMessage({ id: `FIAT_WITHDRAWAL_RECORD` })} />
        </section>
        <ListView hasMore={hasMore} onLoadMore={this.getWithdrawRecord}>
          <ul>
            {list.map(item => (
              <li key={item.userId}>
                <div className={styles.row}>
                  <span
                    className={styles.status}
                    style={{ background: this.getStatus(item.status).background }}
                  >
                    {this.getStatus(item.status).label}
                  </span>
                </div>
                <div className={styles.row}>
                  {formatMessage({ id: `DGT_ALIPAY_ORDERID` })}
                  {item.orderNo}
                </div>
                <div className={styles.row}>
                  <small>
                    {formatMessage({ id: `RECORD_LI_TIME` })}：
                    {dayjs(item.addTime * 1000).format('YYYY.MM.DD HH:mm')}
                  </small>
                  <span>{downFixed(item.num)}</span>
                </div>
              </li>
            ))}
          </ul>
        </ListView>
      </div>
    );
  }
}

export default Index;
