/* eslint no-useless-escape:0 import/prefer-default-export:0 */
import { formatMessage } from 'umi/locale';
import React from "react";

const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export function isUrl(path) {
  return reg.test(path);
}


export function isJSON(str) {
  if (typeof str === 'string') {
    try {
      const obj = JSON.parse(str);
      if (typeof obj === 'object' && obj) {
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  }
  return false;
}

export function getSetState(dispatch, modelName) {
  return (payload) => dispatch({
    type: `${modelName}/saveState`,
    payload
  });
}

function connectKey(prefix, key) {
  return `${prefix}.${key}`;
}

export function locales(prefix) {
  return (key) => formatMessage({ id: connectKey(prefix, key), defaultMessage: key });
}

export function buildPrefix(prefix, obj) {
  const result = {};
  Object.keys(obj).map(key => {
    result[connectKey(prefix, key)] = obj[key];
  });
  return result;
}

export function formatTableTitle(prefix, columns){
  const format = locales(prefix);
  return columns.map(column=>{
    return {... column, title: format(column['title'])}
  });
}
