import React from 'react';
import Header from '../../../../components/common/Header';
import { Icons, Images } from '../../../../assets';
import styles from './index.less';

function Reject() {
  return <div className={styles.pass}>
    <Header icon={Icons.arrowLeft}/>
    <article>
      <img src={Images.alipayPass} alt=""/>
      <p>
        审核未通过！
        <br/>
        <small>未通过原因：支付宝账户与二维码不符</small>
      </p>
      <div className={styles.submit}>
        <button>重新上传</button>
      </div>
    </article>
  </div>;
}

export default Reject;
