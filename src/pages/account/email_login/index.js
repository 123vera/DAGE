import React, { useEffect, useState } from 'react';
import { Icons } from '../../../assets';
import styles from './index.less';
import { formatMessage } from 'umi-plugin-locale';
import { Toast } from 'antd-mobile';
import { router } from 'umi';
import SelectLang from '../../../components/common/SelectLang';
import { REG } from '../../../utils/constants';

function EmailLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const changePassword = e => {
    const { value } = e.target;
    if (!/^[0-9A-Za-z]*$/.test(value)) return; // 数字或大小写字母
    setPassword(value);
  };

  const submit = () => {
    if (!email) return Toast.info('请输入邮箱');
    if (!REG.EMAIL.test(email)) {
      return Toast.info('邮箱账号不正确');
    }
    if (!password) {
      return Toast.info(formatMessage({ id: `COMMON_PLACEHOLDER_PASSWORD` }));
    }
    if (password && !REG.PASSWORD.test(password)) {
      return Toast.info(formatMessage({ id: `LOGIN_ERR_PASSWORD` }));
    }

    // TODO 邮箱登录
  };

  return <div className={styles.emailLogin}>
    <div className={styles.headerWrapper}>
      <img src={Icons.arrowLeft} onClick={() => router.push('/')} alt=""/>
      <div className={styles.langWrapper}>
        <SelectLang/>
      </div>
    </div>
    <h1>{'邮箱登录'}</h1>
    <div className={styles.content}>
      <div className={styles.form}>
        <div className={styles.row}>
          <label>邮箱</label>
          <div className={styles.inputBox}>
            <input
              type="text"
              placeholder={'请输入邮箱'}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.row}>
          <label>密码</label>
          <div className={styles.inputBox}>
            <input
              type="text"
              placeholder={'请输入密码'}
              value={password}
              onChange={changePassword}
            />
          </div>
        </div>
        <aside>
          <span onClick={() => router.push(`/account/login`)}>
            手机号登录
          </span>
          <span onClick={() => router.push(`/account/find-password/verify`)}>
            {formatMessage({ id: `LOGIN_FORGET_PASSWORD` })}
          </span>
        </aside>
        <div className={styles.btnBox}>
          <button onClick={submit}>登录</button>
        </div>
      </div>
    </div>
  </div>;
}

export default EmailLogin;
