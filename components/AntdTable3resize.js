import React,{Fragment} from 'react';
import {Row, Col, Table} from 'antd';
import { Resizable } from 'react-resizable';
import './AntdTable.less';


//README
//AntdTable3resize (Ресайз колонок)
//если оставить дэфолтный ресайз - есть баг (нажмаем ресайзить - тянем и отпускам в месте где есть фильтр - отрабатет еще и нажатие фильтра)
//handle - компонент ресайза (Необязательный - тогда ресайз будет по бокам)
// countDifference = this.remmberPrev(e=>e); - нужна т.к. есть баг ресайза
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
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    date: `Edward King21313 123123dwedwedwd131 123  123233 ${i}`,
    amount: i,
    type: `London London London 32131 23131dwdwdwedwedewdw312  13123 213 3 12313, Park Lane no. ${i}`,
    note: 'teacher',
  });
}

class AntdTable3resize extends React.PureComponent {

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

  render() {
    //resize
    const columns = this.state.columns.map((obj, index) => {
      let modify = {...obj};
     
      modify.onHeaderCell = column => ({
        width: column.width,
        onResize: this.handleResize(index),
      });
      return modify;
    });
   
    columns.push({}); //заглушка при использовнии fixed


    return (<div style={{width:'700px'}}>
        <h2>Ресайз колонок</h2>
        <Table
          className={'TableDefault'}
          bordered
          columns={columns}
          dataSource={data}
          scroll={{ y: 240, x:true}}
          pagination={{ pageSize: 10 , size:'small', showQuickJumper:true}} //объект пагинации
          components={this.components}
        />
      </div>);
  }

}



export default AntdTable3resize;
