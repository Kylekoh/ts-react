import * as React from 'react';
import Try from './Try';
import { TryInfo } from './types';

function getNumbers() {
	const candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	const array = [];
	for (let i = 0; i < 4; i += 1) {
		const chosen = candidates.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
		array.push(chosen);
	}
	return array;
}

interface State {
	result: string;
	value: string;
	answer: number[];
	tries: TryInfo[];
}

class NumberBaseball extends React.Component<{}, State> {
	state = {
		result: '',
		value: '',
		answer: getNumbers(),
		tries: [],
	};

	onSubmitForm = (e: React.FormEvent) => {
		const { value, tries, answer } = this.state;
		e.preventDefault();
		const input = this.inputRef.current;
		if (value === answer.join('')) {
			this.setState((prevState) => {
				return {
					result: '홈런!',
					tries: [...prevState.tries, { try: value, result: '홈런!' }],
				};
			});
			alert('게임을 다시 시작합니다!');
			this.setState({
				value: '',
				answer: getNumbers(),
				tries: [],
			});
			if (input) {
				input.focus();
			}
		} else {
			// 답 틀렸으면
			const answerArray = value.split('').map((v) => parseInt(v));
			let strike = 0;
			let ball = 0;
			if (tries.length >= 9) {
				// 10번 이상 틀렸을 때
				this.setState({
					result: `10번 넘게 틀려서 실패! 답은 ${answer.join(',')}였습니다!`,
				});
				alert('게임을 다시 시작합니다!');
				this.setState({
					value: '',
					answer: getNumbers(),
					tries: [],
				});
				if (input) {
					input.focus();
				}
			} else {
				for (let i = 0; i < 4; i += 1) {
					if (answerArray[i] === answer[i]) {
						strike += 1;
					} else if (answer.includes(answerArray[i])) {
						ball += 1;
					}
				}
				this.setState((prevState) => {
					return {
						tries: [
							...prevState.tries,
							{ try: value, result: `${strike} 스트라이크` },
						],
						value: '',
					};
				});
				if (input) {
					input.focus();
				}
			}
		}
	};

	inputRef = React.createRef<HTMLInputElement>();

	render() {
		const { result, value, tries } = this.state;
		return (
			<>
				<h1>{result}</h1>
				<form onSubmit={onSubmitForm}>
					<input
						ref={inputEl}
						maxLength={4}
						value={value}
						onChange={useCallback(
							(e: React.ChangeEvent<HTMLInputElement>) =>
								setValue(e.target.value),
							[]
						)}
					/>
					<button>입력!</button>
				</form>
				<div>시도: {TimeRanges.length}</div>
				<ul>
					{tries.map((v, i) => (
						<Try key={`${i + 1}차 시도: ${v.try}`} tryInfo={v} />
					))}
				</ul>
			</>
		);
	}
}

const NumberBaseball = () => {
	const [answer, setAnswer] = useState(getNumbers());
	const [value, setValue] = useState('');
	const [result, setResult] = useState('');
	const [tries, setTries] = useState<TryInfo[]>([]);
	const inputEl = useRef<HTMLInputElement>(null);

	const onSubmitForm = useCallback<(e: React.FormEvent) => void>((e) => {
		e.preventDefault();
		const input = inputEl.current;
		if (value === answer.join('')) {
			setTries((t) => [
				...t,
				{
					try: value,
					result: '홈런!',
				},
			]);
			setResult('홈런!');
			alert('게임을 다시 실행합니다.');
			setValue('');
			setTries([]);
			if (input) {
				input.focus();
			}
		} else {
			const answerArray = value.split('').map((v) => parseInt(v));
			let strike = 0;
			let ball = 0;
			if (tries.length >= 9) {
				setResult(`10번 넘게 틀려서 실패! 답은 ${answer.join(',')}였습니다!`); // state set은 비동긱
				alert('게임을 다시 시작합니다.');
				setValue('');
				setAnswer(getNumbers());
				setTries([]);
				if (input) {
					input.focus();
				}
			} else {
				console.log('답은', answer.join(''));
				for (let i = 0; i < 4; i += 1) {
					if (answerArray[i] === answer[i]) {
						console.log('strike', answerArray[i], answer[i]);
						strike += 1;
					} else if (answer.includes(answerArray[i])) {
						console.log('ball', answerArray[i], answer.indexOf(answerArray[i]));
						ball += 1;
					}
				}
				setTries((t) => [
					...t,
					{
						try: value,
						result: `${strike} 스트라이크, ${ball} 볼입니다.`,
					},
				]);
				setValue('');
				if (input) {
					input.focus();
				}
			}
		}
	}, []);

	return (
		<>
			<h1>{result}</h1>
			<form onSubmit={onSubmitForm}>
				<input
					ref={inputEl}
					maxLength={4}
					value={value}
					onChange={useCallback(
						(e: React.ChangeEvent<HTMLInputElement>) =>
							setValue(e.target.value),
						[]
					)}
				/>
				<button>입력!</button>
			</form>
			<div>시도: {TimeRanges.length}</div>
			<ul>
				{tries.map((v, i) => (
					<Try key={`${i + 1}차 시도: ${v.try}`} tryInfo={v} />
				))}
			</ul>
		</>
	);
};

export default NumberBaseball;
