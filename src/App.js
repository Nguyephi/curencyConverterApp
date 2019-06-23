import React from 'react';
import './App.css';
import { FormControl, InputGroup } from 'react-bootstrap';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			rates: {},
			countries: []
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
			byUSDRate: jsonData.rates.EUR / jsonData.rates.USD, //.88
			countries: Object.keys(jsonData.rates)
		});
	};

	selectCountry = () => {
		this.state.countries.map((country, idx) => {
			return (
				<option key={idx} value={country}>
					{country}
				</option>
			);
		});
		console.log('object');
	};

	render() {
		return (
			<div className='container'>
				<InputGroup className='mb-3'>
					<InputGroup.Prepend>
						<select>{this.selectCountry()}</select>
					</InputGroup.Prepend>
					<FormControl
						type='number'
						aria-label='Default'
						aria-describedby='inputGroup-sizing-default'
					/>
				</InputGroup>
			</div>
		);
	}
}

export default App;
