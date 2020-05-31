import React, { Component } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { removeCookie } from '../../utils/utils';
import { Modal, Toast } from 'antd-mobile';
import CopyToClipboard from 'react-copy-to-clipboard';
import Header from '../../components/common/Header';
import BG_ICON from '@/assets/dark/bg-icon.png';
import STATUS_BG from '@/assets/icons/status-bg.png';
import ICON_SWITCH from '@/assets/icons/switch-lang.png';
import MY_LEVEL from '@/assets/icons/spread.png';
import HOME_BG from '@/assets/imgs/home-bg.png';
import DAGE_LOGO from '../../assets/dark/dage-logo.png';
import styles from './index.less';
import { formatMessage } from 'umi/locale';
import { Icons } from '../../assets';

@connect(({ globalModel, userCenter }) => ({ globalModel, userCenter }))
class Home extends Component {
  state = {
    isEnabled: false,
  };

  onCopyLink = (text, result) => {
    Toast.info(formatMessage({ id: `USER_COPIED` }));
  };

  toSwitchLang = url => {
    router.push(url);
  };

  logout = () => {
    Modal.alert(formatMessage({ id: `USER_LOGOUT` }), '', [
      {
        text: formatMessage({ id: `COMMON_CONFIRM` }),
        style: { fontSize: '0.34rem' },
        onPress: () => {
          router.push('/account/login');
          removeCookie('ACCOUNT_TOKEN');
          removeCookie('OPENID');
        },
      },
      { text: formatMessage({ id: `COMMON_CANCEL` }), style: { fontSize: '0.34rem' } },
    ]);
  };

  render() {
    const { myInfo } = this.props.globalModel;
    // TODO 判断该用户是否绑定邮箱
    const listContent = [
      {
        icon: Icons.userChain,
        text: myInfo.bindEmail ? '更换绑定邮箱' : '绑定邮箱',
        url: `/user/bind-email?bind=${myInfo.bindEmail ? 1 : 0}`,
      },
      {
        icon: MY_LEVEL,
        text: formatMessage({ id: `PROMOTION_TITLE_02` }),
        url: `/promotion`,
      },
      {
        icon: Icons.userReset,
        text: formatMessage({ id: `USER_SECTION_03` }),
        url: `/account/reset-password/verify?phone=${myInfo.phoneNo}&prefix=${myInfo.phonePrefix}`,
      },
      {
        icon: Icons.userNotice,
        text: formatMessage({ id: `USER_SECTION_04` }),
        url: '/notices',
      },
      {
        icon: Icons.userDownload,
        text: ' 下载中心',
        url: '/user/download',
      },
      {
        icon: ICON_SWITCH,
        text: formatMessage({ id: `USER_SECTION_05` }),
        url: '/switch_lang',
      },
      {
        icon: Icons.userCustomer,
        text: formatMessage({ id: `USER_SECTION_06` }),
        url: '/zendesk',
      },
    ];

    if (myInfo.phonePrefix === '86') {
      listContent.unshift({
        icon: Icons.userQrcode,
        text: formatMessage({ id: `USER_SECTION_01` }),
        url: '/user/alipay',
      });
    }

    return (
      <div className={styles.userCenter}>
        <Header
          title={formatMessage({ id: `USER_TITLE` })}
          leftContent={{
            icon: Icons.bells,
            iconWidth: 64,
            onHandle: () => router.push('/user/message'),
          }}
          rightContent={{
            icon: Icons.loginOut,
            onHandle: this.logout,
          }}
        />

        <div className={styles.banner}>
          <img className={styles.bg} src={HOME_BG} alt=""/>
          <img className={styles.bg1} src={DAGE_LOGO} alt=""/>
          <div className={styles.center}>
            <img className={styles.icon} src={BG_ICON} alt=""/>
            <p>DID：{(myInfo && myInfo.userName) || '--'}</p>
            <CopyToClipboard
              key={new Date().toString()}
              text={myInfo.recommendCode}
              onCopy={this.onCopyLink}
            >
              <span>
                {formatMessage({ id: `USER_RECOMMEND_CODE` })}
                {(myInfo && myInfo.recommendCode) || '--'}
              </span>
            </CopyToClipboard>
          </div>
          <img className={styles.status} src={STATUS_BG} alt=""/>
          <p className={styles.statusText}>
            <span style={{ opacity: 0.5 }}>
              {myInfo && myInfo.teamLevel === 0 ? `VIP 0` : `VIP ${myInfo.teamLevel}`}
            </span>
          </p>
        </div>
        <ul className={styles.list}>
          {listContent.map((item, key) => (
            <li key={key} onClick={() => this.toSwitchLang(item.url)}>
              <img className={styles.icon} src={item.icon} alt=""/>
              <span>{item.text}</span>
              <img className={styles.right} src={Icons.arrowRight} alt=""/>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Home;
