import React,{Fragment} from 'react';
import {Row, Col, Table, Divider, Tag, Input, Button, Icon} from 'antd';


import './AntdTable.less';
import './AntdTable11.less';


//README
//AntdTable11SearchCustomMenu (поиск)
//Выпадающее меню можно кастомизировать как угодно и добавлять любой функционал
//Встроенную сортировку можно убрать добавив (см. стили)

const data = [];
for (let i = 0; i < 1000; i++) {
  data.push({
    key: i,
    name: `Edward King21313 123123dwedwedwd131 123  123233 ${i}`,
    age: i,
    address: `London London London 32131 23131dwdwdwedwedewdw312  13123 213 3 12313, Park Lane no. ${i}`,
    tags: i%2===0?['cool', 'teacher']:['loser'],
  });
}

class AntdTable11SearchCustomMenu extends React.PureComponent {

    state={
        columns : [
          {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: 100,
            render: text => <a href="javascript:;">{text}</a>,
          },
          {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
            width: 100,
            sortOrder: 'descend',
            sorter: (a, b) => a.age - b.age,
          },
          {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            width: 100,
          },
          {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            width: 100,
            render: tags => (
              <span>
                {tags.map(tag => {
                  let color = tag.length > 5 ? 'geekblue' : 'green';
                  if (tag === 'loser') {
                    color = 'volcano';
                  }
                  return (
                    <Tag color={color} key={tag}>
                      {tag.toUpperCase()}
                    </Tag>
                  );
                })}
              </span>
            ),
          },
          {
            title: 'Action',
            key: 'action',
            width: 100,
            render: (text, record) => (
              <span>
                <a href="javascript:;">Invite {record.name}</a>
                <Divider type="vertical" />
                <a href="javascript:;">Delete</a>
              </span>
            ),
          }
        ]
      };

    

    //11 search
    handleSearch = (confirm) => {
        confirm(); //закрываем модалку

    };

    handleReset = clearFilters => {

        clearFilters();

    };
    hanldeSort = (confirm) => {
        console.log('сортировка');
        let obj = [...this.state.columns];
        for(let i=0;obj.length>i;i++){
            console.log('--',obj[i]);
            if(obj[i].dataIndex==='age'){
                obj[i].sortOrder = 'ascend';
            }
        };

        confirm(); //закрываем модалку
        this.setState({columns:obj});
    };
    hanldeFilter = (confirm,setSelectedKeys) => {
        console.log('фильтр 11');
        setSelectedKeys(['11']);
        confirm(); //закрываем модалку
    
    };
    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => {

                      setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    }
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <div onClick={()=>this.hanldeSort(confirm)}>СОРТИРОВКА</div>
                <div onClick={()=>this.hanldeFilter(confirm,setSelectedKeys)}>ФИЛЬТР</div>
                {/* <Button
                    type="primary"
                    onClick={() => this.handleSearch(selectedKeys, confirm)}
                    icon="search"
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
                    Поиск
                </Button> */}
                <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: "100%" }}>
                    Сброс всей фильтрации
                </Button>
            </div>
        ),
        filterIcon: filtered => (
            <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
    });

  render() {
    //resize +  add "Fix button" to title
    const columns = this.state.columns.map((obj, index) => {
        let modify = {...obj};
        // 11 search
        // исключаем или добавляем кнопку поиска только нужным нам полям
        if(obj.key === 'age'){
          modify =  {...modify,...this.getColumnSearchProps(obj.dataIndex)};
        }
        else{
            
        }
     
        return modify;
    });
   
    columns.push({}); //заглушка при использовнии fixed


    return (<div style={{width:'700px'}}>
        <h2>Поиск & Кастомное меню</h2>
        <Table
          className={'TableDefault TableBlockSort'}
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



export default AntdTable11SearchCustomMenu;
