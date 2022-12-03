import React from 'react';
import renderStyle from '../renderStyle';
import { chartEmpty } from './style';

const Empty: React.FC = () => {
    return <div className={renderStyle(chartEmpty)}>No Data</div>
}

export default Empty;