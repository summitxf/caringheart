import React from 'react';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from './redux/actions.js'
import { commonActions } from '../../components/commonRedux'

class MePage extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    this.props.actions.changeHeaderAndFooter('我', 2);
  }

  render() {
    return (
      <div>
        <h1>Me</h1>
      </div>
    );
  }
}

MePage.contextTypes = {
  router: React.PropTypes.object
}

const mapStateToProps = (state) => {
  const { pending, optError } = state.commonReducer;
  const {listData, needReloadList } = state.heartReducer.heart;
  return {
    pending,
    optError,
    listData,
    needReloadList,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(Object.assign(actions, commonActions), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MePage)
