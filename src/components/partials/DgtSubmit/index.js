import React, { Component } from 'react';
import styles from './index.less';
import { connect } from 'dva';
import { Toast } from 'antd-mobile';
import SmsCode from '../../../components/partials/SmsCode';
import { formatMessage } from 'umi-plugin-locale';
import { getLocale } from 'umi-plugin-locale';
import { downFixed } from '../../../utils/utils';

@connect(({ dgtWithdraw, globalModel }) => ({ dgtWithdraw, globalModel }))
class Index extends Component {
  componentDidMount() {}

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

  render() {
    const { code } = this.props.dgtWithdraw;

    return (
      <div id={styles.dgtSubmit}>
        <section>
          <div className={styles.row}>
            <small>
              {formatMessage({ id: `EXCHANGE_CAN_USE` })}：{3.33 || '--'}
            </small>

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
            <div className={styles.lineContent}>
              <div className={styles.item}>
                <small>汇率： </small>
                <small>1 DGT= 7.14 CNY</small>
              </div>
              <div className={styles.item}>
                <small>手续费率：</small>
                <small>5%</small>
              </div>
            </div>
          </div>
          <div className={styles.row}>
            <SmsCode value={code} getSmsCode={this.getSmsCode} onChange={this.onCodeChange} />
          </div>
          <div className={styles.group}>
            <small>{formatMessage({ id: `EXCHANGE_FEE` })}</small>
            <small>434</small>
          </div>
          <div className={styles.group}>
            <span>{formatMessage({ id: `EXCHANGE_PAIDIN_AMOUNT` })}</span>
            <span>55</span>
          </div>
        </section>
        <aside className={styles.aside}>
          <label>{formatMessage({ id: `WITHDRAW_TIPS_TITLE` })}</label>
          <ul>
            <li>
              {formatMessage({ id: `WITHDRAW_TIPS_CONTENT_01` })}
              {43}
              &nbsp;DGT，{formatMessage({ id: `WITHDRAW_TIPS_CONTENT_02` })}
              {/* 英文语言下 文案显示不一样 */}
              {getLocale() === 'en-US' && downFixed(344 || '--')}
              {/* 其他语言下 显示一样 */}
              {getLocale() !== 'en-US' &&
                (downFixed(434) || '--') + ' - ' + (downFixed(434) || '--')}
              &nbsp;DGT，{formatMessage({ id: `WITHDRAW_TIPS_CONTENT_03` })}
              {43 !== '' ? downFixed(343 * 100, 1) : '--'}%
            </li>
            <li>{formatMessage({ id: `WITHDRAW_TIPS_CONTENT_04` })}</li>
          </ul>
        </aside>
      </div>
    );
  }
}

export default Index;
