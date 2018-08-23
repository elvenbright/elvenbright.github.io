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
		test: [1,2,3,4],
		test1: false,
		test2: false,
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
							<div>{reducer.news.data.appnews.newsitems[j].title}</div>
							
							<div dangerouslySetInnerHTML={{__html: reducer.news.data.appnews.newsitems[j].contents}} />
						
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
	
	//render engine
	some = () => {
		this.setState({
			test1:true,
			test2:false,
		});

	};
	some2 = () => {
		this.setState({
			test1:false,
			test2:true,
		});
	}
	out = () => {
		let n = []
		for(let l=0;l<6;l++){
			n.push(<div key={l} className="list-item" style={{"transitionDelay": `${ l * .05 }s` }}>{l}</div>)
		}
		return n;
	};
  	render() {
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
							:<div>}>
								{reducer.news.data.appnews.newsitems.map((item,i)=>{
									return <div key={i} style={{border:"1px solid white",color:"white", fontFamily: 'Flower'}}>
										<div>{item.title}</div>
										{/* <div dangerouslySetInnerHTML={{__html: item.contents}} /> */}
									</div>
								})}
							</div>
						)
					:null}
				</div>
			

              <button onClick={this.some}>start</button><button onClick={this.some2}>change</button>
			  <div>{this.state.test1&&<RTG transitionName="slide-up" 	transitionAppear={true}
												transitionEnterTimeout={1000}
												transitionLeaveTimeout={1000}
			  									transitionAppearTimeout={1000}>
                        {this.out()}
			  </RTG>}
			  {this.state.test2&&<RTG transitionName="slide-up" 	transitionAppear={true}
												transitionEnterTimeout={1000}
												transitionLeaveTimeout={1000}
			  									transitionAppearTimeout={1000}>
						{this.out()}
			  </RTG>}
			  
			  </div>
               
            	
				


			</div>
		);

  	}

}

//export default Block_Filter

export default connect((state) => ({
	reducer: state.reducer
}),
{loadNews,loadHeroes,loadItems})(Block_Filter);
