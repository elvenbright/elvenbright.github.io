import React,{Fragment} from 'react';
import {Row, Col, Table} from 'antd';

import './AntdTable.less';
//README
//AntdTable8outerFilter (Контролиреумая фильтраця/сортировка/пагинация)
//для сортировки нужно мутировать state.columns - для встроеной в antd фильтрации есть onChange

//при изменении pagination/filters/sorter вызывается функция эта функция <Table onChange={this.handleTableChange}
//handleTableChange = (pagination, filters, sorter) =>{}
//в которую прелетаю все наши изменения

//AntdTable8outerFilter (внешние кнопки фильтра)
// - фильтруемые и сортируемые позиции должны обязательно содержать поля sortOrder / filteredValue
// - sortOrder:null ('ascend'/'descend'/null)
// - filteredValue: null  ([4] (значения береться из filters value))


const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    date: `Edward King21313 123123dwedwedwd131 123  123233 ${i}`,
    amount: i,
    type: `London London London 32131 23131dwdwdwedwedewdw312  13123 213 3 12313, Park Lane no. ${i}`,
    name: Math.round(1 - 0.5 + Math.random() * (2 - 1 + 1))===1?"Jim":"John",
    note: Math.round(1 - 0.5 + Math.random() * (9999 - 1 + 1)),
  });
}

class AntdTable8outerFilter extends React.PureComponent {
  state = {
    paginationCurrent:0,
    selectedRowKeys:[],
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
        filteredValue: null,
        filterMultiple: false,
        onFilter: (value, data) => data.name === value,
      },
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
        sortOrder: 'descend', // 'ascend'/'descend'/null !сортировка может работать только на одном поле
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
        sortOrder: null,
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
        filteredValue: [4], //умолчательное состояние - массив value  [value,value]
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
  



  //изменение пагинации/фильтра/сортировки
  //в этой функции мутируем
  handleTableChange = (pagination, filters, sorter) => {
    console.log('---pagination',pagination);
    console.log('---filters',filters);
    console.log('---sorter',sorter);

    let updatedColumns = [...this.state.columns];
    for(let i=0;updatedColumns.length>i;i++){
      //Если в позиции columns содержится filteredValue 
      if(Object.keys(updatedColumns[i]).includes('filteredValue')){
        for(let key in filters){
          if(key===updatedColumns[i].dataIndex){
            updatedColumns[i].filteredValue = filters[key];
            break;
          }
        }
      }
      //Если в позиции колонки содержится sortOrder
      if(Object.keys(updatedColumns[i]).includes('sortOrder')){
          if(sorter.field===updatedColumns[i].dataIndex){
            updatedColumns[i].sortOrder = sorter.order
          }
          else{
            updatedColumns[i].sortOrder = null;
          }
      }
    }

    console.log('---updatedColumns',updatedColumns);
    this.setState({paginationCurrent:pagination.current,columns:updatedColumns});
  };

  render() {
   


    const columns = [...this.state.columns];
    columns.push({}); //заглушка при использовнии fixed



    return (<div style={{width:'1000px'}}>
        <h2>Контролиреумая фильтраця/сортировка/пагинация</h2>
        <div>
          {/* мутируем state.columns (везде ставим sortOrder=null) */}
          <button onClick={()=>{
            let updatedColumns = [...this.state.columns];
            for(let i=0;updatedColumns.length>i;i++){
              if(Object.keys(updatedColumns[i]).includes('sortOrder')){
                updatedColumns[i].sortOrder=null;
              }
            }
            this.setState({columns:updatedColumns});
          }}>clear Sorting</button>

          {/* мутируем state.columns (везде ставим filteredValue=null) */}
          <button onClick={()=>{
            let updatedColumns = [...this.state.columns];
            for(let i=0;updatedColumns.length>i;i++){
              if(Object.keys(updatedColumns[i]).includes('filteredValue')){
                updatedColumns[i].filteredValue=null;
              }
            }
            this.setState({columns:updatedColumns});
          }}>clear Filters</button>

          {/* мутируем state.columns (везде ставим sortOrder=null, кроме нужной позиции sortOrder='ascend') */}
          <button onClick={()=>{
            let updatedColumns = [...this.state.columns];
            for(let i=0;updatedColumns.length>i;i++){
              if(Object.keys(updatedColumns[i]).includes('sortOrder') && updatedColumns[i].dataIndex === 'amount'){
                updatedColumns[i].sortOrder='ascend';
              }
              else{
                updatedColumns[i].sortOrder=null;
              }
            }
            this.setState({columns:updatedColumns});
          }}>set Sort Amount Ascend</button>

          {/* мутируем state.columns (ставим фильтр только в нужной позиции filteredValue=["Jim"]) */}
          <button onClick={()=>{
            let updatedColumns = [...this.state.columns];
            for(let i=0;updatedColumns.length>i;i++){
              if(Object.keys(updatedColumns[i]).includes('filteredValue') && updatedColumns[i].dataIndex === 'name'){
                updatedColumns[i].filteredValue=['Jim'];
              }
            }
            this.setState({columns:updatedColumns});
          }}>set Filter Name Jim</button>
        </div>

        <Table
          className={'TableDefault'}
          bordered
          columns={columns}
          dataSource={data}
          components={this.components}
          scroll={{ y: 240, x:true }}
          pagination={{ pageSize: 10 ,current:this.state.paginationCurrent, size:'small', showQuickJumper:true}} //объект пагинации
         
          onChange={this.handleTableChange}
          
    
        />
      </div>);
  }

}



export default AntdTable8outerFilter;