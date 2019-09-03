import React, { Fragment } from 'react';
import { Icon } from 'antd';
import OpacityAndBlockTest from './OpacityAndBlockTest';



class Block_MainPage extends React.PureComponent {


	render() {
		return (
			<div>
                <div><Icon type="exclamation" /><b>Readme: (тестировать на windows - chrome)</b></div>
                <div>1 - должна работать opacity при ресайзе</div>
                <div>2 - шрифт должен идти по низу блока</div>
                <hr/><br/>

                <div>стандартный шрифт</div>
                <OpacityAndBlockTest font="Courier New"/>

                <div>нормальный шрифт</div>
                <OpacityAndBlockTest font="googleFont"/>

                <div>от буквы "f" от верхеней части должен быть паддинг как снизу</div>
                <OpacityAndBlockTest font="seroPro"/>
			

                <div>плохой шрифт шрифт</div>
                <OpacityAndBlockTest font="openSans"/>
			
			</div>
		);

	}

}



export default Block_MainPage;
