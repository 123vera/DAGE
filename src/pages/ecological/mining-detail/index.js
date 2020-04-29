import React, { useCallback } from 'react';
import { useState, useEffect } from 'react';
import styles from './index.less';
import Header from '../../../components/common/Header';
import { Icons } from '../../../assets';
import { formatMessage } from 'umi/locale';
import OtcApi from '../../../services/api/otc';
import dayjs from 'dayjs';
import { downFixed } from '../../../utils/utils';
import ListView from '../../../components/common/ListView';

function MiningDetail() {
  const [page, setPage] = useState(1);
  const [row] = useState(10);
  const [hasMore, setHasMore] = useState(true);
  const [info, setInfo] = useState({});
  const [list, setList] = useState([]);

  useEffect(() => {
    console.log(+new Date() / 1000 + 1000);
    // getMining();
  }, [getMining]);

  const getMining = useCallback(callback => {
    OtcApi.otcDetail({ type: 'mining', page }).then(res => {
      console.log(res);
      if (res.status === 1) {
        setInfo(res.data);
        setList([...list, ...res.data.list]);
        setPage(page + 1);
        setHasMore(row === res.data.list.length);
      }
      callback && callback();
    });
  });

  const addZero = num => {
    return num < 10 ? '0' + num : num;
  };

  const getLastTime = (seconds, type) => {
    const now = +new Date();
    const time = Number(seconds) - now / 1000;
    if (time <= 0) return '00';
    console.log(time % (60 * 60));
    const hour = Math.floor(time / (60 * 60));
    const minute = Math.floor(time % (60 * 60));
    if (type === 'H') return addZero(hour);
    if (type === 'm') return addZero(minute);
  };

  return (
    <div className={styles.miningDetail}>
      <Header icon={Icons.arrowLeft} title={formatMessage({ id: `MINING_DETAIL_TITLE` })} />
      <section>
        <p>正在挖矿</p>
        <div className={styles.summary}>
          <span>
            {downFixed(info.rtotal)}
            <i>RMB</i>
          </span>
          <small>约合 {downFixed(info.utotal)} USD</small>
        </div>
        <p>
          <small>挖矿中的资金</small>
          <time>
            {getLastTime(info.lasttime, 'H')}小时
            {getLastTime(info.lasttime, 'm')}分
          </time>
          <small>后以USDT形式原路返回</small>
        </p>
      </section>
      <section>
        <p>流水明细</p>
        <ListView hasMore={hasMore} onLoadMore={getMining}>
          <ul>
            {list.map(otc => (
              <li key={otc.addTime}>
                <div className={styles.label}>
                  {formatMessage({ id: `MINING_DETAIL_MONOMER` })}
                  <small>{dayjs(otc.addTime * 1000).format('YYYY-MM-DD HH:mm')}</small>
                </div>
                <div className={styles.value}>
                  <span className={Number(otc.num) < 0 ? styles.negative : ''}>
                    {downFixed(otc.num)} {otc.type.toLocaleUpperCase()}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </ListView>
      </section>
    </div>
  );
}

export default MiningDetail;
