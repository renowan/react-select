require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* eslint react/prop-types: 0 */

'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _componentsContributors = require('./components/Contributors');

var _componentsContributors2 = _interopRequireDefault(_componentsContributors);

var _componentsCustomComponents = require('./components/CustomComponents');

var _componentsCustomComponents2 = _interopRequireDefault(_componentsCustomComponents);

var _componentsCustomRender = require('./components/CustomRender');

var _componentsCustomRender2 = _interopRequireDefault(_componentsCustomRender);

var _componentsMultiselect = require('./components/Multiselect');

var _componentsMultiselect2 = _interopRequireDefault(_componentsMultiselect);

var _componentsNumericSelect = require('./components/NumericSelect');

var _componentsNumericSelect2 = _interopRequireDefault(_componentsNumericSelect);

var _componentsCities = require('./components/Cities');

var _componentsCities2 = _interopRequireDefault(_componentsCities);

var _componentsStates = require('./components/States');

var _componentsStates2 = _interopRequireDefault(_componentsStates);

_reactDom2['default'].render(_react2['default'].createElement(
	'div',
	null,
	_react2['default'].createElement(_componentsCities2['default'], { label: 'Cities' }),
	_react2['default'].createElement('br', null),
	_react2['default'].createElement('br', null),
	_react2['default'].createElement('br', null),
	_react2['default'].createElement('br', null),
	_react2['default'].createElement(_componentsMultiselect2['default'], { label: 'Multiselect' }),
	_react2['default'].createElement('br', null),
	_react2['default'].createElement('br', null),
	_react2['default'].createElement('br', null),
	_react2['default'].createElement('br', null)
), document.getElementById('example'));

// <States label="States" searchable />
//
// <Contributors label="Contributors (Async)" />
// <NumericSelect label="Numeric Values" />
// <CustomRender label="Custom Render Methods"/>
// <CustomComponents label="Custom Placeholder, Option and Value Components" />
/*
<SelectedValuesField label="Option Creation (tags mode)" options={FLAVOURS} allowCreate hint="Enter a value that's NOT in the list, then hit return" />
*/

},{"./components/Cities":2,"./components/Contributors":3,"./components/CustomComponents":4,"./components/CustomRender":5,"./components/Multiselect":6,"./components/NumericSelect":7,"./components/States":8,"react":undefined,"react-dom":undefined,"react-select":undefined}],2:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactVirtualizedSelect = require('react-virtualized-select');

var _reactVirtualizedSelect2 = _interopRequireDefault(_reactVirtualizedSelect);

var DATA = require('../data/cities');

var CitiesField = _react2['default'].createClass({
	displayName: 'CitiesField',
	getInitialState: function getInitialState() {
		return {};
	},
	updateValue: function updateValue(newValue) {
		this.setState({
			selectValue: newValue
		});
	},
	render: function render() {
		var options = DATA.CITIES;
		return _react2['default'].createElement(
			'div',
			{ className: 'section' },
			_react2['default'].createElement(
				'h3',
				{ className: 'section-heading' },
				'Large Datasets'
			),
			_react2['default'].createElement(_reactVirtualizedSelect2['default'], { ref: 'citySelect',
				autofocus: true,
				options: options,
				simpleValue: true,
				clearable: true,
				name: 'select-city',
				value: this.state.selectValue,
				onChange: this.updateValue,
				searchable: true,
				labelKey: 'name',
				valueKey: 'name'
			}),
			_react2['default'].createElement(
				'div',
				{ className: 'hint' },
				'Uses ',
				_react2['default'].createElement(
					'a',
					{ href: 'https://github.com/bvaughn/react-virtualized' },
					'react-virtualized'
				),
				' and ',
				_react2['default'].createElement(
					'a',
					{ href: 'https://github.com/bvaughn/react-virtualized-select/' },
					'react-virtualized-select'
				),
				' to display a list of the world\'s 1,000 largest cities.'
			)
		);
	}
});

module.exports = CitiesField;

},{"../data/cities":9,"react":undefined,"react-virtualized-select":25}],3:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var CONTRIBUTORS = require('../data/contributors');
var MAX_CONTRIBUTORS = 6;
var ASYNC_DELAY = 500;

var Contributors = _react2['default'].createClass({
	displayName: 'Contributors',
	propTypes: {
		label: _react2['default'].PropTypes.string
	},
	getInitialState: function getInitialState() {
		return {
			multi: true,
			value: [CONTRIBUTORS[0]]
		};
	},
	onChange: function onChange(value) {
		this.setState({
			value: value
		});
	},
	switchToMulti: function switchToMulti() {
		this.setState({
			multi: true,
			value: [this.state.value]
		});
	},
	switchToSingle: function switchToSingle() {
		this.setState({
			multi: false,
			value: this.state.value[0]
		});
	},
	getContributors: function getContributors(input, callback) {
		input = input.toLowerCase();
		var options = CONTRIBUTORS.filter(function (i) {
			return i.github.substr(0, input.length) === input;
		});
		var data = {
			options: options.slice(0, MAX_CONTRIBUTORS),
			complete: options.length <= MAX_CONTRIBUTORS
		};
		setTimeout(function () {
			callback(null, data);
		}, ASYNC_DELAY);
	},
	gotoContributor: function gotoContributor(value, event) {
		window.open('https://github.com/' + value.github);
	},
	render: function render() {
		return _react2['default'].createElement(
			'div',
			{ className: 'section' },
			_react2['default'].createElement(
				'h3',
				{ className: 'section-heading' },
				this.props.label
			),
			_react2['default'].createElement(_reactSelect2['default'].Async, { multi: this.state.multi, value: this.state.value, onChange: this.onChange, onValueClick: this.gotoContributor, valueKey: 'github', labelKey: 'name', loadOptions: this.getContributors }),
			_react2['default'].createElement(
				'div',
				{ className: 'checkbox-list' },
				_react2['default'].createElement(
					'label',
					{ className: 'checkbox' },
					_react2['default'].createElement('input', { type: 'radio', className: 'checkbox-control', checked: this.state.multi, onChange: this.switchToMulti }),
					_react2['default'].createElement(
						'span',
						{ className: 'checkbox-label' },
						'Multiselect'
					)
				),
				_react2['default'].createElement(
					'label',
					{ className: 'checkbox' },
					_react2['default'].createElement('input', { type: 'radio', className: 'checkbox-control', checked: !this.state.multi, onChange: this.switchToSingle }),
					_react2['default'].createElement(
						'span',
						{ className: 'checkbox-label' },
						'Single Value'
					)
				)
			),
			_react2['default'].createElement(
				'div',
				{ className: 'hint' },
				'This example implements custom label and value properties, async options and opens the github profiles in a new window when values are clicked'
			)
		);
	}
});

module.exports = Contributors;

},{"../data/contributors":10,"react":undefined,"react-select":undefined}],4:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _reactGravatar = require('react-gravatar');

var _reactGravatar2 = _interopRequireDefault(_reactGravatar);

var USERS = require('../data/users');
var GRAVATAR_SIZE = 15;

var GravatarOption = _react2['default'].createClass({
	displayName: 'GravatarOption',

	propTypes: {
		children: _react2['default'].PropTypes.node,
		className: _react2['default'].PropTypes.string,
		isDisabled: _react2['default'].PropTypes.bool,
		isFocused: _react2['default'].PropTypes.bool,
		isSelected: _react2['default'].PropTypes.bool,
		onFocus: _react2['default'].PropTypes.func,
		onSelect: _react2['default'].PropTypes.func,
		onUnfocus: _react2['default'].PropTypes.func,
		option: _react2['default'].PropTypes.object.isRequired
	},
	handleMouseDown: function handleMouseDown(event) {
		event.preventDefault();
		event.stopPropagation();
		this.props.onSelect(this.props.option, event);
	},
	handleMouseEnter: function handleMouseEnter(event) {
		this.props.onFocus(this.props.option, event);
	},
	handleMouseMove: function handleMouseMove(event) {
		if (this.props.isFocused) return;
		this.props.onFocus(this.props.option, event);
	},
	handleMouseLeave: function handleMouseLeave(event) {
		this.props.onUnfocus(this.props.option, event);
	},
	render: function render() {
		var gravatarStyle = {
			borderRadius: 3,
			display: 'inline-block',
			marginRight: 10,
			position: 'relative',
			top: -2,
			verticalAlign: 'middle'
		};
		return _react2['default'].createElement(
			'div',
			{ className: this.props.className,
				onMouseDown: this.handleMouseDown,
				onMouseEnter: this.handleMouseEnter,
				onMouseMove: this.handleMouseMove,
				onMouseLeave: this.handleMouseLeave,
				title: this.props.option.title },
			_react2['default'].createElement(_reactGravatar2['default'], { email: this.props.option.email, size: GRAVATAR_SIZE, style: gravatarStyle }),
			this.props.children
		);
	}
});

var GravatarValue = _react2['default'].createClass({
	displayName: 'GravatarValue',

	propTypes: {
		children: _react2['default'].PropTypes.node,
		placeholder: _react2['default'].PropTypes.string,
		value: _react2['default'].PropTypes.object
	},
	render: function render() {
		var gravatarStyle = {
			borderRadius: 3,
			display: 'inline-block',
			marginRight: 10,
			position: 'relative',
			top: -2,
			verticalAlign: 'middle'
		};
		return _react2['default'].createElement(
			'div',
			{ className: 'Select-value', title: this.props.value.title },
			_react2['default'].createElement(
				'span',
				{ className: 'Select-value-label' },
				_react2['default'].createElement(_reactGravatar2['default'], { email: this.props.value.email, size: GRAVATAR_SIZE, style: gravatarStyle }),
				this.props.children
			)
		);
	}
});

var UsersField = _react2['default'].createClass({
	displayName: 'UsersField',

	propTypes: {
		hint: _react2['default'].PropTypes.string,
		label: _react2['default'].PropTypes.string
	},
	getInitialState: function getInitialState() {
		return {};
	},
	setValue: function setValue(value) {
		this.setState({ value: value });
	},
	render: function render() {
		var placeholder = _react2['default'].createElement(
			'span',
			null,
			'☺ Select User'
		);

		return _react2['default'].createElement(
			'div',
			{ className: 'section' },
			_react2['default'].createElement(
				'h3',
				{ className: 'section-heading' },
				this.props.label
			),
			_react2['default'].createElement(_reactSelect2['default'], {
				onChange: this.setValue,
				optionComponent: GravatarOption,
				options: USERS,
				placeholder: placeholder,
				value: this.state.value,
				valueComponent: GravatarValue
			}),
			_react2['default'].createElement(
				'div',
				{ className: 'hint' },
				'This example implements custom Option and Value components to render a Gravatar image for each user based on their email. It also demonstrates rendering HTML elements as the placeholder.'
			)
		);
	}
});

module.exports = UsersField;

},{"../data/users":12,"react":undefined,"react-gravatar":17,"react-select":undefined}],5:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var DisabledUpsellOptions = _react2['default'].createClass({
	displayName: 'DisabledUpsellOptions',
	propTypes: {
		label: _react2['default'].PropTypes.string
	},
	getInitialState: function getInitialState() {
		return {};
	},
	setValue: function setValue(value) {
		this.setState({ value: value });
		console.log('Support level selected:', value.label);
	},
	renderLink: function renderLink() {
		return _react2['default'].createElement(
			'a',
			{ style: { marginLeft: 5 }, href: '/upgrade', target: '_blank' },
			'Upgrade here!'
		);
	},
	renderOption: function renderOption(option) {
		return _react2['default'].createElement(
			'span',
			{ style: { color: option.color } },
			option.label,
			' ',
			option.link
		);
	},
	renderValue: function renderValue(option) {
		return _react2['default'].createElement(
			'strong',
			{ style: { color: option.color } },
			option.label
		);
	},
	render: function render() {
		var options = [{ label: 'Basic customer support', value: 'basic', color: '#E31864' }, { label: 'Premium customer support', value: 'premium', color: '#6216A3' }, { label: 'Pro customer support', value: 'pro', disabled: true, link: this.renderLink() }];
		return _react2['default'].createElement(
			'div',
			{ className: 'section' },
			_react2['default'].createElement(
				'h3',
				{ className: 'section-heading' },
				this.props.label
			),
			_react2['default'].createElement(_reactSelect2['default'], {
				placeholder: 'Select your support level',
				options: options,
				optionRenderer: this.renderOption,
				onChange: this.setValue,
				value: this.state.value,
				valueRenderer: this.renderValue
			}),
			_react2['default'].createElement(
				'div',
				{ className: 'hint' },
				'This demonstates custom render methods and links in disabled options'
			)
		);
	}
});
module.exports = DisabledUpsellOptions;

},{"react":undefined,"react-select":undefined}],6:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var FLAVOURS = [{ label: 'Chocolate', value: 'chocolate' }, { label: 'Vanilla', value: 'vanilla' }, { label: 'Strawberry', value: 'strawberry' }, { label: 'Caramel', value: 'caramel' }, { label: 'Cookies and Cream', value: 'cookiescream' }, { label: 'Peppermint', value: 'peppermint' }];

var WHY_WOULD_YOU = [{ label: 'Chocolate (are you crazy?)', value: 'chocolate', disabled: true }].concat(FLAVOURS.slice(1));

var MultiSelectField = _react2['default'].createClass({
	displayName: 'MultiSelectField',
	propTypes: {
		label: _react2['default'].PropTypes.string
	},
	getInitialState: function getInitialState() {
		return {
			disabled: false,
			crazy: false,
			options: FLAVOURS,
			value: []
		};
	},
	handleSelectChange: function handleSelectChange(value) {
		console.log('You\'ve selected:', value);
		this.setState({ value: value });
	},
	toggleDisabled: function toggleDisabled(e) {
		this.setState({ disabled: e.target.checked });
	},
	toggleChocolate: function toggleChocolate(e) {
		var crazy = e.target.checked;
		this.setState({
			crazy: crazy,
			options: crazy ? WHY_WOULD_YOU : FLAVOURS
		});
	},
	render: function render() {
		return _react2['default'].createElement(
			'div',
			{ className: 'section' },
			_react2['default'].createElement(
				'h3',
				{ className: 'section-heading' },
				this.props.label
			),
			_react2['default'].createElement(_reactSelect2['default'], { multi: true, simpleValue: true, disabled: this.state.disabled, value: this.state.value, placeholder: 'Select your favourite(s)', options: this.state.options, onChange: this.handleSelectChange }),
			_react2['default'].createElement(
				'div',
				{ className: 'checkbox-list' },
				_react2['default'].createElement(
					'label',
					{ className: 'checkbox' },
					_react2['default'].createElement('input', { type: 'checkbox', className: 'checkbox-control', checked: this.state.disabled, onChange: this.toggleDisabled }),
					_react2['default'].createElement(
						'span',
						{ className: 'checkbox-label' },
						'Disable the control'
					)
				),
				_react2['default'].createElement(
					'label',
					{ className: 'checkbox' },
					_react2['default'].createElement('input', { type: 'checkbox', className: 'checkbox-control', checked: this.state.crazy, onChange: this.toggleChocolate }),
					_react2['default'].createElement(
						'span',
						{ className: 'checkbox-label' },
						'I don\'t like Chocolate (disabled the option)'
					)
				)
			)
		);
	}
});

module.exports = MultiSelectField;

},{"react":undefined,"react-select":undefined}],7:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var ValuesAsNumbersField = _react2['default'].createClass({
	displayName: 'ValuesAsNumbersField',
	propTypes: {
		label: _react2['default'].PropTypes.string
	},
	getInitialState: function getInitialState() {
		return {
			options: [{ value: 10, label: 'Ten' }, { value: 11, label: 'Eleven' }, { value: 12, label: 'Twelve' }, { value: 23, label: 'Twenty-three' }, { value: 24, label: 'Twenty-four' }],
			matchPos: 'any',
			matchValue: true,
			matchLabel: true,
			value: null,
			multi: false
		};
	},
	onChangeMatchStart: function onChangeMatchStart(event) {
		this.setState({
			matchPos: event.target.checked ? 'start' : 'any'
		});
	},
	onChangeMatchValue: function onChangeMatchValue(event) {
		this.setState({
			matchValue: event.target.checked
		});
	},
	onChangeMatchLabel: function onChangeMatchLabel(event) {
		this.setState({
			matchLabel: event.target.checked
		});
	},
	onChange: function onChange(value) {
		this.setState({ value: value });
		console.log('Numeric Select value changed to', value);
	},
	onChangeMulti: function onChangeMulti(event) {
		this.setState({
			multi: event.target.checked
		});
	},
	render: function render() {
		var matchProp = 'any';
		if (this.state.matchLabel && !this.state.matchValue) {
			matchProp = 'label';
		}
		if (!this.state.matchLabel && this.state.matchValue) {
			matchProp = 'value';
		}
		return _react2['default'].createElement(
			'div',
			{ className: 'section' },
			_react2['default'].createElement(
				'h3',
				{ className: 'section-heading' },
				this.props.label
			),
			_react2['default'].createElement(_reactSelect2['default'], {
				matchPos: this.state.matchPos,
				matchProp: matchProp,
				multi: this.state.multi,
				onChange: this.onChange,
				options: this.state.options,
				simpleValue: true,
				value: this.state.value
			}),
			_react2['default'].createElement(
				'div',
				{ className: 'checkbox-list' },
				_react2['default'].createElement(
					'label',
					{ className: 'checkbox' },
					_react2['default'].createElement('input', { type: 'checkbox', className: 'checkbox-control', checked: this.state.multi, onChange: this.onChangeMulti }),
					_react2['default'].createElement(
						'span',
						{ className: 'checkbox-label' },
						'Multi-Select'
					)
				),
				_react2['default'].createElement(
					'label',
					{ className: 'checkbox' },
					_react2['default'].createElement('input', { type: 'checkbox', className: 'checkbox-control', checked: this.state.matchValue, onChange: this.onChangeMatchValue }),
					_react2['default'].createElement(
						'span',
						{ className: 'checkbox-label' },
						'Match value only'
					)
				),
				_react2['default'].createElement(
					'label',
					{ className: 'checkbox' },
					_react2['default'].createElement('input', { type: 'checkbox', className: 'checkbox-control', checked: this.state.matchLabel, onChange: this.onChangeMatchLabel }),
					_react2['default'].createElement(
						'span',
						{ className: 'checkbox-label' },
						'Match label only'
					)
				),
				_react2['default'].createElement(
					'label',
					{ className: 'checkbox' },
					_react2['default'].createElement('input', { type: 'checkbox', className: 'checkbox-control', checked: this.state.matchPos === 'start', onChange: this.onChangeMatchStart }),
					_react2['default'].createElement(
						'span',
						{ className: 'checkbox-label' },
						'Only include matches from the start of the string'
					)
				)
			),
			_react2['default'].createElement(
				'div',
				{ className: 'hint' },
				'This example uses simple numeric values'
			)
		);
	}
});

module.exports = ValuesAsNumbersField;

},{"react":undefined,"react-select":undefined}],8:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var STATES = require('../data/states');

var StatesField = _react2['default'].createClass({
	displayName: 'StatesField',
	propTypes: {
		label: _react2['default'].PropTypes.string,
		searchable: _react2['default'].PropTypes.bool
	},
	getDefaultProps: function getDefaultProps() {
		return {
			label: 'States:',
			searchable: true
		};
	},
	getInitialState: function getInitialState() {
		return {
			country: 'AU',
			disabled: false,
			searchable: this.props.searchable,
			selectValue: 'new-south-wales',
			clearable: true
		};
	},
	switchCountry: function switchCountry(e) {
		var newCountry = e.target.value;
		console.log('Country changed to ' + newCountry);
		this.setState({
			country: newCountry,
			selectValue: null
		});
	},
	updateValue: function updateValue(newValue) {
		console.log('State changed to ' + newValue);
		this.setState({
			selectValue: newValue
		});
	},
	focusStateSelect: function focusStateSelect() {
		this.refs.stateSelect.focus();
	},
	toggleCheckbox: function toggleCheckbox(e) {
		var newState = {};
		newState[e.target.name] = e.target.checked;
		this.setState(newState);
	},
	render: function render() {
		var options = STATES[this.state.country];
		return _react2['default'].createElement(
			'div',
			{ className: 'section' },
			_react2['default'].createElement(
				'h3',
				{ className: 'section-heading' },
				this.props.label
			),
			_react2['default'].createElement(_reactSelect2['default'], { ref: 'stateSelect', autofocus: true, options: options, simpleValue: true, clearable: this.state.clearable, name: 'selected-state', disabled: this.state.disabled, value: this.state.selectValue, onChange: this.updateValue, searchable: this.state.searchable }),
			_react2['default'].createElement(
				'div',
				{ style: { marginTop: 14 } },
				_react2['default'].createElement(
					'button',
					{ type: 'button', onClick: this.focusStateSelect },
					'Focus Select'
				),
				_react2['default'].createElement(
					'label',
					{ className: 'checkbox', style: { marginLeft: 10 } },
					_react2['default'].createElement('input', { type: 'checkbox', className: 'checkbox-control', name: 'searchable', checked: this.state.searchable, onChange: this.toggleCheckbox }),
					_react2['default'].createElement(
						'span',
						{ className: 'checkbox-label' },
						'Searchable'
					)
				),
				_react2['default'].createElement(
					'label',
					{ className: 'checkbox', style: { marginLeft: 10 } },
					_react2['default'].createElement('input', { type: 'checkbox', className: 'checkbox-control', name: 'disabled', checked: this.state.disabled, onChange: this.toggleCheckbox }),
					_react2['default'].createElement(
						'span',
						{ className: 'checkbox-label' },
						'Disabled'
					)
				),
				_react2['default'].createElement(
					'label',
					{ className: 'checkbox', style: { marginLeft: 10 } },
					_react2['default'].createElement('input', { type: 'checkbox', className: 'checkbox-control', name: 'clearable', checked: this.state.clearable, onChange: this.toggleCheckbox }),
					_react2['default'].createElement(
						'span',
						{ className: 'checkbox-label' },
						'Clearable'
					)
				)
			),
			_react2['default'].createElement(
				'div',
				{ className: 'checkbox-list' },
				_react2['default'].createElement(
					'label',
					{ className: 'checkbox' },
					_react2['default'].createElement('input', { type: 'radio', className: 'checkbox-control', checked: this.state.country === 'AU', value: 'AU', onChange: this.switchCountry }),
					_react2['default'].createElement(
						'span',
						{ className: 'checkbox-label' },
						'Australia'
					)
				),
				_react2['default'].createElement(
					'label',
					{ className: 'checkbox' },
					_react2['default'].createElement('input', { type: 'radio', className: 'checkbox-control', checked: this.state.country === 'US', value: 'US', onChange: this.switchCountry }),
					_react2['default'].createElement(
						'span',
						{ className: 'checkbox-label' },
						'United States'
					)
				)
			)
		);
	}
});

module.exports = StatesField;

},{"../data/states":11,"react":undefined,"react-select":undefined}],9:[function(require,module,exports){
'use strict';

exports.CITIES = [{ name: 'Abilene' }, { name: 'Addison' }, { name: 'Akron' }, { name: 'Alameda' }, { name: 'Albany' }, { name: 'Albany' }, { name: 'Albany' }, { name: 'Albuquerque' }, { name: 'Alexandria' }, { name: 'Alexandria' }, { name: 'Alhambra' }, { name: 'Aliso Viejo' }, { name: 'Allen' }, { name: 'Allentown' }, { name: 'Alpharetta' }, { name: 'Altamonte Springs' }, { name: 'Altoona' }, { name: 'Amarillo' }, { name: 'Ames' }, { name: 'Anaheim' }, { name: 'Anchorage' }, { name: 'Anderson' }, { name: 'Ankeny' }, { name: 'Ann Arbor' }, { name: 'Annapolis' }, { name: 'Antioch' }, { name: 'Apache Junction' }, { name: 'Apex' }, { name: 'Apopka' }, { name: 'Apple Valley' }, { name: 'Apple Valley' }, { name: 'Appleton' }, { name: 'Arcadia' }, { name: 'Arlington' }, { name: 'Arlington Heights' }, { name: 'Arvada' }, { name: 'Asheville' }, { name: 'Athens-Clarke County' }, { name: 'Atlanta' }, { name: 'Atlantic City' }, { name: 'Attleboro' }, { name: 'Auburn' }, { name: 'Auburn' }, { name: 'Augusta-Richmond County' }, { name: 'Aurora' }, { name: 'Aurora' }, { name: 'Austin' }, { name: 'Aventura' }, { name: 'Avondale' }, { name: 'Azusa' }, { name: 'Bakersfield' }, { name: 'Baldwin Park' }, { name: 'Baltimore' }, { name: 'Barnstable Town' }, { name: 'Bartlett' }, { name: 'Bartlett' }, { name: 'Baton Rouge' }, { name: 'Battle Creek' }, { name: 'Bayonne' }, { name: 'Baytown' }, { name: 'Beaumont' }, { name: 'Beaumont' }, { name: 'Beavercreek' }, { name: 'Beaverton' }, { name: 'Bedford' }, { name: 'Bell Gardens' }, { name: 'Belleville' }, { name: 'Bellevue' }, { name: 'Bellevue' }, { name: 'Bellflower' }, { name: 'Bellingham' }, { name: 'Beloit' }, { name: 'Bend' }, { name: 'Bentonville' }, { name: 'Berkeley' }, { name: 'Berwyn' }, { name: 'Bethlehem' }, { name: 'Beverly' }, { name: 'Billings' }, { name: 'Biloxi' }, { name: 'Binghamton' }, { name: 'Birmingham' }, { name: 'Bismarck' }, { name: 'Blacksburg' }, { name: 'Blaine' }, { name: 'Bloomington' }, { name: 'Bloomington' }, { name: 'Bloomington' }, { name: 'Blue Springs' }, { name: 'Boca Raton' }, { name: 'Boise City' }, { name: 'Bolingbrook' }, { name: 'Bonita Springs' }, { name: 'Bossier City' }, { name: 'Boston' }, { name: 'Boulder' }, { name: 'Bountiful' }, { name: 'Bowie' }, { name: 'Bowling Green' }, { name: 'Boynton Beach' }, { name: 'Bozeman' }, { name: 'Bradenton' }, { name: 'Brea' }, { name: 'Bremerton' }, { name: 'Brentwood' }, { name: 'Brentwood' }, { name: 'Bridgeport' }, { name: 'Bristol' }, { name: 'Brockton' }, { name: 'Broken Arrow' }, { name: 'Brookfield' }, { name: 'Brookhaven' }, { name: 'Brooklyn Park' }, { name: 'Broomfield' }, { name: 'Brownsville' }, { name: 'Bryan' }, { name: 'Buckeye' }, { name: 'Buena Park' }, { name: 'Buffalo' }, { name: 'Buffalo Grove' }, { name: 'Bullhead City' }, { name: 'Burbank' }, { name: 'Burien' }, { name: 'Burleson' }, { name: 'Burlington' }, { name: 'Burlington' }, { name: 'Burnsville' }, { name: 'Caldwell' }, { name: 'Calexico' }, { name: 'Calumet City' }, { name: 'Camarillo' }, { name: 'Cambridge' }, { name: 'Camden' }, { name: 'Campbell' }, { name: 'Canton' }, { name: 'Cape Coral' }, { name: 'Cape Girardeau' }, { name: 'Carlsbad' }, { name: 'Carmel' }, { name: 'Carol Stream' }, { name: 'Carpentersville' }, { name: 'Carrollton' }, { name: 'Carson' }, { name: 'Carson City' }, { name: 'Cary' }, { name: 'Casa Grande' }, { name: 'Casper' }, { name: 'Castle Rock' }, { name: 'Cathedral City' }, { name: 'Cedar Falls' }, { name: 'Cedar Hill' }, { name: 'Cedar Park' }, { name: 'Cedar Rapids' }, { name: 'Centennial' }, { name: 'Ceres' }, { name: 'Cerritos' }, { name: 'Champaign' }, { name: 'Chandler' }, { name: 'Chapel Hill' }, { name: 'Charleston' }, { name: 'Charleston' }, { name: 'Charlotte' }, { name: 'Charlottesville' }, { name: 'Chattanooga' }, { name: 'Chelsea' }, { name: 'Chesapeake' }, { name: 'Chesterfield' }, { name: 'Cheyenne' }, { name: 'Chicago' }, { name: 'Chico' }, { name: 'Chicopee' }, { name: 'Chino' }, { name: 'Chino Hills' }, { name: 'Chula Vista' }, { name: 'Cicero' }, { name: 'Cincinnati' }, { name: 'Citrus Heights' }, { name: 'Clarksville' }, { name: 'Clearwater' }, { name: 'Cleveland' }, { name: 'Cleveland' }, { name: 'Cleveland Heights' }, { name: 'Clifton' }, { name: 'Clovis' }, { name: 'Clovis' }, { name: 'Coachella' }, { name: 'Coconut Creek' }, { name: 'Coeur d\'Alene' }, { name: 'College Station' }, { name: 'Collierville' }, { name: 'Colorado Springs' }, { name: 'Colton' }, { name: 'Columbia' }, { name: 'Columbia' }, { name: 'Columbus' }, { name: 'Columbus' }, { name: 'Columbus' }, { name: 'Commerce City' }, { name: 'Compton' }, { name: 'Concord' }, { name: 'Concord' }, { name: 'Concord' }, { name: 'Conroe' }, { name: 'Conway' }, { name: 'Coon Rapids' }, { name: 'Coppell' }, { name: 'Coral Gables' }, { name: 'Coral Springs' }, { name: 'Corona' }, { name: 'Corpus Christi' }, { name: 'Corvallis' }, { name: 'Costa Mesa' }, { name: 'Council Bluffs' }, { name: 'Covina' }, { name: 'Covington' }, { name: 'Cranston' }, { name: 'Crystal Lake' }, { name: 'Culver City' }, { name: 'Cupertino' }, { name: 'Cutler Bay' }, { name: 'Cuyahoga Falls' }, { name: 'Cypress' }, { name: 'Dallas' }, { name: 'Daly City' }, { name: 'Danbury' }, { name: 'Danville' }, { name: 'Danville' }, { name: 'Davenport' }, { name: 'Davie' }, { name: 'Davis' }, { name: 'Dayton' }, { name: 'Daytona Beach' }, { name: 'DeKalb' }, { name: 'DeSoto' }, { name: 'Dearborn' }, { name: 'Dearborn Heights' }, { name: 'Decatur' }, { name: 'Decatur' }, { name: 'Deerfield Beach' }, { name: 'Delano' }, { name: 'Delray Beach' }, { name: 'Deltona' }, { name: 'Denton' }, { name: 'Denver' }, { name: 'Des Moines' }, { name: 'Des Plaines' }, { name: 'Detroit' }, { name: 'Diamond Bar' }, { name: 'Doral' }, { name: 'Dothan' }, { name: 'Dover' }, { name: 'Downers Grove' }, { name: 'Downey' }, { name: 'Draper' }, { name: 'Dublin' }, { name: 'Dublin' }, { name: 'Dubuque' }, { name: 'Duluth' }, { name: 'Duncanville' }, { name: 'Dunwoody' }, { name: 'Durham' }, { name: 'Eagan' }, { name: 'East Lansing' }, { name: 'East Orange' }, { name: 'East Providence' }, { name: 'Eastvale' }, { name: 'Eau Claire' }, { name: 'Eden Prairie' }, { name: 'Edina' }, { name: 'Edinburg' }, { name: 'Edmond' }, { name: 'Edmonds' }, { name: 'El Cajon' }, { name: 'El Centro' }, { name: 'El Monte' }, { name: 'El Paso' }, { name: 'Elgin' }, { name: 'Elizabeth' }, { name: 'Elk Grove' }, { name: 'Elkhart' }, { name: 'Elmhurst' }, { name: 'Elyria' }, { name: 'Encinitas' }, { name: 'Enid' }, { name: 'Erie' }, { name: 'Escondido' }, { name: 'Euclid' }, { name: 'Eugene' }, { name: 'Euless' }, { name: 'Evanston' }, { name: 'Evansville' }, { name: 'Everett' }, { name: 'Everett' }, { name: 'Fairfield' }, { name: 'Fairfield' }, { name: 'Fall River' }, { name: 'Fargo' }, { name: 'Farmington' }, { name: 'Farmington Hills' }, { name: 'Fayetteville' }, { name: 'Fayetteville' }, { name: 'Federal Way' }, { name: 'Findlay' }, { name: 'Fishers' }, { name: 'Fitchburg' }, { name: 'Flagstaff' }, { name: 'Flint' }, { name: 'Florence' }, { name: 'Florence' }, { name: 'Florissant' }, { name: 'Flower Mound' }, { name: 'Folsom' }, { name: 'Fond du Lac' }, { name: 'Fontana' }, { name: 'Fort Collins' }, { name: 'Fort Lauderdale' }, { name: 'Fort Myers' }, { name: 'Fort Pierce' }, { name: 'Fort Smith' }, { name: 'Fort Wayne' }, { name: 'Fort Worth' }, { name: 'Fountain Valley' }, { name: 'Franklin' }, { name: 'Frederick' }, { name: 'Freeport' }, { name: 'Fremont' }, { name: 'Fresno' }, { name: 'Friendswood' }, { name: 'Frisco' }, { name: 'Fullerton' }, { name: 'Gainesville' }, { name: 'Gaithersburg' }, { name: 'Galveston' }, { name: 'Garden Grove' }, { name: 'Gardena' }, { name: 'Garland' }, { name: 'Gary' }, { name: 'Gastonia' }, { name: 'Georgetown' }, { name: 'Germantown' }, { name: 'Gilbert' }, { name: 'Gilroy' }, { name: 'Glendale' }, { name: 'Glendale' }, { name: 'Glendora' }, { name: 'Glenview' }, { name: 'Goodyear' }, { name: 'Goose Creek' }, { name: 'Grand Forks' }, { name: 'Grand Island' }, { name: 'Grand Junction' }, { name: 'Grand Prairie' }, { name: 'Grand Rapids' }, { name: 'Grapevine' }, { name: 'Great Falls' }, { name: 'Greeley' }, { name: 'Green Bay' }, { name: 'Greenacres' }, { name: 'Greenfield' }, { name: 'Greensboro' }, { name: 'Greenville' }, { name: 'Greenville' }, { name: 'Greenwood' }, { name: 'Gresham' }, { name: 'Grove City' }, { name: 'Gulfport' }, { name: 'Hackensack' }, { name: 'Hagerstown' }, { name: 'Hallandale Beach' }, { name: 'Haltom City' }, { name: 'Hamilton' }, { name: 'Hammond' }, { name: 'Hampton' }, { name: 'Hanford' }, { name: 'Hanover Park' }, { name: 'Harlingen' }, { name: 'Harrisburg' }, { name: 'Harrisonburg' }, { name: 'Hartford' }, { name: 'Hattiesburg' }, { name: 'Haverhill' }, { name: 'Hawthorne' }, { name: 'Hayward' }, { name: 'Hemet' }, { name: 'Hempstead' }, { name: 'Henderson' }, { name: 'Hendersonville' }, { name: 'Hesperia' }, { name: 'Hialeah' }, { name: 'Hickory' }, { name: 'High Point' }, { name: 'Highland' }, { name: 'Hillsboro' }, { name: 'Hilton Head Island' }, { name: 'Hoboken' }, { name: 'Hoffman Estates' }, { name: 'Hollywood' }, { name: 'Holyoke' }, { name: 'Homestead' }, { name: 'Honolulu' }, { name: 'Hoover' }, { name: 'Houston' }, { name: 'Huber Heights' }, { name: 'Huntersville' }, { name: 'Huntington' }, { name: 'Huntington Beach' }, { name: 'Huntington Park' }, { name: 'Huntsville' }, { name: 'Huntsville' }, { name: 'Hurst' }, { name: 'Hutchinson' }, { name: 'Idaho Falls' }, { name: 'Independence' }, { name: 'Indianapolis' }, { name: 'Indio' }, { name: 'Inglewood' }, { name: 'Iowa City' }, { name: 'Irvine' }, { name: 'Irving' }, { name: 'Jackson' }, { name: 'Jackson' }, { name: 'Jacksonville' }, { name: 'Jacksonville' }, { name: 'Janesville' }, { name: 'Jefferson City' }, { name: 'Jeffersonville' }, { name: 'Jersey City' }, { name: 'Johns Creek' }, { name: 'Johnson City' }, { name: 'Joliet' }, { name: 'Jonesboro' }, { name: 'Joplin' }, { name: 'Jupiter' }, { name: 'Jurupa Valley' }, { name: 'Kalamazoo' }, { name: 'Kannapolis' }, { name: 'Kansas City' }, { name: 'Kansas City' }, { name: 'Kearny' }, { name: 'Keizer' }, { name: 'Keller' }, { name: 'Kenner' }, { name: 'Kennewick' }, { name: 'Kenosha' }, { name: 'Kent' }, { name: 'Kentwood' }, { name: 'Kettering' }, { name: 'Killeen' }, { name: 'Kingsport' }, { name: 'Kirkland' }, { name: 'Kissimmee' }, { name: 'Knoxville' }, { name: 'Kokomo' }, { name: 'La Crosse' }, { name: 'La Habra' }, { name: 'La Mesa' }, { name: 'La Mirada' }, { name: 'La Puente' }, { name: 'La Quinta' }, { name: 'Lacey' }, { name: 'Lafayette' }, { name: 'Lafayette' }, { name: 'Laguna Niguel' }, { name: 'Lake Charles' }, { name: 'Lake Elsinore' }, { name: 'Lake Forest' }, { name: 'Lake Havasu City' }, { name: 'Lake Oswego' }, { name: 'Lakeland' }, { name: 'Lakeville' }, { name: 'Lakewood' }, { name: 'Lakewood' }, { name: 'Lakewood' }, { name: 'Lakewood' }, { name: 'Lancaster' }, { name: 'Lancaster' }, { name: 'Lancaster' }, { name: 'Lancaster' }, { name: 'Lansing' }, { name: 'Laredo' }, { name: 'Largo' }, { name: 'Las Cruces' }, { name: 'Las Vegas' }, { name: 'Lauderhill' }, { name: 'Lawrence' }, { name: 'Lawrence' }, { name: 'Lawrence' }, { name: 'Lawton' }, { name: 'Layton' }, { name: 'League City' }, { name: 'Lee\'s Summit' }, { name: 'Leesburg' }, { name: 'Lehi' }, { name: 'Lenexa' }, { name: 'Leominster' }, { name: 'Lewisville' }, { name: 'Lexington-Fayette' }, { name: 'Lima' }, { name: 'Lincoln' }, { name: 'Lincoln' }, { name: 'Lincoln Park' }, { name: 'Linden' }, { name: 'Little Rock' }, { name: 'Littleton' }, { name: 'Livermore' }, { name: 'Livonia' }, { name: 'Lodi' }, { name: 'Logan' }, { name: 'Lombard' }, { name: 'Lompoc' }, { name: 'Long Beach' }, { name: 'Longmont' }, { name: 'Longview' }, { name: 'Lorain' }, { name: 'Los Angeles' }, { name: 'Louisville/Jefferson County' }, { name: 'Loveland' }, { name: 'Lowell' }, { name: 'Lubbock' }, { name: 'Lynchburg' }, { name: 'Lynn' }, { name: 'Lynwood' }, { name: 'Macon' }, { name: 'Madera' }, { name: 'Madison' }, { name: 'Madison' }, { name: 'Malden' }, { name: 'Manassas' }, { name: 'Manchester' }, { name: 'Manhattan' }, { name: 'Mankato' }, { name: 'Mansfield' }, { name: 'Mansfield' }, { name: 'Manteca' }, { name: 'Maple Grove' }, { name: 'Maplewood' }, { name: 'Marana' }, { name: 'Margate' }, { name: 'Maricopa' }, { name: 'Marietta' }, { name: 'Marlborough' }, { name: 'Martinez' }, { name: 'Marysville' }, { name: 'McAllen' }, { name: 'McKinney' }, { name: 'Medford' }, { name: 'Medford' }, { name: 'Melbourne' }, { name: 'Memphis' }, { name: 'Menifee' }, { name: 'Mentor' }, { name: 'Merced' }, { name: 'Meriden' }, { name: 'Meridian' }, { name: 'Meridian' }, { name: 'Mesa' }, { name: 'Mesquite' }, { name: 'Methuen' }, { name: 'Miami' }, { name: 'Miami Beach' }, { name: 'Miami Gardens' }, { name: 'Middletown' }, { name: 'Middletown' }, { name: 'Midland' }, { name: 'Midland' }, { name: 'Midwest City' }, { name: 'Milford' }, { name: 'Milpitas' }, { name: 'Milwaukee' }, { name: 'Minneapolis' }, { name: 'Minnetonka' }, { name: 'Minot' }, { name: 'Miramar' }, { name: 'Mishawaka' }, { name: 'Mission' }, { name: 'Mission Viejo' }, { name: 'Missoula' }, { name: 'Missouri City' }, { name: 'Mobile' }, { name: 'Modesto' }, { name: 'Moline' }, { name: 'Monroe' }, { name: 'Monrovia' }, { name: 'Montclair' }, { name: 'Montebello' }, { name: 'Monterey Park' }, { name: 'Montgomery' }, { name: 'Moore' }, { name: 'Moorhead' }, { name: 'Moreno Valley' }, { name: 'Morgan Hill' }, { name: 'Mount Pleasant' }, { name: 'Mount Prospect' }, { name: 'Mount Vernon' }, { name: 'Mountain View' }, { name: 'Muncie' }, { name: 'Murfreesboro' }, { name: 'Murray' }, { name: 'Murrieta' }, { name: 'Muskegon' }, { name: 'Muskogee' }, { name: 'Nampa' }, { name: 'Napa' }, { name: 'Naperville' }, { name: 'Nashua' }, { name: 'Nashville-Davidson' }, { name: 'National City' }, { name: 'New Bedford' }, { name: 'New Berlin' }, { name: 'New Braunfels' }, { name: 'New Britain' }, { name: 'New Brunswick' }, { name: 'New Haven' }, { name: 'New Orleans' }, { name: 'New Rochelle' }, { name: 'New York' }, { name: 'Newark' }, { name: 'Newark' }, { name: 'Newark' }, { name: 'Newport Beach' }, { name: 'Newport News' }, { name: 'Newton' }, { name: 'Niagara Falls' }, { name: 'Noblesville' }, { name: 'Norfolk' }, { name: 'Normal' }, { name: 'Norman' }, { name: 'North Charleston' }, { name: 'North Las Vegas' }, { name: 'North Lauderdale' }, { name: 'North Little Rock' }, { name: 'North Miami' }, { name: 'North Miami Beach' }, { name: 'North Port' }, { name: 'North Richland Hills' }, { name: 'Northglenn' }, { name: 'Norwalk' }, { name: 'Norwalk' }, { name: 'Norwich' }, { name: 'Novato' }, { name: 'Novi' }, { name: 'O\'Fallon' }, { name: 'Oak Lawn' }, { name: 'Oak Park' }, { name: 'Oakland' }, { name: 'Oakland Park' }, { name: 'Oakley' }, { name: 'Ocala' }, { name: 'Oceanside' }, { name: 'Ocoee' }, { name: 'Odessa' }, { name: 'Ogden' }, { name: 'Oklahoma City' }, { name: 'Olathe' }, { name: 'Olympia' }, { name: 'Omaha' }, { name: 'Ontario' }, { name: 'Orange' }, { name: 'Orem' }, { name: 'Orland Park' }, { name: 'Orlando' }, { name: 'Ormond Beach' }, { name: 'Oro Valley' }, { name: 'Oshkosh' }, { name: 'Overland Park' }, { name: 'Owensboro' }, { name: 'Oxnard' }, { name: 'Pacifica' }, { name: 'Palatine' }, { name: 'Palm Bay' }, { name: 'Palm Beach Gardens' }, { name: 'Palm Coast' }, { name: 'Palm Desert' }, { name: 'Palm Springs' }, { name: 'Palmdale' }, { name: 'Palo Alto' }, { name: 'Panama City' }, { name: 'Paramount' }, { name: 'Park Ridge' }, { name: 'Parker' }, { name: 'Parma' }, { name: 'Pasadena' }, { name: 'Pasadena' }, { name: 'Pasco' }, { name: 'Passaic' }, { name: 'Paterson' }, { name: 'Pawtucket' }, { name: 'Peabody' }, { name: 'Peachtree Corners' }, { name: 'Pearland' }, { name: 'Pembroke Pines' }, { name: 'Pensacola' }, { name: 'Peoria' }, { name: 'Peoria' }, { name: 'Perris' }, { name: 'Perth Amboy' }, { name: 'Petaluma' }, { name: 'Pflugerville' }, { name: 'Pharr' }, { name: 'Phenix City' }, { name: 'Philadelphia' }, { name: 'Phoenix' }, { name: 'Pico Rivera' }, { name: 'Pine Bluff' }, { name: 'Pinellas Park' }, { name: 'Pittsburg' }, { name: 'Pittsburgh' }, { name: 'Pittsfield' }, { name: 'Placentia' }, { name: 'Plainfield' }, { name: 'Plainfield' }, { name: 'Plano' }, { name: 'Plantation' }, { name: 'Pleasanton' }, { name: 'Plymouth' }, { name: 'Pocatello' }, { name: 'Pomona' }, { name: 'Pompano Beach' }, { name: 'Pontiac' }, { name: 'Port Arthur' }, { name: 'Port Orange' }, { name: 'Port St. Lucie' }, { name: 'Portage' }, { name: 'Porterville' }, { name: 'Portland' }, { name: 'Portland' }, { name: 'Portsmouth' }, { name: 'Poway' }, { name: 'Prescott' }, { name: 'Prescott Valley' }, { name: 'Providence' }, { name: 'Provo' }, { name: 'Pueblo' }, { name: 'Puyallup' }, { name: 'Quincy' }, { name: 'Quincy' }, { name: 'Racine' }, { name: 'Raleigh' }, { name: 'Rancho Cordova' }, { name: 'Rancho Cucamonga' }, { name: 'Rancho Palos Verdes' }, { name: 'Rancho Santa Margarita' }, { name: 'Rapid City' }, { name: 'Reading' }, { name: 'Redding' }, { name: 'Redlands' }, { name: 'Redmond' }, { name: 'Redondo Beach' }, { name: 'Redwood City' }, { name: 'Reno' }, { name: 'Renton' }, { name: 'Revere' }, { name: 'Rialto' }, { name: 'Richardson' }, { name: 'Richland' }, { name: 'Richmond' }, { name: 'Richmond' }, { name: 'Rio Rancho' }, { name: 'Riverside' }, { name: 'Riverton' }, { name: 'Roanoke' }, { name: 'Rochester' }, { name: 'Rochester' }, { name: 'Rochester Hills' }, { name: 'Rock Hill' }, { name: 'Rock Island' }, { name: 'Rockford' }, { name: 'Rocklin' }, { name: 'Rockville' }, { name: 'Rockwall' }, { name: 'Rocky Mount' }, { name: 'Rogers' }, { name: 'Rohnert Park' }, { name: 'Romeoville' }, { name: 'Rosemead' }, { name: 'Roseville' }, { name: 'Roseville' }, { name: 'Roswell' }, { name: 'Roswell' }, { name: 'Round Rock' }, { name: 'Rowlett' }, { name: 'Roy' }, { name: 'Royal Oak' }, { name: 'Sacramento' }, { name: 'Saginaw' }, { name: 'Salem' }, { name: 'Salem' }, { name: 'Salina' }, { name: 'Salinas' }, { name: 'Salt Lake City' }, { name: 'Sammamish' }, { name: 'San Angelo' }, { name: 'San Antonio' }, { name: 'San Bernardino' }, { name: 'San Bruno' }, { name: 'San Buenaventura (Ventura)' }, { name: 'San Clemente' }, { name: 'San Diego' }, { name: 'San Francisco' }, { name: 'San Gabriel' }, { name: 'San Jacinto' }, { name: 'San Jose' }, { name: 'San Leandro' }, { name: 'San Luis Obispo' }, { name: 'San Marcos' }, { name: 'San Marcos' }, { name: 'San Mateo' }, { name: 'San Rafael' }, { name: 'San Ramon' }, { name: 'Sandy' }, { name: 'Sandy Springs' }, { name: 'Sanford' }, { name: 'Santa Ana' }, { name: 'Santa Barbara' }, { name: 'Santa Clara' }, { name: 'Santa Clarita' }, { name: 'Santa Cruz' }, { name: 'Santa Fe' }, { name: 'Santa Maria' }, { name: 'Santa Monica' }, { name: 'Santa Rosa' }, { name: 'Santee' }, { name: 'Sarasota' }, { name: 'Savannah' }, { name: 'Sayreville' }, { name: 'Schaumburg' }, { name: 'Schenectady' }, { name: 'Scottsdale' }, { name: 'Scranton' }, { name: 'Seattle' }, { name: 'Shakopee' }, { name: 'Shawnee' }, { name: 'Sheboygan' }, { name: 'Shelton' }, { name: 'Sherman' }, { name: 'Shoreline' }, { name: 'Shreveport' }, { name: 'Sierra Vista' }, { name: 'Simi Valley' }, { name: 'Sioux City' }, { name: 'Sioux Falls' }, { name: 'Skokie' }, { name: 'Smyrna' }, { name: 'Smyrna' }, { name: 'Somerville' }, { name: 'South Bend' }, { name: 'South Gate' }, { name: 'South Jordan' }, { name: 'South San Francisco' }, { name: 'Southaven' }, { name: 'Southfield' }, { name: 'Spanish Fork' }, { name: 'Sparks' }, { name: 'Spartanburg' }, { name: 'Spokane' }, { name: 'Spokane Valley' }, { name: 'Springdale' }, { name: 'Springfield' }, { name: 'Springfield' }, { name: 'Springfield' }, { name: 'Springfield' }, { name: 'Springfield' }, { name: 'St. Charles' }, { name: 'St. Clair Shores' }, { name: 'St. Cloud' }, { name: 'St. Cloud' }, { name: 'St. George' }, { name: 'St. Joseph' }, { name: 'St. Louis' }, { name: 'St. Louis Park' }, { name: 'St. Paul' }, { name: 'St. Peters' }, { name: 'St. Petersburg' }, { name: 'Stamford' }, { name: 'Stanton' }, { name: 'State College' }, { name: 'Sterling Heights' }, { name: 'Stillwater' }, { name: 'Stockton' }, { name: 'Streamwood' }, { name: 'Strongsville' }, { name: 'Suffolk' }, { name: 'Sugar Land' }, { name: 'Summerville' }, { name: 'Sumter' }, { name: 'Sunnyvale' }, { name: 'Sunrise' }, { name: 'Surprise' }, { name: 'Syracuse' }, { name: 'Tacoma' }, { name: 'Tallahassee' }, { name: 'Tamarac' }, { name: 'Tampa' }, { name: 'Taunton' }, { name: 'Taylor' }, { name: 'Taylorsville' }, { name: 'Temecula' }, { name: 'Tempe' }, { name: 'Temple' }, { name: 'Terre Haute' }, { name: 'Texarkana' }, { name: 'Texas City' }, { name: 'The Colony' }, { name: 'Thornton' }, { name: 'Thousand Oaks' }, { name: 'Tigard' }, { name: 'Tinley Park' }, { name: 'Titusville' }, { name: 'Toledo' }, { name: 'Topeka' }, { name: 'Torrance' }, { name: 'Tracy' }, { name: 'Trenton' }, { name: 'Troy' }, { name: 'Troy' }, { name: 'Tucson' }, { name: 'Tulare' }, { name: 'Tulsa' }, { name: 'Turlock' }, { name: 'Tuscaloosa' }, { name: 'Tustin' }, { name: 'Twin Falls' }, { name: 'Tyler' }, { name: 'Union City' }, { name: 'Union City' }, { name: 'Upland' }, { name: 'Urbana' }, { name: 'Urbandale' }, { name: 'Utica' }, { name: 'Vacaville' }, { name: 'Valdosta' }, { name: 'Vallejo' }, { name: 'Valley Stream' }, { name: 'Vancouver' }, { name: 'Victoria' }, { name: 'Victorville' }, { name: 'Vineland' }, { name: 'Virginia Beach' }, { name: 'Visalia' }, { name: 'Vista' }, { name: 'Waco' }, { name: 'Walnut Creek' }, { name: 'Waltham' }, { name: 'Warner Robins' }, { name: 'Warren' }, { name: 'Warren' }, { name: 'Warwick' }, { name: 'Washington' }, { name: 'Waterbury' }, { name: 'Waterloo' }, { name: 'Watsonville' }, { name: 'Waukegan' }, { name: 'Waukesha' }, { name: 'Wausau' }, { name: 'Wauwatosa' }, { name: 'Wellington' }, { name: 'Weslaco' }, { name: 'West Allis' }, { name: 'West Covina' }, { name: 'West Des Moines' }, { name: 'West Haven' }, { name: 'West Jordan' }, { name: 'West New York' }, { name: 'West Palm Beach' }, { name: 'West Sacramento' }, { name: 'West Valley City' }, { name: 'Westerville' }, { name: 'Westfield' }, { name: 'Westland' }, { name: 'Westminster' }, { name: 'Westminster' }, { name: 'Weston' }, { name: 'Weymouth Town' }, { name: 'Wheaton' }, { name: 'Wheeling' }, { name: 'White Plains' }, { name: 'Whittier' }, { name: 'Wichita' }, { name: 'Wichita Falls' }, { name: 'Wilkes-Barre' }, { name: 'Wilmington' }, { name: 'Wilmington' }, { name: 'Wilson' }, { name: 'Winston-Salem' }, { name: 'Winter Garden' }, { name: 'Woburn' }, { name: 'Woodbury' }, { name: 'Woodland' }, { name: 'Woonsocket' }, { name: 'Worcester' }, { name: 'Wylie' }, { name: 'Wyoming' }, { name: 'Yakima' }, { name: 'Yonkers' }, { name: 'Yorba Linda' }, { name: 'York' }, { name: 'Youngstown' }, { name: 'Yuba City' }, { name: 'Yucaipa' }, { name: 'Yuma' }];

},{}],10:[function(require,module,exports){
'use strict';

module.exports = [{ github: 'jedwatson', name: 'Jed Watson' }, { github: 'bruderstein', name: 'Dave Brotherstone' }, { github: 'jossmac', name: 'Joss Mackison' }, { github: 'jniechcial', name: 'Jakub Niechciał' }, { github: 'craigdallimore', name: 'Craig Dallimore' }, { github: 'julen', name: 'Julen Ruiz Aizpuru' }, { github: 'dcousens', name: 'Daniel Cousens' }, { github: 'jgautsch', name: 'Jon Gautsch' }, { github: 'dmitry-smirnov', name: 'Dmitry Smirnov' }];

},{}],11:[function(require,module,exports){
'use strict';

exports.AU = [{ value: 'australian-capital-territory', label: 'Australian Capital Territory', className: 'State-ACT' }, { value: 'new-south-wales', label: 'New South Wales', className: 'State-NSW' }, { value: 'victoria', label: 'Victoria', className: 'State-Vic' }, { value: 'queensland', label: 'Queensland', className: 'State-Qld' }, { value: 'western-australia', label: 'Western Australia', className: 'State-WA' }, { value: 'south-australia', label: 'South Australia', className: 'State-SA' }, { value: 'tasmania', label: 'Tasmania', className: 'State-Tas' }, { value: 'northern-territory', label: 'Northern Territory', className: 'State-NT' }];

exports.US = [{ value: 'AL', label: 'Alabama', disabled: true }, { value: 'AK', label: 'Alaska' }, { value: 'AS', label: 'American Samoa' }, { value: 'AZ', label: 'Arizona' }, { value: 'AR', label: 'Arkansas' }, { value: 'CA', label: 'California' }, { value: 'CO', label: 'Colorado' }, { value: 'CT', label: 'Connecticut' }, { value: 'DE', label: 'Delaware' }, { value: 'DC', label: 'District Of Columbia' }, { value: 'FM', label: 'Federated States Of Micronesia' }, { value: 'FL', label: 'Florida' }, { value: 'GA', label: 'Georgia' }, { value: 'GU', label: 'Guam' }, { value: 'HI', label: 'Hawaii' }, { value: 'ID', label: 'Idaho' }, { value: 'IL', label: 'Illinois' }, { value: 'IN', label: 'Indiana' }, { value: 'IA', label: 'Iowa' }, { value: 'KS', label: 'Kansas' }, { value: 'KY', label: 'Kentucky' }, { value: 'LA', label: 'Louisiana' }, { value: 'ME', label: 'Maine' }, { value: 'MH', label: 'Marshall Islands' }, { value: 'MD', label: 'Maryland' }, { value: 'MA', label: 'Massachusetts' }, { value: 'MI', label: 'Michigan' }, { value: 'MN', label: 'Minnesota' }, { value: 'MS', label: 'Mississippi' }, { value: 'MO', label: 'Missouri' }, { value: 'MT', label: 'Montana' }, { value: 'NE', label: 'Nebraska' }, { value: 'NV', label: 'Nevada' }, { value: 'NH', label: 'New Hampshire' }, { value: 'NJ', label: 'New Jersey' }, { value: 'NM', label: 'New Mexico' }, { value: 'NY', label: 'New York' }, { value: 'NC', label: 'North Carolina' }, { value: 'ND', label: 'North Dakota' }, { value: 'MP', label: 'Northern Mariana Islands' }, { value: 'OH', label: 'Ohio' }, { value: 'OK', label: 'Oklahoma' }, { value: 'OR', label: 'Oregon' }, { value: 'PW', label: 'Palau' }, { value: 'PA', label: 'Pennsylvania' }, { value: 'PR', label: 'Puerto Rico' }, { value: 'RI', label: 'Rhode Island' }, { value: 'SC', label: 'South Carolina' }, { value: 'SD', label: 'South Dakota' }, { value: 'TN', label: 'Tennessee' }, { value: 'TX', label: 'Texas' }, { value: 'UT', label: 'Utah' }, { value: 'VT', label: 'Vermont' }, { value: 'VI', label: 'Virgin Islands' }, { value: 'VA', label: 'Virginia' }, { value: 'WA', label: 'Washington' }, { value: 'WV', label: 'West Virginia' }, { value: 'WI', label: 'Wisconsin' }, { value: 'WY', label: 'Wyoming' }];

},{}],12:[function(require,module,exports){
'use strict';

module.exports = [{ value: 'John Smith', label: 'John Smith', email: 'john@smith.com' }, { value: 'Merry Jane', label: 'Merry Jane', email: 'merry@jane.com' }, { value: 'Stan Hoper', label: 'Stan Hoper', email: 'stan@hoper.com' }];

},{}],13:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],14:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

},{}],15:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};

},{}],16:[function(require,module,exports){
'use strict';

exports.decode = exports.parse = require('./decode');
exports.encode = exports.stringify = require('./encode');

},{"./decode":14,"./encode":15}],17:[function(require,module,exports){
// Generated by CoffeeScript 1.10.0
var React, isRetina, md5, querystring;

React = require('react');

md5 = require('md5');

querystring = require('querystring');

isRetina = require('is-retina');

module.exports = React.createClass({
  displayName: 'Gravatar',
  propTypes: {
    email: React.PropTypes.string,
    md5: React.PropTypes.string,
    size: React.PropTypes.number,
    rating: React.PropTypes.string,
    https: React.PropTypes.bool,
    "default": React.PropTypes.string,
    className: React.PropTypes.string
  },
  getDefaultProps: function() {
    return {
      size: 50,
      rating: 'g',
      https: false,
      "default": "retro"
    };
  },
  render: function() {
    var base, hash, modernBrowser, query, retinaQuery, retinaSrc, src;
    base = this.props.https ? "https://secure.gravatar.com/avatar/" : 'http://www.gravatar.com/avatar/';
    query = querystring.stringify({
      s: this.props.size,
      r: this.props.rating,
      d: this.props["default"]
    });
    retinaQuery = querystring.stringify({
      s: this.props.size * 2,
      r: this.props.rating,
      d: this.props["default"]
    });
    if (this.props.md5) {
      hash = this.props.md5;
    } else if (this.props.email) {
      hash = md5(this.props.email);
    } else {
      console.warn('Gravatar image can not be fetched. Either the "email" or "md5" prop must be specified.');
      return React.createElement("script", null);
    }
    src = base + hash + "?" + query;
    retinaSrc = base + hash + "?" + retinaQuery;
    modernBrowser = true;
    if (typeof window !== "undefined" && window !== null) {
      modernBrowser = 'srcset' in document.createElement('img');
    }
    if (!modernBrowser && isRetina()) {
      return React.createElement("img", React.__spread({
        "style": this.props.style,
        "className": "react-gravatar " + this.props.className,
        "src": retinaSrc,
        "height": this.props.size,
        "width": this.props.size
      }, this.props));
    } else {
      return React.createElement("img", React.__spread({
        "style": this.props.style,
        "className": "react-gravatar " + this.props.className,
        "src": src,
        "srcSet": retinaSrc + " 2x",
        "height": this.props.size,
        "width": this.props.size
      }, this.props));
    }
  }
});

},{"is-retina":18,"md5":19,"querystring":16,"react":undefined}],18:[function(require,module,exports){
module.exports = function() {
  var mediaQuery;
  if (typeof window !== "undefined" && window !== null) {
    mediaQuery = "(-webkit-min-device-pixel-ratio: 1.25), (min--moz-device-pixel-ratio: 1.25), (-o-min-device-pixel-ratio: 5/4), (min-resolution: 1.25dppx)";
    if (window.devicePixelRatio > 1.25) {
      return true;
    }
    if (window.matchMedia && window.matchMedia(mediaQuery).matches) {
      return true;
    }
  }
  return false;
};

},{}],19:[function(require,module,exports){
(function(){
  var crypt = require('crypt'),
      utf8 = require('charenc').utf8,
      isBuffer = require('is-buffer'),
      bin = require('charenc').bin,

  // The core
  md5 = function (message, options) {
    // Convert to byte array
    if (message.constructor == String)
      if (options && options.encoding === 'binary')
        message = bin.stringToBytes(message);
      else
        message = utf8.stringToBytes(message);
    else if (isBuffer(message))
      message = Array.prototype.slice.call(message, 0);
    else if (!Array.isArray(message))
      message = message.toString();
    // else, assume byte array already

    var m = crypt.bytesToWords(message),
        l = message.length * 8,
        a =  1732584193,
        b = -271733879,
        c = -1732584194,
        d =  271733878;

    // Swap endian
    for (var i = 0; i < m.length; i++) {
      m[i] = ((m[i] <<  8) | (m[i] >>> 24)) & 0x00FF00FF |
             ((m[i] << 24) | (m[i] >>>  8)) & 0xFF00FF00;
    }

    // Padding
    m[l >>> 5] |= 0x80 << (l % 32);
    m[(((l + 64) >>> 9) << 4) + 14] = l;

    // Method shortcuts
    var FF = md5._ff,
        GG = md5._gg,
        HH = md5._hh,
        II = md5._ii;

    for (var i = 0; i < m.length; i += 16) {

      var aa = a,
          bb = b,
          cc = c,
          dd = d;

      a = FF(a, b, c, d, m[i+ 0],  7, -680876936);
      d = FF(d, a, b, c, m[i+ 1], 12, -389564586);
      c = FF(c, d, a, b, m[i+ 2], 17,  606105819);
      b = FF(b, c, d, a, m[i+ 3], 22, -1044525330);
      a = FF(a, b, c, d, m[i+ 4],  7, -176418897);
      d = FF(d, a, b, c, m[i+ 5], 12,  1200080426);
      c = FF(c, d, a, b, m[i+ 6], 17, -1473231341);
      b = FF(b, c, d, a, m[i+ 7], 22, -45705983);
      a = FF(a, b, c, d, m[i+ 8],  7,  1770035416);
      d = FF(d, a, b, c, m[i+ 9], 12, -1958414417);
      c = FF(c, d, a, b, m[i+10], 17, -42063);
      b = FF(b, c, d, a, m[i+11], 22, -1990404162);
      a = FF(a, b, c, d, m[i+12],  7,  1804603682);
      d = FF(d, a, b, c, m[i+13], 12, -40341101);
      c = FF(c, d, a, b, m[i+14], 17, -1502002290);
      b = FF(b, c, d, a, m[i+15], 22,  1236535329);

      a = GG(a, b, c, d, m[i+ 1],  5, -165796510);
      d = GG(d, a, b, c, m[i+ 6],  9, -1069501632);
      c = GG(c, d, a, b, m[i+11], 14,  643717713);
      b = GG(b, c, d, a, m[i+ 0], 20, -373897302);
      a = GG(a, b, c, d, m[i+ 5],  5, -701558691);
      d = GG(d, a, b, c, m[i+10],  9,  38016083);
      c = GG(c, d, a, b, m[i+15], 14, -660478335);
      b = GG(b, c, d, a, m[i+ 4], 20, -405537848);
      a = GG(a, b, c, d, m[i+ 9],  5,  568446438);
      d = GG(d, a, b, c, m[i+14],  9, -1019803690);
      c = GG(c, d, a, b, m[i+ 3], 14, -187363961);
      b = GG(b, c, d, a, m[i+ 8], 20,  1163531501);
      a = GG(a, b, c, d, m[i+13],  5, -1444681467);
      d = GG(d, a, b, c, m[i+ 2],  9, -51403784);
      c = GG(c, d, a, b, m[i+ 7], 14,  1735328473);
      b = GG(b, c, d, a, m[i+12], 20, -1926607734);

      a = HH(a, b, c, d, m[i+ 5],  4, -378558);
      d = HH(d, a, b, c, m[i+ 8], 11, -2022574463);
      c = HH(c, d, a, b, m[i+11], 16,  1839030562);
      b = HH(b, c, d, a, m[i+14], 23, -35309556);
      a = HH(a, b, c, d, m[i+ 1],  4, -1530992060);
      d = HH(d, a, b, c, m[i+ 4], 11,  1272893353);
      c = HH(c, d, a, b, m[i+ 7], 16, -155497632);
      b = HH(b, c, d, a, m[i+10], 23, -1094730640);
      a = HH(a, b, c, d, m[i+13],  4,  681279174);
      d = HH(d, a, b, c, m[i+ 0], 11, -358537222);
      c = HH(c, d, a, b, m[i+ 3], 16, -722521979);
      b = HH(b, c, d, a, m[i+ 6], 23,  76029189);
      a = HH(a, b, c, d, m[i+ 9],  4, -640364487);
      d = HH(d, a, b, c, m[i+12], 11, -421815835);
      c = HH(c, d, a, b, m[i+15], 16,  530742520);
      b = HH(b, c, d, a, m[i+ 2], 23, -995338651);

      a = II(a, b, c, d, m[i+ 0],  6, -198630844);
      d = II(d, a, b, c, m[i+ 7], 10,  1126891415);
      c = II(c, d, a, b, m[i+14], 15, -1416354905);
      b = II(b, c, d, a, m[i+ 5], 21, -57434055);
      a = II(a, b, c, d, m[i+12],  6,  1700485571);
      d = II(d, a, b, c, m[i+ 3], 10, -1894986606);
      c = II(c, d, a, b, m[i+10], 15, -1051523);
      b = II(b, c, d, a, m[i+ 1], 21, -2054922799);
      a = II(a, b, c, d, m[i+ 8],  6,  1873313359);
      d = II(d, a, b, c, m[i+15], 10, -30611744);
      c = II(c, d, a, b, m[i+ 6], 15, -1560198380);
      b = II(b, c, d, a, m[i+13], 21,  1309151649);
      a = II(a, b, c, d, m[i+ 4],  6, -145523070);
      d = II(d, a, b, c, m[i+11], 10, -1120210379);
      c = II(c, d, a, b, m[i+ 2], 15,  718787259);
      b = II(b, c, d, a, m[i+ 9], 21, -343485551);

      a = (a + aa) >>> 0;
      b = (b + bb) >>> 0;
      c = (c + cc) >>> 0;
      d = (d + dd) >>> 0;
    }

    return crypt.endian([a, b, c, d]);
  };

  // Auxiliary functions
  md5._ff  = function (a, b, c, d, x, s, t) {
    var n = a + (b & c | ~b & d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._gg  = function (a, b, c, d, x, s, t) {
    var n = a + (b & d | c & ~d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._hh  = function (a, b, c, d, x, s, t) {
    var n = a + (b ^ c ^ d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._ii  = function (a, b, c, d, x, s, t) {
    var n = a + (c ^ (b | ~d)) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };

  // Package private blocksize
  md5._blocksize = 16;
  md5._digestsize = 16;

  module.exports = function (message, options) {
    if(typeof message == 'undefined')
      return;

    var digestbytes = crypt.wordsToBytes(md5(message, options));
    return options && options.asBytes ? digestbytes :
        options && options.asString ? bin.bytesToString(digestbytes) :
        crypt.bytesToHex(digestbytes);
  };

})();

},{"charenc":20,"crypt":21,"is-buffer":22}],20:[function(require,module,exports){
var charenc = {
  // UTF-8 encoding
  utf8: {
    // Convert a string to a byte array
    stringToBytes: function(str) {
      return charenc.bin.stringToBytes(unescape(encodeURIComponent(str)));
    },

    // Convert a byte array to a string
    bytesToString: function(bytes) {
      return decodeURIComponent(escape(charenc.bin.bytesToString(bytes)));
    }
  },

  // Binary encoding
  bin: {
    // Convert a string to a byte array
    stringToBytes: function(str) {
      for (var bytes = [], i = 0; i < str.length; i++)
        bytes.push(str.charCodeAt(i) & 0xFF);
      return bytes;
    },

    // Convert a byte array to a string
    bytesToString: function(bytes) {
      for (var str = [], i = 0; i < bytes.length; i++)
        str.push(String.fromCharCode(bytes[i]));
      return str.join('');
    }
  }
};

module.exports = charenc;

},{}],21:[function(require,module,exports){
(function() {
  var base64map
      = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',

  crypt = {
    // Bit-wise rotation left
    rotl: function(n, b) {
      return (n << b) | (n >>> (32 - b));
    },

    // Bit-wise rotation right
    rotr: function(n, b) {
      return (n << (32 - b)) | (n >>> b);
    },

    // Swap big-endian to little-endian and vice versa
    endian: function(n) {
      // If number given, swap endian
      if (n.constructor == Number) {
        return crypt.rotl(n, 8) & 0x00FF00FF | crypt.rotl(n, 24) & 0xFF00FF00;
      }

      // Else, assume array and swap all items
      for (var i = 0; i < n.length; i++)
        n[i] = crypt.endian(n[i]);
      return n;
    },

    // Generate an array of any length of random bytes
    randomBytes: function(n) {
      for (var bytes = []; n > 0; n--)
        bytes.push(Math.floor(Math.random() * 256));
      return bytes;
    },

    // Convert a byte array to big-endian 32-bit words
    bytesToWords: function(bytes) {
      for (var words = [], i = 0, b = 0; i < bytes.length; i++, b += 8)
        words[b >>> 5] |= bytes[i] << (24 - b % 32);
      return words;
    },

    // Convert big-endian 32-bit words to a byte array
    wordsToBytes: function(words) {
      for (var bytes = [], b = 0; b < words.length * 32; b += 8)
        bytes.push((words[b >>> 5] >>> (24 - b % 32)) & 0xFF);
      return bytes;
    },

    // Convert a byte array to a hex string
    bytesToHex: function(bytes) {
      for (var hex = [], i = 0; i < bytes.length; i++) {
        hex.push((bytes[i] >>> 4).toString(16));
        hex.push((bytes[i] & 0xF).toString(16));
      }
      return hex.join('');
    },

    // Convert a hex string to a byte array
    hexToBytes: function(hex) {
      for (var bytes = [], c = 0; c < hex.length; c += 2)
        bytes.push(parseInt(hex.substr(c, 2), 16));
      return bytes;
    },

    // Convert a byte array to a base-64 string
    bytesToBase64: function(bytes) {
      for (var base64 = [], i = 0; i < bytes.length; i += 3) {
        var triplet = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
        for (var j = 0; j < 4; j++)
          if (i * 8 + j * 6 <= bytes.length * 8)
            base64.push(base64map.charAt((triplet >>> 6 * (3 - j)) & 0x3F));
          else
            base64.push('=');
      }
      return base64.join('');
    },

    // Convert a base-64 string to a byte array
    base64ToBytes: function(base64) {
      // Remove non-base-64 characters
      base64 = base64.replace(/[^A-Z0-9+\/]/ig, '');

      for (var bytes = [], i = 0, imod4 = 0; i < base64.length;
          imod4 = ++i % 4) {
        if (imod4 == 0) continue;
        bytes.push(((base64map.indexOf(base64.charAt(i - 1))
            & (Math.pow(2, -2 * imod4 + 8) - 1)) << (imod4 * 2))
            | (base64map.indexOf(base64.charAt(i)) >>> (6 - imod4 * 2)));
      }
      return bytes;
    }
  };

  module.exports = crypt;
})();

},{}],22:[function(require,module,exports){
/**
 * Determine if an object is Buffer
 *
 * Author:   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * License:  MIT
 *
 * `npm install is-buffer`
 */

module.exports = function (obj) {
  return !!(obj != null &&
    (obj._isBuffer || // For Safari 5-7 (missing Object.prototype.constructor)
      (obj.constructor &&
      typeof obj.constructor.isBuffer === 'function' &&
      obj.constructor.isBuffer(obj))
    ))
}

},{}],23:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _reactVirtualized = require('react-virtualized');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VirtualizedSelect = function (_Component) {
  _inherits(VirtualizedSelect, _Component);

  function VirtualizedSelect(props, context) {
    _classCallCheck(this, VirtualizedSelect);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(VirtualizedSelect).call(this, props, context));

    _this._renderMenu = _this._renderMenu.bind(_this);
    _this._rowRenderer = _this._rowRenderer.bind(_this);
    return _this;
  }

  _createClass(VirtualizedSelect, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_reactSelect2.default, _extends({}, this.props, {
        menuRenderer: this._renderMenu,
        menuStyle: { overflow: 'hidden' }
      }));
    }

    // See https://github.com/JedWatson/react-select/#effeciently-rendering-large-lists-with-windowing

  }, {
    key: '_renderMenu',
    value: function _renderMenu(_ref) {
      var focusedOption = _ref.focusedOption;
      var focusOption = _ref.focusOption;
      var labelKey = _ref.labelKey;
      var options = _ref.options;
      var selectValue = _ref.selectValue;
      var valueArray = _ref.valueArray;
      var _props = this.props;
      var maxHeight = _props.maxHeight;
      var optionHeight = _props.optionHeight;
      var rowRenderer = _props.rowRenderer;

      var focusedOptionIndex = options.indexOf(focusedOption);
      var height = Math.min(maxHeight, options.length * optionHeight);
      var innerRowRenderer = rowRenderer || this._rowRenderer;

      function wrappedRowRenderer(index) {
        var option = options[index];

        return innerRowRenderer({ focusedOption: focusedOption, focusedOptionIndex: focusedOptionIndex, focusOption: focusOption, labelKey: labelKey, option: option, options: options, selectValue: selectValue, valueArray: valueArray });
      }

      return _react2.default.createElement(
        _reactVirtualized.AutoSizer,
        { disableHeight: true },
        function (_ref2) {
          var width = _ref2.width;
          return _react2.default.createElement(_reactVirtualized.VirtualScroll, {
            className: 'VirtualSelectGrid',
            height: height,
            rowHeight: optionHeight,
            rowRenderer: wrappedRowRenderer,
            rowsCount: options.length,
            scrollToIndex: focusedOptionIndex,
            width: width
          });
        }
      );
    }
  }, {
    key: '_rowRenderer',
    value: function _rowRenderer(_ref3) {
      var focusedOption = _ref3.focusedOption;
      var focusOption = _ref3.focusOption;
      var labelKey = _ref3.labelKey;
      var option = _ref3.option;
      var selectValue = _ref3.selectValue;
      var optionHeight = this.props.optionHeight;


      var className = option === focusedOption ? 'VirtualizedSelectOption VirtualizedSelectFocusedOption' : 'VirtualizedSelectOption';

      return _react2.default.createElement(
        'div',
        {
          className: className,
          onMouseOver: function onMouseOver() {
            return focusOption(option);
          },
          onClick: function onClick() {
            return selectValue(option);
          },
          style: {
            height: optionHeight
          }
        },
        option[labelKey]
      );
    }
  }]);

  return VirtualizedSelect;
}(_react.Component);

VirtualizedSelect.propTypes = {
  maxHeight: _react.PropTypes.number.isRequired,
  optionHeight: _react.PropTypes.number.isRequired,
  rowRenderer: _react.PropTypes.func
};
VirtualizedSelect.defaultProps = {
  maxHeight: 200,
  optionHeight: 35
};
exports.default = VirtualizedSelect;
},{"react":undefined,"react-select":undefined,"react-virtualized":46}],24:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _VirtualizedSelect = require('./VirtualizedSelect');

var _VirtualizedSelect2 = _interopRequireDefault(_VirtualizedSelect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _VirtualizedSelect2.default;
},{"./VirtualizedSelect":23}],25:[function(require,module,exports){
arguments[4][24][0].apply(exports,arguments)
},{"./VirtualizedSelect":24,"dup":24}],26:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * This HOC decorates a virtualized component and responds to arrow-key events by scrolling one row or column at a time.
 */

var ArrowKeyStepper = function (_Component) {
  _inherits(ArrowKeyStepper, _Component);

  function ArrowKeyStepper(props, context) {
    _classCallCheck(this, ArrowKeyStepper);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ArrowKeyStepper).call(this, props, context));

    _this.state = {
      scrollToColumn: 0,
      scrollToRow: 0
    };

    _this._columnStartIndex = 0;
    _this._columnStopIndex = 0;
    _this._rowStartIndex = 0;
    _this._rowStopIndex = 0;

    _this._onKeyDown = _this._onKeyDown.bind(_this);
    _this._onSectionRendered = _this._onSectionRendered.bind(_this);
    return _this;
  }

  _createClass(ArrowKeyStepper, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var className = _props.className;
      var children = _props.children;
      var _state = this.state;
      var scrollToColumn = _state.scrollToColumn;
      var scrollToRow = _state.scrollToRow;


      return _react2.default.createElement(
        'div',
        {
          className: className,
          onKeyDown: this._onKeyDown
        },
        children({
          onSectionRendered: this._onSectionRendered,
          scrollToColumn: scrollToColumn,
          scrollToRow: scrollToRow
        })
      );
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
    }
  }, {
    key: '_onKeyDown',
    value: function _onKeyDown(event) {
      var _props2 = this.props;
      var columnsCount = _props2.columnsCount;
      var rowsCount = _props2.rowsCount;

      // The above cases all prevent default event event behavior.
      // This is to keep the grid from scrolling after the snap-to update.

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          this.setState({
            scrollToRow: Math.min(this._rowStopIndex + 1, rowsCount - 1)
          });
          break;
        case 'ArrowLeft':
          event.preventDefault();
          this.setState({
            scrollToColumn: Math.max(this._columnStartIndex - 1, 0)
          });
          break;
        case 'ArrowRight':
          event.preventDefault();
          this.setState({
            scrollToColumn: Math.min(this._columnStopIndex + 1, columnsCount - 1)
          });
          break;
        case 'ArrowUp':
          event.preventDefault();
          this.setState({
            scrollToRow: Math.max(this._rowStartIndex - 1, 0)
          });
          break;
      }
    }
  }, {
    key: '_onSectionRendered',
    value: function _onSectionRendered(_ref) {
      var columnStartIndex = _ref.columnStartIndex;
      var columnStopIndex = _ref.columnStopIndex;
      var rowStartIndex = _ref.rowStartIndex;
      var rowStopIndex = _ref.rowStopIndex;

      this._columnStartIndex = columnStartIndex;
      this._columnStopIndex = columnStopIndex;
      this._rowStartIndex = rowStartIndex;
      this._rowStopIndex = rowStopIndex;
    }
  }]);

  return ArrowKeyStepper;
}(_react.Component);

ArrowKeyStepper.propTypes = {
  children: _react.PropTypes.func.isRequired,
  className: _react.PropTypes.string,
  columnsCount: _react.PropTypes.number.isRequired,
  rowsCount: _react.PropTypes.number.isRequired
};
exports.default = ArrowKeyStepper;
},{"react":undefined,"react-addons-shallow-compare":52}],27:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ArrowKeyStepper = exports.default = undefined;

var _ArrowKeyStepper2 = require('./ArrowKeyStepper');

var _ArrowKeyStepper3 = _interopRequireDefault(_ArrowKeyStepper2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _ArrowKeyStepper3.default;
exports.ArrowKeyStepper = _ArrowKeyStepper3.default;
},{"./ArrowKeyStepper":26}],28:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Decorator component that automatically adjusts the width and height of a single child.
 * Child component should not be declared as a child but should rather be specified by a `ChildComponent` property.
 * All other properties will be passed through to the child component.
 */

var AutoSizer = function (_Component) {
  _inherits(AutoSizer, _Component);

  function AutoSizer(props) {
    _classCallCheck(this, AutoSizer);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AutoSizer).call(this, props));

    _this.state = {
      height: 0,
      width: 0
    };

    _this._onResize = _this._onResize.bind(_this);
    _this._onScroll = _this._onScroll.bind(_this);
    _this._setRef = _this._setRef.bind(_this);
    return _this;
  }

  _createClass(AutoSizer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // Defer requiring resize handler in order to support server-side rendering.
      // See issue #41
      this._detectElementResize = require('../vendor/detectElementResize');
      this._detectElementResize.addResizeListener(this._parentNode, this._onResize);

      this._onResize();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._detectElementResize.removeResizeListener(this._parentNode, this._onResize);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var children = _props.children;
      var disableHeight = _props.disableHeight;
      var disableWidth = _props.disableWidth;
      var _state = this.state;
      var height = _state.height;
      var width = _state.width;

      // Outer div should not force width/height since that may prevent containers from shrinking.
      // Inner component should overflow and use calculated width/height.
      // See issue #68 for more information.

      var outerStyle = { overflow: 'visible' };

      if (!disableHeight) {
        outerStyle.height = 0;
      }

      if (!disableWidth) {
        outerStyle.width = 0;
      }

      return _react2.default.createElement(
        'div',
        {
          ref: this._setRef,
          onScroll: this._onScroll,
          style: outerStyle
        },
        children({ height: height, width: width })
      );
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
    }
  }, {
    key: '_onResize',
    value: function _onResize() {
      var onResize = this.props.onResize;

      var _parentNode$getBoundi = this._parentNode.getBoundingClientRect();

      var height = _parentNode$getBoundi.height;
      var width = _parentNode$getBoundi.width;


      var style = getComputedStyle(this._parentNode);
      var paddingLeft = parseInt(style.paddingLeft, 10);
      var paddingRight = parseInt(style.paddingRight, 10);
      var paddingTop = parseInt(style.paddingTop, 10);
      var paddingBottom = parseInt(style.paddingBottom, 10);

      this.setState({
        height: height - paddingTop - paddingBottom,
        width: width - paddingLeft - paddingRight
      });

      onResize({ height: height, width: width });
    }
  }, {
    key: '_onScroll',
    value: function _onScroll(event) {
      // Prevent detectElementResize library from being triggered by this scroll event.
      event.stopPropagation();
    }
  }, {
    key: '_setRef',
    value: function _setRef(autoSizer) {
      // In case the component has been unmounted
      this._parentNode = autoSizer && autoSizer.parentNode;
    }
  }]);

  return AutoSizer;
}(_react.Component);

AutoSizer.propTypes = {
  /**
   * Function respondible for rendering children.
   * This function should implement the following signature:
   * ({ height, width }) => PropTypes.element
   */
  children: _react.PropTypes.func.isRequired,

  /** Disable dynamic :height property */
  disableHeight: _react.PropTypes.bool,

  /** Disable dynamic :width property */
  disableWidth: _react.PropTypes.bool,

  /** Callback to be invoked on-resize: ({ height, width }) */
  onResize: _react.PropTypes.func.isRequired
};
AutoSizer.defaultProps = {
  onResize: function onResize() {}
};
exports.default = AutoSizer;
},{"../vendor/detectElementResize":47,"react":undefined,"react-addons-shallow-compare":52}],29:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AutoSizer = exports.default = undefined;

var _AutoSizer2 = require('./AutoSizer');

var _AutoSizer3 = _interopRequireDefault(_AutoSizer2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _AutoSizer3.default;
exports.AutoSizer = _AutoSizer3.default;
},{"./AutoSizer":28}],30:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

var _Grid = require('../Grid');

var _Grid2 = _interopRequireDefault(_Grid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * High-order component that auto-calculates column-widths for `Grid` cells.
 */

var ColumnSizer = function (_Component) {
  _inherits(ColumnSizer, _Component);

  function ColumnSizer(props, context) {
    _classCallCheck(this, ColumnSizer);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ColumnSizer).call(this, props, context));

    _this._registerChild = _this._registerChild.bind(_this);
    return _this;
  }

  _createClass(ColumnSizer, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      var _props = this.props;
      var columnMaxWidth = _props.columnMaxWidth;
      var columnMinWidth = _props.columnMinWidth;
      var columnsCount = _props.columnsCount;
      var width = _props.width;


      if (columnMaxWidth !== prevProps.columnMaxWidth || columnMinWidth !== prevProps.columnMinWidth || columnsCount !== prevProps.columnsCount || width !== prevProps.width) {
        if (this._registeredChild) {
          this._registeredChild.recomputeGridSize();
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props;
      var children = _props2.children;
      var columnMaxWidth = _props2.columnMaxWidth;
      var columnMinWidth = _props2.columnMinWidth;
      var columnsCount = _props2.columnsCount;
      var width = _props2.width;


      var safeColumnMinWidth = columnMinWidth || 1;

      var safeColumnMaxWidth = columnMaxWidth ? Math.min(columnMaxWidth, width) : width;

      var columnWidth = width / columnsCount;
      columnWidth = Math.max(safeColumnMinWidth, columnWidth);
      columnWidth = Math.min(safeColumnMaxWidth, columnWidth);
      columnWidth = Math.floor(columnWidth);

      var adjustedWidth = Math.min(width, columnWidth * columnsCount);

      return children({
        adjustedWidth: adjustedWidth,
        getColumnWidth: function getColumnWidth() {
          return columnWidth;
        },
        registerChild: this._registerChild
      });
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
    }
  }, {
    key: '_registerChild',
    value: function _registerChild(child) {
      if (child !== null && !(child instanceof _Grid2.default)) {
        throw Error('Unexpected child type registered; only Grid children are supported.');
      }

      this._registeredChild = child;

      if (this._registeredChild) {
        this._registeredChild.recomputeGridSize();
      }
    }
  }]);

  return ColumnSizer;
}(_react.Component);

ColumnSizer.propTypes = {
  /**
   * Function respondible for rendering a virtualized Grid.
   * This function should implement the following signature:
   * ({ adjustedWidth, getColumnWidth, registerChild }) => PropTypes.element
   *
   * The specified :getColumnWidth function should be passed to the Grid's :columnWidth property.
   * The :registerChild should be passed to the Grid's :ref property.
   * The :adjustedWidth property is optional; it reflects the lesser of the overall width or the width of all columns.
   */
  children: _react.PropTypes.func.isRequired,

  /** Optional maximum allowed column width */
  columnMaxWidth: _react.PropTypes.number,

  /** Optional minimum allowed column width */
  columnMinWidth: _react.PropTypes.number,

  /** Number of columns in Grid or FlexTable child */
  columnsCount: _react.PropTypes.number.isRequired,

  /** Width of Grid or FlexTable child */
  width: _react.PropTypes.number.isRequired
};
exports.default = ColumnSizer;
},{"../Grid":39,"react":undefined,"react-addons-shallow-compare":52}],31:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ColumnSizer = exports.default = undefined;

var _ColumnSizer2 = require('./ColumnSizer');

var _ColumnSizer3 = _interopRequireDefault(_ColumnSizer2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _ColumnSizer3.default;
exports.ColumnSizer = _ColumnSizer3.default;
},{"./ColumnSizer":30}],32:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultCellRenderer = defaultCellRenderer;
exports.defaultCellDataGetter = defaultCellDataGetter;
exports.defaultHeaderRenderer = defaultHeaderRenderer;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SortIndicator = require('./SortIndicator');

var _SortIndicator2 = _interopRequireDefault(_SortIndicator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Default cell renderer that displays an attribute as a simple string
 * You should override the column's cellRenderer if your data is some other type of object.
 */
function defaultCellRenderer(cellData, cellDataKey, rowData, rowIndex, columnData) {
  if (cellData === null || cellData === undefined) {
    return '';
  } else {
    return String(cellData);
  }
}

/**
 * Default accessor for returning a cell value for a given attribute.
 * This function expects to operate on either a vanilla Object or an Immutable Map.
 * You should override the column's cellDataGetter if your data is some other type of object.
 */
function defaultCellDataGetter(dataKey, rowData, columnData) {
  if (rowData.get instanceof Function) {
    return rowData.get(dataKey);
  } else {
    return rowData[dataKey];
  }
}

/**
 * Default table header renderer.
 */
function defaultHeaderRenderer(_ref) {
  var columnData = _ref.columnData;
  var dataKey = _ref.dataKey;
  var disableSort = _ref.disableSort;
  var label = _ref.label;
  var sortBy = _ref.sortBy;
  var sortDirection = _ref.sortDirection;

  var showSortIndicator = sortBy === dataKey;
  var children = [_react2.default.createElement(
    'div',
    {
      className: 'FlexTable__headerTruncatedText',
      key: 'label',
      title: label
    },
    label
  )];

  if (showSortIndicator) {
    children.push(_react2.default.createElement(_SortIndicator2.default, {
      key: 'SortIndicator',
      sortDirection: sortDirection
    }));
  }

  return children;
}

/**
 * Describes the header and cell contents of a table column.
 */

var Column = function (_Component) {
  _inherits(Column, _Component);

  function Column() {
    _classCallCheck(this, Column);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Column).apply(this, arguments));
  }

  return Column;
}(_react.Component);

Column.defaultProps = {
  cellDataGetter: defaultCellDataGetter,
  cellRenderer: defaultCellRenderer,
  flexGrow: 0,
  flexShrink: 1,
  headerRenderer: defaultHeaderRenderer
};
Column.propTypes = {
  /** Optional aria-label value to set on the column header */
  'aria-label': _react.PropTypes.string,

  /** Optional CSS class to apply to cell */
  cellClassName: _react.PropTypes.string,

  /**
   * Callback responsible for returning a cell's data, given its :dataKey
   * (dataKey: string, rowData: any): any
   */
  cellDataGetter: _react.PropTypes.func,

  /**
   * Callback responsible for rendering a cell's contents.
   * (cellData: any, cellDataKey: string, rowData: any, rowIndex: number, columnData: any): element
   */
  cellRenderer: _react.PropTypes.func,

  /** Optional additional data passed to this column's :cellDataGetter */
  columnData: _react.PropTypes.object,

  /** Uniquely identifies the row-data attribute correspnding to this cell */
  dataKey: _react.PropTypes.any.isRequired,

  /** If sort is enabled for the table at large, disable it for this column */
  disableSort: _react.PropTypes.bool,

  /** Flex grow style; defaults to 0 */
  flexGrow: _react.PropTypes.number,

  /** Flex shrink style; defaults to 1 */
  flexShrink: _react.PropTypes.number,

  /** Optional CSS class to apply to this column's header */
  headerClassName: _react.PropTypes.string,

  /**
   * Optional callback responsible for rendering a column header contents.
   * ({ columnData: object, dataKey: string, disableSort: boolean, label: string, sortBy: string, sortDirection: string }): PropTypes.node
   */
  headerRenderer: _react.PropTypes.func.isRequired,

  /** Header label for this column */
  label: _react.PropTypes.string,

  /** Maximum width of column; this property will only be used if :flexGrow is > 0. */
  maxWidth: _react.PropTypes.number,

  /** Minimum width of column. */
  minWidth: _react.PropTypes.number,

  /** Flex basis (width) for this column; This value can grow or shrink based on :flexGrow and :flexShrink properties. */
  width: _react.PropTypes.number.isRequired
};
exports.default = Column;
},{"./SortIndicator":35,"react":undefined}],33:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _FlexColumn = require('./FlexColumn');

var _FlexColumn2 = _interopRequireDefault(_FlexColumn);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

var _Grid = require('../Grid');

var _Grid2 = _interopRequireDefault(_Grid);

var _SortDirection = require('./SortDirection');

var _SortDirection2 = _interopRequireDefault(_SortDirection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Table component with fixed headers and virtualized rows for improved performance with large data sets.
 * This component expects explicit width, height, and padding parameters.
 */

var FlexTable = function (_Component) {
  _inherits(FlexTable, _Component);

  function FlexTable(props) {
    _classCallCheck(this, FlexTable);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(FlexTable).call(this, props));

    _this.state = {
      scrollbarWidth: 0
    };

    _this._createRow = _this._createRow.bind(_this);
    return _this;
  }

  /**
   * See Grid#recomputeGridSize
   */


  _createClass(FlexTable, [{
    key: 'recomputeRowHeights',
    value: function recomputeRowHeights() {
      this.refs.Grid.recomputeGridSize();
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._setScrollbarWidth();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this._setScrollbarWidth();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props;
      var className = _props.className;
      var disableHeader = _props.disableHeader;
      var headerHeight = _props.headerHeight;
      var height = _props.height;
      var noRowsRenderer = _props.noRowsRenderer;
      var onRowsRendered = _props.onRowsRendered;
      var _onScroll = _props.onScroll;
      var overscanRowsCount = _props.overscanRowsCount;
      var rowClassName = _props.rowClassName;
      var rowHeight = _props.rowHeight;
      var rowsCount = _props.rowsCount;
      var scrollToIndex = _props.scrollToIndex;
      var scrollTop = _props.scrollTop;
      var width = _props.width;
      var scrollbarWidth = this.state.scrollbarWidth;


      var availableRowsHeight = height - headerHeight;

      // This row-renderer wrapper function is necessary in order to trigger re-render when the
      // sort-by or sort-direction have changed (else Grid will not see any props changes)
      var rowRenderer = function rowRenderer(index) {
        return _this2._createRow(index);
      };

      var rowClass = rowClassName instanceof Function ? rowClassName(-1) : rowClassName;

      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames2.default)('FlexTable', className)
        },
        !disableHeader && _react2.default.createElement(
          'div',
          {
            className: (0, _classnames2.default)('FlexTable__headerRow', rowClass),
            style: {
              height: headerHeight,
              paddingRight: scrollbarWidth,
              width: width
            }
          },
          this._getRenderedHeaderRow()
        ),
        _react2.default.createElement(_Grid2.default, {
          'aria-label': this.props['aria-label'],
          ref: 'Grid',
          className: 'FlexTable__Grid',
          columnWidth: width,
          columnsCount: 1,
          height: availableRowsHeight,
          noContentRenderer: noRowsRenderer,
          onScroll: function onScroll(_ref) {
            var clientHeight = _ref.clientHeight;
            var scrollHeight = _ref.scrollHeight;
            var scrollTop = _ref.scrollTop;
            return _onScroll({ clientHeight: clientHeight, scrollHeight: scrollHeight, scrollTop: scrollTop });
          },
          onSectionRendered: function onSectionRendered(_ref2) {
            var rowOverscanStartIndex = _ref2.rowOverscanStartIndex;
            var rowOverscanStopIndex = _ref2.rowOverscanStopIndex;
            var rowStartIndex = _ref2.rowStartIndex;
            var rowStopIndex = _ref2.rowStopIndex;
            return onRowsRendered({
              overscanStartIndex: rowOverscanStartIndex,
              overscanStopIndex: rowOverscanStopIndex,
              startIndex: rowStartIndex,
              stopIndex: rowStopIndex
            });
          },
          overscanRowsCount: overscanRowsCount,
          renderCell: function renderCell(_ref3) {
            var columnIndex = _ref3.columnIndex;
            var rowIndex = _ref3.rowIndex;
            return rowRenderer(rowIndex);
          },
          rowHeight: rowHeight,
          rowsCount: rowsCount,
          scrollToRow: scrollToIndex,
          scrollTop: scrollTop,
          width: width
        })
      );
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
    }
  }, {
    key: '_createColumn',
    value: function _createColumn(column, columnIndex, rowData, rowIndex) {
      var _column$props = column.props;
      var cellClassName = _column$props.cellClassName;
      var cellDataGetter = _column$props.cellDataGetter;
      var columnData = _column$props.columnData;
      var dataKey = _column$props.dataKey;
      var cellRenderer = _column$props.cellRenderer;

      var cellData = cellDataGetter(dataKey, rowData, columnData);
      var renderedCell = cellRenderer(cellData, dataKey, rowData, rowIndex, columnData);

      var style = this._getFlexStyleForColumn(column);

      var title = typeof renderedCell === 'string' ? renderedCell : null;

      return _react2.default.createElement(
        'div',
        {
          key: 'Row' + rowIndex + '-Col' + columnIndex,
          className: (0, _classnames2.default)('FlexTable__rowColumn', cellClassName),
          style: style
        },
        _react2.default.createElement(
          'div',
          {
            className: 'FlexTable__truncatedColumnText',
            title: title
          },
          renderedCell
        )
      );
    }
  }, {
    key: '_createHeader',
    value: function _createHeader(column, columnIndex) {
      var _props2 = this.props;
      var headerClassName = _props2.headerClassName;
      var onHeaderClick = _props2.onHeaderClick;
      var sort = _props2.sort;
      var sortBy = _props2.sortBy;
      var sortDirection = _props2.sortDirection;
      var _column$props2 = column.props;
      var dataKey = _column$props2.dataKey;
      var disableSort = _column$props2.disableSort;
      var headerRenderer = _column$props2.headerRenderer;
      var label = _column$props2.label;
      var columnData = _column$props2.columnData;

      var sortEnabled = !disableSort && sort;

      var classNames = (0, _classnames2.default)('FlexTable__headerColumn', headerClassName, column.props.headerClassName, {
        'FlexTable__sortableHeaderColumn': sortEnabled
      });
      var style = this._getFlexStyleForColumn(column);

      var renderedHeader = headerRenderer({
        columnData: columnData,
        dataKey: dataKey,
        disableSort: disableSort,
        label: label,
        sortBy: sortBy,
        sortDirection: sortDirection
      });

      var a11yProps = {};

      if (sortEnabled || onHeaderClick) {
        (function () {
          // If this is a sortable header, clicking it should update the table data's sorting.
          var newSortDirection = sortBy !== dataKey || sortDirection === _SortDirection2.default.DESC ? _SortDirection2.default.ASC : _SortDirection2.default.DESC;

          var onClick = function onClick() {
            sortEnabled && sort(dataKey, newSortDirection);
            onHeaderClick && onHeaderClick(dataKey, columnData);
          };

          var onKeyDown = function onKeyDown(event) {
            if (event.key === 'Enter' || event.key === ' ') {
              onClick();
            }
          };

          a11yProps['aria-label'] = column.props['aria-label'] || label || dataKey;
          a11yProps.role = 'rowheader';
          a11yProps.tabIndex = 0;
          a11yProps.onClick = onClick;
          a11yProps.onKeyDown = onKeyDown;
        })();
      }

      return _react2.default.createElement(
        'div',
        _extends({}, a11yProps, {
          key: 'Header-Col' + columnIndex,
          className: classNames,
          style: style
        }),
        renderedHeader
      );
    }
  }, {
    key: '_createRow',
    value: function _createRow(rowIndex) {
      var _this3 = this;

      var _props3 = this.props;
      var children = _props3.children;
      var onRowClick = _props3.onRowClick;
      var rowClassName = _props3.rowClassName;
      var rowGetter = _props3.rowGetter;
      var scrollbarWidth = this.state.scrollbarWidth;


      var rowClass = rowClassName instanceof Function ? rowClassName(rowIndex) : rowClassName;
      var rowData = rowGetter(rowIndex);

      var renderedRow = _react2.default.Children.map(children, function (column, columnIndex) {
        return _this3._createColumn(column, columnIndex, rowData, rowIndex);
      });

      var a11yProps = {};

      if (onRowClick) {
        a11yProps['aria-label'] = 'row';
        a11yProps.role = 'row';
        a11yProps.tabIndex = 0;
        a11yProps.onClick = function () {
          return onRowClick(rowIndex);
        };
      }

      return _react2.default.createElement(
        'div',
        _extends({}, a11yProps, {
          key: rowIndex,
          className: (0, _classnames2.default)('FlexTable__row', rowClass),
          style: {
            height: this._getRowHeight(rowIndex),
            paddingRight: scrollbarWidth
          }
        }),
        renderedRow
      );
    }

    /**
     * Determines the flex-shrink, flex-grow, and width values for a cell (header or column).
     */

  }, {
    key: '_getFlexStyleForColumn',
    value: function _getFlexStyleForColumn(column) {
      var flexValue = column.props.flexGrow + ' ' + column.props.flexShrink + ' ' + column.props.width + 'px';

      var style = {
        flex: flexValue,
        msFlex: flexValue,
        WebkitFlex: flexValue
      };

      if (column.props.maxWidth) {
        style.maxWidth = column.props.maxWidth;
      }

      if (column.props.minWidth) {
        style.minWidth = column.props.minWidth;
      }

      return style;
    }
  }, {
    key: '_getRenderedHeaderRow',
    value: function _getRenderedHeaderRow() {
      var _this4 = this;

      var _props4 = this.props;
      var children = _props4.children;
      var disableHeader = _props4.disableHeader;

      var items = disableHeader ? [] : children;

      return _react2.default.Children.map(items, function (column, index) {
        return _this4._createHeader(column, index);
      });
    }
  }, {
    key: '_getRowHeight',
    value: function _getRowHeight(rowIndex) {
      var rowHeight = this.props.rowHeight;


      return rowHeight instanceof Function ? rowHeight(rowIndex) : rowHeight;
    }
  }, {
    key: '_setScrollbarWidth',
    value: function _setScrollbarWidth() {
      var Grid = (0, _reactDom.findDOMNode)(this.refs.Grid);
      var clientWidth = Grid.clientWidth || 0;
      var offsetWidth = Grid.offsetWidth || 0;
      var scrollbarWidth = offsetWidth - clientWidth;

      this.setState({ scrollbarWidth: scrollbarWidth });
    }
  }]);

  return FlexTable;
}(_react.Component);

FlexTable.propTypes = {
  'aria-label': _react.PropTypes.string,

  /** One or more FlexColumns describing the data displayed in this row */
  children: function children(props, propName, componentName) {
    var children = _react2.default.Children.toArray(props.children);
    for (var i = 0; i < children.length; i++) {
      if (children[i].type !== _FlexColumn2.default) {
        return new Error('FlexTable only accepts children of type FlexColumn');
      }
    }
  },

  /** Optional CSS class name */
  className: _react.PropTypes.string,

  /** Disable rendering the header at all */
  disableHeader: _react.PropTypes.bool,

  /** Optional CSS class to apply to all column headers */
  headerClassName: _react.PropTypes.string,

  /** Fixed height of header row */
  headerHeight: _react.PropTypes.number.isRequired,

  /** Fixed/available height for out DOM element */
  height: _react.PropTypes.number.isRequired,

  /** Optional renderer to be used in place of table body rows when rowsCount is 0 */
  noRowsRenderer: _react.PropTypes.func,

  /**
  * Optional callback when a column's header is clicked.
  * (dataKey: string): void
  */
  onHeaderClick: _react.PropTypes.func,

  /**
   * Callback invoked when a user clicks on a table row.
   * (rowIndex: number): void
   */
  onRowClick: _react.PropTypes.func,

  /**
   * Callback invoked with information about the slice of rows that were just rendered.
   * ({ startIndex, stopIndex }): void
   */
  onRowsRendered: _react.PropTypes.func,

  /**
   * Callback invoked whenever the scroll offset changes within the inner scrollable region.
   * This callback can be used to sync scrolling between lists, tables, or grids.
   * ({ clientHeight, scrollHeight, scrollTop }): void
   */
  onScroll: _react.PropTypes.func.isRequired,

  /**
   * Number of rows to render above/below the visible bounds of the list.
   * These rows can help for smoother scrolling on touch devices.
   */
  overscanRowsCount: _react.PropTypes.number.isRequired,

  /**
   * Optional CSS class to apply to all table rows (including the header row).
   * This property can be a CSS class name (string) or a function that returns a class name.
   * If a function is provided its signature should be: (rowIndex: number): string
   */
  rowClassName: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.func]),

  /**
   * Callback responsible for returning a data row given an index.
   * (index: number): any
   */
  rowGetter: _react.PropTypes.func.isRequired,

  /**
   * Either a fixed row height (number) or a function that returns the height of a row given its index.
   * (index: number): number
   */
  rowHeight: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.func]).isRequired,

  /** Number of rows in table. */
  rowsCount: _react.PropTypes.number.isRequired,

  /** Row index to ensure visible (by forcefully scrolling if necessary) */
  scrollToIndex: _react.PropTypes.number,

  /** Vertical offset. */
  scrollTop: _react.PropTypes.number,

  /**
   * Sort function to be called if a sortable header is clicked.
   * (dataKey: string, sortDirection: SortDirection): void
   */
  sort: _react.PropTypes.func,

  /** FlexTable data is currently sorted by this :dataKey (if it is sorted at all) */
  sortBy: _react.PropTypes.string,

  /** FlexTable data is currently sorted in this direction (if it is sorted at all) */
  sortDirection: _react.PropTypes.oneOf([_SortDirection2.default.ASC, _SortDirection2.default.DESC]),

  /** Width of list */
  width: _react.PropTypes.number.isRequired
};
FlexTable.defaultProps = {
  disableHeader: false,
  headerHeight: 0,
  noRowsRenderer: function noRowsRenderer() {
    return null;
  },
  onRowsRendered: function onRowsRendered() {
    return null;
  },
  onScroll: function onScroll() {
    return null;
  },
  overscanRowsCount: 10
};
exports.default = FlexTable;
},{"../Grid":39,"./FlexColumn":32,"./SortDirection":34,"classnames":undefined,"react":undefined,"react-addons-shallow-compare":52,"react-dom":undefined}],34:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var SortDirection = {
  /**
   * Sort items in ascending order.
   * This means arranging from the lowest value to the highest (e.g. a-z, 0-9).
   */
  ASC: 'ASC',

  /**
   * Sort items in descending order.
   * This means arranging from the highest value to the lowest (e.g. z-a, 9-0).
   */
  DESC: 'DESC'
};

exports.default = SortDirection;
},{}],35:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SortIndicator;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _SortDirection = require('./SortDirection');

var _SortDirection2 = _interopRequireDefault(_SortDirection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Displayed beside a header to indicate that a FlexTable is currently sorted by this column.
 */
function SortIndicator(_ref) {
  var sortDirection = _ref.sortDirection;

  var classNames = (0, _classnames2.default)('FlexTable__sortableHeaderIcon', {
    'FlexTable__sortableHeaderIcon--ASC': sortDirection === _SortDirection2.default.ASC,
    'FlexTable__sortableHeaderIcon--DESC': sortDirection === _SortDirection2.default.DESC
  });

  return _react2.default.createElement(
    'svg',
    {
      className: classNames,
      width: 18,
      height: 18,
      viewBox: '0 0 24 24',
      xmlns: 'http://www.w3.org/2000/svg'
    },
    sortDirection === _SortDirection2.default.ASC ? _react2.default.createElement('path', { d: 'M7 14l5-5 5 5z' }) : _react2.default.createElement('path', { d: 'M7 10l5 5 5-5z' }),
    _react2.default.createElement('path', { d: 'M0 0h24v24H0z', fill: 'none' })
  );
}
SortIndicator.propTypes = {
  sortDirection: _react.PropTypes.oneOf([_SortDirection2.default.ASC, _SortDirection2.default.DESC])
};
},{"./SortDirection":34,"classnames":undefined,"react":undefined}],36:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SortIndicator = exports.SortDirection = exports.FlexColumn = exports.FlexTable = exports.default = undefined;

var _FlexTable2 = require('./FlexTable');

var _FlexTable3 = _interopRequireDefault(_FlexTable2);

var _FlexColumn2 = require('./FlexColumn');

var _FlexColumn3 = _interopRequireDefault(_FlexColumn2);

var _SortDirection2 = require('./SortDirection');

var _SortDirection3 = _interopRequireDefault(_SortDirection2);

var _SortIndicator2 = require('./SortIndicator');

var _SortIndicator3 = _interopRequireDefault(_SortIndicator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _FlexTable3.default;
exports.FlexTable = _FlexTable3.default;
exports.FlexColumn = _FlexColumn3.default;
exports.SortDirection = _SortDirection3.default;
exports.SortIndicator = _SortIndicator3.default;
},{"./FlexColumn":32,"./FlexTable":33,"./SortDirection":34,"./SortIndicator":35}],37:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GridUtils = require('./GridUtils');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _raf = require('raf');

var _raf2 = _interopRequireDefault(_raf);

var _scrollbarSize = require('dom-helpers/util/scrollbarSize');

var _scrollbarSize2 = _interopRequireDefault(_scrollbarSize);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Specifies the number of miliseconds during which to disable pointer events while a scroll is in progress.
 * This improves performance and makes scrolling smoother.
 */
var IS_SCROLLING_TIMEOUT = 150;

/**
 * Controls whether the Grid updates the DOM element's scrollLeft/scrollTop based on the current state or just observes it.
 * This prevents Grid from interrupting mouse-wheel animations (see issue #2).
 */
var SCROLL_POSITION_CHANGE_REASONS = {
  OBSERVED: 'observed',
  REQUESTED: 'requested'
};

/**
 * Renders tabular data with virtualization along the vertical and horizontal axes.
 * Row heights and column widths must be known ahead of time and specified as properties.
 */

var Grid = function (_Component) {
  _inherits(Grid, _Component);

  function Grid(props, context) {
    _classCallCheck(this, Grid);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Grid).call(this, props, context));

    _this.state = {
      computeGridMetadataOnNextUpdate: false,
      isScrolling: false,
      scrollLeft: 0,
      scrollTop: 0
    };

    // Invokes onSectionRendered callback only when start/stop row or column indices change
    _this._onGridRenderedMemoizer = (0, _GridUtils.createCallbackMemoizer)();
    _this._onScrollMemoizer = (0, _GridUtils.createCallbackMemoizer)(false);

    // Bind functions to instance so they don't lose context when passed around
    _this._computeColumnMetadata = _this._computeColumnMetadata.bind(_this);
    _this._computeRowMetadata = _this._computeRowMetadata.bind(_this);
    _this._invokeOnGridRenderedHelper = _this._invokeOnGridRenderedHelper.bind(_this);
    _this._onScroll = _this._onScroll.bind(_this);
    _this._updateScrollLeftForScrollToColumn = _this._updateScrollLeftForScrollToColumn.bind(_this);
    _this._updateScrollTopForScrollToRow = _this._updateScrollTopForScrollToRow.bind(_this);
    return _this;
  }

  /**
   * Forced recompute of row heights and column widths.
   * This function should be called if dynamic column or row sizes have changed but nothing else has.
   * Since Grid only receives :columnsCount and :rowsCount it has no way of detecting when the underlying data changes.
   */


  _createClass(Grid, [{
    key: 'recomputeGridSize',
    value: function recomputeGridSize() {
      this.setState({
        computeGridMetadataOnNextUpdate: true
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props;
      var scrollLeft = _props.scrollLeft;
      var scrollToColumn = _props.scrollToColumn;
      var scrollTop = _props.scrollTop;
      var scrollToRow = _props.scrollToRow;


      this._scrollbarSize = (0, _scrollbarSize2.default)();

      if (scrollLeft >= 0 || scrollTop >= 0) {
        this._setScrollPosition({ scrollLeft: scrollLeft, scrollTop: scrollTop });
      }

      if (scrollToColumn >= 0 || scrollToRow >= 0) {
        this._updateScrollLeftForScrollToColumn();
        this._updateScrollTopForScrollToRow();
      }

      // Update onRowsRendered callback
      this._invokeOnGridRenderedHelper();

      // Initialize onScroll callback
      this._invokeOnScrollMemoizer({
        scrollLeft: scrollLeft || 0,
        scrollTop: scrollTop || 0,
        totalColumnsWidth: this._getTotalColumnsWidth(),
        totalRowsHeight: this._getTotalRowsHeight()
      });
    }

    /**
     * @private
     * This method updates scrollLeft/scrollTop in state for the following conditions:
     * 1) New scroll-to-cell props have been set
     */

  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      var _props2 = this.props;
      var columnsCount = _props2.columnsCount;
      var columnWidth = _props2.columnWidth;
      var height = _props2.height;
      var rowHeight = _props2.rowHeight;
      var rowsCount = _props2.rowsCount;
      var scrollToColumn = _props2.scrollToColumn;
      var scrollToRow = _props2.scrollToRow;
      var width = _props2.width;
      var _state = this.state;
      var scrollLeft = _state.scrollLeft;
      var scrollPositionChangeReason = _state.scrollPositionChangeReason;
      var scrollTop = _state.scrollTop;

      // Make sure requested changes to :scrollLeft or :scrollTop get applied.
      // Assigning to scrollLeft/scrollTop tells the browser to interrupt any running scroll animations,
      // And to discard any pending async changes to the scroll position that may have happened in the meantime (e.g. on a separate scrolling thread).
      // So we only set these when we require an adjustment of the scroll position.
      // See issue #2 for more information.

      if (scrollPositionChangeReason === SCROLL_POSITION_CHANGE_REASONS.REQUESTED) {
        if (scrollLeft >= 0 && scrollLeft !== prevState.scrollLeft && scrollLeft !== this.refs.scrollingContainer.scrollLeft) {
          this.refs.scrollingContainer.scrollLeft = scrollLeft;
        }
        if (scrollTop >= 0 && scrollTop !== prevState.scrollTop && scrollTop !== this.refs.scrollingContainer.scrollTop) {
          this.refs.scrollingContainer.scrollTop = scrollTop;
        }
      }

      // Update scroll offsets if the current :scrollToColumn or :scrollToRow values requires it
      (0, _GridUtils.updateScrollIndexHelper)({
        cellsCount: columnsCount,
        cellMetadata: this._columnMetadata,
        cellSize: columnWidth,
        previousCellsCount: prevProps.columnsCount,
        previousCellSize: prevProps.columnWidth,
        previousScrollToIndex: prevProps.scrollToColumn,
        previousSize: prevProps.width,
        scrollOffset: scrollLeft,
        scrollToIndex: scrollToColumn,
        size: width,
        updateScrollIndexCallback: this._updateScrollLeftForScrollToColumn
      });
      (0, _GridUtils.updateScrollIndexHelper)({
        cellsCount: rowsCount,
        cellMetadata: this._rowMetadata,
        cellSize: rowHeight,
        previousCellsCount: prevProps.rowsCount,
        previousCellSize: prevProps.rowHeight,
        previousScrollToIndex: prevProps.scrollToRow,
        previousSize: prevProps.height,
        scrollOffset: scrollTop,
        scrollToIndex: scrollToRow,
        size: height,
        updateScrollIndexCallback: this._updateScrollTopForScrollToRow
      });

      // Update onRowsRendered callback if start/stop indices have changed
      this._invokeOnGridRenderedHelper();
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      this._computeColumnMetadata(this.props);
      this._computeRowMetadata(this.props);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this._disablePointerEventsTimeoutId) {
        clearTimeout(this._disablePointerEventsTimeoutId);
      }

      if (this._setNextStateAnimationFrameId) {
        _raf2.default.cancel(this._setNextStateAnimationFrameId);
      }
    }

    /**
     * @private
     * This method updates scrollLeft/scrollTop in state for the following conditions:
     * 1) Empty content (0 rows or columns)
     * 2) New scroll props overriding the current state
     * 3) Cells-count or cells-size has changed, making previous scroll offsets invalid
     */

  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      if (nextProps.columnsCount === 0 && nextState.scrollLeft !== 0 || nextProps.rowsCount === 0 && nextState.scrollTop !== 0) {
        this._setScrollPosition({
          scrollLeft: 0,
          scrollTop: 0
        });
      } else if (nextProps.scrollLeft !== this.props.scrollLeft || nextProps.scrollTop !== this.props.scrollTop) {
        this._setScrollPosition({
          scrollLeft: nextProps.scrollLeft,
          scrollTop: nextProps.scrollTop
        });
      }

      // Update scroll offsets if the size or number of cells have changed, invalidating the previous value
      (0, _GridUtils.computeCellMetadataAndUpdateScrollOffsetHelper)({
        cellsCount: this.props.columnsCount,
        cellSize: this.props.columnWidth,
        computeMetadataCallback: this._computeColumnMetadata,
        computeMetadataCallbackProps: nextProps,
        computeMetadataOnNextUpdate: nextState.computeGridMetadataOnNextUpdate,
        nextCellsCount: nextProps.columnsCount,
        nextCellSize: nextProps.columnWidth,
        nextScrollToIndex: nextProps.scrollToColumn,
        scrollToIndex: this.props.scrollToColumn,
        updateScrollOffsetForScrollToIndex: this._updateScrollLeftForScrollToColumn
      });
      (0, _GridUtils.computeCellMetadataAndUpdateScrollOffsetHelper)({
        cellsCount: this.props.rowsCount,
        cellSize: this.props.rowHeight,
        computeMetadataCallback: this._computeRowMetadata,
        computeMetadataCallbackProps: nextProps,
        computeMetadataOnNextUpdate: nextState.computeGridMetadataOnNextUpdate,
        nextCellsCount: nextProps.rowsCount,
        nextCellSize: nextProps.rowHeight,
        nextScrollToIndex: nextProps.scrollToRow,
        scrollToIndex: this.props.scrollToRow,
        updateScrollOffsetForScrollToIndex: this._updateScrollTopForScrollToRow
      });

      this.setState({
        computeGridMetadataOnNextUpdate: false
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props;
      var className = _props3.className;
      var columnsCount = _props3.columnsCount;
      var height = _props3.height;
      var noContentRenderer = _props3.noContentRenderer;
      var overscanColumnsCount = _props3.overscanColumnsCount;
      var overscanRowsCount = _props3.overscanRowsCount;
      var renderCell = _props3.renderCell;
      var renderCellRanges = _props3.renderCellRanges;
      var rowsCount = _props3.rowsCount;
      var width = _props3.width;
      var _state2 = this.state;
      var isScrolling = _state2.isScrolling;
      var scrollLeft = _state2.scrollLeft;
      var scrollTop = _state2.scrollTop;


      var childrenToDisplay = [];

      // Render only enough columns and rows to cover the visible area of the grid.
      if (height > 0 && width > 0) {
        var visibleColumnIndices = (0, _GridUtils.getVisibleCellIndices)({
          cellsCount: columnsCount,
          cellMetadata: this._columnMetadata,
          containerSize: width,
          currentOffset: scrollLeft
        });

        var visibleRowIndices = (0, _GridUtils.getVisibleCellIndices)({
          cellsCount: rowsCount,
          cellMetadata: this._rowMetadata,
          containerSize: height,
          currentOffset: scrollTop
        });

        // Store for _invokeOnGridRenderedHelper()
        this._renderedColumnStartIndex = visibleColumnIndices.start;
        this._renderedColumnStopIndex = visibleColumnIndices.stop;
        this._renderedRowStartIndex = visibleRowIndices.start;
        this._renderedRowStopIndex = visibleRowIndices.stop;

        var overscanColumnIndices = (0, _GridUtils.getOverscanIndices)({
          cellsCount: columnsCount,
          overscanCellsCount: overscanColumnsCount,
          startIndex: this._renderedColumnStartIndex,
          stopIndex: this._renderedColumnStopIndex
        });

        var overscanRowIndices = (0, _GridUtils.getOverscanIndices)({
          cellsCount: rowsCount,
          overscanCellsCount: overscanRowsCount,
          startIndex: this._renderedRowStartIndex,
          stopIndex: this._renderedRowStopIndex
        });

        // Store for _invokeOnGridRenderedHelper()
        this._columnStartIndex = overscanColumnIndices.overscanStartIndex;
        this._columnStopIndex = overscanColumnIndices.overscanStopIndex;
        this._rowStartIndex = overscanRowIndices.overscanStartIndex;
        this._rowStopIndex = overscanRowIndices.overscanStopIndex;

        childrenToDisplay = renderCellRanges({
          columnMetadata: this._columnMetadata,
          columnStartIndex: this._columnStartIndex,
          columnStopIndex: this._columnStopIndex,
          renderCell: renderCell,
          rowMetadata: this._rowMetadata,
          rowStartIndex: this._rowStartIndex,
          rowStopIndex: this._rowStopIndex
        });
      }

      var gridStyle = {
        height: height,
        width: width
      };

      var totalColumnsWidth = this._getTotalColumnsWidth();
      var totalRowsHeight = this._getTotalRowsHeight();

      // Force browser to hide scrollbars when we know they aren't necessary.
      // Otherwise once scrollbars appear they may not disappear again.
      // For more info see issue #116
      if (totalColumnsWidth <= width) {
        gridStyle.overflowX = 'hidden';
      }

      if (totalRowsHeight <= height) {
        gridStyle.overflowY = 'hidden';
      }

      return _react2.default.createElement(
        'div',
        {
          ref: 'scrollingContainer',
          'aria-label': this.props['aria-label'],
          className: (0, _classnames2.default)('Grid', className),
          onScroll: this._onScroll,
          role: 'grid',
          style: gridStyle,
          tabIndex: 0
        },
        childrenToDisplay.length > 0 && _react2.default.createElement(
          'div',
          {
            className: 'Grid__innerScrollContainer',
            style: {
              width: totalColumnsWidth,
              height: totalRowsHeight,
              maxWidth: totalColumnsWidth,
              maxHeight: totalRowsHeight,
              pointerEvents: isScrolling ? 'none' : 'auto'
            }
          },
          childrenToDisplay
        ),
        childrenToDisplay.length === 0 && noContentRenderer()
      );
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
    }

    /* ---------------------------- Helper methods ---------------------------- */

  }, {
    key: '_computeColumnMetadata',
    value: function _computeColumnMetadata(props) {
      var columnsCount = props.columnsCount;
      var columnWidth = props.columnWidth;


      this._columnMetadata = (0, _GridUtils.initCellMetadata)({
        cellsCount: columnsCount,
        size: columnWidth
      });
    }
  }, {
    key: '_computeRowMetadata',
    value: function _computeRowMetadata(props) {
      var rowHeight = props.rowHeight;
      var rowsCount = props.rowsCount;


      this._rowMetadata = (0, _GridUtils.initCellMetadata)({
        cellsCount: rowsCount,
        size: rowHeight
      });
    }

    /**
     * Sets an :isScrolling flag for a small window of time.
     * This flag is used to disable pointer events on the scrollable portion of the Grid.
     * This prevents jerky/stuttery mouse-wheel scrolling.
     */

  }, {
    key: '_enablePointerEventsAfterDelay',
    value: function _enablePointerEventsAfterDelay() {
      var _this2 = this;

      if (this._disablePointerEventsTimeoutId) {
        clearTimeout(this._disablePointerEventsTimeoutId);
      }

      this._disablePointerEventsTimeoutId = setTimeout(function () {
        _this2._disablePointerEventsTimeoutId = null;
        _this2.setState({
          isScrolling: false
        });
      }, IS_SCROLLING_TIMEOUT);
    }
  }, {
    key: '_getTotalColumnsWidth',
    value: function _getTotalColumnsWidth() {
      if (this._columnMetadata.length === 0) {
        return 0;
      }

      var datum = this._columnMetadata[this._columnMetadata.length - 1];
      return datum.offset + datum.size;
    }
  }, {
    key: '_getTotalRowsHeight',
    value: function _getTotalRowsHeight() {
      if (this._rowMetadata.length === 0) {
        return 0;
      }

      var datum = this._rowMetadata[this._rowMetadata.length - 1];
      return datum.offset + datum.size;
    }
  }, {
    key: '_invokeOnGridRenderedHelper',
    value: function _invokeOnGridRenderedHelper() {
      var onSectionRendered = this.props.onSectionRendered;


      this._onGridRenderedMemoizer({
        callback: onSectionRendered,
        indices: {
          columnOverscanStartIndex: this._columnStartIndex,
          columnOverscanStopIndex: this._columnStopIndex,
          columnStartIndex: this._renderedColumnStartIndex,
          columnStopIndex: this._renderedColumnStopIndex,
          rowOverscanStartIndex: this._rowStartIndex,
          rowOverscanStopIndex: this._rowStopIndex,
          rowStartIndex: this._renderedRowStartIndex,
          rowStopIndex: this._renderedRowStopIndex
        }
      });
    }
  }, {
    key: '_invokeOnScrollMemoizer',
    value: function _invokeOnScrollMemoizer(_ref) {
      var scrollLeft = _ref.scrollLeft;
      var scrollTop = _ref.scrollTop;
      var totalColumnsWidth = _ref.totalColumnsWidth;
      var totalRowsHeight = _ref.totalRowsHeight;
      var _props4 = this.props;
      var height = _props4.height;
      var onScroll = _props4.onScroll;
      var width = _props4.width;


      this._onScrollMemoizer({
        callback: function callback(_ref2) {
          var scrollLeft = _ref2.scrollLeft;
          var scrollTop = _ref2.scrollTop;

          onScroll({
            clientHeight: height,
            clientWidth: width,
            scrollHeight: totalRowsHeight,
            scrollLeft: scrollLeft,
            scrollTop: scrollTop,
            scrollWidth: totalColumnsWidth
          });
        },
        indices: {
          scrollLeft: scrollLeft,
          scrollTop: scrollTop
        }
      });
    }

    /**
     * Updates the state during the next animation frame.
     * Use this method to avoid multiple renders in a small span of time.
     * This helps performance for bursty events (like onScroll).
     */

  }, {
    key: '_setNextState',
    value: function _setNextState(state) {
      var _this3 = this;

      if (this._setNextStateAnimationFrameId) {
        _raf2.default.cancel(this._setNextStateAnimationFrameId);
      }

      this._setNextStateAnimationFrameId = (0, _raf2.default)(function () {
        _this3._setNextStateAnimationFrameId = null;
        _this3.setState(state);
      });
    }
  }, {
    key: '_setScrollPosition',
    value: function _setScrollPosition(_ref3) {
      var scrollLeft = _ref3.scrollLeft;
      var scrollTop = _ref3.scrollTop;

      var newState = {
        scrollPositionChangeReason: SCROLL_POSITION_CHANGE_REASONS.REQUESTED
      };

      if (scrollLeft >= 0) {
        newState.scrollLeft = scrollLeft;
      }

      if (scrollTop >= 0) {
        newState.scrollTop = scrollTop;
      }

      if (scrollLeft >= 0 && scrollLeft !== this.state.scrollLeft || scrollTop >= 0 && scrollTop !== this.state.scrollTop) {
        this.setState(newState);
      }
    }
  }, {
    key: '_updateScrollLeftForScrollToColumn',
    value: function _updateScrollLeftForScrollToColumn(scrollToColumnOverride) {
      var scrollToColumn = scrollToColumnOverride != null ? scrollToColumnOverride : this.props.scrollToColumn;

      var width = this.props.width;
      var scrollLeft = this.state.scrollLeft;


      if (scrollToColumn >= 0) {
        var calculatedScrollLeft = (0, _GridUtils.getUpdatedOffsetForIndex)({
          cellMetadata: this._columnMetadata,
          containerSize: width,
          currentOffset: scrollLeft,
          targetIndex: scrollToColumn
        });

        if (scrollLeft !== calculatedScrollLeft) {
          this._setScrollPosition({
            scrollLeft: calculatedScrollLeft
          });
        }
      }
    }
  }, {
    key: '_updateScrollTopForScrollToRow',
    value: function _updateScrollTopForScrollToRow(scrollToRowOverride) {
      var scrollToRow = scrollToRowOverride != null ? scrollToRowOverride : this.props.scrollToRow;

      var height = this.props.height;
      var scrollTop = this.state.scrollTop;


      if (scrollToRow >= 0) {
        var calculatedScrollTop = (0, _GridUtils.getUpdatedOffsetForIndex)({
          cellMetadata: this._rowMetadata,
          containerSize: height,
          currentOffset: scrollTop,
          targetIndex: scrollToRow
        });

        if (scrollTop !== calculatedScrollTop) {
          this._setScrollPosition({
            scrollTop: calculatedScrollTop
          });
        }
      }
    }
  }, {
    key: '_onScroll',
    value: function _onScroll(event) {
      // In certain edge-cases React dispatches an onScroll event with an invalid target.scrollLeft / target.scrollTop.
      // This invalid event can be detected by comparing event.target to this component's scrollable DOM element.
      // See issue #404 for more information.
      if (event.target !== this.refs.scrollingContainer) {
        return;
      }

      // Prevent pointer events from interrupting a smooth scroll
      this._enablePointerEventsAfterDelay();

      // When this component is shrunk drastically, React dispatches a series of back-to-back scroll events,
      // Gradually converging on a scrollTop that is within the bounds of the new, smaller height.
      // This causes a series of rapid renders that is slow for long lists.
      // We can avoid that by doing some simple bounds checking to ensure that scrollTop never exceeds the total height.
      var _props5 = this.props;
      var height = _props5.height;
      var width = _props5.width;

      var scrollbarSize = this._scrollbarSize;
      var totalRowsHeight = this._getTotalRowsHeight();
      var totalColumnsWidth = this._getTotalColumnsWidth();
      var scrollLeft = Math.min(totalColumnsWidth - width + scrollbarSize, event.target.scrollLeft);
      var scrollTop = Math.min(totalRowsHeight - height + scrollbarSize, event.target.scrollTop);

      // Certain devices (like Apple touchpad) rapid-fire duplicate events.
      // Don't force a re-render if this is the case.
      // The mouse may move faster then the animation frame does.
      // Use requestAnimationFrame to avoid over-updating.
      if (this.state.scrollLeft !== scrollLeft || this.state.scrollTop !== scrollTop) {
        // Browsers with cancelable scroll events (eg. Firefox) interrupt scrolling animations if scrollTop/scrollLeft is set.
        // Other browsers (eg. Safari) don't scroll as well without the help under certain conditions (DOM or style changes during scrolling).
        // All things considered, this seems to be the best current work around that I'm aware of.
        // For more information see https://github.com/bvaughn/react-virtualized/pull/124
        var scrollPositionChangeReason = event.cancelable ? SCROLL_POSITION_CHANGE_REASONS.OBSERVED : SCROLL_POSITION_CHANGE_REASONS.REQUESTED;

        if (!this.state.isScrolling) {
          this.setState({
            isScrolling: true
          });
        }

        this._setNextState({
          isScrolling: true,
          scrollLeft: scrollLeft,
          scrollPositionChangeReason: scrollPositionChangeReason,
          scrollTop: scrollTop
        });
      }

      this._invokeOnScrollMemoizer({ scrollLeft: scrollLeft, scrollTop: scrollTop, totalColumnsWidth: totalColumnsWidth, totalRowsHeight: totalRowsHeight });
    }
  }]);

  return Grid;
}(_react.Component);

Grid.propTypes = {
  'aria-label': _react.PropTypes.string,

  /**
   * Optional custom CSS class name to attach to root Grid element.
   */
  className: _react.PropTypes.string,

  /**
   * Number of columns in grid.
   */
  columnsCount: _react.PropTypes.number.isRequired,

  /**
   * Either a fixed column width (number) or a function that returns the width of a column given its index.
   * Should implement the following interface: (index: number): number
   */
  columnWidth: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.func]).isRequired,

  /**
   * Height of Grid; this property determines the number of visible (vs virtualized) rows.
   */
  height: _react.PropTypes.number.isRequired,

  /**
   * Optional renderer to be used in place of rows when either :rowsCount or :columnsCount is 0.
   */
  noContentRenderer: _react.PropTypes.func.isRequired,

  /**
   * Callback invoked whenever the scroll offset changes within the inner scrollable region.
   * This callback can be used to sync scrolling between lists, tables, or grids.
   * ({ clientHeight, clientWidth, scrollHeight, scrollLeft, scrollTop, scrollWidth }): void
   */
  onScroll: _react.PropTypes.func.isRequired,

  /**
   * Callback invoked with information about the section of the Grid that was just rendered.
   * ({ columnStartIndex, columnStopIndex, rowStartIndex, rowStopIndex }): void
   */
  onSectionRendered: _react.PropTypes.func.isRequired,

  /**
   * Number of columns to render before/after the visible section of the grid.
   * These columns can help for smoother scrolling on touch devices or browsers that send scroll events infrequently.
   */
  overscanColumnsCount: _react.PropTypes.number.isRequired,

  /**
   * Number of rows to render above/below the visible section of the grid.
   * These rows can help for smoother scrolling on touch devices or browsers that send scroll events infrequently.
   */
  overscanRowsCount: _react.PropTypes.number.isRequired,

  /**
   * Responsible for rendering a cell given an row and column index.
   * Should implement the following interface: ({ columnIndex: number, rowIndex: number }): PropTypes.node
   */
  renderCell: _react.PropTypes.func.isRequired,

  /**
   * Responsible for rendering a group of cells given their index ranges.
   * Should implement the following interface: ({
   *   columnMetadata:Array<Object>,
   *   columnStartIndex: number,
   *   columnStopIndex: number,
   *   renderCell: Function,
   *   rowMetadata:Array<Object>,
   *   rowStartIndex: number,
   *   rowStopIndex: number
   * }): Array<PropTypes.node>
   */
  renderCellRanges: _react.PropTypes.func.isRequired,

  /**
   * Either a fixed row height (number) or a function that returns the height of a row given its index.
   * Should implement the following interface: (index: number): number
   */
  rowHeight: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.func]).isRequired,

  /**
   * Number of rows in grid.
   */
  rowsCount: _react.PropTypes.number.isRequired,

  /** Horizontal offset. */
  scrollLeft: _react.PropTypes.number,

  /**
   * Column index to ensure visible (by forcefully scrolling if necessary)
   */
  scrollToColumn: _react.PropTypes.number,

  /** Vertical offset. */
  scrollTop: _react.PropTypes.number,

  /**
   * Row index to ensure visible (by forcefully scrolling if necessary)
   */
  scrollToRow: _react.PropTypes.number,

  /**
   * Width of Grid; this property determines the number of visible (vs virtualized) columns.
   */
  width: _react.PropTypes.number.isRequired
};
Grid.defaultProps = {
  'aria-label': 'grid',
  noContentRenderer: function noContentRenderer() {
    return null;
  },
  onScroll: function onScroll() {
    return null;
  },
  onSectionRendered: function onSectionRendered() {
    return null;
  },
  overscanColumnsCount: 0,
  overscanRowsCount: 10,
  renderCellRanges: defaultRenderCellRanges
};
exports.default = Grid;


function defaultRenderCellRanges(_ref4) {
  var columnMetadata = _ref4.columnMetadata;
  var columnStartIndex = _ref4.columnStartIndex;
  var columnStopIndex = _ref4.columnStopIndex;
  var renderCell = _ref4.renderCell;
  var rowMetadata = _ref4.rowMetadata;
  var rowStartIndex = _ref4.rowStartIndex;
  var rowStopIndex = _ref4.rowStopIndex;

  var renderedCells = [];

  for (var rowIndex = rowStartIndex; rowIndex <= rowStopIndex; rowIndex++) {
    var rowDatum = rowMetadata[rowIndex];

    for (var columnIndex = columnStartIndex; columnIndex <= columnStopIndex; columnIndex++) {
      var columnDatum = columnMetadata[columnIndex];
      var renderedCell = renderCell({ columnIndex: columnIndex, rowIndex: rowIndex });
      var key = rowIndex + '-' + columnIndex;

      // any other falsey value will be rendered
      // as a text node by React
      if (renderedCell == null || renderedCell === false) {
        continue;
      }

      var child = _react2.default.createElement(
        'div',
        {
          key: key,
          className: 'Grid__cell',
          style: {
            height: rowDatum.size,
            left: columnDatum.offset,
            top: rowDatum.offset,
            width: columnDatum.size
          }
        },
        renderedCell
      );

      renderedCells.push(child);
    }
  }

  return renderedCells;
}
},{"./GridUtils":38,"classnames":undefined,"dom-helpers/util/scrollbarSize":49,"raf":50,"react":undefined,"react-addons-shallow-compare":52}],38:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.computeCellMetadataAndUpdateScrollOffsetHelper = computeCellMetadataAndUpdateScrollOffsetHelper;
exports.createCallbackMemoizer = createCallbackMemoizer;
exports.findNearestCell = findNearestCell;
exports.getOverscanIndices = getOverscanIndices;
exports.getUpdatedOffsetForIndex = getUpdatedOffsetForIndex;
exports.getVisibleCellIndices = getVisibleCellIndices;
exports.initCellMetadata = initCellMetadata;
exports.updateScrollIndexHelper = updateScrollIndexHelper;
/**
 * Helper method that determines when to recalculate row or column metadata.
 *
 * @param cellsCount Number of rows or columns in the current axis
 * @param cellsSize Width or height of cells for the current axis
 * @param computeMetadataCallback Method to invoke if cell metadata should be recalculated
 * @param computeMetadataCallbackProps Parameters to pass to :computeMetadataCallback
 * @param computeMetadataOnNextUpdate Flag specifying that metadata should be recalculated
 * @param nextCellsCount Newly updated number of rows or columns in the current axis
 * @param nextCellsSize Newly updated width or height of cells for the current axis
 * @param nextScrollToIndex Newly updated scroll-to-index
 * @param scrollToIndex Scroll-to-index
 * @param updateScrollOffsetForScrollToIndex Callback to invoke if the scroll position should be recalculated
 */
function computeCellMetadataAndUpdateScrollOffsetHelper(_ref) {
  var cellsCount = _ref.cellsCount;
  var cellSize = _ref.cellSize;
  var computeMetadataCallback = _ref.computeMetadataCallback;
  var computeMetadataCallbackProps = _ref.computeMetadataCallbackProps;
  var computeMetadataOnNextUpdate = _ref.computeMetadataOnNextUpdate;
  var nextCellsCount = _ref.nextCellsCount;
  var nextCellSize = _ref.nextCellSize;
  var nextScrollToIndex = _ref.nextScrollToIndex;
  var scrollToIndex = _ref.scrollToIndex;
  var updateScrollOffsetForScrollToIndex = _ref.updateScrollOffsetForScrollToIndex;

  // Don't compare cell sizes if they are functions because inline functions would cause infinite loops.
  // In that event users should use the manual recompute methods to inform of changes.
  if (computeMetadataOnNextUpdate || cellsCount !== nextCellsCount || (typeof cellSize === 'number' || typeof nextCellSize === 'number') && cellSize !== nextCellSize) {
    computeMetadataCallback(computeMetadataCallbackProps);

    // Updated cell metadata may have hidden the previous scrolled-to item.
    // In this case we should also update the scrollTop to ensure it stays visible.
    if (scrollToIndex >= 0 && scrollToIndex === nextScrollToIndex) {
      updateScrollOffsetForScrollToIndex();
    }
  }
}

/**
 * Helper utility that updates the specified callback whenever any of the specified indices have changed.
 */
function createCallbackMemoizer() {
  var requireAllKeys = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

  var cachedIndices = {};

  return function (_ref2) {
    var callback = _ref2.callback;
    var indices = _ref2.indices;

    var keys = Object.keys(indices);
    var allInitialized = !requireAllKeys || keys.every(function (key) {
      return indices[key] >= 0;
    });
    var indexChanged = keys.some(function (key) {
      return cachedIndices[key] !== indices[key];
    });

    cachedIndices = indices;

    if (allInitialized && indexChanged) {
      callback(indices);
    }
  };
}

/**
 * Binary search function inspired by react-infinite.
 */
function findNearestCell(_ref3) {
  var cellMetadata = _ref3.cellMetadata;
  var mode = _ref3.mode;
  var offset = _ref3.offset;

  var high = cellMetadata.length - 1;
  var low = 0;
  var middle = undefined;
  var currentOffset = undefined;

  // TODO Add better guards here against NaN offset

  while (low <= high) {
    middle = low + Math.floor((high - low) / 2);
    currentOffset = cellMetadata[middle].offset;

    if (currentOffset === offset) {
      return middle;
    } else if (currentOffset < offset) {
      low = middle + 1;
    } else if (currentOffset > offset) {
      high = middle - 1;
    }
  }

  if (mode === findNearestCell.EQUAL_OR_LOWER && low > 0) {
    return low - 1;
  } else if (mode === findNearestCell.EQUAL_OR_HIGHER && high < cellMetadata.length - 1) {
    return high + 1;
  }
}

findNearestCell.EQUAL_OR_LOWER = 1;
findNearestCell.EQUAL_OR_HIGHER = 2;

function getOverscanIndices(_ref4) {
  var cellsCount = _ref4.cellsCount;
  var overscanCellsCount = _ref4.overscanCellsCount;
  var startIndex = _ref4.startIndex;
  var stopIndex = _ref4.stopIndex;

  return {
    overscanStartIndex: Math.max(0, startIndex - overscanCellsCount),
    overscanStopIndex: Math.min(cellsCount - 1, stopIndex + overscanCellsCount)
  };
}

/**
 * Determines a new offset that ensures a certain cell is visible, given the current offset.
 * If the cell is already visible then the current offset will be returned.
 * If the current offset is too great or small, it will be adjusted just enough to ensure the specified index is visible.
 *
 * @param cellMetadata Metadata initially computed by initCellMetadata()
 * @param containerSize Total size (width or height) of the container
 * @param currentOffset Container's current (x or y) offset
 * @param targetIndex Index of target cell
 * @return Offset to use to ensure the specified cell is visible
 */
function getUpdatedOffsetForIndex(_ref5) {
  var cellMetadata = _ref5.cellMetadata;
  var containerSize = _ref5.containerSize;
  var currentOffset = _ref5.currentOffset;
  var targetIndex = _ref5.targetIndex;

  if (cellMetadata.length === 0) {
    return 0;
  }

  targetIndex = Math.max(0, Math.min(cellMetadata.length - 1, targetIndex));

  var datum = cellMetadata[targetIndex];
  var maxOffset = datum.offset;
  var minOffset = maxOffset - containerSize + datum.size;
  var newOffset = Math.max(minOffset, Math.min(maxOffset, currentOffset));

  return newOffset;
}

/**
 * Determines the range of cells to display for a given offset in order to fill the specified container.
 *
 * @param cellsCount Total number of cells.
 * @param cellMetadata Metadata initially computed by initCellMetadata()
 * @param containerSize Total size (width or height) of the container
 * @param currentOffset Container's current (x or y) offset
 * @return An object containing :start and :stop attributes, each specifying a cell index
 */
function getVisibleCellIndices(_ref6) {
  var cellsCount = _ref6.cellsCount;
  var cellMetadata = _ref6.cellMetadata;
  var containerSize = _ref6.containerSize;
  var currentOffset = _ref6.currentOffset;

  if (cellsCount === 0) {
    return {};
  }

  // TODO Add better guards here against NaN offset

  var lastDatum = cellMetadata[cellMetadata.length - 1];
  var totalCellSize = lastDatum.offset + lastDatum.size;

  // Ensure offset is within reasonable bounds
  currentOffset = Math.max(0, Math.min(totalCellSize - containerSize, currentOffset));

  var maxOffset = Math.min(totalCellSize, currentOffset + containerSize);

  var start = findNearestCell({
    cellMetadata: cellMetadata,
    mode: findNearestCell.EQUAL_OR_LOWER,
    offset: currentOffset
  });

  var datum = cellMetadata[start];
  currentOffset = datum.offset + datum.size;

  var stop = start;

  while (currentOffset < maxOffset && stop < cellsCount - 1) {
    stop++;

    currentOffset += cellMetadata[stop].size;
  }

  return {
    start: start,
    stop: stop
  };
}

/**
 * Initializes metadata for an axis and its cells.
 * This data is used to determine which cells are visible given a container size and scroll position.
 *
 * @param cellsCount Total number of cells.
 * @param size Either a fixed size or a function that returns the size for a given given an index.
 * @return Object mapping cell index to cell metadata (size, offset)
 */
function initCellMetadata(_ref7) {
  var cellsCount = _ref7.cellsCount;
  var size = _ref7.size;

  var sizeGetter = size instanceof Function ? size : function (index) {
    return size;
  };

  var cellMetadata = [];
  var offset = 0;

  for (var i = 0; i < cellsCount; i++) {
    var _size = sizeGetter(i);

    if (_size == null || isNaN(_size)) {
      throw Error('Invalid size returned for cell ' + i + ' of value ' + _size);
    }

    cellMetadata[i] = {
      size: _size,
      offset: offset
    };

    offset += _size;
  }

  return cellMetadata;
}

/**
 * Helper function that determines when to update scroll offsets to ensure that a scroll-to-index remains visible.
 *
 * @param cellMetadata Metadata initially computed by initCellMetadata()
 * @param cellsCount Number of rows or columns in the current axis
 * @param cellsSize Width or height of cells for the current axis
 * @param previousCellsCount Previous number of rows or columns
 * @param previousCellsSize Previous width or height of cells
 * @param previousScrollToIndex Previous scroll-to-index
 * @param previousSize Previous width or height of the virtualized container
 * @param scrollOffset Current scrollLeft or scrollTop
 * @param scrollToIndex Scroll-to-index
 * @param size Width or height of the virtualized container
 * @param updateScrollIndexCallback Callback to invoke with an optional scroll-to-index override
 */
function updateScrollIndexHelper(_ref8) {
  var cellMetadata = _ref8.cellMetadata;
  var cellsCount = _ref8.cellsCount;
  var cellSize = _ref8.cellSize;
  var previousCellsCount = _ref8.previousCellsCount;
  var previousCellSize = _ref8.previousCellSize;
  var previousScrollToIndex = _ref8.previousScrollToIndex;
  var previousSize = _ref8.previousSize;
  var scrollOffset = _ref8.scrollOffset;
  var scrollToIndex = _ref8.scrollToIndex;
  var size = _ref8.size;
  var updateScrollIndexCallback = _ref8.updateScrollIndexCallback;

  var hasScrollToIndex = scrollToIndex >= 0 && scrollToIndex < cellsCount;
  var sizeHasChanged = size !== previousSize || !previousCellSize || typeof cellSize === 'number' && cellSize !== previousCellSize;

  // If we have a new scroll target OR if height/row-height has changed,
  // We should ensure that the scroll target is visible.
  if (hasScrollToIndex && (sizeHasChanged || scrollToIndex !== previousScrollToIndex)) {
    updateScrollIndexCallback();

    // If we don't have a selected item but list size or number of children have decreased,
    // Make sure we aren't scrolled too far past the current content.
  } else if (!hasScrollToIndex && (size < previousSize || cellsCount < previousCellsCount)) {
      var calculatedScrollOffset = getUpdatedOffsetForIndex({
        cellMetadata: cellMetadata,
        containerSize: size,
        currentOffset: scrollOffset,
        targetIndex: cellsCount - 1
      });

      // Only adjust the scroll position if we've scrolled below the last set of rows.
      if (calculatedScrollOffset < scrollOffset) {
        updateScrollIndexCallback(cellsCount - 1);
      }
    }
}
},{}],39:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Grid = exports.default = undefined;

var _Grid2 = require('./Grid');

var _Grid3 = _interopRequireDefault(_Grid2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Grid3.default;
exports.Grid = _Grid3.default;
},{"./Grid":37}],40:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.isRangeVisible = isRangeVisible;
exports.scanForUnloadedRanges = scanForUnloadedRanges;

var _react = require('react');

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Higher-order component that manages lazy-loading for "infinite" data.
 * This component decorates a virtual component and just-in-time prefetches rows as a user scrolls.
 * It is intended as a convenience component; fork it if you'd like finer-grained control over data-loading.
 */

var InfiniteLoader = function (_Component) {
  _inherits(InfiniteLoader, _Component);

  function InfiniteLoader(props, context) {
    _classCallCheck(this, InfiniteLoader);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(InfiniteLoader).call(this, props, context));

    _this._onRowsRendered = _this._onRowsRendered.bind(_this);
    _this._registerChild = _this._registerChild.bind(_this);
    return _this;
  }

  _createClass(InfiniteLoader, [{
    key: 'render',
    value: function render() {
      var children = this.props.children;


      return children({
        onRowsRendered: this._onRowsRendered,
        registerChild: this._registerChild
      });
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
    }
  }, {
    key: '_onRowsRendered',
    value: function _onRowsRendered(_ref) {
      var _this2 = this;

      var startIndex = _ref.startIndex;
      var stopIndex = _ref.stopIndex;
      var _props = this.props;
      var isRowLoaded = _props.isRowLoaded;
      var loadMoreRows = _props.loadMoreRows;
      var rowsCount = _props.rowsCount;
      var threshold = _props.threshold;


      this._lastRenderedStartIndex = startIndex;
      this._lastRenderedStopIndex = stopIndex;

      var unloadedRanges = scanForUnloadedRanges({
        isRowLoaded: isRowLoaded,
        startIndex: Math.max(0, startIndex - threshold),
        stopIndex: Math.min(rowsCount, stopIndex + threshold)
      });

      unloadedRanges.forEach(function (unloadedRange) {
        var promise = loadMoreRows(unloadedRange);
        if (promise) {
          promise.then(function () {
            // Refresh the visible rows if any of them have just been loaded.
            // Otherwise they will remain in their unloaded visual state.
            if (isRangeVisible({
              lastRenderedStartIndex: _this2._lastRenderedStartIndex,
              lastRenderedStopIndex: _this2._lastRenderedStopIndex,
              startIndex: unloadedRange.startIndex,
              stopIndex: unloadedRange.stopIndex
            })) {
              if (_this2._registeredChild) {
                _this2._registeredChild.forceUpdate();
              }
            }
          });
        }
      });
    }
  }, {
    key: '_registerChild',
    value: function _registerChild(registeredChild) {
      this._registeredChild = registeredChild;
    }
  }]);

  return InfiniteLoader;
}(_react.Component);

/**
 * Determines if the specified start/stop range is visible based on the most recently rendered range.
 */


InfiniteLoader.propTypes = {
  /**
   * Function respondible for rendering a virtualized component.
   * This function should implement the following signature:
   * ({ onRowsRendered, registerChild }) => PropTypes.element
   *
   * The specified :onRowsRendered function should be passed through to the child's :onRowsRendered property.
   * The :registerChild callback should be set as the virtualized component's :ref.
   */
  children: _react.PropTypes.func.isRequired,

  /**
   * Function responsible for tracking the loaded state of each row.
   * It should implement the following signature: (index: number): boolean
   */
  isRowLoaded: _react.PropTypes.func.isRequired,

  /**
   * Callback to be invoked when more rows must be loaded.
   * It should implement the following signature: ({ startIndex, stopIndex }): Promise
   * The returned Promise should be resolved once row data has finished loading.
   * It will be used to determine when to refresh the list with the newly-loaded data.
   * This callback may be called multiple times in reaction to a single scroll event.
   */
  loadMoreRows: _react.PropTypes.func.isRequired,

  /**
   * Number of rows in list; can be arbitrary high number if actual number is unknown.
   */
  rowsCount: _react.PropTypes.number.isRequired,

  /**
   * Threshold at which to pre-fetch data.
   * A threshold X means that data will start loading when a user scrolls within X rows.
   * This value defaults to 15.
   */
  threshold: _react.PropTypes.number.isRequired
};
InfiniteLoader.defaultProps = {
  rowsCount: 0,
  threshold: 15
};
exports.default = InfiniteLoader;
function isRangeVisible(_ref2) {
  var lastRenderedStartIndex = _ref2.lastRenderedStartIndex;
  var lastRenderedStopIndex = _ref2.lastRenderedStopIndex;
  var startIndex = _ref2.startIndex;
  var stopIndex = _ref2.stopIndex;

  return !(startIndex > lastRenderedStopIndex || stopIndex < lastRenderedStartIndex);
}

/**
 * Returns all of the ranges within a larger range that contain unloaded rows.
 */
function scanForUnloadedRanges(_ref3) {
  var isRowLoaded = _ref3.isRowLoaded;
  var startIndex = _ref3.startIndex;
  var stopIndex = _ref3.stopIndex;

  var unloadedRanges = [];
  var rangeStartIndex = null;
  var rangeStopIndex = null;

  for (var i = startIndex; i <= stopIndex; i++) {
    var loaded = isRowLoaded(i);

    if (!loaded) {
      rangeStopIndex = i;
      if (rangeStartIndex === null) {
        rangeStartIndex = i;
      }
    } else if (rangeStopIndex !== null) {
      unloadedRanges.push({
        startIndex: rangeStartIndex,
        stopIndex: rangeStopIndex
      });

      rangeStartIndex = rangeStopIndex = null;
    }
  }

  if (rangeStopIndex !== null) {
    unloadedRanges.push({
      startIndex: rangeStartIndex,
      stopIndex: rangeStopIndex
    });
  }

  return unloadedRanges;
}
},{"react":undefined,"react-addons-shallow-compare":52}],41:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfiniteLoader = exports.default = undefined;

var _InfiniteLoader2 = require('./InfiniteLoader');

var _InfiniteLoader3 = _interopRequireDefault(_InfiniteLoader2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _InfiniteLoader3.default;
exports.InfiniteLoader = _InfiniteLoader3.default;
},{"./InfiniteLoader":40}],42:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * HOC that simplifies the process of synchronizing scrolling between two or more virtualized components.
 */

var ScrollSync = function (_Component) {
  _inherits(ScrollSync, _Component);

  function ScrollSync(props, context) {
    _classCallCheck(this, ScrollSync);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ScrollSync).call(this, props, context));

    _this.state = {
      clientHeight: 0,
      clientWidth: 0,
      scrollHeight: 0,
      scrollLeft: 0,
      scrollTop: 0,
      scrollWidth: 0
    };

    _this._onScroll = _this._onScroll.bind(_this);
    return _this;
  }

  _createClass(ScrollSync, [{
    key: 'render',
    value: function render() {
      var children = this.props.children;
      var _state = this.state;
      var clientHeight = _state.clientHeight;
      var clientWidth = _state.clientWidth;
      var scrollHeight = _state.scrollHeight;
      var scrollLeft = _state.scrollLeft;
      var scrollTop = _state.scrollTop;
      var scrollWidth = _state.scrollWidth;


      return children({
        clientHeight: clientHeight,
        clientWidth: clientWidth,
        onScroll: this._onScroll,
        scrollHeight: scrollHeight,
        scrollLeft: scrollLeft,
        scrollTop: scrollTop,
        scrollWidth: scrollWidth
      });
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
    }
  }, {
    key: '_onScroll',
    value: function _onScroll(_ref) {
      var clientHeight = _ref.clientHeight;
      var clientWidth = _ref.clientWidth;
      var scrollHeight = _ref.scrollHeight;
      var scrollLeft = _ref.scrollLeft;
      var scrollTop = _ref.scrollTop;
      var scrollWidth = _ref.scrollWidth;

      this.setState({ clientHeight: clientHeight, clientWidth: clientWidth, scrollHeight: scrollHeight, scrollLeft: scrollLeft, scrollTop: scrollTop, scrollWidth: scrollWidth });
    }
  }]);

  return ScrollSync;
}(_react.Component);

ScrollSync.propTypes = {
  /**
   * Function respondible for rendering 2 or more virtualized components.
   * This function should implement the following signature:
   * ({ onScroll, scrollLeft, scrollTop }) => PropTypes.element
   */
  children: _react.PropTypes.func.isRequired
};
exports.default = ScrollSync;
},{"react":undefined,"react-addons-shallow-compare":52}],43:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScrollSync = exports.default = undefined;

var _ScrollSync2 = require('./ScrollSync');

var _ScrollSync3 = _interopRequireDefault(_ScrollSync2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _ScrollSync3.default;
exports.ScrollSync = _ScrollSync3.default;
},{"./ScrollSync":42}],44:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Grid = require('../Grid');

var _Grid2 = _interopRequireDefault(_Grid);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * It is inefficient to create and manage a large list of DOM elements within a scrolling container
 * if only a few of those elements are visible. The primary purpose of this component is to improve
 * performance by only rendering the DOM nodes that a user is able to see based on their current
 * scroll position.
 *
 * This component renders a virtualized list of elements with either fixed or dynamic heights.
 */

var VirtualScroll = function (_Component) {
  _inherits(VirtualScroll, _Component);

  function VirtualScroll() {
    _classCallCheck(this, VirtualScroll);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(VirtualScroll).apply(this, arguments));
  }

  _createClass(VirtualScroll, [{
    key: 'recomputeRowHeights',


    /**
     * See Grid#recomputeGridSize
     */
    value: function recomputeRowHeights() {
      this.refs.Grid.recomputeGridSize();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var className = _props.className;
      var height = _props.height;
      var noRowsRenderer = _props.noRowsRenderer;
      var onRowsRendered = _props.onRowsRendered;
      var _onScroll = _props.onScroll;
      var rowHeight = _props.rowHeight;
      var rowRenderer = _props.rowRenderer;
      var overscanRowsCount = _props.overscanRowsCount;
      var rowsCount = _props.rowsCount;
      var scrollToIndex = _props.scrollToIndex;
      var scrollTop = _props.scrollTop;
      var width = _props.width;


      var classNames = (0, _classnames2.default)('VirtualScroll', className);

      return _react2.default.createElement(_Grid2.default, {
        ref: 'Grid',
        'aria-label': this.props['aria-label'],
        className: classNames,
        columnWidth: width,
        columnsCount: 1,
        height: height,
        noContentRenderer: noRowsRenderer,
        onScroll: function onScroll(_ref) {
          var clientHeight = _ref.clientHeight;
          var scrollHeight = _ref.scrollHeight;
          var scrollTop = _ref.scrollTop;
          return _onScroll({ clientHeight: clientHeight, scrollHeight: scrollHeight, scrollTop: scrollTop });
        },
        onSectionRendered: function onSectionRendered(_ref2) {
          var rowOverscanStartIndex = _ref2.rowOverscanStartIndex;
          var rowOverscanStopIndex = _ref2.rowOverscanStopIndex;
          var rowStartIndex = _ref2.rowStartIndex;
          var rowStopIndex = _ref2.rowStopIndex;
          return onRowsRendered({
            overscanStartIndex: rowOverscanStartIndex,
            overscanStopIndex: rowOverscanStopIndex,
            startIndex: rowStartIndex,
            stopIndex: rowStopIndex
          });
        },
        overscanRowsCount: overscanRowsCount,
        renderCell: function renderCell(_ref3) {
          var columnIndex = _ref3.columnIndex;
          var rowIndex = _ref3.rowIndex;
          return rowRenderer(rowIndex);
        },
        rowHeight: rowHeight,
        rowsCount: rowsCount,
        scrollToRow: scrollToIndex,
        scrollTop: scrollTop,
        width: width
      });
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
    }
  }]);

  return VirtualScroll;
}(_react.Component);

VirtualScroll.propTypes = {
  'aria-label': _react.PropTypes.string,

  /** Optional CSS class name */
  className: _react.PropTypes.string,

  /** Height constraint for list (determines how many actual rows are rendered) */
  height: _react.PropTypes.number.isRequired,

  /** Optional renderer to be used in place of rows when rowsCount is 0 */
  noRowsRenderer: _react.PropTypes.func.isRequired,

  /**
   * Callback invoked with information about the slice of rows that were just rendered.
   * ({ startIndex, stopIndex }): void
   */
  onRowsRendered: _react.PropTypes.func.isRequired,

  /**
   * Number of rows to render above/below the visible bounds of the list.
   * These rows can help for smoother scrolling on touch devices.
   */
  overscanRowsCount: _react.PropTypes.number.isRequired,

  /**
   * Callback invoked whenever the scroll offset changes within the inner scrollable region.
   * This callback can be used to sync scrolling between lists, tables, or grids.
   * ({ clientHeight, scrollHeight, scrollTop }): void
   */
  onScroll: _react.PropTypes.func.isRequired,

  /**
   * Either a fixed row height (number) or a function that returns the height of a row given its index.
   * (index: number): number
   */
  rowHeight: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.func]).isRequired,

  /** Responsbile for rendering a row given an index */
  rowRenderer: _react.PropTypes.func.isRequired,

  /** Number of rows in list. */
  rowsCount: _react.PropTypes.number.isRequired,

  /** Row index to ensure visible (by forcefully scrolling if necessary) */
  scrollToIndex: _react.PropTypes.number,

  /** Vertical offset. */
  scrollTop: _react.PropTypes.number,

  /** Width of list */
  width: _react.PropTypes.number.isRequired
};
VirtualScroll.defaultProps = {
  noRowsRenderer: function noRowsRenderer() {
    return null;
  },
  onRowsRendered: function onRowsRendered() {
    return null;
  },
  onScroll: function onScroll() {
    return null;
  },
  overscanRowsCount: 10
};
exports.default = VirtualScroll;
},{"../Grid":39,"classnames":undefined,"react":undefined,"react-addons-shallow-compare":52}],45:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VirtualScroll = exports.default = undefined;

var _VirtualScroll2 = require('./VirtualScroll');

var _VirtualScroll3 = _interopRequireDefault(_VirtualScroll2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _VirtualScroll3.default;
exports.VirtualScroll = _VirtualScroll3.default;
},{"./VirtualScroll":44}],46:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ArrowKeyStepper = require('./ArrowKeyStepper');

Object.defineProperty(exports, 'ArrowKeyStepper', {
  enumerable: true,
  get: function get() {
    return _ArrowKeyStepper.ArrowKeyStepper;
  }
});

var _AutoSizer = require('./AutoSizer');

Object.defineProperty(exports, 'AutoSizer', {
  enumerable: true,
  get: function get() {
    return _AutoSizer.AutoSizer;
  }
});

var _ColumnSizer = require('./ColumnSizer');

Object.defineProperty(exports, 'ColumnSizer', {
  enumerable: true,
  get: function get() {
    return _ColumnSizer.ColumnSizer;
  }
});

var _FlexTable = require('./FlexTable');

Object.defineProperty(exports, 'FlexTable', {
  enumerable: true,
  get: function get() {
    return _FlexTable.FlexTable;
  }
});
Object.defineProperty(exports, 'FlexColumn', {
  enumerable: true,
  get: function get() {
    return _FlexTable.FlexColumn;
  }
});
Object.defineProperty(exports, 'SortDirection', {
  enumerable: true,
  get: function get() {
    return _FlexTable.SortDirection;
  }
});
Object.defineProperty(exports, 'SortIndicator', {
  enumerable: true,
  get: function get() {
    return _FlexTable.SortIndicator;
  }
});

var _Grid = require('./Grid');

Object.defineProperty(exports, 'Grid', {
  enumerable: true,
  get: function get() {
    return _Grid.Grid;
  }
});

var _InfiniteLoader = require('./InfiniteLoader');

Object.defineProperty(exports, 'InfiniteLoader', {
  enumerable: true,
  get: function get() {
    return _InfiniteLoader.InfiniteLoader;
  }
});

var _ScrollSync = require('./ScrollSync');

Object.defineProperty(exports, 'ScrollSync', {
  enumerable: true,
  get: function get() {
    return _ScrollSync.ScrollSync;
  }
});

var _VirtualScroll = require('./VirtualScroll');

Object.defineProperty(exports, 'VirtualScroll', {
  enumerable: true,
  get: function get() {
    return _VirtualScroll.VirtualScroll;
  }
});
},{"./ArrowKeyStepper":27,"./AutoSizer":29,"./ColumnSizer":31,"./FlexTable":36,"./Grid":39,"./InfiniteLoader":41,"./ScrollSync":43,"./VirtualScroll":45}],47:[function(require,module,exports){
'use strict';

/**
* Detect Element Resize.
* Forked in order to guard against unsafe 'window' and 'document' references.
*
* https://github.com/sdecima/javascript-detect-element-resize
* Sebastian Decima
*
* version: 0.5.3
**/

// Check `document` and `window` in case of server-side rendering
var _window;
if (typeof window !== 'undefined') {
  _window = window;
} else if (typeof self !== 'undefined') {
  _window = self;
} else {
  _window = undefined;
}

var attachEvent = typeof document !== 'undefined' && document.attachEvent;
var stylesCreated = false;

if (!attachEvent) {
  var requestFrame = function () {
    var raf = _window.requestAnimationFrame || _window.mozRequestAnimationFrame || _window.webkitRequestAnimationFrame || function (fn) {
      return _window.setTimeout(fn, 20);
    };
    return function (fn) {
      return raf(fn);
    };
  }();

  var cancelFrame = function () {
    var cancel = _window.cancelAnimationFrame || _window.mozCancelAnimationFrame || _window.webkitCancelAnimationFrame || _window.clearTimeout;
    return function (id) {
      return cancel(id);
    };
  }();

  var resetTriggers = function resetTriggers(element) {
    var triggers = element.__resizeTriggers__,
        expand = triggers.firstElementChild,
        contract = triggers.lastElementChild,
        expandChild = expand.firstElementChild;
    contract.scrollLeft = contract.scrollWidth;
    contract.scrollTop = contract.scrollHeight;
    expandChild.style.width = expand.offsetWidth + 1 + 'px';
    expandChild.style.height = expand.offsetHeight + 1 + 'px';
    expand.scrollLeft = expand.scrollWidth;
    expand.scrollTop = expand.scrollHeight;
  };

  var checkTriggers = function checkTriggers(element) {
    return element.offsetWidth != element.__resizeLast__.width || element.offsetHeight != element.__resizeLast__.height;
  };

  var scrollListener = function scrollListener(e) {
    var element = this;
    resetTriggers(this);
    if (this.__resizeRAF__) cancelFrame(this.__resizeRAF__);
    this.__resizeRAF__ = requestFrame(function () {
      if (checkTriggers(element)) {
        element.__resizeLast__.width = element.offsetWidth;
        element.__resizeLast__.height = element.offsetHeight;
        element.__resizeListeners__.forEach(function (fn) {
          fn.call(element, e);
        });
      }
    });
  };

  /* Detect CSS Animations support to detect element display/re-attach */
  var animation = false,
      animationstring = 'animation',
      keyframeprefix = '',
      animationstartevent = 'animationstart',
      domPrefixes = 'Webkit Moz O ms'.split(' '),
      startEvents = 'webkitAnimationStart animationstart oAnimationStart MSAnimationStart'.split(' '),
      pfx = '';
  {
    var elm = document.createElement('fakeelement');
    if (elm.style.animationName !== undefined) {
      animation = true;
    }

    if (animation === false) {
      for (var i = 0; i < domPrefixes.length; i++) {
        if (elm.style[domPrefixes[i] + 'AnimationName'] !== undefined) {
          pfx = domPrefixes[i];
          animationstring = pfx + 'Animation';
          keyframeprefix = '-' + pfx.toLowerCase() + '-';
          animationstartevent = startEvents[i];
          animation = true;
          break;
        }
      }
    }
  }

  var animationName = 'resizeanim';
  var animationKeyframes = '@' + keyframeprefix + 'keyframes ' + animationName + ' { from { opacity: 0; } to { opacity: 0; } } ';
  var animationStyle = keyframeprefix + 'animation: 1ms ' + animationName + '; ';
}

var createStyles = function createStyles() {
  if (!stylesCreated) {
    //opacity:0 works around a chrome bug https://code.google.com/p/chromium/issues/detail?id=286360
    var css = (animationKeyframes ? animationKeyframes : '') + '.resize-triggers { ' + (animationStyle ? animationStyle : '') + 'visibility: hidden; opacity: 0; } ' + '.resize-triggers, .resize-triggers > div, .contract-trigger:before { content: \" \"; display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; } .resize-triggers > div { background: #eee; overflow: auto; } .contract-trigger:before { width: 200%; height: 200%; }',
        head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style');

    style.type = 'text/css';
    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }

    head.appendChild(style);
    stylesCreated = true;
  }
};

var addResizeListener = function addResizeListener(element, fn) {
  if (attachEvent) element.attachEvent('onresize', fn);else {
    if (!element.__resizeTriggers__) {
      if (getComputedStyle(element).position == 'static') element.style.position = 'relative';
      createStyles();
      element.__resizeLast__ = {};
      element.__resizeListeners__ = [];
      (element.__resizeTriggers__ = document.createElement('div')).className = 'resize-triggers';
      element.__resizeTriggers__.innerHTML = '<div class="expand-trigger"><div></div></div>' + '<div class="contract-trigger"></div>';
      element.appendChild(element.__resizeTriggers__);
      resetTriggers(element);
      element.addEventListener('scroll', scrollListener, true);

      /* Listen for a css animation to detect element display/re-attach */
      animationstartevent && element.__resizeTriggers__.addEventListener(animationstartevent, function (e) {
        if (e.animationName == animationName) resetTriggers(element);
      });
    }
    element.__resizeListeners__.push(fn);
  }
};

var removeResizeListener = function removeResizeListener(element, fn) {
  if (attachEvent) element.detachEvent('onresize', fn);else {
    element.__resizeListeners__.splice(element.__resizeListeners__.indexOf(fn), 1);
    if (!element.__resizeListeners__.length) {
      element.removeEventListener('scroll', scrollListener);
      element.__resizeTriggers__ = !element.removeChild(element.__resizeTriggers__);
    }
  }
};

module.exports = {
  addResizeListener: addResizeListener,
  removeResizeListener: removeResizeListener
};
},{}],48:[function(require,module,exports){
'use strict';
module.exports = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
},{}],49:[function(require,module,exports){
'use strict';

var canUseDOM = require('./inDOM');

var size;

module.exports = function (recalc) {
  if (!size || recalc) {
    if (canUseDOM) {
      var scrollDiv = document.createElement('div');

      scrollDiv.style.position = 'absolute';
      scrollDiv.style.top = '-9999px';
      scrollDiv.style.width = '50px';
      scrollDiv.style.height = '50px';
      scrollDiv.style.overflow = 'scroll';

      document.body.appendChild(scrollDiv);
      size = scrollDiv.offsetWidth - scrollDiv.clientWidth;
      document.body.removeChild(scrollDiv);
    }
  }

  return size;
};
},{"./inDOM":48}],50:[function(require,module,exports){
(function (global){
var now = require('performance-now')
  , root = typeof window === 'undefined' ? global : window
  , vendors = ['moz', 'webkit']
  , suffix = 'AnimationFrame'
  , raf = root['request' + suffix]
  , caf = root['cancel' + suffix] || root['cancelRequest' + suffix]

for(var i = 0; !raf && i < vendors.length; i++) {
  raf = root[vendors[i] + 'Request' + suffix]
  caf = root[vendors[i] + 'Cancel' + suffix]
      || root[vendors[i] + 'CancelRequest' + suffix]
}

// Some versions of FF have rAF but not cAF
if(!raf || !caf) {
  var last = 0
    , id = 0
    , queue = []
    , frameDuration = 1000 / 60

  raf = function(callback) {
    if(queue.length === 0) {
      var _now = now()
        , next = Math.max(0, frameDuration - (_now - last))
      last = next + _now
      setTimeout(function() {
        var cp = queue.slice(0)
        // Clear queue here to prevent
        // callbacks from appending listeners
        // to the current frame's queue
        queue.length = 0
        for(var i = 0; i < cp.length; i++) {
          if(!cp[i].cancelled) {
            try{
              cp[i].callback(last)
            } catch(e) {
              setTimeout(function() { throw e }, 0)
            }
          }
        }
      }, Math.round(next))
    }
    queue.push({
      handle: ++id,
      callback: callback,
      cancelled: false
    })
    return id
  }

  caf = function(handle) {
    for(var i = 0; i < queue.length; i++) {
      if(queue[i].handle === handle) {
        queue[i].cancelled = true
      }
    }
  }
}

module.exports = function(fn) {
  // Wrap in a new function to prevent
  // `cancel` potentially being assigned
  // to the native rAF function
  return raf.call(root, fn)
}
module.exports.cancel = function() {
  caf.apply(root, arguments)
}
module.exports.polyfill = function() {
  root.requestAnimationFrame = raf
  root.cancelAnimationFrame = caf
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"performance-now":51}],51:[function(require,module,exports){
(function (process){
// Generated by CoffeeScript 1.7.1
(function() {
  var getNanoSeconds, hrtime, loadTime;

  if ((typeof performance !== "undefined" && performance !== null) && performance.now) {
    module.exports = function() {
      return performance.now();
    };
  } else if ((typeof process !== "undefined" && process !== null) && process.hrtime) {
    module.exports = function() {
      return (getNanoSeconds() - loadTime) / 1e6;
    };
    hrtime = process.hrtime;
    getNanoSeconds = function() {
      var hr;
      hr = hrtime();
      return hr[0] * 1e9 + hr[1];
    };
    loadTime = getNanoSeconds();
  } else if (Date.now) {
    module.exports = function() {
      return Date.now() - loadTime;
    };
    loadTime = Date.now();
  } else {
    module.exports = function() {
      return new Date().getTime() - loadTime;
    };
    loadTime = new Date().getTime();
  }

}).call(this);

}).call(this,require('_process'))

},{"_process":13}],52:[function(require,module,exports){
module.exports = require('react/lib/shallowCompare');
},{"react/lib/shallowCompare":53}],53:[function(require,module,exports){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
* @providesModule shallowCompare
*/

'use strict';

var shallowEqual = require('fbjs/lib/shallowEqual');

/**
 * Does a shallow comparison for props and state.
 * See ReactComponentWithPureRenderMixin
 */
function shallowCompare(instance, nextProps, nextState) {
  return !shallowEqual(instance.props, nextProps) || !shallowEqual(instance.state, nextState);
}

module.exports = shallowCompare;
},{"fbjs/lib/shallowEqual":54}],54:[function(require,module,exports){
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @typechecks
 * 
 */

/*eslint-disable no-self-compare */

'use strict';

var hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */
function is(x, y) {
  // SameValue algorithm
  if (x === y) {
    // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    return x !== 0 || 1 / x === 1 / y;
  } else {
    // Step 6.a: NaN == NaN
    return x !== x && y !== y;
  }
}

/**
 * Performs equality by iterating through keys on an object and returning false
 * when any key has values which are not strictly equal between the arguments.
 * Returns true when the values of all keys are strictly equal.
 */
function shallowEqual(objA, objB) {
  if (is(objA, objB)) {
    return true;
  }

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  for (var i = 0; i < keysA.length; i++) {
    if (!hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
}

module.exports = shallowEqual;
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9yZWFjdC1jb21wb25lbnQtZ3VscC10YXNrcy9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL3dhbndpbmdmdW5nL0Rlc2t0b3Av5Y+C6ICDLUNvbXBvbmVudC9yZWFjdC1zZWxlY3QvZXhhbXBsZXMvc3JjL2FwcC5qcyIsIi9Vc2Vycy93YW53aW5nZnVuZy9EZXNrdG9wL+WPguiAgy1Db21wb25lbnQvcmVhY3Qtc2VsZWN0L2V4YW1wbGVzL3NyYy9jb21wb25lbnRzL0NpdGllcy5qcyIsIi9Vc2Vycy93YW53aW5nZnVuZy9EZXNrdG9wL+WPguiAgy1Db21wb25lbnQvcmVhY3Qtc2VsZWN0L2V4YW1wbGVzL3NyYy9jb21wb25lbnRzL0NvbnRyaWJ1dG9ycy5qcyIsIi9Vc2Vycy93YW53aW5nZnVuZy9EZXNrdG9wL+WPguiAgy1Db21wb25lbnQvcmVhY3Qtc2VsZWN0L2V4YW1wbGVzL3NyYy9jb21wb25lbnRzL0N1c3RvbUNvbXBvbmVudHMuanMiLCIvVXNlcnMvd2Fud2luZ2Z1bmcvRGVza3RvcC/lj4LogIMtQ29tcG9uZW50L3JlYWN0LXNlbGVjdC9leGFtcGxlcy9zcmMvY29tcG9uZW50cy9DdXN0b21SZW5kZXIuanMiLCIvVXNlcnMvd2Fud2luZ2Z1bmcvRGVza3RvcC/lj4LogIMtQ29tcG9uZW50L3JlYWN0LXNlbGVjdC9leGFtcGxlcy9zcmMvY29tcG9uZW50cy9NdWx0aXNlbGVjdC5qcyIsIi9Vc2Vycy93YW53aW5nZnVuZy9EZXNrdG9wL+WPguiAgy1Db21wb25lbnQvcmVhY3Qtc2VsZWN0L2V4YW1wbGVzL3NyYy9jb21wb25lbnRzL051bWVyaWNTZWxlY3QuanMiLCIvVXNlcnMvd2Fud2luZ2Z1bmcvRGVza3RvcC/lj4LogIMtQ29tcG9uZW50L3JlYWN0LXNlbGVjdC9leGFtcGxlcy9zcmMvY29tcG9uZW50cy9TdGF0ZXMuanMiLCIvVXNlcnMvd2Fud2luZ2Z1bmcvRGVza3RvcC/lj4LogIMtQ29tcG9uZW50L3JlYWN0LXNlbGVjdC9leGFtcGxlcy9zcmMvZGF0YS9jaXRpZXMuanMiLCIvVXNlcnMvd2Fud2luZ2Z1bmcvRGVza3RvcC/lj4LogIMtQ29tcG9uZW50L3JlYWN0LXNlbGVjdC9leGFtcGxlcy9zcmMvZGF0YS9jb250cmlidXRvcnMuanMiLCIvVXNlcnMvd2Fud2luZ2Z1bmcvRGVza3RvcC/lj4LogIMtQ29tcG9uZW50L3JlYWN0LXNlbGVjdC9leGFtcGxlcy9zcmMvZGF0YS9zdGF0ZXMuanMiLCIvVXNlcnMvd2Fud2luZ2Z1bmcvRGVza3RvcC/lj4LogIMtQ29tcG9uZW50L3JlYWN0LXNlbGVjdC9leGFtcGxlcy9zcmMvZGF0YS91c2Vycy5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1jb21wb25lbnQtZ3VscC10YXNrcy9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWNvbXBvbmVudC1ndWxwLXRhc2tzL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9xdWVyeXN0cmluZy1lczMvZGVjb2RlLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWNvbXBvbmVudC1ndWxwLXRhc2tzL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9xdWVyeXN0cmluZy1lczMvZW5jb2RlLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWNvbXBvbmVudC1ndWxwLXRhc2tzL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9xdWVyeXN0cmluZy1lczMvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVhY3QtZ3JhdmF0YXIvZGlzdC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1ncmF2YXRhci9ub2RlX21vZHVsZXMvaXMtcmV0aW5hL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWdyYXZhdGFyL25vZGVfbW9kdWxlcy9tZDUvbWQ1LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWdyYXZhdGFyL25vZGVfbW9kdWxlcy9tZDUvbm9kZV9tb2R1bGVzL2NoYXJlbmMvY2hhcmVuYy5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1ncmF2YXRhci9ub2RlX21vZHVsZXMvbWQ1L25vZGVfbW9kdWxlcy9jcnlwdC9jcnlwdC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1ncmF2YXRhci9ub2RlX21vZHVsZXMvbWQ1L25vZGVfbW9kdWxlcy9pcy1idWZmZXIvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVhY3QtdmlydHVhbGl6ZWQtc2VsZWN0L2Rpc3QvY29tbW9uanMvVmlydHVhbGl6ZWRTZWxlY3QvVmlydHVhbGl6ZWRTZWxlY3QuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtdmlydHVhbGl6ZWQtc2VsZWN0L2Rpc3QvY29tbW9uanMvVmlydHVhbGl6ZWRTZWxlY3QvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVhY3QtdmlydHVhbGl6ZWQvZGlzdC9jb21tb25qcy9BcnJvd0tleVN0ZXBwZXIvQXJyb3dLZXlTdGVwcGVyLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXZpcnR1YWxpemVkL2Rpc3QvY29tbW9uanMvQXJyb3dLZXlTdGVwcGVyL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXZpcnR1YWxpemVkL2Rpc3QvY29tbW9uanMvQXV0b1NpemVyL0F1dG9TaXplci5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC12aXJ0dWFsaXplZC9kaXN0L2NvbW1vbmpzL0F1dG9TaXplci9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC12aXJ0dWFsaXplZC9kaXN0L2NvbW1vbmpzL0NvbHVtblNpemVyL0NvbHVtblNpemVyLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXZpcnR1YWxpemVkL2Rpc3QvY29tbW9uanMvQ29sdW1uU2l6ZXIvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVhY3QtdmlydHVhbGl6ZWQvZGlzdC9jb21tb25qcy9GbGV4VGFibGUvRmxleENvbHVtbi5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC12aXJ0dWFsaXplZC9kaXN0L2NvbW1vbmpzL0ZsZXhUYWJsZS9GbGV4VGFibGUuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtdmlydHVhbGl6ZWQvZGlzdC9jb21tb25qcy9GbGV4VGFibGUvU29ydERpcmVjdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC12aXJ0dWFsaXplZC9kaXN0L2NvbW1vbmpzL0ZsZXhUYWJsZS9Tb3J0SW5kaWNhdG9yLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXZpcnR1YWxpemVkL2Rpc3QvY29tbW9uanMvRmxleFRhYmxlL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXZpcnR1YWxpemVkL2Rpc3QvY29tbW9uanMvR3JpZC9HcmlkLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXZpcnR1YWxpemVkL2Rpc3QvY29tbW9uanMvR3JpZC9HcmlkVXRpbHMuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtdmlydHVhbGl6ZWQvZGlzdC9jb21tb25qcy9HcmlkL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXZpcnR1YWxpemVkL2Rpc3QvY29tbW9uanMvSW5maW5pdGVMb2FkZXIvSW5maW5pdGVMb2FkZXIuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtdmlydHVhbGl6ZWQvZGlzdC9jb21tb25qcy9JbmZpbml0ZUxvYWRlci9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC12aXJ0dWFsaXplZC9kaXN0L2NvbW1vbmpzL1Njcm9sbFN5bmMvU2Nyb2xsU3luYy5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC12aXJ0dWFsaXplZC9kaXN0L2NvbW1vbmpzL1Njcm9sbFN5bmMvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVhY3QtdmlydHVhbGl6ZWQvZGlzdC9jb21tb25qcy9WaXJ0dWFsU2Nyb2xsL1ZpcnR1YWxTY3JvbGwuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtdmlydHVhbGl6ZWQvZGlzdC9jb21tb25qcy9WaXJ0dWFsU2Nyb2xsL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXZpcnR1YWxpemVkL2Rpc3QvY29tbW9uanMvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVhY3QtdmlydHVhbGl6ZWQvZGlzdC9jb21tb25qcy92ZW5kb3IvZGV0ZWN0RWxlbWVudFJlc2l6ZS5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC12aXJ0dWFsaXplZC9ub2RlX21vZHVsZXMvZG9tLWhlbHBlcnMvdXRpbC9pbkRPTS5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC12aXJ0dWFsaXplZC9ub2RlX21vZHVsZXMvZG9tLWhlbHBlcnMvdXRpbC9zY3JvbGxiYXJTaXplLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXZpcnR1YWxpemVkL25vZGVfbW9kdWxlcy9yYWYvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVhY3QtdmlydHVhbGl6ZWQvbm9kZV9tb2R1bGVzL3JhZi9ub2RlX21vZHVsZXMvcGVyZm9ybWFuY2Utbm93L2xpYi9wZXJmb3JtYW5jZS1ub3cuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtdmlydHVhbGl6ZWQvbm9kZV9tb2R1bGVzL3JlYWN0LWFkZG9ucy1zaGFsbG93LWNvbXBhcmUvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVhY3QvbGliL3NoYWxsb3dDb21wYXJlLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0L25vZGVfbW9kdWxlcy9mYmpzL2xpYi9zaGFsbG93RXF1YWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7cUJDRWtCLE9BQU87Ozs7d0JBQ0osV0FBVzs7OzsyQkFDYixjQUFjOzs7O3NDQUVSLDJCQUEyQjs7OzswQ0FDdkIsK0JBQStCOzs7O3NDQUNuQywyQkFBMkI7Ozs7cUNBQzVCLDBCQUEwQjs7Ozt1Q0FDeEIsNEJBQTRCOzs7O2dDQUNuQyxxQkFBcUI7Ozs7Z0NBQ3JCLHFCQUFxQjs7OztBQUV4QyxzQkFBUyxNQUFNLENBQ2Q7OztDQUNDLGtFQUFRLEtB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QUFJLEVBQUUsV0FBVyxFQUFFLEVBQ3JCLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUNuQixFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsRUFDeEIsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLEVBQ3RCLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxFQUNwQixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsRUFDcEIsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLEVBQ3RCLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxFQUN0QixFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsRUFDbEIsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQ2hCLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxFQUN2QixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsRUFDcEIsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQ2xCLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxFQUNyQixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFDbkIsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQ3BCLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxFQUNsQixFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsRUFDdEIsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLEVBQ3RCLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxFQUNwQixFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsRUFDdEIsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQ2xCLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxFQUN2QixFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsRUFDdkIsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLEVBQ3ZCLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxFQUN4QixFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsRUFDdEIsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLEVBQ3RCLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxFQUN2QixFQUFFLElB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LEVBQ3ZCLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxFQUNwQixFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsRUFDckIsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQ3BCLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxFQUNwQixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsRUFDcEIsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQ3BCLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxFQUNyQixFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsRUFDckIsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEVBQ3JCLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxFQUNyQixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFDbkIsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQ2xCLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUNqQixFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsRUFDdEIsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEVBQ3JCLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxFQUN0QixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsRUFDcEIsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQ3BCLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxFQUNwQixFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsRUFDbEIsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQ2xCLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxFQUN2QixFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsRUFDekIsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQ3BCLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxFQUNoQixFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsRUFDbEIsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLEVBQ3RCLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxFQUN0QixFQUFFLElBQUksRUFBRSxtQkFBbUIsRUFBRSxFQUM3QixFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFDaEIsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEVBQ25CLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUNuQixFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsRUFDeEIsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQ2xCLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxFQUN2QixFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsRUFDckIsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEVBQ3JCLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUNuQixFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFDaEIsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQ2pCLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUNuQixFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsRUFDbEIsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLEVBQ3RCLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxFQUNwQixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsRUFDcEIsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQ2xCLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxFQUN2QixFQUFFLElBQUksRUFBRSw2QkFBNkIsRUFBRSxFQUN2QyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsRUFDcEIsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQ2xCLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUNuQixFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsRUFDckIsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQ2hCLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUNuQixFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFDakIsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQ2xCLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUNuQixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFDbkIsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQ2xCLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxFQUNwQixFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsRUFDdEIsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEVBQ3JCLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUNuQixFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsRUFDckIsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEVBQ3JCLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUNuQixFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsRUFDdkIsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEVBQ3JCLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxFQUNsQixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFDbkIsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQ3BCLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxFQUNwQixFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsRUFDdkIsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQ3BCLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxFQUN0QixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFDbkIsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQ3BCLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUNuQixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFDbkIsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEVBQ3JCLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUNuQixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFDbkIsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQ2xCLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxFQUNsQixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFDbkIsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQ3BCLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxFQUNwQixFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFDaEIsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQ3BCLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUNuQixFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFDakIsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLEVBQ3ZCLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxFQUN6QixFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsRUFDdEIsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLEVBQ3RCLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUNuQixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFDbkIsRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLEVBQ3hCLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUNuQixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsRUFDcEIsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEVBQ3JCLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxFQUN2QixFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsRUFDdEIsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQ2pCLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUNuQixFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsRUFDckIsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEVBQ25CLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxFQUN6QixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsRUFDcEIsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLEVBQ3pCLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxFQUNsQixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFDbkIsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQ2xCLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxFQUNsQixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsRUFDcEIsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEVBQ3JCLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxFQUN0QixFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsRUFDekIsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLEVBQ3RCLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUNqQixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsRUFDcEIsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLEVBQ3pCLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxFQUN2QixFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxFQUMxQixFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxFQUMxQixFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsRUFDeEIsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLEVBQ3pCLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxFQUNsQixFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsRUFDeEIsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQ2xCLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxFQUNwQixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsRUFDcEIsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQ3BCLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUNqQixFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFDaEIsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLEVBQ3RCLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxFQUNsQixFQUFFLElBQUksRUFBRSxvQkFBb0IsRUFBRSxFQUM5QixFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsRUFDekIsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLEVBQ3ZCLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxFQUN0QixFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsRUFDekIsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLEVBQ3ZCLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxFQUN6QixFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsRUFDckIsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLEVBQ3ZCLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxFQUN4QixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsRUFDcEIsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQ2xCLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxFQUNsQixFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsRUFDbEIsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLEVBQ3pCLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxFQUN4QixFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsRUFDbEIsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLEVBQ3pCLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxFQUN2QixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFDbkIsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQ2xCLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxFQUNsQixFQUFFLElBQUksRUFBRSxrQkFBa0IsRUFBRSxFQUM1QixFQUFFLElBQUksRUFBRSxpQkFBaUIsRUFBRSxFQUMzQixFQUFFLElBQUksRUFBRSxrQkFBa0IsRUFBRSxFQUM1QixFQUFFLElBQUksRUFBRSxtQkFBbUIsRUFBRSxFQUM3QixFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsRUFDdkIsRUFBRSxJQUFJLEVBQUUsbUJBQW1CLEVBQUUsRUFDN0IsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLEVBQ3RCLEVBQUUsSUFBSSxFQUFFLHNCQUFzQixFQUFFLEVBQ2hDLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxFQUN0QixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFDbkIsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEVBQ25CLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUNuQixFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsRUFDbEIsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQ2hCLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxFQUNyQixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsRUFDcEIsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQ3BCLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUNuQixFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsRUFDeEIsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQ2xCLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUNqQixFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsRUFDckIsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQ2pCLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxFQUNsQixFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFDakIsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLEVBQ3pCLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxFQUNsQixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFDbkIsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQ2pCLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUNuQixFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsRUFDbEIsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQ2hCLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxFQUN2QixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFDbkIsRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLEVBQ3hCLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxFQUN0QixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFDbkIsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLEVBQ3pCLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxFQUNyQixFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsRUFDbEIsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQ3BCLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxFQUNwQixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsRUFDcEIsRUFBRSxJQUFJLEVBQUUsb0JBQW9CLEVBQUUsRUFDOUIsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLEVBQ3RCLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxFQUN2QixFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsRUFDeEIsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQ3BCLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxFQUNyQixFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsRUFDdkIsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEVBQ3JCLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxFQUN0QixFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsRUFDbEIsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQ2pCLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxFQUNwQixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsRUFDcEIsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQ2pCLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUNuQixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsRUFDcEIsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEVBQ3JCLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUNuQixFQUFFLElBQUksRUFBRSxtQkFBbUIsRUFBRSxFQUM3QixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsRUFDcEIsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsRUFDMUIsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEVBQ3JCLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxFQUNsQixFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsRUFDbEIsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQ2xCLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxFQUN2QixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsRUFDcEIsRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLEVBQ3hCLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUNqQixFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsRUFDdkIsRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLEVBQ3hCLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUNuQixFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsRUFDdkIsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLEVBQ3RCLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxFQUN6QixFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsRUFDckIsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLEVBQ3RCLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxFQUN0QixFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsRUFDckIsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLEVBQ3RCLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxFQUN0QixFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFDakIsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLEVBQ3RCLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxFQUN0QixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsRUFDcEIsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEVBQ3JCLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxFQUNsQixFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsRUFDekIsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEVBQ25CLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxFQUN2QixFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsRUFDdkIsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsRUFDMUIsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEVBQ25CLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxFQUN2QixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsRUFDcEIsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQ3BCLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxFQUN0QixFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFDakIsRUFB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YSxFQUFFLEVBQ3ZCLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxFQUN6QixFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsRUFDdEIsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQ3BCLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxFQUN2QixFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsRUFDeEIsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLEVBQ3RCLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxFQUNsQixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsRUFDcEIsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQ3BCLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxFQUN0QixFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsRUFDdEIsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLEVBQ3ZCLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxFQUN0QixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsRUFDcEIsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEVBQ25CLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxFQUNwQixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFDbkIsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEVBQ3JCLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUNuQixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFDbkIsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEVBQ3JCLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxFQUN0QixFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsRUFDeEIsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLEVBQ3ZCLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxFQUN0QixFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsRUFDdkIsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQ2xCLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxFQUNsQixFQUFFLElBQUksRUFBRSxRQUFR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LEVBQUUsWUFBWSxFQUFFLEVBQ3RCLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxFQUN0QixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsRUFDcEIsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLEVBQ3pCLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxFQUNsQixFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsRUFDdkIsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLEVBQ3RCLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxFQUNsQixFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsRUFDbEIsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQ3BCLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUNqQixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFDbkIsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQ2hCLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxFQUNoQixFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsRUFDbEIsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQ2xCLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUNqQixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFDbkIsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLEVBQ3RCLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxFQUNsQixFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsRUFDdEIsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQ2pCLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxFQUN0QixFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsRUFDdEIsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQ2xCLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxFQUNsQixFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsRUFDckIsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQ2pCLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxFQUNyQixFQUFFLElBQUks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LEtBQUssRUFBRSxVQUFVLEVBQUUsRUFDbEMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsRUFDcEMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsRUFDbEMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsRUFDckMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsRUFDbEMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxzQkFBc0IsRUFBRSxFQUM5QyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLGdDQUFnQyxFQUFFLEVBQ3hELEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLEVBQ2pDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLEVBQ2pDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEVBQzlCLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEVBQ2hDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLEVBQy9CLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLEVBQ2xDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLEVBQ2pDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEVBQzlCLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEVBQ2hDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLEVBQ2xDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLEVBQ25DLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLEVBQy9CLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsa0JBQWtCLEVBQUUsRUFDMUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsRUFDbEMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxlQUFlLEVBQUUsRUFDdkMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsRUFDbEMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsRUFDbkMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsRUFDckMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsRUFDbEMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsRUFDakMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsRUFDbEMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsRUFDaEMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxlQUFlLEVBQUUsRUFDdkMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsRUFDcEMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsRUFDcEMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsRUFDbEMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxnQkFBZ0IsRUFBRSxFQUN4QyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLGNBQWMsRUFBRSxFQUN0QyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxF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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0lBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMzBCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pLQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDeEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ2hDQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKiBlc2xpbnQgcmVhY3QvcHJvcC10eXBlczogMCAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgU2VsZWN0IGZyb20gJ3JlYWN0LXNlbGVjdCc7XG5cbmltcG9ydCBDb250cmlidXRvcnMgZnJvbSAnLi9jb21wb25lbnRzL0NvbnRyaWJ1dG9ycyc7XG5pbXBvcnQgQ3VzdG9tQ29tcG9uZW50cyBmcm9tICcuL2NvbXBvbmVudHMvQ3VzdG9tQ29tcG9uZW50cyc7XG5pbXBvcnQgQ3VzdG9tUmVuZGVyIGZyb20gJy4vY29tcG9uZW50cy9DdXN0b21SZW5kZXInO1xuaW1wb3J0IE11bHRpc2VsZWN0IGZyb20gJy4vY29tcG9uZW50cy9NdWx0aXNlbGVjdCc7XG5pbXBvcnQgTnVtZXJpY1NlbGVjdCBmcm9tICcuL2NvbXBvbmVudHMvTnVtZXJpY1NlbGVjdCc7XG5pbXBvcnQgQ2l0aWVzIGZyb20gJy4vY29tcG9uZW50cy9DaXRpZXMnO1xuaW1wb3J0IFN0YXRlcyBmcm9tICcuL2NvbXBvbmVudHMvU3RhdGVzJztcblxuUmVhY3RET00ucmVuZGVyKFxuXHQ8ZGl2PlxuXHRcdDxDaXRpZXMgbGFiZWw9XCJDaXRpZXNcIiAvPlxuXHRcdDxici8+XG5cdFx0PGJyLz5cblx0XHQ8YnIvPlxuXHRcdDxici8+XG5cdFx0PE11bHRpc2VsZWN0IGxhYmVsPVwiTXVsdGlzZWxlY3RcIiAvPlxuXHRcdDxici8+XG5cdFx0PGJyLz5cblx0XHQ8YnIvPlxuXHRcdDxici8+XG5cblxuXG5cdFx0ey8qXG5cdFx0PFNlbGVjdGVkVmFsdWVzRmllbGQgbGFiZWw9XCJPcHRpb24gQ3JlYXRpb24gKHRhZ3MgbW9kZSlcIiBvcHRpb25zPXtGTEFWT1VSU30gYWxsb3dDcmVhdGUgaGludD1cIkVudGVyIGEgdmFsdWUgdGhhdCdzIE5PVCBpbiB0aGUgbGlzdCwgdGhlbiBoaXQgcmV0dXJuXCIgLz5cblx0XHQqL31cblx0PC9kaXY+LFxuXHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZXhhbXBsZScpXG4pO1xuXG4vLyA8U3RhdGVzIGxhYmVsPVwiU3RhdGVzXCIgc2VhcmNoYWJsZSAvPlxuLy9cbi8vIDxDb250cmlidXRvcnMgbGFiZWw9XCJDb250cmlidXRvcnMgKEFzeW5jKVwiIC8+XG4vLyA8TnVtZXJpY1NlbGVjdCBsYWJlbD1cIk51bWVyaWMgVmFsdWVzXCIgLz5cbi8vIDxDdXN0b21SZW5kZXIgbGFiZWw9XCJDdXN0b20gUmVuZGVyIE1ldGhvZHNcIi8+XG4vLyA8Q3VzdG9tQ29tcG9uZW50cyBsYWJlbD1cIkN1c3RvbSBQbGFjZWhvbGRlciwgT3B0aW9uIGFuZCBWYWx1ZSBDb21wb25lbnRzXCIgLz5cbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVmlydHVhbGl6ZWRTZWxlY3QgZnJvbSAncmVhY3QtdmlydHVhbGl6ZWQtc2VsZWN0JztcblxuY29uc3QgREFUQSA9IHJlcXVpcmUoJy4uL2RhdGEvY2l0aWVzJyk7XG5cbnZhciBDaXRpZXNGaWVsZCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0ZGlzcGxheU5hbWU6ICdDaXRpZXNGaWVsZCcsXG5cdGdldEluaXRpYWxTdGF0ZSAoKSB7XG5cdFx0cmV0dXJuIHt9O1xuXHR9LFxuXHR1cGRhdGVWYWx1ZSAobmV3VmFsdWUpIHtcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdHNlbGVjdFZhbHVlOiBuZXdWYWx1ZVxuXHRcdH0pO1xuXHR9LFxuXHRyZW5kZXIgKCkge1xuXHRcdHZhciBvcHRpb25zID0gREFUQS5DSVRJRVM7XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwic2VjdGlvblwiPlxuXHRcdFx0XHQ8aDMgY2xhc3NOYW1lPVwic2VjdGlvbi1oZWFkaW5nXCI+TGFyZ2UgRGF0YXNldHM8L2gzPlxuXHRcdFx0XHQ8VmlydHVhbGl6ZWRTZWxlY3QgcmVmPVwiY2l0eVNlbGVjdFwiXG5cdFx0XHRcdFx0YXV0b2ZvY3VzXG5cdFx0XHRcdFx0b3B0aW9ucz17b3B0aW9uc31cblx0XHRcdFx0XHRzaW1wbGVWYWx1ZVxuXHRcdFx0XHRcdGNsZWFyYWJsZVxuXHRcdFx0XHRcdG5hbWU9XCJzZWxlY3QtY2l0eVwiXG5cdFx0XHRcdFx0dmFsdWU9e3RoaXMuc3RhdGUuc2VsZWN0VmFsdWV9XG5cdFx0XHRcdFx0b25DaGFuZ2U9e3RoaXMudXBkYXRlVmFsdWV9XG5cdFx0XHRcdFx0c2VhcmNoYWJsZVxuXHRcdFx0XHRcdGxhYmVsS2V5PVwibmFtZVwiXG5cdFx0XHRcdFx0dmFsdWVLZXk9XCJuYW1lXCJcblx0XHRcdFx0Lz5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJoaW50XCI+XG5cdFx0XHRcdFx0VXNlcyA8YSBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL2J2YXVnaG4vcmVhY3QtdmlydHVhbGl6ZWRcIj5yZWFjdC12aXJ0dWFsaXplZDwvYT4gYW5kIDxhIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20vYnZhdWdobi9yZWFjdC12aXJ0dWFsaXplZC1zZWxlY3QvXCI+cmVhY3QtdmlydHVhbGl6ZWQtc2VsZWN0PC9hPiB0byBkaXNwbGF5IGEgbGlzdCBvZiB0aGUgd29ybGQncyAxLDAwMCBsYXJnZXN0IGNpdGllcy5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59KTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IENpdGllc0ZpZWxkO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBTZWxlY3QgZnJvbSAncmVhY3Qtc2VsZWN0JztcblxuY29uc3QgQ09OVFJJQlVUT1JTID0gcmVxdWlyZSgnLi4vZGF0YS9jb250cmlidXRvcnMnKTtcbmNvbnN0IE1BWF9DT05UUklCVVRPUlMgPSA2O1xuY29uc3QgQVNZTkNfREVMQVkgPSA1MDA7XG5cbmNvbnN0IENvbnRyaWJ1dG9ycyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0ZGlzcGxheU5hbWU6ICdDb250cmlidXRvcnMnLFxuXHRwcm9wVHlwZXM6IHtcblx0XHRsYWJlbDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcblx0fSxcblx0Z2V0SW5pdGlhbFN0YXRlICgpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0bXVsdGk6IHRydWUsXG5cdFx0XHR2YWx1ZTogW0NPTlRSSUJVVE9SU1swXV0sXG5cdFx0fTtcblx0fSxcblx0b25DaGFuZ2UgKHZhbHVlKSB7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHR2YWx1ZTogdmFsdWUsXG5cdFx0fSk7XG5cdH0sXG5cdHN3aXRjaFRvTXVsdGkgKCkge1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0bXVsdGk6IHRydWUsXG5cdFx0XHR2YWx1ZTogW3RoaXMuc3RhdGUudmFsdWVdLFxuXHRcdH0pO1xuXHR9LFxuXHRzd2l0Y2hUb1NpbmdsZSAoKSB7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRtdWx0aTogZmFsc2UsXG5cdFx0XHR2YWx1ZTogdGhpcy5zdGF0ZS52YWx1ZVswXSxcblx0XHR9KTtcblx0fSxcblx0Z2V0Q29udHJpYnV0b3JzIChpbnB1dCwgY2FsbGJhY2spIHtcblx0XHRpbnB1dCA9IGlucHV0LnRvTG93ZXJDYXNlKCk7XG5cdFx0dmFyIG9wdGlvbnMgPSBDT05UUklCVVRPUlMuZmlsdGVyKGkgPT4ge1xuXHRcdFx0cmV0dXJuIGkuZ2l0aHViLnN1YnN0cigwLCBpbnB1dC5sZW5ndGgpID09PSBpbnB1dDtcblx0XHR9KTtcblx0XHR2YXIgZGF0YSA9IHtcblx0XHRcdG9wdGlvbnM6IG9wdGlvbnMuc2xpY2UoMCwgTUFYX0NPTlRSSUJVVE9SUyksXG5cdFx0XHRjb21wbGV0ZTogb3B0aW9ucy5sZW5ndGggPD0gTUFYX0NPTlRSSUJVVE9SUyxcblx0XHR9O1xuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0XHRjYWxsYmFjayhudWxsLCBkYXRhKTtcblx0XHR9LCBBU1lOQ19ERUxBWSk7XG5cdH0sXG5cdGdvdG9Db250cmlidXRvciAodmFsdWUsIGV2ZW50KSB7XG5cdFx0d2luZG93Lm9wZW4oJ2h0dHBzOi8vZ2l0aHViLmNvbS8nICsgdmFsdWUuZ2l0aHViKTtcblx0fSxcblx0cmVuZGVyICgpIHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJzZWN0aW9uXCI+XG5cdFx0XHRcdDxoMyBjbGFzc05hbWU9XCJzZWN0aW9uLWhlYWRpbmdcIj57dGhpcy5wcm9wcy5sYWJlbH08L2gzPlxuXHRcdFx0XHQ8U2VsZWN0LkFzeW5jIG11bHRpPXt0aGlzLnN0YXRlLm11bHRpfSB2YWx1ZT17dGhpcy5zdGF0ZS52YWx1ZX0gb25DaGFuZ2U9e3RoaXMub25DaGFuZ2V9IG9uVmFsdWVDbGljaz17dGhpcy5nb3RvQ29udHJpYnV0b3J9IHZhbHVlS2V5PVwiZ2l0aHViXCIgbGFiZWxLZXk9XCJuYW1lXCIgbG9hZE9wdGlvbnM9e3RoaXMuZ2V0Q29udHJpYnV0b3JzfSAvPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNoZWNrYm94LWxpc3RcIj5cblx0XHRcdFx0XHQ8bGFiZWwgY2xhc3NOYW1lPVwiY2hlY2tib3hcIj5cblx0XHRcdFx0XHRcdDxpbnB1dCB0eXBlPVwicmFkaW9cIiBjbGFzc05hbWU9XCJjaGVja2JveC1jb250cm9sXCIgY2hlY2tlZD17dGhpcy5zdGF0ZS5tdWx0aX0gb25DaGFuZ2U9e3RoaXMuc3dpdGNoVG9NdWx0aX0vPlxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwiY2hlY2tib3gtbGFiZWxcIj5NdWx0aXNlbGVjdDwvc3Bhbj5cblx0XHRcdFx0XHQ8L2xhYmVsPlxuXHRcdFx0XHRcdDxsYWJlbCBjbGFzc05hbWU9XCJjaGVja2JveFwiPlxuXHRcdFx0XHRcdFx0PGlucHV0IHR5cGU9XCJyYWRpb1wiIGNsYXNzTmFtZT1cImNoZWNrYm94LWNvbnRyb2xcIiBjaGVja2VkPXshdGhpcy5zdGF0ZS5tdWx0aX0gb25DaGFuZ2U9e3RoaXMuc3dpdGNoVG9TaW5nbGV9Lz5cblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cImNoZWNrYm94LWxhYmVsXCI+U2luZ2xlIFZhbHVlPC9zcGFuPlxuXHRcdFx0XHRcdDwvbGFiZWw+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImhpbnRcIj5UaGlzIGV4YW1wbGUgaW1wbGVtZW50cyBjdXN0b20gbGFiZWwgYW5kIHZhbHVlIHByb3BlcnRpZXMsIGFzeW5jIG9wdGlvbnMgYW5kIG9wZW5zIHRoZSBnaXRodWIgcHJvZmlsZXMgaW4gYSBuZXcgd2luZG93IHdoZW4gdmFsdWVzIGFyZSBjbGlja2VkPC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBDb250cmlidXRvcnM7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFNlbGVjdCBmcm9tICdyZWFjdC1zZWxlY3QnO1xuaW1wb3J0IEdyYXZhdGFyIGZyb20gJ3JlYWN0LWdyYXZhdGFyJztcblxuY29uc3QgVVNFUlMgPSByZXF1aXJlKCcuLi9kYXRhL3VzZXJzJyk7XG5jb25zdCBHUkFWQVRBUl9TSVpFID0gMTU7XG5cbmNvbnN0IEdyYXZhdGFyT3B0aW9uID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRwcm9wVHlwZXM6IHtcblx0XHRjaGlsZHJlbjogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG5cdFx0Y2xhc3NOYW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuXHRcdGlzRGlzYWJsZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuXHRcdGlzRm9jdXNlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG5cdFx0aXNTZWxlY3RlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG5cdFx0b25Gb2N1czogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG5cdFx0b25TZWxlY3Q6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuXHRcdG9uVW5mb2N1czogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG5cdFx0b3B0aW9uOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG5cdH0sXG5cdGhhbmRsZU1vdXNlRG93biAoZXZlbnQpIHtcblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdHRoaXMucHJvcHMub25TZWxlY3QodGhpcy5wcm9wcy5vcHRpb24sIGV2ZW50KTtcblx0fSxcblx0aGFuZGxlTW91c2VFbnRlciAoZXZlbnQpIHtcblx0XHR0aGlzLnByb3BzLm9uRm9jdXModGhpcy5wcm9wcy5vcHRpb24sIGV2ZW50KTtcblx0fSxcblx0aGFuZGxlTW91c2VNb3ZlIChldmVudCkge1xuXHRcdGlmICh0aGlzLnByb3BzLmlzRm9jdXNlZCkgcmV0dXJuO1xuXHRcdHRoaXMucHJvcHMub25Gb2N1cyh0aGlzLnByb3BzLm9wdGlvbiwgZXZlbnQpO1xuXHR9LFxuXHRoYW5kbGVNb3VzZUxlYXZlIChldmVudCkge1xuXHRcdHRoaXMucHJvcHMub25VbmZvY3VzKHRoaXMucHJvcHMub3B0aW9uLCBldmVudCk7XG5cdH0sXG5cdHJlbmRlciAoKSB7XG5cdFx0bGV0IGdyYXZhdGFyU3R5bGUgPSB7XG5cdFx0XHRib3JkZXJSYWRpdXM6IDMsXG5cdFx0XHRkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcblx0XHRcdG1hcmdpblJpZ2h0OiAxMCxcblx0XHRcdHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuXHRcdFx0dG9wOiAtMixcblx0XHRcdHZlcnRpY2FsQWxpZ246ICdtaWRkbGUnLFxuXHRcdH07XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPXt0aGlzLnByb3BzLmNsYXNzTmFtZX1cblx0XHRcdFx0b25Nb3VzZURvd249e3RoaXMuaGFuZGxlTW91c2VEb3dufVxuXHRcdFx0XHRvbk1vdXNlRW50ZXI9e3RoaXMuaGFuZGxlTW91c2VFbnRlcn1cblx0XHRcdFx0b25Nb3VzZU1vdmU9e3RoaXMuaGFuZGxlTW91c2VNb3ZlfVxuXHRcdFx0XHRvbk1vdXNlTGVhdmU9e3RoaXMuaGFuZGxlTW91c2VMZWF2ZX1cblx0XHRcdFx0dGl0bGU9e3RoaXMucHJvcHMub3B0aW9uLnRpdGxlfT5cblx0XHRcdFx0PEdyYXZhdGFyIGVtYWlsPXt0aGlzLnByb3BzLm9wdGlvbi5lbWFpbH0gc2l6ZT17R1JBVkFUQVJfU0laRX0gc3R5bGU9e2dyYXZhdGFyU3R5bGV9IC8+XG5cdFx0XHRcdHt0aGlzLnByb3BzLmNoaWxkcmVufVxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufSk7XG5cbmNvbnN0IEdyYXZhdGFyVmFsdWUgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdHByb3BUeXBlczoge1xuXHRcdGNoaWxkcmVuOiBSZWFjdC5Qcm9wVHlwZXMubm9kZSxcblx0XHRwbGFjZWhvbGRlcjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcblx0XHR2YWx1ZTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdFxuXHR9LFxuXHRyZW5kZXIgKCkge1xuXHRcdHZhciBncmF2YXRhclN0eWxlID0ge1xuXHRcdFx0Ym9yZGVyUmFkaXVzOiAzLFxuXHRcdFx0ZGlzcGxheTogJ2lubGluZS1ibG9jaycsXG5cdFx0XHRtYXJnaW5SaWdodDogMTAsXG5cdFx0XHRwb3NpdGlvbjogJ3JlbGF0aXZlJyxcblx0XHRcdHRvcDogLTIsXG5cdFx0XHR2ZXJ0aWNhbEFsaWduOiAnbWlkZGxlJyxcblx0XHR9O1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIlNlbGVjdC12YWx1ZVwiIHRpdGxlPXt0aGlzLnByb3BzLnZhbHVlLnRpdGxlfT5cblx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwiU2VsZWN0LXZhbHVlLWxhYmVsXCI+XG5cdFx0XHRcdFx0PEdyYXZhdGFyIGVtYWlsPXt0aGlzLnByb3BzLnZhbHVlLmVtYWlsfSBzaXplPXtHUkFWQVRBUl9TSVpFfSBzdHlsZT17Z3JhdmF0YXJTdHlsZX0gLz5cblx0XHRcdFx0XHR7dGhpcy5wcm9wcy5jaGlsZHJlbn1cblx0XHRcdFx0PC9zcGFuPlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufSk7XG5cbmNvbnN0IFVzZXJzRmllbGQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdHByb3BUeXBlczoge1xuXHRcdGhpbnQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG5cdFx0bGFiZWw6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG5cdH0sXG5cdGdldEluaXRpYWxTdGF0ZSAoKSB7XG5cdFx0cmV0dXJuIHt9O1xuXHR9LFxuXHRzZXRWYWx1ZSAodmFsdWUpIHtcblx0XHR0aGlzLnNldFN0YXRlKHsgdmFsdWUgfSk7XG5cdH0sXG5cdHJlbmRlciAoKSB7XG5cdFx0dmFyIHBsYWNlaG9sZGVyID0gPHNwYW4+JiM5Nzg2OyBTZWxlY3QgVXNlcjwvc3Bhbj47XG5cblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJzZWN0aW9uXCI+XG5cdFx0XHRcdDxoMyBjbGFzc05hbWU9XCJzZWN0aW9uLWhlYWRpbmdcIj57dGhpcy5wcm9wcy5sYWJlbH08L2gzPlxuXHRcdFx0XHQ8U2VsZWN0XG5cdFx0XHRcdFx0b25DaGFuZ2U9e3RoaXMuc2V0VmFsdWV9XG5cdFx0XHRcdFx0b3B0aW9uQ29tcG9uZW50PXtHcmF2YXRhck9wdGlvbn1cblx0XHRcdFx0XHRvcHRpb25zPXtVU0VSU31cblx0XHRcdFx0XHRwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJ9XG5cdFx0XHRcdFx0dmFsdWU9e3RoaXMuc3RhdGUudmFsdWV9XG5cdFx0XHRcdFx0dmFsdWVDb21wb25lbnQ9e0dyYXZhdGFyVmFsdWV9XG5cdFx0XHRcdFx0Lz5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJoaW50XCI+XG5cdFx0XHRcdFx0VGhpcyBleGFtcGxlIGltcGxlbWVudHMgY3VzdG9tIE9wdGlvbiBhbmQgVmFsdWUgY29tcG9uZW50cyB0byByZW5kZXIgYSBHcmF2YXRhciBpbWFnZSBmb3IgZWFjaCB1c2VyIGJhc2VkIG9uIHRoZWlyIGVtYWlsLlxuXHRcdFx0XHRcdEl0IGFsc28gZGVtb25zdHJhdGVzIHJlbmRlcmluZyBIVE1MIGVsZW1lbnRzIGFzIHRoZSBwbGFjZWhvbGRlci5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBVc2Vyc0ZpZWxkO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBTZWxlY3QgZnJvbSAncmVhY3Qtc2VsZWN0JztcblxudmFyIERpc2FibGVkVXBzZWxsT3B0aW9ucyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0ZGlzcGxheU5hbWU6ICdEaXNhYmxlZFVwc2VsbE9wdGlvbnMnLFxuXHRwcm9wVHlwZXM6IHtcblx0XHRsYWJlbDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcblx0fSxcblx0Z2V0SW5pdGlhbFN0YXRlICgpIHtcblx0XHRyZXR1cm4ge307XG5cdH0sXG5cdHNldFZhbHVlICh2YWx1ZSkge1xuXHRcdHRoaXMuc2V0U3RhdGUoeyB2YWx1ZSB9KTtcblx0XHRjb25zb2xlLmxvZygnU3VwcG9ydCBsZXZlbCBzZWxlY3RlZDonLCB2YWx1ZS5sYWJlbCk7XG5cdH0sXG5cdHJlbmRlckxpbms6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiA8YSBzdHlsZT17eyBtYXJnaW5MZWZ0OiA1IH19IGhyZWY9XCIvdXBncmFkZVwiIHRhcmdldD1cIl9ibGFua1wiPlVwZ3JhZGUgaGVyZSE8L2E+O1xuXHR9LFxuXHRyZW5kZXJPcHRpb246IGZ1bmN0aW9uKG9wdGlvbikge1xuXHRcdHJldHVybiA8c3BhbiBzdHlsZT17eyBjb2xvcjogb3B0aW9uLmNvbG9yIH19PntvcHRpb24ubGFiZWx9IHtvcHRpb24ubGlua308L3NwYW4+O1xuXHR9LFxuXHRyZW5kZXJWYWx1ZTogZnVuY3Rpb24ob3B0aW9uKSB7XG5cdFx0cmV0dXJuIDxzdHJvbmcgc3R5bGU9e3sgY29sb3I6IG9wdGlvbi5jb2xvciB9fT57b3B0aW9uLmxhYmVsfTwvc3Ryb25nPjtcblx0fSxcblx0cmVuZGVyOiBmdW5jdGlvbigpIHtcblx0XHR2YXIgb3B0aW9ucyA9IFtcblx0XHRcdHsgbGFiZWw6ICdCYXNpYyBjdXN0b21lciBzdXBwb3J0JywgdmFsdWU6ICdiYXNpYycsIGNvbG9yOiAnI0UzMTg2NCcgfSxcblx0XHRcdHsgbGFiZWw6ICdQcmVtaXVtIGN1c3RvbWVyIHN1cHBvcnQnLCB2YWx1ZTogJ3ByZW1pdW0nLCBjb2xvcjogJyM2MjE2QTMnIH0sXG5cdFx0XHR7IGxhYmVsOiAnUHJvIGN1c3RvbWVyIHN1cHBvcnQnLCB2YWx1ZTogJ3BybycsIGRpc2FibGVkOiB0cnVlLCBsaW5rOiB0aGlzLnJlbmRlckxpbmsoKSB9LFxuXHRcdF07XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwic2VjdGlvblwiPlxuXHRcdFx0XHQ8aDMgY2xhc3NOYW1lPVwic2VjdGlvbi1oZWFkaW5nXCI+e3RoaXMucHJvcHMubGFiZWx9PC9oMz5cblx0XHRcdFx0PFNlbGVjdFxuXHRcdFx0XHRcdHBsYWNlaG9sZGVyPVwiU2VsZWN0IHlvdXIgc3VwcG9ydCBsZXZlbFwiXG5cdFx0XHRcdFx0b3B0aW9ucz17b3B0aW9uc31cblx0XHRcdFx0XHRvcHRpb25SZW5kZXJlcj17dGhpcy5yZW5kZXJPcHRpb259XG5cdFx0XHRcdFx0b25DaGFuZ2U9e3RoaXMuc2V0VmFsdWV9XG5cdFx0XHRcdFx0dmFsdWU9e3RoaXMuc3RhdGUudmFsdWV9XG5cdFx0XHRcdFx0dmFsdWVSZW5kZXJlcj17dGhpcy5yZW5kZXJWYWx1ZX1cblx0XHRcdFx0XHQvPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImhpbnRcIj5UaGlzIGRlbW9uc3RhdGVzIGN1c3RvbSByZW5kZXIgbWV0aG9kcyBhbmQgbGlua3MgaW4gZGlzYWJsZWQgb3B0aW9uczwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufSk7XG5tb2R1bGUuZXhwb3J0cyA9IERpc2FibGVkVXBzZWxsT3B0aW9ucztcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgU2VsZWN0IGZyb20gJ3JlYWN0LXNlbGVjdCc7XG5cbmNvbnN0IEZMQVZPVVJTID0gW1xuXHR7IGxhYmVsOiAnQ2hvY29sYXRlJywgdmFsdWU6ICdjaG9jb2xhdGUnIH0sXG5cdHsgbGFiZWw6ICdWYW5pbGxhJywgdmFsdWU6ICd2YW5pbGxhJyB9LFxuXHR7IGxhYmVsOiAnU3RyYXdiZXJyeScsIHZhbHVlOiAnc3RyYXdiZXJyeScgfSxcblx0eyBsYWJlbDogJ0NhcmFtZWwnLCB2YWx1ZTogJ2NhcmFtZWwnIH0sXG5cdHsgbGFiZWw6ICdDb29raWVzIGFuZCBDcmVhbScsIHZhbHVlOiAnY29va2llc2NyZWFtJyB9LFxuXHR7IGxhYmVsOiAnUGVwcGVybWludCcsIHZhbHVlOiAncGVwcGVybWludCcgfSxcbl07XG5cbmNvbnN0IFdIWV9XT1VMRF9ZT1UgPSBbXG5cdHsgbGFiZWw6ICdDaG9jb2xhdGUgKGFyZSB5b3UgY3Jhenk/KScsIHZhbHVlOiAnY2hvY29sYXRlJywgZGlzYWJsZWQ6IHRydWUgfSxcbl0uY29uY2F0KEZMQVZPVVJTLnNsaWNlKDEpKTtcblxudmFyIE11bHRpU2VsZWN0RmllbGQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdGRpc3BsYXlOYW1lOiAnTXVsdGlTZWxlY3RGaWVsZCcsXG5cdHByb3BUeXBlczoge1xuXHRcdGxhYmVsOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuXHR9LFxuXHRnZXRJbml0aWFsU3RhdGUgKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRkaXNhYmxlZDogZmFsc2UsXG5cdFx0XHRjcmF6eTogZmFsc2UsXG5cdFx0XHRvcHRpb25zOiBGTEFWT1VSUyxcblx0XHRcdHZhbHVlOiBbXSxcblx0XHR9O1xuXHR9LFxuXHRoYW5kbGVTZWxlY3RDaGFuZ2UgKHZhbHVlKSB7XG5cdFx0Y29uc29sZS5sb2coJ1lvdVxcJ3ZlIHNlbGVjdGVkOicsIHZhbHVlKTtcblx0XHR0aGlzLnNldFN0YXRlKHsgdmFsdWUgfSk7XG5cdH0sXG5cdHRvZ2dsZURpc2FibGVkIChlKSB7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7IGRpc2FibGVkOiBlLnRhcmdldC5jaGVja2VkIH0pO1xuXHR9LFxuXHR0b2dnbGVDaG9jb2xhdGUgKGUpIHtcblx0XHRsZXQgY3JhenkgPSBlLnRhcmdldC5jaGVja2VkO1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0Y3Jhenk6IGNyYXp5LFxuXHRcdFx0b3B0aW9uczogY3JhenkgPyBXSFlfV09VTERfWU9VIDogRkxBVk9VUlMsXG5cdFx0fSk7XG5cdH0sXG5cdHJlbmRlciAoKSB7XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwic2VjdGlvblwiPlxuXHRcdFx0XHQ8aDMgY2xhc3NOYW1lPVwic2VjdGlvbi1oZWFkaW5nXCI+e3RoaXMucHJvcHMubGFiZWx9PC9oMz5cblx0XHRcdFx0PFNlbGVjdCBtdWx0aSBzaW1wbGVWYWx1ZSBkaXNhYmxlZD17dGhpcy5zdGF0ZS5kaXNhYmxlZH0gdmFsdWU9e3RoaXMuc3RhdGUudmFsdWV9IHBsYWNlaG9sZGVyPVwiU2VsZWN0IHlvdXIgZmF2b3VyaXRlKHMpXCIgb3B0aW9ucz17dGhpcy5zdGF0ZS5vcHRpb25zfSBvbkNoYW5nZT17dGhpcy5oYW5kbGVTZWxlY3RDaGFuZ2V9IC8+XG5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjaGVja2JveC1saXN0XCI+XG5cdFx0XHRcdFx0PGxhYmVsIGNsYXNzTmFtZT1cImNoZWNrYm94XCI+XG5cdFx0XHRcdFx0XHQ8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgY2xhc3NOYW1lPVwiY2hlY2tib3gtY29udHJvbFwiIGNoZWNrZWQ9e3RoaXMuc3RhdGUuZGlzYWJsZWR9IG9uQ2hhbmdlPXt0aGlzLnRvZ2dsZURpc2FibGVkfSAvPlxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwiY2hlY2tib3gtbGFiZWxcIj5EaXNhYmxlIHRoZSBjb250cm9sPC9zcGFuPlxuXHRcdFx0XHRcdDwvbGFiZWw+XG5cdFx0XHRcdFx0PGxhYmVsIGNsYXNzTmFtZT1cImNoZWNrYm94XCI+XG5cdFx0XHRcdFx0XHQ8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgY2xhc3NOYW1lPVwiY2hlY2tib3gtY29udHJvbFwiIGNoZWNrZWQ9e3RoaXMuc3RhdGUuY3Jhenl9IG9uQ2hhbmdlPXt0aGlzLnRvZ2dsZUNob2NvbGF0ZX0gLz5cblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cImNoZWNrYm94LWxhYmVsXCI+SSBkb24ndCBsaWtlIENob2NvbGF0ZSAoZGlzYWJsZWQgdGhlIG9wdGlvbik8L3NwYW4+XG5cdFx0XHRcdFx0PC9sYWJlbD5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBNdWx0aVNlbGVjdEZpZWxkO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBTZWxlY3QgZnJvbSAncmVhY3Qtc2VsZWN0JztcblxudmFyIFZhbHVlc0FzTnVtYmVyc0ZpZWxkID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRkaXNwbGF5TmFtZTogJ1ZhbHVlc0FzTnVtYmVyc0ZpZWxkJyxcblx0cHJvcFR5cGVzOiB7XG5cdFx0bGFiZWw6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmdcblx0fSxcblx0Z2V0SW5pdGlhbFN0YXRlICgpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0b3B0aW9uczogW1xuXHRcdFx0XHR7IHZhbHVlOiAxMCwgbGFiZWw6ICdUZW4nIH0sXG5cdFx0XHRcdHsgdmFsdWU6IDExLCBsYWJlbDogJ0VsZXZlbicgfSxcblx0XHRcdFx0eyB2YWx1ZTogMTIsIGxhYmVsOiAnVHdlbHZlJyB9LFxuXHRcdFx0XHR7IHZhbHVlOiAyMywgbGFiZWw6ICdUd2VudHktdGhyZWUnIH0sXG5cdFx0XHRcdHsgdmFsdWU6IDI0LCBsYWJlbDogJ1R3ZW50eS1mb3VyJyB9XG5cdFx0XHRdLFxuXHRcdFx0bWF0Y2hQb3M6ICdhbnknLFxuXHRcdFx0bWF0Y2hWYWx1ZTogdHJ1ZSxcblx0XHRcdG1hdGNoTGFiZWw6IHRydWUsXG5cdFx0XHR2YWx1ZTogbnVsbCxcblx0XHRcdG11bHRpOiBmYWxzZVxuXHRcdH07XG5cdH0sXG5cdG9uQ2hhbmdlTWF0Y2hTdGFydChldmVudCkge1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0bWF0Y2hQb3M6IGV2ZW50LnRhcmdldC5jaGVja2VkID8gJ3N0YXJ0JyA6ICdhbnknXG5cdFx0fSk7XG5cdH0sXG5cdG9uQ2hhbmdlTWF0Y2hWYWx1ZShldmVudCkge1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0bWF0Y2hWYWx1ZTogZXZlbnQudGFyZ2V0LmNoZWNrZWRcblx0XHR9KTtcblx0fSxcblx0b25DaGFuZ2VNYXRjaExhYmVsKGV2ZW50KSB7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRtYXRjaExhYmVsOiBldmVudC50YXJnZXQuY2hlY2tlZFxuXHRcdH0pO1xuXHR9LFxuXHRvbkNoYW5nZSh2YWx1ZSkge1xuXHRcdHRoaXMuc2V0U3RhdGUoeyB2YWx1ZSB9KTtcblx0XHRjb25zb2xlLmxvZygnTnVtZXJpYyBTZWxlY3QgdmFsdWUgY2hhbmdlZCB0bycsIHZhbHVlKTtcblx0fSxcblx0b25DaGFuZ2VNdWx0aShldmVudCkge1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0bXVsdGk6IGV2ZW50LnRhcmdldC5jaGVja2VkXG5cdFx0fSk7XG5cdH0sXG5cdHJlbmRlciAoKSB7XG5cdFx0dmFyIG1hdGNoUHJvcCA9ICdhbnknO1xuXHRcdGlmICh0aGlzLnN0YXRlLm1hdGNoTGFiZWwgJiYgIXRoaXMuc3RhdGUubWF0Y2hWYWx1ZSkge1xuXHRcdFx0bWF0Y2hQcm9wID0gJ2xhYmVsJztcblx0XHR9XG5cdFx0aWYgKCF0aGlzLnN0YXRlLm1hdGNoTGFiZWwgJiYgdGhpcy5zdGF0ZS5tYXRjaFZhbHVlKSB7XG5cdFx0XHRtYXRjaFByb3AgPSAndmFsdWUnO1xuXHRcdH1cblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJzZWN0aW9uXCI+XG5cdFx0XHRcdDxoMyBjbGFzc05hbWU9XCJzZWN0aW9uLWhlYWRpbmdcIj57dGhpcy5wcm9wcy5sYWJlbH08L2gzPlxuXHRcdFx0XHQ8U2VsZWN0XG5cdFx0XHRcdFx0bWF0Y2hQb3M9e3RoaXMuc3RhdGUubWF0Y2hQb3N9XG5cdFx0XHRcdFx0bWF0Y2hQcm9wPXttYXRjaFByb3B9XG5cdFx0XHRcdFx0bXVsdGk9e3RoaXMuc3RhdGUubXVsdGl9XG5cdFx0XHRcdFx0b25DaGFuZ2U9e3RoaXMub25DaGFuZ2V9XG5cdFx0XHRcdFx0b3B0aW9ucz17dGhpcy5zdGF0ZS5vcHRpb25zfVxuXHRcdFx0XHRcdHNpbXBsZVZhbHVlXG5cdFx0XHRcdFx0dmFsdWU9e3RoaXMuc3RhdGUudmFsdWV9XG5cdFx0XHRcdFx0Lz5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjaGVja2JveC1saXN0XCI+XG5cdFx0XHRcdFx0PGxhYmVsIGNsYXNzTmFtZT1cImNoZWNrYm94XCI+XG5cdFx0XHRcdFx0XHQ8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgY2xhc3NOYW1lPVwiY2hlY2tib3gtY29udHJvbFwiIGNoZWNrZWQ9e3RoaXMuc3RhdGUubXVsdGl9IG9uQ2hhbmdlPXt0aGlzLm9uQ2hhbmdlTXVsdGl9IC8+XG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJjaGVja2JveC1sYWJlbFwiPk11bHRpLVNlbGVjdDwvc3Bhbj5cblx0XHRcdFx0XHQ8L2xhYmVsPlxuXHRcdFx0XHRcdDxsYWJlbCBjbGFzc05hbWU9XCJjaGVja2JveFwiPlxuXHRcdFx0XHRcdFx0PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGNsYXNzTmFtZT1cImNoZWNrYm94LWNvbnRyb2xcIiBjaGVja2VkPXt0aGlzLnN0YXRlLm1hdGNoVmFsdWV9IG9uQ2hhbmdlPXt0aGlzLm9uQ2hhbmdlTWF0Y2hWYWx1ZX0gLz5cblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cImNoZWNrYm94LWxhYmVsXCI+TWF0Y2ggdmFsdWUgb25seTwvc3Bhbj5cblx0XHRcdFx0XHQ8L2xhYmVsPlxuXHRcdFx0XHRcdDxsYWJlbCBjbGFzc05hbWU9XCJjaGVja2JveFwiPlxuXHRcdFx0XHRcdFx0PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGNsYXNzTmFtZT1cImNoZWNrYm94LWNvbnRyb2xcIiBjaGVja2VkPXt0aGlzLnN0YXRlLm1hdGNoTGFiZWx9IG9uQ2hhbmdlPXt0aGlzLm9uQ2hhbmdlTWF0Y2hMYWJlbH0gLz5cblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cImNoZWNrYm94LWxhYmVsXCI+TWF0Y2ggbGFiZWwgb25seTwvc3Bhbj5cblx0XHRcdFx0XHQ8L2xhYmVsPlxuXHRcdFx0XHRcdDxsYWJlbCBjbGFzc05hbWU9XCJjaGVja2JveFwiPlxuXHRcdFx0XHRcdFx0PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGNsYXNzTmFtZT1cImNoZWNrYm94LWNvbnRyb2xcIiBjaGVja2VkPXt0aGlzLnN0YXRlLm1hdGNoUG9zID09PSAnc3RhcnQnfSBvbkNoYW5nZT17dGhpcy5vbkNoYW5nZU1hdGNoU3RhcnR9IC8+XG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJjaGVja2JveC1sYWJlbFwiPk9ubHkgaW5jbHVkZSBtYXRjaGVzIGZyb20gdGhlIHN0YXJ0IG9mIHRoZSBzdHJpbmc8L3NwYW4+XG5cdFx0XHRcdFx0PC9sYWJlbD5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiaGludFwiPlRoaXMgZXhhbXBsZSB1c2VzIHNpbXBsZSBudW1lcmljIHZhbHVlczwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gVmFsdWVzQXNOdW1iZXJzRmllbGQ7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFNlbGVjdCBmcm9tICdyZWFjdC1zZWxlY3QnO1xuXG5jb25zdCBTVEFURVMgPSByZXF1aXJlKCcuLi9kYXRhL3N0YXRlcycpO1xuXG52YXIgU3RhdGVzRmllbGQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdGRpc3BsYXlOYW1lOiAnU3RhdGVzRmllbGQnLFxuXHRwcm9wVHlwZXM6IHtcblx0XHRsYWJlbDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcblx0XHRzZWFyY2hhYmxlOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcblx0fSxcblx0Z2V0RGVmYXVsdFByb3BzICgpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0bGFiZWw6ICdTdGF0ZXM6Jyxcblx0XHRcdHNlYXJjaGFibGU6IHRydWUsXG5cdFx0fTtcblx0fSxcblx0Z2V0SW5pdGlhbFN0YXRlICgpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0Y291bnRyeTogJ0FVJyxcblx0XHRcdGRpc2FibGVkOiBmYWxzZSxcblx0XHRcdHNlYXJjaGFibGU6IHRoaXMucHJvcHMuc2VhcmNoYWJsZSxcblx0XHRcdHNlbGVjdFZhbHVlOiAnbmV3LXNvdXRoLXdhbGVzJyxcblx0XHRcdGNsZWFyYWJsZTogdHJ1ZSxcblx0XHR9O1xuXHR9LFxuXHRzd2l0Y2hDb3VudHJ5IChlKSB7XG5cdFx0dmFyIG5ld0NvdW50cnkgPSBlLnRhcmdldC52YWx1ZTtcblx0XHRjb25zb2xlLmxvZygnQ291bnRyeSBjaGFuZ2VkIHRvICcgKyBuZXdDb3VudHJ5KTtcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdGNvdW50cnk6IG5ld0NvdW50cnksXG5cdFx0XHRzZWxlY3RWYWx1ZTogbnVsbFxuXHRcdH0pO1xuXHR9LFxuXHR1cGRhdGVWYWx1ZSAobmV3VmFsdWUpIHtcblx0XHRjb25zb2xlLmxvZygnU3RhdGUgY2hhbmdlZCB0byAnICsgbmV3VmFsdWUpO1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0c2VsZWN0VmFsdWU6IG5ld1ZhbHVlXG5cdFx0fSk7XG5cdH0sXG5cdGZvY3VzU3RhdGVTZWxlY3QgKCkge1xuXHRcdHRoaXMucmVmcy5zdGF0ZVNlbGVjdC5mb2N1cygpO1xuXHR9LFxuXHR0b2dnbGVDaGVja2JveCAoZSkge1xuXHRcdGxldCBuZXdTdGF0ZSA9IHt9O1xuXHRcdG5ld1N0YXRlW2UudGFyZ2V0Lm5hbWVdID0gZS50YXJnZXQuY2hlY2tlZDtcblx0XHR0aGlzLnNldFN0YXRlKG5ld1N0YXRlKTtcblx0fSxcblx0cmVuZGVyICgpIHtcblx0XHR2YXIgb3B0aW9ucyA9IFNUQVRFU1t0aGlzLnN0YXRlLmNvdW50cnldO1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInNlY3Rpb25cIj5cblx0XHRcdFx0PGgzIGNsYXNzTmFtZT1cInNlY3Rpb24taGVhZGluZ1wiPnt0aGlzLnByb3BzLmxhYmVsfTwvaDM+XG5cdFx0XHRcdDxTZWxlY3QgcmVmPVwic3RhdGVTZWxlY3RcIiBhdXRvZm9jdXMgb3B0aW9ucz17b3B0aW9uc30gc2ltcGxlVmFsdWUgY2xlYXJhYmxlPXt0aGlzLnN0YXRlLmNsZWFyYWJsZX0gbmFtZT1cInNlbGVjdGVkLXN0YXRlXCIgZGlzYWJsZWQ9e3RoaXMuc3RhdGUuZGlzYWJsZWR9IHZhbHVlPXt0aGlzLnN0YXRlLnNlbGVjdFZhbHVlfSBvbkNoYW5nZT17dGhpcy51cGRhdGVWYWx1ZX0gc2VhcmNoYWJsZT17dGhpcy5zdGF0ZS5zZWFyY2hhYmxlfSAvPlxuXG5cdFx0XHRcdDxkaXYgc3R5bGU9e3sgbWFyZ2luVG9wOiAxNCB9fT5cblx0XHRcdFx0XHQ8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXt0aGlzLmZvY3VzU3RhdGVTZWxlY3R9PkZvY3VzIFNlbGVjdDwvYnV0dG9uPlxuXHRcdFx0XHRcdDxsYWJlbCBjbGFzc05hbWU9XCJjaGVja2JveFwiIHN0eWxlPXt7IG1hcmdpbkxlZnQ6IDEwIH19PlxuXHRcdFx0XHRcdFx0PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGNsYXNzTmFtZT1cImNoZWNrYm94LWNvbnRyb2xcIiBuYW1lPVwic2VhcmNoYWJsZVwiIGNoZWNrZWQ9e3RoaXMuc3RhdGUuc2VhcmNoYWJsZX0gb25DaGFuZ2U9e3RoaXMudG9nZ2xlQ2hlY2tib3h9Lz5cblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cImNoZWNrYm94LWxhYmVsXCI+U2VhcmNoYWJsZTwvc3Bhbj5cblx0XHRcdFx0XHQ8L2xhYmVsPlxuXHRcdFx0XHRcdDxsYWJlbCBjbGFzc05hbWU9XCJjaGVja2JveFwiIHN0eWxlPXt7IG1hcmdpbkxlZnQ6IDEwIH19PlxuXHRcdFx0XHRcdFx0PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGNsYXNzTmFtZT1cImNoZWNrYm94LWNvbnRyb2xcIiBuYW1lPVwiZGlzYWJsZWRcIiBjaGVja2VkPXt0aGlzLnN0YXRlLmRpc2FibGVkfSBvbkNoYW5nZT17dGhpcy50b2dnbGVDaGVja2JveH0vPlxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwiY2hlY2tib3gtbGFiZWxcIj5EaXNhYmxlZDwvc3Bhbj5cblx0XHRcdFx0XHQ8L2xhYmVsPlxuXHRcdFx0XHRcdDxsYWJlbCBjbGFzc05hbWU9XCJjaGVja2JveFwiIHN0eWxlPXt7IG1hcmdpbkxlZnQ6IDEwIH19PlxuXHRcdFx0XHRcdFx0PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGNsYXNzTmFtZT1cImNoZWNrYm94LWNvbnRyb2xcIiBuYW1lPVwiY2xlYXJhYmxlXCIgY2hlY2tlZD17dGhpcy5zdGF0ZS5jbGVhcmFibGV9IG9uQ2hhbmdlPXt0aGlzLnRvZ2dsZUNoZWNrYm94fS8+XG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJjaGVja2JveC1sYWJlbFwiPkNsZWFyYWJsZTwvc3Bhbj5cblx0XHRcdFx0XHQ8L2xhYmVsPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjaGVja2JveC1saXN0XCI+XG5cdFx0XHRcdFx0PGxhYmVsIGNsYXNzTmFtZT1cImNoZWNrYm94XCI+XG5cdFx0XHRcdFx0XHQ8aW5wdXQgdHlwZT1cInJhZGlvXCIgY2xhc3NOYW1lPVwiY2hlY2tib3gtY29udHJvbFwiIGNoZWNrZWQ9e3RoaXMuc3RhdGUuY291bnRyeSA9PT0gJ0FVJ30gdmFsdWU9XCJBVVwiIG9uQ2hhbmdlPXt0aGlzLnN3aXRjaENvdW50cnl9Lz5cblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cImNoZWNrYm94LWxhYmVsXCI+QXVzdHJhbGlhPC9zcGFuPlxuXHRcdFx0XHRcdDwvbGFiZWw+XG5cdFx0XHRcdFx0PGxhYmVsIGNsYXNzTmFtZT1cImNoZWNrYm94XCI+XG5cdFx0XHRcdFx0XHQ8aW5wdXQgdHlwZT1cInJhZGlvXCIgY2xhc3NOYW1lPVwiY2hlY2tib3gtY29udHJvbFwiIGNoZWNrZWQ9e3RoaXMuc3RhdGUuY291bnRyeSA9PT0gJ1VTJ30gdmFsdWU9XCJVU1wiIG9uQ2hhbmdlPXt0aGlzLnN3aXRjaENvdW50cnl9Lz5cblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cImNoZWNrYm94LWxhYmVsXCI+VW5pdGVkIFN0YXRlczwvc3Bhbj5cblx0XHRcdFx0XHQ8L2xhYmVsPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn0pO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gU3RhdGVzRmllbGQ7XG4iLCJleHBvcnRzLkNJVElFUyA9IFtcbiAgeyBuYW1lOiAnQWJpbGVuZScgfSxcbiAgeyBuYW1lOiAnQWRkaXNvbicgfSxcbiAgeyBuYW1lOiAnQWtyb24nIH0sXG4gIHsgbmFtZTogJ0FsYW1lZGEnIH0sXG4gIHsgbmFtZTogJ0FsYmFueScgfSxcbiAgeyBuYW1lOiAnQWxiYW55JyB9LFxuICB7IG5hbWU6ICdBbGJhbnknIH0sXG4gIHsgbmFtZTogJ0FsYnVxdWVycXVlJyB9LFxuICB7IG5hbWU6ICdBbGV4YW5kcmlhJyB9LFxuICB7IG5hbWU6ICdBbGV4YW5kcmlhJyB9LFxuICB7IG5hbWU6ICdBbGhhbWJyYScgfSxcbiAgeyBuYW1lOiAnQWxpc28gVmllam8nIH0sXG4gIHsgbmFtZTogJ0FsbGVuJyB9LFxuICB7IG5hbWU6ICdBbGxlbnRvd24nIH0sXG4gIHsgbmFtZTogJ0FscGhhcmV0dGEnIH0sXG4gIHsgbmFtZTogJ0FsdGFtb250ZSBTcHJpbmdzJyB9LFxuICB7IG5hbWU6ICdBbHRvb25hJyB9LFxuICB7IG5hbWU6ICdBbWFyaWxsbycgfSxcbiAgeyBuYW1lOiAnQW1lcycgfSxcbiAgeyBuYW1lOiAnQW5haGVpbScgfSxcbiAgeyBuYW1lOiAnQW5jaG9yYWdlJyB9LFxuICB7IG5hbWU6ICdBbmRlcnNvbicgfSxcbiAgeyBuYW1lOiAnQW5rZW55JyB9LFxuICB7IG5hbWU6ICdBbm4gQXJib3InIH0sXG4gIHsgbmFtZTogJ0FubmFwb2xpcycgfSxcbiAgeyBuYW1lOiAnQW50aW9jaCcgfSxcbiAgeyBuYW1lOiAnQXBhY2hlIEp1bmN0aW9uJyB9LFxuICB7IG5hbWU6ICdBcGV4JyB9LFxuICB7IG5hbWU6ICdBcG9wa2EnIH0sXG4gIHsgbmFtZTogJ0FwcGxlIFZhbGxleScgfSxcbiAgeyBuYW1lOiAnQXBwbGUgVmFsbGV5JyB9LFxuICB7IG5hbWU6ICdBcHBsZXRvbicgfSxcbiAgeyBuYW1lOiAnQXJjYWRpYScgfSxcbiAgeyBuYW1lOiAnQXJsaW5ndG9uJyB9LFxuICB7IG5hbWU6ICdBcmxpbmd0b24gSGVpZ2h0cycgfSxcbiAgeyBuYW1lOiAnQXJ2YWRhJyB9LFxuICB7IG5hbWU6ICdBc2hldmlsbGUnIH0sXG4gIHsgbmFtZTogJ0F0aGVucy1DbGFya2UgQ291bnR5JyB9LFxuICB7IG5hbWU6ICdBdGxhbnRhJyB9LFxuICB7IG5hbWU6ICdBdGxhbnRpYyBDaXR5JyB9LFxuICB7IG5hbWU6ICdBdHRsZWJvcm8nIH0sXG4gIHsgbmFtZTogJ0F1YnVybicgfSxcbiAgeyBuYW1lOiAnQXVidXJuJyB9LFxuICB7IG5hbWU6ICdBdWd1c3RhLVJpY2htb25kIENvdW50eScgfSxcbiAgeyBuYW1lOiAnQXVyb3JhJyB9LFxuICB7IG5hbWU6ICdBdXJvcmEnIH0sXG4gIHsgbmFtZTogJ0F1c3RpbicgfSxcbiAgeyBuYW1lOiAnQXZlbnR1cmEnIH0sXG4gIHsgbmFtZTogJ0F2b25kYWxlJyB9LFxuICB7IG5hbWU6ICdBenVzYScgfSxcbiAgeyBuYW1lOiAnQmFrZXJzZmllbGQnIH0sXG4gIHsgbmFtZTogJ0JhbGR3aW4gUGFyaycgfSxcbiAgeyBuYW1lOiAnQmFsdGltb3JlJyB9LFxuICB7IG5hbWU6ICdCYXJuc3RhYmxlIFRvd24nIH0sXG4gIHsgbmFtZTogJ0JhcnRsZXR0JyB9LFxuICB7IG5hbWU6ICdCYXJ0bGV0dCcgfSxcbiAgeyBuYW1lOiAnQmF0b24gUm91Z2UnIH0sXG4gIHsgbmFtZTogJ0JhdHRsZSBDcmVlaycgfSxcbiAgeyBuYW1lOiAnQmF5b25uZScgfSxcbiAgeyBuYW1lOiAnQmF5dG93bicgfSxcbiAgeyBuYW1lOiAnQmVhdW1vbnQnIH0sXG4gIHsgbmFtZTogJ0JlYXVtb250JyB9LFxuICB7IG5hbWU6ICdCZWF2ZXJjcmVlaycgfSxcbiAgeyBuYW1lOiAnQmVhdmVydG9uJyB9LFxuICB7IG5hbWU6ICdCZWRmb3JkJyB9LFxuICB7IG5hbWU6ICdCZWxsIEdhcmRlbnMnIH0sXG4gIHsgbmFtZTogJ0JlbGxldmlsbGUnIH0sXG4gIHsgbmFtZTogJ0JlbGxldnVlJyB9LFxuICB7IG5hbWU6ICdCZWxsZXZ1ZScgfSxcbiAgeyBuYW1lOiAnQmVsbGZsb3dlcicgfSxcbiAgeyBuYW1lOiAnQmVsbGluZ2hhbScgfSxcbiAgeyBuYW1lOiAnQmVsb2l0JyB9LFxuICB7IG5hbWU6ICdCZW5kJyB9LFxuICB7IG5hbWU6ICdCZW50b252aWxsZScgfSxcbiAgeyBuYW1lOiAnQmVya2VsZXknIH0sXG4gIHsgbmFtZTogJ0Jlcnd5bicgfSxcbiAgeyBuYW1lOiAnQmV0aGxlaGVtJyB9LFxuICB7IG5hbWU6ICdCZXZlcmx5JyB9LFxuICB7IG5hbWU6ICdCaWxsaW5ncycgfSxcbiAgeyBuYW1lOiAnQmlsb3hpJyB9LFxuICB7IG5hbWU6ICdCaW5naGFtdG9uJyB9LFxuICB7IG5hbWU6ICdCaXJtaW5naGFtJyB9LFxuICB7IG5hbWU6ICdCaXNtYXJjaycgfSxcbiAgeyBuYW1lOiAnQmxhY2tzYnVyZycgfSxcbiAgeyBuYW1lOiAnQmxhaW5lJyB9LFxuICB7IG5hbWU6ICdCbG9vbWluZ3RvbicgfSxcbiAgeyBuYW1lOiAnQmxvb21pbmd0b24nIH0sXG4gIHsgbmFtZTogJ0Jsb29taW5ndG9uJyB9LFxuICB7IG5hbWU6ICdCbHVlIFNwcmluZ3MnIH0sXG4gIHsgbmFtZTogJ0JvY2EgUmF0b24nIH0sXG4gIHsgbmFtZTogJ0JvaXNlIENpdHknIH0sXG4gIHsgbmFtZTogJ0JvbGluZ2Jyb29rJyB9LFxuICB7IG5hbWU6ICdCb25pdGEgU3ByaW5ncycgfSxcbiAgeyBuYW1lOiAnQm9zc2llciBDaXR5JyB9LFxuICB7IG5hbWU6ICdCb3N0b24nIH0sXG4gIHsgbmFtZTogJ0JvdWxkZXInIH0sXG4gIHsgbmFtZTogJ0JvdW50aWZ1bCcgfSxcbiAgeyBuYW1lOiAnQm93aWUnIH0sXG4gIHsgbmFtZTogJ0Jvd2xpbmcgR3JlZW4nIH0sXG4gIHsgbmFtZTogJ0JveW50b24gQmVhY2gnIH0sXG4gIHsgbmFtZTogJ0JvemVtYW4nIH0sXG4gIHsgbmFtZTogJ0JyYWRlbnRvbicgfSxcbiAgeyBuYW1lOiAnQnJlYScgfSxcbiAgeyBuYW1lOiAnQnJlbWVydG9uJyB9LFxuICB7IG5hbWU6ICdCcmVudHdvb2QnIH0sXG4gIHsgbmFtZTogJ0JyZW50d29vZCcgfSxcbiAgeyBuYW1lOiAnQnJpZGdlcG9ydCcgfSxcbiAgeyBuYW1lOiAnQnJpc3RvbCcgfSxcbiAgeyBuYW1lOiAnQnJvY2t0b24nIH0sXG4gIHsgbmFtZTogJ0Jyb2tlbiBBcnJvdycgfSxcbiAgeyBuYW1lOiAnQnJvb2tmaWVsZCcgfSxcbiAgeyBuYW1lOiAnQnJvb2toYXZlbicgfSxcbiAgeyBuYW1lOiAnQnJvb2tseW4gUGFyaycgfSxcbiAgeyBuYW1lOiAnQnJvb21maWVsZCcgfSxcbiAgeyBuYW1lOiAnQnJvd25zdmlsbGUnIH0sXG4gIHsgbmFtZTogJ0JyeWFuJyB9LFxuICB7IG5hbWU6ICdCdWNrZXllJyB9LFxuICB7IG5hbWU6ICdCdWVuYSBQYXJrJyB9LFxuICB7IG5hbWU6ICdCdWZmYWxvJyB9LFxuICB7IG5hbWU6ICdCdWZmYWxvIEdyb3ZlJyB9LFxuICB7IG5hbWU6ICdCdWxsaGVhZCBDaXR5JyB9LFxuICB7IG5hbWU6ICdCdXJiYW5rJyB9LFxuICB7IG5hbWU6ICdCdXJpZW4nIH0sXG4gIHsgbmFtZTogJ0J1cmxlc29uJyB9LFxuICB7IG5hbWU6ICdCdXJsaW5ndG9uJyB9LFxuICB7IG5hbWU6ICdCdXJsaW5ndG9uJyB9LFxuICB7IG5hbWU6ICdCdXJuc3ZpbGxlJyB9LFxuICB7IG5hbWU6ICdDYWxkd2VsbCcgfSxcbiAgeyBuYW1lOiAnQ2FsZXhpY28nIH0sXG4gIHsgbmFtZTogJ0NhbHVtZXQgQ2l0eScgfSxcbiAgeyBuYW1lOiAnQ2FtYXJpbGxvJyB9LFxuICB7IG5hbWU6ICdDYW1icmlkZ2UnIH0sXG4gIHsgbmFtZTogJ0NhbWRlbicgfSxcbiAgeyBuYW1lOiAnQ2FtcGJlbGwnIH0sXG4gIHsgbmFtZTogJ0NhbnRvbicgfSxcbiAgeyBuYW1lOiAnQ2FwZSBDb3JhbCcgfSxcbiAgeyBuYW1lOiAnQ2FwZSBHaXJhcmRlYXUnIH0sXG4gIHsgbmFtZTogJ0NhcmxzYmFkJyB9LFxuICB7IG5hbWU6ICdDYXJtZWwnIH0sXG4gIHsgbmFtZTogJ0Nhcm9sIFN0cmVhbScgfSxcbiAgeyBuYW1lOiAnQ2FycGVudGVyc3ZpbGxlJyB9LFxuICB7IG5hbWU6ICdDYXJyb2xsdG9uJyB9LFxuICB7IG5hbWU6ICdDYXJzb24nIH0sXG4gIHsgbmFtZTogJ0NhcnNvbiBDaXR5JyB9LFxuICB7IG5hbWU6ICdDYXJ5JyB9LFxuICB7IG5hbWU6ICdDYXNhIEdyYW5kZScgfSxcbiAgeyBuYW1lOiAnQ2FzcGVyJyB9LFxuICB7IG5hbWU6ICdDYXN0bGUgUm9jaycgfSxcbiAgeyBuYW1lOiAnQ2F0aGVkcmFsIENpdHknIH0sXG4gIHsgbmFtZTogJ0NlZGFyIEZhbGxzJyB9LFxuICB7IG5hbWU6ICdDZWRhciBIaWxsJyB9LFxuICB7IG5hbWU6ICdDZWRhciBQYXJrJyB9LFxuICB7IG5hbWU6ICdDZWRhciBSYXBpZHMnIH0sXG4gIHsgbmFtZTogJ0NlbnRlbm5pYWwnIH0sXG4gIHsgbmFtZTogJ0NlcmVzJyB9LFxuICB7IG5hbWU6ICdDZXJyaXRvcycgfSxcbiAgeyBuYW1lOiAnQ2hhbXBhaWduJyB9LFxuICB7IG5hbWU6ICdDaGFuZGxlcicgfSxcbiAgeyBuYW1lOiAnQ2hhcGVsIEhpbGwnIH0sXG4gIHsgbmFtZTogJ0NoYXJsZXN0b24nIH0sXG4gIHsgbmFtZTogJ0NoYXJsZXN0b24nIH0sXG4gIHsgbmFtZTogJ0NoYXJsb3R0ZScgfSxcbiAgeyBuYW1lOiAnQ2hhcmxvdHRlc3ZpbGxlJyB9LFxuICB7IG5hbWU6ICdDaGF0dGFub29nYScgfSxcbiAgeyBuYW1lOiAnQ2hlbHNlYScgfSxcbiAgeyBuYW1lOiAnQ2hlc2FwZWFrZScgfSxcbiAgeyBuYW1lOiAnQ2hlc3RlcmZpZWxkJyB9LFxuICB7IG5hbWU6ICdDaGV5ZW5uZScgfSxcbiAgeyBuYW1lOiAnQ2hpY2FnbycgfSxcbiAgeyBuYW1lOiAnQ2hpY28nIH0sXG4gIHsgbmFtZTogJ0NoaWNvcGVlJyB9LFxuICB7IG5hbWU6ICdDaGlubycgfSxcbiAgeyBuYW1lOiAnQ2hpbm8gSGlsbHMnIH0sXG4gIHsgbmFtZTogJ0NodWxhIFZpc3RhJyB9LFxuICB7IG5hbWU6ICdDaWNlcm8nIH0sXG4gIHsgbmFtZTogJ0NpbmNpbm5hdGknIH0sXG4gIHsgbmFtZTogJ0NpdHJ1cyBIZWlnaHRzJyB9LFxuICB7IG5hbWU6ICdDbGFya3N2aWxsZScgfSxcbiAgeyBuYW1lOiAnQ2xlYXJ3YXRlcicgfSxcbiAgeyBuYW1lOiAnQ2xldmVsYW5kJyB9LFxuICB7IG5hbWU6ICdDbGV2ZWxhbmQnIH0sXG4gIHsgbmFtZTogJ0NsZXZlbGFuZCBIZWlnaHRzJyB9LFxuICB7IG5hbWU6ICdDbGlmdG9uJyB9LFxuICB7IG5hbWU6ICdDbG92aXMnIH0sXG4gIHsgbmFtZTogJ0Nsb3ZpcycgfSxcbiAgeyBuYW1lOiAnQ29hY2hlbGxhJyB9LFxuICB7IG5hbWU6ICdDb2NvbnV0IENyZWVrJyB9LFxuICB7IG5hbWU6ICdDb2V1ciBkXFwnQWxlbmUnIH0sXG4gIHsgbmFtZTogJ0NvbGxlZ2UgU3RhdGlvbicgfSxcbiAgeyBuYW1lOiAnQ29sbGllcnZpbGxlJyB9LFxuICB7IG5hbWU6ICdDb2xvcmFkbyBTcHJpbmdzJyB9LFxuICB7IG5hbWU6ICdDb2x0b24nIH0sXG4gIHsgbmFtZTogJ0NvbHVtYmlhJyB9LFxuICB7IG5hbWU6ICdDb2x1bWJpYScgfSxcbiAgeyBuYW1lOiAnQ29sdW1idXMnIH0sXG4gIHsgbmFtZTogJ0NvbHVtYnVzJyB9LFxuICB7IG5hbWU6ICdDb2x1bWJ1cycgfSxcbiAgeyBuYW1lOiAnQ29tbWVyY2UgQ2l0eScgfSxcbiAgeyBuYW1lOiAnQ29tcHRvbicgfSxcbiAgeyBuYW1lOiAnQ29uY29yZCcgfSxcbiAgeyBuYW1lOiAnQ29uY29yZCcgfSxcbiAgeyBuYW1lOiAnQ29uY29yZCcgfSxcbiAgeyBuYW1lOiAnQ29ucm9lJyB9LFxuICB7IG5hbWU6ICdDb253YXknIH0sXG4gIHsgbmFtZTogJ0Nvb24gUmFwaWRzJyB9LFxuICB7IG5hbWU6ICdDb3BwZWxsJyB9LFxuICB7IG5hbWU6ICdDb3JhbCBHYWJsZXMnIH0sXG4gIHsgbmFtZTogJ0NvcmFsIFNwcmluZ3MnIH0sXG4gIHsgbmFtZTogJ0Nvcm9uYScgfSxcbiAgeyBuYW1lOiAnQ29ycHVzIENocmlzdGknIH0sXG4gIHsgbmFtZTogJ0NvcnZhbGxpcycgfSxcbiAgeyBuYW1lOiAnQ29zdGEgTWVzYScgfSxcbiAgeyBuYW1lOiAnQ291bmNpbCBCbHVmZnMnIH0sXG4gIHsgbmFtZTogJ0NvdmluYScgfSxcbiAgeyBuYW1lOiAnQ292aW5ndG9uJyB9LFxuICB7IG5hbWU6ICdDcmFuc3RvbicgfSxcbiAgeyBuYW1lOiAnQ3J5c3RhbCBMYWtlJyB9LFxuICB7IG5hbWU6ICdDdWx2ZXIgQ2l0eScgfSxcbiAgeyBuYW1lOiAnQ3VwZXJ0aW5vJyB9LFxuICB7IG5hbWU6ICdDdXRsZXIgQmF5JyB9LFxuICB7IG5hbWU6ICdDdXlhaG9nYSBGYWxscycgfSxcbiAgeyBuYW1lOiAnQ3lwcmVzcycgfSxcbiAgeyBuYW1lOiAnRGFsbGFzJyB9LFxuICB7IG5hbWU6ICdEYWx5IENpdHknIH0sXG4gIHsgbmFtZTogJ0RhbmJ1cnknIH0sXG4gIHsgbmFtZTogJ0RhbnZpbGxlJyB9LFxuICB7IG5hbWU6ICdEYW52aWxsZScgfSxcbiAgeyBuYW1lOiAnRGF2ZW5wb3J0JyB9LFxuICB7IG5hbWU6ICdEYXZpZScgfSxcbiAgeyBuYW1lOiAnRGF2aXMnIH0sXG4gIHsgbmFtZTogJ0RheXRvbicgfSxcbiAgeyBuYW1lOiAnRGF5dG9uYSBCZWFjaCcgfSxcbiAgeyBuYW1lOiAnRGVLYWxiJyB9LFxuICB7IG5hbWU6ICdEZVNvdG8nIH0sXG4gIHsgbmFtZTogJ0RlYXJib3JuJyB9LFxuICB7IG5hbWU6ICdEZWFyYm9ybiBIZWlnaHRzJyB9LFxuICB7IG5hbWU6ICdEZWNhdHVyJyB9LFxuICB7IG5hbWU6ICdEZWNhdHVyJyB9LFxuICB7IG5hbWU6ICdEZWVyZmllbGQgQmVhY2gnIH0sXG4gIHsgbmFtZTogJ0RlbGFubycgfSxcbiAgeyBuYW1lOiAnRGVscmF5IEJlYWNoJyB9LFxuICB7IG5hbWU6ICdEZWx0b25hJyB9LFxuICB7IG5hbWU6ICdEZW50b24nIH0sXG4gIHsgbmFtZTogJ0RlbnZlcicgfSxcbiAgeyBuYW1lOiAnRGVzIE1vaW5lcycgfSxcbiAgeyBuYW1lOiAnRGVzIFBsYWluZXMnIH0sXG4gIHsgbmFtZTogJ0RldHJvaXQnIH0sXG4gIHsgbmFtZTogJ0RpYW1vbmQgQmFyJyB9LFxuICB7IG5hbWU6ICdEb3JhbCcgfSxcbiAgeyBuYW1lOiAnRG90aGFuJyB9LFxuICB7IG5hbWU6ICdEb3ZlcicgfSxcbiAgeyBuYW1lOiAnRG93bmVycyBHcm92ZScgfSxcbiAgeyBuYW1lOiAnRG93bmV5JyB9LFxuICB7IG5hbWU6ICdEcmFwZXInIH0sXG4gIHsgbmFtZTogJ0R1YmxpbicgfSxcbiAgeyBuYW1lOiAnRHVibGluJyB9LFxuICB7IG5hbWU6ICdEdWJ1cXVlJyB9LFxuICB7IG5hbWU6ICdEdWx1dGgnIH0sXG4gIHsgbmFtZTogJ0R1bmNhbnZpbGxlJyB9LFxuICB7IG5hbWU6ICdEdW53b29keScgfSxcbiAgeyBuYW1lOiAnRHVyaGFtJyB9LFxuICB7IG5hbWU6ICdFYWdhbicgfSxcbiAgeyBuYW1lOiAnRWFzdCBMYW5zaW5nJyB9LFxuICB7IG5hbWU6ICdFYXN0IE9yYW5nZScgfSxcbiAgeyBuYW1lOiAnRWFzdCBQcm92aWRlbmNlJyB9LFxuICB7IG5hbWU6ICdFYXN0dmFsZScgfSxcbiAgeyBuYW1lOiAnRWF1IENsYWlyZScgfSxcbiAgeyBuYW1lOiAnRWRlbiBQcmFpcmllJyB9LFxuICB7IG5hbWU6ICdFZGluYScgfSxcbiAgeyBuYW1lOiAnRWRpbmJ1cmcnIH0sXG4gIHsgbmFtZTogJ0VkbW9uZCcgfSxcbiAgeyBuYW1lOiAnRWRtb25kcycgfSxcbiAgeyBuYW1lOiAnRWwgQ2Fqb24nIH0sXG4gIHsgbmFtZTogJ0VsIENlbnRybycgfSxcbiAgeyBuYW1lOiAnRWwgTW9udGUnIH0sXG4gIHsgbmFtZTogJ0VsIFBhc28nIH0sXG4gIHsgbmFtZTogJ0VsZ2luJyB9LFxuICB7IG5hbWU6ICdFbGl6YWJldGgnIH0sXG4gIHsgbmFtZTogJ0VsayBHcm92ZScgfSxcbiAgeyBuYW1lOiAnRWxraGFydCcgfSxcbiAgeyBuYW1lOiAnRWxtaHVyc3QnIH0sXG4gIHsgbmFtZTogJ0VseXJpYScgfSxcbiAgeyBuYW1lOiAnRW5jaW5pdGFzJyB9LFxuICB7IG5hbWU6ICdFbmlkJyB9LFxuICB7IG5hbWU6ICdFcmllJyB9LFxuICB7IG5hbWU6ICdFc2NvbmRpZG8nIH0sXG4gIHsgbmFtZTogJ0V1Y2xpZCcgfSxcbiAgeyBuYW1lOiAnRXVnZW5lJyB9LFxuICB7IG5hbWU6ICdFdWxlc3MnIH0sXG4gIHsgbmFtZTogJ0V2YW5zdG9uJyB9LFxuICB7IG5hbWU6ICdFdmFuc3ZpbGxlJyB9LFxuICB7IG5hbWU6ICdFdmVyZXR0JyB9LFxuICB7IG5hbWU6ICdFdmVyZXR0JyB9LFxuICB7IG5hbWU6ICdGYWlyZmllbGQnIH0sXG4gIHsgbmFtZTogJ0ZhaXJmaWVsZCcgfSxcbiAgeyBuYW1lOiAnRmFsbCBSaXZlcicgfSxcbiAgeyBuYW1lOiAnRmFyZ28nIH0sXG4gIHsgbmFtZTogJ0Zhcm1pbmd0b24nIH0sXG4gIHsgbmFtZTogJ0Zhcm1pbmd0b24gSGlsbHMnIH0sXG4gIHsgbmFtZTogJ0ZheWV0dGV2aWxsZScgfSxcbiAgeyBuYW1lOiAnRmF5ZXR0ZXZpbGxlJyB9LFxuICB7IG5hbWU6ICdGZWRlcmFsIFdheScgfSxcbiAgeyBuYW1lOiAnRmluZGxheScgfSxcbiAgeyBuYW1lOiAnRmlzaGVycycgfSxcbiAgeyBuYW1lOiAnRml0Y2hidXJnJyB9LFxuICB7IG5hbWU6ICdGbGFnc3RhZmYnIH0sXG4gIHsgbmFtZTogJ0ZsaW50JyB9LFxuICB7IG5hbWU6ICdGbG9yZW5jZScgfSxcbiAgeyBuYW1lOiAnRmxvcmVuY2UnIH0sXG4gIHsgbmFtZTogJ0Zsb3Jpc3NhbnQnIH0sXG4gIHsgbmFtZTogJ0Zsb3dlciBNb3VuZCcgfSxcbiAgeyBuYW1lOiAnRm9sc29tJyB9LFxuICB7IG5hbWU6ICdGb25kIGR1IExhYycgfSxcbiAgeyBuYW1lOiAnRm9udGFuYScgfSxcbiAgeyBuYW1lOiAnRm9ydCBDb2xsaW5zJyB9LFxuICB7IG5hbWU6ICdGb3J0IExhdWRlcmRhbGUnIH0sXG4gIHsgbmFtZTogJ0ZvcnQgTXllcnMnIH0sXG4gIHsgbmFtZTogJ0ZvcnQgUGllcmNlJyB9LFxuICB7IG5hbWU6ICdGb3J0IFNtaXRoJyB9LFxuICB7IG5hbWU6ICdGb3J0IFdheW5lJyB9LFxuICB7IG5hbWU6ICdGb3J0IFdvcnRoJyB9LFxuICB7IG5hbWU6ICdGb3VudGFpbiBWYWxsZXknIH0sXG4gIHsgbmFtZTogJ0ZyYW5rbGluJyB9LFxuICB7IG5hbWU6ICdGcmVkZXJpY2snIH0sXG4gIHsgbmFtZTogJ0ZyZWVwb3J0JyB9LFxuICB7IG5hbWU6ICdGcmVtb250JyB9LFxuICB7IG5hbWU6ICdGcmVzbm8nIH0sXG4gIHsgbmFtZTogJ0ZyaWVuZHN3b29kJyB9LFxuICB7IG5hbWU6ICdGcmlzY28nIH0sXG4gIHsgbmFtZTogJ0Z1bGxlcnRvbicgfSxcbiAgeyBuYW1lOiAnR2FpbmVzdmlsbGUnIH0sXG4gIHsgbmFtZTogJ0dhaXRoZXJzYnVyZycgfSxcbiAgeyBuYW1lOiAnR2FsdmVzdG9uJyB9LFxuICB7IG5hbWU6ICdHYXJkZW4gR3JvdmUnIH0sXG4gIHsgbmFtZTogJ0dhcmRlbmEnIH0sXG4gIHsgbmFtZTogJ0dhcmxhbmQnIH0sXG4gIHsgbmFtZTogJ0dhcnknIH0sXG4gIHsgbmFtZTogJ0dhc3RvbmlhJyB9LFxuICB7IG5hbWU6ICdHZW9yZ2V0b3duJyB9LFxuICB7IG5hbWU6ICdHZXJtYW50b3duJyB9LFxuICB7IG5hbWU6ICdHaWxiZXJ0JyB9LFxuICB7IG5hbWU6ICdHaWxyb3knIH0sXG4gIHsgbmFtZTogJ0dsZW5kYWxlJyB9LFxuICB7IG5hbWU6ICdHbGVuZGFsZScgfSxcbiAgeyBuYW1lOiAnR2xlbmRvcmEnIH0sXG4gIHsgbmFtZTogJ0dsZW52aWV3JyB9LFxuICB7IG5hbWU6ICdHb29keWVhcicgfSxcbiAgeyBuYW1lOiAnR29vc2UgQ3JlZWsnIH0sXG4gIHsgbmFtZTogJ0dyYW5kIEZvcmtzJyB9LFxuICB7IG5hbWU6ICdHcmFuZCBJc2xhbmQnIH0sXG4gIHsgbmFtZTogJ0dyYW5kIEp1bmN0aW9uJyB9LFxuICB7IG5hbWU6ICdHcmFuZCBQcmFpcmllJyB9LFxuICB7IG5hbWU6ICdHcmFuZCBSYXBpZHMnIH0sXG4gIHsgbmFtZTogJ0dyYXBldmluZScgfSxcbiAgeyBuYW1lOiAnR3JlYXQgRmFsbHMnIH0sXG4gIHsgbmFtZTogJ0dyZWVsZXknIH0sXG4gIHsgbmFtZTogJ0dyZWVuIEJheScgfSxcbiAgeyBuYW1lOiAnR3JlZW5hY3JlcycgfSxcbiAgeyBuYW1lOiAnR3JlZW5maWVsZCcgfSxcbiAgeyBuYW1lOiAnR3JlZW5zYm9ybycgfSxcbiAgeyBuYW1lOiAnR3JlZW52aWxsZScgfSxcbiAgeyBuYW1lOiAnR3JlZW52aWxsZScgfSxcbiAgeyBuYW1lOiAnR3JlZW53b29kJyB9LFxuICB7IG5hbWU6ICdHcmVzaGFtJyB9LFxuICB7IG5hbWU6ICdHcm92ZSBDaXR5JyB9LFxuICB7IG5hbWU6ICdHdWxmcG9ydCcgfSxcbiAgeyBuYW1lOiAnSGFja2Vuc2FjaycgfSxcbiAgeyBuYW1lOiAnSGFnZXJzdG93bicgfSxcbiAgeyBuYW1lOiAnSGFsbGFuZGFsZSBCZWFjaCcgfSxcbiAgeyBuYW1lOiAnSGFsdG9tIENpdHknIH0sXG4gIHsgbmFtZTogJ0hhbWlsdG9uJyB9LFxuICB7IG5hbWU6ICdIYW1tb25kJyB9LFxuICB7IG5hbWU6ICdIYW1wdG9uJyB9LFxuICB7IG5hbWU6ICdIYW5mb3JkJyB9LFxuICB7IG5hbWU6ICdIYW5vdmVyIFBhcmsnIH0sXG4gIHsgbmFtZTogJ0hhcmxpbmdlbicgfSxcbiAgeyBuYW1lOiAnSGFycmlzYnVyZycgfSxcbiAgeyBuYW1lOiAnSGFycmlzb25idXJnJyB9LFxuICB7IG5hbWU6ICdIYXJ0Zm9yZCcgfSxcbiAgeyBuYW1lOiAnSGF0dGllc2J1cmcnIH0sXG4gIHsgbmFtZTogJ0hhdmVyaGlsbCcgfSxcbiAgeyBuYW1lOiAnSGF3dGhvcm5lJyB9LFxuICB7IG5hbWU6ICdIYXl3YXJkJyB9LFxuICB7IG5hbWU6ICdIZW1ldCcgfSxcbiAgeyBuYW1lOiAnSGVtcHN0ZWFkJyB9LFxuICB7IG5hbWU6ICdIZW5kZXJzb24nIH0sXG4gIHsgbmFtZTogJ0hlbmRlcnNvbnZpbGxlJyB9LFxuICB7IG5hbWU6ICdIZXNwZXJpYScgfSxcbiAgeyBuYW1lOiAnSGlhbGVhaCcgfSxcbiAgeyBuYW1lOiAnSGlja29yeScgfSxcbiAgeyBuYW1lOiAnSGlnaCBQb2ludCcgfSxcbiAgeyBuYW1lOiAnSGlnaGxhbmQnIH0sXG4gIHsgbmFtZTogJ0hpbGxzYm9ybycgfSxcbiAgeyBuYW1lOiAnSGlsdG9uIEhlYWQgSXNsYW5kJyB9LFxuICB7IG5hbWU6ICdIb2Jva2VuJyB9LFxuICB7IG5hbWU6ICdIb2ZmbWFuIEVzdGF0ZXMnIH0sXG4gIHsgbmFtZTogJ0hvbGx5d29vZCcgfSxcbiAgeyBuYW1lOiAnSG9seW9rZScgfSxcbiAgeyBuYW1lOiAnSG9tZXN0ZWFkJyB9LFxuICB7IG5hbWU6ICdIb25vbHVsdScgfSxcbiAgeyBuYW1lOiAnSG9vdmVyJyB9LFxuICB7IG5hbWU6ICdIb3VzdG9uJyB9LFxuICB7IG5hbWU6ICdIdWJlciBIZWlnaHRzJyB9LFxuICB7IG5hbWU6ICdIdW50ZXJzdmlsbGUnIH0sXG4gIHsgbmFtZTogJ0h1bnRpbmd0b24nIH0sXG4gIHsgbmFtZTogJ0h1bnRpbmd0b24gQmVhY2gnIH0sXG4gIHsgbmFtZTogJ0h1bnRpbmd0b24gUGFyaycgfSxcbiAgeyBuYW1lOiAnSHVudHN2aWxsZScgfSxcbiAgeyBuYW1lOiAnSHVudHN2aWxsZScgfSxcbiAgeyBuYW1lOiAnSHVyc3QnIH0sXG4gIHsgbmFtZTogJ0h1dGNoaW5zb24nIH0sXG4gIHsgbmFtZTogJ0lkYWhvIEZhbGxzJyB9LFxuICB7IG5hbWU6ICdJbmRlcGVuZGVuY2UnIH0sXG4gIHsgbmFtZTogJ0luZGlhbmFwb2xpcycgfSxcbiAgeyBuYW1lOiAnSW5kaW8nIH0sXG4gIHsgbmFtZTogJ0luZ2xld29vZCcgfSxcbiAgeyBuYW1lOiAnSW93YSBDaXR5JyB9LFxuICB7IG5hbWU6ICdJcnZpbmUnIH0sXG4gIHsgbmFtZTogJ0lydmluZycgfSxcbiAgeyBuYW1lOiAnSmFja3NvbicgfSxcbiAgeyBuYW1lOiAnSmFja3NvbicgfSxcbiAgeyBuYW1lOiAnSmFja3NvbnZpbGxlJyB9LFxuICB7IG5hbWU6ICdKYWNrc29udmlsbGUnIH0sXG4gIHsgbmFtZTogJ0phbmVzdmlsbGUnIH0sXG4gIHsgbmFtZTogJ0plZmZlcnNvbiBDaXR5JyB9LFxuICB7IG5hbWU6ICdKZWZmZXJzb252aWxsZScgfSxcbiAgeyBuYW1lOiAnSmVyc2V5IENpdHknIH0sXG4gIHsgbmFtZTogJ0pvaG5zIENyZWVrJyB9LFxuICB7IG5hbWU6ICdKb2huc29uIENpdHknIH0sXG4gIHsgbmFtZTogJ0pvbGlldCcgfSxcbiAgeyBuYW1lOiAnSm9uZXNib3JvJyB9LFxuICB7IG5hbWU6ICdKb3BsaW4nIH0sXG4gIHsgbmFtZTogJ0p1cGl0ZXInIH0sXG4gIHsgbmFtZTogJ0p1cnVwYSBWYWxsZXknIH0sXG4gIHsgbmFtZTogJ0thbGFtYXpvbycgfSxcbiAgeyBuYW1lOiAnS2FubmFwb2xpcycgfSxcbiAgeyBuYW1lOiAnS2Fuc2FzIENpdHknIH0sXG4gIHsgbmFtZTogJ0thbnNhcyBDaXR5JyB9LFxuICB7IG5hbWU6ICdLZWFybnknIH0sXG4gIHsgbmFtZTogJ0tlaXplcicgfSxcbiAgeyBuYW1lOiAnS2VsbGVyJyB9LFxuICB7IG5hbWU6ICdLZW5uZXInIH0sXG4gIHsgbmFtZTogJ0tlbm5ld2ljaycgfSxcbiAgeyBuYW1lOiAnS2Vub3NoYScgfSxcbiAgeyBuYW1lOiAnS2VudCcgfSxcbiAgeyBuYW1lOiAnS2VudHdvb2QnIH0sXG4gIHsgbmFtZTogJ0tldHRlcmluZycgfSxcbiAgeyBuYW1lOiAnS2lsbGVlbicgfSxcbiAgeyBuYW1lOiAnS2luZ3Nwb3J0JyB9LFxuICB7IG5hbWU6ICdLaXJrbGFuZCcgfSxcbiAgeyBuYW1lOiAnS2lzc2ltbWVlJyB9LFxuICB7IG5hbWU6ICdLbm94dmlsbGUnIH0sXG4gIHsgbmFtZTogJ0tva29tbycgfSxcbiAgeyBuYW1lOiAnTGEgQ3Jvc3NlJyB9LFxuICB7IG5hbWU6ICdMYSBIYWJyYScgfSxcbiAgeyBuYW1lOiAnTGEgTWVzYScgfSxcbiAgeyBuYW1lOiAnTGEgTWlyYWRhJyB9LFxuICB7IG5hbWU6ICdMYSBQdWVudGUnIH0sXG4gIHsgbmFtZTogJ0xhIFF1aW50YScgfSxcbiAgeyBuYW1lOiAnTGFjZXknIH0sXG4gIHsgbmFtZTogJ0xhZmF5ZXR0ZScgfSxcbiAgeyBuYW1lOiAnTGFmYXlldHRlJyB9LFxuICB7IG5hbWU6ICdMYWd1bmEgTmlndWVsJyB9LFxuICB7IG5hbWU6ICdMYWtlIENoYXJsZXMnIH0sXG4gIHsgbmFtZTogJ0xha2UgRWxzaW5vcmUnIH0sXG4gIHsgbmFtZTogJ0xha2UgRm9yZXN0JyB9LFxuICB7IG5hbWU6ICdMYWtlIEhhdmFzdSBDaXR5JyB9LFxuICB7IG5hbWU6ICdMYWtlIE9zd2VnbycgfSxcbiAgeyBuYW1lOiAnTGFrZWxhbmQnIH0sXG4gIHsgbmFtZTogJ0xha2V2aWxsZScgfSxcbiAgeyBuYW1lOiAnTGFrZXdvb2QnIH0sXG4gIHsgbmFtZTogJ0xha2V3b29kJyB9LFxuICB7IG5hbWU6ICdMYWtld29vZCcgfSxcbiAgeyBuYW1lOiAnTGFrZXdvb2QnIH0sXG4gIHsgbmFtZTogJ0xhbmNhc3RlcicgfSxcbiAgeyBuYW1lOiAnTGFuY2FzdGVyJyB9LFxuICB7IG5hbWU6ICdMYW5jYXN0ZXInIH0sXG4gIHsgbmFtZTogJ0xhbmNhc3RlcicgfSxcbiAgeyBuYW1lOiAnTGFuc2luZycgfSxcbiAgeyBuYW1lOiAnTGFyZWRvJyB9LFxuICB7IG5hbWU6ICdMYXJnbycgfSxcbiAgeyBuYW1lOiAnTGFzIENydWNlcycgfSxcbiAgeyBuYW1lOiAnTGFzIFZlZ2FzJyB9LFxuICB7IG5hbWU6ICdMYXVkZXJoaWxsJyB9LFxuICB7IG5hbWU6ICdMYXdyZW5jZScgfSxcbiAgeyBuYW1lOiAnTGF3cmVuY2UnIH0sXG4gIHsgbmFtZTogJ0xhd3JlbmNlJyB9LFxuICB7IG5hbWU6ICdMYXd0b24nIH0sXG4gIHsgbmFtZTogJ0xheXRvbicgfSxcbiAgeyBuYW1lOiAnTGVhZ3VlIENpdHknIH0sXG4gIHsgbmFtZTogJ0xlZVxcJ3MgU3VtbWl0JyB9LFxuICB7IG5hbWU6ICdMZWVzYnVyZycgfSxcbiAgeyBuYW1lOiAnTGVoaScgfSxcbiAgeyBuYW1lOiAnTGVuZXhhJyB9LFxuICB7IG5hbWU6ICdMZW9taW5zdGVyJyB9LFxuICB7IG5hbWU6ICdMZXdpc3ZpbGxlJyB9LFxuICB7IG5hbWU6ICdMZXhpbmd0b24tRmF5ZXR0ZScgfSxcbiAgeyBuYW1lOiAnTGltYScgfSxcbiAgeyBuYW1lOiAnTGluY29sbicgfSxcbiAgeyBuYW1lOiAnTGluY29sbicgfSxcbiAgeyBuYW1lOiAnTGluY29sbiBQYXJrJyB9LFxuICB7IG5hbWU6ICdMaW5kZW4nIH0sXG4gIHsgbmFtZTogJ0xpdHRsZSBSb2NrJyB9LFxuICB7IG5hbWU6ICdMaXR0bGV0b24nIH0sXG4gIHsgbmFtZTogJ0xpdmVybW9yZScgfSxcbiAgeyBuYW1lOiAnTGl2b25pYScgfSxcbiAgeyBuYW1lOiAnTG9kaScgfSxcbiAgeyBuYW1lOiAnTG9nYW4nIH0sXG4gIHsgbmFtZTogJ0xvbWJhcmQnIH0sXG4gIHsgbmFtZTogJ0xvbXBvYycgfSxcbiAgeyBuYW1lOiAnTG9uZyBCZWFjaCcgfSxcbiAgeyBuYW1lOiAnTG9uZ21vbnQnIH0sXG4gIHsgbmFtZTogJ0xvbmd2aWV3JyB9LFxuICB7IG5hbWU6ICdMb3JhaW4nIH0sXG4gIHsgbmFtZTogJ0xvcyBBbmdlbGVzJyB9LFxuICB7IG5hbWU6ICdMb3Vpc3ZpbGxlL0plZmZlcnNvbiBDb3VudHknIH0sXG4gIHsgbmFtZTogJ0xvdmVsYW5kJyB9LFxuICB7IG5hbWU6ICdMb3dlbGwnIH0sXG4gIHsgbmFtZTogJ0x1YmJvY2snIH0sXG4gIHsgbmFtZTogJ0x5bmNoYnVyZycgfSxcbiAgeyBuYW1lOiAnTHlubicgfSxcbiAgeyBuYW1lOiAnTHlud29vZCcgfSxcbiAgeyBuYW1lOiAnTWFjb24nIH0sXG4gIHsgbmFtZTogJ01hZGVyYScgfSxcbiAgeyBuYW1lOiAnTWFkaXNvbicgfSxcbiAgeyBuYW1lOiAnTWFkaXNvbicgfSxcbiAgeyBuYW1lOiAnTWFsZGVuJyB9LFxuICB7IG5hbWU6ICdNYW5hc3NhcycgfSxcbiAgeyBuYW1lOiAnTWFuY2hlc3RlcicgfSxcbiAgeyBuYW1lOiAnTWFuaGF0dGFuJyB9LFxuICB7IG5hbWU6ICdNYW5rYXRvJyB9LFxuICB7IG5hbWU6ICdNYW5zZmllbGQnIH0sXG4gIHsgbmFtZTogJ01hbnNmaWVsZCcgfSxcbiAgeyBuYW1lOiAnTWFudGVjYScgfSxcbiAgeyBuYW1lOiAnTWFwbGUgR3JvdmUnIH0sXG4gIHsgbmFtZTogJ01hcGxld29vZCcgfSxcbiAgeyBuYW1lOiAnTWFyYW5hJyB9LFxuICB7IG5hbWU6ICdNYXJnYXRlJyB9LFxuICB7IG5hbWU6ICdNYXJpY29wYScgfSxcbiAgeyBuYW1lOiAnTWFyaWV0dGEnIH0sXG4gIHsgbmFtZTogJ01hcmxib3JvdWdoJyB9LFxuICB7IG5hbWU6ICdNYXJ0aW5leicgfSxcbiAgeyBuYW1lOiAnTWFyeXN2aWxsZScgfSxcbiAgeyBuYW1lOiAnTWNBbGxlbicgfSxcbiAgeyBuYW1lOiAnTWNLaW5uZXknIH0sXG4gIHsgbmFtZTogJ01lZGZvcmQnIH0sXG4gIHsgbmFtZTogJ01lZGZvcmQnIH0sXG4gIHsgbmFtZTogJ01lbGJvdXJuZScgfSxcbiAgeyBuYW1lOiAnTWVtcGhpcycgfSxcbiAgeyBuYW1lOiAnTWVuaWZlZScgfSxcbiAgeyBuYW1lOiAnTWVudG9yJyB9LFxuICB7IG5hbWU6ICdNZXJjZWQnIH0sXG4gIHsgbmFtZTogJ01lcmlkZW4nIH0sXG4gIHsgbmFtZTogJ01lcmlkaWFuJyB9LFxuICB7IG5hbWU6ICdNZXJpZGlhbicgfSxcbiAgeyBuYW1lOiAnTWVzYScgfSxcbiAgeyBuYW1lOiAnTWVzcXVpdGUnIH0sXG4gIHsgbmFtZTogJ01ldGh1ZW4nIH0sXG4gIHsgbmFtZTogJ01pYW1pJyB9LFxuICB7IG5hbWU6ICdNaWFtaSBCZWFjaCcgfSxcbiAgeyBuYW1lOiAnTWlhbWkgR2FyZGVucycgfSxcbiAgeyBuYW1lOiAnTWlkZGxldG93bicgfSxcbiAgeyBuYW1lOiAnTWlkZGxldG93bicgfSxcbiAgeyBuYW1lOiAnTWlkbGFuZCcgfSxcbiAgeyBuYW1lOiAnTWlkbGFuZCcgfSxcbiAgeyBuYW1lOiAnTWlkd2VzdCBDaXR5JyB9LFxuICB7IG5hbWU6ICdNaWxmb3JkJyB9LFxuICB7IG5hbWU6ICdNaWxwaXRhcycgfSxcbiAgeyBuYW1lOiAnTWlsd2F1a2VlJyB9LFxuICB7IG5hbWU6ICdNaW5uZWFwb2xpcycgfSxcbiAgeyBuYW1lOiAnTWlubmV0b25rYScgfSxcbiAgeyBuYW1lOiAnTWlub3QnIH0sXG4gIHsgbmFtZTogJ01pcmFtYXInIH0sXG4gIHsgbmFtZTogJ01pc2hhd2FrYScgfSxcbiAgeyBuYW1lOiAnTWlzc2lvbicgfSxcbiAgeyBuYW1lOiAnTWlzc2lvbiBWaWVqbycgfSxcbiAgeyBuYW1lOiAnTWlzc291bGEnIH0sXG4gIHsgbmFtZTogJ01pc3NvdXJpIENpdHknIH0sXG4gIHsgbmFtZTogJ01vYmlsZScgfSxcbiAgeyBuYW1lOiAnTW9kZXN0bycgfSxcbiAgeyBuYW1lOiAnTW9saW5lJyB9LFxuICB7IG5hbWU6ICdNb25yb2UnIH0sXG4gIHsgbmFtZTogJ01vbnJvdmlhJyB9LFxuICB7IG5hbWU6ICdNb250Y2xhaXInIH0sXG4gIHsgbmFtZTogJ01vbnRlYmVsbG8nIH0sXG4gIHsgbmFtZTogJ01vbnRlcmV5IFBhcmsnIH0sXG4gIHsgbmFtZTogJ01vbnRnb21lcnknIH0sXG4gIHsgbmFtZTogJ01vb3JlJyB9LFxuICB7IG5hbWU6ICdNb29yaGVhZCcgfSxcbiAgeyBuYW1lOiAnTW9yZW5vIFZhbGxleScgfSxcbiAgeyBuYW1lOiAnTW9yZ2FuIEhpbGwnIH0sXG4gIHsgbmFtZTogJ01vdW50IFBsZWFzYW50JyB9LFxuICB7IG5hbWU6ICdNb3VudCBQcm9zcGVjdCcgfSxcbiAgeyBuYW1lOiAnTW91bnQgVmVybm9uJyB9LFxuICB7IG5hbWU6ICdNb3VudGFpbiBWaWV3JyB9LFxuICB7IG5hbWU6ICdNdW5jaWUnIH0sXG4gIHsgbmFtZTogJ011cmZyZWVzYm9ybycgfSxcbiAgeyBuYW1lOiAnTXVycmF5JyB9LFxuICB7IG5hbWU6ICdNdXJyaWV0YScgfSxcbiAgeyBuYW1lOiAnTXVza2Vnb24nIH0sXG4gIHsgbmFtZTogJ011c2tvZ2VlJyB9LFxuICB7IG5hbWU6ICdOYW1wYScgfSxcbiAgeyBuYW1lOiAnTmFwYScgfSxcbiAgeyBuYW1lOiAnTmFwZXJ2aWxsZScgfSxcbiAgeyBuYW1lOiAnTmFzaHVhJyB9LFxuICB7IG5hbWU6ICdOYXNodmlsbGUtRGF2aWRzb24nIH0sXG4gIHsgbmFtZTogJ05hdGlvbmFsIENpdHknIH0sXG4gIHsgbmFtZTogJ05ldyBCZWRmb3JkJyB9LFxuICB7IG5hbWU6ICdOZXcgQmVybGluJyB9LFxuICB7IG5hbWU6ICdOZXcgQnJhdW5mZWxzJyB9LFxuICB7IG5hbWU6ICdOZXcgQnJpdGFpbicgfSxcbiAgeyBuYW1lOiAnTmV3IEJydW5zd2ljaycgfSxcbiAgeyBuYW1lOiAnTmV3IEhhdmVuJyB9LFxuICB7IG5hbWU6ICdOZXcgT3JsZWFucycgfSxcbiAgeyBuYW1lOiAnTmV3IFJvY2hlbGxlJyB9LFxuICB7IG5hbWU6ICdOZXcgWW9yaycgfSxcbiAgeyBuYW1lOiAnTmV3YXJrJyB9LFxuICB7IG5hbWU6ICdOZXdhcmsnIH0sXG4gIHsgbmFtZTogJ05ld2FyaycgfSxcbiAgeyBuYW1lOiAnTmV3cG9ydCBCZWFjaCcgfSxcbiAgeyBuYW1lOiAnTmV3cG9ydCBOZXdzJyB9LFxuICB7IG5hbWU6ICdOZXd0b24nIH0sXG4gIHsgbmFtZTogJ05pYWdhcmEgRmFsbHMnIH0sXG4gIHsgbmFtZTogJ05vYmxlc3ZpbGxlJyB9LFxuICB7IG5hbWU6ICdOb3Jmb2xrJyB9LFxuICB7IG5hbWU6ICdOb3JtYWwnIH0sXG4gIHsgbmFtZTogJ05vcm1hbicgfSxcbiAgeyBuYW1lOiAnTm9ydGggQ2hhcmxlc3RvbicgfSxcbiAgeyBuYW1lOiAnTm9ydGggTGFzIFZlZ2FzJyB9LFxuICB7IG5hbWU6ICdOb3J0aCBMYXVkZXJkYWxlJyB9LFxuICB7IG5hbWU6ICdOb3J0aCBMaXR0bGUgUm9jaycgfSxcbiAgeyBuYW1lOiAnTm9ydGggTWlhbWknIH0sXG4gIHsgbmFtZTogJ05vcnRoIE1pYW1pIEJlYWNoJyB9LFxuICB7IG5hbWU6ICdOb3J0aCBQb3J0JyB9LFxuICB7IG5hbWU6ICdOb3J0aCBSaWNobGFuZCBIaWxscycgfSxcbiAgeyBuYW1lOiAnTm9ydGhnbGVubicgfSxcbiAgeyBuYW1lOiAnTm9yd2FsaycgfSxcbiAgeyBuYW1lOiAnTm9yd2FsaycgfSxcbiAgeyBuYW1lOiAnTm9yd2ljaCcgfSxcbiAgeyBuYW1lOiAnTm92YXRvJyB9LFxuICB7IG5hbWU6ICdOb3ZpJyB9LFxuICB7IG5hbWU6ICdPXFwnRmFsbG9uJyB9LFxuICB7IG5hbWU6ICdPYWsgTGF3bicgfSxcbiAgeyBuYW1lOiAnT2FrIFBhcmsnIH0sXG4gIHsgbmFtZTogJ09ha2xhbmQnIH0sXG4gIHsgbmFtZTogJ09ha2xhbmQgUGFyaycgfSxcbiAgeyBuYW1lOiAnT2FrbGV5JyB9LFxuICB7IG5hbWU6ICdPY2FsYScgfSxcbiAgeyBuYW1lOiAnT2NlYW5zaWRlJyB9LFxuICB7IG5hbWU6ICdPY29lZScgfSxcbiAgeyBuYW1lOiAnT2Rlc3NhJyB9LFxuICB7IG5hbWU6ICdPZ2RlbicgfSxcbiAgeyBuYW1lOiAnT2tsYWhvbWEgQ2l0eScgfSxcbiAgeyBuYW1lOiAnT2xhdGhlJyB9LFxuICB7IG5hbWU6ICdPbHltcGlhJyB9LFxuICB7IG5hbWU6ICdPbWFoYScgfSxcbiAgeyBuYW1lOiAnT250YXJpbycgfSxcbiAgeyBuYW1lOiAnT3JhbmdlJyB9LFxuICB7IG5hbWU6ICdPcmVtJyB9LFxuICB7IG5hbWU6ICdPcmxhbmQgUGFyaycgfSxcbiAgeyBuYW1lOiAnT3JsYW5kbycgfSxcbiAgeyBuYW1lOiAnT3Jtb25kIEJlYWNoJyB9LFxuICB7IG5hbWU6ICdPcm8gVmFsbGV5JyB9LFxuICB7IG5hbWU6ICdPc2hrb3NoJyB9LFxuICB7IG5hbWU6ICdPdmVybGFuZCBQYXJrJyB9LFxuICB7IG5hbWU6ICdPd2Vuc2Jvcm8nIH0sXG4gIHsgbmFtZTogJ094bmFyZCcgfSxcbiAgeyBuYW1lOiAnUGFjaWZpY2EnIH0sXG4gIHsgbmFtZTogJ1BhbGF0aW5lJyB9LFxuICB7IG5hbWU6ICdQYWxtIEJheScgfSxcbiAgeyBuYW1lOiAnUGFsbSBCZWFjaCBHYXJkZW5zJyB9LFxuICB7IG5hbWU6ICdQYWxtIENvYXN0JyB9LFxuICB7IG5hbWU6ICdQYWxtIERlc2VydCcgfSxcbiAgeyBuYW1lOiAnUGFsbSBTcHJpbmdzJyB9LFxuICB7IG5hbWU6ICdQYWxtZGFsZScgfSxcbiAgeyBuYW1lOiAnUGFsbyBBbHRvJyB9LFxuICB7IG5hbWU6ICdQYW5hbWEgQ2l0eScgfSxcbiAgeyBuYW1lOiAnUGFyYW1vdW50JyB9LFxuICB7IG5hbWU6ICdQYXJrIFJpZGdlJyB9LFxuICB7IG5hbWU6ICdQYXJrZXInIH0sXG4gIHsgbmFtZTogJ1Bhcm1hJyB9LFxuICB7IG5hbWU6ICdQYXNhZGVuYScgfSxcbiAgeyBuYW1lOiAnUGFzYWRlbmEnIH0sXG4gIHsgbmFtZTogJ1Bhc2NvJyB9LFxuICB7IG5hbWU6ICdQYXNzYWljJyB9LFxuICB7IG5hbWU6ICdQYXRlcnNvbicgfSxcbiAgeyBuYW1lOiAnUGF3dHVja2V0JyB9LFxuICB7IG5hbWU6ICdQZWFib2R5JyB9LFxuICB7IG5hbWU6ICdQZWFjaHRyZWUgQ29ybmVycycgfSxcbiAgeyBuYW1lOiAnUGVhcmxhbmQnIH0sXG4gIHsgbmFtZTogJ1BlbWJyb2tlIFBpbmVzJyB9LFxuICB7IG5hbWU6ICdQZW5zYWNvbGEnIH0sXG4gIHsgbmFtZTogJ1Blb3JpYScgfSxcbiAgeyBuYW1lOiAnUGVvcmlhJyB9LFxuICB7IG5hbWU6ICdQZXJyaXMnIH0sXG4gIHsgbmFtZTogJ1BlcnRoIEFtYm95JyB9LFxuICB7IG5hbWU6ICdQZXRhbHVtYScgfSxcbiAgeyBuYW1lOiAnUGZsdWdlcnZpbGxlJyB9LFxuICB7IG5hbWU6ICdQaGFycicgfSxcbiAgeyBuYW1lOiAnUGhlbml4IENpdHknIH0sXG4gIHsgbmFtZTogJ1BoaWxhZGVscGhpYScgfSxcbiAgeyBuYW1lOiAnUGhvZW5peCcgfSxcbiAgeyBuYW1lOiAnUGljbyBSaXZlcmEnIH0sXG4gIHsgbmFtZTogJ1BpbmUgQmx1ZmYnIH0sXG4gIHsgbmFtZTogJ1BpbmVsbGFzIFBhcmsnIH0sXG4gIHsgbmFtZTogJ1BpdHRzYnVyZycgfSxcbiAgeyBuYW1lOiAnUGl0dHNidXJnaCcgfSxcbiAgeyBuYW1lOiAnUGl0dHNmaWVsZCcgfSxcbiAgeyBuYW1lOiAnUGxhY2VudGlhJyB9LFxuICB7IG5hbWU6ICdQbGFpbmZpZWxkJyB9LFxuICB7IG5hbWU6ICdQbGFpbmZpZWxkJyB9LFxuICB7IG5hbWU6ICdQbGFubycgfSxcbiAgeyBuYW1lOiAnUGxhbnRhdGlvbicgfSxcbiAgeyBuYW1lOiAnUGxlYXNhbnRvbicgfSxcbiAgeyBuYW1lOiAnUGx5bW91dGgnIH0sXG4gIHsgbmFtZTogJ1BvY2F0ZWxsbycgfSxcbiAgeyBuYW1lOiAnUG9tb25hJyB9LFxuICB7IG5hbWU6ICdQb21wYW5vIEJlYWNoJyB9LFxuICB7IG5hbWU6ICdQb250aWFjJyB9LFxuICB7IG5hbWU6ICdQb3J0IEFydGh1cicgfSxcbiAgeyBuYW1lOiAnUG9ydCBPcmFuZ2UnIH0sXG4gIHsgbmFtZTogJ1BvcnQgU3QuIEx1Y2llJyB9LFxuICB7IG5hbWU6ICdQb3J0YWdlJyB9LFxuICB7IG5hbWU6ICdQb3J0ZXJ2aWxsZScgfSxcbiAgeyBuYW1lOiAnUG9ydGxhbmQnIH0sXG4gIHsgbmFtZTogJ1BvcnRsYW5kJyB9LFxuICB7IG5hbWU6ICdQb3J0c21vdXRoJyB9LFxuICB7IG5hbWU6ICdQb3dheScgfSxcbiAgeyBuYW1lOiAnUHJlc2NvdHQnIH0sXG4gIHsgbmFtZTogJ1ByZXNjb3R0IFZhbGxleScgfSxcbiAgeyBuYW1lOiAnUHJvdmlkZW5jZScgfSxcbiAgeyBuYW1lOiAnUHJvdm8nIH0sXG4gIHsgbmFtZTogJ1B1ZWJsbycgfSxcbiAgeyBuYW1lOiAnUHV5YWxsdXAnIH0sXG4gIHsgbmFtZTogJ1F1aW5jeScgfSxcbiAgeyBuYW1lOiAnUXVpbmN5JyB9LFxuICB7IG5hbWU6ICdSYWNpbmUnIH0sXG4gIHsgbmFtZTogJ1JhbGVpZ2gnIH0sXG4gIHsgbmFtZTogJ1JhbmNobyBDb3Jkb3ZhJyB9LFxuICB7IG5hbWU6ICdSYW5jaG8gQ3VjYW1vbmdhJyB9LFxuICB7IG5hbWU6ICdSYW5jaG8gUGFsb3MgVmVyZGVzJyB9LFxuICB7IG5hbWU6ICdSYW5jaG8gU2FudGEgTWFyZ2FyaXRhJyB9LFxuICB7IG5hbWU6ICdSYXBpZCBDaXR5JyB9LFxuICB7IG5hbWU6ICdSZWFkaW5nJyB9LFxuICB7IG5hbWU6ICdSZWRkaW5nJyB9LFxuICB7IG5hbWU6ICdSZWRsYW5kcycgfSxcbiAgeyBuYW1lOiAnUmVkbW9uZCcgfSxcbiAgeyBuYW1lOiAnUmVkb25kbyBCZWFjaCcgfSxcbiAgeyBuYW1lOiAnUmVkd29vZCBDaXR5JyB9LFxuICB7IG5hbWU6ICdSZW5vJyB9LFxuICB7IG5hbWU6ICdSZW50b24nIH0sXG4gIHsgbmFtZTogJ1JldmVyZScgfSxcbiAgeyBuYW1lOiAnUmlhbHRvJyB9LFxuICB7IG5hbWU6ICdSaWNoYXJkc29uJyB9LFxuICB7IG5hbWU6ICdSaWNobGFuZCcgfSxcbiAgeyBuYW1lOiAnUmljaG1vbmQnIH0sXG4gIHsgbmFtZTogJ1JpY2htb25kJyB9LFxuICB7IG5hbWU6ICdSaW8gUmFuY2hvJyB9LFxuICB7IG5hbWU6ICdSaXZlcnNpZGUnIH0sXG4gIHsgbmFtZTogJ1JpdmVydG9uJyB9LFxuICB7IG5hbWU6ICdSb2Fub2tlJyB9LFxuICB7IG5hbWU6ICdSb2NoZXN0ZXInIH0sXG4gIHsgbmFtZTogJ1JvY2hlc3RlcicgfSxcbiAgeyBuYW1lOiAnUm9jaGVzdGVyIEhpbGxzJyB9LFxuICB7IG5hbWU6ICdSb2NrIEhpbGwnIH0sXG4gIHsgbmFtZTogJ1JvY2sgSXNsYW5kJyB9LFxuICB7IG5hbWU6ICdSb2NrZm9yZCcgfSxcbiAgeyBuYW1lOiAnUm9ja2xpbicgfSxcbiAgeyBuYW1lOiAnUm9ja3ZpbGxlJyB9LFxuICB7IG5hbWU6ICdSb2Nrd2FsbCcgfSxcbiAgeyBuYW1lOiAnUm9ja3kgTW91bnQnIH0sXG4gIHsgbmFtZTogJ1JvZ2VycycgfSxcbiAgeyBuYW1lOiAnUm9obmVydCBQYXJrJyB9LFxuICB7IG5hbWU6ICdSb21lb3ZpbGxlJyB9LFxuICB7IG5hbWU6ICdSb3NlbWVhZCcgfSxcbiAgeyBuYW1lOiAnUm9zZXZpbGxlJyB9LFxuICB7IG5hbWU6ICdSb3NldmlsbGUnIH0sXG4gIHsgbmFtZTogJ1Jvc3dlbGwnIH0sXG4gIHsgbmFtZTogJ1Jvc3dlbGwnIH0sXG4gIHsgbmFtZTogJ1JvdW5kIFJvY2snIH0sXG4gIHsgbmFtZTogJ1Jvd2xldHQnIH0sXG4gIHsgbmFtZTogJ1JveScgfSxcbiAgeyBuYW1lOiAnUm95YWwgT2FrJyB9LFxuICB7IG5hbWU6ICdTYWNyYW1lbnRvJyB9LFxuICB7IG5hbWU6ICdTYWdpbmF3JyB9LFxuICB7IG5hbWU6ICdTYWxlbScgfSxcbiAgeyBuYW1lOiAnU2FsZW0nIH0sXG4gIHsgbmFtZTogJ1NhbGluYScgfSxcbiAgeyBuYW1lOiAnU2FsaW5hcycgfSxcbiAgeyBuYW1lOiAnU2FsdCBMYWtlIENpdHknIH0sXG4gIHsgbmFtZTogJ1NhbW1hbWlzaCcgfSxcbiAgeyBuYW1lOiAnU2FuIEFuZ2VsbycgfSxcbiAgeyBuYW1lOiAnU2FuIEFudG9uaW8nIH0sXG4gIHsgbmFtZTogJ1NhbiBCZXJuYXJkaW5vJyB9LFxuICB7IG5hbWU6ICdTYW4gQnJ1bm8nIH0sXG4gIHsgbmFtZTogJ1NhbiBCdWVuYXZlbnR1cmEgKFZlbnR1cmEpJyB9LFxuICB7IG5hbWU6ICdTYW4gQ2xlbWVudGUnIH0sXG4gIHsgbmFtZTogJ1NhbiBEaWVnbycgfSxcbiAgeyBuYW1lOiAnU2FuIEZyYW5jaXNjbycgfSxcbiAgeyBuYW1lOiAnU2FuIEdhYnJpZWwnIH0sXG4gIHsgbmFtZTogJ1NhbiBKYWNpbnRvJyB9LFxuICB7IG5hbWU6ICdTYW4gSm9zZScgfSxcbiAgeyBuYW1lOiAnU2FuIExlYW5kcm8nIH0sXG4gIHsgbmFtZTogJ1NhbiBMdWlzIE9iaXNwbycgfSxcbiAgeyBuYW1lOiAnU2FuIE1hcmNvcycgfSxcbiAgeyBuYW1lOiAnU2FuIE1hcmNvcycgfSxcbiAgeyBuYW1lOiAnU2FuIE1hdGVvJyB9LFxuICB7IG5hbWU6ICdTYW4gUmFmYWVsJyB9LFxuICB7IG5hbWU6ICdTYW4gUmFtb24nIH0sXG4gIHsgbmFtZTogJ1NhbmR5JyB9LFxuICB7IG5hbWU6ICdTYW5keSBTcHJpbmdzJyB9LFxuICB7IG5hbWU6ICdTYW5mb3JkJyB9LFxuICB7IG5hbWU6ICdTYW50YSBBbmEnIH0sXG4gIHsgbmFtZTogJ1NhbnRhIEJhcmJhcmEnIH0sXG4gIHsgbmFtZTogJ1NhbnRhIENsYXJhJyB9LFxuICB7IG5hbWU6ICdTYW50YSBDbGFyaXRhJyB9LFxuICB7IG5hbWU6ICdTYW50YSBDcnV6JyB9LFxuICB7IG5hbWU6ICdTYW50YSBGZScgfSxcbiAgeyBuYW1lOiAnU2FudGEgTWFyaWEnIH0sXG4gIHsgbmFtZTogJ1NhbnRhIE1vbmljYScgfSxcbiAgeyBuYW1lOiAnU2FudGEgUm9zYScgfSxcbiAgeyBuYW1lOiAnU2FudGVlJyB9LFxuICB7IG5hbWU6ICdTYXJhc290YScgfSxcbiAgeyBuYW1lOiAnU2F2YW5uYWgnIH0sXG4gIHsgbmFtZTogJ1NheXJldmlsbGUnIH0sXG4gIHsgbmFtZTogJ1NjaGF1bWJ1cmcnIH0sXG4gIHsgbmFtZTogJ1NjaGVuZWN0YWR5JyB9LFxuICB7IG5hbWU6ICdTY290dHNkYWxlJyB9LFxuICB7IG5hbWU6ICdTY3JhbnRvbicgfSxcbiAgeyBuYW1lOiAnU2VhdHRsZScgfSxcbiAgeyBuYW1lOiAnU2hha29wZWUnIH0sXG4gIHsgbmFtZTogJ1NoYXduZWUnIH0sXG4gIHsgbmFtZTogJ1NoZWJveWdhbicgfSxcbiAgeyBuYW1lOiAnU2hlbHRvbicgfSxcbiAgeyBuYW1lOiAnU2hlcm1hbicgfSxcbiAgeyBuYW1lOiAnU2hvcmVsaW5lJyB9LFxuICB7IG5hbWU6ICdTaHJldmVwb3J0JyB9LFxuICB7IG5hbWU6ICdTaWVycmEgVmlzdGEnIH0sXG4gIHsgbmFtZTogJ1NpbWkgVmFsbGV5JyB9LFxuICB7IG5hbWU6ICdTaW91eCBDaXR5JyB9LFxuICB7IG5hbWU6ICdTaW91eCBGYWxscycgfSxcbiAgeyBuYW1lOiAnU2tva2llJyB9LFxuICB7IG5hbWU6ICdTbXlybmEnIH0sXG4gIHsgbmFtZTogJ1NteXJuYScgfSxcbiAgeyBuYW1lOiAnU29tZXJ2aWxsZScgfSxcbiAgeyBuYW1lOiAnU291dGggQmVuZCcgfSxcbiAgeyBuYW1lOiAnU291dGggR2F0ZScgfSxcbiAgeyBuYW1lOiAnU291dGggSm9yZGFuJyB9LFxuICB7IG5hbWU6ICdTb3V0aCBTYW4gRnJhbmNpc2NvJyB9LFxuICB7IG5hbWU6ICdTb3V0aGF2ZW4nIH0sXG4gIHsgbmFtZTogJ1NvdXRoZmllbGQnIH0sXG4gIHsgbmFtZTogJ1NwYW5pc2ggRm9yaycgfSxcbiAgeyBuYW1lOiAnU3BhcmtzJyB9LFxuICB7IG5hbWU6ICdTcGFydGFuYnVyZycgfSxcbiAgeyBuYW1lOiAnU3Bva2FuZScgfSxcbiAgeyBuYW1lOiAnU3Bva2FuZSBWYWxsZXknIH0sXG4gIHsgbmFtZTogJ1NwcmluZ2RhbGUnIH0sXG4gIHsgbmFtZTogJ1NwcmluZ2ZpZWxkJyB9LFxuICB7IG5hbWU6ICdTcHJpbmdmaWVsZCcgfSxcbiAgeyBuYW1lOiAnU3ByaW5nZmllbGQnIH0sXG4gIHsgbmFtZTogJ1NwcmluZ2ZpZWxkJyB9LFxuICB7IG5hbWU6ICdTcHJpbmdmaWVsZCcgfSxcbiAgeyBuYW1lOiAnU3QuIENoYXJsZXMnIH0sXG4gIHsgbmFtZTogJ1N0LiBDbGFpciBTaG9yZXMnIH0sXG4gIHsgbmFtZTogJ1N0LiBDbG91ZCcgfSxcbiAgeyBuYW1lOiAnU3QuIENsb3VkJyB9LFxuICB7IG5hbWU6ICdTdC4gR2VvcmdlJyB9LFxuICB7IG5hbWU6ICdTdC4gSm9zZXBoJyB9LFxuICB7IG5hbWU6ICdTdC4gTG91aXMnIH0sXG4gIHsgbmFtZTogJ1N0LiBMb3VpcyBQYXJrJyB9LFxuICB7IG5hbWU6ICdTdC4gUGF1bCcgfSxcbiAgeyBuYW1lOiAnU3QuIFBldGVycycgfSxcbiAgeyBuYW1lOiAnU3QuIFBldGVyc2J1cmcnIH0sXG4gIHsgbmFtZTogJ1N0YW1mb3JkJyB9LFxuICB7IG5hbWU6ICdTdGFudG9uJyB9LFxuICB7IG5hbWU6ICdTdGF0ZSBDb2xsZWdlJyB9LFxuICB7IG5hbWU6ICdTdGVybGluZyBIZWlnaHRzJyB9LFxuICB7IG5hbWU6ICdTdGlsbHdhdGVyJyB9LFxuICB7IG5hbWU6ICdTdG9ja3RvbicgfSxcbiAgeyBuYW1lOiAnU3RyZWFtd29vZCcgfSxcbiAgeyBuYW1lOiAnU3Ryb25nc3ZpbGxlJyB9LFxuICB7IG5hbWU6ICdTdWZmb2xrJyB9LFxuICB7IG5hbWU6ICdTdWdhciBMYW5kJyB9LFxuICB7IG5hbWU6ICdTdW1tZXJ2aWxsZScgfSxcbiAgeyBuYW1lOiAnU3VtdGVyJyB9LFxuICB7IG5hbWU6ICdTdW5ueXZhbGUnIH0sXG4gIHsgbmFtZTogJ1N1bnJpc2UnIH0sXG4gIHsgbmFtZTogJ1N1cnByaXNlJyB9LFxuICB7IG5hbWU6ICdTeXJhY3VzZScgfSxcbiAgeyBuYW1lOiAnVGFjb21hJyB9LFxuICB7IG5hbWU6ICdUYWxsYWhhc3NlZScgfSxcbiAgeyBuYW1lOiAnVGFtYXJhYycgfSxcbiAgeyBuYW1lOiAnVGFtcGEnIH0sXG4gIHsgbmFtZTogJ1RhdW50b24nIH0sXG4gIHsgbmFtZTogJ1RheWxvcicgfSxcbiAgeyBuYW1lOiAnVGF5bG9yc3ZpbGxlJyB9LFxuICB7IG5hbWU6ICdUZW1lY3VsYScgfSxcbiAgeyBuYW1lOiAnVGVtcGUnIH0sXG4gIHsgbmFtZTogJ1RlbXBsZScgfSxcbiAgeyBuYW1lOiAnVGVycmUgSGF1dGUnIH0sXG4gIHsgbmFtZTogJ1RleGFya2FuYScgfSxcbiAgeyBuYW1lOiAnVGV4YXMgQ2l0eScgfSxcbiAgeyBuYW1lOiAnVGhlIENvbG9ueScgfSxcbiAgeyBuYW1lOiAnVGhvcm50b24nIH0sXG4gIHsgbmFtZTogJ1Rob3VzYW5kIE9ha3MnIH0sXG4gIHsgbmFtZTogJ1RpZ2FyZCcgfSxcbiAgeyBuYW1lOiAnVGlubGV5IFBhcmsnIH0sXG4gIHsgbmFtZTogJ1RpdHVzdmlsbGUnIH0sXG4gIHsgbmFtZTogJ1RvbGVkbycgfSxcbiAgeyBuYW1lOiAnVG9wZWthJyB9LFxuICB7IG5hbWU6ICdUb3JyYW5jZScgfSxcbiAgeyBuYW1lOiAnVHJhY3knIH0sXG4gIHsgbmFtZTogJ1RyZW50b24nIH0sXG4gIHsgbmFtZTogJ1Ryb3knIH0sXG4gIHsgbmFtZTogJ1Ryb3knIH0sXG4gIHsgbmFtZTogJ1R1Y3NvbicgfSxcbiAgeyBuYW1lOiAnVHVsYXJlJyB9LFxuICB7IG5hbWU6ICdUdWxzYScgfSxcbiAgeyBuYW1lOiAnVHVybG9jaycgfSxcbiAgeyBuYW1lOiAnVHVzY2Fsb29zYScgfSxcbiAgeyBuYW1lOiAnVHVzdGluJyB9LFxuICB7IG5hbWU6ICdUd2luIEZhbGxzJyB9LFxuICB7IG5hbWU6ICdUeWxlcicgfSxcbiAgeyBuYW1lOiAnVW5pb24gQ2l0eScgfSxcbiAgeyBuYW1lOiAnVW5pb24gQ2l0eScgfSxcbiAgeyBuYW1lOiAnVXBsYW5kJyB9LFxuICB7IG5hbWU6ICdVcmJhbmEnIH0sXG4gIHsgbmFtZTogJ1VyYmFuZGFsZScgfSxcbiAgeyBuYW1lOiAnVXRpY2EnIH0sXG4gIHsgbmFtZTogJ1ZhY2F2aWxsZScgfSxcbiAgeyBuYW1lOiAnVmFsZG9zdGEnIH0sXG4gIHsgbmFtZTogJ1ZhbGxlam8nIH0sXG4gIHsgbmFtZTogJ1ZhbGxleSBTdHJlYW0nIH0sXG4gIHsgbmFtZTogJ1ZhbmNvdXZlcicgfSxcbiAgeyBuYW1lOiAnVmljdG9yaWEnIH0sXG4gIHsgbmFtZTogJ1ZpY3RvcnZpbGxlJyB9LFxuICB7IG5hbWU6ICdWaW5lbGFuZCcgfSxcbiAgeyBuYW1lOiAnVmlyZ2luaWEgQmVhY2gnIH0sXG4gIHsgbmFtZTogJ1Zpc2FsaWEnIH0sXG4gIHsgbmFtZTogJ1Zpc3RhJyB9LFxuICB7IG5hbWU6ICdXYWNvJyB9LFxuICB7IG5hbWU6ICdXYWxudXQgQ3JlZWsnIH0sXG4gIHsgbmFtZTogJ1dhbHRoYW0nIH0sXG4gIHsgbmFtZTogJ1dhcm5lciBSb2JpbnMnIH0sXG4gIHsgbmFtZTogJ1dhcnJlbicgfSxcbiAgeyBuYW1lOiAnV2FycmVuJyB9LFxuICB7IG5hbWU6ICdXYXJ3aWNrJyB9LFxuICB7IG5hbWU6ICdXYXNoaW5ndG9uJyB9LFxuICB7IG5hbWU6ICdXYXRlcmJ1cnknIH0sXG4gIHsgbmFtZTogJ1dhdGVybG9vJyB9LFxuICB7IG5hbWU6ICdXYXRzb252aWxsZScgfSxcbiAgeyBuYW1lOiAnV2F1a2VnYW4nIH0sXG4gIHsgbmFtZTogJ1dhdWtlc2hhJyB9LFxuICB7IG5hbWU6ICdXYXVzYXUnIH0sXG4gIHsgbmFtZTogJ1dhdXdhdG9zYScgfSxcbiAgeyBuYW1lOiAnV2VsbGluZ3RvbicgfSxcbiAgeyBuYW1lOiAnV2VzbGFjbycgfSxcbiAgeyBuYW1lOiAnV2VzdCBBbGxpcycgfSxcbiAgeyBuYW1lOiAnV2VzdCBDb3ZpbmEnIH0sXG4gIHsgbmFtZTogJ1dlc3QgRGVzIE1vaW5lcycgfSxcbiAgeyBuYW1lOiAnV2VzdCBIYXZlbicgfSxcbiAgeyBuYW1lOiAnV2VzdCBKb3JkYW4nIH0sXG4gIHsgbmFtZTogJ1dlc3QgTmV3IFlvcmsnIH0sXG4gIHsgbmFtZTogJ1dlc3QgUGFsbSBCZWFjaCcgfSxcbiAgeyBuYW1lOiAnV2VzdCBTYWNyYW1lbnRvJyB9LFxuICB7IG5hbWU6ICdXZXN0IFZhbGxleSBDaXR5JyB9LFxuICB7IG5hbWU6ICdXZXN0ZXJ2aWxsZScgfSxcbiAgeyBuYW1lOiAnV2VzdGZpZWxkJyB9LFxuICB7IG5hbWU6ICdXZXN0bGFuZCcgfSxcbiAgeyBuYW1lOiAnV2VzdG1pbnN0ZXInIH0sXG4gIHsgbmFtZTogJ1dlc3RtaW5zdGVyJyB9LFxuICB7IG5hbWU6ICdXZXN0b24nIH0sXG4gIHsgbmFtZTogJ1dleW1vdXRoIFRvd24nIH0sXG4gIHsgbmFtZTogJ1doZWF0b24nIH0sXG4gIHsgbmFtZTogJ1doZWVsaW5nJyB9LFxuICB7IG5hbWU6ICdXaGl0ZSBQbGFpbnMnIH0sXG4gIHsgbmFtZTogJ1doaXR0aWVyJyB9LFxuICB7IG5hbWU6ICdXaWNoaXRhJyB9LFxuICB7IG5hbWU6ICdXaWNoaXRhIEZhbGxzJyB9LFxuICB7IG5hbWU6ICdXaWxrZXMtQmFycmUnIH0sXG4gIHsgbmFtZTogJ1dpbG1pbmd0b24nIH0sXG4gIHsgbmFtZTogJ1dpbG1pbmd0b24nIH0sXG4gIHsgbmFtZTogJ1dpbHNvbicgfSxcbiAgeyBuYW1lOiAnV2luc3Rvbi1TYWxlbScgfSxcbiAgeyBuYW1lOiAnV2ludGVyIEdhcmRlbicgfSxcbiAgeyBuYW1lOiAnV29idXJuJyB9LFxuICB7IG5hbWU6ICdXb29kYnVyeScgfSxcbiAgeyBuYW1lOiAnV29vZGxhbmQnIH0sXG4gIHsgbmFtZTogJ1dvb25zb2NrZXQnIH0sXG4gIHsgbmFtZTogJ1dvcmNlc3RlcicgfSxcbiAgeyBuYW1lOiAnV3lsaWUnIH0sXG4gIHsgbmFtZTogJ1d5b21pbmcnIH0sXG4gIHsgbmFtZTogJ1lha2ltYScgfSxcbiAgeyBuYW1lOiAnWW9ua2VycycgfSxcbiAgeyBuYW1lOiAnWW9yYmEgTGluZGEnIH0sXG4gIHsgbmFtZTogJ1lvcmsnIH0sXG4gIHsgbmFtZTogJ1lvdW5nc3Rvd24nIH0sXG4gIHsgbmFtZTogJ1l1YmEgQ2l0eScgfSxcbiAgeyBuYW1lOiAnWXVjYWlwYScgfSxcbiAgeyBuYW1lOiAnWXVtYScgfVxuXTtcbiIsIm1vZHVsZS5leHBvcnRzID0gW1xuXHR7IGdpdGh1YjogJ2plZHdhdHNvbicsIG5hbWU6ICdKZWQgV2F0c29uJyB9LFxuXHR7IGdpdGh1YjogJ2JydWRlcnN0ZWluJywgbmFtZTogJ0RhdmUgQnJvdGhlcnN0b25lJyB9LFxuXHR7IGdpdGh1YjogJ2pvc3NtYWMnLCBuYW1lOiAnSm9zcyBNYWNraXNvbicgfSxcblx0eyBnaXRodWI6ICdqbmllY2hjaWFsJywgbmFtZTogJ0pha3ViIE5pZWNoY2lhxYInIH0sXG5cdHsgZ2l0aHViOiAnY3JhaWdkYWxsaW1vcmUnLCBuYW1lOiAnQ3JhaWcgRGFsbGltb3JlJyB9LFxuXHR7IGdpdGh1YjogJ2p1bGVuJywgbmFtZTogJ0p1bGVuIFJ1aXogQWl6cHVydScgfSxcblx0eyBnaXRodWI6ICdkY291c2VucycsIG5hbWU6ICdEYW5pZWwgQ291c2VucycgfSxcblx0eyBnaXRodWI6ICdqZ2F1dHNjaCcsIG5hbWU6ICdKb24gR2F1dHNjaCcgfSxcblx0eyBnaXRodWI6ICdkbWl0cnktc21pcm5vdicsIG5hbWU6ICdEbWl0cnkgU21pcm5vdicgfSxcbl07XG4iLCJleHBvcnRzLkFVID0gW1xuXHR7IHZhbHVlOiAnYXVzdHJhbGlhbi1jYXBpdGFsLXRlcnJpdG9yeScsIGxhYmVsOiAnQXVzdHJhbGlhbiBDYXBpdGFsIFRlcnJpdG9yeScsIGNsYXNzTmFtZTogJ1N0YXRlLUFDVCcgfSxcblx0eyB2YWx1ZTogJ25ldy1zb3V0aC13YWxlcycsIGxhYmVsOiAnTmV3IFNvdXRoIFdhbGVzJywgY2xhc3NOYW1lOiAnU3RhdGUtTlNXJyB9LFxuXHR7IHZhbHVlOiAndmljdG9yaWEnLCBsYWJlbDogJ1ZpY3RvcmlhJywgY2xhc3NOYW1lOiAnU3RhdGUtVmljJyB9LFxuXHR7IHZhbHVlOiAncXVlZW5zbGFuZCcsIGxhYmVsOiAnUXVlZW5zbGFuZCcsIGNsYXNzTmFtZTogJ1N0YXRlLVFsZCcgfSxcblx0eyB2YWx1ZTogJ3dlc3Rlcm4tYXVzdHJhbGlhJywgbGFiZWw6ICdXZXN0ZXJuIEF1c3RyYWxpYScsIGNsYXNzTmFtZTogJ1N0YXRlLVdBJyB9LFxuXHR7IHZhbHVlOiAnc291dGgtYXVzdHJhbGlhJywgbGFiZWw6ICdTb3V0aCBBdXN0cmFsaWEnLCBjbGFzc05hbWU6ICdTdGF0ZS1TQScgfSxcblx0eyB2YWx1ZTogJ3Rhc21hbmlhJywgbGFiZWw6ICdUYXNtYW5pYScsIGNsYXNzTmFtZTogJ1N0YXRlLVRhcycgfSxcblx0eyB2YWx1ZTogJ25vcnRoZXJuLXRlcnJpdG9yeScsIGxhYmVsOiAnTm9ydGhlcm4gVGVycml0b3J5JywgY2xhc3NOYW1lOiAnU3RhdGUtTlQnIH0sXG5dO1xuXG5leHBvcnRzLlVTID0gW1xuICAgIHsgdmFsdWU6ICdBTCcsIGxhYmVsOiAnQWxhYmFtYScsIGRpc2FibGVkOiB0cnVlIH0sXG4gICAgeyB2YWx1ZTogJ0FLJywgbGFiZWw6ICdBbGFza2EnIH0sXG4gICAgeyB2YWx1ZTogJ0FTJywgbGFiZWw6ICdBbWVyaWNhbiBTYW1vYScgfSxcbiAgICB7IHZhbHVlOiAnQVonLCBsYWJlbDogJ0FyaXpvbmEnIH0sXG4gICAgeyB2YWx1ZTogJ0FSJywgbGFiZWw6ICdBcmthbnNhcycgfSxcbiAgICB7IHZhbHVlOiAnQ0EnLCBsYWJlbDogJ0NhbGlmb3JuaWEnIH0sXG4gICAgeyB2YWx1ZTogJ0NPJywgbGFiZWw6ICdDb2xvcmFkbycgfSxcbiAgICB7IHZhbHVlOiAnQ1QnLCBsYWJlbDogJ0Nvbm5lY3RpY3V0JyB9LFxuICAgIHsgdmFsdWU6ICdERScsIGxhYmVsOiAnRGVsYXdhcmUnIH0sXG4gICAgeyB2YWx1ZTogJ0RDJywgbGFiZWw6ICdEaXN0cmljdCBPZiBDb2x1bWJpYScgfSxcbiAgICB7IHZhbHVlOiAnRk0nLCBsYWJlbDogJ0ZlZGVyYXRlZCBTdGF0ZXMgT2YgTWljcm9uZXNpYScgfSxcbiAgICB7IHZhbHVlOiAnRkwnLCBsYWJlbDogJ0Zsb3JpZGEnIH0sXG4gICAgeyB2YWx1ZTogJ0dBJywgbGFiZWw6ICdHZW9yZ2lhJyB9LFxuICAgIHsgdmFsdWU6ICdHVScsIGxhYmVsOiAnR3VhbScgfSxcbiAgICB7IHZhbHVlOiAnSEknLCBsYWJlbDogJ0hhd2FpaScgfSxcbiAgICB7IHZhbHVlOiAnSUQnLCBsYWJlbDogJ0lkYWhvJyB9LFxuICAgIHsgdmFsdWU6ICdJTCcsIGxhYmVsOiAnSWxsaW5vaXMnIH0sXG4gICAgeyB2YWx1ZTogJ0lOJywgbGFiZWw6ICdJbmRpYW5hJyB9LFxuICAgIHsgdmFsdWU6ICdJQScsIGxhYmVsOiAnSW93YScgfSxcbiAgICB7IHZhbHVlOiAnS1MnLCBsYWJlbDogJ0thbnNhcycgfSxcbiAgICB7IHZhbHVlOiAnS1knLCBsYWJlbDogJ0tlbnR1Y2t5JyB9LFxuICAgIHsgdmFsdWU6ICdMQScsIGxhYmVsOiAnTG91aXNpYW5hJyB9LFxuICAgIHsgdmFsdWU6ICdNRScsIGxhYmVsOiAnTWFpbmUnIH0sXG4gICAgeyB2YWx1ZTogJ01IJywgbGFiZWw6ICdNYXJzaGFsbCBJc2xhbmRzJyB9LFxuICAgIHsgdmFsdWU6ICdNRCcsIGxhYmVsOiAnTWFyeWxhbmQnIH0sXG4gICAgeyB2YWx1ZTogJ01BJywgbGFiZWw6ICdNYXNzYWNodXNldHRzJyB9LFxuICAgIHsgdmFsdWU6ICdNSScsIGxhYmVsOiAnTWljaGlnYW4nIH0sXG4gICAgeyB2YWx1ZTogJ01OJywgbGFiZWw6ICdNaW5uZXNvdGEnIH0sXG4gICAgeyB2YWx1ZTogJ01TJywgbGFiZWw6ICdNaXNzaXNzaXBwaScgfSxcbiAgICB7IHZhbHVlOiAnTU8nLCBsYWJlbDogJ01pc3NvdXJpJyB9LFxuICAgIHsgdmFsdWU6ICdNVCcsIGxhYmVsOiAnTW9udGFuYScgfSxcbiAgICB7IHZhbHVlOiAnTkUnLCBsYWJlbDogJ05lYnJhc2thJyB9LFxuICAgIHsgdmFsdWU6ICdOVicsIGxhYmVsOiAnTmV2YWRhJyB9LFxuICAgIHsgdmFsdWU6ICdOSCcsIGxhYmVsOiAnTmV3IEhhbXBzaGlyZScgfSxcbiAgICB7IHZhbHVlOiAnTkonLCBsYWJlbDogJ05ldyBKZXJzZXknIH0sXG4gICAgeyB2YWx1ZTogJ05NJywgbGFiZWw6ICdOZXcgTWV4aWNvJyB9LFxuICAgIHsgdmFsdWU6ICdOWScsIGxhYmVsOiAnTmV3IFlvcmsnIH0sXG4gICAgeyB2YWx1ZTogJ05DJywgbGFiZWw6ICdOb3J0aCBDYXJvbGluYScgfSxcbiAgICB7IHZhbHVlOiAnTkQnLCBsYWJlbDogJ05vcnRoIERha290YScgfSxcbiAgICB7IHZhbHVlOiAnTVAnLCBsYWJlbDogJ05vcnRoZXJuIE1hcmlhbmEgSXNsYW5kcycgfSxcbiAgICB7IHZhbHVlOiAnT0gnLCBsYWJlbDogJ09oaW8nIH0sXG4gICAgeyB2YWx1ZTogJ09LJywgbGFiZWw6ICdPa2xhaG9tYScgfSxcbiAgICB7IHZhbHVlOiAnT1InLCBsYWJlbDogJ09yZWdvbicgfSxcbiAgICB7IHZhbHVlOiAnUFcnLCBsYWJlbDogJ1BhbGF1JyB9LFxuICAgIHsgdmFsdWU6ICdQQScsIGxhYmVsOiAnUGVubnN5bHZhbmlhJyB9LFxuICAgIHsgdmFsdWU6ICdQUicsIGxhYmVsOiAnUHVlcnRvIFJpY28nIH0sXG4gICAgeyB2YWx1ZTogJ1JJJywgbGFiZWw6ICdSaG9kZSBJc2xhbmQnIH0sXG4gICAgeyB2YWx1ZTogJ1NDJywgbGFiZWw6ICdTb3V0aCBDYXJvbGluYScgfSxcbiAgICB7IHZhbHVlOiAnU0QnLCBsYWJlbDogJ1NvdXRoIERha290YScgfSxcbiAgICB7IHZhbHVlOiAnVE4nLCBsYWJlbDogJ1Rlbm5lc3NlZScgfSxcbiAgICB7IHZhbHVlOiAnVFgnLCBsYWJlbDogJ1RleGFzJyB9LFxuICAgIHsgdmFsdWU6ICdVVCcsIGxhYmVsOiAnVXRhaCcgfSxcbiAgICB7IHZhbHVlOiAnVlQnLCBsYWJlbDogJ1Zlcm1vbnQnIH0sXG4gICAgeyB2YWx1ZTogJ1ZJJywgbGFiZWw6ICdWaXJnaW4gSXNsYW5kcycgfSxcbiAgICB7IHZhbHVlOiAnVkEnLCBsYWJlbDogJ1ZpcmdpbmlhJyB9LFxuICAgIHsgdmFsdWU6ICdXQScsIGxhYmVsOiAnV2FzaGluZ3RvbicgfSxcbiAgICB7IHZhbHVlOiAnV1YnLCBsYWJlbDogJ1dlc3QgVmlyZ2luaWEnIH0sXG4gICAgeyB2YWx1ZTogJ1dJJywgbGFiZWw6ICdXaXNjb25zaW4nIH0sXG4gICAgeyB2YWx1ZTogJ1dZJywgbGFiZWw6ICdXeW9taW5nJyB9LFxuXTtcbiIsIm1vZHVsZS5leHBvcnRzID0gW1xuXHR7IHZhbHVlOiAnSm9obiBTbWl0aCcsIGxhYmVsOiAnSm9obiBTbWl0aCcsIGVtYWlsOiAnam9obkBzbWl0aC5jb20nIH0sXG5cdHsgdmFsdWU6ICdNZXJyeSBKYW5lJywgbGFiZWw6ICdNZXJyeSBKYW5lJywgZW1haWw6ICdtZXJyeUBqYW5lLmNvbScgfSxcblx0eyB2YWx1ZTogJ1N0YW4gSG9wZXInLCBsYWJlbDogJ1N0YW4gSG9wZXInLCBlbWFpbDogJ3N0YW5AaG9wZXIuY29tJyB9XG5dO1xuIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG5cbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHNldFRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZHJhaW5RdWV1ZSwgMCk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuJ3VzZSBzdHJpY3QnO1xuXG4vLyBJZiBvYmouaGFzT3duUHJvcGVydHkgaGFzIGJlZW4gb3ZlcnJpZGRlbiwgdGhlbiBjYWxsaW5nXG4vLyBvYmouaGFzT3duUHJvcGVydHkocHJvcCkgd2lsbCBicmVhay5cbi8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL2pveWVudC9ub2RlL2lzc3Vlcy8xNzA3XG5mdW5jdGlvbiBoYXNPd25Qcm9wZXJ0eShvYmosIHByb3ApIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHFzLCBzZXAsIGVxLCBvcHRpb25zKSB7XG4gIHNlcCA9IHNlcCB8fCAnJic7XG4gIGVxID0gZXEgfHwgJz0nO1xuICB2YXIgb2JqID0ge307XG5cbiAgaWYgKHR5cGVvZiBxcyAhPT0gJ3N0cmluZycgfHwgcXMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIG9iajtcbiAgfVxuXG4gIHZhciByZWdleHAgPSAvXFwrL2c7XG4gIHFzID0gcXMuc3BsaXQoc2VwKTtcblxuICB2YXIgbWF4S2V5cyA9IDEwMDA7XG4gIGlmIChvcHRpb25zICYmIHR5cGVvZiBvcHRpb25zLm1heEtleXMgPT09ICdudW1iZXInKSB7XG4gICAgbWF4S2V5cyA9IG9wdGlvbnMubWF4S2V5cztcbiAgfVxuXG4gIHZhciBsZW4gPSBxcy5sZW5ndGg7XG4gIC8vIG1heEtleXMgPD0gMCBtZWFucyB0aGF0IHdlIHNob3VsZCBub3QgbGltaXQga2V5cyBjb3VudFxuICBpZiAobWF4S2V5cyA+IDAgJiYgbGVuID4gbWF4S2V5cykge1xuICAgIGxlbiA9IG1heEtleXM7XG4gIH1cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgKytpKSB7XG4gICAgdmFyIHggPSBxc1tpXS5yZXBsYWNlKHJlZ2V4cCwgJyUyMCcpLFxuICAgICAgICBpZHggPSB4LmluZGV4T2YoZXEpLFxuICAgICAgICBrc3RyLCB2c3RyLCBrLCB2O1xuXG4gICAgaWYgKGlkeCA+PSAwKSB7XG4gICAgICBrc3RyID0geC5zdWJzdHIoMCwgaWR4KTtcbiAgICAgIHZzdHIgPSB4LnN1YnN0cihpZHggKyAxKTtcbiAgICB9IGVsc2Uge1xuICAgICAga3N0ciA9IHg7XG4gICAgICB2c3RyID0gJyc7XG4gICAgfVxuXG4gICAgayA9IGRlY29kZVVSSUNvbXBvbmVudChrc3RyKTtcbiAgICB2ID0gZGVjb2RlVVJJQ29tcG9uZW50KHZzdHIpO1xuXG4gICAgaWYgKCFoYXNPd25Qcm9wZXJ0eShvYmosIGspKSB7XG4gICAgICBvYmpba10gPSB2O1xuICAgIH0gZWxzZSBpZiAoaXNBcnJheShvYmpba10pKSB7XG4gICAgICBvYmpba10ucHVzaCh2KTtcbiAgICB9IGVsc2Uge1xuICAgICAgb2JqW2tdID0gW29ialtrXSwgdl07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG9iajtcbn07XG5cbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiAoeHMpIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh4cykgPT09ICdbb2JqZWN0IEFycmF5XSc7XG59O1xuIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIHN0cmluZ2lmeVByaW1pdGl2ZSA9IGZ1bmN0aW9uKHYpIHtcbiAgc3dpdGNoICh0eXBlb2Ygdikge1xuICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICByZXR1cm4gdjtcblxuICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgcmV0dXJuIHYgPyAndHJ1ZScgOiAnZmFsc2UnO1xuXG4gICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgIHJldHVybiBpc0Zpbml0ZSh2KSA/IHYgOiAnJztcblxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gJyc7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob2JqLCBzZXAsIGVxLCBuYW1lKSB7XG4gIHNlcCA9IHNlcCB8fCAnJic7XG4gIGVxID0gZXEgfHwgJz0nO1xuICBpZiAob2JqID09PSBudWxsKSB7XG4gICAgb2JqID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBvYmogPT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIG1hcChvYmplY3RLZXlzKG9iaiksIGZ1bmN0aW9uKGspIHtcbiAgICAgIHZhciBrcyA9IGVuY29kZVVSSUNvbXBvbmVudChzdHJpbmdpZnlQcmltaXRpdmUoaykpICsgZXE7XG4gICAgICBpZiAoaXNBcnJheShvYmpba10pKSB7XG4gICAgICAgIHJldHVybiBtYXAob2JqW2tdLCBmdW5jdGlvbih2KSB7XG4gICAgICAgICAgcmV0dXJuIGtzICsgZW5jb2RlVVJJQ29tcG9uZW50KHN0cmluZ2lmeVByaW1pdGl2ZSh2KSk7XG4gICAgICAgIH0pLmpvaW4oc2VwKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBrcyArIGVuY29kZVVSSUNvbXBvbmVudChzdHJpbmdpZnlQcmltaXRpdmUob2JqW2tdKSk7XG4gICAgICB9XG4gICAgfSkuam9pbihzZXApO1xuXG4gIH1cblxuICBpZiAoIW5hbWUpIHJldHVybiAnJztcbiAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChzdHJpbmdpZnlQcmltaXRpdmUobmFtZSkpICsgZXEgK1xuICAgICAgICAgZW5jb2RlVVJJQ29tcG9uZW50KHN0cmluZ2lmeVByaW1pdGl2ZShvYmopKTtcbn07XG5cbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiAoeHMpIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh4cykgPT09ICdbb2JqZWN0IEFycmF5XSc7XG59O1xuXG5mdW5jdGlvbiBtYXAgKHhzLCBmKSB7XG4gIGlmICh4cy5tYXApIHJldHVybiB4cy5tYXAoZik7XG4gIHZhciByZXMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB4cy5sZW5ndGg7IGkrKykge1xuICAgIHJlcy5wdXNoKGYoeHNbaV0sIGkpKTtcbiAgfVxuICByZXR1cm4gcmVzO1xufVxuXG52YXIgb2JqZWN0S2V5cyA9IE9iamVjdC5rZXlzIHx8IGZ1bmN0aW9uIChvYmopIHtcbiAgdmFyIHJlcyA9IFtdO1xuICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIHJlcy5wdXNoKGtleSk7XG4gIH1cbiAgcmV0dXJuIHJlcztcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuZGVjb2RlID0gZXhwb3J0cy5wYXJzZSA9IHJlcXVpcmUoJy4vZGVjb2RlJyk7XG5leHBvcnRzLmVuY29kZSA9IGV4cG9ydHMuc3RyaW5naWZ5ID0gcmVxdWlyZSgnLi9lbmNvZGUnKTtcbiIsIi8vIEdlbmVyYXRlZCBieSBDb2ZmZWVTY3JpcHQgMS4xMC4wXG52YXIgUmVhY3QsIGlzUmV0aW5hLCBtZDUsIHF1ZXJ5c3RyaW5nO1xuXG5SZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbm1kNSA9IHJlcXVpcmUoJ21kNScpO1xuXG5xdWVyeXN0cmluZyA9IHJlcXVpcmUoJ3F1ZXJ5c3RyaW5nJyk7XG5cbmlzUmV0aW5hID0gcmVxdWlyZSgnaXMtcmV0aW5hJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBkaXNwbGF5TmFtZTogJ0dyYXZhdGFyJyxcbiAgcHJvcFR5cGVzOiB7XG4gICAgZW1haWw6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgbWQ1OiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIHNpemU6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG4gICAgcmF0aW5nOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIGh0dHBzOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICBcImRlZmF1bHRcIjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjbGFzc05hbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmdcbiAgfSxcbiAgZ2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc2l6ZTogNTAsXG4gICAgICByYXRpbmc6ICdnJyxcbiAgICAgIGh0dHBzOiBmYWxzZSxcbiAgICAgIFwiZGVmYXVsdFwiOiBcInJldHJvXCJcbiAgICB9O1xuICB9LFxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBiYXNlLCBoYXNoLCBtb2Rlcm5Ccm93c2VyLCBxdWVyeSwgcmV0aW5hUXVlcnksIHJldGluYVNyYywgc3JjO1xuICAgIGJhc2UgPSB0aGlzLnByb3BzLmh0dHBzID8gXCJodHRwczovL3NlY3VyZS5ncmF2YXRhci5jb20vYXZhdGFyL1wiIDogJ2h0dHA6Ly93d3cuZ3JhdmF0YXIuY29tL2F2YXRhci8nO1xuICAgIHF1ZXJ5ID0gcXVlcnlzdHJpbmcuc3RyaW5naWZ5KHtcbiAgICAgIHM6IHRoaXMucHJvcHMuc2l6ZSxcbiAgICAgIHI6IHRoaXMucHJvcHMucmF0aW5nLFxuICAgICAgZDogdGhpcy5wcm9wc1tcImRlZmF1bHRcIl1cbiAgICB9KTtcbiAgICByZXRpbmFRdWVyeSA9IHF1ZXJ5c3RyaW5nLnN0cmluZ2lmeSh7XG4gICAgICBzOiB0aGlzLnByb3BzLnNpemUgKiAyLFxuICAgICAgcjogdGhpcy5wcm9wcy5yYXRpbmcsXG4gICAgICBkOiB0aGlzLnByb3BzW1wiZGVmYXVsdFwiXVxuICAgIH0pO1xuICAgIGlmICh0aGlzLnByb3BzLm1kNSkge1xuICAgICAgaGFzaCA9IHRoaXMucHJvcHMubWQ1O1xuICAgIH0gZWxzZSBpZiAodGhpcy5wcm9wcy5lbWFpbCkge1xuICAgICAgaGFzaCA9IG1kNSh0aGlzLnByb3BzLmVtYWlsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS53YXJuKCdHcmF2YXRhciBpbWFnZSBjYW4gbm90IGJlIGZldGNoZWQuIEVpdGhlciB0aGUgXCJlbWFpbFwiIG9yIFwibWQ1XCIgcHJvcCBtdXN0IGJlIHNwZWNpZmllZC4nKTtcbiAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIsIG51bGwpO1xuICAgIH1cbiAgICBzcmMgPSBiYXNlICsgaGFzaCArIFwiP1wiICsgcXVlcnk7XG4gICAgcmV0aW5hU3JjID0gYmFzZSArIGhhc2ggKyBcIj9cIiArIHJldGluYVF1ZXJ5O1xuICAgIG1vZGVybkJyb3dzZXIgPSB0cnVlO1xuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIHdpbmRvdyAhPT0gbnVsbCkge1xuICAgICAgbW9kZXJuQnJvd3NlciA9ICdzcmNzZXQnIGluIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgIH1cbiAgICBpZiAoIW1vZGVybkJyb3dzZXIgJiYgaXNSZXRpbmEoKSkge1xuICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIiwgUmVhY3QuX19zcHJlYWQoe1xuICAgICAgICBcInN0eWxlXCI6IHRoaXMucHJvcHMuc3R5bGUsXG4gICAgICAgIFwiY2xhc3NOYW1lXCI6IFwicmVhY3QtZ3JhdmF0YXIgXCIgKyB0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgXCJzcmNcIjogcmV0aW5hU3JjLFxuICAgICAgICBcImhlaWdodFwiOiB0aGlzLnByb3BzLnNpemUsXG4gICAgICAgIFwid2lkdGhcIjogdGhpcy5wcm9wcy5zaXplXG4gICAgICB9LCB0aGlzLnByb3BzKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaW1nXCIsIFJlYWN0Ll9fc3ByZWFkKHtcbiAgICAgICAgXCJzdHlsZVwiOiB0aGlzLnByb3BzLnN0eWxlLFxuICAgICAgICBcImNsYXNzTmFtZVwiOiBcInJlYWN0LWdyYXZhdGFyIFwiICsgdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgIFwic3JjXCI6IHNyYyxcbiAgICAgICAgXCJzcmNTZXRcIjogcmV0aW5hU3JjICsgXCIgMnhcIixcbiAgICAgICAgXCJoZWlnaHRcIjogdGhpcy5wcm9wcy5zaXplLFxuICAgICAgICBcIndpZHRoXCI6IHRoaXMucHJvcHMuc2l6ZVxuICAgICAgfSwgdGhpcy5wcm9wcykpO1xuICAgIH1cbiAgfVxufSk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuICB2YXIgbWVkaWFRdWVyeTtcbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgd2luZG93ICE9PSBudWxsKSB7XG4gICAgbWVkaWFRdWVyeSA9IFwiKC13ZWJraXQtbWluLWRldmljZS1waXhlbC1yYXRpbzogMS4yNSksIChtaW4tLW1vei1kZXZpY2UtcGl4ZWwtcmF0aW86IDEuMjUpLCAoLW8tbWluLWRldmljZS1waXhlbC1yYXRpbzogNS80KSwgKG1pbi1yZXNvbHV0aW9uOiAxLjI1ZHBweClcIjtcbiAgICBpZiAod2luZG93LmRldmljZVBpeGVsUmF0aW8gPiAxLjI1KSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKHdpbmRvdy5tYXRjaE1lZGlhICYmIHdpbmRvdy5tYXRjaE1lZGlhKG1lZGlhUXVlcnkpLm1hdGNoZXMpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59O1xuIiwiKGZ1bmN0aW9uKCl7XHJcbiAgdmFyIGNyeXB0ID0gcmVxdWlyZSgnY3J5cHQnKSxcclxuICAgICAgdXRmOCA9IHJlcXVpcmUoJ2NoYXJlbmMnKS51dGY4LFxyXG4gICAgICBpc0J1ZmZlciA9IHJlcXVpcmUoJ2lzLWJ1ZmZlcicpLFxyXG4gICAgICBiaW4gPSByZXF1aXJlKCdjaGFyZW5jJykuYmluLFxyXG5cclxuICAvLyBUaGUgY29yZVxyXG4gIG1kNSA9IGZ1bmN0aW9uIChtZXNzYWdlLCBvcHRpb25zKSB7XHJcbiAgICAvLyBDb252ZXJ0IHRvIGJ5dGUgYXJyYXlcclxuICAgIGlmIChtZXNzYWdlLmNvbnN0cnVjdG9yID09IFN0cmluZylcclxuICAgICAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5lbmNvZGluZyA9PT0gJ2JpbmFyeScpXHJcbiAgICAgICAgbWVzc2FnZSA9IGJpbi5zdHJpbmdUb0J5dGVzKG1lc3NhZ2UpO1xyXG4gICAgICBlbHNlXHJcbiAgICAgICAgbWVzc2FnZSA9IHV0Zjguc3RyaW5nVG9CeXRlcyhtZXNzYWdlKTtcclxuICAgIGVsc2UgaWYgKGlzQnVmZmVyKG1lc3NhZ2UpKVxyXG4gICAgICBtZXNzYWdlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwobWVzc2FnZSwgMCk7XHJcbiAgICBlbHNlIGlmICghQXJyYXkuaXNBcnJheShtZXNzYWdlKSlcclxuICAgICAgbWVzc2FnZSA9IG1lc3NhZ2UudG9TdHJpbmcoKTtcclxuICAgIC8vIGVsc2UsIGFzc3VtZSBieXRlIGFycmF5IGFscmVhZHlcclxuXHJcbiAgICB2YXIgbSA9IGNyeXB0LmJ5dGVzVG9Xb3JkcyhtZXNzYWdlKSxcclxuICAgICAgICBsID0gbWVzc2FnZS5sZW5ndGggKiA4LFxyXG4gICAgICAgIGEgPSAgMTczMjU4NDE5MyxcclxuICAgICAgICBiID0gLTI3MTczMzg3OSxcclxuICAgICAgICBjID0gLTE3MzI1ODQxOTQsXHJcbiAgICAgICAgZCA9ICAyNzE3MzM4Nzg7XHJcblxyXG4gICAgLy8gU3dhcCBlbmRpYW5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbS5sZW5ndGg7IGkrKykge1xyXG4gICAgICBtW2ldID0gKChtW2ldIDw8ICA4KSB8IChtW2ldID4+PiAyNCkpICYgMHgwMEZGMDBGRiB8XHJcbiAgICAgICAgICAgICAoKG1baV0gPDwgMjQpIHwgKG1baV0gPj4+ICA4KSkgJiAweEZGMDBGRjAwO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFBhZGRpbmdcclxuICAgIG1bbCA+Pj4gNV0gfD0gMHg4MCA8PCAobCAlIDMyKTtcclxuICAgIG1bKCgobCArIDY0KSA+Pj4gOSkgPDwgNCkgKyAxNF0gPSBsO1xyXG5cclxuICAgIC8vIE1ldGhvZCBzaG9ydGN1dHNcclxuICAgIHZhciBGRiA9IG1kNS5fZmYsXHJcbiAgICAgICAgR0cgPSBtZDUuX2dnLFxyXG4gICAgICAgIEhIID0gbWQ1Ll9oaCxcclxuICAgICAgICBJSSA9IG1kNS5faWk7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtLmxlbmd0aDsgaSArPSAxNikge1xyXG5cclxuICAgICAgdmFyIGFhID0gYSxcclxuICAgICAgICAgIGJiID0gYixcclxuICAgICAgICAgIGNjID0gYyxcclxuICAgICAgICAgIGRkID0gZDtcclxuXHJcbiAgICAgIGEgPSBGRihhLCBiLCBjLCBkLCBtW2krIDBdLCAgNywgLTY4MDg3NjkzNik7XHJcbiAgICAgIGQgPSBGRihkLCBhLCBiLCBjLCBtW2krIDFdLCAxMiwgLTM4OTU2NDU4Nik7XHJcbiAgICAgIGMgPSBGRihjLCBkLCBhLCBiLCBtW2krIDJdLCAxNywgIDYwNjEwNTgxOSk7XHJcbiAgICAgIGIgPSBGRihiLCBjLCBkLCBhLCBtW2krIDNdLCAyMiwgLTEwNDQ1MjUzMzApO1xyXG4gICAgICBhID0gRkYoYSwgYiwgYywgZCwgbVtpKyA0XSwgIDcsIC0xNzY0MTg4OTcpO1xyXG4gICAgICBkID0gRkYoZCwgYSwgYiwgYywgbVtpKyA1XSwgMTIsICAxMjAwMDgwNDI2KTtcclxuICAgICAgYyA9IEZGKGMsIGQsIGEsIGIsIG1baSsgNl0sIDE3LCAtMTQ3MzIzMTM0MSk7XHJcbiAgICAgIGIgPSBGRihiLCBjLCBkLCBhLCBtW2krIDddLCAyMiwgLTQ1NzA1OTgzKTtcclxuICAgICAgYSA9IEZGKGEsIGIsIGMsIGQsIG1baSsgOF0sICA3LCAgMTc3MDAzNTQxNik7XHJcbiAgICAgIGQgPSBGRihkLCBhLCBiLCBjLCBtW2krIDldLCAxMiwgLTE5NTg0MTQ0MTcpO1xyXG4gICAgICBjID0gRkYoYywgZCwgYSwgYiwgbVtpKzEwXSwgMTcsIC00MjA2Myk7XHJcbiAgICAgIGIgPSBGRihiLCBjLCBkLCBhLCBtW2krMTFdLCAyMiwgLTE5OTA0MDQxNjIpO1xyXG4gICAgICBhID0gRkYoYSwgYiwgYywgZCwgbVtpKzEyXSwgIDcsICAxODA0NjAzNjgyKTtcclxuICAgICAgZCA9IEZGKGQsIGEsIGIsIGMsIG1baSsxM10sIDEyLCAtNDAzNDExMDEpO1xyXG4gICAgICBjID0gRkYoYywgZCwgYSwgYiwgbVtpKzE0XSwgMTcsIC0xNTAyMDAyMjkwKTtcclxuICAgICAgYiA9IEZGKGIsIGMsIGQsIGEsIG1baSsxNV0sIDIyLCAgMTIzNjUzNTMyOSk7XHJcblxyXG4gICAgICBhID0gR0coYSwgYiwgYywgZCwgbVtpKyAxXSwgIDUsIC0xNjU3OTY1MTApO1xyXG4gICAgICBkID0gR0coZCwgYSwgYiwgYywgbVtpKyA2XSwgIDksIC0xMDY5NTAxNjMyKTtcclxuICAgICAgYyA9IEdHKGMsIGQsIGEsIGIsIG1baSsxMV0sIDE0LCAgNjQzNzE3NzEzKTtcclxuICAgICAgYiA9IEdHKGIsIGMsIGQsIGEsIG1baSsgMF0sIDIwLCAtMzczODk3MzAyKTtcclxuICAgICAgYSA9IEdHKGEsIGIsIGMsIGQsIG1baSsgNV0sICA1LCAtNzAxNTU4NjkxKTtcclxuICAgICAgZCA9IEdHKGQsIGEsIGIsIGMsIG1baSsxMF0sICA5LCAgMzgwMTYwODMpO1xyXG4gICAgICBjID0gR0coYywgZCwgYSwgYiwgbVtpKzE1XSwgMTQsIC02NjA0NzgzMzUpO1xyXG4gICAgICBiID0gR0coYiwgYywgZCwgYSwgbVtpKyA0XSwgMjAsIC00MDU1Mzc4NDgpO1xyXG4gICAgICBhID0gR0coYSwgYiwgYywgZCwgbVtpKyA5XSwgIDUsICA1Njg0NDY0MzgpO1xyXG4gICAgICBkID0gR0coZCwgYSwgYiwgYywgbVtpKzE0XSwgIDksIC0xMDE5ODAzNjkwKTtcclxuICAgICAgYyA9IEdHKGMsIGQsIGEsIGIsIG1baSsgM10sIDE0LCAtMTg3MzYzOTYxKTtcclxuICAgICAgYiA9IEdHKGIsIGMsIGQsIGEsIG1baSsgOF0sIDIwLCAgMTE2MzUzMTUwMSk7XHJcbiAgICAgIGEgPSBHRyhhLCBiLCBjLCBkLCBtW2krMTNdLCAgNSwgLTE0NDQ2ODE0NjcpO1xyXG4gICAgICBkID0gR0coZCwgYSwgYiwgYywgbVtpKyAyXSwgIDksIC01MTQwMzc4NCk7XHJcbiAgICAgIGMgPSBHRyhjLCBkLCBhLCBiLCBtW2krIDddLCAxNCwgIDE3MzUzMjg0NzMpO1xyXG4gICAgICBiID0gR0coYiwgYywgZCwgYSwgbVtpKzEyXSwgMjAsIC0xOTI2NjA3NzM0KTtcclxuXHJcbiAgICAgIGEgPSBISChhLCBiLCBjLCBkLCBtW2krIDVdLCAgNCwgLTM3ODU1OCk7XHJcbiAgICAgIGQgPSBISChkLCBhLCBiLCBjLCBtW2krIDhdLCAxMSwgLTIwMjI1NzQ0NjMpO1xyXG4gICAgICBjID0gSEgoYywgZCwgYSwgYiwgbVtpKzExXSwgMTYsICAxODM5MDMwNTYyKTtcclxuICAgICAgYiA9IEhIKGIsIGMsIGQsIGEsIG1baSsxNF0sIDIzLCAtMzUzMDk1NTYpO1xyXG4gICAgICBhID0gSEgoYSwgYiwgYywgZCwgbVtpKyAxXSwgIDQsIC0xNTMwOTkyMDYwKTtcclxuICAgICAgZCA9IEhIKGQsIGEsIGIsIGMsIG1baSsgNF0sIDExLCAgMTI3Mjg5MzM1Myk7XHJcbiAgICAgIGMgPSBISChjLCBkLCBhLCBiLCBtW2krIDddLCAxNiwgLTE1NTQ5NzYzMik7XHJcbiAgICAgIGIgPSBISChiLCBjLCBkLCBhLCBtW2krMTBdLCAyMywgLTEwOTQ3MzA2NDApO1xyXG4gICAgICBhID0gSEgoYSwgYiwgYywgZCwgbVtpKzEzXSwgIDQsICA2ODEyNzkxNzQpO1xyXG4gICAgICBkID0gSEgoZCwgYSwgYiwgYywgbVtpKyAwXSwgMTEsIC0zNTg1MzcyMjIpO1xyXG4gICAgICBjID0gSEgoYywgZCwgYSwgYiwgbVtpKyAzXSwgMTYsIC03MjI1MjE5NzkpO1xyXG4gICAgICBiID0gSEgoYiwgYywgZCwgYSwgbVtpKyA2XSwgMjMsICA3NjAyOTE4OSk7XHJcbiAgICAgIGEgPSBISChhLCBiLCBjLCBkLCBtW2krIDldLCAgNCwgLTY0MDM2NDQ4Nyk7XHJcbiAgICAgIGQgPSBISChkLCBhLCBiLCBjLCBtW2krMTJdLCAxMSwgLTQyMTgxNTgzNSk7XHJcbiAgICAgIGMgPSBISChjLCBkLCBhLCBiLCBtW2krMTVdLCAxNiwgIDUzMDc0MjUyMCk7XHJcbiAgICAgIGIgPSBISChiLCBjLCBkLCBhLCBtW2krIDJdLCAyMywgLTk5NTMzODY1MSk7XHJcblxyXG4gICAgICBhID0gSUkoYSwgYiwgYywgZCwgbVtpKyAwXSwgIDYsIC0xOTg2MzA4NDQpO1xyXG4gICAgICBkID0gSUkoZCwgYSwgYiwgYywgbVtpKyA3XSwgMTAsICAxMTI2ODkxNDE1KTtcclxuICAgICAgYyA9IElJKGMsIGQsIGEsIGIsIG1baSsxNF0sIDE1LCAtMTQxNjM1NDkwNSk7XHJcbiAgICAgIGIgPSBJSShiLCBjLCBkLCBhLCBtW2krIDVdLCAyMSwgLTU3NDM0MDU1KTtcclxuICAgICAgYSA9IElJKGEsIGIsIGMsIGQsIG1baSsxMl0sICA2LCAgMTcwMDQ4NTU3MSk7XHJcbiAgICAgIGQgPSBJSShkLCBhLCBiLCBjLCBtW2krIDNdLCAxMCwgLTE4OTQ5ODY2MDYpO1xyXG4gICAgICBjID0gSUkoYywgZCwgYSwgYiwgbVtpKzEwXSwgMTUsIC0xMDUxNTIzKTtcclxuICAgICAgYiA9IElJKGIsIGMsIGQsIGEsIG1baSsgMV0sIDIxLCAtMjA1NDkyMjc5OSk7XHJcbiAgICAgIGEgPSBJSShhLCBiLCBjLCBkLCBtW2krIDhdLCAgNiwgIDE4NzMzMTMzNTkpO1xyXG4gICAgICBkID0gSUkoZCwgYSwgYiwgYywgbVtpKzE1XSwgMTAsIC0zMDYxMTc0NCk7XHJcbiAgICAgIGMgPSBJSShjLCBkLCBhLCBiLCBtW2krIDZdLCAxNSwgLTE1NjAxOTgzODApO1xyXG4gICAgICBiID0gSUkoYiwgYywgZCwgYSwgbVtpKzEzXSwgMjEsICAxMzA5MTUxNjQ5KTtcclxuICAgICAgYSA9IElJKGEsIGIsIGMsIGQsIG1baSsgNF0sICA2LCAtMTQ1NTIzMDcwKTtcclxuICAgICAgZCA9IElJKGQsIGEsIGIsIGMsIG1baSsxMV0sIDEwLCAtMTEyMDIxMDM3OSk7XHJcbiAgICAgIGMgPSBJSShjLCBkLCBhLCBiLCBtW2krIDJdLCAxNSwgIDcxODc4NzI1OSk7XHJcbiAgICAgIGIgPSBJSShiLCBjLCBkLCBhLCBtW2krIDldLCAyMSwgLTM0MzQ4NTU1MSk7XHJcblxyXG4gICAgICBhID0gKGEgKyBhYSkgPj4+IDA7XHJcbiAgICAgIGIgPSAoYiArIGJiKSA+Pj4gMDtcclxuICAgICAgYyA9IChjICsgY2MpID4+PiAwO1xyXG4gICAgICBkID0gKGQgKyBkZCkgPj4+IDA7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGNyeXB0LmVuZGlhbihbYSwgYiwgYywgZF0pO1xyXG4gIH07XHJcblxyXG4gIC8vIEF1eGlsaWFyeSBmdW5jdGlvbnNcclxuICBtZDUuX2ZmICA9IGZ1bmN0aW9uIChhLCBiLCBjLCBkLCB4LCBzLCB0KSB7XHJcbiAgICB2YXIgbiA9IGEgKyAoYiAmIGMgfCB+YiAmIGQpICsgKHggPj4+IDApICsgdDtcclxuICAgIHJldHVybiAoKG4gPDwgcykgfCAobiA+Pj4gKDMyIC0gcykpKSArIGI7XHJcbiAgfTtcclxuICBtZDUuX2dnICA9IGZ1bmN0aW9uIChhLCBiLCBjLCBkLCB4LCBzLCB0KSB7XHJcbiAgICB2YXIgbiA9IGEgKyAoYiAmIGQgfCBjICYgfmQpICsgKHggPj4+IDApICsgdDtcclxuICAgIHJldHVybiAoKG4gPDwgcykgfCAobiA+Pj4gKDMyIC0gcykpKSArIGI7XHJcbiAgfTtcclxuICBtZDUuX2hoICA9IGZ1bmN0aW9uIChhLCBiLCBjLCBkLCB4LCBzLCB0KSB7XHJcbiAgICB2YXIgbiA9IGEgKyAoYiBeIGMgXiBkKSArICh4ID4+PiAwKSArIHQ7XHJcbiAgICByZXR1cm4gKChuIDw8IHMpIHwgKG4gPj4+ICgzMiAtIHMpKSkgKyBiO1xyXG4gIH07XHJcbiAgbWQ1Ll9paSAgPSBmdW5jdGlvbiAoYSwgYiwgYywgZCwgeCwgcywgdCkge1xyXG4gICAgdmFyIG4gPSBhICsgKGMgXiAoYiB8IH5kKSkgKyAoeCA+Pj4gMCkgKyB0O1xyXG4gICAgcmV0dXJuICgobiA8PCBzKSB8IChuID4+PiAoMzIgLSBzKSkpICsgYjtcclxuICB9O1xyXG5cclxuICAvLyBQYWNrYWdlIHByaXZhdGUgYmxvY2tzaXplXHJcbiAgbWQ1Ll9ibG9ja3NpemUgPSAxNjtcclxuICBtZDUuX2RpZ2VzdHNpemUgPSAxNjtcclxuXHJcbiAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobWVzc2FnZSwgb3B0aW9ucykge1xyXG4gICAgaWYodHlwZW9mIG1lc3NhZ2UgPT0gJ3VuZGVmaW5lZCcpXHJcbiAgICAgIHJldHVybjtcclxuXHJcbiAgICB2YXIgZGlnZXN0Ynl0ZXMgPSBjcnlwdC53b3Jkc1RvQnl0ZXMobWQ1KG1lc3NhZ2UsIG9wdGlvbnMpKTtcclxuICAgIHJldHVybiBvcHRpb25zICYmIG9wdGlvbnMuYXNCeXRlcyA/IGRpZ2VzdGJ5dGVzIDpcclxuICAgICAgICBvcHRpb25zICYmIG9wdGlvbnMuYXNTdHJpbmcgPyBiaW4uYnl0ZXNUb1N0cmluZyhkaWdlc3RieXRlcykgOlxyXG4gICAgICAgIGNyeXB0LmJ5dGVzVG9IZXgoZGlnZXN0Ynl0ZXMpO1xyXG4gIH07XHJcblxyXG59KSgpO1xyXG4iLCJ2YXIgY2hhcmVuYyA9IHtcbiAgLy8gVVRGLTggZW5jb2RpbmdcbiAgdXRmODoge1xuICAgIC8vIENvbnZlcnQgYSBzdHJpbmcgdG8gYSBieXRlIGFycmF5XG4gICAgc3RyaW5nVG9CeXRlczogZnVuY3Rpb24oc3RyKSB7XG4gICAgICByZXR1cm4gY2hhcmVuYy5iaW4uc3RyaW5nVG9CeXRlcyh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoc3RyKSkpO1xuICAgIH0sXG5cbiAgICAvLyBDb252ZXJ0IGEgYnl0ZSBhcnJheSB0byBhIHN0cmluZ1xuICAgIGJ5dGVzVG9TdHJpbmc6IGZ1bmN0aW9uKGJ5dGVzKSB7XG4gICAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KGVzY2FwZShjaGFyZW5jLmJpbi5ieXRlc1RvU3RyaW5nKGJ5dGVzKSkpO1xuICAgIH1cbiAgfSxcblxuICAvLyBCaW5hcnkgZW5jb2RpbmdcbiAgYmluOiB7XG4gICAgLy8gQ29udmVydCBhIHN0cmluZyB0byBhIGJ5dGUgYXJyYXlcbiAgICBzdHJpbmdUb0J5dGVzOiBmdW5jdGlvbihzdHIpIHtcbiAgICAgIGZvciAodmFyIGJ5dGVzID0gW10sIGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKVxuICAgICAgICBieXRlcy5wdXNoKHN0ci5jaGFyQ29kZUF0KGkpICYgMHhGRik7XG4gICAgICByZXR1cm4gYnl0ZXM7XG4gICAgfSxcblxuICAgIC8vIENvbnZlcnQgYSBieXRlIGFycmF5IHRvIGEgc3RyaW5nXG4gICAgYnl0ZXNUb1N0cmluZzogZnVuY3Rpb24oYnl0ZXMpIHtcbiAgICAgIGZvciAodmFyIHN0ciA9IFtdLCBpID0gMDsgaSA8IGJ5dGVzLmxlbmd0aDsgaSsrKVxuICAgICAgICBzdHIucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlKGJ5dGVzW2ldKSk7XG4gICAgICByZXR1cm4gc3RyLmpvaW4oJycpO1xuICAgIH1cbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBjaGFyZW5jO1xuIiwiKGZ1bmN0aW9uKCkge1xuICB2YXIgYmFzZTY0bWFwXG4gICAgICA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvJyxcblxuICBjcnlwdCA9IHtcbiAgICAvLyBCaXQtd2lzZSByb3RhdGlvbiBsZWZ0XG4gICAgcm90bDogZnVuY3Rpb24obiwgYikge1xuICAgICAgcmV0dXJuIChuIDw8IGIpIHwgKG4gPj4+ICgzMiAtIGIpKTtcbiAgICB9LFxuXG4gICAgLy8gQml0LXdpc2Ugcm90YXRpb24gcmlnaHRcbiAgICByb3RyOiBmdW5jdGlvbihuLCBiKSB7XG4gICAgICByZXR1cm4gKG4gPDwgKDMyIC0gYikpIHwgKG4gPj4+IGIpO1xuICAgIH0sXG5cbiAgICAvLyBTd2FwIGJpZy1lbmRpYW4gdG8gbGl0dGxlLWVuZGlhbiBhbmQgdmljZSB2ZXJzYVxuICAgIGVuZGlhbjogZnVuY3Rpb24obikge1xuICAgICAgLy8gSWYgbnVtYmVyIGdpdmVuLCBzd2FwIGVuZGlhblxuICAgICAgaWYgKG4uY29uc3RydWN0b3IgPT0gTnVtYmVyKSB7XG4gICAgICAgIHJldHVybiBjcnlwdC5yb3RsKG4sIDgpICYgMHgwMEZGMDBGRiB8IGNyeXB0LnJvdGwobiwgMjQpICYgMHhGRjAwRkYwMDtcbiAgICAgIH1cblxuICAgICAgLy8gRWxzZSwgYXNzdW1lIGFycmF5IGFuZCBzd2FwIGFsbCBpdGVtc1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuLmxlbmd0aDsgaSsrKVxuICAgICAgICBuW2ldID0gY3J5cHQuZW5kaWFuKG5baV0pO1xuICAgICAgcmV0dXJuIG47XG4gICAgfSxcblxuICAgIC8vIEdlbmVyYXRlIGFuIGFycmF5IG9mIGFueSBsZW5ndGggb2YgcmFuZG9tIGJ5dGVzXG4gICAgcmFuZG9tQnl0ZXM6IGZ1bmN0aW9uKG4pIHtcbiAgICAgIGZvciAodmFyIGJ5dGVzID0gW107IG4gPiAwOyBuLS0pXG4gICAgICAgIGJ5dGVzLnB1c2goTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMjU2KSk7XG4gICAgICByZXR1cm4gYnl0ZXM7XG4gICAgfSxcblxuICAgIC8vIENvbnZlcnQgYSBieXRlIGFycmF5IHRvIGJpZy1lbmRpYW4gMzItYml0IHdvcmRzXG4gICAgYnl0ZXNUb1dvcmRzOiBmdW5jdGlvbihieXRlcykge1xuICAgICAgZm9yICh2YXIgd29yZHMgPSBbXSwgaSA9IDAsIGIgPSAwOyBpIDwgYnl0ZXMubGVuZ3RoOyBpKyssIGIgKz0gOClcbiAgICAgICAgd29yZHNbYiA+Pj4gNV0gfD0gYnl0ZXNbaV0gPDwgKDI0IC0gYiAlIDMyKTtcbiAgICAgIHJldHVybiB3b3JkcztcbiAgICB9LFxuXG4gICAgLy8gQ29udmVydCBiaWctZW5kaWFuIDMyLWJpdCB3b3JkcyB0byBhIGJ5dGUgYXJyYXlcbiAgICB3b3Jkc1RvQnl0ZXM6IGZ1bmN0aW9uKHdvcmRzKSB7XG4gICAgICBmb3IgKHZhciBieXRlcyA9IFtdLCBiID0gMDsgYiA8IHdvcmRzLmxlbmd0aCAqIDMyOyBiICs9IDgpXG4gICAgICAgIGJ5dGVzLnB1c2goKHdvcmRzW2IgPj4+IDVdID4+PiAoMjQgLSBiICUgMzIpKSAmIDB4RkYpO1xuICAgICAgcmV0dXJuIGJ5dGVzO1xuICAgIH0sXG5cbiAgICAvLyBDb252ZXJ0IGEgYnl0ZSBhcnJheSB0byBhIGhleCBzdHJpbmdcbiAgICBieXRlc1RvSGV4OiBmdW5jdGlvbihieXRlcykge1xuICAgICAgZm9yICh2YXIgaGV4ID0gW10sIGkgPSAwOyBpIDwgYnl0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaGV4LnB1c2goKGJ5dGVzW2ldID4+PiA0KS50b1N0cmluZygxNikpO1xuICAgICAgICBoZXgucHVzaCgoYnl0ZXNbaV0gJiAweEYpLnRvU3RyaW5nKDE2KSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gaGV4LmpvaW4oJycpO1xuICAgIH0sXG5cbiAgICAvLyBDb252ZXJ0IGEgaGV4IHN0cmluZyB0byBhIGJ5dGUgYXJyYXlcbiAgICBoZXhUb0J5dGVzOiBmdW5jdGlvbihoZXgpIHtcbiAgICAgIGZvciAodmFyIGJ5dGVzID0gW10sIGMgPSAwOyBjIDwgaGV4Lmxlbmd0aDsgYyArPSAyKVxuICAgICAgICBieXRlcy5wdXNoKHBhcnNlSW50KGhleC5zdWJzdHIoYywgMiksIDE2KSk7XG4gICAgICByZXR1cm4gYnl0ZXM7XG4gICAgfSxcblxuICAgIC8vIENvbnZlcnQgYSBieXRlIGFycmF5IHRvIGEgYmFzZS02NCBzdHJpbmdcbiAgICBieXRlc1RvQmFzZTY0OiBmdW5jdGlvbihieXRlcykge1xuICAgICAgZm9yICh2YXIgYmFzZTY0ID0gW10sIGkgPSAwOyBpIDwgYnl0ZXMubGVuZ3RoOyBpICs9IDMpIHtcbiAgICAgICAgdmFyIHRyaXBsZXQgPSAoYnl0ZXNbaV0gPDwgMTYpIHwgKGJ5dGVzW2kgKyAxXSA8PCA4KSB8IGJ5dGVzW2kgKyAyXTtcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCA0OyBqKyspXG4gICAgICAgICAgaWYgKGkgKiA4ICsgaiAqIDYgPD0gYnl0ZXMubGVuZ3RoICogOClcbiAgICAgICAgICAgIGJhc2U2NC5wdXNoKGJhc2U2NG1hcC5jaGFyQXQoKHRyaXBsZXQgPj4+IDYgKiAoMyAtIGopKSAmIDB4M0YpKTtcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICBiYXNlNjQucHVzaCgnPScpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGJhc2U2NC5qb2luKCcnKTtcbiAgICB9LFxuXG4gICAgLy8gQ29udmVydCBhIGJhc2UtNjQgc3RyaW5nIHRvIGEgYnl0ZSBhcnJheVxuICAgIGJhc2U2NFRvQnl0ZXM6IGZ1bmN0aW9uKGJhc2U2NCkge1xuICAgICAgLy8gUmVtb3ZlIG5vbi1iYXNlLTY0IGNoYXJhY3RlcnNcbiAgICAgIGJhc2U2NCA9IGJhc2U2NC5yZXBsYWNlKC9bXkEtWjAtOStcXC9dL2lnLCAnJyk7XG5cbiAgICAgIGZvciAodmFyIGJ5dGVzID0gW10sIGkgPSAwLCBpbW9kNCA9IDA7IGkgPCBiYXNlNjQubGVuZ3RoO1xuICAgICAgICAgIGltb2Q0ID0gKytpICUgNCkge1xuICAgICAgICBpZiAoaW1vZDQgPT0gMCkgY29udGludWU7XG4gICAgICAgIGJ5dGVzLnB1c2goKChiYXNlNjRtYXAuaW5kZXhPZihiYXNlNjQuY2hhckF0KGkgLSAxKSlcbiAgICAgICAgICAgICYgKE1hdGgucG93KDIsIC0yICogaW1vZDQgKyA4KSAtIDEpKSA8PCAoaW1vZDQgKiAyKSlcbiAgICAgICAgICAgIHwgKGJhc2U2NG1hcC5pbmRleE9mKGJhc2U2NC5jaGFyQXQoaSkpID4+PiAoNiAtIGltb2Q0ICogMikpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBieXRlcztcbiAgICB9XG4gIH07XG5cbiAgbW9kdWxlLmV4cG9ydHMgPSBjcnlwdDtcbn0pKCk7XG4iLCIvKipcbiAqIERldGVybWluZSBpZiBhbiBvYmplY3QgaXMgQnVmZmVyXG4gKlxuICogQXV0aG9yOiAgIEZlcm9zcyBBYm91a2hhZGlqZWggPGZlcm9zc0BmZXJvc3Mub3JnPiA8aHR0cDovL2Zlcm9zcy5vcmc+XG4gKiBMaWNlbnNlOiAgTUlUXG4gKlxuICogYG5wbSBpbnN0YWxsIGlzLWJ1ZmZlcmBcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuICEhKG9iaiAhPSBudWxsICYmXG4gICAgKG9iai5faXNCdWZmZXIgfHwgLy8gRm9yIFNhZmFyaSA1LTcgKG1pc3NpbmcgT2JqZWN0LnByb3RvdHlwZS5jb25zdHJ1Y3RvcilcbiAgICAgIChvYmouY29uc3RydWN0b3IgJiZcbiAgICAgIHR5cGVvZiBvYmouY29uc3RydWN0b3IuaXNCdWZmZXIgPT09ICdmdW5jdGlvbicgJiZcbiAgICAgIG9iai5jb25zdHJ1Y3Rvci5pc0J1ZmZlcihvYmopKVxuICAgICkpXG59XG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbnZhciBfcmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgX3JlYWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0KTtcblxudmFyIF9yZWFjdFNlbGVjdCA9IHJlcXVpcmUoJ3JlYWN0LXNlbGVjdCcpO1xuXG52YXIgX3JlYWN0U2VsZWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0U2VsZWN0KTtcblxudmFyIF9yZWFjdFZpcnR1YWxpemVkID0gcmVxdWlyZSgncmVhY3QtdmlydHVhbGl6ZWQnKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoIXNlbGYpIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG52YXIgVmlydHVhbGl6ZWRTZWxlY3QgPSBmdW5jdGlvbiAoX0NvbXBvbmVudCkge1xuICBfaW5oZXJpdHMoVmlydHVhbGl6ZWRTZWxlY3QsIF9Db21wb25lbnQpO1xuXG4gIGZ1bmN0aW9uIFZpcnR1YWxpemVkU2VsZWN0KHByb3BzLCBjb250ZXh0KSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFZpcnR1YWxpemVkU2VsZWN0KTtcblxuICAgIHZhciBfdGhpcyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIE9iamVjdC5nZXRQcm90b3R5cGVPZihWaXJ0dWFsaXplZFNlbGVjdCkuY2FsbCh0aGlzLCBwcm9wcywgY29udGV4dCkpO1xuXG4gICAgX3RoaXMuX3JlbmRlck1lbnUgPSBfdGhpcy5fcmVuZGVyTWVudS5iaW5kKF90aGlzKTtcbiAgICBfdGhpcy5fcm93UmVuZGVyZXIgPSBfdGhpcy5fcm93UmVuZGVyZXIuYmluZChfdGhpcyk7XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKFZpcnR1YWxpemVkU2VsZWN0LCBbe1xuICAgIGtleTogJ3JlbmRlcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgIHJldHVybiBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChfcmVhY3RTZWxlY3QyLmRlZmF1bHQsIF9leHRlbmRzKHt9LCB0aGlzLnByb3BzLCB7XG4gICAgICAgIG1lbnVSZW5kZXJlcjogdGhpcy5fcmVuZGVyTWVudSxcbiAgICAgICAgbWVudVN0eWxlOiB7IG92ZXJmbG93OiAnaGlkZGVuJyB9XG4gICAgICB9KSk7XG4gICAgfVxuXG4gICAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9KZWRXYXRzb24vcmVhY3Qtc2VsZWN0LyNlZmZlY2llbnRseS1yZW5kZXJpbmctbGFyZ2UtbGlzdHMtd2l0aC13aW5kb3dpbmdcblxuICB9LCB7XG4gICAga2V5OiAnX3JlbmRlck1lbnUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfcmVuZGVyTWVudShfcmVmKSB7XG4gICAgICB2YXIgZm9jdXNlZE9wdGlvbiA9IF9yZWYuZm9jdXNlZE9wdGlvbjtcbiAgICAgIHZhciBmb2N1c09wdGlvbiA9IF9yZWYuZm9jdXNPcHRpb247XG4gICAgICB2YXIgbGFiZWxLZXkgPSBfcmVmLmxhYmVsS2V5O1xuICAgICAgdmFyIG9wdGlvbnMgPSBfcmVmLm9wdGlvbnM7XG4gICAgICB2YXIgc2VsZWN0VmFsdWUgPSBfcmVmLnNlbGVjdFZhbHVlO1xuICAgICAgdmFyIHZhbHVlQXJyYXkgPSBfcmVmLnZhbHVlQXJyYXk7XG4gICAgICB2YXIgX3Byb3BzID0gdGhpcy5wcm9wcztcbiAgICAgIHZhciBtYXhIZWlnaHQgPSBfcHJvcHMubWF4SGVpZ2h0O1xuICAgICAgdmFyIG9wdGlvbkhlaWdodCA9IF9wcm9wcy5vcHRpb25IZWlnaHQ7XG4gICAgICB2YXIgcm93UmVuZGVyZXIgPSBfcHJvcHMucm93UmVuZGVyZXI7XG5cbiAgICAgIHZhciBmb2N1c2VkT3B0aW9uSW5kZXggPSBvcHRpb25zLmluZGV4T2YoZm9jdXNlZE9wdGlvbik7XG4gICAgICB2YXIgaGVpZ2h0ID0gTWF0aC5taW4obWF4SGVpZ2h0LCBvcHRpb25zLmxlbmd0aCAqIG9wdGlvbkhlaWdodCk7XG4gICAgICB2YXIgaW5uZXJSb3dSZW5kZXJlciA9IHJvd1JlbmRlcmVyIHx8IHRoaXMuX3Jvd1JlbmRlcmVyO1xuXG4gICAgICBmdW5jdGlvbiB3cmFwcGVkUm93UmVuZGVyZXIoaW5kZXgpIHtcbiAgICAgICAgdmFyIG9wdGlvbiA9IG9wdGlvbnNbaW5kZXhdO1xuXG4gICAgICAgIHJldHVybiBpbm5lclJvd1JlbmRlcmVyKHsgZm9jdXNlZE9wdGlvbjogZm9jdXNlZE9wdGlvbiwgZm9jdXNlZE9wdGlvbkluZGV4OiBmb2N1c2VkT3B0aW9uSW5kZXgsIGZvY3VzT3B0aW9uOiBmb2N1c09wdGlvbiwgbGFiZWxLZXk6IGxhYmVsS2V5LCBvcHRpb246IG9wdGlvbiwgb3B0aW9uczogb3B0aW9ucywgc2VsZWN0VmFsdWU6IHNlbGVjdFZhbHVlLCB2YWx1ZUFycmF5OiB2YWx1ZUFycmF5IH0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgIF9yZWFjdFZpcnR1YWxpemVkLkF1dG9TaXplcixcbiAgICAgICAgeyBkaXNhYmxlSGVpZ2h0OiB0cnVlIH0sXG4gICAgICAgIGZ1bmN0aW9uIChfcmVmMikge1xuICAgICAgICAgIHZhciB3aWR0aCA9IF9yZWYyLndpZHRoO1xuICAgICAgICAgIHJldHVybiBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChfcmVhY3RWaXJ0dWFsaXplZC5WaXJ0dWFsU2Nyb2xsLCB7XG4gICAgICAgICAgICBjbGFzc05hbWU6ICdWaXJ0dWFsU2VsZWN0R3JpZCcsXG4gICAgICAgICAgICBoZWlnaHQ6IGhlaWdodCxcbiAgICAgICAgICAgIHJvd0hlaWdodDogb3B0aW9uSGVpZ2h0LFxuICAgICAgICAgICAgcm93UmVuZGVyZXI6IHdyYXBwZWRSb3dSZW5kZXJlcixcbiAgICAgICAgICAgIHJvd3NDb3VudDogb3B0aW9ucy5sZW5ndGgsXG4gICAgICAgICAgICBzY3JvbGxUb0luZGV4OiBmb2N1c2VkT3B0aW9uSW5kZXgsXG4gICAgICAgICAgICB3aWR0aDogd2lkdGhcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfcm93UmVuZGVyZXInLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfcm93UmVuZGVyZXIoX3JlZjMpIHtcbiAgICAgIHZhciBmb2N1c2VkT3B0aW9uID0gX3JlZjMuZm9jdXNlZE9wdGlvbjtcbiAgICAgIHZhciBmb2N1c09wdGlvbiA9IF9yZWYzLmZvY3VzT3B0aW9uO1xuICAgICAgdmFyIGxhYmVsS2V5ID0gX3JlZjMubGFiZWxLZXk7XG4gICAgICB2YXIgb3B0aW9uID0gX3JlZjMub3B0aW9uO1xuICAgICAgdmFyIHNlbGVjdFZhbHVlID0gX3JlZjMuc2VsZWN0VmFsdWU7XG4gICAgICB2YXIgb3B0aW9uSGVpZ2h0ID0gdGhpcy5wcm9wcy5vcHRpb25IZWlnaHQ7XG5cblxuICAgICAgdmFyIGNsYXNzTmFtZSA9IG9wdGlvbiA9PT0gZm9jdXNlZE9wdGlvbiA/ICdWaXJ0dWFsaXplZFNlbGVjdE9wdGlvbiBWaXJ0dWFsaXplZFNlbGVjdEZvY3VzZWRPcHRpb24nIDogJ1ZpcnR1YWxpemVkU2VsZWN0T3B0aW9uJztcblxuICAgICAgcmV0dXJuIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAnZGl2JyxcbiAgICAgICAge1xuICAgICAgICAgIGNsYXNzTmFtZTogY2xhc3NOYW1lLFxuICAgICAgICAgIG9uTW91c2VPdmVyOiBmdW5jdGlvbiBvbk1vdXNlT3ZlcigpIHtcbiAgICAgICAgICAgIHJldHVybiBmb2N1c09wdGlvbihvcHRpb24pO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgb25DbGljazogZnVuY3Rpb24gb25DbGljaygpIHtcbiAgICAgICAgICAgIHJldHVybiBzZWxlY3RWYWx1ZShvcHRpb24pO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgIGhlaWdodDogb3B0aW9uSGVpZ2h0XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBvcHRpb25bbGFiZWxLZXldXG4gICAgICApO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBWaXJ0dWFsaXplZFNlbGVjdDtcbn0oX3JlYWN0LkNvbXBvbmVudCk7XG5cblZpcnR1YWxpemVkU2VsZWN0LnByb3BUeXBlcyA9IHtcbiAgbWF4SGVpZ2h0OiBfcmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICBvcHRpb25IZWlnaHQ6IF9yZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gIHJvd1JlbmRlcmVyOiBfcmVhY3QuUHJvcFR5cGVzLmZ1bmNcbn07XG5WaXJ0dWFsaXplZFNlbGVjdC5kZWZhdWx0UHJvcHMgPSB7XG4gIG1heEhlaWdodDogMjAwLFxuICBvcHRpb25IZWlnaHQ6IDM1XG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gVmlydHVhbGl6ZWRTZWxlY3Q7IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gdW5kZWZpbmVkO1xuXG52YXIgX1ZpcnR1YWxpemVkU2VsZWN0ID0gcmVxdWlyZSgnLi9WaXJ0dWFsaXplZFNlbGVjdCcpO1xuXG52YXIgX1ZpcnR1YWxpemVkU2VsZWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1ZpcnR1YWxpemVkU2VsZWN0KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gX1ZpcnR1YWxpemVkU2VsZWN0Mi5kZWZhdWx0OyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxudmFyIF9yZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBfcmVhY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3QpO1xuXG52YXIgX3JlYWN0QWRkb25zU2hhbGxvd0NvbXBhcmUgPSByZXF1aXJlKCdyZWFjdC1hZGRvbnMtc2hhbGxvdy1jb21wYXJlJyk7XG5cbnZhciBfcmVhY3RBZGRvbnNTaGFsbG93Q29tcGFyZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdEFkZG9uc1NoYWxsb3dDb21wYXJlKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoIXNlbGYpIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG4vKipcbiAqIFRoaXMgSE9DIGRlY29yYXRlcyBhIHZpcnR1YWxpemVkIGNvbXBvbmVudCBhbmQgcmVzcG9uZHMgdG8gYXJyb3cta2V5IGV2ZW50cyBieSBzY3JvbGxpbmcgb25lIHJvdyBvciBjb2x1bW4gYXQgYSB0aW1lLlxuICovXG5cbnZhciBBcnJvd0tleVN0ZXBwZXIgPSBmdW5jdGlvbiAoX0NvbXBvbmVudCkge1xuICBfaW5oZXJpdHMoQXJyb3dLZXlTdGVwcGVyLCBfQ29tcG9uZW50KTtcblxuICBmdW5jdGlvbiBBcnJvd0tleVN0ZXBwZXIocHJvcHMsIGNvbnRleHQpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQXJyb3dLZXlTdGVwcGVyKTtcblxuICAgIHZhciBfdGhpcyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIE9iamVjdC5nZXRQcm90b3R5cGVPZihBcnJvd0tleVN0ZXBwZXIpLmNhbGwodGhpcywgcHJvcHMsIGNvbnRleHQpKTtcblxuICAgIF90aGlzLnN0YXRlID0ge1xuICAgICAgc2Nyb2xsVG9Db2x1bW46IDAsXG4gICAgICBzY3JvbGxUb1JvdzogMFxuICAgIH07XG5cbiAgICBfdGhpcy5fY29sdW1uU3RhcnRJbmRleCA9IDA7XG4gICAgX3RoaXMuX2NvbHVtblN0b3BJbmRleCA9IDA7XG4gICAgX3RoaXMuX3Jvd1N0YXJ0SW5kZXggPSAwO1xuICAgIF90aGlzLl9yb3dTdG9wSW5kZXggPSAwO1xuXG4gICAgX3RoaXMuX29uS2V5RG93biA9IF90aGlzLl9vbktleURvd24uYmluZChfdGhpcyk7XG4gICAgX3RoaXMuX29uU2VjdGlvblJlbmRlcmVkID0gX3RoaXMuX29uU2VjdGlvblJlbmRlcmVkLmJpbmQoX3RoaXMpO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhBcnJvd0tleVN0ZXBwZXIsIFt7XG4gICAga2V5OiAncmVuZGVyJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgdmFyIF9wcm9wcyA9IHRoaXMucHJvcHM7XG4gICAgICB2YXIgY2xhc3NOYW1lID0gX3Byb3BzLmNsYXNzTmFtZTtcbiAgICAgIHZhciBjaGlsZHJlbiA9IF9wcm9wcy5jaGlsZHJlbjtcbiAgICAgIHZhciBfc3RhdGUgPSB0aGlzLnN0YXRlO1xuICAgICAgdmFyIHNjcm9sbFRvQ29sdW1uID0gX3N0YXRlLnNjcm9sbFRvQ29sdW1uO1xuICAgICAgdmFyIHNjcm9sbFRvUm93ID0gX3N0YXRlLnNjcm9sbFRvUm93O1xuXG5cbiAgICAgIHJldHVybiBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgJ2RpdicsXG4gICAgICAgIHtcbiAgICAgICAgICBjbGFzc05hbWU6IGNsYXNzTmFtZSxcbiAgICAgICAgICBvbktleURvd246IHRoaXMuX29uS2V5RG93blxuICAgICAgICB9LFxuICAgICAgICBjaGlsZHJlbih7XG4gICAgICAgICAgb25TZWN0aW9uUmVuZGVyZWQ6IHRoaXMuX29uU2VjdGlvblJlbmRlcmVkLFxuICAgICAgICAgIHNjcm9sbFRvQ29sdW1uOiBzY3JvbGxUb0NvbHVtbixcbiAgICAgICAgICBzY3JvbGxUb1Jvdzogc2Nyb2xsVG9Sb3dcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnc2hvdWxkQ29tcG9uZW50VXBkYXRlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlKSB7XG4gICAgICByZXR1cm4gKDAsIF9yZWFjdEFkZG9uc1NoYWxsb3dDb21wYXJlMi5kZWZhdWx0KSh0aGlzLCBuZXh0UHJvcHMsIG5leHRTdGF0ZSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX29uS2V5RG93bicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9vbktleURvd24oZXZlbnQpIHtcbiAgICAgIHZhciBfcHJvcHMyID0gdGhpcy5wcm9wcztcbiAgICAgIHZhciBjb2x1bW5zQ291bnQgPSBfcHJvcHMyLmNvbHVtbnNDb3VudDtcbiAgICAgIHZhciByb3dzQ291bnQgPSBfcHJvcHMyLnJvd3NDb3VudDtcblxuICAgICAgLy8gVGhlIGFib3ZlIGNhc2VzIGFsbCBwcmV2ZW50IGRlZmF1bHQgZXZlbnQgZXZlbnQgYmVoYXZpb3IuXG4gICAgICAvLyBUaGlzIGlzIHRvIGtlZXAgdGhlIGdyaWQgZnJvbSBzY3JvbGxpbmcgYWZ0ZXIgdGhlIHNuYXAtdG8gdXBkYXRlLlxuXG4gICAgICBzd2l0Y2ggKGV2ZW50LmtleSkge1xuICAgICAgICBjYXNlICdBcnJvd0Rvd24nOlxuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBzY3JvbGxUb1JvdzogTWF0aC5taW4odGhpcy5fcm93U3RvcEluZGV4ICsgMSwgcm93c0NvdW50IC0gMSlcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnQXJyb3dMZWZ0JzpcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgc2Nyb2xsVG9Db2x1bW46IE1hdGgubWF4KHRoaXMuX2NvbHVtblN0YXJ0SW5kZXggLSAxLCAwKVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdBcnJvd1JpZ2h0JzpcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgc2Nyb2xsVG9Db2x1bW46IE1hdGgubWluKHRoaXMuX2NvbHVtblN0b3BJbmRleCArIDEsIGNvbHVtbnNDb3VudCAtIDEpXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ0Fycm93VXAnOlxuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBzY3JvbGxUb1JvdzogTWF0aC5tYXgodGhpcy5fcm93U3RhcnRJbmRleCAtIDEsIDApXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX29uU2VjdGlvblJlbmRlcmVkJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX29uU2VjdGlvblJlbmRlcmVkKF9yZWYpIHtcbiAgICAgIHZhciBjb2x1bW5TdGFydEluZGV4ID0gX3JlZi5jb2x1bW5TdGFydEluZGV4O1xuICAgICAgdmFyIGNvbHVtblN0b3BJbmRleCA9IF9yZWYuY29sdW1uU3RvcEluZGV4O1xuICAgICAgdmFyIHJvd1N0YXJ0SW5kZXggPSBfcmVmLnJvd1N0YXJ0SW5kZXg7XG4gICAgICB2YXIgcm93U3RvcEluZGV4ID0gX3JlZi5yb3dTdG9wSW5kZXg7XG5cbiAgICAgIHRoaXMuX2NvbHVtblN0YXJ0SW5kZXggPSBjb2x1bW5TdGFydEluZGV4O1xuICAgICAgdGhpcy5fY29sdW1uU3RvcEluZGV4ID0gY29sdW1uU3RvcEluZGV4O1xuICAgICAgdGhpcy5fcm93U3RhcnRJbmRleCA9IHJvd1N0YXJ0SW5kZXg7XG4gICAgICB0aGlzLl9yb3dTdG9wSW5kZXggPSByb3dTdG9wSW5kZXg7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIEFycm93S2V5U3RlcHBlcjtcbn0oX3JlYWN0LkNvbXBvbmVudCk7XG5cbkFycm93S2V5U3RlcHBlci5wcm9wVHlwZXMgPSB7XG4gIGNoaWxkcmVuOiBfcmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgY2xhc3NOYW1lOiBfcmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgY29sdW1uc0NvdW50OiBfcmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICByb3dzQ291bnQ6IF9yZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWRcbn07XG5leHBvcnRzLmRlZmF1bHQgPSBBcnJvd0tleVN0ZXBwZXI7IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5BcnJvd0tleVN0ZXBwZXIgPSBleHBvcnRzLmRlZmF1bHQgPSB1bmRlZmluZWQ7XG5cbnZhciBfQXJyb3dLZXlTdGVwcGVyMiA9IHJlcXVpcmUoJy4vQXJyb3dLZXlTdGVwcGVyJyk7XG5cbnZhciBfQXJyb3dLZXlTdGVwcGVyMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0Fycm93S2V5U3RlcHBlcjIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBfQXJyb3dLZXlTdGVwcGVyMy5kZWZhdWx0O1xuZXhwb3J0cy5BcnJvd0tleVN0ZXBwZXIgPSBfQXJyb3dLZXlTdGVwcGVyMy5kZWZhdWx0OyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxudmFyIF9yZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBfcmVhY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3QpO1xuXG52YXIgX3JlYWN0QWRkb25zU2hhbGxvd0NvbXBhcmUgPSByZXF1aXJlKCdyZWFjdC1hZGRvbnMtc2hhbGxvdy1jb21wYXJlJyk7XG5cbnZhciBfcmVhY3RBZGRvbnNTaGFsbG93Q29tcGFyZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdEFkZG9uc1NoYWxsb3dDb21wYXJlKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoIXNlbGYpIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG4vKipcbiAqIERlY29yYXRvciBjb21wb25lbnQgdGhhdCBhdXRvbWF0aWNhbGx5IGFkanVzdHMgdGhlIHdpZHRoIGFuZCBoZWlnaHQgb2YgYSBzaW5nbGUgY2hpbGQuXG4gKiBDaGlsZCBjb21wb25lbnQgc2hvdWxkIG5vdCBiZSBkZWNsYXJlZCBhcyBhIGNoaWxkIGJ1dCBzaG91bGQgcmF0aGVyIGJlIHNwZWNpZmllZCBieSBhIGBDaGlsZENvbXBvbmVudGAgcHJvcGVydHkuXG4gKiBBbGwgb3RoZXIgcHJvcGVydGllcyB3aWxsIGJlIHBhc3NlZCB0aHJvdWdoIHRvIHRoZSBjaGlsZCBjb21wb25lbnQuXG4gKi9cblxudmFyIEF1dG9TaXplciA9IGZ1bmN0aW9uIChfQ29tcG9uZW50KSB7XG4gIF9pbmhlcml0cyhBdXRvU2l6ZXIsIF9Db21wb25lbnQpO1xuXG4gIGZ1bmN0aW9uIEF1dG9TaXplcihwcm9wcykge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBBdXRvU2l6ZXIpO1xuXG4gICAgdmFyIF90aGlzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgT2JqZWN0LmdldFByb3RvdHlwZU9mKEF1dG9TaXplcikuY2FsbCh0aGlzLCBwcm9wcykpO1xuXG4gICAgX3RoaXMuc3RhdGUgPSB7XG4gICAgICBoZWlnaHQ6IDAsXG4gICAgICB3aWR0aDogMFxuICAgIH07XG5cbiAgICBfdGhpcy5fb25SZXNpemUgPSBfdGhpcy5fb25SZXNpemUuYmluZChfdGhpcyk7XG4gICAgX3RoaXMuX29uU2Nyb2xsID0gX3RoaXMuX29uU2Nyb2xsLmJpbmQoX3RoaXMpO1xuICAgIF90aGlzLl9zZXRSZWYgPSBfdGhpcy5fc2V0UmVmLmJpbmQoX3RoaXMpO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhBdXRvU2l6ZXIsIFt7XG4gICAga2V5OiAnY29tcG9uZW50RGlkTW91bnQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgIC8vIERlZmVyIHJlcXVpcmluZyByZXNpemUgaGFuZGxlciBpbiBvcmRlciB0byBzdXBwb3J0IHNlcnZlci1zaWRlIHJlbmRlcmluZy5cbiAgICAgIC8vIFNlZSBpc3N1ZSAjNDFcbiAgICAgIHRoaXMuX2RldGVjdEVsZW1lbnRSZXNpemUgPSByZXF1aXJlKCcuLi92ZW5kb3IvZGV0ZWN0RWxlbWVudFJlc2l6ZScpO1xuICAgICAgdGhpcy5fZGV0ZWN0RWxlbWVudFJlc2l6ZS5hZGRSZXNpemVMaXN0ZW5lcih0aGlzLl9wYXJlbnROb2RlLCB0aGlzLl9vblJlc2l6ZSk7XG5cbiAgICAgIHRoaXMuX29uUmVzaXplKCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnY29tcG9uZW50V2lsbFVubW91bnQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgIHRoaXMuX2RldGVjdEVsZW1lbnRSZXNpemUucmVtb3ZlUmVzaXplTGlzdGVuZXIodGhpcy5fcGFyZW50Tm9kZSwgdGhpcy5fb25SZXNpemUpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3JlbmRlcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgIHZhciBfcHJvcHMgPSB0aGlzLnByb3BzO1xuICAgICAgdmFyIGNoaWxkcmVuID0gX3Byb3BzLmNoaWxkcmVuO1xuICAgICAgdmFyIGRpc2FibGVIZWlnaHQgPSBfcHJvcHMuZGlzYWJsZUhlaWdodDtcbiAgICAgIHZhciBkaXNhYmxlV2lkdGggPSBfcHJvcHMuZGlzYWJsZVdpZHRoO1xuICAgICAgdmFyIF9zdGF0ZSA9IHRoaXMuc3RhdGU7XG4gICAgICB2YXIgaGVpZ2h0ID0gX3N0YXRlLmhlaWdodDtcbiAgICAgIHZhciB3aWR0aCA9IF9zdGF0ZS53aWR0aDtcblxuICAgICAgLy8gT3V0ZXIgZGl2IHNob3VsZCBub3QgZm9yY2Ugd2lkdGgvaGVpZ2h0IHNpbmNlIHRoYXQgbWF5IHByZXZlbnQgY29udGFpbmVycyBmcm9tIHNocmlua2luZy5cbiAgICAgIC8vIElubmVyIGNvbXBvbmVudCBzaG91bGQgb3ZlcmZsb3cgYW5kIHVzZSBjYWxjdWxhdGVkIHdpZHRoL2hlaWdodC5cbiAgICAgIC8vIFNlZSBpc3N1ZSAjNjggZm9yIG1vcmUgaW5mb3JtYXRpb24uXG5cbiAgICAgIHZhciBvdXRlclN0eWxlID0geyBvdmVyZmxvdzogJ3Zpc2libGUnIH07XG5cbiAgICAgIGlmICghZGlzYWJsZUhlaWdodCkge1xuICAgICAgICBvdXRlclN0eWxlLmhlaWdodCA9IDA7XG4gICAgICB9XG5cbiAgICAgIGlmICghZGlzYWJsZVdpZHRoKSB7XG4gICAgICAgIG91dGVyU3R5bGUud2lkdGggPSAwO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICdkaXYnLFxuICAgICAgICB7XG4gICAgICAgICAgcmVmOiB0aGlzLl9zZXRSZWYsXG4gICAgICAgICAgb25TY3JvbGw6IHRoaXMuX29uU2Nyb2xsLFxuICAgICAgICAgIHN0eWxlOiBvdXRlclN0eWxlXG4gICAgICAgIH0sXG4gICAgICAgIGNoaWxkcmVuKHsgaGVpZ2h0OiBoZWlnaHQsIHdpZHRoOiB3aWR0aCB9KVxuICAgICAgKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdzaG91bGRDb21wb25lbnRVcGRhdGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUpIHtcbiAgICAgIHJldHVybiAoMCwgX3JlYWN0QWRkb25zU2hhbGxvd0NvbXBhcmUyLmRlZmF1bHQpKHRoaXMsIG5leHRQcm9wcywgbmV4dFN0YXRlKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfb25SZXNpemUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfb25SZXNpemUoKSB7XG4gICAgICB2YXIgb25SZXNpemUgPSB0aGlzLnByb3BzLm9uUmVzaXplO1xuXG4gICAgICB2YXIgX3BhcmVudE5vZGUkZ2V0Qm91bmRpID0gdGhpcy5fcGFyZW50Tm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgICAgdmFyIGhlaWdodCA9IF9wYXJlbnROb2RlJGdldEJvdW5kaS5oZWlnaHQ7XG4gICAgICB2YXIgd2lkdGggPSBfcGFyZW50Tm9kZSRnZXRCb3VuZGkud2lkdGg7XG5cblxuICAgICAgdmFyIHN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLl9wYXJlbnROb2RlKTtcbiAgICAgIHZhciBwYWRkaW5nTGVmdCA9IHBhcnNlSW50KHN0eWxlLnBhZGRpbmdMZWZ0LCAxMCk7XG4gICAgICB2YXIgcGFkZGluZ1JpZ2h0ID0gcGFyc2VJbnQoc3R5bGUucGFkZGluZ1JpZ2h0LCAxMCk7XG4gICAgICB2YXIgcGFkZGluZ1RvcCA9IHBhcnNlSW50KHN0eWxlLnBhZGRpbmdUb3AsIDEwKTtcbiAgICAgIHZhciBwYWRkaW5nQm90dG9tID0gcGFyc2VJbnQoc3R5bGUucGFkZGluZ0JvdHRvbSwgMTApO1xuXG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgaGVpZ2h0OiBoZWlnaHQgLSBwYWRkaW5nVG9wIC0gcGFkZGluZ0JvdHRvbSxcbiAgICAgICAgd2lkdGg6IHdpZHRoIC0gcGFkZGluZ0xlZnQgLSBwYWRkaW5nUmlnaHRcbiAgICAgIH0pO1xuXG4gICAgICBvblJlc2l6ZSh7IGhlaWdodDogaGVpZ2h0LCB3aWR0aDogd2lkdGggfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX29uU2Nyb2xsJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX29uU2Nyb2xsKGV2ZW50KSB7XG4gICAgICAvLyBQcmV2ZW50IGRldGVjdEVsZW1lbnRSZXNpemUgbGlicmFyeSBmcm9tIGJlaW5nIHRyaWdnZXJlZCBieSB0aGlzIHNjcm9sbCBldmVudC5cbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19zZXRSZWYnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfc2V0UmVmKGF1dG9TaXplcikge1xuICAgICAgLy8gSW4gY2FzZSB0aGUgY29tcG9uZW50IGhhcyBiZWVuIHVubW91bnRlZFxuICAgICAgdGhpcy5fcGFyZW50Tm9kZSA9IGF1dG9TaXplciAmJiBhdXRvU2l6ZXIucGFyZW50Tm9kZTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gQXV0b1NpemVyO1xufShfcmVhY3QuQ29tcG9uZW50KTtcblxuQXV0b1NpemVyLnByb3BUeXBlcyA9IHtcbiAgLyoqXG4gICAqIEZ1bmN0aW9uIHJlc3BvbmRpYmxlIGZvciByZW5kZXJpbmcgY2hpbGRyZW4uXG4gICAqIFRoaXMgZnVuY3Rpb24gc2hvdWxkIGltcGxlbWVudCB0aGUgZm9sbG93aW5nIHNpZ25hdHVyZTpcbiAgICogKHsgaGVpZ2h0LCB3aWR0aCB9KSA9PiBQcm9wVHlwZXMuZWxlbWVudFxuICAgKi9cbiAgY2hpbGRyZW46IF9yZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuXG4gIC8qKiBEaXNhYmxlIGR5bmFtaWMgOmhlaWdodCBwcm9wZXJ0eSAqL1xuICBkaXNhYmxlSGVpZ2h0OiBfcmVhY3QuUHJvcFR5cGVzLmJvb2wsXG5cbiAgLyoqIERpc2FibGUgZHluYW1pYyA6d2lkdGggcHJvcGVydHkgKi9cbiAgZGlzYWJsZVdpZHRoOiBfcmVhY3QuUHJvcFR5cGVzLmJvb2wsXG5cbiAgLyoqIENhbGxiYWNrIHRvIGJlIGludm9rZWQgb24tcmVzaXplOiAoeyBoZWlnaHQsIHdpZHRoIH0pICovXG4gIG9uUmVzaXplOiBfcmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZFxufTtcbkF1dG9TaXplci5kZWZhdWx0UHJvcHMgPSB7XG4gIG9uUmVzaXplOiBmdW5jdGlvbiBvblJlc2l6ZSgpIHt9XG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gQXV0b1NpemVyOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuQXV0b1NpemVyID0gZXhwb3J0cy5kZWZhdWx0ID0gdW5kZWZpbmVkO1xuXG52YXIgX0F1dG9TaXplcjIgPSByZXF1aXJlKCcuL0F1dG9TaXplcicpO1xuXG52YXIgX0F1dG9TaXplcjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9BdXRvU2l6ZXIyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gX0F1dG9TaXplcjMuZGVmYXVsdDtcbmV4cG9ydHMuQXV0b1NpemVyID0gX0F1dG9TaXplcjMuZGVmYXVsdDsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbnZhciBfcmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgX3JlYWN0QWRkb25zU2hhbGxvd0NvbXBhcmUgPSByZXF1aXJlKCdyZWFjdC1hZGRvbnMtc2hhbGxvdy1jb21wYXJlJyk7XG5cbnZhciBfcmVhY3RBZGRvbnNTaGFsbG93Q29tcGFyZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdEFkZG9uc1NoYWxsb3dDb21wYXJlKTtcblxudmFyIF9HcmlkID0gcmVxdWlyZSgnLi4vR3JpZCcpO1xuXG52YXIgX0dyaWQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfR3JpZCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKCFzZWxmKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxuLyoqXG4gKiBIaWdoLW9yZGVyIGNvbXBvbmVudCB0aGF0IGF1dG8tY2FsY3VsYXRlcyBjb2x1bW4td2lkdGhzIGZvciBgR3JpZGAgY2VsbHMuXG4gKi9cblxudmFyIENvbHVtblNpemVyID0gZnVuY3Rpb24gKF9Db21wb25lbnQpIHtcbiAgX2luaGVyaXRzKENvbHVtblNpemVyLCBfQ29tcG9uZW50KTtcblxuICBmdW5jdGlvbiBDb2x1bW5TaXplcihwcm9wcywgY29udGV4dCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBDb2x1bW5TaXplcik7XG5cbiAgICB2YXIgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoQ29sdW1uU2l6ZXIpLmNhbGwodGhpcywgcHJvcHMsIGNvbnRleHQpKTtcblxuICAgIF90aGlzLl9yZWdpc3RlckNoaWxkID0gX3RoaXMuX3JlZ2lzdGVyQ2hpbGQuYmluZChfdGhpcyk7XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKENvbHVtblNpemVyLCBbe1xuICAgIGtleTogJ2NvbXBvbmVudERpZFVwZGF0ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMsIHByZXZTdGF0ZSkge1xuICAgICAgdmFyIF9wcm9wcyA9IHRoaXMucHJvcHM7XG4gICAgICB2YXIgY29sdW1uTWF4V2lkdGggPSBfcHJvcHMuY29sdW1uTWF4V2lkdGg7XG4gICAgICB2YXIgY29sdW1uTWluV2lkdGggPSBfcHJvcHMuY29sdW1uTWluV2lkdGg7XG4gICAgICB2YXIgY29sdW1uc0NvdW50ID0gX3Byb3BzLmNvbHVtbnNDb3VudDtcbiAgICAgIHZhciB3aWR0aCA9IF9wcm9wcy53aWR0aDtcblxuXG4gICAgICBpZiAoY29sdW1uTWF4V2lkdGggIT09IHByZXZQcm9wcy5jb2x1bW5NYXhXaWR0aCB8fCBjb2x1bW5NaW5XaWR0aCAhPT0gcHJldlByb3BzLmNvbHVtbk1pbldpZHRoIHx8IGNvbHVtbnNDb3VudCAhPT0gcHJldlByb3BzLmNvbHVtbnNDb3VudCB8fCB3aWR0aCAhPT0gcHJldlByb3BzLndpZHRoKSB7XG4gICAgICAgIGlmICh0aGlzLl9yZWdpc3RlcmVkQ2hpbGQpIHtcbiAgICAgICAgICB0aGlzLl9yZWdpc3RlcmVkQ2hpbGQucmVjb21wdXRlR3JpZFNpemUoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3JlbmRlcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgIHZhciBfcHJvcHMyID0gdGhpcy5wcm9wcztcbiAgICAgIHZhciBjaGlsZHJlbiA9IF9wcm9wczIuY2hpbGRyZW47XG4gICAgICB2YXIgY29sdW1uTWF4V2lkdGggPSBfcHJvcHMyLmNvbHVtbk1heFdpZHRoO1xuICAgICAgdmFyIGNvbHVtbk1pbldpZHRoID0gX3Byb3BzMi5jb2x1bW5NaW5XaWR0aDtcbiAgICAgIHZhciBjb2x1bW5zQ291bnQgPSBfcHJvcHMyLmNvbHVtbnNDb3VudDtcbiAgICAgIHZhciB3aWR0aCA9IF9wcm9wczIud2lkdGg7XG5cblxuICAgICAgdmFyIHNhZmVDb2x1bW5NaW5XaWR0aCA9IGNvbHVtbk1pbldpZHRoIHx8IDE7XG5cbiAgICAgIHZhciBzYWZlQ29sdW1uTWF4V2lkdGggPSBjb2x1bW5NYXhXaWR0aCA/IE1hdGgubWluKGNvbHVtbk1heFdpZHRoLCB3aWR0aCkgOiB3aWR0aDtcblxuICAgICAgdmFyIGNvbHVtbldpZHRoID0gd2lkdGggLyBjb2x1bW5zQ291bnQ7XG4gICAgICBjb2x1bW5XaWR0aCA9IE1hdGgubWF4KHNhZmVDb2x1bW5NaW5XaWR0aCwgY29sdW1uV2lkdGgpO1xuICAgICAgY29sdW1uV2lkdGggPSBNYXRoLm1pbihzYWZlQ29sdW1uTWF4V2lkdGgsIGNvbHVtbldpZHRoKTtcbiAgICAgIGNvbHVtbldpZHRoID0gTWF0aC5mbG9vcihjb2x1bW5XaWR0aCk7XG5cbiAgICAgIHZhciBhZGp1c3RlZFdpZHRoID0gTWF0aC5taW4od2lkdGgsIGNvbHVtbldpZHRoICogY29sdW1uc0NvdW50KTtcblxuICAgICAgcmV0dXJuIGNoaWxkcmVuKHtcbiAgICAgICAgYWRqdXN0ZWRXaWR0aDogYWRqdXN0ZWRXaWR0aCxcbiAgICAgICAgZ2V0Q29sdW1uV2lkdGg6IGZ1bmN0aW9uIGdldENvbHVtbldpZHRoKCkge1xuICAgICAgICAgIHJldHVybiBjb2x1bW5XaWR0aDtcbiAgICAgICAgfSxcbiAgICAgICAgcmVnaXN0ZXJDaGlsZDogdGhpcy5fcmVnaXN0ZXJDaGlsZFxuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnc2hvdWxkQ29tcG9uZW50VXBkYXRlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlKSB7XG4gICAgICByZXR1cm4gKDAsIF9yZWFjdEFkZG9uc1NoYWxsb3dDb21wYXJlMi5kZWZhdWx0KSh0aGlzLCBuZXh0UHJvcHMsIG5leHRTdGF0ZSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX3JlZ2lzdGVyQ2hpbGQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfcmVnaXN0ZXJDaGlsZChjaGlsZCkge1xuICAgICAgaWYgKGNoaWxkICE9PSBudWxsICYmICEoY2hpbGQgaW5zdGFuY2VvZiBfR3JpZDIuZGVmYXVsdCkpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ1VuZXhwZWN0ZWQgY2hpbGQgdHlwZSByZWdpc3RlcmVkOyBvbmx5IEdyaWQgY2hpbGRyZW4gYXJlIHN1cHBvcnRlZC4nKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fcmVnaXN0ZXJlZENoaWxkID0gY2hpbGQ7XG5cbiAgICAgIGlmICh0aGlzLl9yZWdpc3RlcmVkQ2hpbGQpIHtcbiAgICAgICAgdGhpcy5fcmVnaXN0ZXJlZENoaWxkLnJlY29tcHV0ZUdyaWRTaXplKCk7XG4gICAgICB9XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIENvbHVtblNpemVyO1xufShfcmVhY3QuQ29tcG9uZW50KTtcblxuQ29sdW1uU2l6ZXIucHJvcFR5cGVzID0ge1xuICAvKipcbiAgICogRnVuY3Rpb24gcmVzcG9uZGlibGUgZm9yIHJlbmRlcmluZyBhIHZpcnR1YWxpemVkIEdyaWQuXG4gICAqIFRoaXMgZnVuY3Rpb24gc2hvdWxkIGltcGxlbWVudCB0aGUgZm9sbG93aW5nIHNpZ25hdHVyZTpcbiAgICogKHsgYWRqdXN0ZWRXaWR0aCwgZ2V0Q29sdW1uV2lkdGgsIHJlZ2lzdGVyQ2hpbGQgfSkgPT4gUHJvcFR5cGVzLmVsZW1lbnRcbiAgICpcbiAgICogVGhlIHNwZWNpZmllZCA6Z2V0Q29sdW1uV2lkdGggZnVuY3Rpb24gc2hvdWxkIGJlIHBhc3NlZCB0byB0aGUgR3JpZCdzIDpjb2x1bW5XaWR0aCBwcm9wZXJ0eS5cbiAgICogVGhlIDpyZWdpc3RlckNoaWxkIHNob3VsZCBiZSBwYXNzZWQgdG8gdGhlIEdyaWQncyA6cmVmIHByb3BlcnR5LlxuICAgKiBUaGUgOmFkanVzdGVkV2lkdGggcHJvcGVydHkgaXMgb3B0aW9uYWw7IGl0IHJlZmxlY3RzIHRoZSBsZXNzZXIgb2YgdGhlIG92ZXJhbGwgd2lkdGggb3IgdGhlIHdpZHRoIG9mIGFsbCBjb2x1bW5zLlxuICAgKi9cbiAgY2hpbGRyZW46IF9yZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuXG4gIC8qKiBPcHRpb25hbCBtYXhpbXVtIGFsbG93ZWQgY29sdW1uIHdpZHRoICovXG4gIGNvbHVtbk1heFdpZHRoOiBfcmVhY3QuUHJvcFR5cGVzLm51bWJlcixcblxuICAvKiogT3B0aW9uYWwgbWluaW11bSBhbGxvd2VkIGNvbHVtbiB3aWR0aCAqL1xuICBjb2x1bW5NaW5XaWR0aDogX3JlYWN0LlByb3BUeXBlcy5udW1iZXIsXG5cbiAgLyoqIE51bWJlciBvZiBjb2x1bW5zIGluIEdyaWQgb3IgRmxleFRhYmxlIGNoaWxkICovXG4gIGNvbHVtbnNDb3VudDogX3JlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcblxuICAvKiogV2lkdGggb2YgR3JpZCBvciBGbGV4VGFibGUgY2hpbGQgKi9cbiAgd2lkdGg6IF9yZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWRcbn07XG5leHBvcnRzLmRlZmF1bHQgPSBDb2x1bW5TaXplcjsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLkNvbHVtblNpemVyID0gZXhwb3J0cy5kZWZhdWx0ID0gdW5kZWZpbmVkO1xuXG52YXIgX0NvbHVtblNpemVyMiA9IHJlcXVpcmUoJy4vQ29sdW1uU2l6ZXInKTtcblxudmFyIF9Db2x1bW5TaXplcjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9Db2x1bW5TaXplcjIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBfQ29sdW1uU2l6ZXIzLmRlZmF1bHQ7XG5leHBvcnRzLkNvbHVtblNpemVyID0gX0NvbHVtblNpemVyMy5kZWZhdWx0OyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdENlbGxSZW5kZXJlciA9IGRlZmF1bHRDZWxsUmVuZGVyZXI7XG5leHBvcnRzLmRlZmF1bHRDZWxsRGF0YUdldHRlciA9IGRlZmF1bHRDZWxsRGF0YUdldHRlcjtcbmV4cG9ydHMuZGVmYXVsdEhlYWRlclJlbmRlcmVyID0gZGVmYXVsdEhlYWRlclJlbmRlcmVyO1xuXG52YXIgX3JlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIF9yZWFjdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdCk7XG5cbnZhciBfU29ydEluZGljYXRvciA9IHJlcXVpcmUoJy4vU29ydEluZGljYXRvcicpO1xuXG52YXIgX1NvcnRJbmRpY2F0b3IyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfU29ydEluZGljYXRvcik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKCFzZWxmKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxuLyoqXG4gKiBEZWZhdWx0IGNlbGwgcmVuZGVyZXIgdGhhdCBkaXNwbGF5cyBhbiBhdHRyaWJ1dGUgYXMgYSBzaW1wbGUgc3RyaW5nXG4gKiBZb3Ugc2hvdWxkIG92ZXJyaWRlIHRoZSBjb2x1bW4ncyBjZWxsUmVuZGVyZXIgaWYgeW91ciBkYXRhIGlzIHNvbWUgb3RoZXIgdHlwZSBvZiBvYmplY3QuXG4gKi9cbmZ1bmN0aW9uIGRlZmF1bHRDZWxsUmVuZGVyZXIoY2VsbERhdGEsIGNlbGxEYXRhS2V5LCByb3dEYXRhLCByb3dJbmRleCwgY29sdW1uRGF0YSkge1xuICBpZiAoY2VsbERhdGEgPT09IG51bGwgfHwgY2VsbERhdGEgPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiAnJztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gU3RyaW5nKGNlbGxEYXRhKTtcbiAgfVxufVxuXG4vKipcbiAqIERlZmF1bHQgYWNjZXNzb3IgZm9yIHJldHVybmluZyBhIGNlbGwgdmFsdWUgZm9yIGEgZ2l2ZW4gYXR0cmlidXRlLlxuICogVGhpcyBmdW5jdGlvbiBleHBlY3RzIHRvIG9wZXJhdGUgb24gZWl0aGVyIGEgdmFuaWxsYSBPYmplY3Qgb3IgYW4gSW1tdXRhYmxlIE1hcC5cbiAqIFlvdSBzaG91bGQgb3ZlcnJpZGUgdGhlIGNvbHVtbidzIGNlbGxEYXRhR2V0dGVyIGlmIHlvdXIgZGF0YSBpcyBzb21lIG90aGVyIHR5cGUgb2Ygb2JqZWN0LlxuICovXG5mdW5jdGlvbiBkZWZhdWx0Q2VsbERhdGFHZXR0ZXIoZGF0YUtleSwgcm93RGF0YSwgY29sdW1uRGF0YSkge1xuICBpZiAocm93RGF0YS5nZXQgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgIHJldHVybiByb3dEYXRhLmdldChkYXRhS2V5KTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gcm93RGF0YVtkYXRhS2V5XTtcbiAgfVxufVxuXG4vKipcbiAqIERlZmF1bHQgdGFibGUgaGVhZGVyIHJlbmRlcmVyLlxuICovXG5mdW5jdGlvbiBkZWZhdWx0SGVhZGVyUmVuZGVyZXIoX3JlZikge1xuICB2YXIgY29sdW1uRGF0YSA9IF9yZWYuY29sdW1uRGF0YTtcbiAgdmFyIGRhdGFLZXkgPSBfcmVmLmRhdGFLZXk7XG4gIHZhciBkaXNhYmxlU29ydCA9IF9yZWYuZGlzYWJsZVNvcnQ7XG4gIHZhciBsYWJlbCA9IF9yZWYubGFiZWw7XG4gIHZhciBzb3J0QnkgPSBfcmVmLnNvcnRCeTtcbiAgdmFyIHNvcnREaXJlY3Rpb24gPSBfcmVmLnNvcnREaXJlY3Rpb247XG5cbiAgdmFyIHNob3dTb3J0SW5kaWNhdG9yID0gc29ydEJ5ID09PSBkYXRhS2V5O1xuICB2YXIgY2hpbGRyZW4gPSBbX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgJ2RpdicsXG4gICAge1xuICAgICAgY2xhc3NOYW1lOiAnRmxleFRhYmxlX19oZWFkZXJUcnVuY2F0ZWRUZXh0JyxcbiAgICAgIGtleTogJ2xhYmVsJyxcbiAgICAgIHRpdGxlOiBsYWJlbFxuICAgIH0sXG4gICAgbGFiZWxcbiAgKV07XG5cbiAgaWYgKHNob3dTb3J0SW5kaWNhdG9yKSB7XG4gICAgY2hpbGRyZW4ucHVzaChfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChfU29ydEluZGljYXRvcjIuZGVmYXVsdCwge1xuICAgICAga2V5OiAnU29ydEluZGljYXRvcicsXG4gICAgICBzb3J0RGlyZWN0aW9uOiBzb3J0RGlyZWN0aW9uXG4gICAgfSkpO1xuICB9XG5cbiAgcmV0dXJuIGNoaWxkcmVuO1xufVxuXG4vKipcbiAqIERlc2NyaWJlcyB0aGUgaGVhZGVyIGFuZCBjZWxsIGNvbnRlbnRzIG9mIGEgdGFibGUgY29sdW1uLlxuICovXG5cbnZhciBDb2x1bW4gPSBmdW5jdGlvbiAoX0NvbXBvbmVudCkge1xuICBfaW5oZXJpdHMoQ29sdW1uLCBfQ29tcG9uZW50KTtcblxuICBmdW5jdGlvbiBDb2x1bW4oKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIENvbHVtbik7XG5cbiAgICByZXR1cm4gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgT2JqZWN0LmdldFByb3RvdHlwZU9mKENvbHVtbikuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICByZXR1cm4gQ29sdW1uO1xufShfcmVhY3QuQ29tcG9uZW50KTtcblxuQ29sdW1uLmRlZmF1bHRQcm9wcyA9IHtcbiAgY2VsbERhdGFHZXR0ZXI6IGRlZmF1bHRDZWxsRGF0YUdldHRlcixcbiAgY2VsbFJlbmRlcmVyOiBkZWZhdWx0Q2VsbFJlbmRlcmVyLFxuICBmbGV4R3JvdzogMCxcbiAgZmxleFNocmluazogMSxcbiAgaGVhZGVyUmVuZGVyZXI6IGRlZmF1bHRIZWFkZXJSZW5kZXJlclxufTtcbkNvbHVtbi5wcm9wVHlwZXMgPSB7XG4gIC8qKiBPcHRpb25hbCBhcmlhLWxhYmVsIHZhbHVlIHRvIHNldCBvbiB0aGUgY29sdW1uIGhlYWRlciAqL1xuICAnYXJpYS1sYWJlbCc6IF9yZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuXG4gIC8qKiBPcHRpb25hbCBDU1MgY2xhc3MgdG8gYXBwbHkgdG8gY2VsbCAqL1xuICBjZWxsQ2xhc3NOYW1lOiBfcmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcblxuICAvKipcbiAgICogQ2FsbGJhY2sgcmVzcG9uc2libGUgZm9yIHJldHVybmluZyBhIGNlbGwncyBkYXRhLCBnaXZlbiBpdHMgOmRhdGFLZXlcbiAgICogKGRhdGFLZXk6IHN0cmluZywgcm93RGF0YTogYW55KTogYW55XG4gICAqL1xuICBjZWxsRGF0YUdldHRlcjogX3JlYWN0LlByb3BUeXBlcy5mdW5jLFxuXG4gIC8qKlxuICAgKiBDYWxsYmFjayByZXNwb25zaWJsZSBmb3IgcmVuZGVyaW5nIGEgY2VsbCdzIGNvbnRlbnRzLlxuICAgKiAoY2VsbERhdGE6IGFueSwgY2VsbERhdGFLZXk6IHN0cmluZywgcm93RGF0YTogYW55LCByb3dJbmRleDogbnVtYmVyLCBjb2x1bW5EYXRhOiBhbnkpOiBlbGVtZW50XG4gICAqL1xuICBjZWxsUmVuZGVyZXI6IF9yZWFjdC5Qcm9wVHlwZXMuZnVuYyxcblxuICAvKiogT3B0aW9uYWwgYWRkaXRpb25hbCBkYXRhIHBhc3NlZCB0byB0aGlzIGNvbHVtbidzIDpjZWxsRGF0YUdldHRlciAqL1xuICBjb2x1bW5EYXRhOiBfcmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcblxuICAvKiogVW5pcXVlbHkgaWRlbnRpZmllcyB0aGUgcm93LWRhdGEgYXR0cmlidXRlIGNvcnJlc3BuZGluZyB0byB0aGlzIGNlbGwgKi9cbiAgZGF0YUtleTogX3JlYWN0LlByb3BUeXBlcy5hbnkuaXNSZXF1aXJlZCxcblxuICAvKiogSWYgc29ydCBpcyBlbmFibGVkIGZvciB0aGUgdGFibGUgYXQgbGFyZ2UsIGRpc2FibGUgaXQgZm9yIHRoaXMgY29sdW1uICovXG4gIGRpc2FibGVTb3J0OiBfcmVhY3QuUHJvcFR5cGVzLmJvb2wsXG5cbiAgLyoqIEZsZXggZ3JvdyBzdHlsZTsgZGVmYXVsdHMgdG8gMCAqL1xuICBmbGV4R3JvdzogX3JlYWN0LlByb3BUeXBlcy5udW1iZXIsXG5cbiAgLyoqIEZsZXggc2hyaW5rIHN0eWxlOyBkZWZhdWx0cyB0byAxICovXG4gIGZsZXhTaHJpbms6IF9yZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuXG4gIC8qKiBPcHRpb25hbCBDU1MgY2xhc3MgdG8gYXBwbHkgdG8gdGhpcyBjb2x1bW4ncyBoZWFkZXIgKi9cbiAgaGVhZGVyQ2xhc3NOYW1lOiBfcmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcblxuICAvKipcbiAgICogT3B0aW9uYWwgY2FsbGJhY2sgcmVzcG9uc2libGUgZm9yIHJlbmRlcmluZyBhIGNvbHVtbiBoZWFkZXIgY29udGVudHMuXG4gICAqICh7IGNvbHVtbkRhdGE6IG9iamVjdCwgZGF0YUtleTogc3RyaW5nLCBkaXNhYmxlU29ydDogYm9vbGVhbiwgbGFiZWw6IHN0cmluZywgc29ydEJ5OiBzdHJpbmcsIHNvcnREaXJlY3Rpb246IHN0cmluZyB9KTogUHJvcFR5cGVzLm5vZGVcbiAgICovXG4gIGhlYWRlclJlbmRlcmVyOiBfcmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcblxuICAvKiogSGVhZGVyIGxhYmVsIGZvciB0aGlzIGNvbHVtbiAqL1xuICBsYWJlbDogX3JlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG5cbiAgLyoqIE1heGltdW0gd2lkdGggb2YgY29sdW1uOyB0aGlzIHByb3BlcnR5IHdpbGwgb25seSBiZSB1c2VkIGlmIDpmbGV4R3JvdyBpcyA+IDAuICovXG4gIG1heFdpZHRoOiBfcmVhY3QuUHJvcFR5cGVzLm51bWJlcixcblxuICAvKiogTWluaW11bSB3aWR0aCBvZiBjb2x1bW4uICovXG4gIG1pbldpZHRoOiBfcmVhY3QuUHJvcFR5cGVzLm51bWJlcixcblxuICAvKiogRmxleCBiYXNpcyAod2lkdGgpIGZvciB0aGlzIGNvbHVtbjsgVGhpcyB2YWx1ZSBjYW4gZ3JvdyBvciBzaHJpbmsgYmFzZWQgb24gOmZsZXhHcm93IGFuZCA6ZmxleFNocmluayBwcm9wZXJ0aWVzLiAqL1xuICB3aWR0aDogX3JlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZFxufTtcbmV4cG9ydHMuZGVmYXVsdCA9IENvbHVtbjsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbnZhciBfY2xhc3NuYW1lcyA9IHJlcXVpcmUoJ2NsYXNzbmFtZXMnKTtcblxudmFyIF9jbGFzc25hbWVzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NsYXNzbmFtZXMpO1xuXG52YXIgX0ZsZXhDb2x1bW4gPSByZXF1aXJlKCcuL0ZsZXhDb2x1bW4nKTtcblxudmFyIF9GbGV4Q29sdW1uMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0ZsZXhDb2x1bW4pO1xuXG52YXIgX3JlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIF9yZWFjdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdCk7XG5cbnZhciBfcmVhY3REb20gPSByZXF1aXJlKCdyZWFjdC1kb20nKTtcblxudmFyIF9yZWFjdEFkZG9uc1NoYWxsb3dDb21wYXJlID0gcmVxdWlyZSgncmVhY3QtYWRkb25zLXNoYWxsb3ctY29tcGFyZScpO1xuXG52YXIgX3JlYWN0QWRkb25zU2hhbGxvd0NvbXBhcmUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3RBZGRvbnNTaGFsbG93Q29tcGFyZSk7XG5cbnZhciBfR3JpZCA9IHJlcXVpcmUoJy4uL0dyaWQnKTtcblxudmFyIF9HcmlkMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0dyaWQpO1xuXG52YXIgX1NvcnREaXJlY3Rpb24gPSByZXF1aXJlKCcuL1NvcnREaXJlY3Rpb24nKTtcblxudmFyIF9Tb3J0RGlyZWN0aW9uMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1NvcnREaXJlY3Rpb24pO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmICghc2VsZikgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbi8qKlxuICogVGFibGUgY29tcG9uZW50IHdpdGggZml4ZWQgaGVhZGVycyBhbmQgdmlydHVhbGl6ZWQgcm93cyBmb3IgaW1wcm92ZWQgcGVyZm9ybWFuY2Ugd2l0aCBsYXJnZSBkYXRhIHNldHMuXG4gKiBUaGlzIGNvbXBvbmVudCBleHBlY3RzIGV4cGxpY2l0IHdpZHRoLCBoZWlnaHQsIGFuZCBwYWRkaW5nIHBhcmFtZXRlcnMuXG4gKi9cblxudmFyIEZsZXhUYWJsZSA9IGZ1bmN0aW9uIChfQ29tcG9uZW50KSB7XG4gIF9pbmhlcml0cyhGbGV4VGFibGUsIF9Db21wb25lbnQpO1xuXG4gIGZ1bmN0aW9uIEZsZXhUYWJsZShwcm9wcykge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBGbGV4VGFibGUpO1xuXG4gICAgdmFyIF90aGlzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgT2JqZWN0LmdldFByb3RvdHlwZU9mKEZsZXhUYWJsZSkuY2FsbCh0aGlzLCBwcm9wcykpO1xuXG4gICAgX3RoaXMuc3RhdGUgPSB7XG4gICAgICBzY3JvbGxiYXJXaWR0aDogMFxuICAgIH07XG5cbiAgICBfdGhpcy5fY3JlYXRlUm93ID0gX3RoaXMuX2NyZWF0ZVJvdy5iaW5kKF90aGlzKTtcbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICAvKipcbiAgICogU2VlIEdyaWQjcmVjb21wdXRlR3JpZFNpemVcbiAgICovXG5cblxuICBfY3JlYXRlQ2xhc3MoRmxleFRhYmxlLCBbe1xuICAgIGtleTogJ3JlY29tcHV0ZVJvd0hlaWdodHMnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZWNvbXB1dGVSb3dIZWlnaHRzKCkge1xuICAgICAgdGhpcy5yZWZzLkdyaWQucmVjb21wdXRlR3JpZFNpemUoKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdjb21wb25lbnREaWRNb3VudCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgdGhpcy5fc2V0U2Nyb2xsYmFyV2lkdGgoKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdjb21wb25lbnREaWRVcGRhdGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgICB0aGlzLl9zZXRTY3JvbGxiYXJXaWR0aCgpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3JlbmRlcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICB2YXIgX3Byb3BzID0gdGhpcy5wcm9wcztcbiAgICAgIHZhciBjbGFzc05hbWUgPSBfcHJvcHMuY2xhc3NOYW1lO1xuICAgICAgdmFyIGRpc2FibGVIZWFkZXIgPSBfcHJvcHMuZGlzYWJsZUhlYWRlcjtcbiAgICAgIHZhciBoZWFkZXJIZWlnaHQgPSBfcHJvcHMuaGVhZGVySGVpZ2h0O1xuICAgICAgdmFyIGhlaWdodCA9IF9wcm9wcy5oZWlnaHQ7XG4gICAgICB2YXIgbm9Sb3dzUmVuZGVyZXIgPSBfcHJvcHMubm9Sb3dzUmVuZGVyZXI7XG4gICAgICB2YXIgb25Sb3dzUmVuZGVyZWQgPSBfcHJvcHMub25Sb3dzUmVuZGVyZWQ7XG4gICAgICB2YXIgX29uU2Nyb2xsID0gX3Byb3BzLm9uU2Nyb2xsO1xuICAgICAgdmFyIG92ZXJzY2FuUm93c0NvdW50ID0gX3Byb3BzLm92ZXJzY2FuUm93c0NvdW50O1xuICAgICAgdmFyIHJvd0NsYXNzTmFtZSA9IF9wcm9wcy5yb3dDbGFzc05hbWU7XG4gICAgICB2YXIgcm93SGVpZ2h0ID0gX3Byb3BzLnJvd0hlaWdodDtcbiAgICAgIHZhciByb3dzQ291bnQgPSBfcHJvcHMucm93c0NvdW50O1xuICAgICAgdmFyIHNjcm9sbFRvSW5kZXggPSBfcHJvcHMuc2Nyb2xsVG9JbmRleDtcbiAgICAgIHZhciBzY3JvbGxUb3AgPSBfcHJvcHMuc2Nyb2xsVG9wO1xuICAgICAgdmFyIHdpZHRoID0gX3Byb3BzLndpZHRoO1xuICAgICAgdmFyIHNjcm9sbGJhcldpZHRoID0gdGhpcy5zdGF0ZS5zY3JvbGxiYXJXaWR0aDtcblxuXG4gICAgICB2YXIgYXZhaWxhYmxlUm93c0hlaWdodCA9IGhlaWdodCAtIGhlYWRlckhlaWdodDtcblxuICAgICAgLy8gVGhpcyByb3ctcmVuZGVyZXIgd3JhcHBlciBmdW5jdGlvbiBpcyBuZWNlc3NhcnkgaW4gb3JkZXIgdG8gdHJpZ2dlciByZS1yZW5kZXIgd2hlbiB0aGVcbiAgICAgIC8vIHNvcnQtYnkgb3Igc29ydC1kaXJlY3Rpb24gaGF2ZSBjaGFuZ2VkIChlbHNlIEdyaWQgd2lsbCBub3Qgc2VlIGFueSBwcm9wcyBjaGFuZ2VzKVxuICAgICAgdmFyIHJvd1JlbmRlcmVyID0gZnVuY3Rpb24gcm93UmVuZGVyZXIoaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIF90aGlzMi5fY3JlYXRlUm93KGluZGV4KTtcbiAgICAgIH07XG5cbiAgICAgIHZhciByb3dDbGFzcyA9IHJvd0NsYXNzTmFtZSBpbnN0YW5jZW9mIEZ1bmN0aW9uID8gcm93Q2xhc3NOYW1lKC0xKSA6IHJvd0NsYXNzTmFtZTtcblxuICAgICAgcmV0dXJuIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAnZGl2JyxcbiAgICAgICAge1xuICAgICAgICAgIGNsYXNzTmFtZTogKDAsIF9jbGFzc25hbWVzMi5kZWZhdWx0KSgnRmxleFRhYmxlJywgY2xhc3NOYW1lKVxuICAgICAgICB9LFxuICAgICAgICAhZGlzYWJsZUhlYWRlciAmJiBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBjbGFzc05hbWU6ICgwLCBfY2xhc3NuYW1lczIuZGVmYXVsdCkoJ0ZsZXhUYWJsZV9faGVhZGVyUm93Jywgcm93Q2xhc3MpLFxuICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgaGVpZ2h0OiBoZWFkZXJIZWlnaHQsXG4gICAgICAgICAgICAgIHBhZGRpbmdSaWdodDogc2Nyb2xsYmFyV2lkdGgsXG4gICAgICAgICAgICAgIHdpZHRoOiB3aWR0aFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgdGhpcy5fZ2V0UmVuZGVyZWRIZWFkZXJSb3coKVxuICAgICAgICApLFxuICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChfR3JpZDIuZGVmYXVsdCwge1xuICAgICAgICAgICdhcmlhLWxhYmVsJzogdGhpcy5wcm9wc1snYXJpYS1sYWJlbCddLFxuICAgICAgICAgIHJlZjogJ0dyaWQnLFxuICAgICAgICAgIGNsYXNzTmFtZTogJ0ZsZXhUYWJsZV9fR3JpZCcsXG4gICAgICAgICAgY29sdW1uV2lkdGg6IHdpZHRoLFxuICAgICAgICAgIGNvbHVtbnNDb3VudDogMSxcbiAgICAgICAgICBoZWlnaHQ6IGF2YWlsYWJsZVJvd3NIZWlnaHQsXG4gICAgICAgICAgbm9Db250ZW50UmVuZGVyZXI6IG5vUm93c1JlbmRlcmVyLFxuICAgICAgICAgIG9uU2Nyb2xsOiBmdW5jdGlvbiBvblNjcm9sbChfcmVmKSB7XG4gICAgICAgICAgICB2YXIgY2xpZW50SGVpZ2h0ID0gX3JlZi5jbGllbnRIZWlnaHQ7XG4gICAgICAgICAgICB2YXIgc2Nyb2xsSGVpZ2h0ID0gX3JlZi5zY3JvbGxIZWlnaHQ7XG4gICAgICAgICAgICB2YXIgc2Nyb2xsVG9wID0gX3JlZi5zY3JvbGxUb3A7XG4gICAgICAgICAgICByZXR1cm4gX29uU2Nyb2xsKHsgY2xpZW50SGVpZ2h0OiBjbGllbnRIZWlnaHQsIHNjcm9sbEhlaWdodDogc2Nyb2xsSGVpZ2h0LCBzY3JvbGxUb3A6IHNjcm9sbFRvcCB9KTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIG9uU2VjdGlvblJlbmRlcmVkOiBmdW5jdGlvbiBvblNlY3Rpb25SZW5kZXJlZChfcmVmMikge1xuICAgICAgICAgICAgdmFyIHJvd092ZXJzY2FuU3RhcnRJbmRleCA9IF9yZWYyLnJvd092ZXJzY2FuU3RhcnRJbmRleDtcbiAgICAgICAgICAgIHZhciByb3dPdmVyc2NhblN0b3BJbmRleCA9IF9yZWYyLnJvd092ZXJzY2FuU3RvcEluZGV4O1xuICAgICAgICAgICAgdmFyIHJvd1N0YXJ0SW5kZXggPSBfcmVmMi5yb3dTdGFydEluZGV4O1xuICAgICAgICAgICAgdmFyIHJvd1N0b3BJbmRleCA9IF9yZWYyLnJvd1N0b3BJbmRleDtcbiAgICAgICAgICAgIHJldHVybiBvblJvd3NSZW5kZXJlZCh7XG4gICAgICAgICAgICAgIG92ZXJzY2FuU3RhcnRJbmRleDogcm93T3ZlcnNjYW5TdGFydEluZGV4LFxuICAgICAgICAgICAgICBvdmVyc2NhblN0b3BJbmRleDogcm93T3ZlcnNjYW5TdG9wSW5kZXgsXG4gICAgICAgICAgICAgIHN0YXJ0SW5kZXg6IHJvd1N0YXJ0SW5kZXgsXG4gICAgICAgICAgICAgIHN0b3BJbmRleDogcm93U3RvcEluZGV4XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIG92ZXJzY2FuUm93c0NvdW50OiBvdmVyc2NhblJvd3NDb3VudCxcbiAgICAgICAgICByZW5kZXJDZWxsOiBmdW5jdGlvbiByZW5kZXJDZWxsKF9yZWYzKSB7XG4gICAgICAgICAgICB2YXIgY29sdW1uSW5kZXggPSBfcmVmMy5jb2x1bW5JbmRleDtcbiAgICAgICAgICAgIHZhciByb3dJbmRleCA9IF9yZWYzLnJvd0luZGV4O1xuICAgICAgICAgICAgcmV0dXJuIHJvd1JlbmRlcmVyKHJvd0luZGV4KTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHJvd0hlaWdodDogcm93SGVpZ2h0LFxuICAgICAgICAgIHJvd3NDb3VudDogcm93c0NvdW50LFxuICAgICAgICAgIHNjcm9sbFRvUm93OiBzY3JvbGxUb0luZGV4LFxuICAgICAgICAgIHNjcm9sbFRvcDogc2Nyb2xsVG9wLFxuICAgICAgICAgIHdpZHRoOiB3aWR0aFxuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdzaG91bGRDb21wb25lbnRVcGRhdGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUpIHtcbiAgICAgIHJldHVybiAoMCwgX3JlYWN0QWRkb25zU2hhbGxvd0NvbXBhcmUyLmRlZmF1bHQpKHRoaXMsIG5leHRQcm9wcywgbmV4dFN0YXRlKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfY3JlYXRlQ29sdW1uJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX2NyZWF0ZUNvbHVtbihjb2x1bW4sIGNvbHVtbkluZGV4LCByb3dEYXRhLCByb3dJbmRleCkge1xuICAgICAgdmFyIF9jb2x1bW4kcHJvcHMgPSBjb2x1bW4ucHJvcHM7XG4gICAgICB2YXIgY2VsbENsYXNzTmFtZSA9IF9jb2x1bW4kcHJvcHMuY2VsbENsYXNzTmFtZTtcbiAgICAgIHZhciBjZWxsRGF0YUdldHRlciA9IF9jb2x1bW4kcHJvcHMuY2VsbERhdGFHZXR0ZXI7XG4gICAgICB2YXIgY29sdW1uRGF0YSA9IF9jb2x1bW4kcHJvcHMuY29sdW1uRGF0YTtcbiAgICAgIHZhciBkYXRhS2V5ID0gX2NvbHVtbiRwcm9wcy5kYXRhS2V5O1xuICAgICAgdmFyIGNlbGxSZW5kZXJlciA9IF9jb2x1bW4kcHJvcHMuY2VsbFJlbmRlcmVyO1xuXG4gICAgICB2YXIgY2VsbERhdGEgPSBjZWxsRGF0YUdldHRlcihkYXRhS2V5LCByb3dEYXRhLCBjb2x1bW5EYXRhKTtcbiAgICAgIHZhciByZW5kZXJlZENlbGwgPSBjZWxsUmVuZGVyZXIoY2VsbERhdGEsIGRhdGFLZXksIHJvd0RhdGEsIHJvd0luZGV4LCBjb2x1bW5EYXRhKTtcblxuICAgICAgdmFyIHN0eWxlID0gdGhpcy5fZ2V0RmxleFN0eWxlRm9yQ29sdW1uKGNvbHVtbik7XG5cbiAgICAgIHZhciB0aXRsZSA9IHR5cGVvZiByZW5kZXJlZENlbGwgPT09ICdzdHJpbmcnID8gcmVuZGVyZWRDZWxsIDogbnVsbDtcblxuICAgICAgcmV0dXJuIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAnZGl2JyxcbiAgICAgICAge1xuICAgICAgICAgIGtleTogJ1JvdycgKyByb3dJbmRleCArICctQ29sJyArIGNvbHVtbkluZGV4LFxuICAgICAgICAgIGNsYXNzTmFtZTogKDAsIF9jbGFzc25hbWVzMi5kZWZhdWx0KSgnRmxleFRhYmxlX19yb3dDb2x1bW4nLCBjZWxsQ2xhc3NOYW1lKSxcbiAgICAgICAgICBzdHlsZTogc3R5bGVcbiAgICAgICAgfSxcbiAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgJ2RpdicsXG4gICAgICAgICAge1xuICAgICAgICAgICAgY2xhc3NOYW1lOiAnRmxleFRhYmxlX190cnVuY2F0ZWRDb2x1bW5UZXh0JyxcbiAgICAgICAgICAgIHRpdGxlOiB0aXRsZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgcmVuZGVyZWRDZWxsXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX2NyZWF0ZUhlYWRlcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9jcmVhdGVIZWFkZXIoY29sdW1uLCBjb2x1bW5JbmRleCkge1xuICAgICAgdmFyIF9wcm9wczIgPSB0aGlzLnByb3BzO1xuICAgICAgdmFyIGhlYWRlckNsYXNzTmFtZSA9IF9wcm9wczIuaGVhZGVyQ2xhc3NOYW1lO1xuICAgICAgdmFyIG9uSGVhZGVyQ2xpY2sgPSBfcHJvcHMyLm9uSGVhZGVyQ2xpY2s7XG4gICAgICB2YXIgc29ydCA9IF9wcm9wczIuc29ydDtcbiAgICAgIHZhciBzb3J0QnkgPSBfcHJvcHMyLnNvcnRCeTtcbiAgICAgIHZhciBzb3J0RGlyZWN0aW9uID0gX3Byb3BzMi5zb3J0RGlyZWN0aW9uO1xuICAgICAgdmFyIF9jb2x1bW4kcHJvcHMyID0gY29sdW1uLnByb3BzO1xuICAgICAgdmFyIGRhdGFLZXkgPSBfY29sdW1uJHByb3BzMi5kYXRhS2V5O1xuICAgICAgdmFyIGRpc2FibGVTb3J0ID0gX2NvbHVtbiRwcm9wczIuZGlzYWJsZVNvcnQ7XG4gICAgICB2YXIgaGVhZGVyUmVuZGVyZXIgPSBfY29sdW1uJHByb3BzMi5oZWFkZXJSZW5kZXJlcjtcbiAgICAgIHZhciBsYWJlbCA9IF9jb2x1bW4kcHJvcHMyLmxhYmVsO1xuICAgICAgdmFyIGNvbHVtbkRhdGEgPSBfY29sdW1uJHByb3BzMi5jb2x1bW5EYXRhO1xuXG4gICAgICB2YXIgc29ydEVuYWJsZWQgPSAhZGlzYWJsZVNvcnQgJiYgc29ydDtcblxuICAgICAgdmFyIGNsYXNzTmFtZXMgPSAoMCwgX2NsYXNzbmFtZXMyLmRlZmF1bHQpKCdGbGV4VGFibGVfX2hlYWRlckNvbHVtbicsIGhlYWRlckNsYXNzTmFtZSwgY29sdW1uLnByb3BzLmhlYWRlckNsYXNzTmFtZSwge1xuICAgICAgICAnRmxleFRhYmxlX19zb3J0YWJsZUhlYWRlckNvbHVtbic6IHNvcnRFbmFibGVkXG4gICAgICB9KTtcbiAgICAgIHZhciBzdHlsZSA9IHRoaXMuX2dldEZsZXhTdHlsZUZvckNvbHVtbihjb2x1bW4pO1xuXG4gICAgICB2YXIgcmVuZGVyZWRIZWFkZXIgPSBoZWFkZXJSZW5kZXJlcih7XG4gICAgICAgIGNvbHVtbkRhdGE6IGNvbHVtbkRhdGEsXG4gICAgICAgIGRhdGFLZXk6IGRhdGFLZXksXG4gICAgICAgIGRpc2FibGVTb3J0OiBkaXNhYmxlU29ydCxcbiAgICAgICAgbGFiZWw6IGxhYmVsLFxuICAgICAgICBzb3J0Qnk6IHNvcnRCeSxcbiAgICAgICAgc29ydERpcmVjdGlvbjogc29ydERpcmVjdGlvblxuICAgICAgfSk7XG5cbiAgICAgIHZhciBhMTF5UHJvcHMgPSB7fTtcblxuICAgICAgaWYgKHNvcnRFbmFibGVkIHx8IG9uSGVhZGVyQ2xpY2spIHtcbiAgICAgICAgKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAvLyBJZiB0aGlzIGlzIGEgc29ydGFibGUgaGVhZGVyLCBjbGlja2luZyBpdCBzaG91bGQgdXBkYXRlIHRoZSB0YWJsZSBkYXRhJ3Mgc29ydGluZy5cbiAgICAgICAgICB2YXIgbmV3U29ydERpcmVjdGlvbiA9IHNvcnRCeSAhPT0gZGF0YUtleSB8fCBzb3J0RGlyZWN0aW9uID09PSBfU29ydERpcmVjdGlvbjIuZGVmYXVsdC5ERVNDID8gX1NvcnREaXJlY3Rpb24yLmRlZmF1bHQuQVNDIDogX1NvcnREaXJlY3Rpb24yLmRlZmF1bHQuREVTQztcblxuICAgICAgICAgIHZhciBvbkNsaWNrID0gZnVuY3Rpb24gb25DbGljaygpIHtcbiAgICAgICAgICAgIHNvcnRFbmFibGVkICYmIHNvcnQoZGF0YUtleSwgbmV3U29ydERpcmVjdGlvbik7XG4gICAgICAgICAgICBvbkhlYWRlckNsaWNrICYmIG9uSGVhZGVyQ2xpY2soZGF0YUtleSwgY29sdW1uRGF0YSk7XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIHZhciBvbktleURvd24gPSBmdW5jdGlvbiBvbktleURvd24oZXZlbnQpIHtcbiAgICAgICAgICAgIGlmIChldmVudC5rZXkgPT09ICdFbnRlcicgfHwgZXZlbnQua2V5ID09PSAnICcpIHtcbiAgICAgICAgICAgICAgb25DbGljaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG5cbiAgICAgICAgICBhMTF5UHJvcHNbJ2FyaWEtbGFiZWwnXSA9IGNvbHVtbi5wcm9wc1snYXJpYS1sYWJlbCddIHx8IGxhYmVsIHx8IGRhdGFLZXk7XG4gICAgICAgICAgYTExeVByb3BzLnJvbGUgPSAncm93aGVhZGVyJztcbiAgICAgICAgICBhMTF5UHJvcHMudGFiSW5kZXggPSAwO1xuICAgICAgICAgIGExMXlQcm9wcy5vbkNsaWNrID0gb25DbGljaztcbiAgICAgICAgICBhMTF5UHJvcHMub25LZXlEb3duID0gb25LZXlEb3duO1xuICAgICAgICB9KSgpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICdkaXYnLFxuICAgICAgICBfZXh0ZW5kcyh7fSwgYTExeVByb3BzLCB7XG4gICAgICAgICAga2V5OiAnSGVhZGVyLUNvbCcgKyBjb2x1bW5JbmRleCxcbiAgICAgICAgICBjbGFzc05hbWU6IGNsYXNzTmFtZXMsXG4gICAgICAgICAgc3R5bGU6IHN0eWxlXG4gICAgICAgIH0pLFxuICAgICAgICByZW5kZXJlZEhlYWRlclxuICAgICAgKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfY3JlYXRlUm93JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX2NyZWF0ZVJvdyhyb3dJbmRleCkge1xuICAgICAgdmFyIF90aGlzMyA9IHRoaXM7XG5cbiAgICAgIHZhciBfcHJvcHMzID0gdGhpcy5wcm9wcztcbiAgICAgIHZhciBjaGlsZHJlbiA9IF9wcm9wczMuY2hpbGRyZW47XG4gICAgICB2YXIgb25Sb3dDbGljayA9IF9wcm9wczMub25Sb3dDbGljaztcbiAgICAgIHZhciByb3dDbGFzc05hbWUgPSBfcHJvcHMzLnJvd0NsYXNzTmFtZTtcbiAgICAgIHZhciByb3dHZXR0ZXIgPSBfcHJvcHMzLnJvd0dldHRlcjtcbiAgICAgIHZhciBzY3JvbGxiYXJXaWR0aCA9IHRoaXMuc3RhdGUuc2Nyb2xsYmFyV2lkdGg7XG5cblxuICAgICAgdmFyIHJvd0NsYXNzID0gcm93Q2xhc3NOYW1lIGluc3RhbmNlb2YgRnVuY3Rpb24gPyByb3dDbGFzc05hbWUocm93SW5kZXgpIDogcm93Q2xhc3NOYW1lO1xuICAgICAgdmFyIHJvd0RhdGEgPSByb3dHZXR0ZXIocm93SW5kZXgpO1xuXG4gICAgICB2YXIgcmVuZGVyZWRSb3cgPSBfcmVhY3QyLmRlZmF1bHQuQ2hpbGRyZW4ubWFwKGNoaWxkcmVuLCBmdW5jdGlvbiAoY29sdW1uLCBjb2x1bW5JbmRleCkge1xuICAgICAgICByZXR1cm4gX3RoaXMzLl9jcmVhdGVDb2x1bW4oY29sdW1uLCBjb2x1bW5JbmRleCwgcm93RGF0YSwgcm93SW5kZXgpO1xuICAgICAgfSk7XG5cbiAgICAgIHZhciBhMTF5UHJvcHMgPSB7fTtcblxuICAgICAgaWYgKG9uUm93Q2xpY2spIHtcbiAgICAgICAgYTExeVByb3BzWydhcmlhLWxhYmVsJ10gPSAncm93JztcbiAgICAgICAgYTExeVByb3BzLnJvbGUgPSAncm93JztcbiAgICAgICAgYTExeVByb3BzLnRhYkluZGV4ID0gMDtcbiAgICAgICAgYTExeVByb3BzLm9uQ2xpY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIG9uUm93Q2xpY2socm93SW5kZXgpO1xuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICdkaXYnLFxuICAgICAgICBfZXh0ZW5kcyh7fSwgYTExeVByb3BzLCB7XG4gICAgICAgICAga2V5OiByb3dJbmRleCxcbiAgICAgICAgICBjbGFzc05hbWU6ICgwLCBfY2xhc3NuYW1lczIuZGVmYXVsdCkoJ0ZsZXhUYWJsZV9fcm93Jywgcm93Q2xhc3MpLFxuICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICBoZWlnaHQ6IHRoaXMuX2dldFJvd0hlaWdodChyb3dJbmRleCksXG4gICAgICAgICAgICBwYWRkaW5nUmlnaHQ6IHNjcm9sbGJhcldpZHRoXG4gICAgICAgICAgfVxuICAgICAgICB9KSxcbiAgICAgICAgcmVuZGVyZWRSb3dcbiAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGV0ZXJtaW5lcyB0aGUgZmxleC1zaHJpbmssIGZsZXgtZ3JvdywgYW5kIHdpZHRoIHZhbHVlcyBmb3IgYSBjZWxsIChoZWFkZXIgb3IgY29sdW1uKS5cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnX2dldEZsZXhTdHlsZUZvckNvbHVtbicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9nZXRGbGV4U3R5bGVGb3JDb2x1bW4oY29sdW1uKSB7XG4gICAgICB2YXIgZmxleFZhbHVlID0gY29sdW1uLnByb3BzLmZsZXhHcm93ICsgJyAnICsgY29sdW1uLnByb3BzLmZsZXhTaHJpbmsgKyAnICcgKyBjb2x1bW4ucHJvcHMud2lkdGggKyAncHgnO1xuXG4gICAgICB2YXIgc3R5bGUgPSB7XG4gICAgICAgIGZsZXg6IGZsZXhWYWx1ZSxcbiAgICAgICAgbXNGbGV4OiBmbGV4VmFsdWUsXG4gICAgICAgIFdlYmtpdEZsZXg6IGZsZXhWYWx1ZVxuICAgICAgfTtcblxuICAgICAgaWYgKGNvbHVtbi5wcm9wcy5tYXhXaWR0aCkge1xuICAgICAgICBzdHlsZS5tYXhXaWR0aCA9IGNvbHVtbi5wcm9wcy5tYXhXaWR0aDtcbiAgICAgIH1cblxuICAgICAgaWYgKGNvbHVtbi5wcm9wcy5taW5XaWR0aCkge1xuICAgICAgICBzdHlsZS5taW5XaWR0aCA9IGNvbHVtbi5wcm9wcy5taW5XaWR0aDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHN0eWxlO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19nZXRSZW5kZXJlZEhlYWRlclJvdycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9nZXRSZW5kZXJlZEhlYWRlclJvdygpIHtcbiAgICAgIHZhciBfdGhpczQgPSB0aGlzO1xuXG4gICAgICB2YXIgX3Byb3BzNCA9IHRoaXMucHJvcHM7XG4gICAgICB2YXIgY2hpbGRyZW4gPSBfcHJvcHM0LmNoaWxkcmVuO1xuICAgICAgdmFyIGRpc2FibGVIZWFkZXIgPSBfcHJvcHM0LmRpc2FibGVIZWFkZXI7XG5cbiAgICAgIHZhciBpdGVtcyA9IGRpc2FibGVIZWFkZXIgPyBbXSA6IGNoaWxkcmVuO1xuXG4gICAgICByZXR1cm4gX3JlYWN0Mi5kZWZhdWx0LkNoaWxkcmVuLm1hcChpdGVtcywgZnVuY3Rpb24gKGNvbHVtbiwgaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIF90aGlzNC5fY3JlYXRlSGVhZGVyKGNvbHVtbiwgaW5kZXgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX2dldFJvd0hlaWdodCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9nZXRSb3dIZWlnaHQocm93SW5kZXgpIHtcbiAgICAgIHZhciByb3dIZWlnaHQgPSB0aGlzLnByb3BzLnJvd0hlaWdodDtcblxuXG4gICAgICByZXR1cm4gcm93SGVpZ2h0IGluc3RhbmNlb2YgRnVuY3Rpb24gPyByb3dIZWlnaHQocm93SW5kZXgpIDogcm93SGVpZ2h0O1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19zZXRTY3JvbGxiYXJXaWR0aCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9zZXRTY3JvbGxiYXJXaWR0aCgpIHtcbiAgICAgIHZhciBHcmlkID0gKDAsIF9yZWFjdERvbS5maW5kRE9NTm9kZSkodGhpcy5yZWZzLkdyaWQpO1xuICAgICAgdmFyIGNsaWVudFdpZHRoID0gR3JpZC5jbGllbnRXaWR0aCB8fCAwO1xuICAgICAgdmFyIG9mZnNldFdpZHRoID0gR3JpZC5vZmZzZXRXaWR0aCB8fCAwO1xuICAgICAgdmFyIHNjcm9sbGJhcldpZHRoID0gb2Zmc2V0V2lkdGggLSBjbGllbnRXaWR0aDtcblxuICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNjcm9sbGJhcldpZHRoOiBzY3JvbGxiYXJXaWR0aCB9KTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gRmxleFRhYmxlO1xufShfcmVhY3QuQ29tcG9uZW50KTtcblxuRmxleFRhYmxlLnByb3BUeXBlcyA9IHtcbiAgJ2FyaWEtbGFiZWwnOiBfcmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcblxuICAvKiogT25lIG9yIG1vcmUgRmxleENvbHVtbnMgZGVzY3JpYmluZyB0aGUgZGF0YSBkaXNwbGF5ZWQgaW4gdGhpcyByb3cgKi9cbiAgY2hpbGRyZW46IGZ1bmN0aW9uIGNoaWxkcmVuKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSkge1xuICAgIHZhciBjaGlsZHJlbiA9IF9yZWFjdDIuZGVmYXVsdC5DaGlsZHJlbi50b0FycmF5KHByb3BzLmNoaWxkcmVuKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoY2hpbGRyZW5baV0udHlwZSAhPT0gX0ZsZXhDb2x1bW4yLmRlZmF1bHQpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBFcnJvcignRmxleFRhYmxlIG9ubHkgYWNjZXB0cyBjaGlsZHJlbiBvZiB0eXBlIEZsZXhDb2x1bW4nKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgLyoqIE9wdGlvbmFsIENTUyBjbGFzcyBuYW1lICovXG4gIGNsYXNzTmFtZTogX3JlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG5cbiAgLyoqIERpc2FibGUgcmVuZGVyaW5nIHRoZSBoZWFkZXIgYXQgYWxsICovXG4gIGRpc2FibGVIZWFkZXI6IF9yZWFjdC5Qcm9wVHlwZXMuYm9vbCxcblxuICAvKiogT3B0aW9uYWwgQ1NTIGNsYXNzIHRvIGFwcGx5IHRvIGFsbCBjb2x1bW4gaGVhZGVycyAqL1xuICBoZWFkZXJDbGFzc05hbWU6IF9yZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuXG4gIC8qKiBGaXhlZCBoZWlnaHQgb2YgaGVhZGVyIHJvdyAqL1xuICBoZWFkZXJIZWlnaHQ6IF9yZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG5cbiAgLyoqIEZpeGVkL2F2YWlsYWJsZSBoZWlnaHQgZm9yIG91dCBET00gZWxlbWVudCAqL1xuICBoZWlnaHQ6IF9yZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG5cbiAgLyoqIE9wdGlvbmFsIHJlbmRlcmVyIHRvIGJlIHVzZWQgaW4gcGxhY2Ugb2YgdGFibGUgYm9keSByb3dzIHdoZW4gcm93c0NvdW50IGlzIDAgKi9cbiAgbm9Sb3dzUmVuZGVyZXI6IF9yZWFjdC5Qcm9wVHlwZXMuZnVuYyxcblxuICAvKipcbiAgKiBPcHRpb25hbCBjYWxsYmFjayB3aGVuIGEgY29sdW1uJ3MgaGVhZGVyIGlzIGNsaWNrZWQuXG4gICogKGRhdGFLZXk6IHN0cmluZyk6IHZvaWRcbiAgKi9cbiAgb25IZWFkZXJDbGljazogX3JlYWN0LlByb3BUeXBlcy5mdW5jLFxuXG4gIC8qKlxuICAgKiBDYWxsYmFjayBpbnZva2VkIHdoZW4gYSB1c2VyIGNsaWNrcyBvbiBhIHRhYmxlIHJvdy5cbiAgICogKHJvd0luZGV4OiBudW1iZXIpOiB2b2lkXG4gICAqL1xuICBvblJvd0NsaWNrOiBfcmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG5cbiAgLyoqXG4gICAqIENhbGxiYWNrIGludm9rZWQgd2l0aCBpbmZvcm1hdGlvbiBhYm91dCB0aGUgc2xpY2Ugb2Ygcm93cyB0aGF0IHdlcmUganVzdCByZW5kZXJlZC5cbiAgICogKHsgc3RhcnRJbmRleCwgc3RvcEluZGV4IH0pOiB2b2lkXG4gICAqL1xuICBvblJvd3NSZW5kZXJlZDogX3JlYWN0LlByb3BUeXBlcy5mdW5jLFxuXG4gIC8qKlxuICAgKiBDYWxsYmFjayBpbnZva2VkIHdoZW5ldmVyIHRoZSBzY3JvbGwgb2Zmc2V0IGNoYW5nZXMgd2l0aGluIHRoZSBpbm5lciBzY3JvbGxhYmxlIHJlZ2lvbi5cbiAgICogVGhpcyBjYWxsYmFjayBjYW4gYmUgdXNlZCB0byBzeW5jIHNjcm9sbGluZyBiZXR3ZWVuIGxpc3RzLCB0YWJsZXMsIG9yIGdyaWRzLlxuICAgKiAoeyBjbGllbnRIZWlnaHQsIHNjcm9sbEhlaWdodCwgc2Nyb2xsVG9wIH0pOiB2b2lkXG4gICAqL1xuICBvblNjcm9sbDogX3JlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG5cbiAgLyoqXG4gICAqIE51bWJlciBvZiByb3dzIHRvIHJlbmRlciBhYm92ZS9iZWxvdyB0aGUgdmlzaWJsZSBib3VuZHMgb2YgdGhlIGxpc3QuXG4gICAqIFRoZXNlIHJvd3MgY2FuIGhlbHAgZm9yIHNtb290aGVyIHNjcm9sbGluZyBvbiB0b3VjaCBkZXZpY2VzLlxuICAgKi9cbiAgb3ZlcnNjYW5Sb3dzQ291bnQ6IF9yZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG5cbiAgLyoqXG4gICAqIE9wdGlvbmFsIENTUyBjbGFzcyB0byBhcHBseSB0byBhbGwgdGFibGUgcm93cyAoaW5jbHVkaW5nIHRoZSBoZWFkZXIgcm93KS5cbiAgICogVGhpcyBwcm9wZXJ0eSBjYW4gYmUgYSBDU1MgY2xhc3MgbmFtZSAoc3RyaW5nKSBvciBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhIGNsYXNzIG5hbWUuXG4gICAqIElmIGEgZnVuY3Rpb24gaXMgcHJvdmlkZWQgaXRzIHNpZ25hdHVyZSBzaG91bGQgYmU6IChyb3dJbmRleDogbnVtYmVyKTogc3RyaW5nXG4gICAqL1xuICByb3dDbGFzc05hbWU6IF9yZWFjdC5Qcm9wVHlwZXMub25lT2ZUeXBlKFtfcmVhY3QuUHJvcFR5cGVzLnN0cmluZywgX3JlYWN0LlByb3BUeXBlcy5mdW5jXSksXG5cbiAgLyoqXG4gICAqIENhbGxiYWNrIHJlc3BvbnNpYmxlIGZvciByZXR1cm5pbmcgYSBkYXRhIHJvdyBnaXZlbiBhbiBpbmRleC5cbiAgICogKGluZGV4OiBudW1iZXIpOiBhbnlcbiAgICovXG4gIHJvd0dldHRlcjogX3JlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG5cbiAgLyoqXG4gICAqIEVpdGhlciBhIGZpeGVkIHJvdyBoZWlnaHQgKG51bWJlcikgb3IgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIGhlaWdodCBvZiBhIHJvdyBnaXZlbiBpdHMgaW5kZXguXG4gICAqIChpbmRleDogbnVtYmVyKTogbnVtYmVyXG4gICAqL1xuICByb3dIZWlnaHQ6IF9yZWFjdC5Qcm9wVHlwZXMub25lT2ZUeXBlKFtfcmVhY3QuUHJvcFR5cGVzLm51bWJlciwgX3JlYWN0LlByb3BUeXBlcy5mdW5jXSkuaXNSZXF1aXJlZCxcblxuICAvKiogTnVtYmVyIG9mIHJvd3MgaW4gdGFibGUuICovXG4gIHJvd3NDb3VudDogX3JlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcblxuICAvKiogUm93IGluZGV4IHRvIGVuc3VyZSB2aXNpYmxlIChieSBmb3JjZWZ1bGx5IHNjcm9sbGluZyBpZiBuZWNlc3NhcnkpICovXG4gIHNjcm9sbFRvSW5kZXg6IF9yZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuXG4gIC8qKiBWZXJ0aWNhbCBvZmZzZXQuICovXG4gIHNjcm9sbFRvcDogX3JlYWN0LlByb3BUeXBlcy5udW1iZXIsXG5cbiAgLyoqXG4gICAqIFNvcnQgZnVuY3Rpb24gdG8gYmUgY2FsbGVkIGlmIGEgc29ydGFibGUgaGVhZGVyIGlzIGNsaWNrZWQuXG4gICAqIChkYXRhS2V5OiBzdHJpbmcsIHNvcnREaXJlY3Rpb246IFNvcnREaXJlY3Rpb24pOiB2b2lkXG4gICAqL1xuICBzb3J0OiBfcmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG5cbiAgLyoqIEZsZXhUYWJsZSBkYXRhIGlzIGN1cnJlbnRseSBzb3J0ZWQgYnkgdGhpcyA6ZGF0YUtleSAoaWYgaXQgaXMgc29ydGVkIGF0IGFsbCkgKi9cbiAgc29ydEJ5OiBfcmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcblxuICAvKiogRmxleFRhYmxlIGRhdGEgaXMgY3VycmVudGx5IHNvcnRlZCBpbiB0aGlzIGRpcmVjdGlvbiAoaWYgaXQgaXMgc29ydGVkIGF0IGFsbCkgKi9cbiAgc29ydERpcmVjdGlvbjogX3JlYWN0LlByb3BUeXBlcy5vbmVPZihbX1NvcnREaXJlY3Rpb24yLmRlZmF1bHQuQVNDLCBfU29ydERpcmVjdGlvbjIuZGVmYXVsdC5ERVNDXSksXG5cbiAgLyoqIFdpZHRoIG9mIGxpc3QgKi9cbiAgd2lkdGg6IF9yZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWRcbn07XG5GbGV4VGFibGUuZGVmYXVsdFByb3BzID0ge1xuICBkaXNhYmxlSGVhZGVyOiBmYWxzZSxcbiAgaGVhZGVySGVpZ2h0OiAwLFxuICBub1Jvd3NSZW5kZXJlcjogZnVuY3Rpb24gbm9Sb3dzUmVuZGVyZXIoKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH0sXG4gIG9uUm93c1JlbmRlcmVkOiBmdW5jdGlvbiBvblJvd3NSZW5kZXJlZCgpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfSxcbiAgb25TY3JvbGw6IGZ1bmN0aW9uIG9uU2Nyb2xsKCkge1xuICAgIHJldHVybiBudWxsO1xuICB9LFxuICBvdmVyc2NhblJvd3NDb3VudDogMTBcbn07XG5leHBvcnRzLmRlZmF1bHQgPSBGbGV4VGFibGU7IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xudmFyIFNvcnREaXJlY3Rpb24gPSB7XG4gIC8qKlxuICAgKiBTb3J0IGl0ZW1zIGluIGFzY2VuZGluZyBvcmRlci5cbiAgICogVGhpcyBtZWFucyBhcnJhbmdpbmcgZnJvbSB0aGUgbG93ZXN0IHZhbHVlIHRvIHRoZSBoaWdoZXN0IChlLmcuIGEteiwgMC05KS5cbiAgICovXG4gIEFTQzogJ0FTQycsXG5cbiAgLyoqXG4gICAqIFNvcnQgaXRlbXMgaW4gZGVzY2VuZGluZyBvcmRlci5cbiAgICogVGhpcyBtZWFucyBhcnJhbmdpbmcgZnJvbSB0aGUgaGlnaGVzdCB2YWx1ZSB0byB0aGUgbG93ZXN0IChlLmcuIHotYSwgOS0wKS5cbiAgICovXG4gIERFU0M6ICdERVNDJ1xufTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gU29ydERpcmVjdGlvbjsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBTb3J0SW5kaWNhdG9yO1xuXG52YXIgX3JlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIF9yZWFjdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdCk7XG5cbnZhciBfY2xhc3NuYW1lcyA9IHJlcXVpcmUoJ2NsYXNzbmFtZXMnKTtcblxudmFyIF9jbGFzc25hbWVzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NsYXNzbmFtZXMpO1xuXG52YXIgX1NvcnREaXJlY3Rpb24gPSByZXF1aXJlKCcuL1NvcnREaXJlY3Rpb24nKTtcblxudmFyIF9Tb3J0RGlyZWN0aW9uMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1NvcnREaXJlY3Rpb24pO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG4vKipcbiAqIERpc3BsYXllZCBiZXNpZGUgYSBoZWFkZXIgdG8gaW5kaWNhdGUgdGhhdCBhIEZsZXhUYWJsZSBpcyBjdXJyZW50bHkgc29ydGVkIGJ5IHRoaXMgY29sdW1uLlxuICovXG5mdW5jdGlvbiBTb3J0SW5kaWNhdG9yKF9yZWYpIHtcbiAgdmFyIHNvcnREaXJlY3Rpb24gPSBfcmVmLnNvcnREaXJlY3Rpb247XG5cbiAgdmFyIGNsYXNzTmFtZXMgPSAoMCwgX2NsYXNzbmFtZXMyLmRlZmF1bHQpKCdGbGV4VGFibGVfX3NvcnRhYmxlSGVhZGVySWNvbicsIHtcbiAgICAnRmxleFRhYmxlX19zb3J0YWJsZUhlYWRlckljb24tLUFTQyc6IHNvcnREaXJlY3Rpb24gPT09IF9Tb3J0RGlyZWN0aW9uMi5kZWZhdWx0LkFTQyxcbiAgICAnRmxleFRhYmxlX19zb3J0YWJsZUhlYWRlckljb24tLURFU0MnOiBzb3J0RGlyZWN0aW9uID09PSBfU29ydERpcmVjdGlvbjIuZGVmYXVsdC5ERVNDXG4gIH0pO1xuXG4gIHJldHVybiBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAnc3ZnJyxcbiAgICB7XG4gICAgICBjbGFzc05hbWU6IGNsYXNzTmFtZXMsXG4gICAgICB3aWR0aDogMTgsXG4gICAgICBoZWlnaHQ6IDE4LFxuICAgICAgdmlld0JveDogJzAgMCAyNCAyNCcsXG4gICAgICB4bWxuczogJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJ1xuICAgIH0sXG4gICAgc29ydERpcmVjdGlvbiA9PT0gX1NvcnREaXJlY3Rpb24yLmRlZmF1bHQuQVNDID8gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoJ3BhdGgnLCB7IGQ6ICdNNyAxNGw1LTUgNSA1eicgfSkgOiBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudCgncGF0aCcsIHsgZDogJ003IDEwbDUgNSA1LTV6JyB9KSxcbiAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudCgncGF0aCcsIHsgZDogJ00wIDBoMjR2MjRIMHonLCBmaWxsOiAnbm9uZScgfSlcbiAgKTtcbn1cblNvcnRJbmRpY2F0b3IucHJvcFR5cGVzID0ge1xuICBzb3J0RGlyZWN0aW9uOiBfcmVhY3QuUHJvcFR5cGVzLm9uZU9mKFtfU29ydERpcmVjdGlvbjIuZGVmYXVsdC5BU0MsIF9Tb3J0RGlyZWN0aW9uMi5kZWZhdWx0LkRFU0NdKVxufTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLlNvcnRJbmRpY2F0b3IgPSBleHBvcnRzLlNvcnREaXJlY3Rpb24gPSBleHBvcnRzLkZsZXhDb2x1bW4gPSBleHBvcnRzLkZsZXhUYWJsZSA9IGV4cG9ydHMuZGVmYXVsdCA9IHVuZGVmaW5lZDtcblxudmFyIF9GbGV4VGFibGUyID0gcmVxdWlyZSgnLi9GbGV4VGFibGUnKTtcblxudmFyIF9GbGV4VGFibGUzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfRmxleFRhYmxlMik7XG5cbnZhciBfRmxleENvbHVtbjIgPSByZXF1aXJlKCcuL0ZsZXhDb2x1bW4nKTtcblxudmFyIF9GbGV4Q29sdW1uMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0ZsZXhDb2x1bW4yKTtcblxudmFyIF9Tb3J0RGlyZWN0aW9uMiA9IHJlcXVpcmUoJy4vU29ydERpcmVjdGlvbicpO1xuXG52YXIgX1NvcnREaXJlY3Rpb24zID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfU29ydERpcmVjdGlvbjIpO1xuXG52YXIgX1NvcnRJbmRpY2F0b3IyID0gcmVxdWlyZSgnLi9Tb3J0SW5kaWNhdG9yJyk7XG5cbnZhciBfU29ydEluZGljYXRvcjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9Tb3J0SW5kaWNhdG9yMik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IF9GbGV4VGFibGUzLmRlZmF1bHQ7XG5leHBvcnRzLkZsZXhUYWJsZSA9IF9GbGV4VGFibGUzLmRlZmF1bHQ7XG5leHBvcnRzLkZsZXhDb2x1bW4gPSBfRmxleENvbHVtbjMuZGVmYXVsdDtcbmV4cG9ydHMuU29ydERpcmVjdGlvbiA9IF9Tb3J0RGlyZWN0aW9uMy5kZWZhdWx0O1xuZXhwb3J0cy5Tb3J0SW5kaWNhdG9yID0gX1NvcnRJbmRpY2F0b3IzLmRlZmF1bHQ7IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG52YXIgX0dyaWRVdGlscyA9IHJlcXVpcmUoJy4vR3JpZFV0aWxzJyk7XG5cbnZhciBfY2xhc3NuYW1lcyA9IHJlcXVpcmUoJ2NsYXNzbmFtZXMnKTtcblxudmFyIF9jbGFzc25hbWVzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NsYXNzbmFtZXMpO1xuXG52YXIgX3JhZiA9IHJlcXVpcmUoJ3JhZicpO1xuXG52YXIgX3JhZjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yYWYpO1xuXG52YXIgX3Njcm9sbGJhclNpemUgPSByZXF1aXJlKCdkb20taGVscGVycy91dGlsL3Njcm9sbGJhclNpemUnKTtcblxudmFyIF9zY3JvbGxiYXJTaXplMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3Njcm9sbGJhclNpemUpO1xuXG52YXIgX3JlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIF9yZWFjdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdCk7XG5cbnZhciBfcmVhY3RBZGRvbnNTaGFsbG93Q29tcGFyZSA9IHJlcXVpcmUoJ3JlYWN0LWFkZG9ucy1zaGFsbG93LWNvbXBhcmUnKTtcblxudmFyIF9yZWFjdEFkZG9uc1NoYWxsb3dDb21wYXJlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0QWRkb25zU2hhbGxvd0NvbXBhcmUpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmICghc2VsZikgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbi8qKlxuICogU3BlY2lmaWVzIHRoZSBudW1iZXIgb2YgbWlsaXNlY29uZHMgZHVyaW5nIHdoaWNoIHRvIGRpc2FibGUgcG9pbnRlciBldmVudHMgd2hpbGUgYSBzY3JvbGwgaXMgaW4gcHJvZ3Jlc3MuXG4gKiBUaGlzIGltcHJvdmVzIHBlcmZvcm1hbmNlIGFuZCBtYWtlcyBzY3JvbGxpbmcgc21vb3RoZXIuXG4gKi9cbnZhciBJU19TQ1JPTExJTkdfVElNRU9VVCA9IDE1MDtcblxuLyoqXG4gKiBDb250cm9scyB3aGV0aGVyIHRoZSBHcmlkIHVwZGF0ZXMgdGhlIERPTSBlbGVtZW50J3Mgc2Nyb2xsTGVmdC9zY3JvbGxUb3AgYmFzZWQgb24gdGhlIGN1cnJlbnQgc3RhdGUgb3IganVzdCBvYnNlcnZlcyBpdC5cbiAqIFRoaXMgcHJldmVudHMgR3JpZCBmcm9tIGludGVycnVwdGluZyBtb3VzZS13aGVlbCBhbmltYXRpb25zIChzZWUgaXNzdWUgIzIpLlxuICovXG52YXIgU0NST0xMX1BPU0lUSU9OX0NIQU5HRV9SRUFTT05TID0ge1xuICBPQlNFUlZFRDogJ29ic2VydmVkJyxcbiAgUkVRVUVTVEVEOiAncmVxdWVzdGVkJ1xufTtcblxuLyoqXG4gKiBSZW5kZXJzIHRhYnVsYXIgZGF0YSB3aXRoIHZpcnR1YWxpemF0aW9uIGFsb25nIHRoZSB2ZXJ0aWNhbCBhbmQgaG9yaXpvbnRhbCBheGVzLlxuICogUm93IGhlaWdodHMgYW5kIGNvbHVtbiB3aWR0aHMgbXVzdCBiZSBrbm93biBhaGVhZCBvZiB0aW1lIGFuZCBzcGVjaWZpZWQgYXMgcHJvcGVydGllcy5cbiAqL1xuXG52YXIgR3JpZCA9IGZ1bmN0aW9uIChfQ29tcG9uZW50KSB7XG4gIF9pbmhlcml0cyhHcmlkLCBfQ29tcG9uZW50KTtcblxuICBmdW5jdGlvbiBHcmlkKHByb3BzLCBjb250ZXh0KSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEdyaWQpO1xuXG4gICAgdmFyIF90aGlzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgT2JqZWN0LmdldFByb3RvdHlwZU9mKEdyaWQpLmNhbGwodGhpcywgcHJvcHMsIGNvbnRleHQpKTtcblxuICAgIF90aGlzLnN0YXRlID0ge1xuICAgICAgY29tcHV0ZUdyaWRNZXRhZGF0YU9uTmV4dFVwZGF0ZTogZmFsc2UsXG4gICAgICBpc1Njcm9sbGluZzogZmFsc2UsXG4gICAgICBzY3JvbGxMZWZ0OiAwLFxuICAgICAgc2Nyb2xsVG9wOiAwXG4gICAgfTtcblxuICAgIC8vIEludm9rZXMgb25TZWN0aW9uUmVuZGVyZWQgY2FsbGJhY2sgb25seSB3aGVuIHN0YXJ0L3N0b3Agcm93IG9yIGNvbHVtbiBpbmRpY2VzIGNoYW5nZVxuICAgIF90aGlzLl9vbkdyaWRSZW5kZXJlZE1lbW9pemVyID0gKDAsIF9HcmlkVXRpbHMuY3JlYXRlQ2FsbGJhY2tNZW1vaXplcikoKTtcbiAgICBfdGhpcy5fb25TY3JvbGxNZW1vaXplciA9ICgwLCBfR3JpZFV0aWxzLmNyZWF0ZUNhbGxiYWNrTWVtb2l6ZXIpKGZhbHNlKTtcblxuICAgIC8vIEJpbmQgZnVuY3Rpb25zIHRvIGluc3RhbmNlIHNvIHRoZXkgZG9uJ3QgbG9zZSBjb250ZXh0IHdoZW4gcGFzc2VkIGFyb3VuZFxuICAgIF90aGlzLl9jb21wdXRlQ29sdW1uTWV0YWRhdGEgPSBfdGhpcy5fY29tcHV0ZUNvbHVtbk1ldGFkYXRhLmJpbmQoX3RoaXMpO1xuICAgIF90aGlzLl9jb21wdXRlUm93TWV0YWRhdGEgPSBfdGhpcy5fY29tcHV0ZVJvd01ldGFkYXRhLmJpbmQoX3RoaXMpO1xuICAgIF90aGlzLl9pbnZva2VPbkdyaWRSZW5kZXJlZEhlbHBlciA9IF90aGlzLl9pbnZva2VPbkdyaWRSZW5kZXJlZEhlbHBlci5iaW5kKF90aGlzKTtcbiAgICBfdGhpcy5fb25TY3JvbGwgPSBfdGhpcy5fb25TY3JvbGwuYmluZChfdGhpcyk7XG4gICAgX3RoaXMuX3VwZGF0ZVNjcm9sbExlZnRGb3JTY3JvbGxUb0NvbHVtbiA9IF90aGlzLl91cGRhdGVTY3JvbGxMZWZ0Rm9yU2Nyb2xsVG9Db2x1bW4uYmluZChfdGhpcyk7XG4gICAgX3RoaXMuX3VwZGF0ZVNjcm9sbFRvcEZvclNjcm9sbFRvUm93ID0gX3RoaXMuX3VwZGF0ZVNjcm9sbFRvcEZvclNjcm9sbFRvUm93LmJpbmQoX3RoaXMpO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBGb3JjZWQgcmVjb21wdXRlIG9mIHJvdyBoZWlnaHRzIGFuZCBjb2x1bW4gd2lkdGhzLlxuICAgKiBUaGlzIGZ1bmN0aW9uIHNob3VsZCBiZSBjYWxsZWQgaWYgZHluYW1pYyBjb2x1bW4gb3Igcm93IHNpemVzIGhhdmUgY2hhbmdlZCBidXQgbm90aGluZyBlbHNlIGhhcy5cbiAgICogU2luY2UgR3JpZCBvbmx5IHJlY2VpdmVzIDpjb2x1bW5zQ291bnQgYW5kIDpyb3dzQ291bnQgaXQgaGFzIG5vIHdheSBvZiBkZXRlY3Rpbmcgd2hlbiB0aGUgdW5kZXJseWluZyBkYXRhIGNoYW5nZXMuXG4gICAqL1xuXG5cbiAgX2NyZWF0ZUNsYXNzKEdyaWQsIFt7XG4gICAga2V5OiAncmVjb21wdXRlR3JpZFNpemUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZWNvbXB1dGVHcmlkU2l6ZSgpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBjb21wdXRlR3JpZE1ldGFkYXRhT25OZXh0VXBkYXRlOiB0cnVlXG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdjb21wb25lbnREaWRNb3VudCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgdmFyIF9wcm9wcyA9IHRoaXMucHJvcHM7XG4gICAgICB2YXIgc2Nyb2xsTGVmdCA9IF9wcm9wcy5zY3JvbGxMZWZ0O1xuICAgICAgdmFyIHNjcm9sbFRvQ29sdW1uID0gX3Byb3BzLnNjcm9sbFRvQ29sdW1uO1xuICAgICAgdmFyIHNjcm9sbFRvcCA9IF9wcm9wcy5zY3JvbGxUb3A7XG4gICAgICB2YXIgc2Nyb2xsVG9Sb3cgPSBfcHJvcHMuc2Nyb2xsVG9Sb3c7XG5cblxuICAgICAgdGhpcy5fc2Nyb2xsYmFyU2l6ZSA9ICgwLCBfc2Nyb2xsYmFyU2l6ZTIuZGVmYXVsdCkoKTtcblxuICAgICAgaWYgKHNjcm9sbExlZnQgPj0gMCB8fCBzY3JvbGxUb3AgPj0gMCkge1xuICAgICAgICB0aGlzLl9zZXRTY3JvbGxQb3NpdGlvbih7IHNjcm9sbExlZnQ6IHNjcm9sbExlZnQsIHNjcm9sbFRvcDogc2Nyb2xsVG9wIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAoc2Nyb2xsVG9Db2x1bW4gPj0gMCB8fCBzY3JvbGxUb1JvdyA+PSAwKSB7XG4gICAgICAgIHRoaXMuX3VwZGF0ZVNjcm9sbExlZnRGb3JTY3JvbGxUb0NvbHVtbigpO1xuICAgICAgICB0aGlzLl91cGRhdGVTY3JvbGxUb3BGb3JTY3JvbGxUb1JvdygpO1xuICAgICAgfVxuXG4gICAgICAvLyBVcGRhdGUgb25Sb3dzUmVuZGVyZWQgY2FsbGJhY2tcbiAgICAgIHRoaXMuX2ludm9rZU9uR3JpZFJlbmRlcmVkSGVscGVyKCk7XG5cbiAgICAgIC8vIEluaXRpYWxpemUgb25TY3JvbGwgY2FsbGJhY2tcbiAgICAgIHRoaXMuX2ludm9rZU9uU2Nyb2xsTWVtb2l6ZXIoe1xuICAgICAgICBzY3JvbGxMZWZ0OiBzY3JvbGxMZWZ0IHx8IDAsXG4gICAgICAgIHNjcm9sbFRvcDogc2Nyb2xsVG9wIHx8IDAsXG4gICAgICAgIHRvdGFsQ29sdW1uc1dpZHRoOiB0aGlzLl9nZXRUb3RhbENvbHVtbnNXaWR0aCgpLFxuICAgICAgICB0b3RhbFJvd3NIZWlnaHQ6IHRoaXMuX2dldFRvdGFsUm93c0hlaWdodCgpXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIFRoaXMgbWV0aG9kIHVwZGF0ZXMgc2Nyb2xsTGVmdC9zY3JvbGxUb3AgaW4gc3RhdGUgZm9yIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAgICAgKiAxKSBOZXcgc2Nyb2xsLXRvLWNlbGwgcHJvcHMgaGF2ZSBiZWVuIHNldFxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdjb21wb25lbnREaWRVcGRhdGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzLCBwcmV2U3RhdGUpIHtcbiAgICAgIHZhciBfcHJvcHMyID0gdGhpcy5wcm9wcztcbiAgICAgIHZhciBjb2x1bW5zQ291bnQgPSBfcHJvcHMyLmNvbHVtbnNDb3VudDtcbiAgICAgIHZhciBjb2x1bW5XaWR0aCA9IF9wcm9wczIuY29sdW1uV2lkdGg7XG4gICAgICB2YXIgaGVpZ2h0ID0gX3Byb3BzMi5oZWlnaHQ7XG4gICAgICB2YXIgcm93SGVpZ2h0ID0gX3Byb3BzMi5yb3dIZWlnaHQ7XG4gICAgICB2YXIgcm93c0NvdW50ID0gX3Byb3BzMi5yb3dzQ291bnQ7XG4gICAgICB2YXIgc2Nyb2xsVG9Db2x1bW4gPSBfcHJvcHMyLnNjcm9sbFRvQ29sdW1uO1xuICAgICAgdmFyIHNjcm9sbFRvUm93ID0gX3Byb3BzMi5zY3JvbGxUb1JvdztcbiAgICAgIHZhciB3aWR0aCA9IF9wcm9wczIud2lkdGg7XG4gICAgICB2YXIgX3N0YXRlID0gdGhpcy5zdGF0ZTtcbiAgICAgIHZhciBzY3JvbGxMZWZ0ID0gX3N0YXRlLnNjcm9sbExlZnQ7XG4gICAgICB2YXIgc2Nyb2xsUG9zaXRpb25DaGFuZ2VSZWFzb24gPSBfc3RhdGUuc2Nyb2xsUG9zaXRpb25DaGFuZ2VSZWFzb247XG4gICAgICB2YXIgc2Nyb2xsVG9wID0gX3N0YXRlLnNjcm9sbFRvcDtcblxuICAgICAgLy8gTWFrZSBzdXJlIHJlcXVlc3RlZCBjaGFuZ2VzIHRvIDpzY3JvbGxMZWZ0IG9yIDpzY3JvbGxUb3AgZ2V0IGFwcGxpZWQuXG4gICAgICAvLyBBc3NpZ25pbmcgdG8gc2Nyb2xsTGVmdC9zY3JvbGxUb3AgdGVsbHMgdGhlIGJyb3dzZXIgdG8gaW50ZXJydXB0IGFueSBydW5uaW5nIHNjcm9sbCBhbmltYXRpb25zLFxuICAgICAgLy8gQW5kIHRvIGRpc2NhcmQgYW55IHBlbmRpbmcgYXN5bmMgY2hhbmdlcyB0byB0aGUgc2Nyb2xsIHBvc2l0aW9uIHRoYXQgbWF5IGhhdmUgaGFwcGVuZWQgaW4gdGhlIG1lYW50aW1lIChlLmcuIG9uIGEgc2VwYXJhdGUgc2Nyb2xsaW5nIHRocmVhZCkuXG4gICAgICAvLyBTbyB3ZSBvbmx5IHNldCB0aGVzZSB3aGVuIHdlIHJlcXVpcmUgYW4gYWRqdXN0bWVudCBvZiB0aGUgc2Nyb2xsIHBvc2l0aW9uLlxuICAgICAgLy8gU2VlIGlzc3VlICMyIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuXG4gICAgICBpZiAoc2Nyb2xsUG9zaXRpb25DaGFuZ2VSZWFzb24gPT09IFNDUk9MTF9QT1NJVElPTl9DSEFOR0VfUkVBU09OUy5SRVFVRVNURUQpIHtcbiAgICAgICAgaWYgKHNjcm9sbExlZnQgPj0gMCAmJiBzY3JvbGxMZWZ0ICE9PSBwcmV2U3RhdGUuc2Nyb2xsTGVmdCAmJiBzY3JvbGxMZWZ0ICE9PSB0aGlzLnJlZnMuc2Nyb2xsaW5nQ29udGFpbmVyLnNjcm9sbExlZnQpIHtcbiAgICAgICAgICB0aGlzLnJlZnMuc2Nyb2xsaW5nQ29udGFpbmVyLnNjcm9sbExlZnQgPSBzY3JvbGxMZWZ0O1xuICAgICAgICB9XG4gICAgICAgIGlmIChzY3JvbGxUb3AgPj0gMCAmJiBzY3JvbGxUb3AgIT09IHByZXZTdGF0ZS5zY3JvbGxUb3AgJiYgc2Nyb2xsVG9wICE9PSB0aGlzLnJlZnMuc2Nyb2xsaW5nQ29udGFpbmVyLnNjcm9sbFRvcCkge1xuICAgICAgICAgIHRoaXMucmVmcy5zY3JvbGxpbmdDb250YWluZXIuc2Nyb2xsVG9wID0gc2Nyb2xsVG9wO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFVwZGF0ZSBzY3JvbGwgb2Zmc2V0cyBpZiB0aGUgY3VycmVudCA6c2Nyb2xsVG9Db2x1bW4gb3IgOnNjcm9sbFRvUm93IHZhbHVlcyByZXF1aXJlcyBpdFxuICAgICAgKDAsIF9HcmlkVXRpbHMudXBkYXRlU2Nyb2xsSW5kZXhIZWxwZXIpKHtcbiAgICAgICAgY2VsbHNDb3VudDogY29sdW1uc0NvdW50LFxuICAgICAgICBjZWxsTWV0YWRhdGE6IHRoaXMuX2NvbHVtbk1ldGFkYXRhLFxuICAgICAgICBjZWxsU2l6ZTogY29sdW1uV2lkdGgsXG4gICAgICAgIHByZXZpb3VzQ2VsbHNDb3VudDogcHJldlByb3BzLmNvbHVtbnNDb3VudCxcbiAgICAgICAgcHJldmlvdXNDZWxsU2l6ZTogcHJldlByb3BzLmNvbHVtbldpZHRoLFxuICAgICAgICBwcmV2aW91c1Njcm9sbFRvSW5kZXg6IHByZXZQcm9wcy5zY3JvbGxUb0NvbHVtbixcbiAgICAgICAgcHJldmlvdXNTaXplOiBwcmV2UHJvcHMud2lkdGgsXG4gICAgICAgIHNjcm9sbE9mZnNldDogc2Nyb2xsTGVmdCxcbiAgICAgICAgc2Nyb2xsVG9JbmRleDogc2Nyb2xsVG9Db2x1bW4sXG4gICAgICAgIHNpemU6IHdpZHRoLFxuICAgICAgICB1cGRhdGVTY3JvbGxJbmRleENhbGxiYWNrOiB0aGlzLl91cGRhdGVTY3JvbGxMZWZ0Rm9yU2Nyb2xsVG9Db2x1bW5cbiAgICAgIH0pO1xuICAgICAgKDAsIF9HcmlkVXRpbHMudXBkYXRlU2Nyb2xsSW5kZXhIZWxwZXIpKHtcbiAgICAgICAgY2VsbHNDb3VudDogcm93c0NvdW50LFxuICAgICAgICBjZWxsTWV0YWRhdGE6IHRoaXMuX3Jvd01ldGFkYXRhLFxuICAgICAgICBjZWxsU2l6ZTogcm93SGVpZ2h0LFxuICAgICAgICBwcmV2aW91c0NlbGxzQ291bnQ6IHByZXZQcm9wcy5yb3dzQ291bnQsXG4gICAgICAgIHByZXZpb3VzQ2VsbFNpemU6IHByZXZQcm9wcy5yb3dIZWlnaHQsXG4gICAgICAgIHByZXZpb3VzU2Nyb2xsVG9JbmRleDogcHJldlByb3BzLnNjcm9sbFRvUm93LFxuICAgICAgICBwcmV2aW91c1NpemU6IHByZXZQcm9wcy5oZWlnaHQsXG4gICAgICAgIHNjcm9sbE9mZnNldDogc2Nyb2xsVG9wLFxuICAgICAgICBzY3JvbGxUb0luZGV4OiBzY3JvbGxUb1JvdyxcbiAgICAgICAgc2l6ZTogaGVpZ2h0LFxuICAgICAgICB1cGRhdGVTY3JvbGxJbmRleENhbGxiYWNrOiB0aGlzLl91cGRhdGVTY3JvbGxUb3BGb3JTY3JvbGxUb1Jvd1xuICAgICAgfSk7XG5cbiAgICAgIC8vIFVwZGF0ZSBvblJvd3NSZW5kZXJlZCBjYWxsYmFjayBpZiBzdGFydC9zdG9wIGluZGljZXMgaGF2ZSBjaGFuZ2VkXG4gICAgICB0aGlzLl9pbnZva2VPbkdyaWRSZW5kZXJlZEhlbHBlcigpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2NvbXBvbmVudFdpbGxNb3VudCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICAgIHRoaXMuX2NvbXB1dGVDb2x1bW5NZXRhZGF0YSh0aGlzLnByb3BzKTtcbiAgICAgIHRoaXMuX2NvbXB1dGVSb3dNZXRhZGF0YSh0aGlzLnByb3BzKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdjb21wb25lbnRXaWxsVW5tb3VudCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgaWYgKHRoaXMuX2Rpc2FibGVQb2ludGVyRXZlbnRzVGltZW91dElkKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLl9kaXNhYmxlUG9pbnRlckV2ZW50c1RpbWVvdXRJZCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLl9zZXROZXh0U3RhdGVBbmltYXRpb25GcmFtZUlkKSB7XG4gICAgICAgIF9yYWYyLmRlZmF1bHQuY2FuY2VsKHRoaXMuX3NldE5leHRTdGF0ZUFuaW1hdGlvbkZyYW1lSWQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogVGhpcyBtZXRob2QgdXBkYXRlcyBzY3JvbGxMZWZ0L3Njcm9sbFRvcCBpbiBzdGF0ZSBmb3IgdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICAgICAqIDEpIEVtcHR5IGNvbnRlbnQgKDAgcm93cyBvciBjb2x1bW5zKVxuICAgICAqIDIpIE5ldyBzY3JvbGwgcHJvcHMgb3ZlcnJpZGluZyB0aGUgY3VycmVudCBzdGF0ZVxuICAgICAqIDMpIENlbGxzLWNvdW50IG9yIGNlbGxzLXNpemUgaGFzIGNoYW5nZWQsIG1ha2luZyBwcmV2aW91cyBzY3JvbGwgb2Zmc2V0cyBpbnZhbGlkXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ2NvbXBvbmVudFdpbGxVcGRhdGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnRXaWxsVXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlKSB7XG4gICAgICBpZiAobmV4dFByb3BzLmNvbHVtbnNDb3VudCA9PT0gMCAmJiBuZXh0U3RhdGUuc2Nyb2xsTGVmdCAhPT0gMCB8fCBuZXh0UHJvcHMucm93c0NvdW50ID09PSAwICYmIG5leHRTdGF0ZS5zY3JvbGxUb3AgIT09IDApIHtcbiAgICAgICAgdGhpcy5fc2V0U2Nyb2xsUG9zaXRpb24oe1xuICAgICAgICAgIHNjcm9sbExlZnQ6IDAsXG4gICAgICAgICAgc2Nyb2xsVG9wOiAwXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIGlmIChuZXh0UHJvcHMuc2Nyb2xsTGVmdCAhPT0gdGhpcy5wcm9wcy5zY3JvbGxMZWZ0IHx8IG5leHRQcm9wcy5zY3JvbGxUb3AgIT09IHRoaXMucHJvcHMuc2Nyb2xsVG9wKSB7XG4gICAgICAgIHRoaXMuX3NldFNjcm9sbFBvc2l0aW9uKHtcbiAgICAgICAgICBzY3JvbGxMZWZ0OiBuZXh0UHJvcHMuc2Nyb2xsTGVmdCxcbiAgICAgICAgICBzY3JvbGxUb3A6IG5leHRQcm9wcy5zY3JvbGxUb3BcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIC8vIFVwZGF0ZSBzY3JvbGwgb2Zmc2V0cyBpZiB0aGUgc2l6ZSBvciBudW1iZXIgb2YgY2VsbHMgaGF2ZSBjaGFuZ2VkLCBpbnZhbGlkYXRpbmcgdGhlIHByZXZpb3VzIHZhbHVlXG4gICAgICAoMCwgX0dyaWRVdGlscy5jb21wdXRlQ2VsbE1ldGFkYXRhQW5kVXBkYXRlU2Nyb2xsT2Zmc2V0SGVscGVyKSh7XG4gICAgICAgIGNlbGxzQ291bnQ6IHRoaXMucHJvcHMuY29sdW1uc0NvdW50LFxuICAgICAgICBjZWxsU2l6ZTogdGhpcy5wcm9wcy5jb2x1bW5XaWR0aCxcbiAgICAgICAgY29tcHV0ZU1ldGFkYXRhQ2FsbGJhY2s6IHRoaXMuX2NvbXB1dGVDb2x1bW5NZXRhZGF0YSxcbiAgICAgICAgY29tcHV0ZU1ldGFkYXRhQ2FsbGJhY2tQcm9wczogbmV4dFByb3BzLFxuICAgICAgICBjb21wdXRlTWV0YWRhdGFPbk5leHRVcGRhdGU6IG5leHRTdGF0ZS5jb21wdXRlR3JpZE1ldGFkYXRhT25OZXh0VXBkYXRlLFxuICAgICAgICBuZXh0Q2VsbHNDb3VudDogbmV4dFByb3BzLmNvbHVtbnNDb3VudCxcbiAgICAgICAgbmV4dENlbGxTaXplOiBuZXh0UHJvcHMuY29sdW1uV2lkdGgsXG4gICAgICAgIG5leHRTY3JvbGxUb0luZGV4OiBuZXh0UHJvcHMuc2Nyb2xsVG9Db2x1bW4sXG4gICAgICAgIHNjcm9sbFRvSW5kZXg6IHRoaXMucHJvcHMuc2Nyb2xsVG9Db2x1bW4sXG4gICAgICAgIHVwZGF0ZVNjcm9sbE9mZnNldEZvclNjcm9sbFRvSW5kZXg6IHRoaXMuX3VwZGF0ZVNjcm9sbExlZnRGb3JTY3JvbGxUb0NvbHVtblxuICAgICAgfSk7XG4gICAgICAoMCwgX0dyaWRVdGlscy5jb21wdXRlQ2VsbE1ldGFkYXRhQW5kVXBkYXRlU2Nyb2xsT2Zmc2V0SGVscGVyKSh7XG4gICAgICAgIGNlbGxzQ291bnQ6IHRoaXMucHJvcHMucm93c0NvdW50LFxuICAgICAgICBjZWxsU2l6ZTogdGhpcy5wcm9wcy5yb3dIZWlnaHQsXG4gICAgICAgIGNvbXB1dGVNZXRhZGF0YUNhbGxiYWNrOiB0aGlzLl9jb21wdXRlUm93TWV0YWRhdGEsXG4gICAgICAgIGNvbXB1dGVNZXRhZGF0YUNhbGxiYWNrUHJvcHM6IG5leHRQcm9wcyxcbiAgICAgICAgY29tcHV0ZU1ldGFkYXRhT25OZXh0VXBkYXRlOiBuZXh0U3RhdGUuY29tcHV0ZUdyaWRNZXRhZGF0YU9uTmV4dFVwZGF0ZSxcbiAgICAgICAgbmV4dENlbGxzQ291bnQ6IG5leHRQcm9wcy5yb3dzQ291bnQsXG4gICAgICAgIG5leHRDZWxsU2l6ZTogbmV4dFByb3BzLnJvd0hlaWdodCxcbiAgICAgICAgbmV4dFNjcm9sbFRvSW5kZXg6IG5leHRQcm9wcy5zY3JvbGxUb1JvdyxcbiAgICAgICAgc2Nyb2xsVG9JbmRleDogdGhpcy5wcm9wcy5zY3JvbGxUb1JvdyxcbiAgICAgICAgdXBkYXRlU2Nyb2xsT2Zmc2V0Rm9yU2Nyb2xsVG9JbmRleDogdGhpcy5fdXBkYXRlU2Nyb2xsVG9wRm9yU2Nyb2xsVG9Sb3dcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgY29tcHV0ZUdyaWRNZXRhZGF0YU9uTmV4dFVwZGF0ZTogZmFsc2VcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3JlbmRlcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgIHZhciBfcHJvcHMzID0gdGhpcy5wcm9wcztcbiAgICAgIHZhciBjbGFzc05hbWUgPSBfcHJvcHMzLmNsYXNzTmFtZTtcbiAgICAgIHZhciBjb2x1bW5zQ291bnQgPSBfcHJvcHMzLmNvbHVtbnNDb3VudDtcbiAgICAgIHZhciBoZWlnaHQgPSBfcHJvcHMzLmhlaWdodDtcbiAgICAgIHZhciBub0NvbnRlbnRSZW5kZXJlciA9IF9wcm9wczMubm9Db250ZW50UmVuZGVyZXI7XG4gICAgICB2YXIgb3ZlcnNjYW5Db2x1bW5zQ291bnQgPSBfcHJvcHMzLm92ZXJzY2FuQ29sdW1uc0NvdW50O1xuICAgICAgdmFyIG92ZXJzY2FuUm93c0NvdW50ID0gX3Byb3BzMy5vdmVyc2NhblJvd3NDb3VudDtcbiAgICAgIHZhciByZW5kZXJDZWxsID0gX3Byb3BzMy5yZW5kZXJDZWxsO1xuICAgICAgdmFyIHJlbmRlckNlbGxSYW5nZXMgPSBfcHJvcHMzLnJlbmRlckNlbGxSYW5nZXM7XG4gICAgICB2YXIgcm93c0NvdW50ID0gX3Byb3BzMy5yb3dzQ291bnQ7XG4gICAgICB2YXIgd2lkdGggPSBfcHJvcHMzLndpZHRoO1xuICAgICAgdmFyIF9zdGF0ZTIgPSB0aGlzLnN0YXRlO1xuICAgICAgdmFyIGlzU2Nyb2xsaW5nID0gX3N0YXRlMi5pc1Njcm9sbGluZztcbiAgICAgIHZhciBzY3JvbGxMZWZ0ID0gX3N0YXRlMi5zY3JvbGxMZWZ0O1xuICAgICAgdmFyIHNjcm9sbFRvcCA9IF9zdGF0ZTIuc2Nyb2xsVG9wO1xuXG5cbiAgICAgIHZhciBjaGlsZHJlblRvRGlzcGxheSA9IFtdO1xuXG4gICAgICAvLyBSZW5kZXIgb25seSBlbm91Z2ggY29sdW1ucyBhbmQgcm93cyB0byBjb3ZlciB0aGUgdmlzaWJsZSBhcmVhIG9mIHRoZSBncmlkLlxuICAgICAgaWYgKGhlaWdodCA+IDAgJiYgd2lkdGggPiAwKSB7XG4gICAgICAgIHZhciB2aXNpYmxlQ29sdW1uSW5kaWNlcyA9ICgwLCBfR3JpZFV0aWxzLmdldFZpc2libGVDZWxsSW5kaWNlcykoe1xuICAgICAgICAgIGNlbGxzQ291bnQ6IGNvbHVtbnNDb3VudCxcbiAgICAgICAgICBjZWxsTWV0YWRhdGE6IHRoaXMuX2NvbHVtbk1ldGFkYXRhLFxuICAgICAgICAgIGNvbnRhaW5lclNpemU6IHdpZHRoLFxuICAgICAgICAgIGN1cnJlbnRPZmZzZXQ6IHNjcm9sbExlZnRcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIHZpc2libGVSb3dJbmRpY2VzID0gKDAsIF9HcmlkVXRpbHMuZ2V0VmlzaWJsZUNlbGxJbmRpY2VzKSh7XG4gICAgICAgICAgY2VsbHNDb3VudDogcm93c0NvdW50LFxuICAgICAgICAgIGNlbGxNZXRhZGF0YTogdGhpcy5fcm93TWV0YWRhdGEsXG4gICAgICAgICAgY29udGFpbmVyU2l6ZTogaGVpZ2h0LFxuICAgICAgICAgIGN1cnJlbnRPZmZzZXQ6IHNjcm9sbFRvcFxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBTdG9yZSBmb3IgX2ludm9rZU9uR3JpZFJlbmRlcmVkSGVscGVyKClcbiAgICAgICAgdGhpcy5fcmVuZGVyZWRDb2x1bW5TdGFydEluZGV4ID0gdmlzaWJsZUNvbHVtbkluZGljZXMuc3RhcnQ7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVkQ29sdW1uU3RvcEluZGV4ID0gdmlzaWJsZUNvbHVtbkluZGljZXMuc3RvcDtcbiAgICAgICAgdGhpcy5fcmVuZGVyZWRSb3dTdGFydEluZGV4ID0gdmlzaWJsZVJvd0luZGljZXMuc3RhcnQ7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVkUm93U3RvcEluZGV4ID0gdmlzaWJsZVJvd0luZGljZXMuc3RvcDtcblxuICAgICAgICB2YXIgb3ZlcnNjYW5Db2x1bW5JbmRpY2VzID0gKDAsIF9HcmlkVXRpbHMuZ2V0T3ZlcnNjYW5JbmRpY2VzKSh7XG4gICAgICAgICAgY2VsbHNDb3VudDogY29sdW1uc0NvdW50LFxuICAgICAgICAgIG92ZXJzY2FuQ2VsbHNDb3VudDogb3ZlcnNjYW5Db2x1bW5zQ291bnQsXG4gICAgICAgICAgc3RhcnRJbmRleDogdGhpcy5fcmVuZGVyZWRDb2x1bW5TdGFydEluZGV4LFxuICAgICAgICAgIHN0b3BJbmRleDogdGhpcy5fcmVuZGVyZWRDb2x1bW5TdG9wSW5kZXhcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIG92ZXJzY2FuUm93SW5kaWNlcyA9ICgwLCBfR3JpZFV0aWxzLmdldE92ZXJzY2FuSW5kaWNlcykoe1xuICAgICAgICAgIGNlbGxzQ291bnQ6IHJvd3NDb3VudCxcbiAgICAgICAgICBvdmVyc2NhbkNlbGxzQ291bnQ6IG92ZXJzY2FuUm93c0NvdW50LFxuICAgICAgICAgIHN0YXJ0SW5kZXg6IHRoaXMuX3JlbmRlcmVkUm93U3RhcnRJbmRleCxcbiAgICAgICAgICBzdG9wSW5kZXg6IHRoaXMuX3JlbmRlcmVkUm93U3RvcEluZGV4XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFN0b3JlIGZvciBfaW52b2tlT25HcmlkUmVuZGVyZWRIZWxwZXIoKVxuICAgICAgICB0aGlzLl9jb2x1bW5TdGFydEluZGV4ID0gb3ZlcnNjYW5Db2x1bW5JbmRpY2VzLm92ZXJzY2FuU3RhcnRJbmRleDtcbiAgICAgICAgdGhpcy5fY29sdW1uU3RvcEluZGV4ID0gb3ZlcnNjYW5Db2x1bW5JbmRpY2VzLm92ZXJzY2FuU3RvcEluZGV4O1xuICAgICAgICB0aGlzLl9yb3dTdGFydEluZGV4ID0gb3ZlcnNjYW5Sb3dJbmRpY2VzLm92ZXJzY2FuU3RhcnRJbmRleDtcbiAgICAgICAgdGhpcy5fcm93U3RvcEluZGV4ID0gb3ZlcnNjYW5Sb3dJbmRpY2VzLm92ZXJzY2FuU3RvcEluZGV4O1xuXG4gICAgICAgIGNoaWxkcmVuVG9EaXNwbGF5ID0gcmVuZGVyQ2VsbFJhbmdlcyh7XG4gICAgICAgICAgY29sdW1uTWV0YWRhdGE6IHRoaXMuX2NvbHVtbk1ldGFkYXRhLFxuICAgICAgICAgIGNvbHVtblN0YXJ0SW5kZXg6IHRoaXMuX2NvbHVtblN0YXJ0SW5kZXgsXG4gICAgICAgICAgY29sdW1uU3RvcEluZGV4OiB0aGlzLl9jb2x1bW5TdG9wSW5kZXgsXG4gICAgICAgICAgcmVuZGVyQ2VsbDogcmVuZGVyQ2VsbCxcbiAgICAgICAgICByb3dNZXRhZGF0YTogdGhpcy5fcm93TWV0YWRhdGEsXG4gICAgICAgICAgcm93U3RhcnRJbmRleDogdGhpcy5fcm93U3RhcnRJbmRleCxcbiAgICAgICAgICByb3dTdG9wSW5kZXg6IHRoaXMuX3Jvd1N0b3BJbmRleFxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgdmFyIGdyaWRTdHlsZSA9IHtcbiAgICAgICAgaGVpZ2h0OiBoZWlnaHQsXG4gICAgICAgIHdpZHRoOiB3aWR0aFxuICAgICAgfTtcblxuICAgICAgdmFyIHRvdGFsQ29sdW1uc1dpZHRoID0gdGhpcy5fZ2V0VG90YWxDb2x1bW5zV2lkdGgoKTtcbiAgICAgIHZhciB0b3RhbFJvd3NIZWlnaHQgPSB0aGlzLl9nZXRUb3RhbFJvd3NIZWlnaHQoKTtcblxuICAgICAgLy8gRm9yY2UgYnJvd3NlciB0byBoaWRlIHNjcm9sbGJhcnMgd2hlbiB3ZSBrbm93IHRoZXkgYXJlbid0IG5lY2Vzc2FyeS5cbiAgICAgIC8vIE90aGVyd2lzZSBvbmNlIHNjcm9sbGJhcnMgYXBwZWFyIHRoZXkgbWF5IG5vdCBkaXNhcHBlYXIgYWdhaW4uXG4gICAgICAvLyBGb3IgbW9yZSBpbmZvIHNlZSBpc3N1ZSAjMTE2XG4gICAgICBpZiAodG90YWxDb2x1bW5zV2lkdGggPD0gd2lkdGgpIHtcbiAgICAgICAgZ3JpZFN0eWxlLm92ZXJmbG93WCA9ICdoaWRkZW4nO1xuICAgICAgfVxuXG4gICAgICBpZiAodG90YWxSb3dzSGVpZ2h0IDw9IGhlaWdodCkge1xuICAgICAgICBncmlkU3R5bGUub3ZlcmZsb3dZID0gJ2hpZGRlbic7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgJ2RpdicsXG4gICAgICAgIHtcbiAgICAgICAgICByZWY6ICdzY3JvbGxpbmdDb250YWluZXInLFxuICAgICAgICAgICdhcmlhLWxhYmVsJzogdGhpcy5wcm9wc1snYXJpYS1sYWJlbCddLFxuICAgICAgICAgIGNsYXNzTmFtZTogKDAsIF9jbGFzc25hbWVzMi5kZWZhdWx0KSgnR3JpZCcsIGNsYXNzTmFtZSksXG4gICAgICAgICAgb25TY3JvbGw6IHRoaXMuX29uU2Nyb2xsLFxuICAgICAgICAgIHJvbGU6ICdncmlkJyxcbiAgICAgICAgICBzdHlsZTogZ3JpZFN0eWxlLFxuICAgICAgICAgIHRhYkluZGV4OiAwXG4gICAgICAgIH0sXG4gICAgICAgIGNoaWxkcmVuVG9EaXNwbGF5Lmxlbmd0aCA+IDAgJiYgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgJ2RpdicsXG4gICAgICAgICAge1xuICAgICAgICAgICAgY2xhc3NOYW1lOiAnR3JpZF9faW5uZXJTY3JvbGxDb250YWluZXInLFxuICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgd2lkdGg6IHRvdGFsQ29sdW1uc1dpZHRoLFxuICAgICAgICAgICAgICBoZWlnaHQ6IHRvdGFsUm93c0hlaWdodCxcbiAgICAgICAgICAgICAgbWF4V2lkdGg6IHRvdGFsQ29sdW1uc1dpZHRoLFxuICAgICAgICAgICAgICBtYXhIZWlnaHQ6IHRvdGFsUm93c0hlaWdodCxcbiAgICAgICAgICAgICAgcG9pbnRlckV2ZW50czogaXNTY3JvbGxpbmcgPyAnbm9uZScgOiAnYXV0bydcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIGNoaWxkcmVuVG9EaXNwbGF5XG4gICAgICAgICksXG4gICAgICAgIGNoaWxkcmVuVG9EaXNwbGF5Lmxlbmd0aCA9PT0gMCAmJiBub0NvbnRlbnRSZW5kZXJlcigpXG4gICAgICApO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3Nob3VsZENvbXBvbmVudFVwZGF0ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xuICAgICAgcmV0dXJuICgwLCBfcmVhY3RBZGRvbnNTaGFsbG93Q29tcGFyZTIuZGVmYXVsdCkodGhpcywgbmV4dFByb3BzLCBuZXh0U3RhdGUpO1xuICAgIH1cblxuICAgIC8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gSGVscGVyIG1ldGhvZHMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdfY29tcHV0ZUNvbHVtbk1ldGFkYXRhJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX2NvbXB1dGVDb2x1bW5NZXRhZGF0YShwcm9wcykge1xuICAgICAgdmFyIGNvbHVtbnNDb3VudCA9IHByb3BzLmNvbHVtbnNDb3VudDtcbiAgICAgIHZhciBjb2x1bW5XaWR0aCA9IHByb3BzLmNvbHVtbldpZHRoO1xuXG5cbiAgICAgIHRoaXMuX2NvbHVtbk1ldGFkYXRhID0gKDAsIF9HcmlkVXRpbHMuaW5pdENlbGxNZXRhZGF0YSkoe1xuICAgICAgICBjZWxsc0NvdW50OiBjb2x1bW5zQ291bnQsXG4gICAgICAgIHNpemU6IGNvbHVtbldpZHRoXG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfY29tcHV0ZVJvd01ldGFkYXRhJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX2NvbXB1dGVSb3dNZXRhZGF0YShwcm9wcykge1xuICAgICAgdmFyIHJvd0hlaWdodCA9IHByb3BzLnJvd0hlaWdodDtcbiAgICAgIHZhciByb3dzQ291bnQgPSBwcm9wcy5yb3dzQ291bnQ7XG5cblxuICAgICAgdGhpcy5fcm93TWV0YWRhdGEgPSAoMCwgX0dyaWRVdGlscy5pbml0Q2VsbE1ldGFkYXRhKSh7XG4gICAgICAgIGNlbGxzQ291bnQ6IHJvd3NDb3VudCxcbiAgICAgICAgc2l6ZTogcm93SGVpZ2h0XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIGFuIDppc1Njcm9sbGluZyBmbGFnIGZvciBhIHNtYWxsIHdpbmRvdyBvZiB0aW1lLlxuICAgICAqIFRoaXMgZmxhZyBpcyB1c2VkIHRvIGRpc2FibGUgcG9pbnRlciBldmVudHMgb24gdGhlIHNjcm9sbGFibGUgcG9ydGlvbiBvZiB0aGUgR3JpZC5cbiAgICAgKiBUaGlzIHByZXZlbnRzIGplcmt5L3N0dXR0ZXJ5IG1vdXNlLXdoZWVsIHNjcm9sbGluZy5cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnX2VuYWJsZVBvaW50ZXJFdmVudHNBZnRlckRlbGF5JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX2VuYWJsZVBvaW50ZXJFdmVudHNBZnRlckRlbGF5KCkge1xuICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgIGlmICh0aGlzLl9kaXNhYmxlUG9pbnRlckV2ZW50c1RpbWVvdXRJZCkge1xuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5fZGlzYWJsZVBvaW50ZXJFdmVudHNUaW1lb3V0SWQpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9kaXNhYmxlUG9pbnRlckV2ZW50c1RpbWVvdXRJZCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICBfdGhpczIuX2Rpc2FibGVQb2ludGVyRXZlbnRzVGltZW91dElkID0gbnVsbDtcbiAgICAgICAgX3RoaXMyLnNldFN0YXRlKHtcbiAgICAgICAgICBpc1Njcm9sbGluZzogZmFsc2VcbiAgICAgICAgfSk7XG4gICAgICB9LCBJU19TQ1JPTExJTkdfVElNRU9VVCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX2dldFRvdGFsQ29sdW1uc1dpZHRoJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX2dldFRvdGFsQ29sdW1uc1dpZHRoKCkge1xuICAgICAgaWYgKHRoaXMuX2NvbHVtbk1ldGFkYXRhLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gMDtcbiAgICAgIH1cblxuICAgICAgdmFyIGRhdHVtID0gdGhpcy5fY29sdW1uTWV0YWRhdGFbdGhpcy5fY29sdW1uTWV0YWRhdGEubGVuZ3RoIC0gMV07XG4gICAgICByZXR1cm4gZGF0dW0ub2Zmc2V0ICsgZGF0dW0uc2l6ZTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfZ2V0VG90YWxSb3dzSGVpZ2h0JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX2dldFRvdGFsUm93c0hlaWdodCgpIHtcbiAgICAgIGlmICh0aGlzLl9yb3dNZXRhZGF0YS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgICB9XG5cbiAgICAgIHZhciBkYXR1bSA9IHRoaXMuX3Jvd01ldGFkYXRhW3RoaXMuX3Jvd01ldGFkYXRhLmxlbmd0aCAtIDFdO1xuICAgICAgcmV0dXJuIGRhdHVtLm9mZnNldCArIGRhdHVtLnNpemU7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX2ludm9rZU9uR3JpZFJlbmRlcmVkSGVscGVyJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX2ludm9rZU9uR3JpZFJlbmRlcmVkSGVscGVyKCkge1xuICAgICAgdmFyIG9uU2VjdGlvblJlbmRlcmVkID0gdGhpcy5wcm9wcy5vblNlY3Rpb25SZW5kZXJlZDtcblxuXG4gICAgICB0aGlzLl9vbkdyaWRSZW5kZXJlZE1lbW9pemVyKHtcbiAgICAgICAgY2FsbGJhY2s6IG9uU2VjdGlvblJlbmRlcmVkLFxuICAgICAgICBpbmRpY2VzOiB7XG4gICAgICAgICAgY29sdW1uT3ZlcnNjYW5TdGFydEluZGV4OiB0aGlzLl9jb2x1bW5TdGFydEluZGV4LFxuICAgICAgICAgIGNvbHVtbk92ZXJzY2FuU3RvcEluZGV4OiB0aGlzLl9jb2x1bW5TdG9wSW5kZXgsXG4gICAgICAgICAgY29sdW1uU3RhcnRJbmRleDogdGhpcy5fcmVuZGVyZWRDb2x1bW5TdGFydEluZGV4LFxuICAgICAgICAgIGNvbHVtblN0b3BJbmRleDogdGhpcy5fcmVuZGVyZWRDb2x1bW5TdG9wSW5kZXgsXG4gICAgICAgICAgcm93T3ZlcnNjYW5TdGFydEluZGV4OiB0aGlzLl9yb3dTdGFydEluZGV4LFxuICAgICAgICAgIHJvd092ZXJzY2FuU3RvcEluZGV4OiB0aGlzLl9yb3dTdG9wSW5kZXgsXG4gICAgICAgICAgcm93U3RhcnRJbmRleDogdGhpcy5fcmVuZGVyZWRSb3dTdGFydEluZGV4LFxuICAgICAgICAgIHJvd1N0b3BJbmRleDogdGhpcy5fcmVuZGVyZWRSb3dTdG9wSW5kZXhcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX2ludm9rZU9uU2Nyb2xsTWVtb2l6ZXInLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfaW52b2tlT25TY3JvbGxNZW1vaXplcihfcmVmKSB7XG4gICAgICB2YXIgc2Nyb2xsTGVmdCA9IF9yZWYuc2Nyb2xsTGVmdDtcbiAgICAgIHZhciBzY3JvbGxUb3AgPSBfcmVmLnNjcm9sbFRvcDtcbiAgICAgIHZhciB0b3RhbENvbHVtbnNXaWR0aCA9IF9yZWYudG90YWxDb2x1bW5zV2lkdGg7XG4gICAgICB2YXIgdG90YWxSb3dzSGVpZ2h0ID0gX3JlZi50b3RhbFJvd3NIZWlnaHQ7XG4gICAgICB2YXIgX3Byb3BzNCA9IHRoaXMucHJvcHM7XG4gICAgICB2YXIgaGVpZ2h0ID0gX3Byb3BzNC5oZWlnaHQ7XG4gICAgICB2YXIgb25TY3JvbGwgPSBfcHJvcHM0Lm9uU2Nyb2xsO1xuICAgICAgdmFyIHdpZHRoID0gX3Byb3BzNC53aWR0aDtcblxuXG4gICAgICB0aGlzLl9vblNjcm9sbE1lbW9pemVyKHtcbiAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uIGNhbGxiYWNrKF9yZWYyKSB7XG4gICAgICAgICAgdmFyIHNjcm9sbExlZnQgPSBfcmVmMi5zY3JvbGxMZWZ0O1xuICAgICAgICAgIHZhciBzY3JvbGxUb3AgPSBfcmVmMi5zY3JvbGxUb3A7XG5cbiAgICAgICAgICBvblNjcm9sbCh7XG4gICAgICAgICAgICBjbGllbnRIZWlnaHQ6IGhlaWdodCxcbiAgICAgICAgICAgIGNsaWVudFdpZHRoOiB3aWR0aCxcbiAgICAgICAgICAgIHNjcm9sbEhlaWdodDogdG90YWxSb3dzSGVpZ2h0LFxuICAgICAgICAgICAgc2Nyb2xsTGVmdDogc2Nyb2xsTGVmdCxcbiAgICAgICAgICAgIHNjcm9sbFRvcDogc2Nyb2xsVG9wLFxuICAgICAgICAgICAgc2Nyb2xsV2lkdGg6IHRvdGFsQ29sdW1uc1dpZHRoXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGluZGljZXM6IHtcbiAgICAgICAgICBzY3JvbGxMZWZ0OiBzY3JvbGxMZWZ0LFxuICAgICAgICAgIHNjcm9sbFRvcDogc2Nyb2xsVG9wXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZXMgdGhlIHN0YXRlIGR1cmluZyB0aGUgbmV4dCBhbmltYXRpb24gZnJhbWUuXG4gICAgICogVXNlIHRoaXMgbWV0aG9kIHRvIGF2b2lkIG11bHRpcGxlIHJlbmRlcnMgaW4gYSBzbWFsbCBzcGFuIG9mIHRpbWUuXG4gICAgICogVGhpcyBoZWxwcyBwZXJmb3JtYW5jZSBmb3IgYnVyc3R5IGV2ZW50cyAobGlrZSBvblNjcm9sbCkuXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ19zZXROZXh0U3RhdGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfc2V0TmV4dFN0YXRlKHN0YXRlKSB7XG4gICAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuICAgICAgaWYgKHRoaXMuX3NldE5leHRTdGF0ZUFuaW1hdGlvbkZyYW1lSWQpIHtcbiAgICAgICAgX3JhZjIuZGVmYXVsdC5jYW5jZWwodGhpcy5fc2V0TmV4dFN0YXRlQW5pbWF0aW9uRnJhbWVJZCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX3NldE5leHRTdGF0ZUFuaW1hdGlvbkZyYW1lSWQgPSAoMCwgX3JhZjIuZGVmYXVsdCkoZnVuY3Rpb24gKCkge1xuICAgICAgICBfdGhpczMuX3NldE5leHRTdGF0ZUFuaW1hdGlvbkZyYW1lSWQgPSBudWxsO1xuICAgICAgICBfdGhpczMuc2V0U3RhdGUoc3RhdGUpO1xuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX3NldFNjcm9sbFBvc2l0aW9uJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX3NldFNjcm9sbFBvc2l0aW9uKF9yZWYzKSB7XG4gICAgICB2YXIgc2Nyb2xsTGVmdCA9IF9yZWYzLnNjcm9sbExlZnQ7XG4gICAgICB2YXIgc2Nyb2xsVG9wID0gX3JlZjMuc2Nyb2xsVG9wO1xuXG4gICAgICB2YXIgbmV3U3RhdGUgPSB7XG4gICAgICAgIHNjcm9sbFBvc2l0aW9uQ2hhbmdlUmVhc29uOiBTQ1JPTExfUE9TSVRJT05fQ0hBTkdFX1JFQVNPTlMuUkVRVUVTVEVEXG4gICAgICB9O1xuXG4gICAgICBpZiAoc2Nyb2xsTGVmdCA+PSAwKSB7XG4gICAgICAgIG5ld1N0YXRlLnNjcm9sbExlZnQgPSBzY3JvbGxMZWZ0O1xuICAgICAgfVxuXG4gICAgICBpZiAoc2Nyb2xsVG9wID49IDApIHtcbiAgICAgICAgbmV3U3RhdGUuc2Nyb2xsVG9wID0gc2Nyb2xsVG9wO1xuICAgICAgfVxuXG4gICAgICBpZiAoc2Nyb2xsTGVmdCA+PSAwICYmIHNjcm9sbExlZnQgIT09IHRoaXMuc3RhdGUuc2Nyb2xsTGVmdCB8fCBzY3JvbGxUb3AgPj0gMCAmJiBzY3JvbGxUb3AgIT09IHRoaXMuc3RhdGUuc2Nyb2xsVG9wKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUobmV3U3RhdGUpO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ191cGRhdGVTY3JvbGxMZWZ0Rm9yU2Nyb2xsVG9Db2x1bW4nLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfdXBkYXRlU2Nyb2xsTGVmdEZvclNjcm9sbFRvQ29sdW1uKHNjcm9sbFRvQ29sdW1uT3ZlcnJpZGUpIHtcbiAgICAgIHZhciBzY3JvbGxUb0NvbHVtbiA9IHNjcm9sbFRvQ29sdW1uT3ZlcnJpZGUgIT0gbnVsbCA/IHNjcm9sbFRvQ29sdW1uT3ZlcnJpZGUgOiB0aGlzLnByb3BzLnNjcm9sbFRvQ29sdW1uO1xuXG4gICAgICB2YXIgd2lkdGggPSB0aGlzLnByb3BzLndpZHRoO1xuICAgICAgdmFyIHNjcm9sbExlZnQgPSB0aGlzLnN0YXRlLnNjcm9sbExlZnQ7XG5cblxuICAgICAgaWYgKHNjcm9sbFRvQ29sdW1uID49IDApIHtcbiAgICAgICAgdmFyIGNhbGN1bGF0ZWRTY3JvbGxMZWZ0ID0gKDAsIF9HcmlkVXRpbHMuZ2V0VXBkYXRlZE9mZnNldEZvckluZGV4KSh7XG4gICAgICAgICAgY2VsbE1ldGFkYXRhOiB0aGlzLl9jb2x1bW5NZXRhZGF0YSxcbiAgICAgICAgICBjb250YWluZXJTaXplOiB3aWR0aCxcbiAgICAgICAgICBjdXJyZW50T2Zmc2V0OiBzY3JvbGxMZWZ0LFxuICAgICAgICAgIHRhcmdldEluZGV4OiBzY3JvbGxUb0NvbHVtblxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoc2Nyb2xsTGVmdCAhPT0gY2FsY3VsYXRlZFNjcm9sbExlZnQpIHtcbiAgICAgICAgICB0aGlzLl9zZXRTY3JvbGxQb3NpdGlvbih7XG4gICAgICAgICAgICBzY3JvbGxMZWZ0OiBjYWxjdWxhdGVkU2Nyb2xsTGVmdFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX3VwZGF0ZVNjcm9sbFRvcEZvclNjcm9sbFRvUm93JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX3VwZGF0ZVNjcm9sbFRvcEZvclNjcm9sbFRvUm93KHNjcm9sbFRvUm93T3ZlcnJpZGUpIHtcbiAgICAgIHZhciBzY3JvbGxUb1JvdyA9IHNjcm9sbFRvUm93T3ZlcnJpZGUgIT0gbnVsbCA/IHNjcm9sbFRvUm93T3ZlcnJpZGUgOiB0aGlzLnByb3BzLnNjcm9sbFRvUm93O1xuXG4gICAgICB2YXIgaGVpZ2h0ID0gdGhpcy5wcm9wcy5oZWlnaHQ7XG4gICAgICB2YXIgc2Nyb2xsVG9wID0gdGhpcy5zdGF0ZS5zY3JvbGxUb3A7XG5cblxuICAgICAgaWYgKHNjcm9sbFRvUm93ID49IDApIHtcbiAgICAgICAgdmFyIGNhbGN1bGF0ZWRTY3JvbGxUb3AgPSAoMCwgX0dyaWRVdGlscy5nZXRVcGRhdGVkT2Zmc2V0Rm9ySW5kZXgpKHtcbiAgICAgICAgICBjZWxsTWV0YWRhdGE6IHRoaXMuX3Jvd01ldGFkYXRhLFxuICAgICAgICAgIGNvbnRhaW5lclNpemU6IGhlaWdodCxcbiAgICAgICAgICBjdXJyZW50T2Zmc2V0OiBzY3JvbGxUb3AsXG4gICAgICAgICAgdGFyZ2V0SW5kZXg6IHNjcm9sbFRvUm93XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChzY3JvbGxUb3AgIT09IGNhbGN1bGF0ZWRTY3JvbGxUb3ApIHtcbiAgICAgICAgICB0aGlzLl9zZXRTY3JvbGxQb3NpdGlvbih7XG4gICAgICAgICAgICBzY3JvbGxUb3A6IGNhbGN1bGF0ZWRTY3JvbGxUb3BcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19vblNjcm9sbCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9vblNjcm9sbChldmVudCkge1xuICAgICAgLy8gSW4gY2VydGFpbiBlZGdlLWNhc2VzIFJlYWN0IGRpc3BhdGNoZXMgYW4gb25TY3JvbGwgZXZlbnQgd2l0aCBhbiBpbnZhbGlkIHRhcmdldC5zY3JvbGxMZWZ0IC8gdGFyZ2V0LnNjcm9sbFRvcC5cbiAgICAgIC8vIFRoaXMgaW52YWxpZCBldmVudCBjYW4gYmUgZGV0ZWN0ZWQgYnkgY29tcGFyaW5nIGV2ZW50LnRhcmdldCB0byB0aGlzIGNvbXBvbmVudCdzIHNjcm9sbGFibGUgRE9NIGVsZW1lbnQuXG4gICAgICAvLyBTZWUgaXNzdWUgIzQwNCBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAgICAgIGlmIChldmVudC50YXJnZXQgIT09IHRoaXMucmVmcy5zY3JvbGxpbmdDb250YWluZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBQcmV2ZW50IHBvaW50ZXIgZXZlbnRzIGZyb20gaW50ZXJydXB0aW5nIGEgc21vb3RoIHNjcm9sbFxuICAgICAgdGhpcy5fZW5hYmxlUG9pbnRlckV2ZW50c0FmdGVyRGVsYXkoKTtcblxuICAgICAgLy8gV2hlbiB0aGlzIGNvbXBvbmVudCBpcyBzaHJ1bmsgZHJhc3RpY2FsbHksIFJlYWN0IGRpc3BhdGNoZXMgYSBzZXJpZXMgb2YgYmFjay10by1iYWNrIHNjcm9sbCBldmVudHMsXG4gICAgICAvLyBHcmFkdWFsbHkgY29udmVyZ2luZyBvbiBhIHNjcm9sbFRvcCB0aGF0IGlzIHdpdGhpbiB0aGUgYm91bmRzIG9mIHRoZSBuZXcsIHNtYWxsZXIgaGVpZ2h0LlxuICAgICAgLy8gVGhpcyBjYXVzZXMgYSBzZXJpZXMgb2YgcmFwaWQgcmVuZGVycyB0aGF0IGlzIHNsb3cgZm9yIGxvbmcgbGlzdHMuXG4gICAgICAvLyBXZSBjYW4gYXZvaWQgdGhhdCBieSBkb2luZyBzb21lIHNpbXBsZSBib3VuZHMgY2hlY2tpbmcgdG8gZW5zdXJlIHRoYXQgc2Nyb2xsVG9wIG5ldmVyIGV4Y2VlZHMgdGhlIHRvdGFsIGhlaWdodC5cbiAgICAgIHZhciBfcHJvcHM1ID0gdGhpcy5wcm9wcztcbiAgICAgIHZhciBoZWlnaHQgPSBfcHJvcHM1LmhlaWdodDtcbiAgICAgIHZhciB3aWR0aCA9IF9wcm9wczUud2lkdGg7XG5cbiAgICAgIHZhciBzY3JvbGxiYXJTaXplID0gdGhpcy5fc2Nyb2xsYmFyU2l6ZTtcbiAgICAgIHZhciB0b3RhbFJvd3NIZWlnaHQgPSB0aGlzLl9nZXRUb3RhbFJvd3NIZWlnaHQoKTtcbiAgICAgIHZhciB0b3RhbENvbHVtbnNXaWR0aCA9IHRoaXMuX2dldFRvdGFsQ29sdW1uc1dpZHRoKCk7XG4gICAgICB2YXIgc2Nyb2xsTGVmdCA9IE1hdGgubWluKHRvdGFsQ29sdW1uc1dpZHRoIC0gd2lkdGggKyBzY3JvbGxiYXJTaXplLCBldmVudC50YXJnZXQuc2Nyb2xsTGVmdCk7XG4gICAgICB2YXIgc2Nyb2xsVG9wID0gTWF0aC5taW4odG90YWxSb3dzSGVpZ2h0IC0gaGVpZ2h0ICsgc2Nyb2xsYmFyU2l6ZSwgZXZlbnQudGFyZ2V0LnNjcm9sbFRvcCk7XG5cbiAgICAgIC8vIENlcnRhaW4gZGV2aWNlcyAobGlrZSBBcHBsZSB0b3VjaHBhZCkgcmFwaWQtZmlyZSBkdXBsaWNhdGUgZXZlbnRzLlxuICAgICAgLy8gRG9uJ3QgZm9yY2UgYSByZS1yZW5kZXIgaWYgdGhpcyBpcyB0aGUgY2FzZS5cbiAgICAgIC8vIFRoZSBtb3VzZSBtYXkgbW92ZSBmYXN0ZXIgdGhlbiB0aGUgYW5pbWF0aW9uIGZyYW1lIGRvZXMuXG4gICAgICAvLyBVc2UgcmVxdWVzdEFuaW1hdGlvbkZyYW1lIHRvIGF2b2lkIG92ZXItdXBkYXRpbmcuXG4gICAgICBpZiAodGhpcy5zdGF0ZS5zY3JvbGxMZWZ0ICE9PSBzY3JvbGxMZWZ0IHx8IHRoaXMuc3RhdGUuc2Nyb2xsVG9wICE9PSBzY3JvbGxUb3ApIHtcbiAgICAgICAgLy8gQnJvd3NlcnMgd2l0aCBjYW5jZWxhYmxlIHNjcm9sbCBldmVudHMgKGVnLiBGaXJlZm94KSBpbnRlcnJ1cHQgc2Nyb2xsaW5nIGFuaW1hdGlvbnMgaWYgc2Nyb2xsVG9wL3Njcm9sbExlZnQgaXMgc2V0LlxuICAgICAgICAvLyBPdGhlciBicm93c2VycyAoZWcuIFNhZmFyaSkgZG9uJ3Qgc2Nyb2xsIGFzIHdlbGwgd2l0aG91dCB0aGUgaGVscCB1bmRlciBjZXJ0YWluIGNvbmRpdGlvbnMgKERPTSBvciBzdHlsZSBjaGFuZ2VzIGR1cmluZyBzY3JvbGxpbmcpLlxuICAgICAgICAvLyBBbGwgdGhpbmdzIGNvbnNpZGVyZWQsIHRoaXMgc2VlbXMgdG8gYmUgdGhlIGJlc3QgY3VycmVudCB3b3JrIGFyb3VuZCB0aGF0IEknbSBhd2FyZSBvZi5cbiAgICAgICAgLy8gRm9yIG1vcmUgaW5mb3JtYXRpb24gc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9idmF1Z2huL3JlYWN0LXZpcnR1YWxpemVkL3B1bGwvMTI0XG4gICAgICAgIHZhciBzY3JvbGxQb3NpdGlvbkNoYW5nZVJlYXNvbiA9IGV2ZW50LmNhbmNlbGFibGUgPyBTQ1JPTExfUE9TSVRJT05fQ0hBTkdFX1JFQVNPTlMuT0JTRVJWRUQgOiBTQ1JPTExfUE9TSVRJT05fQ0hBTkdFX1JFQVNPTlMuUkVRVUVTVEVEO1xuXG4gICAgICAgIGlmICghdGhpcy5zdGF0ZS5pc1Njcm9sbGluZykge1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgaXNTY3JvbGxpbmc6IHRydWVcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3NldE5leHRTdGF0ZSh7XG4gICAgICAgICAgaXNTY3JvbGxpbmc6IHRydWUsXG4gICAgICAgICAgc2Nyb2xsTGVmdDogc2Nyb2xsTGVmdCxcbiAgICAgICAgICBzY3JvbGxQb3NpdGlvbkNoYW5nZVJlYXNvbjogc2Nyb2xsUG9zaXRpb25DaGFuZ2VSZWFzb24sXG4gICAgICAgICAgc2Nyb2xsVG9wOiBzY3JvbGxUb3BcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX2ludm9rZU9uU2Nyb2xsTWVtb2l6ZXIoeyBzY3JvbGxMZWZ0OiBzY3JvbGxMZWZ0LCBzY3JvbGxUb3A6IHNjcm9sbFRvcCwgdG90YWxDb2x1bW5zV2lkdGg6IHRvdGFsQ29sdW1uc1dpZHRoLCB0b3RhbFJvd3NIZWlnaHQ6IHRvdGFsUm93c0hlaWdodCB9KTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gR3JpZDtcbn0oX3JlYWN0LkNvbXBvbmVudCk7XG5cbkdyaWQucHJvcFR5cGVzID0ge1xuICAnYXJpYS1sYWJlbCc6IF9yZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuXG4gIC8qKlxuICAgKiBPcHRpb25hbCBjdXN0b20gQ1NTIGNsYXNzIG5hbWUgdG8gYXR0YWNoIHRvIHJvb3QgR3JpZCBlbGVtZW50LlxuICAgKi9cbiAgY2xhc3NOYW1lOiBfcmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcblxuICAvKipcbiAgICogTnVtYmVyIG9mIGNvbHVtbnMgaW4gZ3JpZC5cbiAgICovXG4gIGNvbHVtbnNDb3VudDogX3JlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcblxuICAvKipcbiAgICogRWl0aGVyIGEgZml4ZWQgY29sdW1uIHdpZHRoIChudW1iZXIpIG9yIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSB3aWR0aCBvZiBhIGNvbHVtbiBnaXZlbiBpdHMgaW5kZXguXG4gICAqIFNob3VsZCBpbXBsZW1lbnQgdGhlIGZvbGxvd2luZyBpbnRlcmZhY2U6IChpbmRleDogbnVtYmVyKTogbnVtYmVyXG4gICAqL1xuICBjb2x1bW5XaWR0aDogX3JlYWN0LlByb3BUeXBlcy5vbmVPZlR5cGUoW19yZWFjdC5Qcm9wVHlwZXMubnVtYmVyLCBfcmVhY3QuUHJvcFR5cGVzLmZ1bmNdKS5pc1JlcXVpcmVkLFxuXG4gIC8qKlxuICAgKiBIZWlnaHQgb2YgR3JpZDsgdGhpcyBwcm9wZXJ0eSBkZXRlcm1pbmVzIHRoZSBudW1iZXIgb2YgdmlzaWJsZSAodnMgdmlydHVhbGl6ZWQpIHJvd3MuXG4gICAqL1xuICBoZWlnaHQ6IF9yZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG5cbiAgLyoqXG4gICAqIE9wdGlvbmFsIHJlbmRlcmVyIHRvIGJlIHVzZWQgaW4gcGxhY2Ugb2Ygcm93cyB3aGVuIGVpdGhlciA6cm93c0NvdW50IG9yIDpjb2x1bW5zQ291bnQgaXMgMC5cbiAgICovXG4gIG5vQ29udGVudFJlbmRlcmVyOiBfcmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcblxuICAvKipcbiAgICogQ2FsbGJhY2sgaW52b2tlZCB3aGVuZXZlciB0aGUgc2Nyb2xsIG9mZnNldCBjaGFuZ2VzIHdpdGhpbiB0aGUgaW5uZXIgc2Nyb2xsYWJsZSByZWdpb24uXG4gICAqIFRoaXMgY2FsbGJhY2sgY2FuIGJlIHVzZWQgdG8gc3luYyBzY3JvbGxpbmcgYmV0d2VlbiBsaXN0cywgdGFibGVzLCBvciBncmlkcy5cbiAgICogKHsgY2xpZW50SGVpZ2h0LCBjbGllbnRXaWR0aCwgc2Nyb2xsSGVpZ2h0LCBzY3JvbGxMZWZ0LCBzY3JvbGxUb3AsIHNjcm9sbFdpZHRoIH0pOiB2b2lkXG4gICAqL1xuICBvblNjcm9sbDogX3JlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG5cbiAgLyoqXG4gICAqIENhbGxiYWNrIGludm9rZWQgd2l0aCBpbmZvcm1hdGlvbiBhYm91dCB0aGUgc2VjdGlvbiBvZiB0aGUgR3JpZCB0aGF0IHdhcyBqdXN0IHJlbmRlcmVkLlxuICAgKiAoeyBjb2x1bW5TdGFydEluZGV4LCBjb2x1bW5TdG9wSW5kZXgsIHJvd1N0YXJ0SW5kZXgsIHJvd1N0b3BJbmRleCB9KTogdm9pZFxuICAgKi9cbiAgb25TZWN0aW9uUmVuZGVyZWQ6IF9yZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuXG4gIC8qKlxuICAgKiBOdW1iZXIgb2YgY29sdW1ucyB0byByZW5kZXIgYmVmb3JlL2FmdGVyIHRoZSB2aXNpYmxlIHNlY3Rpb24gb2YgdGhlIGdyaWQuXG4gICAqIFRoZXNlIGNvbHVtbnMgY2FuIGhlbHAgZm9yIHNtb290aGVyIHNjcm9sbGluZyBvbiB0b3VjaCBkZXZpY2VzIG9yIGJyb3dzZXJzIHRoYXQgc2VuZCBzY3JvbGwgZXZlbnRzIGluZnJlcXVlbnRseS5cbiAgICovXG4gIG92ZXJzY2FuQ29sdW1uc0NvdW50OiBfcmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuXG4gIC8qKlxuICAgKiBOdW1iZXIgb2Ygcm93cyB0byByZW5kZXIgYWJvdmUvYmVsb3cgdGhlIHZpc2libGUgc2VjdGlvbiBvZiB0aGUgZ3JpZC5cbiAgICogVGhlc2Ugcm93cyBjYW4gaGVscCBmb3Igc21vb3RoZXIgc2Nyb2xsaW5nIG9uIHRvdWNoIGRldmljZXMgb3IgYnJvd3NlcnMgdGhhdCBzZW5kIHNjcm9sbCBldmVudHMgaW5mcmVxdWVudGx5LlxuICAgKi9cbiAgb3ZlcnNjYW5Sb3dzQ291bnQ6IF9yZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG5cbiAgLyoqXG4gICAqIFJlc3BvbnNpYmxlIGZvciByZW5kZXJpbmcgYSBjZWxsIGdpdmVuIGFuIHJvdyBhbmQgY29sdW1uIGluZGV4LlxuICAgKiBTaG91bGQgaW1wbGVtZW50IHRoZSBmb2xsb3dpbmcgaW50ZXJmYWNlOiAoeyBjb2x1bW5JbmRleDogbnVtYmVyLCByb3dJbmRleDogbnVtYmVyIH0pOiBQcm9wVHlwZXMubm9kZVxuICAgKi9cbiAgcmVuZGVyQ2VsbDogX3JlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG5cbiAgLyoqXG4gICAqIFJlc3BvbnNpYmxlIGZvciByZW5kZXJpbmcgYSBncm91cCBvZiBjZWxscyBnaXZlbiB0aGVpciBpbmRleCByYW5nZXMuXG4gICAqIFNob3VsZCBpbXBsZW1lbnQgdGhlIGZvbGxvd2luZyBpbnRlcmZhY2U6ICh7XG4gICAqICAgY29sdW1uTWV0YWRhdGE6QXJyYXk8T2JqZWN0PixcbiAgICogICBjb2x1bW5TdGFydEluZGV4OiBudW1iZXIsXG4gICAqICAgY29sdW1uU3RvcEluZGV4OiBudW1iZXIsXG4gICAqICAgcmVuZGVyQ2VsbDogRnVuY3Rpb24sXG4gICAqICAgcm93TWV0YWRhdGE6QXJyYXk8T2JqZWN0PixcbiAgICogICByb3dTdGFydEluZGV4OiBudW1iZXIsXG4gICAqICAgcm93U3RvcEluZGV4OiBudW1iZXJcbiAgICogfSk6IEFycmF5PFByb3BUeXBlcy5ub2RlPlxuICAgKi9cbiAgcmVuZGVyQ2VsbFJhbmdlczogX3JlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG5cbiAgLyoqXG4gICAqIEVpdGhlciBhIGZpeGVkIHJvdyBoZWlnaHQgKG51bWJlcikgb3IgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIGhlaWdodCBvZiBhIHJvdyBnaXZlbiBpdHMgaW5kZXguXG4gICAqIFNob3VsZCBpbXBsZW1lbnQgdGhlIGZvbGxvd2luZyBpbnRlcmZhY2U6IChpbmRleDogbnVtYmVyKTogbnVtYmVyXG4gICAqL1xuICByb3dIZWlnaHQ6IF9yZWFjdC5Qcm9wVHlwZXMub25lT2ZUeXBlKFtfcmVhY3QuUHJvcFR5cGVzLm51bWJlciwgX3JlYWN0LlByb3BUeXBlcy5mdW5jXSkuaXNSZXF1aXJlZCxcblxuICAvKipcbiAgICogTnVtYmVyIG9mIHJvd3MgaW4gZ3JpZC5cbiAgICovXG4gIHJvd3NDb3VudDogX3JlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcblxuICAvKiogSG9yaXpvbnRhbCBvZmZzZXQuICovXG4gIHNjcm9sbExlZnQ6IF9yZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuXG4gIC8qKlxuICAgKiBDb2x1bW4gaW5kZXggdG8gZW5zdXJlIHZpc2libGUgKGJ5IGZvcmNlZnVsbHkgc2Nyb2xsaW5nIGlmIG5lY2Vzc2FyeSlcbiAgICovXG4gIHNjcm9sbFRvQ29sdW1uOiBfcmVhY3QuUHJvcFR5cGVzLm51bWJlcixcblxuICAvKiogVmVydGljYWwgb2Zmc2V0LiAqL1xuICBzY3JvbGxUb3A6IF9yZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuXG4gIC8qKlxuICAgKiBSb3cgaW5kZXggdG8gZW5zdXJlIHZpc2libGUgKGJ5IGZvcmNlZnVsbHkgc2Nyb2xsaW5nIGlmIG5lY2Vzc2FyeSlcbiAgICovXG4gIHNjcm9sbFRvUm93OiBfcmVhY3QuUHJvcFR5cGVzLm51bWJlcixcblxuICAvKipcbiAgICogV2lkdGggb2YgR3JpZDsgdGhpcyBwcm9wZXJ0eSBkZXRlcm1pbmVzIHRoZSBudW1iZXIgb2YgdmlzaWJsZSAodnMgdmlydHVhbGl6ZWQpIGNvbHVtbnMuXG4gICAqL1xuICB3aWR0aDogX3JlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZFxufTtcbkdyaWQuZGVmYXVsdFByb3BzID0ge1xuICAnYXJpYS1sYWJlbCc6ICdncmlkJyxcbiAgbm9Db250ZW50UmVuZGVyZXI6IGZ1bmN0aW9uIG5vQ29udGVudFJlbmRlcmVyKCkge1xuICAgIHJldHVybiBudWxsO1xuICB9LFxuICBvblNjcm9sbDogZnVuY3Rpb24gb25TY3JvbGwoKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH0sXG4gIG9uU2VjdGlvblJlbmRlcmVkOiBmdW5jdGlvbiBvblNlY3Rpb25SZW5kZXJlZCgpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfSxcbiAgb3ZlcnNjYW5Db2x1bW5zQ291bnQ6IDAsXG4gIG92ZXJzY2FuUm93c0NvdW50OiAxMCxcbiAgcmVuZGVyQ2VsbFJhbmdlczogZGVmYXVsdFJlbmRlckNlbGxSYW5nZXNcbn07XG5leHBvcnRzLmRlZmF1bHQgPSBHcmlkO1xuXG5cbmZ1bmN0aW9uIGRlZmF1bHRSZW5kZXJDZWxsUmFuZ2VzKF9yZWY0KSB7XG4gIHZhciBjb2x1bW5NZXRhZGF0YSA9IF9yZWY0LmNvbHVtbk1ldGFkYXRhO1xuICB2YXIgY29sdW1uU3RhcnRJbmRleCA9IF9yZWY0LmNvbHVtblN0YXJ0SW5kZXg7XG4gIHZhciBjb2x1bW5TdG9wSW5kZXggPSBfcmVmNC5jb2x1bW5TdG9wSW5kZXg7XG4gIHZhciByZW5kZXJDZWxsID0gX3JlZjQucmVuZGVyQ2VsbDtcbiAgdmFyIHJvd01ldGFkYXRhID0gX3JlZjQucm93TWV0YWRhdGE7XG4gIHZhciByb3dTdGFydEluZGV4ID0gX3JlZjQucm93U3RhcnRJbmRleDtcbiAgdmFyIHJvd1N0b3BJbmRleCA9IF9yZWY0LnJvd1N0b3BJbmRleDtcblxuICB2YXIgcmVuZGVyZWRDZWxscyA9IFtdO1xuXG4gIGZvciAodmFyIHJvd0luZGV4ID0gcm93U3RhcnRJbmRleDsgcm93SW5kZXggPD0gcm93U3RvcEluZGV4OyByb3dJbmRleCsrKSB7XG4gICAgdmFyIHJvd0RhdHVtID0gcm93TWV0YWRhdGFbcm93SW5kZXhdO1xuXG4gICAgZm9yICh2YXIgY29sdW1uSW5kZXggPSBjb2x1bW5TdGFydEluZGV4OyBjb2x1bW5JbmRleCA8PSBjb2x1bW5TdG9wSW5kZXg7IGNvbHVtbkluZGV4KyspIHtcbiAgICAgIHZhciBjb2x1bW5EYXR1bSA9IGNvbHVtbk1ldGFkYXRhW2NvbHVtbkluZGV4XTtcbiAgICAgIHZhciByZW5kZXJlZENlbGwgPSByZW5kZXJDZWxsKHsgY29sdW1uSW5kZXg6IGNvbHVtbkluZGV4LCByb3dJbmRleDogcm93SW5kZXggfSk7XG4gICAgICB2YXIga2V5ID0gcm93SW5kZXggKyAnLScgKyBjb2x1bW5JbmRleDtcblxuICAgICAgLy8gYW55IG90aGVyIGZhbHNleSB2YWx1ZSB3aWxsIGJlIHJlbmRlcmVkXG4gICAgICAvLyBhcyBhIHRleHQgbm9kZSBieSBSZWFjdFxuICAgICAgaWYgKHJlbmRlcmVkQ2VsbCA9PSBudWxsIHx8IHJlbmRlcmVkQ2VsbCA9PT0gZmFsc2UpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIHZhciBjaGlsZCA9IF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAnZGl2JyxcbiAgICAgICAge1xuICAgICAgICAgIGtleToga2V5LFxuICAgICAgICAgIGNsYXNzTmFtZTogJ0dyaWRfX2NlbGwnLFxuICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICBoZWlnaHQ6IHJvd0RhdHVtLnNpemUsXG4gICAgICAgICAgICBsZWZ0OiBjb2x1bW5EYXR1bS5vZmZzZXQsXG4gICAgICAgICAgICB0b3A6IHJvd0RhdHVtLm9mZnNldCxcbiAgICAgICAgICAgIHdpZHRoOiBjb2x1bW5EYXR1bS5zaXplXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICByZW5kZXJlZENlbGxcbiAgICAgICk7XG5cbiAgICAgIHJlbmRlcmVkQ2VsbHMucHVzaChjaGlsZCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlbmRlcmVkQ2VsbHM7XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5jb21wdXRlQ2VsbE1ldGFkYXRhQW5kVXBkYXRlU2Nyb2xsT2Zmc2V0SGVscGVyID0gY29tcHV0ZUNlbGxNZXRhZGF0YUFuZFVwZGF0ZVNjcm9sbE9mZnNldEhlbHBlcjtcbmV4cG9ydHMuY3JlYXRlQ2FsbGJhY2tNZW1vaXplciA9IGNyZWF0ZUNhbGxiYWNrTWVtb2l6ZXI7XG5leHBvcnRzLmZpbmROZWFyZXN0Q2VsbCA9IGZpbmROZWFyZXN0Q2VsbDtcbmV4cG9ydHMuZ2V0T3ZlcnNjYW5JbmRpY2VzID0gZ2V0T3ZlcnNjYW5JbmRpY2VzO1xuZXhwb3J0cy5nZXRVcGRhdGVkT2Zmc2V0Rm9ySW5kZXggPSBnZXRVcGRhdGVkT2Zmc2V0Rm9ySW5kZXg7XG5leHBvcnRzLmdldFZpc2libGVDZWxsSW5kaWNlcyA9IGdldFZpc2libGVDZWxsSW5kaWNlcztcbmV4cG9ydHMuaW5pdENlbGxNZXRhZGF0YSA9IGluaXRDZWxsTWV0YWRhdGE7XG5leHBvcnRzLnVwZGF0ZVNjcm9sbEluZGV4SGVscGVyID0gdXBkYXRlU2Nyb2xsSW5kZXhIZWxwZXI7XG4vKipcbiAqIEhlbHBlciBtZXRob2QgdGhhdCBkZXRlcm1pbmVzIHdoZW4gdG8gcmVjYWxjdWxhdGUgcm93IG9yIGNvbHVtbiBtZXRhZGF0YS5cbiAqXG4gKiBAcGFyYW0gY2VsbHNDb3VudCBOdW1iZXIgb2Ygcm93cyBvciBjb2x1bW5zIGluIHRoZSBjdXJyZW50IGF4aXNcbiAqIEBwYXJhbSBjZWxsc1NpemUgV2lkdGggb3IgaGVpZ2h0IG9mIGNlbGxzIGZvciB0aGUgY3VycmVudCBheGlzXG4gKiBAcGFyYW0gY29tcHV0ZU1ldGFkYXRhQ2FsbGJhY2sgTWV0aG9kIHRvIGludm9rZSBpZiBjZWxsIG1ldGFkYXRhIHNob3VsZCBiZSByZWNhbGN1bGF0ZWRcbiAqIEBwYXJhbSBjb21wdXRlTWV0YWRhdGFDYWxsYmFja1Byb3BzIFBhcmFtZXRlcnMgdG8gcGFzcyB0byA6Y29tcHV0ZU1ldGFkYXRhQ2FsbGJhY2tcbiAqIEBwYXJhbSBjb21wdXRlTWV0YWRhdGFPbk5leHRVcGRhdGUgRmxhZyBzcGVjaWZ5aW5nIHRoYXQgbWV0YWRhdGEgc2hvdWxkIGJlIHJlY2FsY3VsYXRlZFxuICogQHBhcmFtIG5leHRDZWxsc0NvdW50IE5ld2x5IHVwZGF0ZWQgbnVtYmVyIG9mIHJvd3Mgb3IgY29sdW1ucyBpbiB0aGUgY3VycmVudCBheGlzXG4gKiBAcGFyYW0gbmV4dENlbGxzU2l6ZSBOZXdseSB1cGRhdGVkIHdpZHRoIG9yIGhlaWdodCBvZiBjZWxscyBmb3IgdGhlIGN1cnJlbnQgYXhpc1xuICogQHBhcmFtIG5leHRTY3JvbGxUb0luZGV4IE5ld2x5IHVwZGF0ZWQgc2Nyb2xsLXRvLWluZGV4XG4gKiBAcGFyYW0gc2Nyb2xsVG9JbmRleCBTY3JvbGwtdG8taW5kZXhcbiAqIEBwYXJhbSB1cGRhdGVTY3JvbGxPZmZzZXRGb3JTY3JvbGxUb0luZGV4IENhbGxiYWNrIHRvIGludm9rZSBpZiB0aGUgc2Nyb2xsIHBvc2l0aW9uIHNob3VsZCBiZSByZWNhbGN1bGF0ZWRcbiAqL1xuZnVuY3Rpb24gY29tcHV0ZUNlbGxNZXRhZGF0YUFuZFVwZGF0ZVNjcm9sbE9mZnNldEhlbHBlcihfcmVmKSB7XG4gIHZhciBjZWxsc0NvdW50ID0gX3JlZi5jZWxsc0NvdW50O1xuICB2YXIgY2VsbFNpemUgPSBfcmVmLmNlbGxTaXplO1xuICB2YXIgY29tcHV0ZU1ldGFkYXRhQ2FsbGJhY2sgPSBfcmVmLmNvbXB1dGVNZXRhZGF0YUNhbGxiYWNrO1xuICB2YXIgY29tcHV0ZU1ldGFkYXRhQ2FsbGJhY2tQcm9wcyA9IF9yZWYuY29tcHV0ZU1ldGFkYXRhQ2FsbGJhY2tQcm9wcztcbiAgdmFyIGNvbXB1dGVNZXRhZGF0YU9uTmV4dFVwZGF0ZSA9IF9yZWYuY29tcHV0ZU1ldGFkYXRhT25OZXh0VXBkYXRlO1xuICB2YXIgbmV4dENlbGxzQ291bnQgPSBfcmVmLm5leHRDZWxsc0NvdW50O1xuICB2YXIgbmV4dENlbGxTaXplID0gX3JlZi5uZXh0Q2VsbFNpemU7XG4gIHZhciBuZXh0U2Nyb2xsVG9JbmRleCA9IF9yZWYubmV4dFNjcm9sbFRvSW5kZXg7XG4gIHZhciBzY3JvbGxUb0luZGV4ID0gX3JlZi5zY3JvbGxUb0luZGV4O1xuICB2YXIgdXBkYXRlU2Nyb2xsT2Zmc2V0Rm9yU2Nyb2xsVG9JbmRleCA9IF9yZWYudXBkYXRlU2Nyb2xsT2Zmc2V0Rm9yU2Nyb2xsVG9JbmRleDtcblxuICAvLyBEb24ndCBjb21wYXJlIGNlbGwgc2l6ZXMgaWYgdGhleSBhcmUgZnVuY3Rpb25zIGJlY2F1c2UgaW5saW5lIGZ1bmN0aW9ucyB3b3VsZCBjYXVzZSBpbmZpbml0ZSBsb29wcy5cbiAgLy8gSW4gdGhhdCBldmVudCB1c2VycyBzaG91bGQgdXNlIHRoZSBtYW51YWwgcmVjb21wdXRlIG1ldGhvZHMgdG8gaW5mb3JtIG9mIGNoYW5nZXMuXG4gIGlmIChjb21wdXRlTWV0YWRhdGFPbk5leHRVcGRhdGUgfHwgY2VsbHNDb3VudCAhPT0gbmV4dENlbGxzQ291bnQgfHwgKHR5cGVvZiBjZWxsU2l6ZSA9PT0gJ251bWJlcicgfHwgdHlwZW9mIG5leHRDZWxsU2l6ZSA9PT0gJ251bWJlcicpICYmIGNlbGxTaXplICE9PSBuZXh0Q2VsbFNpemUpIHtcbiAgICBjb21wdXRlTWV0YWRhdGFDYWxsYmFjayhjb21wdXRlTWV0YWRhdGFDYWxsYmFja1Byb3BzKTtcblxuICAgIC8vIFVwZGF0ZWQgY2VsbCBtZXRhZGF0YSBtYXkgaGF2ZSBoaWRkZW4gdGhlIHByZXZpb3VzIHNjcm9sbGVkLXRvIGl0ZW0uXG4gICAgLy8gSW4gdGhpcyBjYXNlIHdlIHNob3VsZCBhbHNvIHVwZGF0ZSB0aGUgc2Nyb2xsVG9wIHRvIGVuc3VyZSBpdCBzdGF5cyB2aXNpYmxlLlxuICAgIGlmIChzY3JvbGxUb0luZGV4ID49IDAgJiYgc2Nyb2xsVG9JbmRleCA9PT0gbmV4dFNjcm9sbFRvSW5kZXgpIHtcbiAgICAgIHVwZGF0ZVNjcm9sbE9mZnNldEZvclNjcm9sbFRvSW5kZXgoKTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBIZWxwZXIgdXRpbGl0eSB0aGF0IHVwZGF0ZXMgdGhlIHNwZWNpZmllZCBjYWxsYmFjayB3aGVuZXZlciBhbnkgb2YgdGhlIHNwZWNpZmllZCBpbmRpY2VzIGhhdmUgY2hhbmdlZC5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlQ2FsbGJhY2tNZW1vaXplcigpIHtcbiAgdmFyIHJlcXVpcmVBbGxLZXlzID0gYXJndW1lbnRzLmxlbmd0aCA8PSAwIHx8IGFyZ3VtZW50c1swXSA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IGFyZ3VtZW50c1swXTtcblxuICB2YXIgY2FjaGVkSW5kaWNlcyA9IHt9O1xuXG4gIHJldHVybiBmdW5jdGlvbiAoX3JlZjIpIHtcbiAgICB2YXIgY2FsbGJhY2sgPSBfcmVmMi5jYWxsYmFjaztcbiAgICB2YXIgaW5kaWNlcyA9IF9yZWYyLmluZGljZXM7XG5cbiAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKGluZGljZXMpO1xuICAgIHZhciBhbGxJbml0aWFsaXplZCA9ICFyZXF1aXJlQWxsS2V5cyB8fCBrZXlzLmV2ZXJ5KGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIHJldHVybiBpbmRpY2VzW2tleV0gPj0gMDtcbiAgICB9KTtcbiAgICB2YXIgaW5kZXhDaGFuZ2VkID0ga2V5cy5zb21lKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIHJldHVybiBjYWNoZWRJbmRpY2VzW2tleV0gIT09IGluZGljZXNba2V5XTtcbiAgICB9KTtcblxuICAgIGNhY2hlZEluZGljZXMgPSBpbmRpY2VzO1xuXG4gICAgaWYgKGFsbEluaXRpYWxpemVkICYmIGluZGV4Q2hhbmdlZCkge1xuICAgICAgY2FsbGJhY2soaW5kaWNlcyk7XG4gICAgfVxuICB9O1xufVxuXG4vKipcbiAqIEJpbmFyeSBzZWFyY2ggZnVuY3Rpb24gaW5zcGlyZWQgYnkgcmVhY3QtaW5maW5pdGUuXG4gKi9cbmZ1bmN0aW9uIGZpbmROZWFyZXN0Q2VsbChfcmVmMykge1xuICB2YXIgY2VsbE1ldGFkYXRhID0gX3JlZjMuY2VsbE1ldGFkYXRhO1xuICB2YXIgbW9kZSA9IF9yZWYzLm1vZGU7XG4gIHZhciBvZmZzZXQgPSBfcmVmMy5vZmZzZXQ7XG5cbiAgdmFyIGhpZ2ggPSBjZWxsTWV0YWRhdGEubGVuZ3RoIC0gMTtcbiAgdmFyIGxvdyA9IDA7XG4gIHZhciBtaWRkbGUgPSB1bmRlZmluZWQ7XG4gIHZhciBjdXJyZW50T2Zmc2V0ID0gdW5kZWZpbmVkO1xuXG4gIC8vIFRPRE8gQWRkIGJldHRlciBndWFyZHMgaGVyZSBhZ2FpbnN0IE5hTiBvZmZzZXRcblxuICB3aGlsZSAobG93IDw9IGhpZ2gpIHtcbiAgICBtaWRkbGUgPSBsb3cgKyBNYXRoLmZsb29yKChoaWdoIC0gbG93KSAvIDIpO1xuICAgIGN1cnJlbnRPZmZzZXQgPSBjZWxsTWV0YWRhdGFbbWlkZGxlXS5vZmZzZXQ7XG5cbiAgICBpZiAoY3VycmVudE9mZnNldCA9PT0gb2Zmc2V0KSB7XG4gICAgICByZXR1cm4gbWlkZGxlO1xuICAgIH0gZWxzZSBpZiAoY3VycmVudE9mZnNldCA8IG9mZnNldCkge1xuICAgICAgbG93ID0gbWlkZGxlICsgMTtcbiAgICB9IGVsc2UgaWYgKGN1cnJlbnRPZmZzZXQgPiBvZmZzZXQpIHtcbiAgICAgIGhpZ2ggPSBtaWRkbGUgLSAxO1xuICAgIH1cbiAgfVxuXG4gIGlmIChtb2RlID09PSBmaW5kTmVhcmVzdENlbGwuRVFVQUxfT1JfTE9XRVIgJiYgbG93ID4gMCkge1xuICAgIHJldHVybiBsb3cgLSAxO1xuICB9IGVsc2UgaWYgKG1vZGUgPT09IGZpbmROZWFyZXN0Q2VsbC5FUVVBTF9PUl9ISUdIRVIgJiYgaGlnaCA8IGNlbGxNZXRhZGF0YS5sZW5ndGggLSAxKSB7XG4gICAgcmV0dXJuIGhpZ2ggKyAxO1xuICB9XG59XG5cbmZpbmROZWFyZXN0Q2VsbC5FUVVBTF9PUl9MT1dFUiA9IDE7XG5maW5kTmVhcmVzdENlbGwuRVFVQUxfT1JfSElHSEVSID0gMjtcblxuZnVuY3Rpb24gZ2V0T3ZlcnNjYW5JbmRpY2VzKF9yZWY0KSB7XG4gIHZhciBjZWxsc0NvdW50ID0gX3JlZjQuY2VsbHNDb3VudDtcbiAgdmFyIG92ZXJzY2FuQ2VsbHNDb3VudCA9IF9yZWY0Lm92ZXJzY2FuQ2VsbHNDb3VudDtcbiAgdmFyIHN0YXJ0SW5kZXggPSBfcmVmNC5zdGFydEluZGV4O1xuICB2YXIgc3RvcEluZGV4ID0gX3JlZjQuc3RvcEluZGV4O1xuXG4gIHJldHVybiB7XG4gICAgb3ZlcnNjYW5TdGFydEluZGV4OiBNYXRoLm1heCgwLCBzdGFydEluZGV4IC0gb3ZlcnNjYW5DZWxsc0NvdW50KSxcbiAgICBvdmVyc2NhblN0b3BJbmRleDogTWF0aC5taW4oY2VsbHNDb3VudCAtIDEsIHN0b3BJbmRleCArIG92ZXJzY2FuQ2VsbHNDb3VudClcbiAgfTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmVzIGEgbmV3IG9mZnNldCB0aGF0IGVuc3VyZXMgYSBjZXJ0YWluIGNlbGwgaXMgdmlzaWJsZSwgZ2l2ZW4gdGhlIGN1cnJlbnQgb2Zmc2V0LlxuICogSWYgdGhlIGNlbGwgaXMgYWxyZWFkeSB2aXNpYmxlIHRoZW4gdGhlIGN1cnJlbnQgb2Zmc2V0IHdpbGwgYmUgcmV0dXJuZWQuXG4gKiBJZiB0aGUgY3VycmVudCBvZmZzZXQgaXMgdG9vIGdyZWF0IG9yIHNtYWxsLCBpdCB3aWxsIGJlIGFkanVzdGVkIGp1c3QgZW5vdWdoIHRvIGVuc3VyZSB0aGUgc3BlY2lmaWVkIGluZGV4IGlzIHZpc2libGUuXG4gKlxuICogQHBhcmFtIGNlbGxNZXRhZGF0YSBNZXRhZGF0YSBpbml0aWFsbHkgY29tcHV0ZWQgYnkgaW5pdENlbGxNZXRhZGF0YSgpXG4gKiBAcGFyYW0gY29udGFpbmVyU2l6ZSBUb3RhbCBzaXplICh3aWR0aCBvciBoZWlnaHQpIG9mIHRoZSBjb250YWluZXJcbiAqIEBwYXJhbSBjdXJyZW50T2Zmc2V0IENvbnRhaW5lcidzIGN1cnJlbnQgKHggb3IgeSkgb2Zmc2V0XG4gKiBAcGFyYW0gdGFyZ2V0SW5kZXggSW5kZXggb2YgdGFyZ2V0IGNlbGxcbiAqIEByZXR1cm4gT2Zmc2V0IHRvIHVzZSB0byBlbnN1cmUgdGhlIHNwZWNpZmllZCBjZWxsIGlzIHZpc2libGVcbiAqL1xuZnVuY3Rpb24gZ2V0VXBkYXRlZE9mZnNldEZvckluZGV4KF9yZWY1KSB7XG4gIHZhciBjZWxsTWV0YWRhdGEgPSBfcmVmNS5jZWxsTWV0YWRhdGE7XG4gIHZhciBjb250YWluZXJTaXplID0gX3JlZjUuY29udGFpbmVyU2l6ZTtcbiAgdmFyIGN1cnJlbnRPZmZzZXQgPSBfcmVmNS5jdXJyZW50T2Zmc2V0O1xuICB2YXIgdGFyZ2V0SW5kZXggPSBfcmVmNS50YXJnZXRJbmRleDtcblxuICBpZiAoY2VsbE1ldGFkYXRhLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiAwO1xuICB9XG5cbiAgdGFyZ2V0SW5kZXggPSBNYXRoLm1heCgwLCBNYXRoLm1pbihjZWxsTWV0YWRhdGEubGVuZ3RoIC0gMSwgdGFyZ2V0SW5kZXgpKTtcblxuICB2YXIgZGF0dW0gPSBjZWxsTWV0YWRhdGFbdGFyZ2V0SW5kZXhdO1xuICB2YXIgbWF4T2Zmc2V0ID0gZGF0dW0ub2Zmc2V0O1xuICB2YXIgbWluT2Zmc2V0ID0gbWF4T2Zmc2V0IC0gY29udGFpbmVyU2l6ZSArIGRhdHVtLnNpemU7XG4gIHZhciBuZXdPZmZzZXQgPSBNYXRoLm1heChtaW5PZmZzZXQsIE1hdGgubWluKG1heE9mZnNldCwgY3VycmVudE9mZnNldCkpO1xuXG4gIHJldHVybiBuZXdPZmZzZXQ7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lcyB0aGUgcmFuZ2Ugb2YgY2VsbHMgdG8gZGlzcGxheSBmb3IgYSBnaXZlbiBvZmZzZXQgaW4gb3JkZXIgdG8gZmlsbCB0aGUgc3BlY2lmaWVkIGNvbnRhaW5lci5cbiAqXG4gKiBAcGFyYW0gY2VsbHNDb3VudCBUb3RhbCBudW1iZXIgb2YgY2VsbHMuXG4gKiBAcGFyYW0gY2VsbE1ldGFkYXRhIE1ldGFkYXRhIGluaXRpYWxseSBjb21wdXRlZCBieSBpbml0Q2VsbE1ldGFkYXRhKClcbiAqIEBwYXJhbSBjb250YWluZXJTaXplIFRvdGFsIHNpemUgKHdpZHRoIG9yIGhlaWdodCkgb2YgdGhlIGNvbnRhaW5lclxuICogQHBhcmFtIGN1cnJlbnRPZmZzZXQgQ29udGFpbmVyJ3MgY3VycmVudCAoeCBvciB5KSBvZmZzZXRcbiAqIEByZXR1cm4gQW4gb2JqZWN0IGNvbnRhaW5pbmcgOnN0YXJ0IGFuZCA6c3RvcCBhdHRyaWJ1dGVzLCBlYWNoIHNwZWNpZnlpbmcgYSBjZWxsIGluZGV4XG4gKi9cbmZ1bmN0aW9uIGdldFZpc2libGVDZWxsSW5kaWNlcyhfcmVmNikge1xuICB2YXIgY2VsbHNDb3VudCA9IF9yZWY2LmNlbGxzQ291bnQ7XG4gIHZhciBjZWxsTWV0YWRhdGEgPSBfcmVmNi5jZWxsTWV0YWRhdGE7XG4gIHZhciBjb250YWluZXJTaXplID0gX3JlZjYuY29udGFpbmVyU2l6ZTtcbiAgdmFyIGN1cnJlbnRPZmZzZXQgPSBfcmVmNi5jdXJyZW50T2Zmc2V0O1xuXG4gIGlmIChjZWxsc0NvdW50ID09PSAwKSB7XG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgLy8gVE9ETyBBZGQgYmV0dGVyIGd1YXJkcyBoZXJlIGFnYWluc3QgTmFOIG9mZnNldFxuXG4gIHZhciBsYXN0RGF0dW0gPSBjZWxsTWV0YWRhdGFbY2VsbE1ldGFkYXRhLmxlbmd0aCAtIDFdO1xuICB2YXIgdG90YWxDZWxsU2l6ZSA9IGxhc3REYXR1bS5vZmZzZXQgKyBsYXN0RGF0dW0uc2l6ZTtcblxuICAvLyBFbnN1cmUgb2Zmc2V0IGlzIHdpdGhpbiByZWFzb25hYmxlIGJvdW5kc1xuICBjdXJyZW50T2Zmc2V0ID0gTWF0aC5tYXgoMCwgTWF0aC5taW4odG90YWxDZWxsU2l6ZSAtIGNvbnRhaW5lclNpemUsIGN1cnJlbnRPZmZzZXQpKTtcblxuICB2YXIgbWF4T2Zmc2V0ID0gTWF0aC5taW4odG90YWxDZWxsU2l6ZSwgY3VycmVudE9mZnNldCArIGNvbnRhaW5lclNpemUpO1xuXG4gIHZhciBzdGFydCA9IGZpbmROZWFyZXN0Q2VsbCh7XG4gICAgY2VsbE1ldGFkYXRhOiBjZWxsTWV0YWRhdGEsXG4gICAgbW9kZTogZmluZE5lYXJlc3RDZWxsLkVRVUFMX09SX0xPV0VSLFxuICAgIG9mZnNldDogY3VycmVudE9mZnNldFxuICB9KTtcblxuICB2YXIgZGF0dW0gPSBjZWxsTWV0YWRhdGFbc3RhcnRdO1xuICBjdXJyZW50T2Zmc2V0ID0gZGF0dW0ub2Zmc2V0ICsgZGF0dW0uc2l6ZTtcblxuICB2YXIgc3RvcCA9IHN0YXJ0O1xuXG4gIHdoaWxlIChjdXJyZW50T2Zmc2V0IDwgbWF4T2Zmc2V0ICYmIHN0b3AgPCBjZWxsc0NvdW50IC0gMSkge1xuICAgIHN0b3ArKztcblxuICAgIGN1cnJlbnRPZmZzZXQgKz0gY2VsbE1ldGFkYXRhW3N0b3BdLnNpemU7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHN0YXJ0OiBzdGFydCxcbiAgICBzdG9wOiBzdG9wXG4gIH07XG59XG5cbi8qKlxuICogSW5pdGlhbGl6ZXMgbWV0YWRhdGEgZm9yIGFuIGF4aXMgYW5kIGl0cyBjZWxscy5cbiAqIFRoaXMgZGF0YSBpcyB1c2VkIHRvIGRldGVybWluZSB3aGljaCBjZWxscyBhcmUgdmlzaWJsZSBnaXZlbiBhIGNvbnRhaW5lciBzaXplIGFuZCBzY3JvbGwgcG9zaXRpb24uXG4gKlxuICogQHBhcmFtIGNlbGxzQ291bnQgVG90YWwgbnVtYmVyIG9mIGNlbGxzLlxuICogQHBhcmFtIHNpemUgRWl0aGVyIGEgZml4ZWQgc2l6ZSBvciBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgc2l6ZSBmb3IgYSBnaXZlbiBnaXZlbiBhbiBpbmRleC5cbiAqIEByZXR1cm4gT2JqZWN0IG1hcHBpbmcgY2VsbCBpbmRleCB0byBjZWxsIG1ldGFkYXRhIChzaXplLCBvZmZzZXQpXG4gKi9cbmZ1bmN0aW9uIGluaXRDZWxsTWV0YWRhdGEoX3JlZjcpIHtcbiAgdmFyIGNlbGxzQ291bnQgPSBfcmVmNy5jZWxsc0NvdW50O1xuICB2YXIgc2l6ZSA9IF9yZWY3LnNpemU7XG5cbiAgdmFyIHNpemVHZXR0ZXIgPSBzaXplIGluc3RhbmNlb2YgRnVuY3Rpb24gPyBzaXplIDogZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgcmV0dXJuIHNpemU7XG4gIH07XG5cbiAgdmFyIGNlbGxNZXRhZGF0YSA9IFtdO1xuICB2YXIgb2Zmc2V0ID0gMDtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGNlbGxzQ291bnQ7IGkrKykge1xuICAgIHZhciBfc2l6ZSA9IHNpemVHZXR0ZXIoaSk7XG5cbiAgICBpZiAoX3NpemUgPT0gbnVsbCB8fCBpc05hTihfc2l6ZSkpIHtcbiAgICAgIHRocm93IEVycm9yKCdJbnZhbGlkIHNpemUgcmV0dXJuZWQgZm9yIGNlbGwgJyArIGkgKyAnIG9mIHZhbHVlICcgKyBfc2l6ZSk7XG4gICAgfVxuXG4gICAgY2VsbE1ldGFkYXRhW2ldID0ge1xuICAgICAgc2l6ZTogX3NpemUsXG4gICAgICBvZmZzZXQ6IG9mZnNldFxuICAgIH07XG5cbiAgICBvZmZzZXQgKz0gX3NpemU7XG4gIH1cblxuICByZXR1cm4gY2VsbE1ldGFkYXRhO1xufVxuXG4vKipcbiAqIEhlbHBlciBmdW5jdGlvbiB0aGF0IGRldGVybWluZXMgd2hlbiB0byB1cGRhdGUgc2Nyb2xsIG9mZnNldHMgdG8gZW5zdXJlIHRoYXQgYSBzY3JvbGwtdG8taW5kZXggcmVtYWlucyB2aXNpYmxlLlxuICpcbiAqIEBwYXJhbSBjZWxsTWV0YWRhdGEgTWV0YWRhdGEgaW5pdGlhbGx5IGNvbXB1dGVkIGJ5IGluaXRDZWxsTWV0YWRhdGEoKVxuICogQHBhcmFtIGNlbGxzQ291bnQgTnVtYmVyIG9mIHJvd3Mgb3IgY29sdW1ucyBpbiB0aGUgY3VycmVudCBheGlzXG4gKiBAcGFyYW0gY2VsbHNTaXplIFdpZHRoIG9yIGhlaWdodCBvZiBjZWxscyBmb3IgdGhlIGN1cnJlbnQgYXhpc1xuICogQHBhcmFtIHByZXZpb3VzQ2VsbHNDb3VudCBQcmV2aW91cyBudW1iZXIgb2Ygcm93cyBvciBjb2x1bW5zXG4gKiBAcGFyYW0gcHJldmlvdXNDZWxsc1NpemUgUHJldmlvdXMgd2lkdGggb3IgaGVpZ2h0IG9mIGNlbGxzXG4gKiBAcGFyYW0gcHJldmlvdXNTY3JvbGxUb0luZGV4IFByZXZpb3VzIHNjcm9sbC10by1pbmRleFxuICogQHBhcmFtIHByZXZpb3VzU2l6ZSBQcmV2aW91cyB3aWR0aCBvciBoZWlnaHQgb2YgdGhlIHZpcnR1YWxpemVkIGNvbnRhaW5lclxuICogQHBhcmFtIHNjcm9sbE9mZnNldCBDdXJyZW50IHNjcm9sbExlZnQgb3Igc2Nyb2xsVG9wXG4gKiBAcGFyYW0gc2Nyb2xsVG9JbmRleCBTY3JvbGwtdG8taW5kZXhcbiAqIEBwYXJhbSBzaXplIFdpZHRoIG9yIGhlaWdodCBvZiB0aGUgdmlydHVhbGl6ZWQgY29udGFpbmVyXG4gKiBAcGFyYW0gdXBkYXRlU2Nyb2xsSW5kZXhDYWxsYmFjayBDYWxsYmFjayB0byBpbnZva2Ugd2l0aCBhbiBvcHRpb25hbCBzY3JvbGwtdG8taW5kZXggb3ZlcnJpZGVcbiAqL1xuZnVuY3Rpb24gdXBkYXRlU2Nyb2xsSW5kZXhIZWxwZXIoX3JlZjgpIHtcbiAgdmFyIGNlbGxNZXRhZGF0YSA9IF9yZWY4LmNlbGxNZXRhZGF0YTtcbiAgdmFyIGNlbGxzQ291bnQgPSBfcmVmOC5jZWxsc0NvdW50O1xuICB2YXIgY2VsbFNpemUgPSBfcmVmOC5jZWxsU2l6ZTtcbiAgdmFyIHByZXZpb3VzQ2VsbHNDb3VudCA9IF9yZWY4LnByZXZpb3VzQ2VsbHNDb3VudDtcbiAgdmFyIHByZXZpb3VzQ2VsbFNpemUgPSBfcmVmOC5wcmV2aW91c0NlbGxTaXplO1xuICB2YXIgcHJldmlvdXNTY3JvbGxUb0luZGV4ID0gX3JlZjgucHJldmlvdXNTY3JvbGxUb0luZGV4O1xuICB2YXIgcHJldmlvdXNTaXplID0gX3JlZjgucHJldmlvdXNTaXplO1xuICB2YXIgc2Nyb2xsT2Zmc2V0ID0gX3JlZjguc2Nyb2xsT2Zmc2V0O1xuICB2YXIgc2Nyb2xsVG9JbmRleCA9IF9yZWY4LnNjcm9sbFRvSW5kZXg7XG4gIHZhciBzaXplID0gX3JlZjguc2l6ZTtcbiAgdmFyIHVwZGF0ZVNjcm9sbEluZGV4Q2FsbGJhY2sgPSBfcmVmOC51cGRhdGVTY3JvbGxJbmRleENhbGxiYWNrO1xuXG4gIHZhciBoYXNTY3JvbGxUb0luZGV4ID0gc2Nyb2xsVG9JbmRleCA+PSAwICYmIHNjcm9sbFRvSW5kZXggPCBjZWxsc0NvdW50O1xuICB2YXIgc2l6ZUhhc0NoYW5nZWQgPSBzaXplICE9PSBwcmV2aW91c1NpemUgfHwgIXByZXZpb3VzQ2VsbFNpemUgfHwgdHlwZW9mIGNlbGxTaXplID09PSAnbnVtYmVyJyAmJiBjZWxsU2l6ZSAhPT0gcHJldmlvdXNDZWxsU2l6ZTtcblxuICAvLyBJZiB3ZSBoYXZlIGEgbmV3IHNjcm9sbCB0YXJnZXQgT1IgaWYgaGVpZ2h0L3Jvdy1oZWlnaHQgaGFzIGNoYW5nZWQsXG4gIC8vIFdlIHNob3VsZCBlbnN1cmUgdGhhdCB0aGUgc2Nyb2xsIHRhcmdldCBpcyB2aXNpYmxlLlxuICBpZiAoaGFzU2Nyb2xsVG9JbmRleCAmJiAoc2l6ZUhhc0NoYW5nZWQgfHwgc2Nyb2xsVG9JbmRleCAhPT0gcHJldmlvdXNTY3JvbGxUb0luZGV4KSkge1xuICAgIHVwZGF0ZVNjcm9sbEluZGV4Q2FsbGJhY2soKTtcblxuICAgIC8vIElmIHdlIGRvbid0IGhhdmUgYSBzZWxlY3RlZCBpdGVtIGJ1dCBsaXN0IHNpemUgb3IgbnVtYmVyIG9mIGNoaWxkcmVuIGhhdmUgZGVjcmVhc2VkLFxuICAgIC8vIE1ha2Ugc3VyZSB3ZSBhcmVuJ3Qgc2Nyb2xsZWQgdG9vIGZhciBwYXN0IHRoZSBjdXJyZW50IGNvbnRlbnQuXG4gIH0gZWxzZSBpZiAoIWhhc1Njcm9sbFRvSW5kZXggJiYgKHNpemUgPCBwcmV2aW91c1NpemUgfHwgY2VsbHNDb3VudCA8IHByZXZpb3VzQ2VsbHNDb3VudCkpIHtcbiAgICAgIHZhciBjYWxjdWxhdGVkU2Nyb2xsT2Zmc2V0ID0gZ2V0VXBkYXRlZE9mZnNldEZvckluZGV4KHtcbiAgICAgICAgY2VsbE1ldGFkYXRhOiBjZWxsTWV0YWRhdGEsXG4gICAgICAgIGNvbnRhaW5lclNpemU6IHNpemUsXG4gICAgICAgIGN1cnJlbnRPZmZzZXQ6IHNjcm9sbE9mZnNldCxcbiAgICAgICAgdGFyZ2V0SW5kZXg6IGNlbGxzQ291bnQgLSAxXG4gICAgICB9KTtcblxuICAgICAgLy8gT25seSBhZGp1c3QgdGhlIHNjcm9sbCBwb3NpdGlvbiBpZiB3ZSd2ZSBzY3JvbGxlZCBiZWxvdyB0aGUgbGFzdCBzZXQgb2Ygcm93cy5cbiAgICAgIGlmIChjYWxjdWxhdGVkU2Nyb2xsT2Zmc2V0IDwgc2Nyb2xsT2Zmc2V0KSB7XG4gICAgICAgIHVwZGF0ZVNjcm9sbEluZGV4Q2FsbGJhY2soY2VsbHNDb3VudCAtIDEpO1xuICAgICAgfVxuICAgIH1cbn0iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLkdyaWQgPSBleHBvcnRzLmRlZmF1bHQgPSB1bmRlZmluZWQ7XG5cbnZhciBfR3JpZDIgPSByZXF1aXJlKCcuL0dyaWQnKTtcblxudmFyIF9HcmlkMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0dyaWQyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gX0dyaWQzLmRlZmF1bHQ7XG5leHBvcnRzLkdyaWQgPSBfR3JpZDMuZGVmYXVsdDsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbmV4cG9ydHMuaXNSYW5nZVZpc2libGUgPSBpc1JhbmdlVmlzaWJsZTtcbmV4cG9ydHMuc2NhbkZvclVubG9hZGVkUmFuZ2VzID0gc2NhbkZvclVubG9hZGVkUmFuZ2VzO1xuXG52YXIgX3JlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIF9yZWFjdEFkZG9uc1NoYWxsb3dDb21wYXJlID0gcmVxdWlyZSgncmVhY3QtYWRkb25zLXNoYWxsb3ctY29tcGFyZScpO1xuXG52YXIgX3JlYWN0QWRkb25zU2hhbGxvd0NvbXBhcmUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3RBZGRvbnNTaGFsbG93Q29tcGFyZSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKCFzZWxmKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxuLyoqXG4gKiBIaWdoZXItb3JkZXIgY29tcG9uZW50IHRoYXQgbWFuYWdlcyBsYXp5LWxvYWRpbmcgZm9yIFwiaW5maW5pdGVcIiBkYXRhLlxuICogVGhpcyBjb21wb25lbnQgZGVjb3JhdGVzIGEgdmlydHVhbCBjb21wb25lbnQgYW5kIGp1c3QtaW4tdGltZSBwcmVmZXRjaGVzIHJvd3MgYXMgYSB1c2VyIHNjcm9sbHMuXG4gKiBJdCBpcyBpbnRlbmRlZCBhcyBhIGNvbnZlbmllbmNlIGNvbXBvbmVudDsgZm9yayBpdCBpZiB5b3UnZCBsaWtlIGZpbmVyLWdyYWluZWQgY29udHJvbCBvdmVyIGRhdGEtbG9hZGluZy5cbiAqL1xuXG52YXIgSW5maW5pdGVMb2FkZXIgPSBmdW5jdGlvbiAoX0NvbXBvbmVudCkge1xuICBfaW5oZXJpdHMoSW5maW5pdGVMb2FkZXIsIF9Db21wb25lbnQpO1xuXG4gIGZ1bmN0aW9uIEluZmluaXRlTG9hZGVyKHByb3BzLCBjb250ZXh0KSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEluZmluaXRlTG9hZGVyKTtcblxuICAgIHZhciBfdGhpcyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIE9iamVjdC5nZXRQcm90b3R5cGVPZihJbmZpbml0ZUxvYWRlcikuY2FsbCh0aGlzLCBwcm9wcywgY29udGV4dCkpO1xuXG4gICAgX3RoaXMuX29uUm93c1JlbmRlcmVkID0gX3RoaXMuX29uUm93c1JlbmRlcmVkLmJpbmQoX3RoaXMpO1xuICAgIF90aGlzLl9yZWdpc3RlckNoaWxkID0gX3RoaXMuX3JlZ2lzdGVyQ2hpbGQuYmluZChfdGhpcyk7XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKEluZmluaXRlTG9hZGVyLCBbe1xuICAgIGtleTogJ3JlbmRlcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgIHZhciBjaGlsZHJlbiA9IHRoaXMucHJvcHMuY2hpbGRyZW47XG5cblxuICAgICAgcmV0dXJuIGNoaWxkcmVuKHtcbiAgICAgICAgb25Sb3dzUmVuZGVyZWQ6IHRoaXMuX29uUm93c1JlbmRlcmVkLFxuICAgICAgICByZWdpc3RlckNoaWxkOiB0aGlzLl9yZWdpc3RlckNoaWxkXG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdzaG91bGRDb21wb25lbnRVcGRhdGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUpIHtcbiAgICAgIHJldHVybiAoMCwgX3JlYWN0QWRkb25zU2hhbGxvd0NvbXBhcmUyLmRlZmF1bHQpKHRoaXMsIG5leHRQcm9wcywgbmV4dFN0YXRlKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfb25Sb3dzUmVuZGVyZWQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfb25Sb3dzUmVuZGVyZWQoX3JlZikge1xuICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgIHZhciBzdGFydEluZGV4ID0gX3JlZi5zdGFydEluZGV4O1xuICAgICAgdmFyIHN0b3BJbmRleCA9IF9yZWYuc3RvcEluZGV4O1xuICAgICAgdmFyIF9wcm9wcyA9IHRoaXMucHJvcHM7XG4gICAgICB2YXIgaXNSb3dMb2FkZWQgPSBfcHJvcHMuaXNSb3dMb2FkZWQ7XG4gICAgICB2YXIgbG9hZE1vcmVSb3dzID0gX3Byb3BzLmxvYWRNb3JlUm93cztcbiAgICAgIHZhciByb3dzQ291bnQgPSBfcHJvcHMucm93c0NvdW50O1xuICAgICAgdmFyIHRocmVzaG9sZCA9IF9wcm9wcy50aHJlc2hvbGQ7XG5cblxuICAgICAgdGhpcy5fbGFzdFJlbmRlcmVkU3RhcnRJbmRleCA9IHN0YXJ0SW5kZXg7XG4gICAgICB0aGlzLl9sYXN0UmVuZGVyZWRTdG9wSW5kZXggPSBzdG9wSW5kZXg7XG5cbiAgICAgIHZhciB1bmxvYWRlZFJhbmdlcyA9IHNjYW5Gb3JVbmxvYWRlZFJhbmdlcyh7XG4gICAgICAgIGlzUm93TG9hZGVkOiBpc1Jvd0xvYWRlZCxcbiAgICAgICAgc3RhcnRJbmRleDogTWF0aC5tYXgoMCwgc3RhcnRJbmRleCAtIHRocmVzaG9sZCksXG4gICAgICAgIHN0b3BJbmRleDogTWF0aC5taW4ocm93c0NvdW50LCBzdG9wSW5kZXggKyB0aHJlc2hvbGQpXG4gICAgICB9KTtcblxuICAgICAgdW5sb2FkZWRSYW5nZXMuZm9yRWFjaChmdW5jdGlvbiAodW5sb2FkZWRSYW5nZSkge1xuICAgICAgICB2YXIgcHJvbWlzZSA9IGxvYWRNb3JlUm93cyh1bmxvYWRlZFJhbmdlKTtcbiAgICAgICAgaWYgKHByb21pc2UpIHtcbiAgICAgICAgICBwcm9taXNlLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLy8gUmVmcmVzaCB0aGUgdmlzaWJsZSByb3dzIGlmIGFueSBvZiB0aGVtIGhhdmUganVzdCBiZWVuIGxvYWRlZC5cbiAgICAgICAgICAgIC8vIE90aGVyd2lzZSB0aGV5IHdpbGwgcmVtYWluIGluIHRoZWlyIHVubG9hZGVkIHZpc3VhbCBzdGF0ZS5cbiAgICAgICAgICAgIGlmIChpc1JhbmdlVmlzaWJsZSh7XG4gICAgICAgICAgICAgIGxhc3RSZW5kZXJlZFN0YXJ0SW5kZXg6IF90aGlzMi5fbGFzdFJlbmRlcmVkU3RhcnRJbmRleCxcbiAgICAgICAgICAgICAgbGFzdFJlbmRlcmVkU3RvcEluZGV4OiBfdGhpczIuX2xhc3RSZW5kZXJlZFN0b3BJbmRleCxcbiAgICAgICAgICAgICAgc3RhcnRJbmRleDogdW5sb2FkZWRSYW5nZS5zdGFydEluZGV4LFxuICAgICAgICAgICAgICBzdG9wSW5kZXg6IHVubG9hZGVkUmFuZ2Uuc3RvcEluZGV4XG4gICAgICAgICAgICB9KSkge1xuICAgICAgICAgICAgICBpZiAoX3RoaXMyLl9yZWdpc3RlcmVkQ2hpbGQpIHtcbiAgICAgICAgICAgICAgICBfdGhpczIuX3JlZ2lzdGVyZWRDaGlsZC5mb3JjZVVwZGF0ZSgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19yZWdpc3RlckNoaWxkJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX3JlZ2lzdGVyQ2hpbGQocmVnaXN0ZXJlZENoaWxkKSB7XG4gICAgICB0aGlzLl9yZWdpc3RlcmVkQ2hpbGQgPSByZWdpc3RlcmVkQ2hpbGQ7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIEluZmluaXRlTG9hZGVyO1xufShfcmVhY3QuQ29tcG9uZW50KTtcblxuLyoqXG4gKiBEZXRlcm1pbmVzIGlmIHRoZSBzcGVjaWZpZWQgc3RhcnQvc3RvcCByYW5nZSBpcyB2aXNpYmxlIGJhc2VkIG9uIHRoZSBtb3N0IHJlY2VudGx5IHJlbmRlcmVkIHJhbmdlLlxuICovXG5cblxuSW5maW5pdGVMb2FkZXIucHJvcFR5cGVzID0ge1xuICAvKipcbiAgICogRnVuY3Rpb24gcmVzcG9uZGlibGUgZm9yIHJlbmRlcmluZyBhIHZpcnR1YWxpemVkIGNvbXBvbmVudC5cbiAgICogVGhpcyBmdW5jdGlvbiBzaG91bGQgaW1wbGVtZW50IHRoZSBmb2xsb3dpbmcgc2lnbmF0dXJlOlxuICAgKiAoeyBvblJvd3NSZW5kZXJlZCwgcmVnaXN0ZXJDaGlsZCB9KSA9PiBQcm9wVHlwZXMuZWxlbWVudFxuICAgKlxuICAgKiBUaGUgc3BlY2lmaWVkIDpvblJvd3NSZW5kZXJlZCBmdW5jdGlvbiBzaG91bGQgYmUgcGFzc2VkIHRocm91Z2ggdG8gdGhlIGNoaWxkJ3MgOm9uUm93c1JlbmRlcmVkIHByb3BlcnR5LlxuICAgKiBUaGUgOnJlZ2lzdGVyQ2hpbGQgY2FsbGJhY2sgc2hvdWxkIGJlIHNldCBhcyB0aGUgdmlydHVhbGl6ZWQgY29tcG9uZW50J3MgOnJlZi5cbiAgICovXG4gIGNoaWxkcmVuOiBfcmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcblxuICAvKipcbiAgICogRnVuY3Rpb24gcmVzcG9uc2libGUgZm9yIHRyYWNraW5nIHRoZSBsb2FkZWQgc3RhdGUgb2YgZWFjaCByb3cuXG4gICAqIEl0IHNob3VsZCBpbXBsZW1lbnQgdGhlIGZvbGxvd2luZyBzaWduYXR1cmU6IChpbmRleDogbnVtYmVyKTogYm9vbGVhblxuICAgKi9cbiAgaXNSb3dMb2FkZWQ6IF9yZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuXG4gIC8qKlxuICAgKiBDYWxsYmFjayB0byBiZSBpbnZva2VkIHdoZW4gbW9yZSByb3dzIG11c3QgYmUgbG9hZGVkLlxuICAgKiBJdCBzaG91bGQgaW1wbGVtZW50IHRoZSBmb2xsb3dpbmcgc2lnbmF0dXJlOiAoeyBzdGFydEluZGV4LCBzdG9wSW5kZXggfSk6IFByb21pc2VcbiAgICogVGhlIHJldHVybmVkIFByb21pc2Ugc2hvdWxkIGJlIHJlc29sdmVkIG9uY2Ugcm93IGRhdGEgaGFzIGZpbmlzaGVkIGxvYWRpbmcuXG4gICAqIEl0IHdpbGwgYmUgdXNlZCB0byBkZXRlcm1pbmUgd2hlbiB0byByZWZyZXNoIHRoZSBsaXN0IHdpdGggdGhlIG5ld2x5LWxvYWRlZCBkYXRhLlxuICAgKiBUaGlzIGNhbGxiYWNrIG1heSBiZSBjYWxsZWQgbXVsdGlwbGUgdGltZXMgaW4gcmVhY3Rpb24gdG8gYSBzaW5nbGUgc2Nyb2xsIGV2ZW50LlxuICAgKi9cbiAgbG9hZE1vcmVSb3dzOiBfcmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcblxuICAvKipcbiAgICogTnVtYmVyIG9mIHJvd3MgaW4gbGlzdDsgY2FuIGJlIGFyYml0cmFyeSBoaWdoIG51bWJlciBpZiBhY3R1YWwgbnVtYmVyIGlzIHVua25vd24uXG4gICAqL1xuICByb3dzQ291bnQ6IF9yZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG5cbiAgLyoqXG4gICAqIFRocmVzaG9sZCBhdCB3aGljaCB0byBwcmUtZmV0Y2ggZGF0YS5cbiAgICogQSB0aHJlc2hvbGQgWCBtZWFucyB0aGF0IGRhdGEgd2lsbCBzdGFydCBsb2FkaW5nIHdoZW4gYSB1c2VyIHNjcm9sbHMgd2l0aGluIFggcm93cy5cbiAgICogVGhpcyB2YWx1ZSBkZWZhdWx0cyB0byAxNS5cbiAgICovXG4gIHRocmVzaG9sZDogX3JlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZFxufTtcbkluZmluaXRlTG9hZGVyLmRlZmF1bHRQcm9wcyA9IHtcbiAgcm93c0NvdW50OiAwLFxuICB0aHJlc2hvbGQ6IDE1XG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gSW5maW5pdGVMb2FkZXI7XG5mdW5jdGlvbiBpc1JhbmdlVmlzaWJsZShfcmVmMikge1xuICB2YXIgbGFzdFJlbmRlcmVkU3RhcnRJbmRleCA9IF9yZWYyLmxhc3RSZW5kZXJlZFN0YXJ0SW5kZXg7XG4gIHZhciBsYXN0UmVuZGVyZWRTdG9wSW5kZXggPSBfcmVmMi5sYXN0UmVuZGVyZWRTdG9wSW5kZXg7XG4gIHZhciBzdGFydEluZGV4ID0gX3JlZjIuc3RhcnRJbmRleDtcbiAgdmFyIHN0b3BJbmRleCA9IF9yZWYyLnN0b3BJbmRleDtcblxuICByZXR1cm4gIShzdGFydEluZGV4ID4gbGFzdFJlbmRlcmVkU3RvcEluZGV4IHx8IHN0b3BJbmRleCA8IGxhc3RSZW5kZXJlZFN0YXJ0SW5kZXgpO1xufVxuXG4vKipcbiAqIFJldHVybnMgYWxsIG9mIHRoZSByYW5nZXMgd2l0aGluIGEgbGFyZ2VyIHJhbmdlIHRoYXQgY29udGFpbiB1bmxvYWRlZCByb3dzLlxuICovXG5mdW5jdGlvbiBzY2FuRm9yVW5sb2FkZWRSYW5nZXMoX3JlZjMpIHtcbiAgdmFyIGlzUm93TG9hZGVkID0gX3JlZjMuaXNSb3dMb2FkZWQ7XG4gIHZhciBzdGFydEluZGV4ID0gX3JlZjMuc3RhcnRJbmRleDtcbiAgdmFyIHN0b3BJbmRleCA9IF9yZWYzLnN0b3BJbmRleDtcblxuICB2YXIgdW5sb2FkZWRSYW5nZXMgPSBbXTtcbiAgdmFyIHJhbmdlU3RhcnRJbmRleCA9IG51bGw7XG4gIHZhciByYW5nZVN0b3BJbmRleCA9IG51bGw7XG5cbiAgZm9yICh2YXIgaSA9IHN0YXJ0SW5kZXg7IGkgPD0gc3RvcEluZGV4OyBpKyspIHtcbiAgICB2YXIgbG9hZGVkID0gaXNSb3dMb2FkZWQoaSk7XG5cbiAgICBpZiAoIWxvYWRlZCkge1xuICAgICAgcmFuZ2VTdG9wSW5kZXggPSBpO1xuICAgICAgaWYgKHJhbmdlU3RhcnRJbmRleCA9PT0gbnVsbCkge1xuICAgICAgICByYW5nZVN0YXJ0SW5kZXggPSBpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAocmFuZ2VTdG9wSW5kZXggIT09IG51bGwpIHtcbiAgICAgIHVubG9hZGVkUmFuZ2VzLnB1c2goe1xuICAgICAgICBzdGFydEluZGV4OiByYW5nZVN0YXJ0SW5kZXgsXG4gICAgICAgIHN0b3BJbmRleDogcmFuZ2VTdG9wSW5kZXhcbiAgICAgIH0pO1xuXG4gICAgICByYW5nZVN0YXJ0SW5kZXggPSByYW5nZVN0b3BJbmRleCA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgaWYgKHJhbmdlU3RvcEluZGV4ICE9PSBudWxsKSB7XG4gICAgdW5sb2FkZWRSYW5nZXMucHVzaCh7XG4gICAgICBzdGFydEluZGV4OiByYW5nZVN0YXJ0SW5kZXgsXG4gICAgICBzdG9wSW5kZXg6IHJhbmdlU3RvcEluZGV4XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gdW5sb2FkZWRSYW5nZXM7XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5JbmZpbml0ZUxvYWRlciA9IGV4cG9ydHMuZGVmYXVsdCA9IHVuZGVmaW5lZDtcblxudmFyIF9JbmZpbml0ZUxvYWRlcjIgPSByZXF1aXJlKCcuL0luZmluaXRlTG9hZGVyJyk7XG5cbnZhciBfSW5maW5pdGVMb2FkZXIzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfSW5maW5pdGVMb2FkZXIyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gX0luZmluaXRlTG9hZGVyMy5kZWZhdWx0O1xuZXhwb3J0cy5JbmZpbml0ZUxvYWRlciA9IF9JbmZpbml0ZUxvYWRlcjMuZGVmYXVsdDsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbnZhciBfcmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgX3JlYWN0QWRkb25zU2hhbGxvd0NvbXBhcmUgPSByZXF1aXJlKCdyZWFjdC1hZGRvbnMtc2hhbGxvdy1jb21wYXJlJyk7XG5cbnZhciBfcmVhY3RBZGRvbnNTaGFsbG93Q29tcGFyZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdEFkZG9uc1NoYWxsb3dDb21wYXJlKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoIXNlbGYpIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG4vKipcbiAqIEhPQyB0aGF0IHNpbXBsaWZpZXMgdGhlIHByb2Nlc3Mgb2Ygc3luY2hyb25pemluZyBzY3JvbGxpbmcgYmV0d2VlbiB0d28gb3IgbW9yZSB2aXJ0dWFsaXplZCBjb21wb25lbnRzLlxuICovXG5cbnZhciBTY3JvbGxTeW5jID0gZnVuY3Rpb24gKF9Db21wb25lbnQpIHtcbiAgX2luaGVyaXRzKFNjcm9sbFN5bmMsIF9Db21wb25lbnQpO1xuXG4gIGZ1bmN0aW9uIFNjcm9sbFN5bmMocHJvcHMsIGNvbnRleHQpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgU2Nyb2xsU3luYyk7XG5cbiAgICB2YXIgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoU2Nyb2xsU3luYykuY2FsbCh0aGlzLCBwcm9wcywgY29udGV4dCkpO1xuXG4gICAgX3RoaXMuc3RhdGUgPSB7XG4gICAgICBjbGllbnRIZWlnaHQ6IDAsXG4gICAgICBjbGllbnRXaWR0aDogMCxcbiAgICAgIHNjcm9sbEhlaWdodDogMCxcbiAgICAgIHNjcm9sbExlZnQ6IDAsXG4gICAgICBzY3JvbGxUb3A6IDAsXG4gICAgICBzY3JvbGxXaWR0aDogMFxuICAgIH07XG5cbiAgICBfdGhpcy5fb25TY3JvbGwgPSBfdGhpcy5fb25TY3JvbGwuYmluZChfdGhpcyk7XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKFNjcm9sbFN5bmMsIFt7XG4gICAga2V5OiAncmVuZGVyJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgdmFyIGNoaWxkcmVuID0gdGhpcy5wcm9wcy5jaGlsZHJlbjtcbiAgICAgIHZhciBfc3RhdGUgPSB0aGlzLnN0YXRlO1xuICAgICAgdmFyIGNsaWVudEhlaWdodCA9IF9zdGF0ZS5jbGllbnRIZWlnaHQ7XG4gICAgICB2YXIgY2xpZW50V2lkdGggPSBfc3RhdGUuY2xpZW50V2lkdGg7XG4gICAgICB2YXIgc2Nyb2xsSGVpZ2h0ID0gX3N0YXRlLnNjcm9sbEhlaWdodDtcbiAgICAgIHZhciBzY3JvbGxMZWZ0ID0gX3N0YXRlLnNjcm9sbExlZnQ7XG4gICAgICB2YXIgc2Nyb2xsVG9wID0gX3N0YXRlLnNjcm9sbFRvcDtcbiAgICAgIHZhciBzY3JvbGxXaWR0aCA9IF9zdGF0ZS5zY3JvbGxXaWR0aDtcblxuXG4gICAgICByZXR1cm4gY2hpbGRyZW4oe1xuICAgICAgICBjbGllbnRIZWlnaHQ6IGNsaWVudEhlaWdodCxcbiAgICAgICAgY2xpZW50V2lkdGg6IGNsaWVudFdpZHRoLFxuICAgICAgICBvblNjcm9sbDogdGhpcy5fb25TY3JvbGwsXG4gICAgICAgIHNjcm9sbEhlaWdodDogc2Nyb2xsSGVpZ2h0LFxuICAgICAgICBzY3JvbGxMZWZ0OiBzY3JvbGxMZWZ0LFxuICAgICAgICBzY3JvbGxUb3A6IHNjcm9sbFRvcCxcbiAgICAgICAgc2Nyb2xsV2lkdGg6IHNjcm9sbFdpZHRoXG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdzaG91bGRDb21wb25lbnRVcGRhdGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUpIHtcbiAgICAgIHJldHVybiAoMCwgX3JlYWN0QWRkb25zU2hhbGxvd0NvbXBhcmUyLmRlZmF1bHQpKHRoaXMsIG5leHRQcm9wcywgbmV4dFN0YXRlKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfb25TY3JvbGwnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfb25TY3JvbGwoX3JlZikge1xuICAgICAgdmFyIGNsaWVudEhlaWdodCA9IF9yZWYuY2xpZW50SGVpZ2h0O1xuICAgICAgdmFyIGNsaWVudFdpZHRoID0gX3JlZi5jbGllbnRXaWR0aDtcbiAgICAgIHZhciBzY3JvbGxIZWlnaHQgPSBfcmVmLnNjcm9sbEhlaWdodDtcbiAgICAgIHZhciBzY3JvbGxMZWZ0ID0gX3JlZi5zY3JvbGxMZWZ0O1xuICAgICAgdmFyIHNjcm9sbFRvcCA9IF9yZWYuc2Nyb2xsVG9wO1xuICAgICAgdmFyIHNjcm9sbFdpZHRoID0gX3JlZi5zY3JvbGxXaWR0aDtcblxuICAgICAgdGhpcy5zZXRTdGF0ZSh7IGNsaWVudEhlaWdodDogY2xpZW50SGVpZ2h0LCBjbGllbnRXaWR0aDogY2xpZW50V2lkdGgsIHNjcm9sbEhlaWdodDogc2Nyb2xsSGVpZ2h0LCBzY3JvbGxMZWZ0OiBzY3JvbGxMZWZ0LCBzY3JvbGxUb3A6IHNjcm9sbFRvcCwgc2Nyb2xsV2lkdGg6IHNjcm9sbFdpZHRoIH0pO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBTY3JvbGxTeW5jO1xufShfcmVhY3QuQ29tcG9uZW50KTtcblxuU2Nyb2xsU3luYy5wcm9wVHlwZXMgPSB7XG4gIC8qKlxuICAgKiBGdW5jdGlvbiByZXNwb25kaWJsZSBmb3IgcmVuZGVyaW5nIDIgb3IgbW9yZSB2aXJ0dWFsaXplZCBjb21wb25lbnRzLlxuICAgKiBUaGlzIGZ1bmN0aW9uIHNob3VsZCBpbXBsZW1lbnQgdGhlIGZvbGxvd2luZyBzaWduYXR1cmU6XG4gICAqICh7IG9uU2Nyb2xsLCBzY3JvbGxMZWZ0LCBzY3JvbGxUb3AgfSkgPT4gUHJvcFR5cGVzLmVsZW1lbnRcbiAgICovXG4gIGNoaWxkcmVuOiBfcmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZFxufTtcbmV4cG9ydHMuZGVmYXVsdCA9IFNjcm9sbFN5bmM7IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5TY3JvbGxTeW5jID0gZXhwb3J0cy5kZWZhdWx0ID0gdW5kZWZpbmVkO1xuXG52YXIgX1Njcm9sbFN5bmMyID0gcmVxdWlyZSgnLi9TY3JvbGxTeW5jJyk7XG5cbnZhciBfU2Nyb2xsU3luYzMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9TY3JvbGxTeW5jMik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IF9TY3JvbGxTeW5jMy5kZWZhdWx0O1xuZXhwb3J0cy5TY3JvbGxTeW5jID0gX1Njcm9sbFN5bmMzLmRlZmF1bHQ7IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG52YXIgX0dyaWQgPSByZXF1aXJlKCcuLi9HcmlkJyk7XG5cbnZhciBfR3JpZDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9HcmlkKTtcblxudmFyIF9yZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBfcmVhY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3QpO1xuXG52YXIgX2NsYXNzbmFtZXMgPSByZXF1aXJlKCdjbGFzc25hbWVzJyk7XG5cbnZhciBfY2xhc3NuYW1lczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jbGFzc25hbWVzKTtcblxudmFyIF9yZWFjdEFkZG9uc1NoYWxsb3dDb21wYXJlID0gcmVxdWlyZSgncmVhY3QtYWRkb25zLXNoYWxsb3ctY29tcGFyZScpO1xuXG52YXIgX3JlYWN0QWRkb25zU2hhbGxvd0NvbXBhcmUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3RBZGRvbnNTaGFsbG93Q29tcGFyZSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKCFzZWxmKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxuLyoqXG4gKiBJdCBpcyBpbmVmZmljaWVudCB0byBjcmVhdGUgYW5kIG1hbmFnZSBhIGxhcmdlIGxpc3Qgb2YgRE9NIGVsZW1lbnRzIHdpdGhpbiBhIHNjcm9sbGluZyBjb250YWluZXJcbiAqIGlmIG9ubHkgYSBmZXcgb2YgdGhvc2UgZWxlbWVudHMgYXJlIHZpc2libGUuIFRoZSBwcmltYXJ5IHB1cnBvc2Ugb2YgdGhpcyBjb21wb25lbnQgaXMgdG8gaW1wcm92ZVxuICogcGVyZm9ybWFuY2UgYnkgb25seSByZW5kZXJpbmcgdGhlIERPTSBub2RlcyB0aGF0IGEgdXNlciBpcyBhYmxlIHRvIHNlZSBiYXNlZCBvbiB0aGVpciBjdXJyZW50XG4gKiBzY3JvbGwgcG9zaXRpb24uXG4gKlxuICogVGhpcyBjb21wb25lbnQgcmVuZGVycyBhIHZpcnR1YWxpemVkIGxpc3Qgb2YgZWxlbWVudHMgd2l0aCBlaXRoZXIgZml4ZWQgb3IgZHluYW1pYyBoZWlnaHRzLlxuICovXG5cbnZhciBWaXJ0dWFsU2Nyb2xsID0gZnVuY3Rpb24gKF9Db21wb25lbnQpIHtcbiAgX2luaGVyaXRzKFZpcnR1YWxTY3JvbGwsIF9Db21wb25lbnQpO1xuXG4gIGZ1bmN0aW9uIFZpcnR1YWxTY3JvbGwoKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFZpcnR1YWxTY3JvbGwpO1xuXG4gICAgcmV0dXJuIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIE9iamVjdC5nZXRQcm90b3R5cGVPZihWaXJ0dWFsU2Nyb2xsKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhWaXJ0dWFsU2Nyb2xsLCBbe1xuICAgIGtleTogJ3JlY29tcHV0ZVJvd0hlaWdodHMnLFxuXG5cbiAgICAvKipcbiAgICAgKiBTZWUgR3JpZCNyZWNvbXB1dGVHcmlkU2l6ZVxuICAgICAqL1xuICAgIHZhbHVlOiBmdW5jdGlvbiByZWNvbXB1dGVSb3dIZWlnaHRzKCkge1xuICAgICAgdGhpcy5yZWZzLkdyaWQucmVjb21wdXRlR3JpZFNpemUoKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdyZW5kZXInLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICB2YXIgX3Byb3BzID0gdGhpcy5wcm9wcztcbiAgICAgIHZhciBjbGFzc05hbWUgPSBfcHJvcHMuY2xhc3NOYW1lO1xuICAgICAgdmFyIGhlaWdodCA9IF9wcm9wcy5oZWlnaHQ7XG4gICAgICB2YXIgbm9Sb3dzUmVuZGVyZXIgPSBfcHJvcHMubm9Sb3dzUmVuZGVyZXI7XG4gICAgICB2YXIgb25Sb3dzUmVuZGVyZWQgPSBfcHJvcHMub25Sb3dzUmVuZGVyZWQ7XG4gICAgICB2YXIgX29uU2Nyb2xsID0gX3Byb3BzLm9uU2Nyb2xsO1xuICAgICAgdmFyIHJvd0hlaWdodCA9IF9wcm9wcy5yb3dIZWlnaHQ7XG4gICAgICB2YXIgcm93UmVuZGVyZXIgPSBfcHJvcHMucm93UmVuZGVyZXI7XG4gICAgICB2YXIgb3ZlcnNjYW5Sb3dzQ291bnQgPSBfcHJvcHMub3ZlcnNjYW5Sb3dzQ291bnQ7XG4gICAgICB2YXIgcm93c0NvdW50ID0gX3Byb3BzLnJvd3NDb3VudDtcbiAgICAgIHZhciBzY3JvbGxUb0luZGV4ID0gX3Byb3BzLnNjcm9sbFRvSW5kZXg7XG4gICAgICB2YXIgc2Nyb2xsVG9wID0gX3Byb3BzLnNjcm9sbFRvcDtcbiAgICAgIHZhciB3aWR0aCA9IF9wcm9wcy53aWR0aDtcblxuXG4gICAgICB2YXIgY2xhc3NOYW1lcyA9ICgwLCBfY2xhc3NuYW1lczIuZGVmYXVsdCkoJ1ZpcnR1YWxTY3JvbGwnLCBjbGFzc05hbWUpO1xuXG4gICAgICByZXR1cm4gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoX0dyaWQyLmRlZmF1bHQsIHtcbiAgICAgICAgcmVmOiAnR3JpZCcsXG4gICAgICAgICdhcmlhLWxhYmVsJzogdGhpcy5wcm9wc1snYXJpYS1sYWJlbCddLFxuICAgICAgICBjbGFzc05hbWU6IGNsYXNzTmFtZXMsXG4gICAgICAgIGNvbHVtbldpZHRoOiB3aWR0aCxcbiAgICAgICAgY29sdW1uc0NvdW50OiAxLFxuICAgICAgICBoZWlnaHQ6IGhlaWdodCxcbiAgICAgICAgbm9Db250ZW50UmVuZGVyZXI6IG5vUm93c1JlbmRlcmVyLFxuICAgICAgICBvblNjcm9sbDogZnVuY3Rpb24gb25TY3JvbGwoX3JlZikge1xuICAgICAgICAgIHZhciBjbGllbnRIZWlnaHQgPSBfcmVmLmNsaWVudEhlaWdodDtcbiAgICAgICAgICB2YXIgc2Nyb2xsSGVpZ2h0ID0gX3JlZi5zY3JvbGxIZWlnaHQ7XG4gICAgICAgICAgdmFyIHNjcm9sbFRvcCA9IF9yZWYuc2Nyb2xsVG9wO1xuICAgICAgICAgIHJldHVybiBfb25TY3JvbGwoeyBjbGllbnRIZWlnaHQ6IGNsaWVudEhlaWdodCwgc2Nyb2xsSGVpZ2h0OiBzY3JvbGxIZWlnaHQsIHNjcm9sbFRvcDogc2Nyb2xsVG9wIH0pO1xuICAgICAgICB9LFxuICAgICAgICBvblNlY3Rpb25SZW5kZXJlZDogZnVuY3Rpb24gb25TZWN0aW9uUmVuZGVyZWQoX3JlZjIpIHtcbiAgICAgICAgICB2YXIgcm93T3ZlcnNjYW5TdGFydEluZGV4ID0gX3JlZjIucm93T3ZlcnNjYW5TdGFydEluZGV4O1xuICAgICAgICAgIHZhciByb3dPdmVyc2NhblN0b3BJbmRleCA9IF9yZWYyLnJvd092ZXJzY2FuU3RvcEluZGV4O1xuICAgICAgICAgIHZhciByb3dTdGFydEluZGV4ID0gX3JlZjIucm93U3RhcnRJbmRleDtcbiAgICAgICAgICB2YXIgcm93U3RvcEluZGV4ID0gX3JlZjIucm93U3RvcEluZGV4O1xuICAgICAgICAgIHJldHVybiBvblJvd3NSZW5kZXJlZCh7XG4gICAgICAgICAgICBvdmVyc2NhblN0YXJ0SW5kZXg6IHJvd092ZXJzY2FuU3RhcnRJbmRleCxcbiAgICAgICAgICAgIG92ZXJzY2FuU3RvcEluZGV4OiByb3dPdmVyc2NhblN0b3BJbmRleCxcbiAgICAgICAgICAgIHN0YXJ0SW5kZXg6IHJvd1N0YXJ0SW5kZXgsXG4gICAgICAgICAgICBzdG9wSW5kZXg6IHJvd1N0b3BJbmRleFxuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBvdmVyc2NhblJvd3NDb3VudDogb3ZlcnNjYW5Sb3dzQ291bnQsXG4gICAgICAgIHJlbmRlckNlbGw6IGZ1bmN0aW9uIHJlbmRlckNlbGwoX3JlZjMpIHtcbiAgICAgICAgICB2YXIgY29sdW1uSW5kZXggPSBfcmVmMy5jb2x1bW5JbmRleDtcbiAgICAgICAgICB2YXIgcm93SW5kZXggPSBfcmVmMy5yb3dJbmRleDtcbiAgICAgICAgICByZXR1cm4gcm93UmVuZGVyZXIocm93SW5kZXgpO1xuICAgICAgICB9LFxuICAgICAgICByb3dIZWlnaHQ6IHJvd0hlaWdodCxcbiAgICAgICAgcm93c0NvdW50OiByb3dzQ291bnQsXG4gICAgICAgIHNjcm9sbFRvUm93OiBzY3JvbGxUb0luZGV4LFxuICAgICAgICBzY3JvbGxUb3A6IHNjcm9sbFRvcCxcbiAgICAgICAgd2lkdGg6IHdpZHRoXG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdzaG91bGRDb21wb25lbnRVcGRhdGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUpIHtcbiAgICAgIHJldHVybiAoMCwgX3JlYWN0QWRkb25zU2hhbGxvd0NvbXBhcmUyLmRlZmF1bHQpKHRoaXMsIG5leHRQcm9wcywgbmV4dFN0YXRlKTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gVmlydHVhbFNjcm9sbDtcbn0oX3JlYWN0LkNvbXBvbmVudCk7XG5cblZpcnR1YWxTY3JvbGwucHJvcFR5cGVzID0ge1xuICAnYXJpYS1sYWJlbCc6IF9yZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuXG4gIC8qKiBPcHRpb25hbCBDU1MgY2xhc3MgbmFtZSAqL1xuICBjbGFzc05hbWU6IF9yZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuXG4gIC8qKiBIZWlnaHQgY29uc3RyYWludCBmb3IgbGlzdCAoZGV0ZXJtaW5lcyBob3cgbWFueSBhY3R1YWwgcm93cyBhcmUgcmVuZGVyZWQpICovXG4gIGhlaWdodDogX3JlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcblxuICAvKiogT3B0aW9uYWwgcmVuZGVyZXIgdG8gYmUgdXNlZCBpbiBwbGFjZSBvZiByb3dzIHdoZW4gcm93c0NvdW50IGlzIDAgKi9cbiAgbm9Sb3dzUmVuZGVyZXI6IF9yZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuXG4gIC8qKlxuICAgKiBDYWxsYmFjayBpbnZva2VkIHdpdGggaW5mb3JtYXRpb24gYWJvdXQgdGhlIHNsaWNlIG9mIHJvd3MgdGhhdCB3ZXJlIGp1c3QgcmVuZGVyZWQuXG4gICAqICh7IHN0YXJ0SW5kZXgsIHN0b3BJbmRleCB9KTogdm9pZFxuICAgKi9cbiAgb25Sb3dzUmVuZGVyZWQ6IF9yZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuXG4gIC8qKlxuICAgKiBOdW1iZXIgb2Ygcm93cyB0byByZW5kZXIgYWJvdmUvYmVsb3cgdGhlIHZpc2libGUgYm91bmRzIG9mIHRoZSBsaXN0LlxuICAgKiBUaGVzZSByb3dzIGNhbiBoZWxwIGZvciBzbW9vdGhlciBzY3JvbGxpbmcgb24gdG91Y2ggZGV2aWNlcy5cbiAgICovXG4gIG92ZXJzY2FuUm93c0NvdW50OiBfcmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuXG4gIC8qKlxuICAgKiBDYWxsYmFjayBpbnZva2VkIHdoZW5ldmVyIHRoZSBzY3JvbGwgb2Zmc2V0IGNoYW5nZXMgd2l0aGluIHRoZSBpbm5lciBzY3JvbGxhYmxlIHJlZ2lvbi5cbiAgICogVGhpcyBjYWxsYmFjayBjYW4gYmUgdXNlZCB0byBzeW5jIHNjcm9sbGluZyBiZXR3ZWVuIGxpc3RzLCB0YWJsZXMsIG9yIGdyaWRzLlxuICAgKiAoeyBjbGllbnRIZWlnaHQsIHNjcm9sbEhlaWdodCwgc2Nyb2xsVG9wIH0pOiB2b2lkXG4gICAqL1xuICBvblNjcm9sbDogX3JlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG5cbiAgLyoqXG4gICAqIEVpdGhlciBhIGZpeGVkIHJvdyBoZWlnaHQgKG51bWJlcikgb3IgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIGhlaWdodCBvZiBhIHJvdyBnaXZlbiBpdHMgaW5kZXguXG4gICAqIChpbmRleDogbnVtYmVyKTogbnVtYmVyXG4gICAqL1xuICByb3dIZWlnaHQ6IF9yZWFjdC5Qcm9wVHlwZXMub25lT2ZUeXBlKFtfcmVhY3QuUHJvcFR5cGVzLm51bWJlciwgX3JlYWN0LlByb3BUeXBlcy5mdW5jXSkuaXNSZXF1aXJlZCxcblxuICAvKiogUmVzcG9uc2JpbGUgZm9yIHJlbmRlcmluZyBhIHJvdyBnaXZlbiBhbiBpbmRleCAqL1xuICByb3dSZW5kZXJlcjogX3JlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG5cbiAgLyoqIE51bWJlciBvZiByb3dzIGluIGxpc3QuICovXG4gIHJvd3NDb3VudDogX3JlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcblxuICAvKiogUm93IGluZGV4IHRvIGVuc3VyZSB2aXNpYmxlIChieSBmb3JjZWZ1bGx5IHNjcm9sbGluZyBpZiBuZWNlc3NhcnkpICovXG4gIHNjcm9sbFRvSW5kZXg6IF9yZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuXG4gIC8qKiBWZXJ0aWNhbCBvZmZzZXQuICovXG4gIHNjcm9sbFRvcDogX3JlYWN0LlByb3BUeXBlcy5udW1iZXIsXG5cbiAgLyoqIFdpZHRoIG9mIGxpc3QgKi9cbiAgd2lkdGg6IF9yZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWRcbn07XG5WaXJ0dWFsU2Nyb2xsLmRlZmF1bHRQcm9wcyA9IHtcbiAgbm9Sb3dzUmVuZGVyZXI6IGZ1bmN0aW9uIG5vUm93c1JlbmRlcmVyKCkge1xuICAgIHJldHVybiBudWxsO1xuICB9LFxuICBvblJvd3NSZW5kZXJlZDogZnVuY3Rpb24gb25Sb3dzUmVuZGVyZWQoKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH0sXG4gIG9uU2Nyb2xsOiBmdW5jdGlvbiBvblNjcm9sbCgpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfSxcbiAgb3ZlcnNjYW5Sb3dzQ291bnQ6IDEwXG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gVmlydHVhbFNjcm9sbDsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLlZpcnR1YWxTY3JvbGwgPSBleHBvcnRzLmRlZmF1bHQgPSB1bmRlZmluZWQ7XG5cbnZhciBfVmlydHVhbFNjcm9sbDIgPSByZXF1aXJlKCcuL1ZpcnR1YWxTY3JvbGwnKTtcblxudmFyIF9WaXJ0dWFsU2Nyb2xsMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1ZpcnR1YWxTY3JvbGwyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gX1ZpcnR1YWxTY3JvbGwzLmRlZmF1bHQ7XG5leHBvcnRzLlZpcnR1YWxTY3JvbGwgPSBfVmlydHVhbFNjcm9sbDMuZGVmYXVsdDsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfQXJyb3dLZXlTdGVwcGVyID0gcmVxdWlyZSgnLi9BcnJvd0tleVN0ZXBwZXInKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdBcnJvd0tleVN0ZXBwZXInLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfQXJyb3dLZXlTdGVwcGVyLkFycm93S2V5U3RlcHBlcjtcbiAgfVxufSk7XG5cbnZhciBfQXV0b1NpemVyID0gcmVxdWlyZSgnLi9BdXRvU2l6ZXInKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdBdXRvU2l6ZXInLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfQXV0b1NpemVyLkF1dG9TaXplcjtcbiAgfVxufSk7XG5cbnZhciBfQ29sdW1uU2l6ZXIgPSByZXF1aXJlKCcuL0NvbHVtblNpemVyJyk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnQ29sdW1uU2l6ZXInLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfQ29sdW1uU2l6ZXIuQ29sdW1uU2l6ZXI7XG4gIH1cbn0pO1xuXG52YXIgX0ZsZXhUYWJsZSA9IHJlcXVpcmUoJy4vRmxleFRhYmxlJyk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnRmxleFRhYmxlJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX0ZsZXhUYWJsZS5GbGV4VGFibGU7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdGbGV4Q29sdW1uJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX0ZsZXhUYWJsZS5GbGV4Q29sdW1uO1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnU29ydERpcmVjdGlvbicsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9GbGV4VGFibGUuU29ydERpcmVjdGlvbjtcbiAgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ1NvcnRJbmRpY2F0b3InLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfRmxleFRhYmxlLlNvcnRJbmRpY2F0b3I7XG4gIH1cbn0pO1xuXG52YXIgX0dyaWQgPSByZXF1aXJlKCcuL0dyaWQnKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdHcmlkJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX0dyaWQuR3JpZDtcbiAgfVxufSk7XG5cbnZhciBfSW5maW5pdGVMb2FkZXIgPSByZXF1aXJlKCcuL0luZmluaXRlTG9hZGVyJyk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnSW5maW5pdGVMb2FkZXInLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfSW5maW5pdGVMb2FkZXIuSW5maW5pdGVMb2FkZXI7XG4gIH1cbn0pO1xuXG52YXIgX1Njcm9sbFN5bmMgPSByZXF1aXJlKCcuL1Njcm9sbFN5bmMnKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdTY3JvbGxTeW5jJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX1Njcm9sbFN5bmMuU2Nyb2xsU3luYztcbiAgfVxufSk7XG5cbnZhciBfVmlydHVhbFNjcm9sbCA9IHJlcXVpcmUoJy4vVmlydHVhbFNjcm9sbCcpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ1ZpcnR1YWxTY3JvbGwnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfVmlydHVhbFNjcm9sbC5WaXJ0dWFsU2Nyb2xsO1xuICB9XG59KTsiLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuKiBEZXRlY3QgRWxlbWVudCBSZXNpemUuXG4qIEZvcmtlZCBpbiBvcmRlciB0byBndWFyZCBhZ2FpbnN0IHVuc2FmZSAnd2luZG93JyBhbmQgJ2RvY3VtZW50JyByZWZlcmVuY2VzLlxuKlxuKiBodHRwczovL2dpdGh1Yi5jb20vc2RlY2ltYS9qYXZhc2NyaXB0LWRldGVjdC1lbGVtZW50LXJlc2l6ZVxuKiBTZWJhc3RpYW4gRGVjaW1hXG4qXG4qIHZlcnNpb246IDAuNS4zXG4qKi9cblxuLy8gQ2hlY2sgYGRvY3VtZW50YCBhbmQgYHdpbmRvd2AgaW4gY2FzZSBvZiBzZXJ2ZXItc2lkZSByZW5kZXJpbmdcbnZhciBfd2luZG93O1xuaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gIF93aW5kb3cgPSB3aW5kb3c7XG59IGVsc2UgaWYgKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJykge1xuICBfd2luZG93ID0gc2VsZjtcbn0gZWxzZSB7XG4gIF93aW5kb3cgPSB1bmRlZmluZWQ7XG59XG5cbnZhciBhdHRhY2hFdmVudCA9IHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcgJiYgZG9jdW1lbnQuYXR0YWNoRXZlbnQ7XG52YXIgc3R5bGVzQ3JlYXRlZCA9IGZhbHNlO1xuXG5pZiAoIWF0dGFjaEV2ZW50KSB7XG4gIHZhciByZXF1ZXN0RnJhbWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHJhZiA9IF93aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IF93aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IF93aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IGZ1bmN0aW9uIChmbikge1xuICAgICAgcmV0dXJuIF93aW5kb3cuc2V0VGltZW91dChmbiwgMjApO1xuICAgIH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChmbikge1xuICAgICAgcmV0dXJuIHJhZihmbik7XG4gICAgfTtcbiAgfSgpO1xuXG4gIHZhciBjYW5jZWxGcmFtZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgY2FuY2VsID0gX3dpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSB8fCBfd2luZG93Lm1vekNhbmNlbEFuaW1hdGlvbkZyYW1lIHx8IF93aW5kb3cud2Via2l0Q2FuY2VsQW5pbWF0aW9uRnJhbWUgfHwgX3dpbmRvdy5jbGVhclRpbWVvdXQ7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChpZCkge1xuICAgICAgcmV0dXJuIGNhbmNlbChpZCk7XG4gICAgfTtcbiAgfSgpO1xuXG4gIHZhciByZXNldFRyaWdnZXJzID0gZnVuY3Rpb24gcmVzZXRUcmlnZ2VycyhlbGVtZW50KSB7XG4gICAgdmFyIHRyaWdnZXJzID0gZWxlbWVudC5fX3Jlc2l6ZVRyaWdnZXJzX18sXG4gICAgICAgIGV4cGFuZCA9IHRyaWdnZXJzLmZpcnN0RWxlbWVudENoaWxkLFxuICAgICAgICBjb250cmFjdCA9IHRyaWdnZXJzLmxhc3RFbGVtZW50Q2hpbGQsXG4gICAgICAgIGV4cGFuZENoaWxkID0gZXhwYW5kLmZpcnN0RWxlbWVudENoaWxkO1xuICAgIGNvbnRyYWN0LnNjcm9sbExlZnQgPSBjb250cmFjdC5zY3JvbGxXaWR0aDtcbiAgICBjb250cmFjdC5zY3JvbGxUb3AgPSBjb250cmFjdC5zY3JvbGxIZWlnaHQ7XG4gICAgZXhwYW5kQ2hpbGQuc3R5bGUud2lkdGggPSBleHBhbmQub2Zmc2V0V2lkdGggKyAxICsgJ3B4JztcbiAgICBleHBhbmRDaGlsZC5zdHlsZS5oZWlnaHQgPSBleHBhbmQub2Zmc2V0SGVpZ2h0ICsgMSArICdweCc7XG4gICAgZXhwYW5kLnNjcm9sbExlZnQgPSBleHBhbmQuc2Nyb2xsV2lkdGg7XG4gICAgZXhwYW5kLnNjcm9sbFRvcCA9IGV4cGFuZC5zY3JvbGxIZWlnaHQ7XG4gIH07XG5cbiAgdmFyIGNoZWNrVHJpZ2dlcnMgPSBmdW5jdGlvbiBjaGVja1RyaWdnZXJzKGVsZW1lbnQpIHtcbiAgICByZXR1cm4gZWxlbWVudC5vZmZzZXRXaWR0aCAhPSBlbGVtZW50Ll9fcmVzaXplTGFzdF9fLndpZHRoIHx8IGVsZW1lbnQub2Zmc2V0SGVpZ2h0ICE9IGVsZW1lbnQuX19yZXNpemVMYXN0X18uaGVpZ2h0O1xuICB9O1xuXG4gIHZhciBzY3JvbGxMaXN0ZW5lciA9IGZ1bmN0aW9uIHNjcm9sbExpc3RlbmVyKGUpIHtcbiAgICB2YXIgZWxlbWVudCA9IHRoaXM7XG4gICAgcmVzZXRUcmlnZ2Vycyh0aGlzKTtcbiAgICBpZiAodGhpcy5fX3Jlc2l6ZVJBRl9fKSBjYW5jZWxGcmFtZSh0aGlzLl9fcmVzaXplUkFGX18pO1xuICAgIHRoaXMuX19yZXNpemVSQUZfXyA9IHJlcXVlc3RGcmFtZShmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoY2hlY2tUcmlnZ2VycyhlbGVtZW50KSkge1xuICAgICAgICBlbGVtZW50Ll9fcmVzaXplTGFzdF9fLndpZHRoID0gZWxlbWVudC5vZmZzZXRXaWR0aDtcbiAgICAgICAgZWxlbWVudC5fX3Jlc2l6ZUxhc3RfXy5oZWlnaHQgPSBlbGVtZW50Lm9mZnNldEhlaWdodDtcbiAgICAgICAgZWxlbWVudC5fX3Jlc2l6ZUxpc3RlbmVyc19fLmZvckVhY2goZnVuY3Rpb24gKGZuKSB7XG4gICAgICAgICAgZm4uY2FsbChlbGVtZW50LCBlKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgLyogRGV0ZWN0IENTUyBBbmltYXRpb25zIHN1cHBvcnQgdG8gZGV0ZWN0IGVsZW1lbnQgZGlzcGxheS9yZS1hdHRhY2ggKi9cbiAgdmFyIGFuaW1hdGlvbiA9IGZhbHNlLFxuICAgICAgYW5pbWF0aW9uc3RyaW5nID0gJ2FuaW1hdGlvbicsXG4gICAgICBrZXlmcmFtZXByZWZpeCA9ICcnLFxuICAgICAgYW5pbWF0aW9uc3RhcnRldmVudCA9ICdhbmltYXRpb25zdGFydCcsXG4gICAgICBkb21QcmVmaXhlcyA9ICdXZWJraXQgTW96IE8gbXMnLnNwbGl0KCcgJyksXG4gICAgICBzdGFydEV2ZW50cyA9ICd3ZWJraXRBbmltYXRpb25TdGFydCBhbmltYXRpb25zdGFydCBvQW5pbWF0aW9uU3RhcnQgTVNBbmltYXRpb25TdGFydCcuc3BsaXQoJyAnKSxcbiAgICAgIHBmeCA9ICcnO1xuICB7XG4gICAgdmFyIGVsbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zha2VlbGVtZW50Jyk7XG4gICAgaWYgKGVsbS5zdHlsZS5hbmltYXRpb25OYW1lICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGFuaW1hdGlvbiA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKGFuaW1hdGlvbiA9PT0gZmFsc2UpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZG9tUHJlZml4ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGVsbS5zdHlsZVtkb21QcmVmaXhlc1tpXSArICdBbmltYXRpb25OYW1lJ10gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHBmeCA9IGRvbVByZWZpeGVzW2ldO1xuICAgICAgICAgIGFuaW1hdGlvbnN0cmluZyA9IHBmeCArICdBbmltYXRpb24nO1xuICAgICAgICAgIGtleWZyYW1lcHJlZml4ID0gJy0nICsgcGZ4LnRvTG93ZXJDYXNlKCkgKyAnLSc7XG4gICAgICAgICAgYW5pbWF0aW9uc3RhcnRldmVudCA9IHN0YXJ0RXZlbnRzW2ldO1xuICAgICAgICAgIGFuaW1hdGlvbiA9IHRydWU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB2YXIgYW5pbWF0aW9uTmFtZSA9ICdyZXNpemVhbmltJztcbiAgdmFyIGFuaW1hdGlvbktleWZyYW1lcyA9ICdAJyArIGtleWZyYW1lcHJlZml4ICsgJ2tleWZyYW1lcyAnICsgYW5pbWF0aW9uTmFtZSArICcgeyBmcm9tIHsgb3BhY2l0eTogMDsgfSB0byB7IG9wYWNpdHk6IDA7IH0gfSAnO1xuICB2YXIgYW5pbWF0aW9uU3R5bGUgPSBrZXlmcmFtZXByZWZpeCArICdhbmltYXRpb246IDFtcyAnICsgYW5pbWF0aW9uTmFtZSArICc7ICc7XG59XG5cbnZhciBjcmVhdGVTdHlsZXMgPSBmdW5jdGlvbiBjcmVhdGVTdHlsZXMoKSB7XG4gIGlmICghc3R5bGVzQ3JlYXRlZCkge1xuICAgIC8vb3BhY2l0eTowIHdvcmtzIGFyb3VuZCBhIGNocm9tZSBidWcgaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTI4NjM2MFxuICAgIHZhciBjc3MgPSAoYW5pbWF0aW9uS2V5ZnJhbWVzID8gYW5pbWF0aW9uS2V5ZnJhbWVzIDogJycpICsgJy5yZXNpemUtdHJpZ2dlcnMgeyAnICsgKGFuaW1hdGlvblN0eWxlID8gYW5pbWF0aW9uU3R5bGUgOiAnJykgKyAndmlzaWJpbGl0eTogaGlkZGVuOyBvcGFjaXR5OiAwOyB9ICcgKyAnLnJlc2l6ZS10cmlnZ2VycywgLnJlc2l6ZS10cmlnZ2VycyA+IGRpdiwgLmNvbnRyYWN0LXRyaWdnZXI6YmVmb3JlIHsgY29udGVudDogXFxcIiBcXFwiOyBkaXNwbGF5OiBibG9jazsgcG9zaXRpb246IGFic29sdXRlOyB0b3A6IDA7IGxlZnQ6IDA7IGhlaWdodDogMTAwJTsgd2lkdGg6IDEwMCU7IG92ZXJmbG93OiBoaWRkZW47IH0gLnJlc2l6ZS10cmlnZ2VycyA+IGRpdiB7IGJhY2tncm91bmQ6ICNlZWU7IG92ZXJmbG93OiBhdXRvOyB9IC5jb250cmFjdC10cmlnZ2VyOmJlZm9yZSB7IHdpZHRoOiAyMDAlOyBoZWlnaHQ6IDIwMCU7IH0nLFxuICAgICAgICBoZWFkID0gZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdLFxuICAgICAgICBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG5cbiAgICBzdHlsZS50eXBlID0gJ3RleHQvY3NzJztcbiAgICBpZiAoc3R5bGUuc3R5bGVTaGVldCkge1xuICAgICAgc3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHlsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgICB9XG5cbiAgICBoZWFkLmFwcGVuZENoaWxkKHN0eWxlKTtcbiAgICBzdHlsZXNDcmVhdGVkID0gdHJ1ZTtcbiAgfVxufTtcblxudmFyIGFkZFJlc2l6ZUxpc3RlbmVyID0gZnVuY3Rpb24gYWRkUmVzaXplTGlzdGVuZXIoZWxlbWVudCwgZm4pIHtcbiAgaWYgKGF0dGFjaEV2ZW50KSBlbGVtZW50LmF0dGFjaEV2ZW50KCdvbnJlc2l6ZScsIGZuKTtlbHNlIHtcbiAgICBpZiAoIWVsZW1lbnQuX19yZXNpemVUcmlnZ2Vyc19fKSB7XG4gICAgICBpZiAoZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KS5wb3NpdGlvbiA9PSAnc3RhdGljJykgZWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9ICdyZWxhdGl2ZSc7XG4gICAgICBjcmVhdGVTdHlsZXMoKTtcbiAgICAgIGVsZW1lbnQuX19yZXNpemVMYXN0X18gPSB7fTtcbiAgICAgIGVsZW1lbnQuX19yZXNpemVMaXN0ZW5lcnNfXyA9IFtdO1xuICAgICAgKGVsZW1lbnQuX19yZXNpemVUcmlnZ2Vyc19fID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JykpLmNsYXNzTmFtZSA9ICdyZXNpemUtdHJpZ2dlcnMnO1xuICAgICAgZWxlbWVudC5fX3Jlc2l6ZVRyaWdnZXJzX18uaW5uZXJIVE1MID0gJzxkaXYgY2xhc3M9XCJleHBhbmQtdHJpZ2dlclwiPjxkaXY+PC9kaXY+PC9kaXY+JyArICc8ZGl2IGNsYXNzPVwiY29udHJhY3QtdHJpZ2dlclwiPjwvZGl2Pic7XG4gICAgICBlbGVtZW50LmFwcGVuZENoaWxkKGVsZW1lbnQuX19yZXNpemVUcmlnZ2Vyc19fKTtcbiAgICAgIHJlc2V0VHJpZ2dlcnMoZWxlbWVudCk7XG4gICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHNjcm9sbExpc3RlbmVyLCB0cnVlKTtcblxuICAgICAgLyogTGlzdGVuIGZvciBhIGNzcyBhbmltYXRpb24gdG8gZGV0ZWN0IGVsZW1lbnQgZGlzcGxheS9yZS1hdHRhY2ggKi9cbiAgICAgIGFuaW1hdGlvbnN0YXJ0ZXZlbnQgJiYgZWxlbWVudC5fX3Jlc2l6ZVRyaWdnZXJzX18uYWRkRXZlbnRMaXN0ZW5lcihhbmltYXRpb25zdGFydGV2ZW50LCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBpZiAoZS5hbmltYXRpb25OYW1lID09IGFuaW1hdGlvbk5hbWUpIHJlc2V0VHJpZ2dlcnMoZWxlbWVudCk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgZWxlbWVudC5fX3Jlc2l6ZUxpc3RlbmVyc19fLnB1c2goZm4pO1xuICB9XG59O1xuXG52YXIgcmVtb3ZlUmVzaXplTGlzdGVuZXIgPSBmdW5jdGlvbiByZW1vdmVSZXNpemVMaXN0ZW5lcihlbGVtZW50LCBmbikge1xuICBpZiAoYXR0YWNoRXZlbnQpIGVsZW1lbnQuZGV0YWNoRXZlbnQoJ29ucmVzaXplJywgZm4pO2Vsc2Uge1xuICAgIGVsZW1lbnQuX19yZXNpemVMaXN0ZW5lcnNfXy5zcGxpY2UoZWxlbWVudC5fX3Jlc2l6ZUxpc3RlbmVyc19fLmluZGV4T2YoZm4pLCAxKTtcbiAgICBpZiAoIWVsZW1lbnQuX19yZXNpemVMaXN0ZW5lcnNfXy5sZW5ndGgpIHtcbiAgICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgc2Nyb2xsTGlzdGVuZXIpO1xuICAgICAgZWxlbWVudC5fX3Jlc2l6ZVRyaWdnZXJzX18gPSAhZWxlbWVudC5yZW1vdmVDaGlsZChlbGVtZW50Ll9fcmVzaXplVHJpZ2dlcnNfXyk7XG4gICAgfVxuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgYWRkUmVzaXplTGlzdGVuZXI6IGFkZFJlc2l6ZUxpc3RlbmVyLFxuICByZW1vdmVSZXNpemVMaXN0ZW5lcjogcmVtb3ZlUmVzaXplTGlzdGVuZXJcbn07IiwiJ3VzZSBzdHJpY3QnO1xubW9kdWxlLmV4cG9ydHMgPSAhISh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuZG9jdW1lbnQgJiYgd2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQpOyIsIid1c2Ugc3RyaWN0JztcblxudmFyIGNhblVzZURPTSA9IHJlcXVpcmUoJy4vaW5ET00nKTtcblxudmFyIHNpemU7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHJlY2FsYykge1xuICBpZiAoIXNpemUgfHwgcmVjYWxjKSB7XG4gICAgaWYgKGNhblVzZURPTSkge1xuICAgICAgdmFyIHNjcm9sbERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgICBzY3JvbGxEaXYuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgc2Nyb2xsRGl2LnN0eWxlLnRvcCA9ICctOTk5OXB4JztcbiAgICAgIHNjcm9sbERpdi5zdHlsZS53aWR0aCA9ICc1MHB4JztcbiAgICAgIHNjcm9sbERpdi5zdHlsZS5oZWlnaHQgPSAnNTBweCc7XG4gICAgICBzY3JvbGxEaXYuc3R5bGUub3ZlcmZsb3cgPSAnc2Nyb2xsJztcblxuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzY3JvbGxEaXYpO1xuICAgICAgc2l6ZSA9IHNjcm9sbERpdi5vZmZzZXRXaWR0aCAtIHNjcm9sbERpdi5jbGllbnRXaWR0aDtcbiAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoc2Nyb2xsRGl2KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gc2l6ZTtcbn07IiwidmFyIG5vdyA9IHJlcXVpcmUoJ3BlcmZvcm1hbmNlLW5vdycpXG4gICwgcm9vdCA9IHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnID8gZ2xvYmFsIDogd2luZG93XG4gICwgdmVuZG9ycyA9IFsnbW96JywgJ3dlYmtpdCddXG4gICwgc3VmZml4ID0gJ0FuaW1hdGlvbkZyYW1lJ1xuICAsIHJhZiA9IHJvb3RbJ3JlcXVlc3QnICsgc3VmZml4XVxuICAsIGNhZiA9IHJvb3RbJ2NhbmNlbCcgKyBzdWZmaXhdIHx8IHJvb3RbJ2NhbmNlbFJlcXVlc3QnICsgc3VmZml4XVxuXG5mb3IodmFyIGkgPSAwOyAhcmFmICYmIGkgPCB2ZW5kb3JzLmxlbmd0aDsgaSsrKSB7XG4gIHJhZiA9IHJvb3RbdmVuZG9yc1tpXSArICdSZXF1ZXN0JyArIHN1ZmZpeF1cbiAgY2FmID0gcm9vdFt2ZW5kb3JzW2ldICsgJ0NhbmNlbCcgKyBzdWZmaXhdXG4gICAgICB8fCByb290W3ZlbmRvcnNbaV0gKyAnQ2FuY2VsUmVxdWVzdCcgKyBzdWZmaXhdXG59XG5cbi8vIFNvbWUgdmVyc2lvbnMgb2YgRkYgaGF2ZSByQUYgYnV0IG5vdCBjQUZcbmlmKCFyYWYgfHwgIWNhZikge1xuICB2YXIgbGFzdCA9IDBcbiAgICAsIGlkID0gMFxuICAgICwgcXVldWUgPSBbXVxuICAgICwgZnJhbWVEdXJhdGlvbiA9IDEwMDAgLyA2MFxuXG4gIHJhZiA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgaWYocXVldWUubGVuZ3RoID09PSAwKSB7XG4gICAgICB2YXIgX25vdyA9IG5vdygpXG4gICAgICAgICwgbmV4dCA9IE1hdGgubWF4KDAsIGZyYW1lRHVyYXRpb24gLSAoX25vdyAtIGxhc3QpKVxuICAgICAgbGFzdCA9IG5leHQgKyBfbm93XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgY3AgPSBxdWV1ZS5zbGljZSgwKVxuICAgICAgICAvLyBDbGVhciBxdWV1ZSBoZXJlIHRvIHByZXZlbnRcbiAgICAgICAgLy8gY2FsbGJhY2tzIGZyb20gYXBwZW5kaW5nIGxpc3RlbmVyc1xuICAgICAgICAvLyB0byB0aGUgY3VycmVudCBmcmFtZSdzIHF1ZXVlXG4gICAgICAgIHF1ZXVlLmxlbmd0aCA9IDBcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGNwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYoIWNwW2ldLmNhbmNlbGxlZCkge1xuICAgICAgICAgICAgdHJ5e1xuICAgICAgICAgICAgICBjcFtpXS5jYWxsYmFjayhsYXN0KVxuICAgICAgICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7IHRocm93IGUgfSwgMClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sIE1hdGgucm91bmQobmV4dCkpXG4gICAgfVxuICAgIHF1ZXVlLnB1c2goe1xuICAgICAgaGFuZGxlOiArK2lkLFxuICAgICAgY2FsbGJhY2s6IGNhbGxiYWNrLFxuICAgICAgY2FuY2VsbGVkOiBmYWxzZVxuICAgIH0pXG4gICAgcmV0dXJuIGlkXG4gIH1cblxuICBjYWYgPSBmdW5jdGlvbihoYW5kbGUpIHtcbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgcXVldWUubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmKHF1ZXVlW2ldLmhhbmRsZSA9PT0gaGFuZGxlKSB7XG4gICAgICAgIHF1ZXVlW2ldLmNhbmNlbGxlZCA9IHRydWVcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihmbikge1xuICAvLyBXcmFwIGluIGEgbmV3IGZ1bmN0aW9uIHRvIHByZXZlbnRcbiAgLy8gYGNhbmNlbGAgcG90ZW50aWFsbHkgYmVpbmcgYXNzaWduZWRcbiAgLy8gdG8gdGhlIG5hdGl2ZSByQUYgZnVuY3Rpb25cbiAgcmV0dXJuIHJhZi5jYWxsKHJvb3QsIGZuKVxufVxubW9kdWxlLmV4cG9ydHMuY2FuY2VsID0gZnVuY3Rpb24oKSB7XG4gIGNhZi5hcHBseShyb290LCBhcmd1bWVudHMpXG59XG5tb2R1bGUuZXhwb3J0cy5wb2x5ZmlsbCA9IGZ1bmN0aW9uKCkge1xuICByb290LnJlcXVlc3RBbmltYXRpb25GcmFtZSA9IHJhZlxuICByb290LmNhbmNlbEFuaW1hdGlvbkZyYW1lID0gY2FmXG59XG4iLCIvLyBHZW5lcmF0ZWQgYnkgQ29mZmVlU2NyaXB0IDEuNy4xXG4oZnVuY3Rpb24oKSB7XG4gIHZhciBnZXROYW5vU2Vjb25kcywgaHJ0aW1lLCBsb2FkVGltZTtcblxuICBpZiAoKHR5cGVvZiBwZXJmb3JtYW5jZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBwZXJmb3JtYW5jZSAhPT0gbnVsbCkgJiYgcGVyZm9ybWFuY2Uubm93KSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBwZXJmb3JtYW5jZS5ub3coKTtcbiAgICB9O1xuICB9IGVsc2UgaWYgKCh0eXBlb2YgcHJvY2VzcyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBwcm9jZXNzICE9PSBudWxsKSAmJiBwcm9jZXNzLmhydGltZSkge1xuICAgIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gKGdldE5hbm9TZWNvbmRzKCkgLSBsb2FkVGltZSkgLyAxZTY7XG4gICAgfTtcbiAgICBocnRpbWUgPSBwcm9jZXNzLmhydGltZTtcbiAgICBnZXROYW5vU2Vjb25kcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGhyO1xuICAgICAgaHIgPSBocnRpbWUoKTtcbiAgICAgIHJldHVybiBoclswXSAqIDFlOSArIGhyWzFdO1xuICAgIH07XG4gICAgbG9hZFRpbWUgPSBnZXROYW5vU2Vjb25kcygpO1xuICB9IGVsc2UgaWYgKERhdGUubm93KSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBEYXRlLm5vdygpIC0gbG9hZFRpbWU7XG4gICAgfTtcbiAgICBsb2FkVGltZSA9IERhdGUubm93KCk7XG4gIH0gZWxzZSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIGxvYWRUaW1lO1xuICAgIH07XG4gICAgbG9hZFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgfVxuXG59KS5jYWxsKHRoaXMpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCdyZWFjdC9saWIvc2hhbGxvd0NvbXBhcmUnKTsiLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4qIEBwcm92aWRlc01vZHVsZSBzaGFsbG93Q29tcGFyZVxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgc2hhbGxvd0VxdWFsID0gcmVxdWlyZSgnZmJqcy9saWIvc2hhbGxvd0VxdWFsJyk7XG5cbi8qKlxuICogRG9lcyBhIHNoYWxsb3cgY29tcGFyaXNvbiBmb3IgcHJvcHMgYW5kIHN0YXRlLlxuICogU2VlIFJlYWN0Q29tcG9uZW50V2l0aFB1cmVSZW5kZXJNaXhpblxuICovXG5mdW5jdGlvbiBzaGFsbG93Q29tcGFyZShpbnN0YW5jZSwgbmV4dFByb3BzLCBuZXh0U3RhdGUpIHtcbiAgcmV0dXJuICFzaGFsbG93RXF1YWwoaW5zdGFuY2UucHJvcHMsIG5leHRQcm9wcykgfHwgIXNoYWxsb3dFcXVhbChpbnN0YW5jZS5zdGF0ZSwgbmV4dFN0YXRlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzaGFsbG93Q29tcGFyZTsiLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHR5cGVjaGVja3NcbiAqIFxuICovXG5cbi8qZXNsaW50LWRpc2FibGUgbm8tc2VsZi1jb21wYXJlICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBpbmxpbmVkIE9iamVjdC5pcyBwb2x5ZmlsbCB0byBhdm9pZCByZXF1aXJpbmcgY29uc3VtZXJzIHNoaXAgdGhlaXIgb3duXG4gKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9PYmplY3QvaXNcbiAqL1xuZnVuY3Rpb24gaXMoeCwgeSkge1xuICAvLyBTYW1lVmFsdWUgYWxnb3JpdGhtXG4gIGlmICh4ID09PSB5KSB7XG4gICAgLy8gU3RlcHMgMS01LCA3LTEwXG4gICAgLy8gU3RlcHMgNi5iLTYuZTogKzAgIT0gLTBcbiAgICByZXR1cm4geCAhPT0gMCB8fCAxIC8geCA9PT0gMSAvIHk7XG4gIH0gZWxzZSB7XG4gICAgLy8gU3RlcCA2LmE6IE5hTiA9PSBOYU5cbiAgICByZXR1cm4geCAhPT0geCAmJiB5ICE9PSB5O1xuICB9XG59XG5cbi8qKlxuICogUGVyZm9ybXMgZXF1YWxpdHkgYnkgaXRlcmF0aW5nIHRocm91Z2gga2V5cyBvbiBhbiBvYmplY3QgYW5kIHJldHVybmluZyBmYWxzZVxuICogd2hlbiBhbnkga2V5IGhhcyB2YWx1ZXMgd2hpY2ggYXJlIG5vdCBzdHJpY3RseSBlcXVhbCBiZXR3ZWVuIHRoZSBhcmd1bWVudHMuXG4gKiBSZXR1cm5zIHRydWUgd2hlbiB0aGUgdmFsdWVzIG9mIGFsbCBrZXlzIGFyZSBzdHJpY3RseSBlcXVhbC5cbiAqL1xuZnVuY3Rpb24gc2hhbGxvd0VxdWFsKG9iakEsIG9iakIpIHtcbiAgaWYgKGlzKG9iakEsIG9iakIpKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBpZiAodHlwZW9mIG9iakEgIT09ICdvYmplY3QnIHx8IG9iakEgPT09IG51bGwgfHwgdHlwZW9mIG9iakIgIT09ICdvYmplY3QnIHx8IG9iakIgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICB2YXIga2V5c0EgPSBPYmplY3Qua2V5cyhvYmpBKTtcbiAgdmFyIGtleXNCID0gT2JqZWN0LmtleXMob2JqQik7XG5cbiAgaWYgKGtleXNBLmxlbmd0aCAhPT0ga2V5c0IubGVuZ3RoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLy8gVGVzdCBmb3IgQSdzIGtleXMgZGlmZmVyZW50IGZyb20gQi5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzQS5sZW5ndGg7IGkrKykge1xuICAgIGlmICghaGFzT3duUHJvcGVydHkuY2FsbChvYmpCLCBrZXlzQVtpXSkgfHwgIWlzKG9iakFba2V5c0FbaV1dLCBvYmpCW2tleXNBW2ldXSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzaGFsbG93RXF1YWw7Il19
