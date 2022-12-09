import { useLayoutEffect, useState } from "react";
import { ResizeObserver } from '@juggle/resize-observer';

export type Size = { width: number; height: number };

/**
 * 监听 DOM 节点尺寸变化
 * @param target HTMLElement, 必填，否则无法正常监听，建议以 docment.body 作为缺省值
 * @returns type Size = { width: number; height: number };
 */
const useSize = (target: HTMLElement): Size => {
  const [size, setSize] = useState<Size>({
    width: target?.clientWidth,
    height: target?.clientHeight,
  });

  useLayoutEffect(() => {
    if (!target) return;

    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        const { clientWidth, clientHeight } = entry.target || {};
        setSize({
          width: clientWidth,
          height: clientHeight,
        });
      });
    });

    resizeObserver.observe(target);
    return () => {
      resizeObserver.disconnect();
    };
  }, [target]);

  return size;
}

export default useSize;
