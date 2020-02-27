import React, { Component } from 'react';
import { Icons } from '../../../assets';
import Header from '../../../components/common/Header';
import styles from './index.less';
import Menus from '../../../components/common/Menus';
import { withdrawInit } from '../../../services/api/asset';

class Recharge extends Component {
  state = {
    showMenus: true,
    coin: 'USDT',
  };

  componentDidMount() {
    withdrawInit('usdt').then();
  }

  toggleShowMenus = e => {
    const { showMenus } = this.state;
    this.setState({ showMenus: !showMenus });
    e.stopPropagation();
  };

  changeCoin = value => {
    this.setState({ coin: value, showMenus: false });
  };

  render() {
    const { showMenus, coin } = this.state;

    const menus = [
      {
        value: 'DGT',
        label: 'DGT',
      },
      {
        value: 'USDT',
        label: 'USDT',
      },
    ];

    return (
      <div className={styles.withdraw} onClick={() => this.setState({ showMenus: false })}>
        <div className={styles.header}>
          <Header
            icon={Icons.arrowLeft}
            centerContent={{
              text: coin,
              icon: Icons.arrowDown,
              reverse: true,
              onHandle: e => this.toggleShowMenus(e),
            }}
            rightContent={{
              icon: Icons.record,
            }}
          />
          {showMenus && (
            <div className={styles.menus}>
              <Menus menus={menus} hasBorder onHandle={menu => this.changeCoin(menu.value)} />
            </div>
          )}
        </div>

        <div className={styles.content}>
          <div className={styles.row}>
            <small>可用：10000.50</small>
          </div>
          <div className={styles.row}>
            <label>提币地址</label>
            <div className={styles.inputBox}>
              <input type="text" placeholder="输入或长按粘贴地址" />
            </div>
          </div>
          <div className={styles.row}>
            <label>数量（USDT）</label>
            <div className={styles.inputBox}>
              <input type="text" placeholder="最小提币量0.01" />
            </div>
            <aside>手续费率0.2%</aside>
          </div>
          <div className={styles.row}>
            <label>手机验证码</label>
            <div className={styles.inputBox}>
              <input type="text" placeholder="请输入手机验证码" />
              <button>获取验证码</button>
            </div>
          </div>
          <div className={styles.group}>
            <small>手续费</small>
            <small>--</small>
          </div>
          <div className={styles.group}>
            <span>到账数量</span>
            <span>--</span>
          </div>
        </div>
        <aside className={styles.aside}>
          <label>友情提示</label>
          <ul>
            <li>
              当前，每人每日最高可提现 500000 IPT，单笔转出限额为0.01 -200000 IPT，手续费 0.001 IPT
            </li>
            <li>为了保障资金安全，我们会对提币进行人工审核，请耐心等待。</li>
          </ul>
        </aside>
      </div>
    );
  }
}

export default Recharge;
