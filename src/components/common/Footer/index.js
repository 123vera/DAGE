import React, { Component } from 'react';
import { withRouter, router } from 'umi';
import { Icons } from '../../../assets';
import styles from './index.less';
import { formatMessage } from 'umi-plugin-locale';

const tabs = [
  {
    path: '/home/wallet',
    icon: Icons.wallet,
    iconActive: Icons.walletActive,
    label: formatMessage({ id: `WALLET_TITLE` }),
    width: '50px',
  },
  {
    path: '/home/ecological',
    icon: Icons.zoology,
    iconActive: Icons.zoologyActive,
    label: formatMessage({ id: `ECOLOGICAL_TITLE` }),
    width: '40px',
  },
  {
    path: '/home/user',
    icon: Icons.user,
    iconActive: Icons.userActive,
    label: formatMessage({ id: `USER_MINE` }),
    width: '40px',
  },
];

class Footer extends Component {
  render() {
    const { location } = this.props;

    return (
      <footer className={styles.footer}>
        <ul>
          {tabs.map(tab => (
            <li
              key={tab.path}
              className={location.pathname === tab.path ? styles.active : ''}
              onClick={() => router.push(tab.path)}
            >
              <img
                src={location.pathname === tab.path ? tab.iconActive : tab.icon}
                style={{ width: tab.width }}
                alt=""
              />
            </li>
          ))}
        </ul>
      </footer>
    );
  }
}

export default withRouter(Footer);
