import React, {PureComponent} from 'react';

export default class SvgArrow extends PureComponent {

    static defaultProps = {
		className:			"",
        width:              '15px',
        height:             '15px',
        strokeWidth:        2,
        // fillColor:          '#000',
        // fillColorInactive:  '#ff9700',
        // strokeColor:        '#000',
        viewBox:            '0 0 45 40',
		stroke: 'white',
		transform : "rotate(270)",
    };

    render() {
        return (
            <svg {...this.props}>
				<path d="M36.07 20.18l-29-20A1 1 0 0 0 5.5 1v40a1 1 0 0 0 1.57.82l29-20a1 1 0 0 0 0-1.64zM7.5 39.09V2.9L33.74 21 7.5 39.1z"/>
			</svg>
        )
    }
}
