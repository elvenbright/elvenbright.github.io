import React from 'react';
import './FilterBlock.scss';




class FilterBlock extends React.PureComponent {

    state={
        css: "blockFilterZero",
    }

    timer = null;
   
    animationStart =()=>{
        this.timer = setTimeout(() => {
			this.setState({css:"blockFilter blockAnim"})
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
        console.log(this.props.counter);
        return (   
            <div className={this.props.forceHide?this.state.isVisible:"FilterBlock"}><div className={this.state.css} style={this.state.css==="blockFilter blockAnim"?{animation: "pulse "+this.props.delay+"s"}:null}>
                <div className="blockContent">{this.props.children}</div>
                </div>
            </div>)
    }
    componentWillUnmount(){
        clearTimeout(this.timer);
    }

}
export default FilterBlock