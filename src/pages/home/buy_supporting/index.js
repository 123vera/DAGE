import styles from './index.less';
import Header from '../../../components/common/Header';
import React, { useEffect, useState, useCallback } from 'react';
import { Icons } from '../../../assets';
import { router } from 'umi';
import { HomeApi } from '../../../services/api';

function BuySupporting() {

  return <div className={styles.buySupporting}>
    <Header
      icon={Icons.arrowLeft}
      title={'购买配套'}
      rightContent={{
        text: '订单详情',
        textStyle: { color: '#F3AF66' },
        onHandle: () => router.push('/home/order-detail'),
      }}
    />
    <section>
      <div className={styles.label}>
        购买档位（USDT）
      </div>
      <ul className={styles.gears}>
        <li>
          <span>100</span>
        </li>
        <li>
          <span>1000</span>
        </li>
        <li>
          <span>5000</span>
        </li>
        <li>
          <span>10000</span>
        </li>
        <li>
          <span>30000</span>
        </li>
      </ul>
      <div className={styles.income}>
        <p>
          <span>总收益</span>
          <span>100 EST + 100 RC + 100USDT</span>
        </p>
        <p>
          <small>EST 及 RC 为立即发放，USDT 为每日释放，释放比例：0.6%</small>
        </p>
      </div>

    </section>
    <section>
      <div className={styles.label}>
        支付方式
      </div>
      <div className={styles.payment}>
        <div className={styles.coin}>
          <span>BTC</span>
          <img src={Icons.arrowDown} alt=""/>
        </div>
        <aside>可用BTC：246.43</aside>
      </div>
      <div className={styles.row}>
        <span>当前汇率</span>
        <span>15.2423 BTC/USD</span>
      </div>
      <div className={styles.row}>
        <span>预计消耗</span>
        <span>2.8251 BTC</span>
      </div>
    </section>
    <section className={styles.btnBox}>
      <button>
        确认购买
      </button>
    </section>
  </div>;
}

export default BuySupporting;
