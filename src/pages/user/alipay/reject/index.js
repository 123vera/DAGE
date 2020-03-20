import React from 'react';
import Header from '../../../../components/common/Header';
import { Icons, Images } from '../../../../assets';
import styles from './index.less';
import { router } from 'umi';

function Reject() {
  return <div className={styles.pass}>
    <Header
      icon={Icons.arrowLeft}
      onHandle={() => router.push('/home/user')}

    />
    <article>
      <img
        src={Images.alipayReject} alt=""
      />
      <p>
        审核未通过！
        <br/>
        <small>未通过原因：支付宝账户与二维码不符</small>
      </p>
      <div className={styles.submit}>
        <button onClick={() => router.push('/alipay?upload=1')}>重新上传</button>
      </div>
    </article>
  </div>;
}

export default Reject;
