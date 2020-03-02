import React, { Component } from 'react';
import styles from './index.less';
import Header from '../../../components/common/Header';
import { connect } from 'dva';
import { router } from 'umi';
import { Icons } from '../../../assets';
import dayjs from 'dayjs';
import ListView from '../../../components/common/ListView';

const withdrawStatus = [
  {
    value: 0,
    label: '待审核',
    color: '#6D778B',
  }, {
    value: 1,
    label: '提币中',
    color: '#6D778B',
  }, {
    value: 2,
    label: '提币成功',
    color: '#00C873',
  }, {
    value: 3,
    label: '审核拒绝',
    color: '#FF3750',
  },
];

@connect(({ withdrawRecord }) => ({ withdrawRecord }))
class WalletFlow extends Component {
  componentDidMount() {
    this.getWithdrawRecord();
  }

  getWithdrawRecord = (callback) => {
    this.props.dispatch({ type: 'withdrawRecord/GetWithdrawRecord' })
      .then(res => {
        console.log(res);
        callback && callback();
      });
  };

  getStatus = (value) => {
    return withdrawStatus.find(i => i.value === value) || {};
  };

  render() {
    let { list = [], hasMore = true } = this.props.withdrawRecord;

    return (
      <div className={styles.withdrawRecord}>
        <section className={styles.header}>
          <Header
            icon={Icons.arrowLeft}
            title="提币记录"
            onHandle={() => router.push('/wallet/withdraw')}
          />
        </section>
        <ListView
          hasMore={hasMore}
          onLoadMore={this.getWithdrawRecord}
        >
          <ul>
            {list.map((item) =>
              <li key={item.id}>
                <div className={styles.row}>
                  <label>地址</label>
                  <p>{item.walletTo}</p>
                </div>
                <div className={styles.row}>
                  <label>时间</label>
                  <p>{dayjs(item.addTime).format('YYYY-MM-DD')}</p>
                </div>
                <div className={styles.row}>
                  <label>数量</label>
                  <p>{item.amount}</p>
                </div>
                <div className={styles.row}>
                  <label>编号</label>
                  <p>{item.id}</p>
                </div>
                <div className={styles.row}>
                  <label>状态</label>
                  <p style={{ color: this.getStatus(item.status).color }}>
                    {this.getStatus(item.status).label}
                  </p>
                </div>
              </li>)
            }
          </ul>
        </ListView>
      </div>
    );
  }
}

export default WalletFlow;
