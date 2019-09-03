import React,{Fragment} from 'react';
import {Row, Col, Table} from 'antd';

import './AntdTable.less';

//README
//AntdTable5attachment (Вложеность строки)
//прокидывается в data.description
//<Table expandedRowRender={data => data.description}/>

const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    date: `Edward King21313 123123dwedwedwd131 123  123233 ${i}`,
    amount: i,
    type: `London London London 32131 23131dwdwdwedwedewdw312  13123 213 3 12313, Park Lane no. ${i}`,
    note: 'teacher',
    description: <div>ВЛОЖЕННОСТЬ</div>
  });
}

class AntdTable5attachment extends React.PureComponent {

  state = {
    columns: [
      {
        title: 'Date',
        dataIndex: 'date',
        width: 100,
        className: 'DisableWordWrap'
      },
      {
        title: 'Amount',
        dataIndex: 'amount',
        width: 100,
      },
      {
        title: 'Type',
        dataIndex: 'type',
        width: 100,
        className: 'Ellipsis'
      },
      {
        title: 'Note',
        dataIndex: 'note',
        width: 100,
      },
      {
        title: 'Action',
        key: 'action',
        render: () => <a href="javascript:;">Delete</a>,
        width: 100,
      }
    ],
  };

  

  render() {
    const columns = [...this.state.columns];
    columns.push({}); //заглушка при использовнии fixed
    
    return (<div style={{width:'400px'}}>
        <h2>Вложеность строки</h2>
        <Table
          className={'TableDefault'}
          bordered
          columns={columns}
          dataSource={data}
          scroll={{ y: 240, x:true }}
          pagination={{ pageSize: 10 , size:'small', showQuickJumper:true}} //объект пагинации
          expandedRowRender={data => data.description}
        
        />
      </div>);
  }

}



export default AntdTable5attachment;
