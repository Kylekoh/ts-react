import * as React from 'react';
import { Component } from 'react';

const rspCoords = {
	바위: '0',
	가위: '-142px',
	보: '-284px',
} as const;

const scores = {
	가위: 1,
	바위: 0,
	보: -1,
} as const;

type ImgCoords = typeof rspCoords[keyof typeof rspCoords];

const computerChoice = (imgCoords: ImgCoords) => {
	return (Object.keys(rspCoords) as ['바위', '가위', '보']).find((k) => {
		return rspCoords[k] === imgCoords;
	})!;
};

interface State {
	result: string;
	imgCoords: ImgCoords;
	score: number;
}

class RSP extends Component<{}, State> {
	state: State = {
		result: '',
		imgCoords: rspCoords.바위,
		score: 0,
	};

	interval: number | null = null;

	componentDidMount() {
		this.interval = window.setInterval(this.changeHand, 100);
	}

	componentWillMount() {
		clearInterval(this.interval!);
	}

	changeHand = () => {
		const { imgCoords } = this.state;
		if (imgCoords === rspCoords.바위) {
			this.setState({
				imgCoords: rspCoords.가위,
			});
		} else if (imgCoords === rspCoords.가위) {
			this.setState({
				imgCoords: rspCoords.보,
			});
		} else if (imgCoords === rspCoords.보) {
			this.setState({
				imgCoords: rspCoords.바위,
			});
		}
	};

	onClickBtn = (choice: keyof typeof rspCoords) => () => {
		const { imgCoords } = this.state;
		clearInterval(this.interval!);
		const myScore = scores[choice];
		const cpuScore = scores[computerChoice(imgCoords)];
		const diff = myScore - cpuScore;
		if (diff === 0) {
			this.setState({
				result: '비겼습니다!',
			});
		} else if ([-1, 2].includes(diff)) {
			this.setState((prevState) => {
				return {
					result: '이겼습니다!',
					score: prevState.score + 1,
				};
			});
		} else {
			this.setState((prevState) => {
				return {
					result: '이겼습니다!',
					score: prevState.score - 1,
				};
			});
		}
		setTimeout(() => {
			this.interval = window.setInterval(this.changeHand, 100);
		}, 1000);
	};
}

export default RSP;
