import React, { Fragment } from 'react';
import { Icon } from 'antd';
import OpacityAndBlockTest from './OpacityAndBlockTest';



class Block_MainPage extends React.PureComponent {


	render() {
		return (
			<div>
                <div>Readme:(тестировать на windows - chrome) 1 - должна работать opacity при ресайзе  2 - шрифт должен идти по низу блока</div>
                <hr/><br/>
                <div>нормальный шрифт</div>
                <OpacityAndBlockTest font="googleFont"/>

                <div>плохой шрифт шрифт</div>
                <OpacityAndBlockTest font="seroPro"/>
				<div><Icon type="step-backward"/></div>
			</div>
		);

	}

}



export default Block_MainPage;
