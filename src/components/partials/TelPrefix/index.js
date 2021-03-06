import React, { Component } from 'react';
import PageHeader from '../../../components/common/PageHeader';
import TEL_PREFIX_DATA from '../../../utils/tel-prefix';
import styles from './index.less';
import { formatMessage } from 'umi-plugin-locale';
import { Icons } from '../../../assets';

// 排序
TEL_PREFIX_DATA.sort(function(a, b) {
  if (a.en.charCodeAt(0) === b.en.charCodeAt(0)) {
    return a.en.charCodeAt(1) - b.en.charCodeAt(1);
  }
  return a.en.charCodeAt(0) - b.en.charCodeAt(0);
});

class Index extends Component {
  state = { activeKey: '' };

  onSelect = (i, key) => {
    this.setState({ activeKey: key });
    this.props.confirm(i.tel);
  };

  render() {
    const { activeKey } = this.state;
    const { show, cancel } = this.props;

    return (
      <div className={`${styles.telPopup} ${show ? styles.show : ''}`}>
        <PageHeader
          fixed
          title={formatMessage({ id: `COMMON_SELECT_AREA` })}
          leftContent={{ icon: Icons.arrowLeft, onHandle: () => cancel() }}
          rightContent={{
            text: formatMessage({ id: `COMMON_NEXT_STEP` }),
            onHandle: () => cancel(),
          }}
        />
        <ul className="box">
          {TEL_PREFIX_DATA.map((i, key) => (
            <li
              key={key.toString()}
              className={activeKey === key ? styles.active : ''}
              onClick={() => this.onSelect(i, key)}
            >
              <label>{i.en + ' ' + i.name}</label>
              <img src={activeKey === key ? Icons.checked : Icons.unChecked} alt="" />

              {/* {activeKey === key && <img src={CHECKED} alt="" />} */}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Index;
