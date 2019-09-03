import React,{Fragment} from 'react';
import {Row, Col, Table} from 'antd';
import ReactResizeDetector from 'react-resize-detector';
import './AntdTable.less';

//AntdTable9fixed (фиксированная колонка)
//для сортировки колонок нужно мутировать state.columns
// - обязательно справа в columns должна быть "заглушка" (columns.push({}); //заглушка при использовнии fixed)




const data = [];
for (let i = 0; i < 100; i++) {
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
function setTitle(title){
  return <span><button onClick={(e)=>{
    e.preventDefault();
    e.stopPropagation();
    console.log('LOCK');
  }}>U</button>{title}</span>
};

class AntdTable9fixedSetDefSize extends React.PureComponent {
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
  
  //setFixed
  setTitle=(title)=>{
    return <span><button onClick={(e)=>{
      e.stopPropagation()
      console.log('LOCK');
    }}>U</button>{title}</span>
  };


  
  //setFixed
  setFixed=(e,dataIndex)=>{
    e.preventDefault();
    e.stopPropagation();
    console.log('LOCK',dataIndex);
    //модифицируем state
    let fixedPos = [];
    let modifiedColumns = [];
    for(let i=0;this.state.columns.length>i;i++){
      if(this.state.columns[i] && this.state.columns[i].dataIndex===dataIndex){
        let obj = {...this.state.columns[i]};
        if(obj.hasOwnProperty('fixed')){
          delete obj['fixed'];
          fixedPos.push(obj);
        }
        else{
          obj.fixed = 'left';
          fixedPos.push(obj);
        }
        
        
      }
      else{
        let obj = {...this.state.columns[i]};
        if(obj.hasOwnProperty('fixed')){
          delete obj['fixed'];
        }
        modifiedColumns.push(obj);
        
      }
    }

    let result = fixedPos.concat(modifiedColumns);
    console.log('---Lock result',result);
    this.setState({columns:result});
  };

  //SET DEFAULT SIZE OF COLUMNS
  setDeafaultSizeWidth=(e)=>{
    //вычитаем ширину неподконтрольных блоков
    //50 - длинна блока с вложенностью
    //60 - длинна блока с чекбоксами
    console.log('---setDefaultSizeOfColumns',(this.state.tableWidth-60-50+e)/this.state.columns.length);
    let result = [];
    for(let i=0;this.state.columns.length>i;i++){
      result.push({...this.state.columns[i],width:(this.state.tableWidth-60-50+e)/this.state.columns.length})
    }
    this.setState({columns:result});
  };
  onResizeScreen=(w,h) => {
      this.setState({tableWidth:w});
  };
  render() {
    

    //add "Fix button" to title
    const columns = this.state.columns.map((obj, index) => {
      let modify = {...obj};
      if(obj.hasOwnProperty('title')){
        modify.title = <div><button style={obj.hasOwnProperty('fixed')?{background:'red'}:{}} onClick={(e)=>this.setFixed(e,obj.dataIndex)}>U</button>{obj.title}</div>;
      }
      return modify;
    });
   
    columns.push({}); //заглушка при использовнии fixed

  
    return (<div >
        <h2>Фиксированная колонка слева + установоить по ширине экрана все колонки</h2>
        <div><button onClick={()=>this.setDeafaultSizeWidth(0)}>SET DEFAULT SIZE OF COLUMNS</button></div>
        <div><button onClick={()=>this.setDeafaultSizeWidth(100)}>SET DEFAULT MORE THAN DISPLAY</button></div>
        <div>
        <Table
          className={'TableDefault'}
          bordered
          columns={columns}
          dataSource={data}
          components={this.components}
          scroll={{ y: 240, x:true }}
          
          pagination={{ pageSize: 10 ,current:this.state.paginationCurrent, size:'small', showQuickJumper:true}} //объект пагинации

          rowSelection={{}}
          expandedRowRender={data => data.description}
          
        />
        <ReactResizeDetector handleWidth onResize={this.onResizeScreen}/>
        </div>
      </div>);
  }

}



export default AntdTable9fixedSetDefSize;