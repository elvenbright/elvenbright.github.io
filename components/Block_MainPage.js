import React, { Fragment } from 'react';
import { Form } from 'antd';



class Block_MainPage extends React.PureComponent {
	state = {
		defaultText: 'some long text some long text some long text some long text some long text some long text some long text'
	}
	ref = React.createRef();

	myResize = () => {
	
		let block = this.ref.current;
		let text = this.state.defaultText;
		console.log('---works1?',block);
		console.log('---works2?',text);
		block.innerHTML = text;



		if (block.scrollHeight - block.offsetHeight > 1) {
			const wordArray = text.split(' ');
			let deletedWord = '';
			while (block.scrollHeight - block.offsetHeight > 1) {
				deletedWord = wordArray.pop();
				block.innerHTML = wordArray.join(' ');
			}
			wordArray.push(deletedWord);
			let txt1 = wordArray.join(' ');
			const textArray = [...text];
			block.innerHTML = txt1;
			while (block.scrollHeight - block.offsetHeight > 1) {
				textArray.pop();
				txt1 = textArray.join('');
				block.innerHTML = txt1;
			}
			const gra = textArray.splice(textArray.length - 5, 5).map((s, i, a) => `<span style='opacity: 0.${1 + (100 * (8 * (1 - (i / (a.length - 1)))))};'>${s}</span>`);
			txt1 = textArray.join('') + gra.join('');
			block.innerHTML = txt1;
		}
	};

	componentDidMount() {
		window.addEventListener('resize',this.myResize);
		this.myResize();
	};

	render() {
		return (
			<Form>
				<div>font Ie test</div>
				<div style={{lineHeight:'1em',maxHeight:'1em',wordBreak:'break-all'}} ref={this.ref} className={"Block_Opacity"}></div>
			</Form>
		);

	}

}



export default Block_MainPage;
