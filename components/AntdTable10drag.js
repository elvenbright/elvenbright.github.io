import React,{Fragment} from 'react';
import {Row, Col, Table} from 'antd';

import ReactDragListView from "react-drag-listview";
import './AntdTable.less';
//README
//AntdTable10drag (drag columns)
// - onDragEnd - функция пересчета state.columns
// - nodeSelector="th" - что перетаскивается
// - handleSelector=".dragItem" - за что "хватаем"
// - ignoreSelector=".Ellipsis" - данный хватать нельзя

//при смещении нужно учитывать кол-во доп-полей (checkbox и "вложеность") dragOffset


const data = [];
for (let i = 0; i < 1000; i++) {
  data.push({
    key: i,
    date: `Edward King21313 123123dwedwedwd131 123  123233 ${i}`,
    amount: i,
    type: `London London London 32131 23131dwdwdwedwedewdw312  13123 213 3 12313, Park Lane no. ${i}`,
    name: Math.round(1 - 0.5 + Math.random() * (2 - 1 + 1))===1?"Jim":"John",
    note: Math.round(1 - 0.5 + Math.random() * (9999 - 1 + 1)),
    description: <div>ВЛОЖЕННОСТЬ</div>
  });
}

class AntdTable10drag extends React.PureComponent {
  state = {
    paginationCurrent:0,
    selectedRowKeys:[],
    tableWidth: 0,
    columns: [
      {
        title: 'Name',
        dataIndex: 'name',
        width: 100,
        filters: [
          {
            text: 'Jim',
            value: 'Jim',
          },
          {
            text: 'John',
            value: 'John',
          }
        ],
        filterMultiple: false,
        onFilter: (value, data) => data.name === value,
      },
      
      {
        title: 'Date',
        dataIndex: 'date',
        width: 100,
        className: 'DisableWordWrap',
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
        width: 100
      }
    ],
  };
  


  //drag columns 
  onDragEnd=(fromIndex, toIndex)=>{
    console.log(toIndex);
    //TODO вынести в константы (смещение из-за полей checkbox и "вложеность")
    //учитываем смещение
    let fIndex = fromIndex-2;
    let tIndex = toIndex-2;
    //блокируем перетаскивание в колонки (checkbox и "вложеность")
    if(toIndex<2){
       return;
    }

    const columnsCopy = this.state.columns.slice();
    
    const item = columnsCopy.splice(fIndex, 1)[0];
    columnsCopy.splice(tIndex, 0, item);
    console.log('---drag result',columnsCopy);
    this.setState({ columns: columnsCopy });
  };
  render() {
    

     //resize +  add "Fix button" to title
     const columns = this.state.columns.map((obj, index) => {
      let modify = {...obj};
      if(obj.hasOwnProperty('title')){
        modify.title = <div><button className={"dragItem"} style={obj.hasOwnProperty('fixed')?{background:'red'}:{}}>U</button>{obj.title}</div>;
      }
      return modify;
    });
   
    columns.push({}); //заглушка при использовнии fixed

 

    return (<div >
        <h2>Drag and Drop колонок</h2>
       
        <div>
        <ReactDragListView.DragColumn
            onDragEnd={this.onDragEnd}
            nodeSelector="th"
            handleSelector=".dragItem"
            ignoreSelector=".Ellipsis"
        ><Table
          className={'TableDefault'}
          bordered
          columns={columns}
          dataSource={data}
          components={this.components}
          scroll={{ y: 240, x:true }}
          pagination={{ pageSize: 10 ,current:this.state.paginationCurrent, size:'small', showQuickJumper:true}} //объект пагинации
          rowSelection={{}}
          expandedRowRender={data => data.description}
  
          
        /></ReactDragListView.DragColumn>
 
        </div>
      </div>);
  }

}



export default AntdTable10drag;