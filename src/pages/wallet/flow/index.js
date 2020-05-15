import React, { Component } from 'react';
import styles from './index.less';
import { connect } from 'dva';
import { router } from 'umi';
import dayjs from 'dayjs';
import { formatMessage } from 'umi-plugin-locale';
import { downFixed } from '../../../utils/utils';
import { Icons } from '../../../assets';
import PageHeader from '../../../components/common/PageHeader';
import ListView from '../../../components/common/ListView';
import AssetsFooter from '../../../components/partials/AssetsFooter';

@connect(({ walletFlow, globalModel }) => ({ walletFlow, globalModel }))
class WalletFlow extends Component {
  componentDidMount() {
    const { type } = this.props.location.query;
    this.initData(type);
    this.getFlow();
  }

  initData = async type => {
    await this.props.dispatch({
      type: 'walletFlow/UpdateState',
      payload: { type, list: [], page: 1 },
    });

    router.replace(`${window.location.pathname}?type=${type}`);
  };

  getFlow = callback => {
    const { dispatch } = this.props;
    dispatch({ type: 'walletFlow/GetAssetFlow' }).then(res => {
      if (res.status !== 1) {
        return;
      }
      callback && callback();
    });
  };

  render() {
    const { type, balance, price, list, hasMore } = this.props.walletFlow;

    return (
      <div className={styles.walletFlow}>
        <PageHeader leftContent={{ icon: Icons.arrowLeft }} />

        <section className={styles.contentTop}>
          <p> {type.toUpperCase()}</p>
          <table>
            <thead>
              <tr>
                <th>{formatMessage({ id: `EXCHANGE_CAN_USE` })}</th>
                <th>{formatMessage({ id: `ASSETS_UNIT_PRICE` })}（USD)</th>
                <th>{formatMessage({ id: `ASSETS_CONVERT` })}（USD)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{(balance && downFixed(balance)) || 0}</td>
                <td>{(price && downFixed(price, 4)) || '--'}</td>
                <td>{downFixed(Number(balance) * Number(price)) || '--'}</td>
                {/* <td>{(Number(balance) && price && downFixed(Number(balance) * price)) || '--'}</td> */}
              </tr>
            </tbody>
          </table>
        </section>

        <section className={styles.details}>
          <span>{formatMessage({ id: `OTC_MINING_DETAIL_NAME` })}</span>
          <ListView hasMore={hasMore} onLoadMore={this.getFlow}>
            <ul>
              {list.map(item => (
                <li key={item.id}>
                  <div className={styles.label}>
                    {item && item.remark}
                    <small>{item && dayjs(item.addTime * 1000).format('YYYY-MM-DD HH:mm')}</small>
                  </div>
                  <div
                    className={`${styles.value} ${
                      item.amount.includes('-') ? styles.decrease : ''
                    }`}
                  >
                    {downFixed(item.amount)}
                  </div>
                </li>
              ))}
            </ul>
          </ListView>
        </section>

        <AssetsFooter key={type} type={type} />
      </div>
    );
  }
}

export default WalletFlow;
