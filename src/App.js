import React from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { green300, green700, green100 } from 'material-ui/styles/colors';
import { fade } from 'material-ui/utils/colorManipulator';
import spacing from 'material-ui/styles/spacing';

import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

const style = {
  width: "96%",
  overflow: "auto",
  position: "absolute",
  top: "66px",
  bottom: "58px",
};

const muiTheme = getMuiTheme({
  fontFamily: '微软雅黑, Helvetica',
  palette: {
    primary1Color: green300,
    primary2Color: green700,
    primary3Color: green100,
  }
});

export default class App extends React.Component {
  render() {
    const { children } = this.props;

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <Header />

          <div className="app-container" style={style}>
            {children}
          </div>

          <Footer />

        </div>
      </MuiThemeProvider>
    );
  }
}
