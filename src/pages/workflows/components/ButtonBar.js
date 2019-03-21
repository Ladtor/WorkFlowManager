import React from "react";
import { Button, Popconfirm } from "antd";
import styles from "./ButtonBar.css";
import { locales } from '@/utils/utils';

const format = locales('workflow');
const ButtonBar = ({ onRun, onCron, onView, onEdit, onCancel, onDelete, onCreate, onRefresh }) => {
  return (
    <div>
      <Button type="primary" className={styles.btn} onClick={onRun}>{format('Run')}</Button>
      <Button className={styles.btn} onClick={onCron}>{format('Cron')}</Button>
      <Button className={styles.btn} onClick={onView}>{format('View')}</Button>
      <Button className={styles.btn} onClick={onEdit}>{format('Edit')}</Button>
      <Button className={styles.btn} onClick={onCancel}>{format('Cancel')}</Button>
      <Popconfirm title="Delete?" onConfirm={onDelete}>
        <Button className={styles.btn} type="danger">{format('Delete')}</Button>
      </Popconfirm>
      <div style={{ textAlign: 'right', float: 'right' }}>
        <Button className={styles.btn} type='primary' onClick={onCreate}>
          {format('New')}
        </Button>
        <Button className={styles.btn} type='default' onClick={onRefresh}>
          {format('Refresh')}
        </Button>
      </div>
    </div>
  )
};

export default ButtonBar;
