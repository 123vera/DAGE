import { Icons } from '../../../assets';
import styles from './index.less';
import React, { Component } from 'react';
import { withRouter } from 'umi';

const menus = [
  {
    path: '/wallet/recharge',
    icon: Icons.menuRecharge,
    label: '充值',
    width: '17px',
  }, {
    path: '/wallet/withdraw',
    icon: Icons.menuWithdraw,
    label: '提现',
    width: '17px',
  }, {
    path: '/wallet/flow',
    icon: Icons.menuFlow,
    label: '资金流水',
    width: '13px',
  },
];

class WalletMenus extends Component {
  render() {
    const { history } = this.props;
    return <div className={styles.walletMenus}>
      <ul>
        {
          menus.map(menu => (
            <li key={menu.path} onClick={() => history.push(menu.path)}>
              <i>
                <img src={menu.icon} style={{ width: menu.width }} alt=""/>
              </i>
              <span>{menu.label}</span>
            </li>
          ))
        }
      </ul>
    </div>;
  }
}

export default withRouter(WalletMenus);
