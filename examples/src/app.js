/* eslint react/prop-types: 0 */

import React from 'react';
import ReactDOM from 'react-dom';
import Select from 'react-select';

import Contributors from './components/Contributors';
import CustomComponents from './components/CustomComponents';
import CustomRender from './components/CustomRender';
import Multiselect from './components/Multiselect';
import NumericSelect from './components/NumericSelect';
import Cities from './components/Cities';
import States from './components/States';

ReactDOM.render(
	<div>
		<Cities label="Cities" />
		<br/>
		<br/>
		<br/>
		<br/>
		<Multiselect label="Multiselect" />
		<br/>
		<br/>
		<br/>
		<br/>



		{/*
		<SelectedValuesField label="Option Creation (tags mode)" options={FLAVOURS} allowCreate hint="Enter a value that's NOT in the list, then hit return" />
		*/}
	</div>,
	document.getElementById('example')
);

// <States label="States" searchable />
//
// <Contributors label="Contributors (Async)" />
// <NumericSelect label="Numeric Values" />
// <CustomRender label="Custom Render Methods"/>
// <CustomComponents label="Custom Placeholder, Option and Value Components" />
