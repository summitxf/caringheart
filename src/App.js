import React from 'react';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { green300, green700, green100 } from 'material-ui/styles/colors';

import LinearProgress from 'material-ui/LinearProgress';
import Snackbar from 'material-ui/Snackbar';

import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

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


const muiTheme = getMuiTheme({
  fontFamily: '微软雅黑, Helvetica',
  palette: {
    primary1Color: green300,
    primary2Color: green700,
    primary3Color: green100,
  }
});

class App extends React.Component {
  render() {
    const { children } = this.props;
    const { headerTitle, selectedIndex, pending, optError } = this.props

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <Header headerTitle={headerTitle} />

          <div style={style.container}>
            {children}
          </div>

          {pending &&
            <div style={style.refresh}>
              <LinearProgress mode="indeterminate" color="#FF9800" />
            </div>}
          {optError && <Snackbar open={true} message={<div>操作失败:{optError.message || optError.toString()}</div>} autoHideDuration={3000} />}

          <Footer selectedIndex={selectedIndex} />

        </div>
      </MuiThemeProvider>
    );
  }
}


const mapStateToProps = (state) => {
  const { headerTitle, selectedIndex, pending, optError } = state.commonReducer;
  return {
    headerTitle,
    selectedIndex,
    pending,
    optError,
  }
}

export default connect(mapStateToProps)(App)
