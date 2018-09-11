import React from 'react';
import './FilterBlock.scss';




class FilterBlock extends React.PureComponent {

    state={
        css: "blockFilterZero",
    }
    timer = null;
    //warning fix
    //создаем переменную  при маунте
    //удаляем её при анмаунте
    //таким образом при проверке этой переменной можно узнать существует ли наш компонент
	componentDidMount() { 
		this._ismounted = true;
	  }
	  
	
	
    animationStart =()=>{
        this.timer = setTimeout(() => {
            //если компонет не существует не вызываем сетСтате
			if(this._ismounted){
				this.setState({css:"blockFilter blockAnim"})
			}
		  }, this.props.counter)
    }

    componentWillMount(){
        this.setState({css: "blockFilterZero",})
        this.animationStart();

    }

    componentWillReceiveProps(){
        this.setState({css: "blockFilterZero",})
        this.animationStart();
    }

    render(){
        return (   
            <div className={this.props.forceHide?this.state.isVisible:"FilterBlock"}><div className={this.state.css} style={this.state.css==="blockFilter blockAnim"?{animation: "pulse "+this.props.delay+"s"}:null}>
                <div className="blockContent">{this.props.children}</div>
                </div>
            </div>)
    }
    componentWillUnmount(){
		clearTimeout(this.timer);
		this._ismounted = false;
    }

}
export default FilterBlock