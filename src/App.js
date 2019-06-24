import React from 'react';
import './App.css';
import { FormControl, InputGroup } from 'react-bootstrap';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			countries: [],
			numInput: '',
			isCountrySelected: 'Country:',
			changeParam: 'latest'
		};
	}

	componentDidMount() {
		this.getData();
		this.changeRatesToSelectedCurr();
	}

	getData = async () => {
		const { changeParam } = this.state;
		const req = `http://data.fixer.io/api/${changeParam}?access_key=bfcc0308765848dee5861697e084d026`;
		const res = await fetch(req);
		const jsonData = await res.json();
		this.setState({
			rates: jsonData.rates,
			countries: Object.keys(jsonData.rates)
		});
	};

	// getCurrencyName() {
	//   this.setState({
	//     changeParam: 'symbols'
	//   })
	// }
	//this api is for type of currency
	// http://data.fixer.io/api/symbols?access_key=bfcc0308765848dee5861697e084d026

	changeRatesToSelectedCurr = () => {
		return this.setState({
			defaultCurr: this.state.convertedCurrency / this.state.selectedCurrency
		});
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
			num / (this.state.convertedCurrency / this.state.selectedCurrency);
		if (convertValue === 0) {
			return convertValue.toFixed(2);
		} else if (convertValue < 0.009) {
			return convertValue.toFixed(7);
		}
		return convertValue.toFixed(2);
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
			<div className='appBackground'>
				<div className='container'>
					<div className='contentColor'>
						<h1 style={{ marginTop: '15px' }}> Currency Converter</h1>
						<h3>Please select a default currency.</h3>
						<div style={{ display: 'inline-flex' }}>
							<InputGroup className='mb-3'>
								<InputGroup.Prepend>
									<select
										style={{ height: '37px' }}
										value={this.state.selectedCountry}
										onChange={this.handleSelectedCurrency}
									>
										<option>{this.state.isCountrySelected}</option>
										{this.defaultCountryCurrency()}
									</select>
								</InputGroup.Prepend>
							</InputGroup>
						</div>
						<p>
							The value in the currency of choice will be converted to the
							default currency.
						</p>
						<div style={{ width: '30em', display: 'inline-flex' }}>
							<InputGroup className='mb-3'>
								<InputGroup.Prepend>
									<select
										value={this.state.selectConvertedCurrency}
										onChange={this.handleConvertedCurrency}
									>
										<option>{this.state.isCountrySelected}</option>
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
						</div>
						{this.convertNumInput(this.state.numInput) > 0 && (
							<p>{this.convertNumInput(this.state.numInput)}</p>
						)}
					</div>
				</div>
			</div>
		);
	}
}

export default App;
