import styles from './index.less';
import Header from '../../../components/common/Header';
import React, { useCallback, useEffect, useState } from 'react';
import { Icons } from '../../../assets';
import { HomeApi } from '../../../services/api';
import ListView from '../../../components/common/ListView';

function OrderDetail() {
  const [page, setPage] = useState(1);
  const row = 10;
  const [hasMore, setHasMore] = useState(true);
  const [list, setList] = useState([]);

  const getOrderDetail = useCallback(callback => {
    HomeApi.orderDetail({ page, row }).then(res => {
      console.log(res);
      if (res.status === 1) {
        list.push(...res.data);
        setList(list);
        setPage(page + 1);
        setHasMore(row === res.data.length);
      }
      callback && callback();
    });
  }, [page, list, hasMore]);

  useEffect(() => {
    getOrderDetail();
  }, [getOrderDetail]);


  return <div className={styles.orderDetail}>
    <Header title={'订单详情'} icon={Icons.arrowLeft}/>
    <ListView hasMore={hasMore} onLoadMore={getOrderDetail}>
      <ul>
        {list.length && list.map(order =>
          <li key={order.orderNum}>
            <p className={styles.light}>
              <label>订单号</label>
              <span>{order.orderNum}</span>
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
          </li>,
        )}
      </ul>
    </ListView>
  </div>;
}

export default OrderDetail;
