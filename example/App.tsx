import React from 'react';
import Widget from './demo/Widget';
import Demo1 from './demo/Demo1';
import Demo2 from './demo/Demo2';
import './app.less';

function App() {
  return (
    <div className="App">
      <h1 style={{ textAlign: 'center' }}>React ECharts Core</h1>
      {/* 基础用法 */}
      <Demo1 />
      <div className="row">
        <Widget className="col-12" title="创建【柱状图、折线图、饼图】以外的图表">
          <Demo2 />
        </Widget>
        <Widget className="col-12" title="更新数据时清除画布">
          <Demo2 clear />
        </Widget>
      </div>
    </div>
  );
}

export default App;
