import React, { Component } from 'react';
import styles from './index.less';
// import { formatMessage, setLocale, getLocale } from 'umi-plugin-locale';
import { connect } from 'dva';
import { router } from 'umi';
import Header from '../../components/common/Header';
import Menus from '../../components/common/Menus';
// import Activation from '../../components/wallet/Activation';
import Mining from '../../components/wallet/Mining';
import { Icons, Images } from '../../assets';

const menus = [
  {
    value: '/wallet/recharge',
    icon: Icons.menuRecharge,
    label: '充值',
    width: '34px',
  }, {
    value: '/wallet/withdraw',
    icon: Icons.menuWithdraw,
    label: '提现',
    width: '34px',
  }, {
    value: '/wallet/flow',
    icon: Icons.menuFlow,
    label: '资金流水',
    width: '26px',
  },
];

@connect(({ wallet }) => ({ wallet }))
class Home extends Component {
  state = {
    showMenus: false,
  };

  onShowMenus = e => {
    this.setState({ showMenus: !this.state.showMenus });
    e.stopPropagation();
  };

  onMenuHandle = menu => {
    router.push(menu.value);
  };

  render() {
    const { userInfo } = this.props.wallet;
    const { showMenus } = this.state;

    return (
      <div className={styles.home} onClick={() => this.setState({ showMenus: false })}>
        <section className={styles.header}>
          <Header
            title="钱包"
            icon={Icons.list}
            rightContent={{
              icon: Icons.more,
              onHandle: e => this.onShowMenus(e),
            }}
          />
          {showMenus && (
            <div className={styles.menus} onClick={e => e.stopPropagation()}>
              <Menus menus={menus} onHandle={this.onMenuHandle}/>
            </div>
          )}
        </section>
        <section>
          <div className={styles.banner} style={{ backgroundImage: `url(${Images.homeBg})` }}>
            <label>DAGE WALLENT</label>
            <h1>{userInfo.did}
              <small>DID</small>
            </h1>
          </div>
        </section>
        <section>
          <div className={styles.notice}>
            <p>公告：即日起激活DID奖励活动开启</p>
          </div>
        </section>
        {/*<Activation/>*/}
        <Mining/>
      </div>
    );
  }
}

export default Home;
