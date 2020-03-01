import styles from './index.less';
import React, { Component } from 'react';

// menus 事例
// const menus = [
//   {
//     value: '/wallet/recharge',
//     label: '充值',
//     icon: Icons.menuRecharge,
//     width: '34px',
//   }, {
//     value: '/wallet/withdraw',
//     label: '提现',
//     icon: Icons.menuWithdraw,
//     width: '34px',
//   }, {
//     value: '/wallet/flow',
//     label: '资金流水',
//     icon: Icons.menuFlow,
//     width: '26px',
//   },
// ];

class Menus extends Component {
  render() {
    const { menus, onHandle, hasBorder, textAlign } = this.props;
    return <div className={`${styles.menus} ${hasBorder ? styles.hasBorder : ''}`}>
      <ul className={styles.menuList}>
        {
          menus.map(menu => (
            <li style={{ textAlign: textAlign }} key={menu.value}
                onClick={() => onHandle && onHandle(menu)}>
              {menu.icon && <i>
                <img src={menu.icon} style={{ width: menu.width }} alt=""/>
              </i>}
              {menu.label && <span>{menu.label}</span>}
            </li>
          ))
        }
      </ul>
    </div>;
  }
}

export default Menus;
