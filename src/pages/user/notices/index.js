import React, { Component } from 'react';
import ARROW_LEFT from '@/assets/dark/arrow-left.png';
import PageHeader from '@/components/common/PageHeader';
import dayjs from 'dayjs';
import { connect } from 'dva';
import styles from './index.less';

@connect(({ notices }) => ({ notices }))
class Index extends Component {
  render() {
    const {
      notices: { noticesList },
    } = this.props;

    return (
      <div id={styles.notices}>
        <PageHeader title="公告列表" leftContent={{ icon: ARROW_LEFT }} />
        <ul className={styles.list}>
          {noticesList.items.map(item => (
            <li key={item.id}>
              <p>{item.title}</p>
              <small>{dayjs(item.addTime).format('YYYY-MM-DD')}</small>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Index;
