import React, { Component } from 'react';
import PageHeader from '@/components/common/PageHeader';
import ARROW_LEFT from '@/assets/dark/arrow-left.png';
import styles from './index.less';
import Cookies from 'js-cookie';
import { formatMessage } from 'umi/locale';

class Index extends Component {
  render() {
    const content = Cookies.get('CONTENT');
    // const url = decodeURIComponent(this.props.location.query.url);

    return (
      <div id={styles.noticeDetail}>
        <PageHeader
          title={formatMessage({ id: `NOTICE_DETAIL_TITLE` })}
          leftContent={{ icon: ARROW_LEFT }}
        />
        <div className={styles.content} dangerouslySetInnerHTML={{ __html: content }} />
        {/* <iframe
            title="notice"
            style={{ width: '100vw', height: '100%' }}
            src={url}
            id="iframe1"
            scrolling="no"
          /> */}
        {/* </div> */}
      </div>
    );
  }
}

export default Index;
