import React, { useEffect, useState } from 'react';
import { Icons } from '../../../assets';
import Header from '../../../components/common/Header';
import styles from './index.less';
import SmsCode from '../../../components/partials/SmsCode';
import { formatMessage } from 'umi-plugin-locale';
import UserApi from '../../../services/api/user';
import { Toast } from 'antd-mobile';
import router from 'umi/router';

function BindEmail(props) {
  const [isBind, setIsBind] = useState(true);
  const [email, setEmail] = useState('');
  const [captchaSrc, setCaptchaSrc] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [code, setCode] = useState('');
  const [updateCode, setUpdateCode] = useState('');

  // 判断当前页面是"绑定邮箱页面"还是"更换绑定邮箱页面"
  const checkBindStatus = () => {
    const { pathname, query } = props.location;
    const isBind = pathname === '/user/bind-email';
    setIsBind(isBind);
    if (isBind) {
      setUpdateCode(query.udpateCode);
      return;
    }
    setEmail(query.email);
  };

  const getCaptcha = async () => {
    const captchaSrc = await UserApi.getCaptcha(+new Date());
    setCaptchaSrc(captchaSrc);
  };

  const getEmailCode = async () => {
    if (!captcha) {
      Toast.info(formatMessage({ id: `COMMON_PLACEHOLDER_CAPTCHA` }));
      return;
    }
    return UserApi.sendEmailCode({
      email,
      imgcode: captcha,
      type: isBind ? 'bind' : 'updatebind',
    }).then(res => {
      if (res.status === 1) {
        Toast.info(formatMessage({ id: `TOAST_GET_CODE_SUCCESS` }));
        return true;
      }
      Toast.info(res.msg || formatMessage({ id: `TOAST_GET_CODE_FAIL` }));
      return false;
    });
  };

  const submit = () => {
    if (!email) return Toast.info('请输入邮箱');
    if (!code) return Toast.info(formatMessage({ id: `COMMON_PLACEHOLDER_CODE` }));
    if (!isBind) {
      UserApi.getEmailUpdateCode({ email, code }).then(res => {
        console.log(res);
        if (res.status !== 1) {
          return Toast.info(res.msg);
        }
        const { udpatecode: updateCode } = res.data;
        Toast.info('更换绑定成功，正在跳转绑定邮箱页面', 2, () => {
          router.push(`/user/bind-email?updateCode=${updateCode}`);
        });
      });
      return;
    }

    UserApi.bindEmail({ email, code, updatecode: updateCode }).then(res => {
      console.log(res);
      if (res.status !== 1) {
        return Toast.info(res.msg);
      }
      Toast.info('绑定成功', 2, () => {
        router.push(`/main/user`);
      });
    });
  };

  useEffect(() => {
    console.log('333333333');
    checkBindStatus();
    getCaptcha().then();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const title = isBind ? '绑定邮箱' : '更换绑定邮箱';

  return <div className={styles.bindEmail}>
    <Header
      icon={Icons.arrowLeft}
      title={title}
    />
    <h1>{title}</h1>
    <div className={styles.content}>
      <div className={styles.form}>
        <div className={styles.row}>
          <label>邮箱</label>
          <div className={styles.inputBox}>
            <input
              type="text"
              placeholder={'请输入邮箱'}
              value={email}
              readOnly={!isBind}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <Captcha
          captchaSrc={captchaSrc}
          getCaptcha={getCaptcha}
          value={captcha}
          onChange={(e) => setCaptcha(e.target.value)}
        />
        <div className={styles.smsCodeBox}>
          <SmsCode
            label={'邮箱验证码'}
            value={code}
            getSmsCode={getEmailCode}
            onChange={(value) => setCode(value)}
          />
        </div>
        <div className={styles.btnBox}>
          <button onClick={submit}>绑定</button>
        </div>
      </div>
    </div>
  </div>;
}

export default BindEmail;

function Captcha(props = {}) {
  const { captchaSrc, value, onChange, getCaptcha } = props;
  return (
    <div className={styles.captchaBox}>
      <label>{formatMessage({ id: `REGISTER_GET_CAPTCHA` })}</label>
      <div className={styles.inputBox}>
        <input
          type="text"
          autoComplete="off"
          maxLength={4}
          placeholder={formatMessage({ id: `COMMON_PLACEHOLDER_CAPTCHA` })}
          value={value}
          onChange={onChange || null}
        />
        <img
          src={captchaSrc}
          onClick={getCaptcha}
          alt={formatMessage({ id: `REGISTER_GET_CAPTCHA` })}
        />
      </div>
    </div>
  );
}
