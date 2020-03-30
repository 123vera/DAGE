import React, { Component } from 'react';
import { Icons } from '../../../assets';
import { router } from 'umi';
import Header from '../../../components/common/Header';
import styles from './index.less';
import QRcode from 'qrcode.react';
import { connect } from 'dva';
import Menus from '../../../components/common/Menus';
import { Toast } from 'antd-mobile';
import CopyToClipboard from 'react-copy-to-clipboard';
import { formatMessage } from 'umi/locale';

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

@connect(({ globalModel, recharge }) => ({ globalModel, recharge }))
class Recharge extends Component {
  state = {
    showMenus: false,
  };

  componentDidMount() {
    this.getInitCoins();
  }

  getInitCoins = async () => {
    const { dispatch } = this.props;
    await this.props.dispatch({
      type: 'globalModel/GetCurrencyList',
      payload: {},
    });

    const {
      globalModel: { rechargeCoins },
    } = this.props;
    let menus = [];

    rechargeCoins.forEach(value => {
      menus.push({
        label: value.toUpperCase(),
        value: value.toLowerCase(),
      });
    });

    setTimeout(() => {
      dispatch({
        type: 'recharge/UpdateState',
        payload: { coin: menus[0] },
      });
    }, 100);
    this.changeCoin(menus[0]);
  };

  changeCoin = coin => {
    const { dispatch } = this.props;
    dispatch({
      type: 'recharge/UpdateState',
      payload: { coin },
    });
    dispatch({
      type: 'recharge/GetMyWallet',
      payload: { type: coin.value },
    }).then(res => {
      if (res.status !== 1) {
        Toast.info(res.msg);
      }
    });
    this.setState({ showMenus: false });
  };

  render() {
    const { showMenus } = this.state;
    const {
      globalModel: { rechargeCoins },
    } = this.props;
    const { coin, wallet } = this.props.recharge;
    let menus = [];
    // coinTeams.forEach(team => {
    //   team.split('_').map(i => iArr.push(i));
    // });

    rechargeCoins.forEach(value => {
      menus.push({
        label: value.toUpperCase(),
        value: value.toLowerCase(),
      });
    });
    // [...new Set(rechargeCoins)].forEach(value => {
    //   menus.push({
    //     label: value.toUpperCase(),
    //     value: value.toLowerCase(),
    //   });
    // });

    return (
      <div className={styles.recharge}>
        <div className={styles.header}>
          <Header
            icon={Icons.arrowLeft}
            centerContent={{
              text: coin.label,
              icon: Icons.arrowDown,
              reverse: true,
              onHandle: () => this.setState({ showMenus: !showMenus }),
            }}
            onHandle={() => router.push('/home/wallet')}
          />
          {showMenus && (
            <div className={styles.menus}>
              <Menus menus={menus} textAlign="center" hasBorder onHandle={this.changeCoin} />
            </div>
          )}
        </div>

        <div className={styles.content}>
          <div className={styles.qrCode}>
            <QRcode size={240} value={wallet} renderAs="canvas" />
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
              &nbsp;{coin.label}
              {formatMessage({ id: `RECHARGE_TIP_02` })}
              &nbsp;{coin.label}
              {formatMessage({ id: `RECHARGE_TIP_03` })}
            </li>
            <li>{formatMessage({ id: `RECHARGE_TIP_04` })}</li>
            <li>
              {formatMessage({ id: `RECHARGE_TIP_05` })}
              &nbsp;{coin.label}
              {formatMessage({ id: `RECHARGE_TIP_06` })}
            </li>
          </ul>
        </aside>
      </div>
    );
  }
}

export default Recharge;
