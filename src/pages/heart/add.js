import React from 'react';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from './redux/actions.js'
import { commonActions } from '../../components/commonRedux'

class AddPage extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    this.props.actions.changeHeaderAndFooter('血压体重', 1);
  }

  handleChange = (event) => {
    let key = event.target.id;
    let value = event.target.value;
    let newState = {}
    newState[key] = value;
    this.setState(newState)
  };

  handleSubmit = () => {
    this.props.actions.add({
      low: this.state.low,
      high: this.state.high,
      heartbeat: this.state.heartbeat,
      weight: this.state.weight,
    })
  };

  render() {
    const { addPending, addError } = this.props

    return (
      <div>
        <TextField hintText="80" id="low" type="number" floatingLabelText="低压(mmHg)舒张压" fullWidth={true} onChange={this.handleChange} />
        <br />
        <TextField hintText="120" id="high" type="number" floatingLabelText="高压(mmHg)收缩压" fullWidth={true} onChange={this.handleChange} />
        <br />
        <TextField hintText="60" id="heartbeat" type="number" floatingLabelText="心率(bpm)" fullWidth={true} onChange={this.handleChange} />
        <br />
        <TextField hintText="60" id="weight" type="number" floatingLabelText="体重(kg)" fullWidth={true} onChange={this.handleChange} />
        <br />
        <RaisedButton label={addPending ? '提交中...' : '提交'} primary={true} fullWidth={true} onClick={this.handleSubmit} />
        <br />
        {addError && <div className="error-tip">Save topic failed: {addError.message || addError.toString()}</div>}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { addPending, addError } = state.heartReducer.heart;
  return {
    addPending,
    addError,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(Object.assign(actions, commonActions), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPage)
