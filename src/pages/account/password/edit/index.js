import React, { Component } from 'react';
import { formatMessage } from 'umi-plugin-locale';
import { connect } from 'dva';
import PageHeader from '@/components/common/PageHeader';
import { REG } from '@/utils/constants';
import styles from './index.less';
import { router } from 'umi';
import { Toast } from 'antd-mobile';
import { TOAST_DURATION } from '../../../../utils/constants';
import { Icons } from '../../../../assets';
import SubmitBtn from '../../../../components/common/SubmitBtn';

@connect(({ password }) => ({ password }))
class Index extends Component {
  state = {
    errMsg: {
      type: '',
      value: '',
    },
  };

  componentDidMount() {
    const { phone, code } = this.props.password;
    if (!phone || !code) router.goBack();
  }

  onChangePassword = (value, type) => {
    if (value && !REG.INPUT_GROUP.test(value)) return;
    this.props.dispatch({
      type: 'password/UpdateState',
      payload: { [type]: value },
    });
    this.setState({ errMsg: { type: '', value: '' } });
  };

  toNext = () => {
    const { password, passwordConfirm, type } = this.props.password;
    if (!password) {
      this.setState({
        errMsg: { type: 'password', value: formatMessage({ id: `COMMON_PLACEHOLDER_PASSWORD` }) },
      });
      return;
    }
    if (password && !REG.PASSWORD.test(password)) {
      this.setState({
        errMsg: {
          type: 'password',
          value: formatMessage({ id: `LOGIN_PLACEHOLDER_PASSWORD` }),
        },
      });
      return;
    }
    if (password !== passwordConfirm) {
      this.setState({
        errMsg: { type: 'passwordConfirm', value: formatMessage({ id: `LOGIN_REPASSWORD` }) },
      });
      return;
    }

    this.props.dispatch({ type: 'password/EditPassword' }).then(res => {
      if (res.status !== 1) {
        res.msg && Toast.fail(res.msg);
        return;
      }
      Toast.info(formatMessage({ id: `TOAST_SET_PASSWORD_SUCCESS` }), TOAST_DURATION, () => {
        this.props.dispatch({ type: 'password/ClearInput' });
        router.push(type === 'find_password' ? '/login' : '/main/user');
      });
    });
  };

  render() {
    const { errMsg } = this.state;
    const { password, passwordConfirm } = this.props.password;

    return (
      <div className={styles.setPassword}>
        <PageHeader leftContent={{ icon: Icons.arrowLeft }} />
        <section>
          <p>{formatMessage({ id: `LOGIN_SET_PASSWORD` })}</p>
          <div className={styles.mainWrapper}>
            <label>
              <span>{formatMessage({ id: `COMMON_LABEL_PASSWORD` })}</span>
              <input
                type="password"
                className={errMsg.type === 'password' ? styles.inputErr : ''}
                autoComplete="off"
                value={password}
                placeholder={formatMessage({ id: `COMMON_PLACEHOLDER_PASSWORD` })}
                onChange={e => this.onChangePassword(e.target.value, 'password')}
              />
            </label>

            <label>
              <span>{formatMessage({ id: `COMMON_LABEL_REPASSWORD` })}</span>
              <input
                type="password"
                autoComplete="off"
                value={passwordConfirm}
                className={errMsg.type === 'passwordConfirm' ? styles.inputErr : ''}
                placeholder={formatMessage({ id: `COMMON_PLACEHOLDER_REPASSWORD` })}
                onChange={e => this.onChangePassword(e.target.value, 'passwordConfirm')}
              />
              <h4>{errMsg.value || ''}</h4>
            </label>
            <SubmitBtn value={formatMessage({ id: `COMMON_SUBMIT` })} onClick={this.toNext} />
          </div>
        </section>
      </div>
    );
  }
}

export default Index;
