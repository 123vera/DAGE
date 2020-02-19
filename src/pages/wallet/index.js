import React, { Component } from 'react';
import styles from './index.less';
import { formatMessage, setLocale, getLocale } from 'umi-plugin-locale';
import { connect } from 'dva';
import Header from '../../components/common/Header';
import WalletMenus from '../../components/wallet/WalletMenus';
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
        <section>
          <form>
            <h3>
              <img src={Icons.dIcon} alt=""/>
              激活ID
            </h3>
            <p>激活DID后您才可进行购买矿机，赚取收益，邀请好友等操作。</p>
            <input type="text" placeholder="请输入DID邀请码"/>
            <p className={styles.hint}>需支付 10 DGT</p>
            <button>确认激活</button>
          </form>
        </section>
      </div>
    );
  }
}

export default Home;
