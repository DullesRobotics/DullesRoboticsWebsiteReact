import styles from './layout.module.css'
import React from 'react'

function Spacer(props) {
  return <div className={styles.spacer + " " + props.className}></div>;
}

export default Spacer;