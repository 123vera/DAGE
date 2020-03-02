import React, { Component } from 'react';
import { Icons } from '../../../assets';
import { router } from 'umi';
import { connect } from 'dva';
import Header from '../../../components/common/Header';
import styles from './index.less';
import Menus from '../../../components/common/Menus';
import Captcha from '../../../components/common/Captcha';
import SmsCode from '../../../components/common/SmsCode';
import { Toast } from 'antd-mobile';

const menus = [
  {
    value: 'dgt',
    label: 'DGT',
  },
  {
    value: 'usdt',
    label: 'USDT',
  },
];

@connect(({ withdraw, globalModel }) => ({ withdraw, globalModel }))
class Recharge extends Component {
  state = {
    showMenus: true,
    getSmsSuccess: false,
  };

  componentDidMount() {
    this.changeCoin(menus[1]);
    this.getCaptcha();
  }

  toggleShowMenus = e => {
    const { showMenus } = this.state;
    this.setState({ showMenus: !showMenus });
    e.stopPropagation();
  };

  changeCoin = coin => {
    const { dispatch } = this.props;
    dispatch({
      type: 'withdraw/UpdateState',
      payload: { coin },
    });
    dispatch({ type: 'withdraw/WithdrawInit' });
    this.setState({ showMenus: false });
  };

  getCaptcha = () => {
    this.props.dispatch({ type: 'globalModel/GetCaptcha' });
  };

  onCaptchaChange = value => {
    this.props.dispatch({
      type: 'globalModel/UpdateState',
      payload: { captcha: value },
    });
  };

  getSmsCode = () => {
    const { captcha } = this.props.globalModel;
    if (!captcha) {
      Toast.info('请输入图形验证码');
      return;
    }
    this.props
      .dispatch({
        type: 'globalModel/GetSmsCode',
        payload: { type: 'cash' },
      })
      .then(res => {
        this.setState({ getSmsSuccess: res.status === 1 });
        if (res.status === 1) {
          Toast.info('获取验证码成功');
          return;
        }
        Toast.info(res.msg || '获取验证码失败');
      });
  };

  render() {
    const { showMenus, getSmsSuccess } = this.state;
    const { coin, initInfo } = this.props.withdraw;
    const { captchaSrc, captcha, code } = this.props.globalModel;

    return (
      <div className={styles.withdraw} onClick={() => this.setState({ showMenus: false })}>
        <div className={styles.header}>
          <Header
            icon={Icons.arrowLeft}
            onHandle={() => router.push('/home/wallet')}
            centerContent={{
              text: coin.label,
              icon: Icons.arrowDown,
              reverse: true,
              onHandle: e => this.toggleShowMenus(e),
            }}
            rightContent={{
              icon: Icons.record,
              onHandle: () => router.push('/wallet/withdraw-record'),
            }}
          />
          {showMenus && (
            <div className={styles.menus}>
              <Menus menus={menus} hasBorder onHandle={this.changeCoin} />
            </div>
          )}
        </div>

        <div className={styles.content}>
          <div className={styles.row}>
            <small>可用：{initInfo.balance}</small>
          </div>
          <div className={styles.row}>
            <label>提币地址</label>
            <div className={styles.inputBox}>
              <input type="text" placeholder="输入或长按粘贴地址" />
            </div>
          </div>
          <div className={styles.row}>
            <label>数量（USDT）</label>
            <div className={styles.inputBox}>
              <input type="text" placeholder="最小提币量0.01" />
            </div>
            <aside>手续费率0.2%</aside>
          </div>
          <Captcha
            captchaSrc={captchaSrc}
            value={captcha}
            onChange={e => this.onCaptchaChange(e.target.value)}
            getCaptcha={this.getCaptcha}
          />
          <div className={styles.row}>
            <SmsCode value={code} getSmsSuccess={getSmsSuccess} getSmsCode={this.getSmsCode} />
          </div>
          <div className={styles.group}>
            <small>手续费</small>
            <small>--</small>
          </div>
          <div className={styles.group}>
            <span>到账数量</span>
            <span>--</span>
          </div>
        </div>
        <aside className={styles.aside}>
          <label>友情提示</label>
          <ul>
            <li>
              当前，每人每日最高可提现 500000 IPT，单笔转出限额为0.01 -200000 IPT，手续费 0.001 IPT
            </li>
            <li>为了保障资金安全，我们会对提币进行人工审核，请耐心等待。</li>
          </ul>
        </aside>
      </div>
    );
  }
}

export default Recharge;
