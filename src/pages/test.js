import React from 'react';
import SockJsClient from 'react-stomp';
import { Button } from "antd";

class Test extends React.Component {

  handleClick = () => {
    this.client.sendMessage('/test', JSON.stringify({ fourTuple: { serialNo: '123' }, a: 'a' }));
  };

  render() {
    return (
      <div>
        <Button onClick={this.handleClick} />
        <SockJsClient
          url="http://localhost:8000/api"
          topics={['/test']}
          onConnect={(msg) => {
            console.log("connect", msg);
          }}
          onDisconnect={(msg) => {
            console.log("disconnect", msg);
          }}
          onMessage={(msg) => {
            console.log("message", msg);
          }}
          ref={(client) => {
            this.client = client;
            console.log(client);
          }}
        />
      </div>
    );
  }
}

export default Test;
