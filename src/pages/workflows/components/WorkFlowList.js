import React from 'react';
import { Table, Popconfirm, Modal, Divider } from 'antd';
import CronEditor from 'antd-cron-editor';
import PopInputModal from '@/components/PopInputModal';
import { isJSON } from '@/utils/utils';

class WorkFlowList extends React.Component {
  state = {};

  handleShowModal = () => {
    const visible = true;
    this.setState({ visible });
  };

  handleHideModal = () => {
    const visible = false;
    this.setState({ visible });
  };

  handlePreRun = (serialNo) => {
    this.setState({ popVisible: true, serialNo });
  };

  handleRun = (value) => {
    const { serialNo } = this.state;
    const { onRun } = this.props;
    onRun && onRun(serialNo, JSON.parse(value));
    this.setState({ popVisible: false });
  };

  handlePopupVisibleChange = () => {
    this.setState({ popVisible: false });
  };

  render() {
    const { workflows, onDelete, onEdit, onView } = this.props;
    const { visible, popVisible } = this.state;
    const jsonRule = {
      message: '请使用 json 格式',
      validator: (rule, value, callback) => {
        isJSON(value) ? callback() : callback(true);
      },
    };
    const columns = [{
      title: 'SerialNo',
      dataIndex: 'serialNo',
    }, {
      title: 'Name',
      dataIndex: 'name',
    }, {
      title: 'Times',
      dataIndex: 'runVersion',
      // }, {
      //   title: 'Dependencies',
      //   dataIndex: 'dependencies',
      // }, {
      //   title: 'Dependents',
      //   dataIndex: 'dependents',
    }, {
      title: 'Version',
      dataIndex: 'version',
    }, {
      title: 'CreatedAt',
      dataIndex: 'createdAt',
    }, {
      title: 'UpdatedAt',
      dataIndex: 'updatedAt',
    }, {
      title: 'Actions',
      render: (text, record) => (
        <span>
          <a href="javascript:" onClick={this.handlePreRun.bind(this, record.serialNo)}>Run</a>
          <Divider type="vertical" />
          <a href="javascript:" onClick={this.handleShowModal}>Cron</a>
          <Divider type="vertical" />
          <a href="javascript:" onClick={() => onView(record.serialNo)}>View</a>
          <Divider type="vertical" />
          <a href="javascript:" onClick={() => onEdit(record.serialNo)}>Edit</a>
          <Divider type="vertical" />
          <Popconfirm title="Delete?" onConfirm={() => onDelete(record.id)}>
            <a href="javascript:">Delete</a>
          </Popconfirm>
        </span>
      ),
    }];
    return (
      <div>
        <Table
          dataSource={workflows}
          columns={columns}
          rowKey={record => record.id}
        />
        <Modal visible={visible} onCancel={this.handleHideModal}>
          <CronEditor span={3} defaultValue='0-2 * * * * ?' />
        </Modal>
        <PopInputModal
          visible={popVisible}
          title="执行参数"
          onChange={this.handleRun}
          onCancel={this.handlePopupVisibleChange}
          rules={[jsonRule]}
        />
      </div>
    );
  }
}

export default WorkFlowList;
