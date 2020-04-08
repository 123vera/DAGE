import React, { Component } from 'react';
import { withRouter, router } from 'umi';
import { Icons } from '../../../assets';
import styles from './index.less';
import { formatMessage } from 'umi-plugin-locale';

const tabs = [
  {
    path: '/home/wallet',
    icon: Icons.home,
    iconActive: Icons.homeActive,
    label: formatMessage({ id: `WALLET_TITLE` }),
  },
  {
    path: '/home/assets',
    icon: Icons.wallet,
    iconActive: Icons.walletActive,
    label: '',
  },
  {
    path: '/home/ecological',
    icon: Icons.zoology,
    iconActive: Icons.zoologyActive,
    label: formatMessage({ id: `ECOLOGICAL_TITLE` }),
  },
  {
    path: '/home/user',
    icon: Icons.user,
    iconActive: Icons.userActive,
    label: formatMessage({ id: `USER_MINE` }),
  },
];

class Footer extends Component {
  jumpTo = (path) => {
    const { location } = this.props;
    if (location.pathname === path) return;
    router.push(path);
  };

  render() {
    const { location } = this.props;

    return (
      <footer className={styles.footer}>
        <ul>
          {tabs.map(tab => (
            <li
              key={tab.path}
              className={location.pathname === tab.path ? styles.active : ''}
              onClick={() => this.jumpTo(tab.path)}
            >
              <img
                src={location.pathname === tab.path ? tab.iconActive : tab.icon}
                width={tab.width}
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
