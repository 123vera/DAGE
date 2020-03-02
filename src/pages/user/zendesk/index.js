import React, { Component } from 'react';
import PageHeader from '@/components/common/PageHeader';
import ARROW_LEFT from '@/assets/icons/arrow-left.png';
import ZENDESK from '@/assets/imgs/zendesk.png';
import { hideChatButton } from '../../../services/utils';
import styles from './index.less';
import { formatMessage } from 'umi/locale';

class Index extends Component {
  componentDidMount() {
    this.createIframe();
  }

  componentWillUnmount() {
    hideChatButton();
  }

  createIframe = () => {
    let script = document.createElement('script');
    script.type = 'text/javascript';
    // script.defer = true
    script.id = 'ze-snippet';
    script.src =
      'https://static.zdassets.com/ekr/snippet.js?key=b6291a9c-d3e0-4123-882a-aaf0c125bb85';
    document.body.appendChild(script);
  };
  render() {
    return (
      <div id={styles.zendesk}>
        <PageHeader
          title={formatMessage({ id: `ZENDESK_TITLE` })}
          leftContent={{ icon: ARROW_LEFT }}
        />
        <div className={styles.content}>
          <img src={ZENDESK} alt="" />
          <br />
          <br />
          <p>
            {formatMessage({ id: `ZENDESK_P_01` })}
            <br />
            {formatMessage({ id: `ZENDESK_P_02` })}
            <br />
            {formatMessage({ id: `ZENDESK_P_03` })}
          </p>
        </div>
      </div>
    );
  }
}

export default Index;
