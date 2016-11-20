import React from 'react';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from './redux/actions.js'
import { commonActions } from '../../components/commonRedux'

class LoginPage extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    this.props.actions.changeHeader('用户登录');
  }

  render() {
    const { pending } = this.props

    return (
      <div>
        <TextField id="username" ref="username" floatingLabelText="用户名" fullWidth={true} onChange={this.handleChange} />
        <br />
        <TextField id="password" ref="password" type="password" floatingLabelText="密码" fullWidth={true} onChange={this.handleChange} />
        <br />
        <RaisedButton label={pending ? '提交中...' : '提交'} disabled={pending} primary={true} fullWidth={true} onClick={this.handleSubmit} />
      </div>
    );
  }
}

LoginPage.contextTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
