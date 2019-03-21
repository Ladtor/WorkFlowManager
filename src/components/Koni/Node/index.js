import React from 'react';
import GraphNode, { GraphModel } from './GraphNode';
import {
  TASK,
  HTTP,
  WORK_FLOW,
  AND,
  OR,
  START,
  RESULT,
  MANUAL,
} from '../NodeType/index';
import {AndSvg, OrSvg, TaskSvg, WorkFlowSvg, HttpSvg, StartSvg, ResultSvg, ManualSvg} from '@/assets/index';

const TaskNode = () => <GraphNode label="Task" nodeType={TASK} color="#FEC370" src={TaskSvg} />;
const HttpNode = () => <GraphNode label="Http" nodeType={HTTP} color="#BFD7D8" src={HttpSvg} requestParams="{}" />;
const WorkFlowNode = () => <GraphNode label="WorkFlow" nodeType={WORK_FLOW} color="#735101" src={WorkFlowSvg} />;
const AndNode = () => <GraphNode label="And" nodeType={AND} color="#B98AEC" src={AndSvg} />;
const OrNode = () => <GraphNode label="Or" nodeType={OR} color="#75C4FE" src={OrSvg} />;
const StartNode = () => <GraphNode label="Start" nodeType={START} color="#5CDBD3" src={StartSvg} />;
const ResultNode = () => <GraphNode label="Result" nodeType={RESULT} color="#333333" src={ResultSvg} />;
const ManualNode = () => <GraphNode label="Manual" nodeType={MANUAL} color="#006699" src={ManualSvg} />;

export {
  GraphModel,
  TaskNode,
  HttpNode,
  WorkFlowNode,
  AndNode,
  OrNode,
  StartNode,
  ResultNode,
  ManualNode,
};
