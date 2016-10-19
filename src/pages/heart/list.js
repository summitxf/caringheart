import React from 'react';

import Avatar from 'material-ui/Avatar';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import { grey400, darkBlack, lightBlack } from 'material-ui/styles/colors';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from './redux/actions.js'
import { commonActions } from '../../components/commonRedux'

class ListPage extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    this.props.actions.changeHeaderAndFooter('血压体重', 1);
    if (this.props.needReloadList) {
      this.props.actions.fetchList();
    }
  }

  render() {
    return (
      <div>
        <List>
          <ListItem
            leftAvatar={<Avatar src="" />}

            primaryText="me, Scott, Jennifer"
            secondaryText={
              <p>
                <span style={{ color: darkBlack }}>Summer BBQ</span><br />
                Wish I could come, but I&apos;m out of town this weekend.
            </p>
            }
            secondaryTextLines={2}
            />
          <Divider inset={true} />
          <ListItem
            leftAvatar={<Avatar src="" />}

            primaryText="me, Scott, Jennifer"
            secondaryText={
              <p>
                <span style={{ color: darkBlack }}>Summer BBQ</span><br />
                Wish I could come, but I&apos;m out of town this weekend.
            </p>
            }
            secondaryTextLines={2}
            />
          <Divider inset={true} />
          <ListItem
            leftAvatar={<Avatar src="" />}

            primaryText="me, Scott, Jennifer"
            secondaryText={
              <p>
                <span style={{ color: darkBlack }}>Summer BBQ</span><br />
                Wish I could come, but I&apos;m out of town this weekend.
            </p>
            }
            secondaryTextLines={2}
            />
          <Divider inset={true} />
          <ListItem
            leftAvatar={<Avatar src="" />}

            primaryText="me, Scott, Jennifer"
            secondaryText={
              <p>
                <span style={{ color: darkBlack }}>Summer BBQ</span><br />
                Wish I could come, but I&apos;m out of town this weekend.
            </p>
            }
            secondaryTextLines={2}
            />
          <Divider inset={true} />
          <ListItem
            leftAvatar={<Avatar src="" />}

            primaryText="me, Scott, Jennifer"
            secondaryText={
              <p>
                <span style={{ color: darkBlack }}>Summer BBQ</span><br />
                Wish I could come, but I&apos;m out of town this weekend.
            </p>
            }
            secondaryTextLines={2}
            />
          <Divider inset={true} />
          <ListItem
            leftAvatar={<Avatar src="" />}

            primaryText="me, Scott, Jennifer"
            secondaryText={
              <p>
                <span style={{ color: darkBlack }}>Summer BBQ</span><br />
                Wish I could come, but I&apos;m out of town this weekend.
            </p>
            }
            secondaryTextLines={2}
            />
          <Divider inset={true} />
          <ListItem
            leftAvatar={<Avatar src="" />}

            primaryText="me, Scott, Jennifer"
            secondaryText={
              <p>
                <span style={{ color: darkBlack }}>Summer BBQ</span><br />
                Wish I could come, but I&apos;m out of town this weekend.
            </p>
            }
            secondaryTextLines={2}
            />
          <Divider inset={true} />
          <ListItem
            leftAvatar={<Avatar src="" />}

            primaryText="me, Scott, Jennifer"
            secondaryText={
              <p>
                <span style={{ color: darkBlack }}>Summer BBQ</span><br />
                Wish I could come, but I&apos;m out of town this weekend.
            </p>
            }
            secondaryTextLines={2}
            />
          <Divider inset={true} />
        </List>
      </div>
    )
  }
};

ListPage.contextTypes = {
  router: React.PropTypes.object
}

const mapStateToProps = (state) => {
  const {listData, fetchListPending, fetchListError, needReloadList } = state.heartReducer;
  return {
    listData,
    fetchListPending,
    fetchListError,
    needReloadList,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ ...actions, ...commonActions }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListPage)
