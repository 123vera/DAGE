import React, { Component } from 'react';
import { formatMessage } from 'umi-plugin-locale';
import PageHeader from '@/components/common/PageHeader';
import NEXT_STEP from '@/assets/dark/next-step.png';
import ARROW_LEFT from '@/assets/dark/arrow-left.png';
import styles from './index.less';
import { REG, TOAST_DURATION } from '../../../utils/constants';
import { Toast } from 'antd-mobile';
import { router } from 'umi';

class Index extends Component {
  state = {
    accountNum: '',
    DIDcode: '',
    errMsg: {
      type: '',
      value: '',
    },
  };

  onChangeAccount = e => {
    const { value } = e.target;
    if (value && !REG.INPUT_GROUP.test(value)) return;
    this.setState({ accountNum: value });
  };

  onChangeCode = e => {
    const { value } = e.target;
    if (value && !REG.INPUT_GROUP.test(value)) return;
    this.setState({ DIDcode: value });
  };

  toNext = () => {
    const { accountNum, DIDcode } = this.state;
    if (!accountNum) {
      this.setState({ errMsg: { type: 'accountNum', value: '请输入您想创建的用户名' } });
      return;
    }
    if (accountNum.length < 6 || accountNum.length > 12) {
      this.setState({
        errMsg: { type: 'accountNum', value: '请创建包含数字及字母的6~12位用户名' },
      });
      return;
    }

    if (!DIDcode) {
      this.setState({ errMsg: { type: 'DIDcode', value: '请输入DID邀请码' } });
      return;
    }

    this.setState({ errMsg: { type: '', value: '' } }, () => {
      Toast.info('创建账户成功', TOAST_DURATION, () => {
        router.goBack();
      });
    });
  };

  render() {
    const { accountNum, DIDcode, errMsg } = this.state;

    return (
      <div id={styles.setAccount}>
        <PageHeader leftContent={{ icon: ARROW_LEFT }} />

        <div className={styles.mainContent}>
          <p>{formatMessage({ id: `SELECT_NEW_ACCOUNT` })}</p>

          <section className={styles.setNew}>
            <label htmlFor="accountNum">
              <span>{formatMessage({ id: `SELECT_NEW_ACCOUNT` })}</span>
              <input
                id="accountNum"
                type="text"
                autoComplete="off"
                maxLength={12}
                value={accountNum}
                className={errMsg.type === 'accountNum' ? styles.inputErr : ''}
                placeholder={formatMessage({ id: `COMMON_PLACEHOLDER_ACCOUNT` })}
                onChange={this.onChangeAccount}
              />
            </label>
            <label htmlFor="DIDcode">
              <span>邀请码</span>
              <input
                id="DIDcode"
                type="text"
                autoComplete="off"
                value={DIDcode}
                className={errMsg.type === 'DIDcode' ? styles.inputErr : ''}
                placeholder={'请输入DID邀请码'}
                onChange={this.onChangeCode}
              />
              <h4>{errMsg.value || ''}</h4>
            </label>
            <img className={styles.nextStep} onClick={this.toNext} src={NEXT_STEP} alt="" />
          </section>
        </div>
      </div>
    );
  }
}

export default Index;
