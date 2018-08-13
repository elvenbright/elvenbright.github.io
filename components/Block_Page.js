import React from 'react';
import { NavLink } from 'react-router-dom';

class Block_Page extends React.PureComponent {

 
  	render() {

		return (
			<div className={"Block_Filter"}>
				<NavLink to="/" activeClassName="SActivated">Вернуться</NavLink>
			</div>
		);

  	}

}

export default Block_Page;
