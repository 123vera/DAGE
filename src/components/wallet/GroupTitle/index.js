import React from 'react';
import styles from './index.less';

function GroupTitle(props) {
  const { title, icon, msg } = props;
  return <div className={styles.groupTitle}>
    <main>
      {icon && <img src={icon} alt=""/>}
      {title}
    </main>
    <aside>
      {msg}
    </aside>
  </div>;
}


export default GroupTitle;
