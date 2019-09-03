import React,{Fragment} from 'react';
import {Row, Col, Table, Divider, Tag} from 'antd';

import './AntdTable.less';
//README
//AntdTable1scrollAndPaginataion (Скрол и Пагинация)

//Cкрол
//scroll={{y:700, x: true}}
//x - всегда по умолчанию true (иначе будет баг с кривыми колнками)
//y - высота таблицы

//Пагинация
//используем стандартную для всего сайта
//pagination={{ pageSize: 10 , size:'small', showQuickJumper:true, position: 'top'}}
// pageSize - сколько позиций на странице
// position - где будет пагинация (top, bottom);
//если нужно убрать пагинация (но если таблица очень большая - будут лаги)
//pagination={false} //для маленьких таблиц

//Ajax
//<Table loading - отображает спинер загрузки



const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `Edward King21313 123123dwedwedwd131 123  123233 ${i}`,
    age: i,
    address: `London London London 32131 23131dwdwdwedwedewdw312  13123 213 3 12313, Park Lane no. ${i}`,
    tags: i%2===0?['cool', 'teacher']:['loser'],
  });
}


class AntdTable1scrollAndPaginataionAjax extends React.PureComponent {
    state={
      data: [],
      pagination: {},
      loading: false,

      columns : [
        {
          title: 'Name',
          dataIndex: 'name.first',
          key: 'name',
          width: 100,
        },
        {
          title: 'Surname',
          dataIndex: 'name.last',
          key: 'last',
          width: 100,
        },
        {
          title: 'Gender',
          dataIndex: 'gender',
          key: 'gender',
          width: 100,
        },
        {
          title: 'Cell',
          dataIndex: 'cell',
          key: 'cell',
          width: 100,
          render: cell => <a href="javascript:;">{cell}</a>,
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
          width: 100,
        },
        {
          title: 'Login',
          dataIndex: 'login.username',
          key: 'login',
          width: 100,
        },
        {
          title: 'Password',
          dataIndex: 'login.password',
          key: 'password',
          width: 100,
        },
        
  
      ]
    };
    componentDidMount() {
      this.fetch();
    }

    fetch = () => {
      this.setState({ loading: true });
      setTimeout(()=>{
        fetch('https://randomuser.me/api/?results=100').then(response=>{
          return response.json();
        }).then(data=>{
          console.log('--data',data.results);
          this.setState({
            loading: false,
            data: data.results
          });
        });
      },2000);
    };
  
  	render() {
      const columns = [...this.state.columns];
      columns.push({}); //заглушка при использовнии fixedd
      
      //добавляем уникальный id
      const data = this.state.data.map((obj, index) => {
        return {...obj,key:index};
      });
  
      return (<Fragment>
                <h2>Скрол & Пагинация & Ajax</h2>
                <div style={{ width: '600px'}}>
                  <Table
                    className={'TableDefault'}
                    bordered={ true }
                    columns={columns}
                    dataSource={data}
                    scroll={{y:700, x: true}}
                    pagination={{ pageSize: 10 , size:'small', showQuickJumper:true, position: 'bottom'}} //объект пагинации
                    // pagination={false} //для маленьких таблиц
                    rowSelection={{}}
                    loading={this.state.loading}

                    />
                  </div>
              </Fragment>);

      }

}



export default AntdTable1scrollAndPaginataionAjax;
