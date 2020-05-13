import styles from './index.less';
import Header from '../../../components/common/Header';
import React, { useEffect, useState } from 'react';
import { Icons } from '../../../assets';
import { HomeApi } from '../../../services/api';
import ListView from '../../../components/common/ListView';
import dayjs from 'dayjs';
import { formatMessage } from 'umi-plugin-locale';
import { downFixed } from '../../../utils/utils';

function OrderDetail() {
  const [page, setPage] = useState(1);
  const row = 10;
  const [hasMore, setHasMore] = useState(true);
  const [list, setList] = useState([]);

  const getOrderDetail = () => {
    HomeApi.orderDetail({ page, row }).then(res => {
      if (res.status === 1) {
        list.push(...res.data);
        setList(list);
        if (res.data.length > 0) {
          setPage(page + 1);
        }
        setHasMore(row === res.data.length);
      }
    });
  };

  useEffect(() => {
    getOrderDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(list);
  return (
    <div id={styles.orderDetail}>
      <Header title={formatMessage({ id: `BUY_DETAIL_TITLE` })} icon={Icons.arrowLeft} />
      <ListView hasMore={hasMore} onLoadMore={getOrderDetail}>
        <ul>
          {list.length > 0 &&
            list.map(order => (
              <li key={order.orderNo}>
                <p className={styles.light}>
                  <label>{formatMessage({ id: `DGT_ALIPAY_ORDERID_01` })}</label>
                  <span>{order.orderNo}</span>
                </p>
                <p>
                  <label>{formatMessage({ id: `TRANSFER_TIME` })}</label>
                  <span>{dayjs(order.addTime * 1000).format('YYYY-MM-DD HH:mm')}</span>
                </p>
                <p>
                  <label>{formatMessage({ id: `ORDER_DETAIL_LABEL_1` })}</label>
                  <span>{order.usdt}</span>
                </p>
                <p>
                  <label>{formatMessage({ id: `ORDER_DETAIL_LABEL_2` })}</label>
                  <span>{order.returnNum}</span>
                </p>
                <p>
                  <label>{formatMessage({ id: `ORDER_DETAIL_LABEL_3` })}</label>
                  <span>{downFixed(order.ratio, 2)}%</span>
                  <button>
                    {order.status === 1
                      ? formatMessage({ id: `ORDER_DETAIL_VALUE` })
                      : formatMessage({ id: `ORDER_DETAIL_LABEL_2` })}
                  </button>
                </p>
              </li>
            ))}
        </ul>
      </ListView>
    </div>
  );
}

export default OrderDetail;
