import React, { Component } from 'react';
import PageHeader from '@/components/common/PageHeader';
import ARROW_LEFT from '@/assets/dark/arrow-left.png';
import styles from './index.less';
import { connect } from 'dva';
import { formatMessage } from 'umi/locale';

@connect(({ notice }) => ({ notice }))
class Index extends Component {
  componentDidMount() {
    const id = window.location.pathname.split('/')[2];
    this.props.dispatch({
      type: 'notice/GetNotice',
      payload: { id },
    });
  }

  render() {
    const {
      notice: { content },
    } = this.props;

    return (
      <div id={styles.noticeDetail}>
        <PageHeader
          title={formatMessage({ id: `NOTICE_DETAIL_TITLE` })}
          leftContent={{ icon: ARROW_LEFT }}
        />
        <div className={styles.content} dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    );
  }
}

export default Index;
