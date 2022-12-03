import type { CSSProperties } from 'react';
import kebabCase from 'lodash-es/kebabCase';
import isArray from 'lodash-es/isArray';

export interface StyleItem {
  className: string,
  styles: CSSProperties,
}

/** 生成 style 标签的 id 前缀 */
export const STYLE_PREFIX = 'react-echarts-core';

/** style 对象转字符串 */
function getStyleText(className: string, style: CSSProperties): string {
  const cssText = Object.keys(style).reduce((accumulator, key) => {
    const cssKey = kebabCase(key);
    const cssValue = String(style[key as keyof CSSProperties]).replace("'", "");
    return `${accumulator}${cssKey}:${cssValue};`
  }, '');

  return `.${className} { ${cssText} }`;
}

function renderStyleItem(style: StyleItem): string {
  const className = style?.className || '';
  const id = `${STYLE_PREFIX}-${className}`;

  // 如果已创建过 style 则跳过
  if (window.document && !window.document.getElementById(id)) {
    const styleTag = document.createElement('style');
    styleTag.id = id;
    styleTag.innerText = getStyleText(className, style.styles);
    document.head.append(styleTag);
  }

  return className;
}

/**
 * CSS in Js 方案, 避免在引入 react-echarts-core 之后还要引入 react-echarts-core.css
 * 接受包含 className 及对应 style 的对象
 * 以 className 作为 id 在 <head> 下创建 <style> 标签
 * 函数最终返回 className
 */
export default function renderStyle(styles: StyleItem | StyleItem[]) {
  const v: StyleItem[] = isArray(styles) ? styles : [styles];
  return v.map(renderStyleItem).join(' ');
}