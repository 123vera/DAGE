import React from 'react';
import Header from '../../../../components/common/Header';
import { Icons, Images } from '../../../../assets';
import styles from './index.less';
import { router } from 'umi';

function Pass() {
  return <div className={styles.pass}>
    <Header
      icon={Icons.arrowLeft}
      onHandle={() => router.push('/home/user')}
    />
    <article>
      <img src={Images.alipayPass} alt=""/>
      <p>
        您的支付宝信息
        <br/>
        已审核通过
      </p>
    </article>
  </div>;
}

export default Pass;
