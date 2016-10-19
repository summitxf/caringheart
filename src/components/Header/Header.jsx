import React from 'react';
import AppBar from 'material-ui/AppBar';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

const style = {
  width: "100%",
  left: 0,
  top: 1,
  position: "absolute",
  textAlign: "center",
};

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { headerTitle: '' };
  }

  render() {
    const { headerTitle } = this.props

    return (
      <AppBar title={headerTitle} style={style} showMenuIconButton={false} />
    );
  }
}

const mapStateToProps = (state) => {
  const { headerTitle } = state.headerReducer;
  return {
    headerTitle
  }
}

export default connect(mapStateToProps)(Header)
