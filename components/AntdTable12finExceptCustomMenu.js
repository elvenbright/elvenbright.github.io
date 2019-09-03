import React,{Fragment} from 'react';
import {Row, Col, Table} from 'antd';
import { Resizable } from 'react-resizable';
import ReactResizeDetector from 'react-resize-detector';
import ReactDragListView from "react-drag-listview";
import './AntdTable.less';
//README
//читать в отдельных компонентах

const ResizeableTitle = props => {
  const { onResize, width, ...restProps } = props;

  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable width={width} height={0} onResize={onResize} handle={<div onClick={e=>{e.preventDefault();e.stopPropagation();}} style={{border:'1px dashed red',width:"100%",position:'absolute',bottom:'0',left:'0',height:'10px'}}></div>}>
      <th {...restProps} />
    </Resizable>
  );
};

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
function setTitle(title){
  return <span><button onClick={(e)=>{
    e.preventDefault();
    e.stopPropagation();
    console.log('LOCK');
  }}>U</button>{title}</span>
};

class AntdTable12finExceptCustomMenu extends React.PureComponent {
  state = {
    paginationCurrent:0, //текущая страницы
    selectedRowKeys:[], //выбранные чекбоксами строки
    tableWidth: 0, //для кнопки авто-ресайза колонок
    rowOnFocus: null, //кликнутая позиция
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
        className: 'DisableWordWrap',
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


  //resize
  components = {
    header: {
      cell: ResizeableTitle,
    },
  };


  //вынести в отдельную функцию
  //запоминает предыдущее состояние
  remmberPrev=(func)=>{
    var prev=[];
    //Замыкание
    return function() {
      let result
      if(prev[arguments[2]]===void 0){
        result=arguments[0]-arguments[1];
      }
      else{
        result=arguments[0]-prev[arguments[2]];
      }
      prev[arguments[2]]=arguments[0];
      arguments[0]=result;
  
      return func.apply(this, arguments);
    }
  }

  //resize count diff
  countDifference = this.remmberPrev(e=>e);
  //resize
  handleResize = index => (e, { size }) => {
    
    this.setState(({ columns }) => {3
      const nextColumns = [...columns];

      //Данная функция фиксит баг с ресайзом
      let updatedSize = nextColumns[index].width + this.countDifference(size.width, nextColumns[index].width, index);


      //TODO вынести в константы
      //лимит ресайза
      if(updatedSize<100){
        updatedSize=100;
      }
      if(updatedSize>500){
        updatedSize=500;
      }
      

      nextColumns[index] = {
        ...nextColumns[index],
        width: updatedSize,
      };
      return { columns: nextColumns };
    });
  };
  //02 - row click
  onRowClick=(data)=>{
    return {
      onClick: () => {
        console.log('single click',data.key);
        //устанавливаем стили
        if(data.key===this.state.rowOnFocus){
          this.setState({rowOnFocus:null});
        }
        else{
          this.setState({rowOnFocus:data.key});
        }
      },
      onDoubleClick: () => {
        console.log('double click',data.key);
        //устанавливаем стили
        this.setState({rowOnFocus:data.key});
      }
    };
  };
  //02 - return row className
  selectRow=(e)=>{
    let {rowOnFocus} = this.state;
    //ставит стиль выбранной позиции
    if(rowOnFocus===e.key){
      return "focusedRow"
    }
  }

  //изменение пагинации/фильтра/сортировки
  //в этой функции мутируем
  handleTableChange = (pagination, filters, sorter) => {
    console.log('---pagination',pagination);
    console.log('---filters',filters);
    console.log('---sorter',sorter);

    let updatedColumns = [...this.state.columns];
    for(let i=0;updatedColumns.length>i;i++){
      //Если в позиции columns содержится filteredValue 
      if(updatedColumns[i].hasOwnProperty('filteredValue')){
        for(let key in filters){
          if(key===updatedColumns[i].dataIndex){
            updatedColumns[i].filteredValue = filters[key];
            break;
          }
        }
      }
      //Если в позиции колонки содержится sortOrder
      if(updatedColumns[i].hasOwnProperty('sortOrder')){
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
  setDeafaultSizeWidth=()=>{
    //вычитаем ширину неподконтрольных блоков
    //50 - длинна блока с "вложенностью"
    //60 - длинна блока с "чекбоксами"
    //TODO вынести в константы
    console.log('---setDefaultSizeOfColumns',(this.state.tableWidth-60-50)/this.state.columns.length);
    let result = [];
    for(let i=0;this.state.columns.length>i;i++){
      result.push({...this.state.columns[i],width:(this.state.tableWidth-60-50)/this.state.columns.length})
    }
    this.setState({columns:result});
  };

  //react-resize-detector
  onResizeScreen=(w,h) => {
      this.setState({tableWidth:w});
  };

  //drag columns 
  onDragEnd=(fromIndex, toIndex)=>{
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
        modify.title = <div><button className={"dragItem"} style={obj.hasOwnProperty('fixed')?{background:'red'}:{}} onClick={(e)=>this.setFixed(e,obj.dataIndex)}>U</button>{obj.title}</div>;
      }
      modify.onHeaderCell = column => ({
        width: column.width,
        onResize: this.handleResize(index),
      });
      return modify;
    });
   
    columns.push({}); //заглушка при использовнии fixed

    //02 row select
    const rowSelection={
      selectedRowKeys: this.state.selectedRowKeys, //массив с выбранными сюда, а не в props
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        this.setState({selectedRowKeys:selectedRowKeys});
      },
      hideDefaultSelections: true,
      selections: [
        {
          key: 'diselect all',
          text: 'Diselect All',
          onSelect: (e) => {
            console.log('-e',e);
            this.setState({selectedRowKeys: []});
          },
        },
      ],
    }

    return (<div >
        <h2>Финальная версия(Кроме кастомного меню)</h2>

        <div><button onClick={this.setDeafaultSizeWidth}>SET DEFAULT SIZE OF COLUMNS</button></div>
        <div>
          {/* мутируем state.columns (везде ставим sortOrder=null) */}
          <button onClick={()=>{
            let updatedColumns = [...this.state.columns];
            for(let i=0;updatedColumns.length>i;i++){
              if(updatedColumns[i].hasOwnProperty('sortOrder')){
                updatedColumns[i].sortOrder=null;
              }
            }
            this.setState({columns:updatedColumns});
          }}>clear Sorting</button>

          {/* мутируем state.columns (везде ставим filteredValue=null) */}
          <button onClick={()=>{
            let updatedColumns = [...this.state.columns];
            for(let i=0;updatedColumns.length>i;i++){
              if(updatedColumns[i].hasOwnProperty('filteredValue')){
                updatedColumns[i].filteredValue=null;
              }
            }
            this.setState({columns:updatedColumns});
          }}>clear Filters</button>

          {/* мутируем state.columns (везде ставим sortOrder=null, кроме нужной позиции sortOrder='ascend') */}
          <button onClick={()=>{
            let updatedColumns = [...this.state.columns];
            for(let i=0;updatedColumns.length>i;i++){
              if(updatedColumns[i].hasOwnProperty('sortOrder') && updatedColumns[i].dataIndex === 'amount'){
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
              if(updatedColumns[i].hasOwnProperty('filteredValue') && updatedColumns[i].dataIndex === 'name'){
                updatedColumns[i].filteredValue=['Jim'];
              }
            }
            this.setState({columns:updatedColumns});
          }}>set Filter Name Jim</button>
        </div>

        <div>
        <ReactDragListView.DragColumn
            onDragEnd={this.onDragEnd}
            nodeSelector="th"
            handleSelector=".dragItem"
        ><Table
          className={'TableDefault'}
          bordered
          columns={columns}
          dataSource={data}
          components={this.components}
          scroll={{ y: 240, x:true }}
          pagination={{ pageSize: 10 ,current:this.state.paginationCurrent, size:'small', showQuickJumper:true}} //01 объект пагинации


          rowSelection={rowSelection}
          rowClassName={this.selectRow}
          onRow={this.onRowClick}

          expandedRowRender={data => data.description}

          
          onChange={this.handleTableChange}

          
        /></ReactDragListView.DragColumn>
        <ReactResizeDetector handleWidth onResize={this.onResizeScreen}/>
        </div>
      </div>);
  }

}



export default AntdTable12finExceptCustomMenu;