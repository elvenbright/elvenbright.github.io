import React,{Fragment} from 'react';
import {Row, Col, Table} from 'antd';

import './AntdTable.less';

//README
//AntdTable6sorting (Фильтр в колонке (некотнролиреумый))


const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    date: `Edward King21313 123123dwedwedwd131 123  123233 ${i}`,
    amount: i,
    type: `London London London 32131 23131dwdwdwedwedewdw312  13123 213 3 12313, Park Lane no. ${i}`,
    note: Math.round(1 - 0.5 + Math.random() * (9999 - 1 + 1)),
 
  });
}

class AntdTable7filter extends React.PureComponent {
  state = {
    selectedRowKeys:[],
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
        sorter: (a, b) => a.amount - b.amount,
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
        sorter: (a, b) => a.note - b.note,
        filters: [
          {
            text: 'x',
            value: 1,
          },
          {
            text: 'xx',
            value: 2,
          },
          {
            text: 'xxx',
            value: 3,
          },{
            text: 'xxxx',
            value: 4,
          },
        ],
        filterMultiple: false,
        onFilter: (value, data) => data.note.toString().length === value,
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

    return (<div style={{width:'600px'}}>
        <h2>Фильтр в колонке (некотнролиреумый)</h2>
        <Table
          className={'TableDefault'}
          bordered
          columns={columns}
          dataSource={data}
        
          pagination={{ pageSize: 10 , size:'small', showQuickJumper:true}} //объект пагинации
          scroll={{ y: 240, x:true }}
    
        />
      </div>);
  }

}



export default AntdTable7filter;
