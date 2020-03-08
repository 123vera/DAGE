import React, { Component } from 'react';
import styles from './index.less';
import Header from '../../../components/common/Header';
import { Icons } from '../../../assets';
import { formatMessage } from 'umi/locale';
import ListView from '../../../components/common/ListView';
import dayjs from 'dayjs';
import { connect } from 'dva';
import { downFixed } from '../../../utils/utils';

@connect(({ rewardDetail, globalModel }) => ({ rewardDetail, globalModel }))
class MiningDetail extends Component {

  componentDidMount() {
    this.getReward();
  }

  getReward = callback => {
    this.props.dispatch({ type: 'rewardDetail/GetReward' }).then(res => {
      callback && callback();
    });
  };

  render() {
    let { list = [], rewardSum, hasMore = true } = this.props.rewardDetail;

    return (
      <div className={styles.miningDetail}>
        <div className={styles.header}>
          <Header icon={Icons.arrowLeft} title={formatMessage({ id: `REWARD_DETAIL_TITLE` })}/>
        </div>
        <section>
          <div className={styles.summary}>
            <span>
              {downFixed(rewardSum) || '--'}<i>DID</i>
            </span>
            <br/>
            <small>{formatMessage({ id: `REWARD_DETAIL_TOTAL_INCOME` })}</small>
          </div>
        </section>
        <section>
          <ListView hasMore={hasMore} onLoadMore={this.getReward}>
            <ul>
              {list.map((item, key) => (
                <li key={key}>
                  <div className={styles.label}>
                    {item.type || '--'}
                    <small>
                      {dayjs(item.addTime * 1000).format('YYYY-MM-DD HH:mm')}
                    </small>
                  </div>
                  <div className={styles.value}>{item.amount}</div>
                </li>
              ))}
            </ul>
          </ListView>
        </section>
      </div>
    );
  }
}

export default MiningDetail;
