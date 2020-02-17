import React, { Component } from 'react';
import { withRouter } from 'umi';
import router from 'umi/router';
import { Icons } from '../../../assets';
import styles from './index.less';

const tabs = [
  {
    path: '/home/wallet',
    icon: Icons.wallet,
    iconActive: Icons.walletActive,
    label: '钱包',
    width: '46px',
  },
  {
    path: '/zoology',
    icon: Icons.zoology,
    iconActive: Icons.zoologyActive,
    label: '生态',
    width: '38px',
  },
  {
    path: '/home/user',
    icon: Icons.user,
    iconActive: Icons.userActive,
    label: '我的',
    width: '36px',
  },
];

class Footer extends Component {
  render() {
    const { location, history } = this.props;

    return (
      <footer className={styles.footer}>
        <ul>
          {tabs.map(tab => (
            <li
              key={tab.path}
              className={location.pathname === tab.path ? styles.active : ''}
              onClick={() => router.push(tab.path)}
            >
              <img src={tab.icon} style={{ width: tab.width }} alt="" />
            </li>
          ))}
        </ul>
      </footer>
    );
  }
}

export default withRouter(Footer);