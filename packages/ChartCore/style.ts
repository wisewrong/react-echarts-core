import type { StyleItem } from '../renderStyle';

export const chartWapper: StyleItem = {
  className: 'react-chart-wapper',
  styles: {
    height: '100%',
  }
}

export const charCanvas: StyleItem = {
  className: 'react-chart-canvas',
  styles: {
    width: '100%',
    height: '100%',
    minHeight: '80px',
  }
}

export const chartEmpty: StyleItem = {
  className: 'react-chart-empty',
  styles: {
    ...charCanvas.styles,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '16px',
    background: '#EEF3F7',
    color: '#67717A',
  }
}