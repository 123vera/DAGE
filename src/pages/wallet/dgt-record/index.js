import React, { Component } from 'react';
import PageHeader from '../../../components/common/PageHeader';
import ARROW_LEFT from '@/assets/dark/arrow-left.png';
import { connect } from 'dva';
import dayjs from 'dayjs';
import { formatMessage } from 'umi-plugin-locale';
import styles from './index.less';
import { downFixed } from '../../../utils/utils';
import ListView from '../../../components/common/ListView';

@connect(({ dgtRecord }) => ({ dgtRecord }))
class Index extends Component {
  componentDidMount() {
    this.getRecord();
  }

  getRecord = callback => {
    this.props.dispatch({ type: 'dgtRecord/RmbRechargeRecord' }).then(res => {
      callback && callback();
    });
  };

  render() {
    const { list, hasMore = true } = this.props.dgtRecord;
    return (
      <div id={styles.dgtRecord}>
        <PageHeader
          title={formatMessage({ id: `DGT_RECORD_TITLE` })}
          leftContent={{ icon: ARROW_LEFT }}
        />

        <ListView hasMore={hasMore} onLoadMore={this.getRecord}>
          <ul>
            {list.map(i => (
              <li key={i.id}>
                <div className={styles.status}>
                  <RecordStatus status={i.status} />
                </div>
                <p>
                  {formatMessage({ id: `DGT_ALIPAY_ORDERID` })}
                  {i.orderno}
                </p>
                <div className={styles.time}>
                  <small>
                    {formatMessage({ id: `DGT_RECORD_TIME` })}
                    {dayjs(i.addTime * 1000).format('MM:DD HH:mm')}
                  </small>
                  <span>{downFixed(i.num)}</span>
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

function RecordStatus({ status }) {
  switch (status) {
    case 0:
      return (
        <span className={styles.waiting}>{formatMessage({ id: `DGT_RECORD_STATUS_WAITING` })}</span>
      );
    case -1:
      return <span className={styles.fail}>{formatMessage({ id: `DGT_RECORD_STATUS_FAIL` })}</span>;
    case 1:
      return (
        <span className={styles.success}>{formatMessage({ id: `DGT_RECORD_STATUS_SUCCESS` })}</span>
      );
    default:
      return <span> </span>;
  }
}
