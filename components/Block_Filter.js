import React ,{Fragment} from 'react';
import { NavLink } from 'react-router-dom';
import {default as isoFetch} from 'isomorphic-fetch';
import './Block_Filter.scss';
import {Spiner} from '../primitive/Spiner';
import {connect} from "react-redux";
import {loadNews,loadHeroes,loadItems} from "../redux/AC";
import FilterBlock from "../primitive/FilterBlock"



class Block_Filter extends React.PureComponent {
	
	state = {
		render: "", //l-loading, n-news, h-heroes, i-items

		//delete
		test: [3,2,1],

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
			if(!reducer.news.isLoaded&&!reducer.news.loading){
				this.props.loadNews();
			}
			this.setState({render:"n"});
		}
		//heroes
		if(e==="h"){
			if(!reducer.heroes.isLoaded&&!reducer.heroes.loading){
				this.props.loadHeroes();
			}
			this.setState({render:"h"});
		}
		//items
		if(e==="i"){
			if(!reducer.items.isLoaded&&!reducer.items.loading){
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
	renderFilter = (i,r)=>{
		//console.log(r); reducer r.news r.items r.heroes
		
		let menu = null; //возвращаем наполнение
		
		let spinStatus = "spinner spinnerNot";
		let menuStatus = "menu menuLoadIn";

		//для спинера 
		let isNewsLoaded = false;
		let isHeroesLoaded = false;
		let isItemsLoaded = false;
		
		//news
		if(i==="n"){
			if(r.news.loading===true){

			
				spinStatus = "spinner spinnerLoadIn";

				menuStatus = "menu menuLoadOut";

			}
			else if(r.news.isLoaded===true){
				spinStatus = "spinner spinnerLoadOut";
				menuStatus = "menu menuLoadIn";

				menu = <div>Menu Filter News</div>
			}
		}
		//heroes
		if(i==="h"){

		}
		//items
		if(i==="i"){

		}
		
		return <Fragment>
			<div className={spinStatus}><Spiner/></div>
			<div className={menuStatus}>{menu}</div>
			
		</Fragment>
	}
	//delete this
	chn= ()=>{
		this.setState({test: [1,2,3]})
	}
	
  	render() {
		let counter = -500;
	
		let {renderContent,contentSwitch,state:{render},props:{reducer}} = this;
		return (
			<div className={"Block_Filter"}>
				<div className="top-logo"><img src="img/Logo2.png"/></div>
				{/* <hr/> */}
				<div className="menu-block">
					<div onClick={()=>contentSwitch("n")} className="btn">nКарты</div>
					<div onClick={()=>contentSwitch("h")} className="btn">hДепозиты</div>
					<div onClick={()=>contentSwitch("i")} className="btn">iПродукты</div>
				</div>
				<div className="filter">
				{this.renderFilter(render,reducer)}</div>
				<div className="content">
				<button onClick={this.chn}>change state</button>
					{render==="n"?
						(reducer.news.isLoaded===false
							?null
							:<div>
								{this.state.test.map((item,i)=>{
									counter+=500;
									
									return <FilterBlock clearTime counter={counter} key={i}>{item}</FilterBlock>
								})}
							</div>
						)
					:null}
				</div>

			</div>
		);

  	}

}



export default connect((state) => ({
	reducer: state.reducer
}),
{loadNews,loadHeroes,loadItems})(Block_Filter);
