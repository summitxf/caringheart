import React from 'react';

import Paper from 'material-ui/Paper';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { commonActions } from '../components/commonRedux'

const style = {
  margin: 0,
  padding: 0,
  height: "100%",
  width: "100%",
  textAlign: 'center',
  display: 'inline-block',
};

class WelcomePage extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = { code: '' };
  }

  componentDidMount() {
    const { code } = this.props.location.query
    this.setState({ code });

    this.timeoutId = setTimeout(() => {
      let token = localStorage.getItem('userToken') || null
      if (this.props.isAuth || token) {
        this.context.router.push('/app')
      } else {
        this.context.router.push('/auth')
      }
    }, 3000)
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutId)
  }

  render() {
    const { code } = this.state

    return (
      <Paper style={style} zDepth={1} >
        <div>
          {code ? <h1>Welcome : {code}</h1> : <h1>Welcome !</h1>}
        </div>
      </Paper>
    );
  }
}

WelcomePage.contextTypes = {
  router: React.PropTypes.object
}

const mapStateToProps = (state) => {
  const { pending } = state.commonReducer;
  const { isAuth } = state.authReducer.auth;
  return {
    pending, isAuth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(Object.assign(commonActions), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WelcomePage)
