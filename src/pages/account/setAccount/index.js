import React, { Component } from 'react';
import { formatMessage } from 'umi-plugin-locale';
import PageHeader from '../../../components/common/PageHeader';
import { Icons, Images } from '../../../assets';
import styles from './index.less';
import { REG } from '../../../utils/constants';
import { Toast } from 'antd-mobile';
import router from 'umi/router';
import { connect } from 'dva';
import Cookies from 'js-cookie';

@connect(({ login }) => ({ login }))
class Index extends Component {
  state = {
    errMsg: {
      type: '',
      value: '',
    },
  };

  onChangeAccount = e => {
    const { value } = e.target;
    if (value && !REG.INPUT_GROUP.test(value)) return;
    this.onInputChange(value, 'userName');
  };

  onChangeCode = e => {
    const { value } = e.target;
    if (value && !REG.INPUT_GROUP.test(value)) return;
    this.onInputChange(value, 'recommendCode');
  };

  onInputChange = (value, key) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'login/UpdateState',
      payload: { [key]: value },
    });
  };

  toNext = () => {
    const { userName, recommendCode } = this.props.login;
    if (!userName) {
      this.setState({
        errMsg: {
          type: 'userName',
          value: formatMessage({ id: `COMMON_PLACEHOLDER_PASSWORD_REG` }),
        },
      });
      return;
    }
    if (userName.length < 6 || userName.length > 12) {
      this.setState({
        errMsg: { type: 'userName', value: formatMessage({ id: `SET_ACCOUNT_NAME_REG` }) },
      });
      return;
    }
    if (!recommendCode) {
      this.setState({
        errMsg: {
          type: 'recommendCode',
          value: formatMessage({ id: `SET_ACCOUNT_PLACEHOLDER_DID` }),
        },
      });
      return;
    }
    this.props.dispatch({ type: 'login/AddUser' }).then(res => {
      if (res.status !== 1) {
        Toast.fail(res.msg);
        return;
      }
      Cookies.set('OPENID', res.data.openId);
      this.props.dispatch({
        type: 'login/UpdateState',
        payload: { userList: res.data.userList },
      });
      Toast.info(formatMessage({ id: `TOAST_SET_ACCOUNT_SUCCESS` }), 1.6, () => {
        router.push('/select_account');
      });
    });
  };

  render() {
    const { errMsg } = this.state;

    return (
      <div className={styles.setAccount}>
        <PageHeader leftContent={{ icon: Icons.arrowLeft }} />

        <div className={styles.mainContent}>
          <p>{formatMessage({ id: `SELECT_SET_ACCOUNT` })}</p>

          <section className={styles.setNew}>
            <label>
              <span>{formatMessage({ id: `SELECT_SET_ACCOUNT` })}</span>
              <input
                type="text"
                autoComplete="off"
                maxLength={12}
                className={errMsg.type === 'userName' ? styles.inputErr : ''}
                placeholder={formatMessage({ id: `COMMON_PLACEHOLDER_ACCOUNT` })}
                onChange={this.onChangeAccount}
              />
            </label>
            <label>
              <span>{formatMessage({ id: `SET_ACCOUNT_RECOMMEND` })}</span>
              <input
                type="text"
                autoComplete="off"
                className={errMsg.type === 'recommendCode' ? styles.inputErr : ''}
                placeholder={formatMessage({ id: `SET_ACCOUNT_PLACEHOLDER_DID` })}
                onChange={this.onChangeCode}
              />
              <h4>{errMsg.value || ''}</h4>
            </label>
            <img className={styles.nextStep} onClick={this.toNext} src={Images.nextStep} alt="" />
          </section>
        </div>
      </div>
    );
  }
}

export default Index;
