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


const menus = [
  {
    value: 'dgt',
    label: 'DGT',
  }, {
    value: 'usdt',
    label: 'USDT',
  },
];

@connect(({ recharge }) => ({ recharge }))
class Recharge extends Component {
  state = {
    showMenus: false,
  };

  componentDidMount() {
    this.changeCoin(menus[0]);
  }

  changeCoin = (coin) => {
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
    const { coin, wallet } = this.props.recharge;

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
          {showMenus && <div className={styles.menus}>
            <Menus
              menus={menus}
              textAlign="center"
              hasBorder
              onHandle={this.changeCoin}
            />
          </div>}
        </div>

        <div className={styles.content}>
          <div className={styles.qrCode}>
            <QRcode
              size={360}
              value={wallet}
              renderAs="canvas"
            />
          </div>
          <p>{wallet}</p>
          <CopyToClipboard
            // key={new Date().toString()}
            text={wallet}
            onCopy={() => Toast.info('已复制')}
          >
            <span>复制地址</span>
          </CopyToClipboard>
        </div>
        <aside>
          <label>转入说明</label>
          <ul>
            <li>转入是自动的，IPT 转账需要整个 ETH 网络进行确认，您的 IPT 会自动充值到您的账户中。</li>
            <li>此地址是你唯一且独自使用的转入地址，你可以同时进行多次充值。</li>
            <li>本地址禁止充值除 IPT 之外的其它资产，任何其它资产充值将不可找回。</li>
          </ul>
        </aside>
      </div>
    );
  }
}

export default Recharge;
