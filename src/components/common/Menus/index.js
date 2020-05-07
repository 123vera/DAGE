import styles from './index.less';
import React, { Component } from 'react';

// menus 示例
// const menus = [
//   {
//     value: '/wallet/recharge',
//     label: '充币',
//     icon: Icons.menuRecharge,
//     width: '34px',
//   }, {
//     value: '/wallet/withdraw',
//     label: '提币',
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
    const { menus, onHandle, active, hasBorder, textAlign, maxWidth = '2.1rem', isFull = false } = this.props;
    return (
      <div
        style={{ maxWidth }}
        className={`
        ${styles.menus}
        ${hasBorder ? styles.hasBorder : ''}
        ${isFull ? styles.full : ''}
        `}
      >
        <ul className={styles.menuList} onClick={e => e.stopPropagation()}>
          {menus.map(menu => (
            <li
              className={menu.value === active ? styles.active : ''}
              style={{ textAlign: textAlign }}
              key={menu.value}
              onClick={() => onHandle && onHandle(menu)}
            >
              {menu.icon && (
                <i>
                  <img src={menu.icon} style={{ width: menu.width }} alt=""/>
                </i>
              )}
              {menu.label && <span>{menu.label}</span>}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Menus;
