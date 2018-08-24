import React from 'react';
import './FilterBlock.scss';




class FilterBlock extends React.PureComponent {

    state={
        css: "blockFilterZero",
    }

    timer = null;

	//warning fix
	componentDidMount() { 
		this._ismounted = true;
	  }
	  
	
	
    animationStart =()=>{
        this.timer = setTimeout(() => {
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