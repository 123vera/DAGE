import React, { Component } from 'react';
import styles from './index.less';
import { connect } from 'dva';
import { router } from 'umi';
import Header from '../../components/common/Header';
import Menus from '../../components/common/Menus';
import Activation from '../../components/wallet/Activation';
import Mining from '../../components/wallet/Mining';
import { Icons, Images } from '../../assets';
import { formatMessage } from 'umi/locale';
import { downFixed } from '../../utils/utils';

const menus = [
  {
    value: '/wallet/recharge',
    icon: Icons.menuRecharge,
    label: formatMessage({ id: `WALLET_RECHARGE` }),
    width: '0.34rem',
  },
  {
    value: '/wallet/withdraw',
    icon: Icons.menuWithdraw,
    label: formatMessage({ id: `WALLET_WITHDRAW` }),
    width: '0.34rem',
  },
  {
    value: '/wallet/flow',
    icon: Icons.menuFlow,
    label: formatMessage({ id: `WALLET_TITLE` }),
    width: '0.34rem',
  },
];

@connect(({ wallet, globalModel }) => ({ wallet, globalModel }))
class Home extends Component {
  state = {
    showMenus: false,
  };

  componentDidMount() {
    this.props.dispatch({ type: 'wallet/GetNotice' });
  }

  onShowMenus = e => {
    this.setState({ showMenus: !this.state.showMenus });
    e.stopPropagation();
  };

  onMenuHandle = menu => {
    router.push(menu.value);
  };

  render() {
    const { myInfo } = this.props.globalModel;
    const { notice } = this.props.wallet;
    const { showMenus } = this.state;

    return (
      <div className={styles.home} onClick={() => this.setState({ showMenus: false })}>
        <section className={styles.header}>
          <Header
            title={formatMessage({ id: `WALLET_HOME` })}
            rightContent={{
              icon: Icons.more,
              onHandle: e => this.onShowMenus(e),
            }}
            leftContent={{
              icon: Icons.list,
              onHandle: () => router.push('/select_account'),
            }}
          />
          {showMenus && (
            <div
              className={styles.menus}
              style={{ color: '#99A7C2' }}
              onClick={e => e.stopPropagation()}
            >
              <Menus menus={menus} onHandle={this.onMenuHandle} />
            </div>
          )}
        </section>
        <section>
          <div className={styles.notice} onClick={() => router.push('/notices')}>
            <p>
              {formatMessage({ id: `NOTICE` })}：{notice && notice.title}
            </p>
          </div>
        </section>

        <section style={{ display: 'none' }}>
          <div className={styles.banner} style={{ backgroundImage: `url(${Images.homeBg})` }}>
            <label>DAGE Wallet</label>
            <h1>
              {myInfo && downFixed(myInfo.did)}
              <small>DID</small>
            </h1>
          </div>
        </section>

        <Activation />
        {/* {myInfo.activate === 1 && <Mining myInfo={myInfo} />} */}
        <Mining myInfo={myInfo} />
      </div>
    );
  }
}

export default Home;
