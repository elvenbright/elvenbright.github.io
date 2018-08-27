import React ,{Fragment} from 'react';
import { NavLink } from 'react-router-dom';
import {default as isoFetch} from 'isomorphic-fetch';
import './Block_Filter.scss';
import {Spiner} from '../primitive/Spiner';
import {connect} from "react-redux";
import {loadNews,loadHeroes,loadItems} from "../redux/AC";
import FilterBlock from "../primitive/FilterBlock"
import FilterButton from "../primitive/FilterButton"
import { createClient } from 'http';



class Block_Filter extends React.PureComponent {
	
	state = {
		render: "", //l-loading, n-news, h-heroes, i-items

		newsOutput: [], //полный массив данных
		heroesOutput: [],
		itemsOutput: [],

		selectedBtn2level: "",

		//filter news
		News1: false,
		News2: false,

	};

	forceState = {
		isBlockMathRand: false,
		btnClickedType: "",
	
	}

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


	//консоль лог сработает сразу
	// abc = () => {
	// 	fetch('/vk.com').then((res) => console.log(res))
	// 	console.log('сразу');
	// }	

	//консоль лог сработает после ответа
	// def = async () => {
	// 	let abc = await fetch('/vk.com');
	// 	abc.json().then( data => {
	// 	console.log(data);
	// 	});
	// 	console.log('сработает не сразу',abc);
	// }
	
