import React, { Component } from 'react';
import styles from './index.less';
import Header from '../../../components/common/Header';
import { connect } from 'dva';
import { router } from 'umi';
import { Icons } from '../../../assets';
import dayjs from 'dayjs';
import ListView from '../../../components/common/ListView';
import { formatMessage } from 'umi/locale';
import { downFixed } from '../../../utils/utils';

const withdrawStatus = [
  {
    value: 0,
    label: formatMessage({ id: `RECORD_AUDIT` }),
    color: '#6D778B',
  },
  {
    value: 1,
    label: formatMessage({ id: `RECORD_WITHDRAW` }),
    color: '#6D778B',
  },
  {
    value: 2,
    label: formatMessage({ id: `RECORD_MENTION` }),
    color: '#00C873',
  },
  {
    value: 3,
    label: formatMessage({ id: `RECORD_AUDIT_REJECT` }),
    color: '#FF3750',
  },
];

@connect(({ withdrawRecord }) => ({ withdrawRecord }))
class WalletFlow extends Component {
  componentDidMount() {
    const { location, dispatch } = this.props;
    const { type } = location.query;
    dispatch({
      type: 'withdrawRecord/UpdateState', payload: {
        type, list: [],
        page: 1,
        row: 10,
        hasMore: true,
      },
    });
    this.getWithdrawRecord();
  }

  getWithdrawRecord = callback => {
    this.props.dispatch({ type: 'withdrawRecord/GetWithdrawRecord' }).then(res => {
      callback && callback();
    });
  };

  getStatus = value => {
    return withdrawStatus.find(i => i.value === value) || {};
  };

  render() {
    let { list = [], hasMore = true, type } = this.props.withdrawRecord;

    return (
      <div className={styles.withdrawRecord}>
        <section className={styles.header}>
          <Header
            icon={Icons.arrowLeft}
            title={formatMessage({ id: `RECORD_TITLE` })}
            onHandle={() => router.push(`/wallet/withdraw?type=${type}`)}
          />
        </section>
        <ListView hasMore={hasMore} onLoadMore={this.getWithdrawRecord}>
          <ul>
            {list.map(item => (
              <li key={item.id}>
                <div className={styles.row}>
                  <label>{formatMessage({ id: `RECORD_LI_ADDRESS` })}</label>
                  <p>{item.walletTo}</p>
                </div>
                <div className={styles.row}>
                  <label>{formatMessage({ id: `RECORD_LI_TIME` })}</label>
                  <p>
                    {dayjs(item.addTime * 1000).format('YYYY-MM-DD HH:mm')}
                  </p>
                </div>
                <div className={styles.row}>
                  <label>{formatMessage({ id: `RECORD_LI_AMOUNT` })}</label>
                  <p>{downFixed(item.amount)}</p>
                </div>
                <div className={styles.row}>
                  <label>{formatMessage({ id: `RECORD_LI_NO` })}</label>
                  <p>{item.id}</p>
                </div>
                <div className={styles.row}>
                  <label>{formatMessage({ id: `RECORD_LI_STATUS` })}</label>
                  <p style={{ color: this.getStatus(item.status).color }}>
                    {this.getStatus(item.status).label}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </ListView>
      </div>
    );
  }
}

export default WalletFlow;
