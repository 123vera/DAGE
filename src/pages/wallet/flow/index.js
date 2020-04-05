import React, { Component } from 'react';
import styles from './index.less';
import { connect } from 'dva';
import { router } from 'umi';
import dayjs from 'dayjs';
import { formatMessage } from 'umi-plugin-locale';
import { downFixed } from '../../../utils/utils';
import { Icons } from '../../../assets';
import Header from '../../../components/common/Header';
import Menus from '../../../components/common/Menus';
import ListView from '../../../components/common/ListView';
import AssetsFooter from '../../../components/partials/AssetsFooter';

@connect(({ walletFlow, globalModel }) => ({ walletFlow, globalModel }))
class WalletFlow extends Component {
  state = {
    showMenus: false,
  };

  componentDidMount() {
    const { type = '' } = this.props.location.query;
    this.initData(type);
    this.getFlow();
  }

  initData = type => {
    this.props.dispatch({
      type: 'walletFlow/UpdateState',
      payload: { type, list: [], page: 1 },
    });
    router.replace(`${window.location.pathname}?type=${type}`);
  };

  changeCoin = async coin => {
    this.initData(coin.value);
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
    const { type, balance, list, typeList, hasMore } = this.props.walletFlow;
    const { showMenus } = this.state;
    const menus = typeList.map(i => ({
      value: i,
      label: i,
    }));

    return (
      <div className={styles.walletFlow}>
        <section className={styles.header}>
          <Header
            icon={Icons.arrowLeft}
            title={formatMessage({ id: `WALLET_TITLE` })}
            // onHandle={() => router.push('/home/wallet')}
          />
        </section>
        <section>
          <div className={styles.summary}>
            <div className={styles.coin}>
              <div
                className={styles.select}
                onClick={() => this.setState({ showMenus: !showMenus })}
              >
                {type}
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
                    <small>{dayjs(item.addTime * 1000).format('YYYY-MM-DD HH:mm')}</small>
                  </div>
                  <div className={`${styles.value} ${item.amount.includes('-') ? styles.decrease : ''}`}>
                    {downFixed(item.amount)}
                  </div>
                </li>
              ))}
            </ul>
          </ListView>
        </section>

        <AssetsFooter type={type}/>
      </div>
    );
  }
}

export default WalletFlow;
