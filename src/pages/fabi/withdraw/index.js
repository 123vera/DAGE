import React, { Component } from 'react';
import { Icons } from '../../../assets';
import { router } from 'umi';
import { connect } from 'dva';
import PageHeader from '../../../components/common/PageHeader';
import styles from './index.less';
import { Toast } from 'antd-mobile';
import { downFixed } from '../../../utils/utils';
import { formatMessage } from 'umi/locale';
import SmsCode from '../../../components/partials/SmsCode';
import { getLocale } from 'umi-plugin-locale';
import PrimaryButton from '../../../components/common/PrimaryButton';
import Captcha from '../../../components/partials/Captcha';

@connect(({ fabiWithdraw, globalModel }) => ({ fabiWithdraw, globalModel }))
class Index extends Component {
  state = {
    showMenus: false,
    step: null,
  };

  componentDidMount() {
    const stepArr = window.location.pathname.split('/');
    const step = stepArr[stepArr.length - 1];
    if (Number(step) !== 1 && Number(step) !== 2) router.goBack();
    this.clearInput();
    this.setState({ step: step || 1 });

    this.props.dispatch({ type: 'fabiWithdraw/GetInitInfo' });
    this.getCaptcha();
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
      type: 'fabiWithdraw/UpdateState',
      payload: { bank: '', subBank: '', cardNum: '', userName: '' },
    });
  };

  getCaptcha = () => {
    this.props.dispatch({ type: 'globalModel/GetCaptcha' });
  };

  onValueChange = (value, key) => {
    this.props.dispatch({
      type: 'fabiWithdraw/UpdateState',
      payload: { [key]: value },
    });
  };

  onNumChange = value => {
    const reg = /^\d+(\.)?\d{0,2}?$/;
    if (value && !reg.test(value)) {
      return;
    }
    this.props.dispatch({
      type: 'fabiWithdraw/UpdateState',
      payload: { num: value },
    });
  };

  onCodeChange = value => {
    this.props.dispatch({
      type: 'fabiWithdraw/UpdateState',
      payload: { code: value },
    });
  };

  onCaptchaChange = value => {
    this.props.dispatch({
      type: 'globalModel/UpdateState',
      payload: { captcha: value },
    });
  };

  getSmsCode = async () => {
    return this.props
      .dispatch({
        type: 'globalModel/GetSmsCode',
        payload: { type: 'rmbwithdrawal' },
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
    const { bankName, bankBranch, bankNo, name } = this.props.fabiWithdraw;

    if (!bankName) return Toast.info(formatMessage({ id: `FIAT_WITHDRAWAL_PLACEHOLDER_01` }));
    if (!bankBranch) return Toast.info(formatMessage({ id: `FIAT_WITHDRAWAL_PLACEHOLDER_02` }));
    if (!bankNo) return Toast.info(formatMessage({ id: `FIAT_WITHDRAWAL_PLACEHOLDER_03` }));
    if (!name) return Toast.info(formatMessage({ id: `FIAT_WITHDRAWAL_PLACEHOLDER_04` }));

    this.setState({ step: 2 });
    router.push('/fabi/withdraw/2');
  };

  onSubmit = () => {
    const { initInfo, num, code } = this.props.fabiWithdraw;

    if (!num) return Toast.info(formatMessage({ id: `FIAT_WITHDRAWAL_PLACEHOLDER_05` }));
    if (initInfo.balance < Number(num))
      return Toast.info(formatMessage({ id: `TOAST_ERR_BALANCE_NOT_ENOUGH` }));
    if (!code) return Toast.info(formatMessage({ id: `COMMON_PLACEHOLDER_CODE` }));

    this.props.dispatch({ type: 'fabiWithdraw/Withdraw' }).then(res => {
      if (res.status === 1) {
        Toast.info(formatMessage({ id: `TOAST_SET_WITHDRAW_SUCCESS` }), 2, () =>
          window.location.reload(),
        );
      } else {
        res.msg && Toast.info(res.msg);
      }
    });
  };

  render() {
    const { captchaSrc, captcha } = this.props.globalModel;
    const { bankName, bankBranch, bankNo, name, code, num, initInfo } = this.props.fabiWithdraw;
    const { step } = this.state;

    return (
      <div id={styles.fabiWithdraw}>
        <PageHeader
          leftContent={{
            icon: Icons.arrowLeft,
          }}
          title={formatMessage({ id: `FIAT_WITHDRAWAL_TITLE` }).slice(3)}
          rightContent={{
            icon: Icons.record,
            onHandle: () => router.push('/fabi/record'),
          }}
        />

        <section className={Number(step) === 1 ? styles.show : styles.hidden}>
          <div className={styles.content}>
            <div className={styles.row}>
              <small>
                {formatMessage({ id: `EXCHANGE_CAN_USE` })}：{downFixed(initInfo.balance) || '--'}
              </small>
            </div>
            <div className={styles.row}>
              <label>{formatMessage({ id: `FIAT_WITHDRAWAL_LABEL_01` })}</label>
              <div className={styles.inputBox}>
                <input
                  type="text"
                  value={bankName}
                  placeholder={formatMessage({ id: `FIAT_WITHDRAWAL_INPUT_01` })}
                  onChange={e => this.onValueChange(e.target.value, 'bankName')}
                />
              </div>
            </div>
            <div className={styles.row}>
              <label>{formatMessage({ id: `FIAT_WITHDRAWAL_LABEL_02` })}</label>
              <div className={styles.inputBox}>
                <input
                  type="text"
                  value={bankBranch}
                  placeholder={
                    formatMessage({ id: `FIAT_WITHDRAWAL_INPUT` }) +
                    formatMessage({ id: `FIAT_WITHDRAWAL_LABEL_02` })
                  }
                  onChange={e => this.onValueChange(e.target.value, 'bankBranch')}
                />
              </div>
            </div>
            <div className={styles.row}>
              <label>{formatMessage({ id: `FIAT_WITHDRAWAL_LABEL_03` })}</label>
              <div className={styles.inputBox}>
                <input
                  type="text"
                  value={bankNo}
                  placeholder={formatMessage({ id: `FIAT_WITHDRAWAL_PLACEHOLDER_03` })}
                  onChange={e => this.onValueChange(e.target.value, 'bankNo')}
                />
              </div>
            </div>
            <div className={styles.row}>
              <label>{formatMessage({ id: `FIAT_WITHDRAWAL_LABEL_04` })}</label>
              <div className={styles.inputBox}>
                <input
                  type="text"
                  value={name}
                  placeholder={
                    formatMessage({ id: `FIAT_WITHDRAWAL_INPUT` }) +
                    formatMessage({ id: `FIAT_WITHDRAWAL_LABEL_04` })
                  }
                  onChange={e => this.onValueChange(e.target.value, 'name')}
                />
              </div>
            </div>
          </div>
          <PrimaryButton value={formatMessage({ id: `COMMON_CONFIRM` })} onHandle={this.onNext} />
        </section>

        <section className={Number(step) === 2 ? styles.show : styles.hidden}>
          <div className={styles.content}>
            <div className={styles.row}>
              <small>
                {formatMessage({ id: `EXCHANGE_CAN_USE` })}：{downFixed(initInfo.balance) || '--'}
              </small>
            </div>
            <div className={styles.row}>
              <label>{formatMessage({ id: `FIAT_WITHDRAWAL_AMOUNT` })}</label>
              <div className={styles.inputBox}>
                <input
                  type="text"
                  value={num}
                  autoComplete="off"
                  placeholder={formatMessage({ id: `FIAT_WITHDRAWAL_PLACEHOLDER_06` })}
                  onChange={e => this.onNumChange(e.target.value)}
                />
              </div>
            </div>
            <div className={styles.line}>
              <small>
                {/* {formatMessage({ id: `FIAT_RATIO` })}1 DGT= {initInfo.ratio} CNY */}
              </small>
              <small>
                {formatMessage({ id: `EXCHANGE_FEE_RATE` })}
                {downFixed(initInfo.charge * 100, 1)}%
              </small>
            </div>
            <Captcha
              captchaSrc={captchaSrc}
              value={captcha}
              onChange={e => this.onCaptchaChange(e.target.value)}
              getCaptcha={this.getCaptcha}
            />
            <div className={styles.row}>
              <SmsCode value={code} getSmsCode={this.getSmsCode} onChange={this.onCodeChange} />
            </div>
            <div className={styles.line}>
              <small className={styles.primary}>{formatMessage({ id: `EXCHANGE_FEE` })}</small>
              <small className={styles.primary}>{Number(num) * initInfo.charge || '--'}</small>
            </div>
            <div className={styles.line}>
              <span className={styles.primary}>
                {formatMessage({ id: `EXCHANGE_PAIDIN_AMOUNT` })}
              </span>
              <span className={styles.primary}>
                {downFixed(Number(num) - Number(num) * initInfo.charge) || '--'}
              </span>
            </div>
          </div>
          <aside className={styles.aside}>
            <label>{formatMessage({ id: `WITHDRAW_TIPS_TITLE` })}</label>
            <ul>
              <li>
                {formatMessage({ id: `WITHDRAW_TIPS_CONTENT_01` })}
                {initInfo.dayMax || ' --'}
                &nbsp;CNY，{formatMessage({ id: `WITHDRAW_TIPS_CONTENT_02` })}
                {/* 英文语言下 文案显示不一样 */}
                {getLocale() === 'en-US' && downFixed(initInfo.min || '--')}
                {/* 其他语言下 显示一样 */}
                {getLocale() !== 'en-US' &&
                  (downFixed(initInfo.min) || '--') + ' - ' + (downFixed(initInfo.max) || '--')}
                &nbsp;CNY，{formatMessage({ id: `WITHDRAW_TIPS_CONTENT_03` })}
                {initInfo.charge !== '' ? downFixed(initInfo.charge * 100, 1) : '--'}%
              </li>
              <li>{formatMessage({ id: `WITHDRAW_TIPS_CONTENT_04` })}</li>
            </ul>
          </aside>
          <PrimaryButton value={formatMessage({ id: `FIAT_TIXIAN` })} onHandle={this.onSubmit} />
        </section>
      </div>
    );
  }
}

export default Index;
