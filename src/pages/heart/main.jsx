import React from 'react';

class MainPage extends React.Component {
  render() {
    const { children } = this.props;

    return (
      <div>
        {children}
      </div>
    );
  }
}

export default MainPage;
