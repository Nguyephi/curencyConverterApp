import React from 'react';
import './App.css';
import { FormControl, InputGroup } from 'react-bootstrap';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			rates: {},
			countries: [],
			numInput: 0
		};
	}

	componentDidMount() {
		this.getData();
	}

	getData = async () => {
		const req = `http://data.fixer.io/api/latest?access_key=bfcc0308765848dee5861697e084d026`;
		const res = await fetch(req);
		const jsonData = await res.json();
		this.setState({
			rates: jsonData.rates,
			defaultRate: jsonData.rates.EUR / jsonData.rates.USD, //.88
			countries: Object.keys(jsonData.rates)
		});
	};

	handleInputChange = e => {
		this.setState({ numInput: e.target.value }, () =>
			this.convertNumInput(this.state.numInput)
		);
	};

	convertNumInput = num => {
		const convertValue = num / this.state.byUSDRate;
		return convertValue;
	};

	selectCountry = () => {
		return this.state.countries.map((country, idx) => {
			return (
				<option key={idx} value={country}>
					{country}
				</option>
			);
		});
	};

	defaultCountry = () => {
		return this.state.countries.map((country, idx) => {
			return (
				<option key={idx} value={country}>
					{country}
				</option>
			);
		});
	};

	render() {
		return (
			<div className='container'>
				<h1> Currency Converter</h1>
				<h3>Please select a default currency.</h3>
				<InputGroup className='mb-3'>
					<InputGroup.Prepend>
						<select>{this.defaultCountry()}</select>
					</InputGroup.Prepend>
				</InputGroup>
				<p>
					The value in the currency of choice will be converted to the default
					currency.
				</p>
				<InputGroup className='mb-3'>
					<InputGroup.Prepend>
						<select>{this.selectCountry()}</select>
					</InputGroup.Prepend>
					<FormControl
						type='number'
						aria-label='Default'
						aria-describedby='inputGroup-sizing-default'
						onChange={this.handleInputChange}
						value={this.state.numInput}
					/>
				</InputGroup>
				<p>{this.convertNumInput(this.state.numInput)}</p>
			</div>
		);
	}
}

export default App;
