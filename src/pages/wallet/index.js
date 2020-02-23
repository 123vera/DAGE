import React, { Component } from 'react';
import styles from './index.less';
import { formatMessage, setLocale, getLocale } from 'umi-plugin-locale';
import { connect } from 'dva';
import Header from '../../components/common/Header';
import WalletMenus from '../../components/wallet/WalletMenus';
// import Activation from '../../components/wallet/Activation';
import Mining from '../../components/wallet/Mining';
import { Icons, Images } from '../../assets';

@connect(({ wallet }) => ({ wallet }))
class Home extends Component {
  // changeLang = () => {
  //   if (getLocale() === 'en-US') {
  //     setLocale('ch-CN');
  //   } else {
  //     setLocale('en-US');
  //   }
  // };

  state = {
    showMenus: false,
  };

  onShowMenus = e => {
    const { showMenus } = this.state;
    this.setState({ showMenus: !showMenus });
    e.stopPropagation();
  };

  render() {
    const { showMenus } = this.state;
    console.log(showMenus);
    return (
      <div className={styles.home} onClick={() => this.setState({ showMenus: false })}>
        <section className={styles.header}>
          <Header
            title="钱包"
            icon={Icons.list}
            rightContent={{
              icon: Icons.more,
              onHandle: (e) => this.onShowMenus(e),
            }}
          />
          {showMenus && <div className={styles.menus} onClick={(e) => e.stopPropagation()}>
            <WalletMenus/>
          </div>}
        </section>
        <section>
          <div className={styles.banner} style={{ backgroundImage: `url(${Images.homeBg})` }}>
            <label>DAGE WALLENT</label>
            <h1>0.00</h1>
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
