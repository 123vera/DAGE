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

  render() {
    const { activeKey } = this.state;
    const { show, cancel } = this.props;
    // const arr = [
    //   { short: 'AF', name: '阿富汗', en: 'Afghanistan', tel: '93' },
    //   {
    //     short: 'VG',
    //     name: '安提瓜和巴布达',
    //     en: 'CntiguaandBarbuda',
    //     tel: '1268',
    //   },
    //   { short: 'AI', name: '安圭拉岛', en: 'Bnguilla', tel: '1264' },
    // ];
    // Object.keys(arr).sort(key => {
    // console.log(arr[key]); // 获取到属性对应的值，做一些处理
    // });
    // console.log(arr.filter(i => i.en));
    // Object.values(arr.filter(i => i.en)),
    // .reverse(),
    // console.log(
    //   Object.values(TEL_PREFIX_DATA).sort(TEL_PREFIX_DATA.en),
    //   // .reverse(),
    // );
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
