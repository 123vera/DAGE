import React from 'react';
import Header from '../../../../components/common/Header';
import { Icons, Images } from '../../../../assets';
import styles from './index.less';

function Pending() {
  return <div className={styles.pass}>
    <Header icon={Icons.arrowLeft}/>
    <article>
      <img src={Images.alipayPass} alt=""/>
      <p>
        提交成功，等待审核…
        <br/>
        <small>审核结果将会显示在个人中心</small>
      </p>
    </article>
  </div>;
}

export default Pending;
