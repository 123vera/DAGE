import React, { Component } from 'react';
import { formatMessage } from 'umi-plugin-locale';
import Header from '../../../components/common/Header';
import styles from './index.less';
import router from 'umi/router';
import { connect } from 'dva';
import SubmitBtn from '../../../components/common/SubmitBtn';
import { Icons } from '../../../assets';
import { Toast } from 'antd-mobile';
import Cookies from 'js-cookie';

@connect(({ globalModel, login }) => ({ globalModel, login }))
class Index extends Component {
  componentDidMount() {
    this.props
      .dispatch({
        type: 'login/GetUserList',
      })
      .then(res => {
        if (res.status === -1) {
          return Toast.info(res.msg, 2, () => router.push('/login'));
        }
        if (res.status !== 1) Toast.info(res.msg);
      });
  }

  selectUser = userId => {
    this.props.dispatch({
      type: 'login/UpdateState',
      payload: { userId },
    });
  };

  addAccount = () => {
    router.push('/set_account');
  };

  toNext = () => {
    const { login, dispatch } = this.props;
    dispatch({ type: 'login/SelectUser' }).then(res => {
      if (res.status !== 1) {
        Toast.fail(res.msg);
        return;
      }
      Cookies.remove('OPENID');
      Cookies.set('USER_ID', login.userId);
      Cookies.set('OPENID', res.data.openId);
      router.push('/home/wallet');
    });
  };

  render() {
    let { userList = [], userId } = this.props.login;

    return (
      <div className={styles.selectAccount}>
        <Header icon={Icons.arrowLeft}/>
        <div className={styles.mainContent}>
          <p>{formatMessage({ id: `SELECT_ACCOUNT_TITLE` })}</p>
          <div className={styles.sectionWrap}>
            {userList.map(user => (
              <section key={user.userId} onClick={() => this.selectUser(user.userId)}>
                <span className={userId === user.userId ? '' : styles.unChecked}>
                  {user.userName}
                </span>
                <img src={userId === user.userId ? Icons.checked : Icons.unChecked} alt=""/>
              </section>
            ))}

            {userList.length < 5 && (
              <section className={styles.setNew} onClick={() => router.push('/set_account')}>
                {formatMessage({ id: `SELECT_SET_ACCOUNT` })}
                <img src={Icons.add} onClick={this.addAccount} alt="ADD_IMG"/>
              </section>
            )}
          </div>
          <SubmitBtn value={formatMessage({ id: `COMMON_CONFIRM` })} onClick={this.toNext}/>
          {/* <img onClick={this.toNext} className={styles.nextStep} src={Images.nextStep} alt=""/> */}
        </div>
      </div>
    );
  }
}

export default Index;
