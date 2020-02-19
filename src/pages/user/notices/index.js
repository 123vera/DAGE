import React, { Component } from 'react';
import ARROW_LEFT from '@/assets/dark/arrow-left.png';
import PageHeader from '@/components/common/PageHeader';
import dayjs from 'dayjs';
import styles from './index.less';

class Index extends Component {
  state = {
    list: [],
  };

  render() {
    return (
      <div id={styles.notices}>
        <PageHeader title="公告列表" leftContent={{ icon: ARROW_LEFT }} />
        <ul className={styles.list}>
          <li>
            <p>古纳于第三方</p>
            <small>{dayjs().format('YYYY-MM-DD')}</small>
          </li>
        </ul>
      </div>
    );
  }
}

export default Index;
