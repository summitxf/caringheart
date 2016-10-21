import React from 'react';

class WelcomePage extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = { code: '' };
  }

  componentDidMount() {
    const { code } = this.props.location.query
    this.setState({ code });

    this.timeoutId = setTimeout(() => {
      this.context.router.push('/app')
    }, 3000)
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutId)
  }

  render() {
    const { code } = this.state

    return (
      <div>
        {code ? <h1>Welcome : {code}</h1> : <h1>Welcome !</h1>}
      </div>
    );
  }
}

WelcomePage.contextTypes = {
  router: React.PropTypes.object
}

export default WelcomePage;