	contentSwitch = (e) => {
		let {props:{reducer}} = this;
		//news
		if(e==="n"){
			if(!reducer.news.isLoaded&&!reducer.news.loading){
				this.props.loadNews();
			}
			this.setState({render:"n"});
			this.forceState.isBlockMathRand=false;
			
		}
		//heroes
		if(e==="h"){
			if(!reducer.heroes.isLoaded&&!reducer.heroes.loading&&!reducer.abilities.loading&&!reducer.abilities.isLoaded){
				this.props.loadHeroes();
			}
			this.setState({render:"h"});
			this.forceState.isBlockMathRand=false;
		
		}
		//items
		if(e==="i"){
			if(!reducer.items.isLoaded&&!reducer.items.loading){
				this.props.loadItems();
			}
			this.setState({render:"i"});
			this.forceState.isBlockMathRand=false;
	
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
		let isInMenu = false;
		
		let spinStatus = "spinner spinnerNot";
		let menuStatus = "menu menuLoadIn";
		
		//news
		if(i==="n"){
			if(r.news.loading===true){

			
				spinStatus = "spinner spinnerLoadIn";

				menuStatus = "menu menuLoadOut";

			}
			else if(r.news.isLoaded===true){
				this.forceState.btnClickedType="n";
				spinStatus = "spinner spinnerLoadOut";
				menuStatus = "menu menuLoadIn";

				menu = <FilterButton status={"n"}
					btn1={()=>{ 
						this.forceState.isBlockMathRand=true;
						this.filter("News1")}} 
					btn2={()=>{ 
						this.forceState.isBlockMathRand=true;
						this.filter("News2")}}
					/>
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
			{
				this.forceState.isBlockMathRand||this.forceState.btnClickedType===this.state.render?<div className={menuStatus}>{menu}</div>:<div key={Math.random()}  className={menuStatus}>{menu}</div>
			}
		</Fragment>
	}
	//сам фильтр
	//Управление
	filter = (e) =>{
		if(e==="News1"){
			this.setState({
				News1: true,
				News2: false,
			})
		}
		if(e==="News2"){
			this.setState({
				News1: false,
				News2: true,
			})
		}
		
	}
	//фильтруем контент в зависимости от настроек
	//пушим только те настройки которые соответсвуют фильтру
	//ФИЛЬТРУЕМ ЗДЕСЬ!
	mainFilter=()=>{
		let {state:{newsOutput,heroesOutput,itemsOutput,render,News1,News2}} = this;
		if(render==="n"){
			let n=[];
			if(News1){
				for(let q=0;q<newsOutput.length;q++){
					n.push(
						<div key={q}>
							<div>{newsOutput[q].title}</div>
							<div dangerouslySetInnerHTML={{__html: newsOutput[q].contents}} />
						</div>
					)
				}
			}
			else if(News2){
				for(let q=newsOutput.length-1;q>=0;q--){
					console.log('123');
					n.push(
						<div key={q}>
							<div>{newsOutput[q].title}</div>
							<div dangerouslySetInnerHTML={{__html: newsOutput[q].contents}} />
						</div>
					)
				}
			}
			
			return n;
		}
		if(render==="h"){
			let h=[];
			for(let q=0;q<heroesOutput.length;q++){
				h.push(
					<div key={q}>
						<div>{heroesOutput[q].name}</div>
						<div><img src={"../img/heroes/"+heroesOutput[q].name+".png"}/></div>
						<div>{heroesOutput[q].bio}</div>					
					</div>
				)
			}
			return h;
		}
		if(render==="i"){
			let i=[];
			for(let q=0;q<itemsOutput.length;q++){
				if(
					itemsOutput[q].dname==="DOTA_Tooltip_Ability_item_pocket_roshan"||
					itemsOutput[q].dname==="DOTA_Tooltip_Ability_item_pocket_tower"||
					itemsOutput[q].dname==="DOTA_Tooltip_Ability_item_super_blink"||
					itemsOutput[q].dname==="DOTA_Tooltip_Ability_item_mutation_tombstone"||
					itemsOutput[q].dname==="River Vial: Blood"||
					itemsOutput[q].dname==="River Vial: Potion"||
					itemsOutput[q].dname==="River Vial: Electrified"||
					itemsOutput[q].dname==="River Vial: Oil"||
					itemsOutput[q].dname==="River Vial: Slime"||
					itemsOutput[q].dname==="River Vial: Dry"||
					itemsOutput[q].dname==="River Vial: Chrome"||
					itemsOutput[q].dname==="Recipe: Iron Talon1"||
					itemsOutput[q].dname==="Iron Talon"||
					itemsOutput[q].dname==="Observer and Sentry Wards"||
					itemsOutput[q].dname==="Tango (Shared)"||
					itemsOutput[q].dname==="Cheese"||
					itemsOutput[q].dname==="Aegis of the Immortal"||
					itemsOutput[q].dname==="DOTA_Tooltip_Ability_item_trident"||
					itemsOutput[q].dname==="DOTA_Tooltip_Ability_item_combo_breaker"||
					itemsOutput[q].dname==="Refresher Shard"
				){

					continue;
				}
				i.push(
					<div key={q}>
						<div>{itemsOutput[q].dname}</div>
						<div><img src={"../img/items/"+itemsOutput[q].img.slice(0, -2)}/></div>
						<div dangerouslySetInnerHTML={{__html: itemsOutput[q].attrib}} />
						<div>{itemsOutput[q].cost}</div>
					</div>
				)
			}
			return i;
		}

	}
	//преобразуем данные
	static getDerivedStateFromProps(props,state){
		let newsOutput=[];
		let heroesOutput=[];
		let itemsOutput=[];
		if(props.reducer.news.isLoaded===true){
			for(let j=0;j<props.reducer.news.data.appnews.newsitems.length;j++){
				newsOutput.push(props.reducer.news.data.appnews.newsitems[j])
			}
		}
		
		if(props.reducer.heroes.isLoaded===true&&props.reducer.abilities.isLoaded===true){
			let keys=[];
			for (let n in props.reducer.heroes.data) {
				keys.push(n);
			}
			for(let p=0;p<keys.length;p++){
				heroesOutput.push(props.reducer.heroes.data[keys[p]]);
			}
		}
		
		if(props.reducer.items.isLoaded===true){
			let keys=[];
			for (let n in props.reducer.items.data.itemdata) {
				keys.push(n);
			}
			for(let p=0;p<keys.length;p++){
				itemsOutput.push(props.reducer.items.data.itemdata[keys[p]]);
			}
		}
		
		return {
			newsOutput: newsOutput,
			heroesOutput: heroesOutput,
			itemsOutput: itemsOutput,
		}
	}
  	render() {
		let counter = -500;
		let minus = 500;
		let delay = 1.8;
		let {renderContent,contentSwitch,state:{render,heroes},props:{reducer}} = this;
		
		let n = this.mainFilter();
		let h = this.mainFilter();
		let i = this.mainFilter();
		return (
			<div className={"Block_Filter"}>
				<div className="top-logo"><img src="img/Logo2.png"/></div>
				{/* <hr/> */}
				<div className="menu-block">
					<div onClick={()=>contentSwitch("n")} className={render==="n"?"btn btnSelected":"btn"}>News</div>
					<div onClick={()=>contentSwitch("h")} className={render==="h"?"btn btnSelected":"btn"}>Heroes</div>
					<div onClick={()=>contentSwitch("i")} className={render==="i"?"btn btnSelected":"btn"}>Items</div>
				</div>
				<div className="filter"><span>sort by</span>
				{this.renderFilter(render,reducer)}</div>
				<div className="content">
					{render==="n"?
						(
								n.map((item,i)=>{
									counter=counter+minus;
									minus=minus/1.1;
									delay=delay/1.1;
									return <FilterBlock delay={delay} counter={counter} key={i}>{item}</FilterBlock>
								})
							
						)
					:null}
					{render==="h"?
						(
								h.map((item,i)=>{
									counter=counter+minus;
									minus=minus/1.1;
									delay=delay/1.1;
									return <FilterBlock delay={delay}  counter={counter} key={i}>{item}</FilterBlock>
								})
							
						)
					:null}
					{render==="i"?
						(
								i.map((item,i)=>{
									counter=counter+minus;
									minus=minus/1.1;
									delay=delay/1.1;
									return <FilterBlock delay={delay}  counter={counter} key={i}>{item}</FilterBlock>
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
