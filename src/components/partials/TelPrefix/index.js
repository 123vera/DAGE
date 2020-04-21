import React, { Component } from 'react';
import PageHeader from '../../../components/common/PageHeader';
import TEL_PREFIX_DATA from '../../../utils/tel-prefix';
import styles from './index.less';
import { formatMessage } from 'umi-plugin-locale';
import { Icons } from '../../../assets';

class Index extends Component {
  state = {
    activeKey: '',
    search: '',
    list: TEL_PREFIX_DATA,
  };
  componentDidMount() {
    this.setState({ search: '', activeKey: '' });
  }

  onSelect = (i, key) => {
    this.setState({ activeKey: key });
    this.props.confirm(i.tel);
  };

  onSearchChange = event => {
    const { value } = event.target;
    if (!value) {
      this.setState({ list: TEL_PREFIX_DATA });
    } else {
      const list = TEL_PREFIX_DATA.filter(i =>
        (i.en + i.name).toLocaleLowerCase().includes(value.toLocaleLowerCase()),
      );
      this.setState({ list });
    }
    this.setState({ search: value, activeKey: '' });
    this.props.confirm('');
  };

  render() {
    const { show, cancel } = this.props;
    const { activeKey, search, list } = this.state;

    return (
      <div className={`${styles.telPopup} ${show ? styles.show : ''}`}>
        <PageHeader
          fixed
          title={formatMessage({ id: `COMMON_SELECT_AREA` })}
          leftContent={{ icon: Icons.arrowLeft, onHandle: () => cancel() }}
          rightContent={{
            text: (
              <span style={{ color: '#F3AF66', fontSize: '0.24rem' }}>
                {formatMessage({ id: `COMMON_NEXT_STEP` })}
              </span>
            ),
            onHandle: () => cancel(),
          }}
        />
        <div className={styles.search}>
          <img src={Icons.search} alt="" />
          <input
            placeholder={formatMessage({ id: `COMMON_PLACEHOLDER_SEARCH_COUNTRY` })}
            type="text"
            value={search}
            autoComplete="off"
            onChange={this.onSearchChange}
          />
        </div>
        <ul className="box">
          {list.map((i, key) => (
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
