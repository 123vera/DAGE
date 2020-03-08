import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './index.less';
import { getLocale } from 'umi-plugin-locale';

@connect(({ globalModel }) => ({ globalModel }))
class Index extends Component {
  componentDidMount() {
    const {
      dispatch,
      globalModel: { lang },
    } = this.props;

    dispatch({
      type: 'globalModel/Setlang',
      payload: {
        lang: getLocale().toLowerCase() || lang,
      },
    });
  }
  render() {
    const { children } = this.props;
    return <div className={styles.basicLayout}>{children}</div>;
  }
}

export default Index;
