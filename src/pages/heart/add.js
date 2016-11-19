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

  componentWillReceiveProps(nextProps) {
    if (nextProps.needReloadList) {
      this.context.router.push('/app/heart')
    }
  }

  componentWillUnmount() {
    this.props.actions.dismissOptError();
  }

  handleChange = (event) => {
    let key = event.target.id;
    let value = event.target.value;
    let newState = {}
    newState[key] = value;
    this.setState(newState)
  };

  handleSubmit = () => {
    if (!this.state || !this.state.low) {
      this.refs.low.input.focus();
    } else if (!this.state.high) {
      this.refs.high.input.focus();
    } else if (!this.state.heartbeat) {
      this.refs.heartbeat.input.focus();
    } else if (!this.state.weight) {
      this.refs.weight.input.focus();
    } else {
      this.props.actions.add({
        low: Number(this.state.low),
        high: Number(this.state.high),
        heartbeat: Number(this.state.heartbeat),
        weight: Number(this.state.weight),
        date: new Date(),
      })
    }
  };

  render() {
    const { pending } = this.props

    return (
      <div>
        <TextField hintText="80" id="low" ref="low" type="number" floatingLabelText="低压(mmHg)舒张压" fullWidth={true} onChange={this.handleChange} />
        <br />
        <TextField hintText="120" id="high" ref="high" type="number" floatingLabelText="高压(mmHg)收缩压" fullWidth={true} onChange={this.handleChange} />
        <br />
        <TextField hintText="60" id="heartbeat" ref="heartbeat" type="number" floatingLabelText="心率(bpm)" fullWidth={true} onChange={this.handleChange} />
        <br />
        <TextField hintText="60" id="weight" ref="weight" type="number" floatingLabelText="体重(kg)" fullWidth={true} onChange={this.handleChange} />
        <br />
        <RaisedButton label={pending ? '提交中...' : '提交'} disabled={pending} primary={true} fullWidth={true} onClick={this.handleSubmit} />
      </div>
    );
  }
}

AddPage.contextTypes = {
  router: React.PropTypes.object
}

const mapStateToProps = (state) => {
  const { pending } = state.commonReducer;
  const { needReloadList } = state.heartReducer.heart;
  return {
    pending, needReloadList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(Object.assign(actions, commonActions), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPage)
