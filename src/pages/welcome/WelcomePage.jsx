import React from 'react';

class WelcomePage extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    this.timeoutId = setTimeout(() => {
      this.context.router.push('/app')
    }, 3000)
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutId)
  }

  render() {
    return (
      <div>
        <h1>Welcome</h1>
      </div>
    );
  }
}

WelcomePage.contextTypes = {
  router: React.PropTypes.object
}

export default WelcomePage;
