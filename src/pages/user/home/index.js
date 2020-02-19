import React, { Component } from 'react';
import { formatMessage } from 'umi-plugin-locale';
import { connect } from 'dva';
import PageHeader from '@/components/common/PageHeader';
import LOGIN_OUT from '@/assets/dark/login-out.png';
import BG_ICON from '@/assets/dark/bg-icon.png';
import ARROW_RIGHT from '@/assets/icons/arrow-right.png';
import ICON_QRCODE from '@/assets/icons/qrcode.png';
import ICON_SPREAD from '@/assets/icons/spread.png';
import ICON_RESET from '@/assets/icons/reset-password.png';
import ICON_NOTICES from '@/assets/icons/notices.png';
import ICON_SWITCH from '@/assets/icons/switch-lang.png';
import ICON_CUSTOMER from '@/assets/icons/customer.png';
import HOME_BG from '@/assets/imgs/home-bg.png';
import DAGE_LOGO from '@/assets/dark/dage-logo.png';
import styles from './index.less';

@connect(({ userCenter }) => ({ userCenter }))
class Home extends Component {
  state = {};

  render() {
    const listContent = [
      {
        icon: ICON_QRCODE,
        text: '上传支付宝信息',
        url: '',
      },
      {
        icon: ICON_SPREAD,
        text: '我的推广',
        url: '',
      },
      {
        icon: ICON_RESET,
        text: '重置登录密码',
        url: '',
      },
      {
        icon: ICON_NOTICES,
        text: '公告列表',
        url: '/notices',
      },
      {
        icon: ICON_SWITCH,
        text: '语言切换',
        url: '',
      },
      {
        icon: ICON_CUSTOMER,
        text: '联系客服',
        url: '',
      },
    ];
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
        <ul className={styles.list}>
          {listContent.map(item => (
            <li>
              <img src={item.icon} alt="" />
              <span>{item.text}</span>
              <img className={styles.right} src={ARROW_RIGHT} alt="" />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
export default Home;
