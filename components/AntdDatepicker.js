import React,{Fragment} from 'react';
import { DatePicker, Icon } from 'antd';

import './AntdDatepicker.less';

class AntdDatepicker extends React.PureComponent {

    state = {
		height: 0,
        isNeedScroll: false
	};
    changeHandler=(date, dateString)=>{
        console.log('---date', date);
        console.log('---dateString', dateString);
    };
  	render() {
        
		return (<div className={'AntdDatepicker'}>
            <div>AntdDatepicker</div>
            <div>
                <DatePicker onChange={this.changeHandler}/>
            </div>
        </div>);

  	}

}



export default AntdDatepicker;
