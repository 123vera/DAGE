import React, { Component } from 'react';
import styles from './index.less';
import Header from '../../../../components/common/Header';
import { Icons } from '../../../../assets';

class Index extends Component {
  render() {
    return (
      <div>
        <Header
          icon={Icons.arrowLeft}
          title={'划转'}
          rightContent={{
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
        <section>
          <div className={styles.group}>
            <label>币种</label>
            <div className={styles.inputBox}>
              <input placeholder="DGT" type="text"/>
              <div className={styles.operate}>
                <img src={Icons.arrowRight} alt=""/>
              </div>
            </div>
          </div>
          <div className={styles.group}>
            <label>划转数量</label>
            <div className={styles.inputBox}>
              <input placeholder="请输入划转数量" type="text"/>
              <div className={styles.operate}>
                <span>DGT</span>
                <i>|</i>
                <span>全部</span>
              </div>
            </div>
            <aside>可用 0.00 DGT</aside>
          </div>
        </section>
        <section>
          <div className={styles.submit}>
            <button>划转</button>
          </div>
        </section>
      </div>
    );
  }
}

export default Index;
