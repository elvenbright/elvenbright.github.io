import React from 'react';
import './Block_Selected.scss';



class Block_Selected extends React.PureComponent {
	render() {
		
		return (
			<div className="Block_Selected">
				<div className="image">
					<div className="glass"></div>
					<div className="cont"><img src="img/logoItem.gif"/></div>
					<div className="cont"><div>Heroes</div></div>
				</div>
				<hr/>
			</div>
		)
	}
}
export default Block_Selected;