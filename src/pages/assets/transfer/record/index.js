import React, { Component } from 'react';
import styles from './index.less';
import Header from '../../../../components/common/Header';
import { Icons } from '../../../../assets';
import { Toast } from 'antd-mobile';
import dayjs from 'dayjs';
import ListView from '../../../../components/common/ListView';
import { connect } from 'dva';
import { downFixed } from '../../../../utils/utils';

@connect(({ transferRecord }) => ({ transferRecord }))
class Index extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'transferRecord/UpdateState',
      payload: {
        hasMore: true,
        list: [],
        page: 1,
      },
    });
    this.getList();
  }

  getList = callback => {
    this.props.dispatch({ type: 'transferRecord/GetTransferRecord' }).then(res => {
      callback && callback();
      if (res.status !== 1) Toast.info(res.msg);
    });
  };

  render() {
    const { list, hasMore } = this.props.transferRecord;

    return (
      <div>
        <Header
          icon={Icons.arrowLeft}
          title={'划转记录'}
        />
        <ListView hasMore={hasMore} onLoadMore={this.getList}>
          <ul>
            {list.map((item, key) => (
              <li key={key}>
                <div className={styles.title}>
                  {item.type.toLocaleUpperCase()}
                </div>
                <div className={styles.row}>
                  <div className={styles.column}>
                    <label>数量</label>
                    <span>{downFixed(item.num)}</span>
                  </div>
                  <div className={`${styles.column} ${styles.center}`}>
                    <label>类型</label>
                    <span>{item.remark}</span>
                  </div>
                  <div className={styles.column}>
                    <label>时间</label>
                    <span>{dayjs(item.addTime * 1000).format('MM-DD HH:mm')}</span>
                  </div>
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
