import React from 'react';
import { Input } from 'antd';
import CronEditor from 'antd-cron-editor';

class Test extends React.Component {
  state = {
    value: '0-2 32,2 * * * ?',
    inputText: '0-2 32,2 * * * ?',
  };

  handleChange = (cronText) => {
    console.log(cronText);
    this.setState({ value: cronText, inputText: cronText });
  };

  handleInputChange = ({ target: { value: inputText } }) => {
    this.setState({ inputText });
  };

  handlePressEnter = ({ target: { value: inputText } }) => {
    this.setState({ value: inputText, inputText });
  };

  render() {

    const { value, inputText } = this.state;

    return (
      <div>
        <Input onChange={this.handleInputChange} onPressEnter={this.handlePressEnter} value={inputText} />
        <CronEditor onChange={this.handleChange} span={2} value={value} />
      </div>
    );
  };
}

export default Test;
