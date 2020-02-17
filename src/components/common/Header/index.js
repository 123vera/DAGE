import React, { Component } from 'react';
import router from 'umi/router';
import ARROW_LEFT from '@/assets/dark/arrow-left.png';
import styles from './index.less';

const Icon = function(props) {
  return (
    <img
      className={props.class}
      src={props.src || ARROW_LEFT}
      style={{ width: props.width, height: props.height }}
      onClick={e => props.onClick && props.onClick(e)}
      alt=""
    />
  );
};

const Action = function(props = {}) {
  return (
    <aside onClick={e => props.onClick && props.onClick(e)}>
      {props.icon && <Icon {...props.icon} />}
      {props.text}
    </aside>
  );
};

class Header extends Component {
  render() {
    const { title = '', icon = {}, action, onClick, onAction } = this.props;
    icon.onClick = onClick || (() => router.goBack());
    icon.class = styles.icon || '';

    onAction && (action.onClick = onAction);
    return (
      <header className={styles.header}>
        <Icon {...icon} />
        <span>{title}</span>
        {action && <Action {...action} />}
      </header>
    );
  }
}

export default Header;
