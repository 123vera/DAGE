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
import { downFixed } from '../../../utils/utils';

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
    this.getInitCoins().then();
  }

  initData = (coin) => {
    this.props.dispatch({
      type: 'walletFlow/UpdateState',
      payload: { coin, list: [], page: 1 },
    });
  };

  getInitCoins = async () => {
    const { dispatch } = this.props;
    await dispatch({
      type: 'globalModel/ExchangeInit',
    });

    const { coinTeams } = this.props.globalModel;
    let arr = [];
    coinTeams.forEach(team => {
      team.split('_').map(i => arr.push(i));
    });
    const menus = [...new Set(arr)].map(value => {
      return {
        label: value.toUpperCase(),
        value: value.toLowerCase(),
      };
    });
    this.setState({ menus });
    this.initData(menus[0]);
    this.getFlow();
  };

  changeCoin = async coin => {
    this.initData(coin);
    this.getFlow();
    this.setState({ showMenus: false });
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
    const { coin, balance, list, hasMore } = this.props.walletFlow;
    const { showMenus, menus } = this.state;

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
                <img src={Icons.arrowUpDown} alt=""/>
              </div>
              {showMenus && (
                <div className={styles.options}>
                  <Menus menus={menus} textAlign="center" hasBorder onHandle={this.changeCoin}/>
                </div>
              )}
            </div>
            <div>
              {formatMessage({ id: `FLOW_BALANCE` })}
              {downFixed(balance) || 0}
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
                    <small>
                      {dayjs(item.addTime * 1000).format('YYYY-MM-DD HH:mm')}
                    </small>
                  </div>
                  <div className={styles.value}>{downFixed(item.amount)}</div>
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
