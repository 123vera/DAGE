import React, { Component } from 'react';
import styles from './index.less';
import { connect } from 'dva';
import { router } from 'umi';
import { formatMessage } from 'umi/locale';
import { downFixed } from '../../utils/utils';

@connect(({ assetsHome, globalModel }) => ({ assetsHome, globalModel }))
class Assets extends Component {
  state = {
    activityLi: 1,
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.dispatch({ type: 'assetsHome/GetUserAssets' });
  }

  selectLi = key => {
    const { dispatch } = this.props;
    key === 1
      ? dispatch({ type: 'assetsHome/GetUserAssets' })
      : dispatch({ type: 'assetsHome/GetGameAssets' });
    this.setState({ activityLi: key });
  };

  jumpTo = type => {
    router.push(`/wallet/flow?type=${type}`);
  };

  render() {
    const { activityLi } = this.state;
    const { assetsHome: { list, totalAmount } } = this.props;

    return (
      <div id={styles.assetsHome}>
        <section className={styles.banner}>
          <label>
            {formatMessage({ id: `ASSETS_PAGE_TITLE` })}（USD）<span>{downFixed(totalAmount)}</span>
          </label>
          <ul>
            <li onClick={() => router.push('/wallet/recharge')}>
              {formatMessage({ id: `ASSETS_RECHANGE` })}
            </li>
            <li onClick={() => router.push('/wallet/withdraw?type=usdt')}>
              {formatMessage({ id: `ASSETS_WITHDRAW` })}
            </li>
            <li onClick={() => router.push('/assets/transfer')}>
              {formatMessage({ id: `ASSETS_TRANSFER` })}
            </li>
          </ul>
        </section>

        <section className={styles.listHeader}>
          <ul className={styles.bgDark}>
            <li onClick={() => this.selectLi(1)} className={activityLi === 1 ? styles.active : ''}>
              {formatMessage({ id: `ASSETS_WALLET` })}
            </li>
            <li
              className={activityLi === 2 ? styles.active : ''}
              onClick={() => {
                this.selectLi(2);
                // Toast.info(formatMessage({ id: `WALLET_COMING_SOON` }));
              }}
            >
              {formatMessage({ id: `ASSETS_GAME_WALLET` })}
            </li>
          </ul>
          <div className={`${styles.bgDark} ${styles.totalAmount}`}>
            {formatMessage({ id: `ASSETS_PAGE_TITLE` })}（USD）<span>{downFixed(totalAmount)}</span>
          </div>
        </section>

        <section className={styles.listContent}>
          <ul>
            {list.map((item, key) => (
              <li key={key.toString()} onClick={() => this.jumpTo(item.type)}>
                <p>{item.type.toLocaleUpperCase()}</p>
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
                    <td>{downFixed(item.amount)}</td>
                    <td>{downFixed(item.price, 4)}</td>
                    <td>{downFixed(item.amount * item.price)}</td>
                  </tr>
                  </tbody>
                </table>
              </li>
            ))}
          </ul>
        </section>
      </div>
    );
  }
}

export default Assets;
