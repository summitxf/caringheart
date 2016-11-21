import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from './redux/actions.js'
import * as authActions from '../auth/redux/actions'
import { commonActions } from '../../components/commonRedux'

class MePage extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    this.props.actions.changeHeaderAndFooter('我', 2);
  }

  logout = () => {
    this.props.actions.logout().then(() => {
      this.context.router.push('/')
    })
  }

  render() {
    return (
      <div>
        <RaisedButton label="Logout" secondary={true} fullWidth={true} onTouchTap={() => this.logout()} />
      </div>
    );
  }
}

MePage.contextTypes = {
  router: React.PropTypes.object
}

const mapStateToProps = (state) => {
  const { pending, optError } = state.commonReducer;
  return {
    pending,
    optError,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(Object.assign(actions, authActions, commonActions), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MePage)
