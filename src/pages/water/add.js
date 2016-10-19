import React from 'react';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from './redux/actions.js'

const typeItems = [
  <MenuItem key={1} value={'out'} primaryText="出" />,
  <MenuItem key={2} value={'in'} primaryText="入" />,
];

const amountItems = [
  <MenuItem key={1} value={50} primaryText="50" />,
  <MenuItem key={2} value={100} primaryText="100" />,
  <MenuItem key={3} value={150} primaryText="150" />,
  <MenuItem key={4} value={200} primaryText="200" />,
  <MenuItem key={5} value={250} primaryText="250" />,
  <MenuItem key={6} value={300} primaryText="300" />,
  <MenuItem key={7} value={350} primaryText="350" />,
  <MenuItem key={8} value={400} primaryText="400" />,
  <MenuItem key={9} value={450} primaryText="450" />,
  <MenuItem key={10} value={500} primaryText="500" />,
];

class AddPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = { type: 'in', amount: 100 };
  }

  handleTypeChange = (event, index, value) => {
    this.setState({ type: value })
  };

  handleAmountChange = (event, index, value) => {
    this.setState({ amount: value })
  };

  handleSubmit = () => {
    this.props.actions.add({
      type: this.state.type,
      amount: this.state.amount,
    })
  };

  render() {
    const { addPending, addError } = this.props

    return (
      <div>
        <SelectField value={this.state.type} onChange={this.handleTypeChange} floatingLabelText="出/入" fullWidth={true}>
          {typeItems}
        </SelectField>
        <br />
        <SelectField value={this.state.amount} onChange={this.handleAmountChange} floatingLabelText="量(ml)" fullWidth={true}>
          {amountItems}
        </SelectField>
        <br />
        <RaisedButton label={addPending ? '提交中...' : '提交'} primary={true} fullWidth={true} onClick={this.handleSubmit} />
        <br />
        {addError && <div className="error-tip">Save topic failed: {addError.message || addError.toString()}</div>}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { addPending, addError } = state.waterReducer;
  return {
    addPending,
    addError,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPage)
