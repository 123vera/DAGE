import styles from './index.less';
import Header from '../../../components/common/Header';
import React, { useCallback, useEffect, useState } from 'react';
import { Icons } from '../../../assets';
import { HomeApi } from '../../../services/api';
import ListView from '../../../components/common/ListView';
import dayjs from 'dayjs';

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
  }, []);

  return <div className={styles.orderDetail}>
    <Header title={'订单详情'} icon={Icons.arrowLeft}/>
    <ListView hasMore={hasMore} onLoadMore={getOrderDetail}>
      <ul>
        {list.length > 0 && list.map(order =>
          <li key={order.orderNo}>
            <p className={styles.light}>
              <label>订单号</label>
              <span>{order.orderNo}</span>
            </p>
            <p>
              <label>时间</label>
              <span>{dayjs(order.addTime * 1000).format('YYYY-MM-DD HH:mm')}</span>
            </p>
            <p>
              <label>总释放</label>
              <span>{order.usdt}</span>
            </p>
            <p>
              <label>已释放</label>
              <span>{order.returnNum}</span>
            </p>
            <p>
              <label>释放比例</label>
              <span>{order.ratio}</span>
              <button>{order.status === 1 ? '释放中' : '已释放'}</button>
            </p>
          </li>
        )}
      </ul>
    </ListView>
  </div>;
}

export default OrderDetail;
