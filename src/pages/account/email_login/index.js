import React, { useState, Component } from 'react';
import { Icons } from '../../../assets';
import styles from './index.less';
import { formatMessage } from 'umi-plugin-locale';
import { Toast } from 'antd-mobile';
import { router } from 'umi';
import SelectLang from '../../../components/common/SelectLang';
import { REG } from '../../../utils/constants';
import UserApi from '../../../services/api/user';
import Cookies from 'js-cookie';
import { connect } from 'dva';

@connect(({ login }) => ({ login }))
class Index extends Component {
  login = data => {
    const { accountToken, userList } = data;
    this.props.dispatch({
      type: 'login/UpdateState',
      payload: { accountToken, userList },
    });
    Cookies.set('ACCOUNT_TOKEN', accountToken);
    router.push('/account/select-account');
  };

  render() {
    return (
      <div>
        <EmailLogin login={this.login} />
      </div>
    );
  }
}

export default Index;

function EmailLogin(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const changePassword = e => {
    const { value } = e.target;
    if (!/^[0-9A-Za-z]*$/.test(value)) return; // 数字或大小写字母
    setPassword(value);
  };

  const submit = () => {
    if (!email) return Toast.info(formatMessage({ id: `EMAIL_LOGIN_TOAST_01` }));
    if (!REG.EMAIL.test(email)) {
      return Toast.info(formatMessage({ id: `EMAIL_LOGIN_TOAST_02` }));
    }
    if (!password) {
      return Toast.info(formatMessage({ id: `COMMON_PLACEHOLDER_PASSWORD` }));
    }
    if (password && !REG.PASSWORD.test(password)) {
      return Toast.info(formatMessage({ id: `LOGIN_ERR_PASSWORD` }));
    }

    UserApi.emailLogin({ email, password }).then(res => {
      if (res.status !== 1) {
        return Toast.fail(res.msg);
      }
      props.login(res.data);
    });
  };

  return (
    <div className={styles.emailLogin}>
      <div className={styles.headerWrapper}>
        <img src={Icons.arrowLeft} onClick={() => router.push('/')} alt="" />
        <div className={styles.langWrapper}>
          <SelectLang />
        </div>
      </div>
      <h1>{formatMessage({ id: `EMAIL_LOGIN_TITLE` })}</h1>
      <div className={styles.content}>
        <div className={styles.form}>
          <div className={styles.row}>
            <label>{formatMessage({ id: `EMAIL_LOGIN_NAME` })}</label>
            <div className={styles.inputBox}>
              <input
                type="text"
                placeholder={formatMessage({ id: `EMAIL_LOGIN_TOAST_01` })}
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.row}>
            <label>{formatMessage({ id: `COMMON_LABEL_PASSWORD` })}</label>
            <div className={styles.inputBox}>
              <input
                type="text"
                placeholder={formatMessage({ id: `COMMON_PLACEHOLDER_PASSWORD` })}
                value={password}
                onChange={changePassword}
              />
            </div>
          </div>
          <aside>
            <span onClick={() => router.push(`/account/login`)}>
              {formatMessage({ id: `PHONE_LOGIN_TITLE` })}
            </span>
            <span onClick={() => router.push(`/account/find-password/verify`)}>
              {formatMessage({ id: `LOGIN_FORGET_PASSWORD` })}
            </span>
          </aside>
          <div className={styles.btnBox}>
            <button onClick={submit}>{formatMessage({ id: `LOGIN` })}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
