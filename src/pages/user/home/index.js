import React, { Component } from 'react';
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
import STATUS_BG from '@/assets/icons/status-bg.png';
import ICON_SWITCH from '@/assets/icons/switch-lang.png';
import ICON_NOTICES from '@/assets/icons/notices.png';
import ICON_CUSTOMER from '@/assets/icons/customer.png';
import HOME_BG from '@/assets/imgs/home-bg.png';
import DAGE_LOGO from '@/assets/dark/dage-logo.png';
import styles from './index.less';
import { formatMessage } from 'umi/locale';

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
  render() {
    const { myInfo } = this.props.globalModel;
    const listContent = [
      // {
      //   icon: ICON_QRCODE,
      //   text: formatMessage({ id: `USER_SECTION_01` }),
      //   url: '',
      // },
      // {
      //   icon: ICON_SPREAD,
      //   text: formatMessage({ id: `USER_SECTION_02` }),
      //   url: '/promotion',
      // },
      {
        icon: ICON_RESET,
        text: formatMessage({ id: `USER_SECTION_03` }),
        url: `/reset_password/verify?phone=${myInfo.phoneNo}&prefix=${myInfo.phonePrefix}`,
      },
      {
        icon: ICON_NOTICES,
        text: formatMessage({ id: `USER_SECTION_04` }),
        url: '/notices',
      },
      // {
      //   icon: ICON_SWITCH,
      //   text: formatMessage({ id: `USER_SECTION_05` }),
      //   url: '/switch_lang',
      // },
      {
        icon: ICON_CUSTOMER,
        text: formatMessage({ id: `USER_SECTION_06` }),
        url: '/zendesk',
      },
    ];
    return (
      <div className={styles.userCenter}>
        <PageHeader
          title={formatMessage({ id: `USER_TITLE` })}
          rightContent={{
            icon: LOGIN_OUT,
            onHandle: () => {
              Modal.alert(formatMessage({ id: `USER_LOGOUT` }), '', [
                {
                  text: formatMessage({ id: `COMMON_CONFIRM` }),
                  onPress: () => {
                    // 退出登录
                    router.push('/login');
                    removeCookie('ACCOUNT_TOKEN');
                    removeCookie('OPENID');
                  },
                },
                { text: formatMessage({ id: `COMMON_CANCEL` }) },
              ]);
            },
          }}
        />

        <div className={styles.banner}>
          <img className={styles.bg} src={HOME_BG} alt="" />
          <img className={styles.bg1} src={DAGE_LOGO} alt="" />
          <div className={styles.center}>
            <img className={styles.icon} src={BG_ICON} alt="" />
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
          <img className={styles.status} src={STATUS_BG} alt="" />
          <p className={styles.statusText}>
            {myInfo && myInfo.activate === 1
              ? formatMessage({ id: `USER_UNACTIVITY` })
              : formatMessage({ id: `USER_ACTIVITY` })}
          </p>
        </div>
        <ul className={styles.list}>
          {listContent.map((item, key) => (
            <li key={key} onClick={() => this.toSwitchLang(item.url)}>
              <img className={styles.icon} src={item.icon} alt="" />
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
