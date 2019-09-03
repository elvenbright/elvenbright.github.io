import React,{Fragment} from 'react';


class AntdFormInput extends React.PureComponent {
    
   
  	render() {
          console.log('---this.props',this.props);
		return (<div className={'AntdFormInput'}>
            <input onChange={this.props.onChange}  value={this.props.value===undefined?"":this.props.value}/>

        </div>);

  	}

}

export default AntdFormInput;
