import React, { Component } from 'react';
import styles from './index.less';
import Header from '../../../components/common/Header';
import { connect } from 'dva';
import { router } from 'umi';
import { Icons } from '../../../assets';
import Menus from '../../../components/common/Menus';
import dayjs from 'dayjs';
import ListView from '../../../components/common/ListView';
import { formatMessage } from 'umi-plugin-locale';

// const menus = [
//   {
//     value: 'dgt',
//     label: 'DGT',
//   },
//   {
//     value: 'usdt',
//     label: 'USDT',
//   },
// ];

@connect(({ walletFlow, globalModel }) => ({ walletFlow, globalModel }))
class WalletFlow extends Component {
  state = {
    showMenus: false,
  };

  componentDidMount() {
    this.getInitCoins();
  }

  getInitCoins = async () => {
    const { dispatch } = this.props;
    await dispatch({
      type: 'globalModel/ExchangeInit',
    });
    let menus = [];
    let iArr = [];
    this.props.globalModel.coinTeams.forEach(team => {
      team.split('_').map(i => iArr.push(i));
    });

    [...new Set(iArr)].forEach(value => {
      menus.push({
        label: value.toUpperCase(),
        value: value.toLowerCase(),
      });
    });

    await dispatch({
      type: 'walletFlow/UpdateState',
      payload: { coin: menus[0] },
    });
    this.getFlow();
  };

  changeCoin = coin => {
    this.props.dispatch({
      type: 'walletFlow/UpdateState',
      payload: { coin },
    });
    this.getFlow();
  };

  getFlow = callback => {
    const {
      dispatch,
      walletFlow: { coin, page, row, list },
    } = this.props;
    dispatch({
      type: 'walletFlow/GetAssetFlow',
      payload: {
        type: coin.value,
        page,
        row,
      },
    }).then(res => {
      if (res.status !== 1) {
        return;
      }
      const { list: newList, balance } = res.data;
      list.push(...newList);
      dispatch({
        type: 'walletFlow/UpdateState',
        payload: {
          page: page + 1,
          hasMore: row === newList.length,
          balance,
          list,
        },
      });
      callback && callback();
    });
    this.setState({ showMenus: false });
  };

  render() {
    const { coin, balance, list, hasMore } = this.props.walletFlow;
    const { showMenus } = this.state;
    const { coinTeams } = this.props.globalModel;

    let menus = [];
    let iArr = [];
    coinTeams.forEach(team => {
      team.split('_').map(i => iArr.push(i));
    });

    [...new Set(iArr)].forEach(value => {
      menus.push({
        label: value.toUpperCase(),
        value: value.toLowerCase(),
      });
    });

    return (
      <div className={styles.walletFlow}>
        <section className={styles.header}>
          <Header
            icon={Icons.arrowLeft}
            title={formatMessage({ id: `FLOW_TITLE` })}
            onHandle={() => router.push('/home/wallet')}
          />
        </section>
        <section>
          <div className={styles.summary}>
            <div className={styles.coin}>
              <div
                className={styles.select}
                onClick={() => this.setState({ showMenus: !showMenus })}
              >
                {coin.label}
                <img src={Icons.arrowUpDown} alt="" />
              </div>
              {showMenus && (
                <div className={styles.options}>
                  <Menus menus={menus} textAlign="center" hasBorder onHandle={this.changeCoin} />
                </div>
              )}
            </div>
            <div>
              {formatMessage({ id: `FLOW_BALANCE` })}
              {balance || 0}
            </div>
          </div>
        </section>
        <section>
          <ListView hasMore={hasMore} onLoadMore={this.getFlow}>
            <ul>
              {list.map(item => (
                <li key={item.id}>
                  <div className={styles.label}>
                    {item.remark}
                    <small>{dayjs(item.addTime).format('YYYY-MM-DD')}</small>
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

export default WalletFlow;
