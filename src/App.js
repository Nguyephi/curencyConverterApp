import React from 'react';
import './App.css';
import { FormControl, InputGroup } from 'react-bootstrap';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			countries: [],
			numInput: 0
		};
	}

	componentDidMount() {
		this.getData();
		this.changeRatesToSelectedCurr();
	}

	getData = async () => {
		const req = `http://data.fixer.io/api/latest?access_key=bfcc0308765848dee5861697e084d026`;
		const res = await fetch(req);
		const jsonData = await res.json();
		this.setState({
			rates: jsonData.rates,
			byUSDRate: jsonData.rates.EUR / jsonData.rates.USD, //hardcode for USD default
			countries: Object.keys(jsonData.rates)
		});
	};

	changeRatesToSelectedCurr = () => {
		return this.setState(
			{
				defaultCurr: this.state.convertedCurrency / this.state.selectedCurrency
			},
			() => console.log('superman', this.state.defaultCurr)
		);
	};

	handleInputChange = e => {
		this.setState({ numInput: e.target.value }, () =>
			this.convertNumInput(this.state.numInput)
		);
	};

	handleSelectedCurrency = e => {
		this.setState(
			{
				selectedCountry: e.target.value
			},
			() => this.setSelectedCurrency()
		);
	};

	setSelectedCurrency = () => {
		this.setState({
			selectedCurrency: this.state.rates[this.state.selectedCountry]
		});
	};

	handleConvertedCurrency = e => {
		this.setState(
			{
				convertedCountry: e.target.value
			},
			() => this.setConvertedCurrency()
		);
	};

	setConvertedCurrency = () => {
		this.setState({
			convertedCurrency: this.state.rates[this.state.convertedCountry]
		});
	};

	convertNumInput = num => {
		const convertValue =
			num / (this.state.selectedCurrency / this.state.convertedCurrency);
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
							value={this.state.selectedCountry}
							onChange={this.handleSelectedCurrency}
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
