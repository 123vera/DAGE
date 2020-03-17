import React, { Component } from 'react';
import Header from '../../../components/common/Header';
import { Icons } from '../../../assets';
import styles from './index.less';

class Alipay extends Component {
  render() {
    return (
      <div>
        <Header
          icon={Icons.arrowLeft}
          title={'上传支付宝信息'}
        />
        <article className={styles.article}>
          <section>
            <p>
              请上传您的支付宝收款二维码，且需要您在安卓设备上下载自由侠App并登录与上传的二维码一致的支付宝账号，保持自由侠始终在打开状态，如果您没有打开自由侠，发现后客服将在后台扣除当日的挖矿奖励
            </p>
            <input
              className={styles.account}
              type="text"
              placeholder={'请输入支付宝账号'}
            />
            <input
              className={styles.name}
              type="text"
              placeholder={'请输入支付宝实名认证姓名'}
            />
            <div className={styles.fileBox}>
              <input type="text"/>
              <img src="" alt=""/>
              <button>+</button>
            </div>
            <button className={styles.submit}>提交审核</button>
          </section>
        </article>
      </div>
    );
  }
}

export default Alipay;
