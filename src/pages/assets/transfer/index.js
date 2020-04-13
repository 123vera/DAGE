import React, { Component } from 'react';
import styles from './index.less';
import Header from '../../../components/common/Header';
import { Icons } from '../../../assets';

class Index extends Component {
  render() {
    return (
      <div>
        <Header
          icon={Icons.arrowLeft}
          title={'划转'}
          rigntContent={{
            text: '划转记录',
            //TODO 跳转到划转记录页面
          }}
        />
        <section>
          <div className={styles.switch}>
            <ul>
              <li>
                <div className={styles.item}>
                  <label>从</label>
                  <span>DAGE账户</span>
                  <i></i>
                </div>
              </li>
              <li>
                <div className={styles.item}>
                  <label>到</label>
                  <span>游戏账户</span>
                  <i></i>
                </div>
              </li>
            </ul>
            <div className={styles.transferIcon}>
              <img src={Icons.transfer} alt=""/>
            </div>
          </div>
        </section>

      </div>
    );
  }
}

export default Index;
