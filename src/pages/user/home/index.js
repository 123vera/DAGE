import React, { Component } from 'react';
import { formatMessage } from 'umi-plugin-locale';
import { connect } from 'dva';
import PageHeader from '@/components/common/PageHeader';
import LOGIN_OUT from '@/assets/dark/login-out.png';
import BG_ICON from '@/assets/dark/bg-icon.png';
import HOME_BG from '@/assets/imgs/home-bg.png';
import DAGE_LOGO from '@/assets/dark/dage-logo.png';
import styles from './index.less';

@connect(({ userCenter }) => ({ userCenter }))
class Home extends Component {
  state = {};

  render() {
    return (
      <div id={styles.userCenter}>
        <PageHeader title="个人中心" rightContent={{ icon: LOGIN_OUT, onHandle: () => {} }} />

        <div className={styles.banner}>
          <img className={styles.bg} src={HOME_BG} alt="" />
          <img className={styles.bg1} src={DAGE_LOGO} alt="" />
          <div className={styles.center}>
            <img className={styles.icon} src={BG_ICON} alt="" />
            <p>DID:213232</p>
            <span>推荐吗：GXs</span>
          </div>
        </div>
      </div>
    );
  }
}
export default Home;
