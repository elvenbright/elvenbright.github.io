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
		newsOutput: [], //полный массив данных
		heroesOutput: [],

		news:[], //отсортированный массив
		heroes:[],
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
			if(!reducer.heroes.isLoaded&&!reducer.heroes.loading&&!reducer.abilities.loading&&!reducer.abilities.isLoaded){
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
			if(reducer.news.isLoaded===true){
				let output = [];
				
				for(let j=0;j<reducer.news.data.appnews.newsitems.length;j++){
					output.push(
						<div key={j}>
							<div>{reducer.news.data.appnews.newsitems[j].title}</div>
							
							<div dangerouslySetInnerHTML={{__html: reducer.news.data.appnews.newsitems[j].contents}} />
						
						</div>
					)
				}
				this.setState({filterCont: output}) ;
			}
			
		}
		else if(render==="h"){
			if(reducer.heroes.loading===true||reducer.abilities.loading===true){
				return <div className="spinner"><Spiner/></div>
			}
			else if(reducer.heroes.isLoaded===true&&reducer.abilities.isLoaded===true){
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
	//рендер панели фильтр
	renderFilter = (i,r)=>{
		//console.log(r); reducer r.news r.items r.heroes
		
		let menu = null; //возвращаем наполнение
		
		let spinStatus = "spinner spinnerNot";
		let menuStatus = "menu menuLoadIn";

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
			if(r.heroes.loading===true||r.abilities.loading===true){

			
				spinStatus = "spinner spinnerLoadIn";

				menuStatus = "menu menuLoadOut";

			}
			else if(r.heroes.isLoaded===true&&r.abilities.isLoaded===true){
				spinStatus = "spinner spinnerLoadOut";
				menuStatus = "menu menuLoadIn";

				menu = <div>Menu Filter Heroes</div>
			}
		}
		//items
		if(i==="i"){
			if(r.items.loading===true){

			
				spinStatus = "spinner spinnerLoadIn";

				menuStatus = "menu menuLoadOut";

			}
			else if(r.items.isLoaded===true){
				spinStatus = "spinner spinnerLoadOut";
				menuStatus = "menu menuLoadIn";

				menu = <div>Menu Filter Items</div>
			}
		}
		
		return <Fragment>
			<div className={spinStatus}><Spiner/></div>
			<div key={Math.random()}  className={menuStatus}>{menu}</div>
		</Fragment>
	}
	//фильтруем контент в зависимости от настроек
	mainFilter=()=>{
		let {state:{heroesOutput,render}} = this;
		if(render==="h"){
			let h=[];
			for(let q=0;q<heroesOutput.length;q++){
				//console.log(heroesOutput[q]);
				h.push(
					<div key={q}>
						<div>{heroesOutput[q].name}</div>
						<div>{heroesOutput[q].bio}</div>					
					</div>
				)
			}
			this.setState({heroes:h})
		}
	}
	//преобразуем данные
	static getDerivedStateFromProps(props,state){
		let newsOutput=[];
		let heroesOutput=[];
		if(props.reducer.news.isLoaded===true){
			for(let j=0;j<props.reducer.news.data.appnews.newsitems.length;j++){
				newsOutput.push(
					<div key={j}>
						<div>{props.reducer.news.data.appnews.newsitems[j].title}</div>
						
						<div dangerouslySetInnerHTML={{__html: props.reducer.news.data.appnews.newsitems[j].contents}} />
					
					</div>
				)
			}
		}
		
		if(props.reducer.heroes.isLoaded===true&&props.reducer.abilities.isLoaded===true){
			let keys=[];
			for (let n in props.reducer.heroes.data) {
				//console.log(n);
				keys.push(n);
			}
			for(let p=0;p<keys.length;p++){
				heroesOutput.push(props.reducer.heroes.data[keys[p]]);
				// heroesOutput.push(
				// 	<div key={j}>
				// 		<div>{props.reducer.news.data.appnews.newsitems[j].title}</div>
						
				// 		<div dangerouslySetInnerHTML={{__html: props.reducer.news.data.appnews.newsitems[j].contents}} />
					
				// 	</div>
				// )
			}
		}
		/*
		if(props.reducer.news.isLoaded===true){
			for(let j=0;j<props.reducer.news.data.appnews.newsitems.length;j++){
				newsOutput.push(
					<div key={j}>
						<div>{props.reducer.news.data.appnews.newsitems[j].title}</div>
						
						<div dangerouslySetInnerHTML={{__html: props.reducer.news.data.appnews.newsitems[j].contents}} />
					
					</div>
				)
			}
		}
		*/
		return {
			newsOutput: newsOutput,
			heroesOutput: heroesOutput,
		}
	}
  	render() {
		let counter = -500;
		let {renderContent,contentSwitch,state:{render,heroes},props:{reducer}} = this;
	
		this.mainFilter();
		return (
			<div className={"Block_Filter"}>
				<div className="top-logo"><img src="img/Logo2.png"/></div>
				<hr/>
				<div className="menu-block">
					<div onClick={()=>contentSwitch("n")} className="btn">News</div>
					<div onClick={()=>contentSwitch("h")} className="btn">Heroes</div>
					<div onClick={()=>contentSwitch("i")} className="btn">Items</div>
				</div>
				<div className="filter">
				{this.renderFilter(render,reducer)}</div>
				<div className="content">
					{/* {render==="n"?
						(
								this.state.newsOutput.map((item,i)=>{
									counter+=500;
									
									return <FilterBlock clearTime counter={counter} key={i}>{item}</FilterBlock>
								})
							
						)
					:null} */}
					{render==="h"?
						(
								this.state.heroes.map((item,i)=>{
									counter+=500;
									
									return <FilterBlock clearTime counter={counter} key={i}>{item}</FilterBlock>
								})
							
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
