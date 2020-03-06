import React, { Component } from 'react';
import PageHeader from '@/components/common/PageHeader';
import ARROW_LEFT from '@/assets/dark/arrow-left.png';
import { styles } from 'ansi-colors';
import { formatMessage } from 'umi/locale';

class Index extends Component {
  render() {
    const url = decodeURIComponent(this.props.location.query.url);

    return (
      <div id={styles.noticeDetail}>
        <PageHeader
          title={formatMessage({ id: `NOTICE_DETAIL_TITLE` })}
          leftContent={{ icon: ARROW_LEFT }}
        />

        <div style={{ background: '#ccc', height: '100vh' }}>
          <iframe
            title="notice"
            style={{ width: '100vw', height: '100%' }}
            src={url}
            id="iframe1"
            scrolling="no"
          ></iframe>
        </div>
      </div>
    );
  }
}

export default Index;
