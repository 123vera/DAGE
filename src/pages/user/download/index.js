import React, { useEffect, useState } from 'react';
import Header from '../../../components/common/Header';
import { Icons } from '../../../assets';
import styles from './index.less';
import { UserCenterApi } from '../../../services/api';
import ListView from '../../../components/common/ListView';

function Download() {
  const row = 10;
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [list, setList] = useState([]);

  const getDownloadList = (callback) => {
    UserCenterApi.getDownloadList({ page, row }).then(res => {
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
    getDownloadList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div className={styles.download}>
    <Header
      icon={Icons.arrowLeft}
      title="下载中心"
    />
    <ListView hasMore={hasMore} onLoadMore={getDownloadList}>
      <ul>
        {list.length > 0 && list.map(i =>
          <li key={i.id}>
            <p>{i.title}</p>
            <a href={i.downloadUrl}><button>下载</button></a>
          </li>,
        )}
      </ul>
    </ListView>
  </div>;
}

export default Download;
