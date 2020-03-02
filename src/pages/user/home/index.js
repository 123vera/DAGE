import React, { Component } from 'react';
// import { formatMessage } from 'umi-plugin-locale';
import { connect } from 'dva';
import router from 'umi/router';
import { removeCookie } from '../../../utils/utils';
import { Modal, Toast } from 'antd-mobile';
import CopyToClipboard from 'react-copy-to-clipboard';
import PageHeader from '@/components/common/PageHeader';
import LOGIN_OUT from '@/assets/dark/login-out.png';
import BG_ICON from '@/assets/dark/bg-icon.png';
import ARROW_RIGHT from '@/assets/icons/arrow-right.png';
import ICON_RESET from '@/assets/icons/reset-password.png';
import ICON_NOTICES from '@/assets/icons/notices.png';
import ICON_CUSTOMER from '@/assets/icons/customer.png';
import HOME_BG from '@/assets/imgs/home-bg.png';
import DAGE_LOGO from '@/assets/dark/dage-logo.png';
import ACTIVITY from '@/assets/dark/activitied.png';
import UNACTIVITY from '@/assets/dark/unactivitied.png';
import styles from './index.less';

@connect(({ globalModel, userCenter }) => ({ globalModel, userCenter }))
class Home extends Component {
  state = {
    isEnabled: false,
  };

  onCopyLink = () => {
    Toast.info('已复制');
  };

  render() {
    const {
      globalModel: { myInfo },
    } = this.props;
    const listContent = [
      // {
      //   icon: ICON_QRCODE,
      //   text: '上传支付宝信息',
      //   url: '',
      // },
      // {
      //   icon: ICON_SPREAD,
      //   text: '我的推广',
      //   url: '/promotion',
      // },
      {
        icon: ICON_RESET,
        text: '重置登录密码',
        url: `/reset_password/verify`,
      },
      {
        icon: ICON_NOTICES,
        text: '公告列表',
        url: '/notices',
      },
      // {
      //   icon: ICON_SWITCH,
      //   text: '语言切换',
      //   url: '',
      // },
      {
        icon: ICON_CUSTOMER,
        text: '联系客服',
        url: '/zendesk',
      },
    ];
    return (
      <div className={styles.userCenter}>
        <PageHeader
          title="个人中心"
          rightContent={{
            icon: LOGIN_OUT,
            onHandle: () => {
              Modal.alert('确认退出登录？', '', [
                {
                  text: '确认',
                  onPress: () => {
                    // 退出登录
                    router.push('/login');
                    removeCookie('ACCOUNT_TOKEN');
                    removeCookie('OPENID');
                    removeCookie('USER_PHONE');
                    removeCookie('USER_PREFIX');
                  },
                },
                { text: '取消' },
              ]);
            },
          }}
        />

        <div className={styles.banner}>
          <img className={styles.bg} src={HOME_BG} alt=""/>
          <img className={styles.bg1} src={DAGE_LOGO} alt=""/>
          <div className={styles.center}>
            <img className={styles.icon} src={BG_ICON} alt=""/>
            <p>DID：{(myInfo && myInfo.did) || '--'}</p>
            <CopyToClipboard key={new Date().toString()} text="GXs" onCopy={this.onCopyLink}>
              <span>推荐码：{(myInfo && myInfo.recommendCode) || '--'}</span>
            </CopyToClipboard>
          </div>
          <img
            className={styles.status}
            src={myInfo && myInfo.activate === 1 ? ACTIVITY : UNACTIVITY}
            alt=""
          />
        </div>
        <ul className={styles.list}>
          {listContent.map((item, key) => (
            <li key={key} onClick={() => router.push(item.url)}>
              <img className={styles.icon} src={item.icon} alt=""/>
              <span>{item.text}</span>
              <img className={styles.right} src={ARROW_RIGHT} alt=""/>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Home;
