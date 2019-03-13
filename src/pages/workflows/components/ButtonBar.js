import React from "react";
import { Button, Popconfirm } from "antd";
import styles from "./ButtonBar.css";

const ButtonBar = ({ onRun, onCron, onView, onEdit, onCancel, onDelete, onCreate, onRefresh }) => {
  return (
    <div>
      <Button type="primary" className={styles.btn} onClick={onRun}>Run</Button>
      <Button className={styles.btn} onClick={onCron}>Cron</Button>
      <Button className={styles.btn} onClick={onView}>View</Button>
      <Button className={styles.btn} onClick={onEdit}>Edit</Button>
      <Button className={styles.btn} onClick={onCancel}>Cancel</Button>
      <Popconfirm title="Delete?" onConfirm={onDelete}>
        <Button className={styles.btn} type="danger">Delete</Button>
      </Popconfirm>
      <div style={{ textAlign: 'right', float: 'right' }}>
        <Button className={styles.btn} type='primary' onClick={onCreate}>
          新增工作流
        </Button>
        <Button className={styles.btn} type='default' onClick={onRefresh}>
          刷新
        </Button>
      </div>
    </div>
  )
};

export default ButtonBar;
