import globalHeader from './zh-CN/globalHeader';
import menu from './zh-CN/menu';
import settings from './zh-CN/settings';
import workflow from './zh-CN/workflow';
import taskApplication from './zh-CN/taskApplication';
import editor from './zh-CN/editor';
import { buildPrefix } from "@/utils/utils";

export default {
  'navBar.lang': '语言',
  'layout.user.link.help': '帮助',
  'layout.user.link.privacy': '隐私',
  'layout.user.link.terms': '条款',
  'app.home.introduce': '介绍',
  ...globalHeader,
  ...menu,
  ...settings,
  ...buildPrefix('workflow', workflow),
  ...buildPrefix('taskApplication', taskApplication),
  ...buildPrefix('editor', editor),
};
