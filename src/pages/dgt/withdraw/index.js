import React, { Component, Fragment } from 'react';
import { Icons } from '../../../assets';
import { router } from 'umi';
import { connect } from 'dva';
import Header from '../../../components/common/Header';
import styles from './index.less';
import { Toast } from 'antd-mobile';
import { downFixed } from '../../../utils/utils';
import { formatMessage } from 'umi/locale';
import SmsCode from '../../../components/partials/SmsCode';
import { getLocale } from 'umi-plugin-locale';
import PrimaryButton from '../../../components/common/PrimaryButton';


@connect(({ dgtWithdraw }) => ({ dgtWithdraw }))
class Index extends Component {
  state = {
    showMenus: false,
    step: 2,
  };

  componentDidMount() {
    this.props.dispatch({ type: 'dgtWithdraw/GetInitInfo' });
  }

  componentWillUnmount() {
    this.clearInput();
  }

  back = () => {
    const { step } = this.state;
    if (step !== 1) return this.setState({ step: step - 1 });
    router.goBack();
  };

  clearInput = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'dgtWithdraw/UpdateState',
      payload: { bank: '', subBank: '', cardNum: '', userName: '' },
    });
  };

  onValueChange = (value, key) => {
    this.props.dispatch({
      type: 'dgtWithdraw/UpdateState',
      payload: { [key]: value },
    });
  };

  onCodeChange = value => {
    this.props.dispatch({
      type: 'dgtWithdraw/UpdateState',
      payload: { code: value },
    });
  };

  getSmsCode = async () => {
    return this.props
      .dispatch({
        type: 'globalModel/GetSmsCode',
        payload: { type: 'exchange' },
      })
      .then(res => {
        if (res.status === 1) {
          Toast.info(formatMessage({ id: `TOAST_GET_CODE_SUCCESS` }));
          return true;
        }
        Toast.info(res.msg || formatMessage({ id: `TOAST_GET_CODE_FAIL` }));
        return false;
      });
  };

  onNext = () => {
    const { bankName, bankBranch, bankNo, name } = this.props.dgtWithdraw;

    if (!bankName) return Toast.info('请输入银行');
    if (!bankBranch) return Toast.info('请输入开户支行');
    if (!bankNo) return Toast.info('请输入银行卡号');
    if (!name) return Toast.info('请输入银行账户姓名');

    this.setState({ step: 2 });

    // this.props.dispatch({ type: 'dgtWithdraw/Withdraw' }).then(res => {
    //   if (res.status === 1) {
    //     Toast.info(formatMessage({ id: `TOAST_SET_WITHDRAW_SUCCESS` }), 0.9, () =>
    //       router.push('/dgt/withdraw/2'),
    //     );
    //   } else {
    //     res.msg && Toast.info(res.msg);
    //   }
    // });
  };

  render() {
    const { bankName, bankBranch, bankNo, name, code, initInfo } = this.props.dgtWithdraw;
    const { step } = this.state;

    return (
      <div className={styles.dgtWithdraw}>
        <Header
          title="DGT法币提现"
          icon={Icons.arrowLeft}
          onHandle={this.back}
          rightContent={{
            icon: Icons.record,
            onHandle: () => router.push('/wallet/dgt_record'),
          }}
        />
        <section className={step === 1 ? styles.show : styles.hidden}>
          <div className={styles.content}>
            <div className={styles.row}>
              <small>
                {formatMessage({ id: `EXCHANGE_CAN_USE` })}：{downFixed(initInfo.balance) || '--'}
              </small>
            </div>
            <div className={styles.row}>
              <label>{'银行'}</label>
              <div className={styles.inputBox}>
                <input
                  type="text"
                  value={bankName}
                  placeholder={'输入银行'}
                  onChange={e => this.onValueChange(e.target.value, 'bankName')}
                />
              </div>
            </div>
            <div className={styles.row}>
              <label>{'开户支行'}</label>
              <div className={styles.inputBox}>
                <input
                  type="text"
                  value={bankBranch}
                  placeholder={'输入开户支行'}
                  onChange={e => this.onValueChange(e.target.value, 'bankBranch')}
                />
              </div>
            </div>
            <div className={styles.row}>
              <label>{'银行卡号'}</label>
              <div className={styles.inputBox}>
                <input
                  type="text"
                  value={bankNo}
                  placeholder={'输入银行卡号'}
                  onChange={e => this.onValueChange(e.target.value, 'bankNo')}
                />
              </div>
            </div>
            <div className={styles.row}>
              <label>{'姓名'}</label>
              <div className={styles.inputBox}>
                <input
                  type="text"
                  value={name}
                  placeholder={'输入姓名'}
                  onChange={e => this.onValueChange(e.target.value, 'name')}
                />
              </div>
            </div>
          </div>
          <PrimaryButton
            value={formatMessage({ id: `COMMON_CONFIRM` })}
            onHandle={this.onNext}
          />
        </section>

        <section className={step === 2 ? styles.show : styles.hidden}>
          <div className={styles.content}>
            <div className={styles.row}>
              <small>
                {formatMessage({ id: `EXCHANGE_CAN_USE` })}：{downFixed(initInfo.balance) || '--'}
              </small>
            </div>
            <div className={styles.row}>
              <label>提现金额</label>
              <div className={styles.inputBox}>
                <input
                  type="text"
                  value={'323'}
                  autoComplete="off"
                  placeholder="输入金额"
                  onChange={e => this.onWalletChange(e.target.value)}
                />
              </div>
            </div>
            <div className={styles.line}>
              <small>
                汇率：1 DGT= {initInfo.ratio} CNY
              </small>
              <small>手续费率：{downFixed(initInfo.charge * 100, 1)}%</small>
            </div>
            <div className={styles.row}>
              <SmsCode value={code} getSmsCode={this.getSmsCode} onChange={this.onCodeChange}/>
            </div>
            <div className={styles.line}>
              <small className={styles.primary}>{formatMessage({ id: `EXCHANGE_FEE` })}</small>
              <small className={styles.primary}>434</small>
            </div>
            <div className={styles.line}>
            <span
              className={styles.primary}>{formatMessage({ id: `EXCHANGE_PAIDIN_AMOUNT` })}</span>
              <span className={styles.primary}>55</span>
            </div>
          </div>
          <aside className={styles.aside}>
            <label>{formatMessage({ id: `WITHDRAW_TIPS_TITLE` })}</label>
            <ul>
              <li>
                {formatMessage({ id: `WITHDRAW_TIPS_CONTENT_01` })}
                {500}
                &nbsp;DGT，{formatMessage({ id: `WITHDRAW_TIPS_CONTENT_02` })}
                {/* 英文语言下 文案显示不一样 */}
                {getLocale() === 'en-US' && downFixed(initInfo.min || '--')}
                {/* 其他语言下 显示一样 */}
                {getLocale() !== 'en-US' && (downFixed(initInfo.min) || '--') + ' - ' + (downFixed(initInfo.max) || '--')}
                &nbsp;DGT，{formatMessage({ id: `WITHDRAW_TIPS_CONTENT_03` })}
                {initInfo.charge !== '' ? downFixed(initInfo.charge * 100, 1) : '--'}%
              </li>
              <li>{formatMessage({ id: `WITHDRAW_TIPS_CONTENT_04` })}</li>
            </ul>
          </aside>
          <PrimaryButton
            value={formatMessage({ id: `COMMON_CONFIRM` })}
            onHandle={this.onSubmit}
          />
        </section>
      </div>
    );
  }
}

export default Index;
