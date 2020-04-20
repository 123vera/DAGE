import React, { Component } from 'react';
import { Icons } from '../../../assets';
import { router } from 'umi';
import Header from '../../../components/common/Header';
import styles from './index.less';
import QRcode from 'qrcode.react';
import { formatMessage } from 'umi/locale';
import { connect } from 'dva';
import { Toast } from 'antd-mobile';
import CopyToClipboard from 'react-copy-to-clipboard';
import CoinSwitch from '../../../components/wallet/CoinSwitch';

@connect(({ globalModel, recharge }) => ({ globalModel, recharge }))
class Recharge extends Component {
  state = {
    showMenus: false,
  };

  componentDidMount() {
    this.getInitCoins().then();
  }

  getInitCoins = async () => {
    const { dispatch, location } = this.props;
    const { type = '' } = location.query;
    const coins =
      (await dispatch({
        type: 'globalModel/GetCurrencyList',
        payload: {},
      })) || [];
    const coin = type || coins[0];
    const menus = coins.map(coin => ({
      label: coin,
      value: coin,
    }));
    await dispatch({
      type: 'recharge/UpdateState',
      payload: { coin, menus },
    });
    this.changeCoin({
      label: coin,
      value: coin,
    });
  };

  changeCoin = menu => {
    // if (menu.value === '_DGT') {
    //   // dgt 法币充值
    //   router.push('/wallet/dgt_recharge');
    //   return;
    // }
    const { dispatch } = this.props;
    dispatch({
      type: 'recharge/UpdateState',
      payload: { coin: menu.value },
    });
    dispatch({
      type: 'recharge/GetMyWallet',
      payload: { type: menu.value },
    }).then(res => {
      if (res.status !== 1) {
        res.msg && Toast.info(res.msg);
      }
    });
    this.setState({ showMenus: false });
  };

  render() {
    const { showMenus } = this.state;
    const { coin, wallet, menus } = this.props.recharge;
    // const { myInfo } = this.props.globalModel;
    // const _dgt = { label: formatMessage({ id: `DGT_RECHARGE_TITLE` }), value: '_DGT' };
    //
    // const newMenus = myInfo.phonePrefix === '86'
    //   ? menus.concat([_dgt])
    //   : menus;

    return (
      <div className={styles.recharge}>
        <div className={styles.header}>
          <Header
            icon={Icons.arrowLeft}
            title={formatMessage({ id: `ASSETS_RECHANGE` })}
          />
        </div>

        <div className={styles.content}>
          <CoinSwitch
            showMenus={showMenus}
            coin={coin}
            menus={menus}
            click={() => this.setState({ showMenus: !showMenus })}
            change={this.changeCoin}
          />
          <div className={styles.qrCode}>
            <QRcode size={250} value={wallet} renderAs="canvas"/>
          </div>
          <p>{wallet}</p>
          <CopyToClipboard
            // key={new Date().toString()}
            text={wallet}
            onCopy={() => Toast.info(formatMessage({ id: `USER_COPIED` }))}
          >
            <span>{formatMessage({ id: `RECHARGE_ADDRESS` })}</span>
          </CopyToClipboard>
        </div>
        <aside>
          <label>{formatMessage({ id: `RECHARGE_TIPS` })}</label>
          <ul>
            <li>
              {formatMessage({ id: `RECHARGE_TIP_01` })}
              &nbsp;{coin}
              {formatMessage({ id: `RECHARGE_TIP_02` })}
              &nbsp;{coin}
              {formatMessage({ id: `RECHARGE_TIP_03` })}
            </li>
            <li>{formatMessage({ id: `RECHARGE_TIP_04` })}</li>
            <li>
              {formatMessage({ id: `RECHARGE_TIP_05` })}
              &nbsp;{coin}
              {formatMessage({ id: `RECHARGE_TIP_06` })}
            </li>
          </ul>
        </aside>
      </div>
    );
  }
}

export default Recharge;
