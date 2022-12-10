import React from 'react';
import Widget from './components/Widget';
import Demo1 from './demo/Demo1';
import Demo2 from './demo/Demo2';
import Demo3 from './demo/Demo3';
import Demo4 from './demo/Demo4';
import Demo5 from './demo/Demo5';
import Demo6 from './demo/Demo6';
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
      <div className="row">
        <Widget className="col-12" title="自定义 loading 或空状态">
          <Demo3 />
        </Widget>
        <Widget className="col-12" title="事件处理">
          <Demo4 />
        </Widget>
      </div>
      <div className="row">
        <Widget className="col-12" title="">
          <Demo5 />
        </Widget>
        <Widget className="col-12" title="">
          <Demo6 />
        </Widget>
      </div>
    </div>
  );
}

export default App;
