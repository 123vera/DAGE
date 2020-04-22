import React, { Component } from 'react';
import { Icons } from '../../../assets';
import { router } from 'umi';
import { connect } from 'dva';
import Header from '../../../components/common/Header';
import styles from './index.less';
import { Toast } from 'antd-mobile';
import { downFixed } from '../../../utils/utils';
import { formatMessage } from 'umi/locale';

@connect(({ dgtWithdraw }) => ({ dgtWithdraw }))
class Index extends Component {
  state = {
    showMenus: false,
  };

  componentDidMount() {
    this.props.dispatch({ type: 'dgtWithdraw/GetBalance' });
  }

  componentWillUnmount() {
    this.clearInput();
  }

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

  onSubmit = () => {
    const { bank, subBank, cardNum, userName } = this.props.dgtWithdraw;

    if (!bank) return Toast.info('请输入银行');
    if (!subBank) return Toast.info('请输入开户支行');
    if (!cardNum) return Toast.info('请输入银行卡号');
    if (!userName) return Toast.info('请输入银行账户姓名');

    this.props.dispatch({ type: 'dgtWithdraw/Withdraw' }).then(res => {
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
    const { balance, bank, subBank, cardNum, userName } = this.props.dgtWithdraw;

    return (
      <div className={styles.dgtWithdraw} onClick={() => this.setState({ showMenus: false })}>
        <div className={styles.header}>
          <Header
            icon={Icons.arrowLeft}
            title="DGT法币提现"
            rightContent={{
              icon: Icons.record,
              onHandle: () => router.push(`/dgt/withdraw/record`),
            }}
          />
        </div>
        <div className={styles.content}>
          <div className={styles.row}>
            <small>
              {formatMessage({ id: `EXCHANGE_CAN_USE` })}：{downFixed(balance) || '--'}
            </small>
          </div>
          <div className={styles.row}>
            <label>{'银行'}</label>
            <div className={styles.inputBox}>
              <input
                type="text"
                value={bank}
                placeholder={'输入银行'}
                onChange={e => this.onValueChange(e.target.value, 'bank')}
              />
            </div>
          </div>
          <div className={styles.row}>
            <label>{'开户支行'}</label>
            <div className={styles.inputBox}>
              <input
                type="text"
                value={subBank}
                placeholder={'输入开户支行'}
                onChange={e => this.onValueChange(e.target.value, 'subBank')}
              />
            </div>
          </div>
          <div className={styles.row}>
            <label>{'银行卡号'}</label>
            <div className={styles.inputBox}>
              <input
                type="text"
                value={cardNum}
                placeholder={'输入银行卡号'}
                onChange={e => this.onValueChange(e.target.value, 'cardNum')}
              />
            </div>
          </div>
          <div className={styles.row}>
            <label>{'姓名'}</label>
            <div className={styles.inputBox}>
              <input
                type="text"
                value={userName}
                placeholder={'输入姓名'}
                onChange={e => this.onValueChange(e.target.value, 'userName')}
              />
            </div>
          </div>
        </div>
        <div className={styles.submit}>
          <button onClick={this.onSubmit}>{'提交账户'}</button>
        </div>
      </div>
    );
  }
}

export default Index;
