import React, { Fragment } from 'react';
import { Icon } from 'antd';
import OpacityAndBlockTest from './OpacityAndBlockTest';

//Readme
//тестировать на windows 7, chrome
//для проверки подключаем шрифт в fonts
//пробрасываем в компонент OpacityAndBlockTest

class Block_MainPage extends React.PureComponent {


	render() {
		return (
			<div>
                <div><Icon type="exclamation" /><b>Readme: (тестировать на windows - chrome/ на маке работало корректно)</b></div>
                <div>1 - маленький шрифт должен чуть ниже центра + от от большой буквы должен идти отсуп как от низа(то есть почти по центру)</div>
                <div>2 - должна работать opacity при узком экране(сразу поставить узкуий экран и перезаргузить - текст не должен вылазить)</div>
                
                <hr/><br/>

               

                <div><span style={{color:'green'}}>1 - в блоке нормально</span></div>
                <div><span style={{color:'green'}}>2 - opacity - хорошо</span></div>
                <OpacityAndBlockTest font="Courier New"/>

                <div><span style={{color:'green'}}>1 - в блоке нормально</span></div>
                <div><span style={{color:'red'}}>2 - opacity при перовом рендере работает некорректно</span></div>
                <OpacityAndBlockTest font="googleFont"/>

                <div><span style={{color:'red'}}>1 - от буквы f,T от верхеней части должен быть паддинг как снизу</span></div>
                <div><span style={{color:'red'}}>2 - opacity при перовом рендере работает некорректно</span></div>
                <OpacityAndBlockTest font="seroPro"/>
			

                <div><span style={{color:'green'}}>1 - в блоке нормально</span></div>
                <div><span style={{color:'red'}}>2 - opacity при перовом рендере работает некорректно + при ресайзе слитает</span></div>
                <OpacityAndBlockTest font="openSans"/>

                <div><span style={{color:'green'}}>1 - в блоке нормально</span></div>
                <div><span style={{color:'red'}}>2 - opacity вообще неработает</span></div>
                <OpacityAndBlockTest font={false}/>

                <div><span style={{color:'green'}}>1 - в блоке нормально</span></div>
                <div><span style={{color:'red'}}>2 - opacity расстояние между текстом и блоками span(с opacity) - не должно быть</span></div>
                <OpacityAndBlockTest font={'Alegreya'}/>

                <div><span style={{color:'green'}}>1 - в блоке нормально</span></div>
                <div><span style={{color:'red'}}>2 - opacity при первой загрузке текста меньше, чем должно быть</span></div>
                <OpacityAndBlockTest font={'Tinos'}/>
			
			</div>
		);

	}

}



export default Block_MainPage;
