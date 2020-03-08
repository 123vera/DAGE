import React, { Component } from 'react';
import ARROW_LEFT from '@/assets/dark/arrow-left.png';
import CHECKED from '@/assets/dark/checked.png';
import PageHeader from '@/components/common/PageHeader';
import TEL_PREFIX_DATA from '@/utils/tel-prefix';
import styles from './index.less';
import { formatMessage } from 'umi-plugin-locale';

class Index extends Component {
  state = { activeKey: '' };

  onSelect = (i, key) => {
    this.setState({ activeKey: key });
    this.props.confirm(i.tel);
  };

  arraySort = field => {
    return (a, b) => {
      return a[field.toLowerCase()] - b[field.toLowerCase()];
    };
  };

  render() {
    const { activeKey } = this.state;
    const { show, cancel } = this.props;
    var compare = function(property) {
      return function(a, b) {
        var value1 = a[property];
        var value2 = b[property];
        return value1 - value2;
      };
    };
    const arr = [
      { id: 2, short: 'AF', name: '阿富汗', en: 'Afghanistan', tel: '93' },
      { id: 3, short: 'VG', name: '安提瓜和巴布达', en: 'CntiguaandBarbuda', tel: '1268' },
      { id: 0, short: 'AI', name: '安圭拉岛', en: 'Bnguilla', tel: '1264' },
    ];
    arr.sort(compare('en'));
    console.log(arr);

    return (
      <div className={`${styles.telPopup} ${show ? styles.show : ''}`}>
        <PageHeader
          fixed
          title={formatMessage({ id: `COMMON_SELECT_AREA` })}
          leftContent={{ icon: ARROW_LEFT, onHandle: () => cancel() }}
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
              <label>{i.en + i.name}</label>
              {activeKey === key && <img src={CHECKED} alt="" />}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Index;
