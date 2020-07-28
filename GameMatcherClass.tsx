import * as React from 'react';
import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import NumberBaseball from './NumberBaseballClass';
import RSP from './RSPClass';
import Lotto from './LottoClass';
import { RouteComponentProps, RouteChildrenProps } from 'react-router';

class GameMatcherClass extends Component<
	RouteComponentProps<{ name: string }>
> {
	render() {
		if (!this.props.match) {
			return <div>일치하는 게임이 없습니다.</div>;
		}
		let urlSearchParams = new URLSearchParams(
			this.props.location.search.slice(1)
		);
		console.log(urlSearchParams.get('page'));
		if (this.props.match.params.name === 'number-baseball') {
			return <NumberBaseball />;
		} else if (this.props.match.params.name === 'rock-scissors-paper') {
			return <RSP />;
		} else if (this.props.match.params.name === 'lotto-generator') {
			return <Lotto />;
		} else {
			return <div>일치하는 게임이 없습니다.</div>;
		}
	}
}

export default withRouter(GameMatcherClass);
