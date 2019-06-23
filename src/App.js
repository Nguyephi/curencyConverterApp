import React from 'react';
import './App.css';
import { FormControl, InputGroup } from 'react-bootstrap';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			rates: {},
			countries: [],
			numInput: 0,
			defaultCurrency: ''
		};
	}

	componentDidMount() {
		this.getData();
	}

	getData = async () => {
		const req = `http://data.fixer.io/api/latest?access_key=bfcc0308765848dee5861697e084d026`;
		const res = await fetch(req);
		const jsonData = await res.json();
		this.setState(
			{
				rates: jsonData.rates,
				byUSDRate: jsonData.rates.EUR / jsonData.rates.USD, //hardcode for USD default
				countries: Object.keys(jsonData.rates)
			},
			() => console.log('what is dafualt now', this.state.rates)
		);
	};

	handleInputChange = e => {
		this.setState({ numInput: e.target.value }, () =>
			this.convertNumInput(this.state.numInput)
		);
	};

	handleDefaultCurrency = e => {
		this.setState({
			selectDefaultCountry: e.target.value
		});
	};

	handleConvertedCurrency = e => {
		this.setState({
			selectConvertedCountry: e.target.value
		});
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

	defaultCountryCurrency = () => {
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
						<select
							value={this.state.selectDefaultCountry}
							onChange={this.handleDefaultCurrency}
						>
							{this.defaultCountryCurrency()}
						</select>
					</InputGroup.Prepend>
				</InputGroup>
				<p>
					The value in the currency of choice will be converted to the default
					currency.
				</p>
				<InputGroup className='mb-3'>
					<InputGroup.Prepend>
						<select
							value={this.state.selectConvertedCurrency}
							onChange={this.handleConvertedCurrency}
						>
							{this.selectCountry()}
						</select>
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
