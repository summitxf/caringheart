import React from 'react';
import AppBar from 'material-ui/AppBar';

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
  }

  render() {
    const { headerTitle } = this.props

    return (
      <AppBar title={headerTitle} style={style} showMenuIconButton={false} />
    );
  }
}

export default Header
