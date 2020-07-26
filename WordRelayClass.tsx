import * as React from 'react';
import { Component, createRef } from 'react';

interface State {
	word: string;
	value: string;
	result: string;
}

class WordRelay extends Component<{}, State> {
	state = {
		word: '제로초',
		value: '',
		result: '',
	};

	onSubmitForm = (e: React.FormEvent) => {
		e.preventDefault();
		const input = this.onRefInput.current;
		if (this.state.word[this.state.word.length - 1] === this.state.value[0]) {
			this.setState({
				result: '딩동댕',
				word: this.state.value,
				value: '',
			});
			if (input) {
				input.focus();
			}
		} else {
			this.setState({
				result: '땡',
				value: '',
			});
			if (input) {
				input.focus();
			}
		}
	};

	onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({ value: e.currentTarget.value });
	};

	onRefInput = createRef<HTMLInputElement>();

	render() {
		return (
			<>
				<div>{this.state.word}</div>
				<form onSubmit={this.onSubmitForm}>
					<input
						ref={this.onRefInput}
						value={this.state.value}
						onChange={this.onChangeInput}
					/>
					<button>클릭!</button>
				</form>
				<div>{this.state.result}</div>
			</>
		);
	}
}

export default WordRelay;

// import { useState, useCallback, useRef } from 'react';

// const WordRelay = () => {
// 	const [word, setWord] = useState('제로초');
// 	const [value, setValue] = useState('');
// 	const [result, setResult] = useState('');
// 	const inputEl = useRef<HTMLInputElement>(null);

// 	const onSubmitForm = useCallback<(e: React.FormEvent) => void>(
// 		(e) => {
// 			e.preventDefault();
// 			const input = inputEl.current;
// 			if (word[word.length - 1] === value[0]) {
// 				setResult('딩동댕');
// 				setWord(value);
// 				setValue('');
// 				if (input) {
// 					input.focus();
// 				}
// 			} else {
// 				setResult('땡');
// 				setValue('');
// 				if (input) {
// 					input.focus();
// 				}
// 			}
// 		},
// 		[value]
// 	);

// 	const onChange = useCallback<
// 		(e: React.ChangeEvent<HTMLInputElement>) => void
// 	>((e) => setValue(e.currentTarget.value), []);

// 	return (
// 		<>
// 			<div>{word}</div>
// 			<form onSubmit={onSubmitForm}>
// 				<input ref={inputEl} value={value} onChange={onChange} />
// 				<button>입력!</button>
// 			</form>
// 			<div>{result}</div>
// 		</>
// 	);
// };

// export default WordRelay;
