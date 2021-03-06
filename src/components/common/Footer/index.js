import React, { Component } from 'react';
import { withRouter, router } from 'umi';
import { Icons } from '../../../assets';
import styles from './index.less';
import { formatMessage } from 'umi-plugin-locale';

const tabs = [
  {
    path: '/home/wallet',
    icon: Icons.home2,
    iconActive: Icons.home1,
    label: formatMessage({ id: `FOOTER_NAME_01` }),
  },
  {
    path: '/home/assets',
    icon: Icons.wallet,
    iconActive: Icons.walletActive,
    label: formatMessage({ id: `FOOTER_NAME_02` }),
  },
  {
    path: '/home/ecological',
    icon: Icons.zoology,
    iconActive: Icons.zoologyActive,
    label: formatMessage({ id: `FOOTER_NAME_03` }),
  },
  {
    path: '/home/user',
    icon: Icons.user,
    iconActive: Icons.userActive,
    label: formatMessage({ id: `FOOTER_NAME_04` }),
  },
];

class Footer extends Component {
  jumpTo = path => {
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
                // src={tab.icon}
                src={location.pathname === tab.path ? tab.iconActive : tab.icon}
                width={tab.width}
                alt=""
              />
              <span>{tab.label}</span>
            </li>
          ))}
        </ul>
      </footer>
    );
  }
}

export default withRouter(Footer);
