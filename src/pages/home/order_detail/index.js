import styles from './index.less';
import Header from '../../../components/common/Header';
import React from 'react';
import { Icons } from '../../../assets';

function OrderDetail() {
  return <div className={styles.orderDetail}>
    <Header title={'订单详情'} icon={Icons.arrowLeft}/>
    <ul>
      <li>
        <p className={styles.light}>
          <label>订单号</label>
          <span>12324345今后的军事基地手机打开手机电视看风景5464645很多时候就是达华还是觉得合适的</span>
        </p>
        <p>
          <label>时间</label>
          <span>123243455464645</span>
        </p>
        <p>
          <label>总释放</label>
          <span>123243455464645</span>
        </p>
        <p>
          <label>已释放</label>
          <span>123243455464645</span>
        </p>
        <p>
          <label>释放比例</label>
          <span>123243455464645</span>
          <button>释放中</button>
        </p>
      </li>
      <li>
        <p>
          <label>订单号</label>
          <span>123243455464645</span>
        </p>
        <p>
          <label>时间</label>
          <span>123243455464645</span>
        </p>
        <p>
          <label>总释放</label>
          <span>123243455464645</span>
        </p>
        <p>
          <label>已释放</label>
          <span>123243455464645</span>
        </p>
        <p>
          <label>释放比例</label>
          <span>123243455464645</span>
          <button>释放中</button>
        </p>
      </li>
    </ul>
  </div>;
}

export default OrderDetail;
