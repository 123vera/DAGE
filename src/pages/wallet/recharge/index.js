import React, { Component } from 'react';
import { Icons } from '../../../assets';
import Header from '../../../components/common/Header';
import styles from './index.less';
import QRcode from 'qrcode.react';

class Recharge extends Component {
  render() {
    return (
      <div className={styles.recharge}>
        <Header
          icon={Icons.arrowLeft}
          centerContent={{
            text: 'USDT',
            icon: Icons.arrowDown,
            reverse: true,
          }}
        />
        <div className={styles.content}>
          <div className={styles.qrCode}>
            <QRcode
              size={250}
              value={'12OlPju8xoWi380askpoqlSLx2a012kkn'}
              renderAs="canvas"
            />
          </div>
          <p>12OlPju8xoWi380askpoqlSLx2a012kkn</p>
          <span>复制地址</span>
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
