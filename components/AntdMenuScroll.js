import React,{Fragment} from 'react';

import { Menu, Icon } from 'antd';
import ReactResizeDetector from 'react-resize-detector';
const { SubMenu } = Menu;
import './AntdMenuScroll.less';

class AntdMenu extends React.PureComponent {

    state = {
		height: 0,
        isNeedScroll: false
	};
 
   onResize = (w,h) => {
        this.setState({height:h})
    };
    componentDidUpdate(prevProps, prevState){
        if(window.innerHeight<this.state.height && this.state.height!==prevState.height){
            this.setState({isNeedScroll:true})
        }
        if(window.innerHeight>this.state.height && this.state.height!==prevState.height){
            this.setState({isNeedScroll:false})
        }
        
    }
  
  	render() {
        console.log(this.state.isNeedScroll);
		return (<Fragment>
                <div style={{height: '1000px'}}>Table</div>
                <div style={{position: 'fixed', top: '16px'}}>
                <Menu style={{ width: 500 }} mode="horizontal" getPopupContainer={node => node.parentNode}>
                    <SubMenu
                    key="sub1"
                    title={
                        <span>
                        <Icon type="mail" />
                        <span>Navigation One</span>
                        </span>
                    }
                    >
                    <Menu.ItemGroup title="Item 1">
                        <Menu.Item key="1">Option 1</Menu.Item>
                        <Menu.Item key="2">Option 2</Menu.Item>
                    </Menu.ItemGroup>
                    <Menu.ItemGroup title="Iteom 2">
                        <Menu.Item key="3">Option 3</Menu.Item>
                        <Menu.Item key="4">Option 4</Menu.Item>
                    </Menu.ItemGroup>
                    </SubMenu>
                    <SubMenu
                    key="sub2"
                    title={
                        <span>
                        <Icon type="appstore" />
                        <span>Navigation Two</span>
                        </span>
                    }
                    >
                    <Menu.Item key="5">Option 5</Menu.Item>
                    <Menu.Item key="6">Option 6</Menu.Item>
                    <SubMenu className={this.state.isNeedScroll?'ScrollMenu':''} key="sub3" title="Submenu">
                        
                        <Menu.Item key="7">Option 7</Menu.Item>
                        <Menu.Item key="8">Option 8</Menu.Item>
                        <Menu.Item key="9">Option 9</Menu.Item>
                        <Menu.Item key="10">Option 10</Menu.Item>
                        <Menu.Item key="11">Option 11</Menu.Item>
                        <Menu.Item key="12">Option 12</Menu.Item>
                        <Menu.Item key="13">Option 13</Menu.Item>
                        <Menu.Item key="14">Option 14</Menu.Item>
                        <Menu.Item key="15">Option 15</Menu.Item>
                        <Menu.Item key="16">Option 16</Menu.Item>
                        <Menu.Item key="17">Option 17</Menu.Item>
                        <Menu.Item key="18">Option 18</Menu.Item>
                        <Menu.Item key="19">Option 19</Menu.Item>
                        <Menu.Item key="20">Option 20</Menu.Item>
                        <Menu.Item key="21">Option 21</Menu.Item>
                        <ReactResizeDetector handleWidth handleHeight onResize={this.onResize}/>
                    </SubMenu>
                    </SubMenu>
                    <SubMenu
                    key="sub4"
                    title={
                        <span>
                        <Icon type="setting" />
                        <span>Navigation Three</span>
                        </span>
                    }
                    >
                    <Menu.Item key="22">Option 22</Menu.Item>
                    <Menu.Item key="23">Option 23</Menu.Item>
                    <Menu.Item key="24">Option 24</Menu.Item>
                    <Menu.Item key="25">Option 25</Menu.Item>
                    </SubMenu>
                </Menu>
                </div>
            </Fragment>);

  	}

}



export default AntdMenu;
