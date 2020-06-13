import React, { useEffect, useState } from 'react';
import Header from '../../../components/common/Header';
import { Icons } from '../../../assets';
import styles from './index.less';
import { formatMessage } from 'umi/locale';
import { UserCenterApi } from '../../../services/api';
import ListView from '../../../components/common/ListView';
import dayjs from 'dayjs';

function Message() {
  const row = 10;
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [list, setList] = useState([]);

  const getMessages = callback => {
    UserCenterApi.getMessages({ page, row }).then(res => {
      callback && callback();
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
    getMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.message}>
      <Header icon={Icons.arrowLeft} title={formatMessage({ id: `MESSAGE_TITLE` })} />
      <ListView hasMore={hasMore} onLoadMore={getMessages}>
        <ul>
          {list.length > 0 &&
            list.map(i => (
              <li key={i.id}>
                <div className={styles.box}>
                  <div className={styles.content}>
                    <div className={styles.top}>{i.content}</div>
                    <div className={styles.bottom}>
                      <span>{dayjs(i.addTime * 1000).format('YYYY.MM.DD HH:mm')}</span>
                      <span>{i.manage}</span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </ListView>
    </div>
  );
}

export default Message;
