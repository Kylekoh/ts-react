import * as React from 'react';
import { Switch, BrowserRouter, Link, Route } from 'react-router-dom';
import GameMatcherClass from './GameMatcherClass';

const Games = () => {
	return (
		<BrowserRouter>
			<div>
				<Link to="/game/number-baseball">숫자야구</Link>
				&nbsp;
				<Link to="/game/rock-scissors-pater">가위바위보</Link>
				&nbsp;
				<Link to="/game/lotto-generator">로또생성기</Link>
				&nbsp;
				<Link to="/game/index">게임 매쳐</Link>
			</div>

			<div>
				<Switch>
					<Route
						exact
						path="/"
						render={(props) => <GameMatcher {...props} />}
					/>
					<Route
						path="/game/:name"
						render={(props) => <GameMatcher {...props} />}
					/>
				</Switch>
			</div>
		</BrowserRouter>
	);
};

export default Games;
