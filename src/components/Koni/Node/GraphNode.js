import { RegisterNode, withPropsAPI, Item } from 'gg-editor';
import React from 'react';

const GraphModel = () => {
  const graphModelConfig = {
    draw(item) {
      const keyShape = this.drawKeyShape(item);
      this.drawLabel(item);
      this.drawIcon(item);
      return keyShape;
    },
    drawIcon(item) {
      const group = item.getGraphicGroup();
      const model = item.getModel();
      const { icon } = model;

      group.addShape('image', {
        attrs: {
          x: -7,
          y: -7,
          img: icon,
        },
      });
    },
    afterDraw(item) {
      const group = item.getGraphicGroup();
      const model = item.getModel();
      const { statusColor } = model;
      group.addShape('circle', {
        attrs: {
          x: 0,
          y: 0,
          r: 20,
          stroke:  statusColor
        },
      });
    },
  };

  return <RegisterNode name="graph-model" config={graphModelConfig} />;
};

const GraphNode = (props) => {
  const {
    src,
    label,
    nodeType,
    color,
    icon = 'https://gw.alipayobjects.com/zos/rmsportal/zByaCkBKPacvgJqFgtwy.svg',
    ...args
  } = props;
  return <Item
    type="node"
    size="40"
    shape="graph-model"
    model={{
      labelOffsetY: 28,
      label,
      nodeType,
      color,
      icon,
      ...args,
    }}
    src={src}
  />;
};

export default GraphNode;
export {
  GraphModel,
};
