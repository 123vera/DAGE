import React, { Component } from 'react';
import router from 'umi/router';
import ARROW_LEFT from '@/assets/dark/arrow-left.png';
import styles from './index.less';

const Icon = function(props = {}) {
  return (
    <img
      className={props.class}
      src={props.src || ARROW_LEFT}
      style={{ width: props.width || '18px', height: props.height }}
      onClick={props.onClick}
      alt=""
    />
  );
};

const Action = function(props = {}) {
  return (
    <aside onClick={props.onClick}>
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
    // icon.src = ARROW_LEFT;

    onAction && (action.onClick = onAction);
    console.log(icon);
    return (
      <header className={styles.header}>
        <img
          className={icon.class}
          // src={ARROW_LEFT}
          src={icon.src || ARROW_LEFT}
          style={{ width: icon.width, height: icon.height }}
          onClick={icon.onClick}
          alt=""
        />
        {/* {icon.src && <Icon {...icon} />}
        <span>{title}</span>
        {action && <Action {...action} />} */}
      </header>
    );
  }
}

export default Header;
