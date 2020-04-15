import React, { Component } from 'react';
import PageHeader from '../../../components/common/PageHeader';
import dayjs from 'dayjs';
import { router } from 'umi';
import Cookies from 'js-cookie';
import { connect } from 'dva';
import styles from './index.less';
import { formatMessage } from 'umi/locale';
import { Toast } from 'antd-mobile';
import { Icons } from '../../../assets';
import ListView from '../../../components/common/ListView';

@connect(({ notices }) => ({ notices }))
class Index extends Component {
  componentDidMount() {
    this.getNotices();
    Cookies.remove('CONTENT');
  }

  getNotices = callback => {
    this.props.dispatch({ type: 'notices/GetNoticeList' }).then(res => {
      callback && callback();
      if (res.status !== 1) Toast.info(res.msg);
    });
  };

  render() {
    const { list, hasMore } = this.props.notices;
    return (
      <div className={styles.notices}>
        <PageHeader
          title={formatMessage({ id: `NOTICES_TITLE` })}
          leftContent={{ icon: Icons.arrowLeft }}
        />
        <div className={styles.list}>
          <ListView hasMore={hasMore} onLoadMore={this.getNotices}>
            {list.map(item => (
              <div
                key={item.id}
                className={styles.item}
                onClick={() => {
                  item.content && Cookies.set('CONTENT', item.content);
                  router.push(`/notice`);
                }}
              >
                <p>{item.title}</p>
                {/* <p onClick={() => (window.location.href = item.linkUrl)}>{item.title}</p> */}
                <small>{dayjs(item.addTime * 1000).format('YYYY-MM-DD HH:mm')}</small>
              </div>
            ))}
          </ListView>
        </div>
      </div>
    );
  }
}

export default Index;
