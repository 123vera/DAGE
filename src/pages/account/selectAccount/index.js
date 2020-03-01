import React, { Component } from 'react';
import { formatMessage } from 'umi-plugin-locale';
import Header from '../../../components/common/Header';
import styles from './index.less';
import router from 'umi/router';
import { connect } from 'dva';
import { Icons, Images } from '../../../assets';
import { Toast } from 'antd-mobile';
import Cookies from 'js-cookie';

@connect(({ globalModel, login }) => ({ globalModel, login }))
class Index extends Component {
  componentDidMount() {
    const { userList } = this.props.login;
    if (userList === null) {
      router.push('/login');
      return;
    }
    userList && userList[0] && this.selectUser(userList[0].userId);
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
    this.props
      .dispatch({
        type: 'login/SelectUser',
      })
      .then(res => {
        if (res.status !== 1) {
          Toast.fail(res.msg);
          return;
        }

        Cookies.set('OPENID', res.data.openId);
        router.push('/');
      });
  };

  render() {
    let { userList, userId } = this.props.login;
    userList = userList || [];

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
                {formatMessage({ id: `SELECT_NEW_ACCOUNT` })}
                <img src={Icons.add} onClick={this.addAccount} alt="ADD_IMG"/>
              </section>
            )}
          </div>
          <img onClick={this.toNext} className={styles.nextStep} src={Images.nextStep} alt=""/>
        </div>
      </div>
    );
  }
}

export default Index;
