import React from 'react';
import { NavLink } from 'react-router-dom';
import RTG from 'react-addons-css-transition-group';
import {default as isoFetch} from 'isomorphic-fetch';
import './Block_Filter.scss';
import {Spiner} from '../primitive/Spiner';
import {connect} from "react-redux";
import {loadNews,loadHeroes,loadItems} from "../redux/AC";



class Block_Filter extends React.PureComponent {
	
	state = {
		render: "", //l-loading, n-news, h-heroes, i-items
	};
	run = async () => {
		console.log('123s');
		
		/*
		let answer;
			try {
				answer = await isoFetch('https://jsonplaceholder.typicode.com/posts', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Accept': 'application/json',
					},
					body: JSON.stringify({
						title: 'foo',
						body: 'bar',
						userId: 1
					  })
				});
				
			} catch (e) {
				console.log('error', e);
			}
			answer.json().then( data => {
				console.log(data);
			});
		*/
		/*
		isoFetch('https://jsonplaceholder.typicode.com/posts', {
			method: 'POST',
			body: JSON.stringify({
				title: 'foo',
				body: 'bar',
				userId: 1
				}),
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			}
		})
		.then(response => response.json())
		.then(json => console.log(json))
		*/
	};
	
	//react transitiongroup
	state = {
		arr:[],
	}
	add = () => {
		console.log('hi');
		let a = [...this.state.arr];
		a.push('hello');
		this.setState({arr:a});
	};
	del = () => {
		let n = [...this.state.arr];
		n.pop();
		console.log('wtf',n);
		this.setState({arr:n});
	};
	contentSwitch = (e) => {
		let {props:{reducer}} = this;
		//news
		if(e==="n"){
			if(!reducer.news.isLoaded){
				this.props.loadNews();
			}
			this.setState({render:"n"});
		}
		//heroes
		if(e==="h"){
			if(!reducer.heroes.isLoaded){
				this.props.loadHeroes();
			}
			this.setState({render:"h"});
		}
		//items
		if(e==="i"){
			if(!reducer.items.isLoaded){
				this.props.loadItems();
			}
			this.setState({render:"i"});
		}
	};
	renderContent = () => {
		let {state:{render},props:{reducer}} = this;
		if(render==="n"){	
			if(reducer.news.loading===true){
				return <div className="spinner"><Spiner/></div>
			}
			else if(reducer.news.isLoaded===true){
				let output = [];
				
				for(let j=0;j<reducer.news.data.appnews.newsitems.length;j++){
					output.push(
						<div key={j}>
						<TransitionGroup>
						<CSSTransition  transitionName="example" transitionEnterTimeout={700} transitionLeaveTimeout={700}>
							<div>{reducer.news.data.appnews.newsitems[j].title}</div>
							
							<div dangerouslySetInnerHTML={{__html: reducer.news.data.appnews.newsitems[j].contents}} />
						</CSSTransition >
						</TransitionGroup>
						</div>
					)
				}
				return output;
			}
			
		}
		else if(render==="h"){
			if(reducer.heroes.loading===true){
				return <div className="spinner"><Spiner/></div>
			}
			else if(reducer.heroes.isLoaded===true){
				return <div>Render Heroes</div>
			}
		}
		else if(render==="i"){
			if(reducer.items.loading===true){
				return <div className="spinner"><Spiner/></div>
			}
			else if(reducer.items.isLoaded===true){
				return <div>Render Items</div>
			}
			
		}
		else{
			return <div></div>
		}
	};
	getItems() {
        return [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
    }
  	render() {
		const items = this.getItems();
		let {renderContent,contentSwitch,state:{render},props:{reducer}} = this;
		return (
			<div className={"Block_Filter"}>
				<div className="top-logo"><img src="img/Logo2.png"/></div>
				<hr/>
				<div className="menu-block">
					<div onClick={()=>contentSwitch("n")} className="btn">News</div>
					<div onClick={()=>contentSwitch("h")} className="btn">Heroes</div>
					<div onClick={()=>contentSwitch("i")} className="btn">Items</div>
				</div>
				<div className="content">
					{render==="n"?
						(reducer.news.isLoaded===false
							?<div className="spinner"><Spiner/></div>
							:<RTG transitionName="example" transitionEnterTimeout={700} transitionLeaveTimeout={700}>
								{reducer.news.data.appnews.newsitems.map((item,i)=>{
									return <div key={i} style={{border:"1px solid white",color:"white", fontFamily: 'Flower'}}>
										<div>{item.title}</div>
										{/* <div dangerouslySetInnerHTML={{__html: item.contents}} /> */}
									</div>
								})}
							</RTG>
						)
					:null}
				</div>
			

              
                    <RTG transitionName="slide-up" transitionAppear={true}>
                        {items.map((item, i) => {
                            return <div key={i} className="list-item" style={{"transitionDelay": `${ i * .05 }s` }}>{item}</div>;
                        })}
                    </RTG>
               
            	
				


			</div>
		);

  	}

}

//export default Block_Filter

export default connect((state) => ({
	reducer: state.reducer
}),
{loadNews,loadHeroes,loadItems})(Block_Filter);
