import React from 'react';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import LinearProgress from 'material-ui/LinearProgress';
import Snackbar from 'material-ui/Snackbar';

import Header from '../components/Header/Header'

const style = {
  container: {
    width: "96%",
    overflow: "auto",
    position: "absolute",
    top: "66px",
    bottom: "58px",
  },
  refresh: {
    width: "96%",
    overflow: "auto",
    position: "absolute",
    top: "66px",
  },
}

class Auth extends React.Component {
  render() {
    const { children } = this.props;
    const { headerTitle, pending, optError } = this.props

    return (
      <div>
        <Header headerTitle={headerTitle} />

        <div style={style.container}>
          {children}
        </div>

        {pending &&
          <div style={style.refresh}>
            <LinearProgress mode="indeterminate" color="#FF9800" />
          </div>
        }
        {optError &&
          <Snackbar open={true} message={<div>操作失败:{optError.message || optError.toString()}</div>} autoHideDuration={3000} />
        }
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  const { headerTitle, pending, optError } = state.commonReducer;
  return {
    headerTitle,
    pending,
    optError,
  }
}

export default connect(mapStateToProps)(Auth)
