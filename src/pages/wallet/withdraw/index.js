import React, { Component } from 'react';
import { Icons } from '../../../assets';
import { router } from 'umi';
import { connect } from 'dva';
import Header from '../../../components/common/Header';
import styles from './index.less';
import Menus from '../../../components/common/Menus';
import Captcha from '../../../components/partials/Captcha';
import SmsCode from '../../../components/partials/SmsCode';
import { Toast } from 'antd-mobile';
import { REG } from '../../../utils/constants';
import { downFixed } from '../../../utils/utils';

const menus = [
  {
    value: 'dgt',
    label: 'DGT',
  }, {
    value: 'usdt',
    label: 'USDT',
  },
];

@connect(({ withdraw, globalModel }) => ({ withdraw, globalModel }))
class Recharge extends Component {
  state = {
    showMenus: true,
  };

  componentDidMount() {
    this.changeCoin(menus[1]);
    this.getCaptcha();
    // this.props.dispatch({ type: 'withdraw/GetServiceCharge' });
  }

  toggleShowMenus = e => {
    const { showMenus } = this.state;
    this.setState({ showMenus: !showMenus });
    e.stopPropagation();
  };

  changeCoin = (coin) => {
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

  onWalletChange = (value) => {
    if (!REG.WALLET_ADDRESS.test(value)) {
      return;
    }
    this.props.dispatch({
      type: 'withdraw/UpdateState',
      payload: { walletTo: value },
    });
  };

  onAmountChange = (value) => {
    if (value && !/^[0-9.]+$/.test(value)) {
      return;
    }
    this.props.dispatch({
      type: 'withdraw/UpdateState',
      payload: { amount: value },
    });
  };

  onCodeChange = (value) => {
    this.props.dispatch({
      type: 'withdraw/UpdateState',
      payload: { code: value },
    });
  };

  onCaptchaChange = (value) => {
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
    this.props.dispatch({
      type: 'globalModel/GetSmsCode',
      payload: { type: 'cash' },
    }).then(res => {
      if (res.status === 1) {
        Toast.info('获取验证码成功');
        return;
      }
      Toast.info(res.msg || '获取验证码失败');
    });
  };

  onSubmit = () => {
    const { initInfo, walletTo, amount, code } = this.props.withdraw;
    if (!walletTo) return Toast.info('请填写钱包地址');
    if (!REG.WALLET_ADDRESS.test(walletTo)) return Toast.info('钱包地址格式错误');
    if (!amount) return Toast.info('请填写提币数量');
    if (initInfo.balance < amount) return Toast.info('余额不足');
    if (!code) return Toast.info('请填写手机验证码');
    this.props.dispatch({ type: 'withdraw/Withdraw' }).then(res => {
      if (res.status !== 1) return Toast.info(res.msg);
      Toast.info('提币成功', 2, () => window.location.reload());
    });
  };

  render() {
    const { showMenus } = this.state;
    const { captchaSrc, captcha } = this.props.globalModel;
    const { coin, initInfo, walletTo, amount, code } = this.props.withdraw;
    const fee = amount * initInfo.serviceCharge;
    const realIncome = amount - fee;

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
              <Menus menus={menus} hasBorder onHandle={this.changeCoin}/>
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
              <input
                type="text"
                value={walletTo}
                placeholder="输入或长按粘贴地址"
                onChange={e => this.onWalletChange(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.row}>
            <label>数量（USDT）</label>
            <div className={styles.inputBox}>
              <input
                type="text"
                value={amount}
                placeholder="最小提币量0.01"
                onChange={e => this.onAmountChange(e.target.value)}
              />
            </div>
            <aside>手续费率{initInfo.serviceCharge * 100 || 0}%</aside>
          </div>
          <Captcha
            captchaSrc={captchaSrc}
            value={captcha}
            onChange={e => this.onCaptchaChange(e.target.value)}
            getCaptcha={this.getCaptcha}
          />
          <div className={styles.row}>
            <SmsCode
              value={code}
              getSmsCode={this.getSmsCode}
              onChange={this.onCodeChange}
            />
          </div>
          <div className={styles.group}>
            <small>手续费</small>
            <small>{fee ? downFixed(fee) : '--'}</small>
          </div>
          <div className={styles.group}>
            <span>到账数量</span>
            <span>{realIncome ? downFixed(realIncome) : '--'}</span>
          </div>
        </div>
        <div className={styles.submit}>
          <button onClick={this.onSubmit}>提交</button>
        </div>
        <aside className={styles.aside}>
          <label>友情提示</label>
          <ul>
            <li>
              当前，每人每日最高可提现 {initInfo.dayMax}
              IPT，单笔转出限额为 {initInfo.amountMin || 0}-{initInfo.amountMax || 0} IPT，手续费
              {initInfo.serviceCharge} IPT
            </li>
            <li>为了保障资金安全，我们会对提币进行人工审核，请耐心等待。</li>
          </ul>
        </aside>
      </div>
    );
  }
}

export default Recharge;
