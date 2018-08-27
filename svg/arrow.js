import React, {PureComponent} from 'react';

export default class arrow extends PureComponent {

    static defaultProps = {
        width:              '12px',
        height:             '12px',
        strokeWidth:        2,
        fillColor:          '#000',
        fillColorInactive:  '#ff9700',
        strokeColor:        '#000',
        viewBox:            '0 0 12 12',
        preserveAspectRatio: 'xMidYMid meet',
    };

    render() {
        const {props: {className, width, height, viewBox, primary, secondary, tertiary, fill}} = this;

        return (
            <svg {...this.defaultProps}>
				<path d="M36.07 20.18l-29-20A1 1 0 0 0 5.5 1v40a1 1 0 0 0 1.57.82l29-20a1 1 0 0 0 0-1.64zM7.5 39.09V2.9L33.74 21 7.5 39.1z"/>
			</svg>
        )
    }
}
