import React, { Component } from 'react';
import styles from './index.less';
import Header from '../../../components/common/Header';
import PartLoading from '../../../components/common/PartLoading';
import { connect } from 'dva';
import { router } from 'umi';
import { Icons } from '../../../assets';
import Menus from '../../../components/common/Menus';
import dayjs from 'dayjs';
import InfiniteScroll from 'react-infinite-scroll-component';

const menus = [
  {
    value: 'dgt',
    label: 'DGT',
  }, {
    value: 'usdt',
    label: 'USDT',
  },
];

@connect(({ walletFlow }) => ({ walletFlow }))
class WalletFlow extends Component {
  state = {
    showMenus: false,
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'walletFlow/UpdateState',
      payload: { coin: menus[0] },
    });
    this.getFlow();
  }

  changeCoin = (coin) => {
    this.props.dispatch({
      type: 'walletFlow/UpdateState',
      payload: { coin },
    });
    this.getFlow();
  };

  getFlow = () => {
    console.log('getFlow');
    const { dispatch, walletFlow: { coin, page, row, list } } = this.props;
    console.log(list);
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
    });
    this.setState({ showMenus: false });
  };

  render() {
    const { coin, balance, list, hasMore } = this.props.walletFlow;
    const { showMenus } = this.state;

    return (
      <div className={styles.walletFlow}>
        <section className={styles.header}>
          <Header
            icon={Icons.arrowLeft}
            title="资金流水"
            onHandle={() => router.push('/home/wallet')}
          />
        </section>
        <section>
          <div className={styles.summary}>
            <div className={styles.coin}>
              <div className={styles.select}
                   onClick={() => this.setState({ showMenus: !showMenus })}>
                {coin.label}
                <img src={Icons.arrowUpDown} alt=""/>
              </div>
              {showMenus && <div className={styles.options}>
                <Menus
                  menus={menus}
                  textAlign="center"
                  hasBorder
                  onHandle={this.changeCoin}
                />
              </div>}
            </div>
            <div>余额：{balance || 0}</div>
          </div>
        </section>
        <section>
          <InfiniteScroll
            dataLength={list.length}
            hasMore={hasMore}
            next={() => this.getFlow()}
            loader={<PartLoading/>}
            endMessage={<p>已经到底了</p>}
          >
            <ul>
              {list.map((item) =>
                <li key={item.id}>
                  <div className={styles.label}>
                    {item.remark}
                    <small>{dayjs(item.addTime).format('YYYY-MM-DD')}</small>
                  </div>
                  <div className={styles.value}>
                    {item.amount}
                  </div>
                </li>)
              }
            </ul>
          </InfiniteScroll>
        </section>
      </div>
    );
  }
}

export default WalletFlow;
