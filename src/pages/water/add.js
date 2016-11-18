import React from 'react';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from './redux/actions.js'
import { commonActions } from '../../components/commonRedux'

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

  constructor(props, context) {
    super(props, context);
    this.state = { type: 'in', amount: 100 };
  }

  componentDidMount() {
    this.props.actions.changeHeaderAndFooter('出入量', 0);
  }

  componentWillReceiveProps(props) {
    if (props.needReloadList) {
      this.context.router.push('/app/water')
    }
  }

  componentWillUnmount() {
    this.props.actions.dismissOptError();
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
      amount: Number(this.state.amount),
      date: new Date(),
    })
  };

  render() {
    const { pending } = this.props

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
  const { needReloadList } = state.waterReducer.water;
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
