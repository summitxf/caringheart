import React from 'react';

import FontIcon from 'material-ui/FontIcon';
import { blue500, red500, greenA200 } from 'material-ui/styles/colors';
import Paper from 'material-ui/Paper';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';

const style = {
  width: "100%",
  left: 0,
  bottom: 1,
  position: "absolute"
};

const waterIcon = <FontIcon className="fa fa-tint"/>;
const heartIcon = <FontIcon className="fa fa-heartbeat"/>;
const meIcon = <FontIcon className="fa fa-user"/>;

class Footer extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  state = {
    selectedIndex: 0,
  };

  select(index, path) {
    this.setState({ selectedIndex: index });
    this.context.router.push(path);
  };

  render() {
    return (
      <Paper zDepth={1} style={style}>
        <BottomNavigation selectedIndex={this.state.selectedIndex}>
          <BottomNavigationItem label="出入量" icon={waterIcon} onTouchTap={() => this.select(0, '/app/water')} />
          <BottomNavigationItem label="血压体重" icon={heartIcon} onTouchTap={() => this.select(1, '/app/heart')} />
          <BottomNavigationItem label="我" icon={meIcon} onTouchTap={() => this.select(2, '/app/me')} />
        </BottomNavigation>
      </Paper>
    );
  }
}

Footer.contextTypes = {
  router: React.PropTypes.object
}

export default Footer;
