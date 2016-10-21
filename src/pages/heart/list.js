import React from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import IconButton from 'material-ui/IconButton';
import LinearProgress from 'material-ui/LinearProgress';
import Snackbar from 'material-ui/Snackbar';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from './redux/actions.js'
import { commonActions } from '../../components/commonRedux'

const addBtnStyle = {
  position: "fixed",
  left: "5%",
  bottom: "10%"
};

const lowStyle = { color: "#03A9F4" };
const highStyle = { color: "#FF5722" };

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

  componentWillReceiveProps(props) {
    if (props.needReloadList && !props.listPending) {
      this.props.actions.fetchList();
    }
  }

  openAdd = () => {
    this.context.router.push('/app/heart/add')
  }

  handleDelete = item => {
    this.props.actions.deleteData(item);
  }

  render() {
    const { listData, listPending, listError, delPending, delError, needReloadList } = this.props

    return (
      <div>
        <div style={addBtnStyle}>
          <FloatingActionButton mini={true} onTouchTap={() => this.openAdd()} >
            <ContentAdd />
          </FloatingActionButton>
        </div>
        {listPending &&
          <Card>
            <CardHeader title="加载中..." subtitle={<LinearProgress mode="indeterminate" />} />
          </Card>
        }
        {listError && <Snackbar open={true} message={<div>获取失败:{listError.message || listError.toString()}</div>} autoHideDuration={3000} />}
        {delPending &&
          <Card>
            <CardHeader title="操作中..." subtitle={<LinearProgress mode="indeterminate" />} />
          </Card>
        }
        {delError && <Snackbar open={true} message={<div>删除失败:{delError.message || delError.toString()}</div>} autoHideDuration={3000} />}
        {!listPending && !listError && (!listData || listData.length < 1) ?
          <Card>
            <CardHeader title="无数据" />
          </Card>
          :
          <div>
            {listData.map(this.renderCard)}
          </div>
        }
      </div>
    )
  }

  renderCard = (item, idx) => {
    return (
      <Card key={idx} initiallyExpanded={true}>
        <CardHeader title={item.groupdate} actAsExpander={true} showExpandableButton={true} />
        <CardText expandable={true}>
          <Table>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn>血压<br />(mmHg)</TableHeaderColumn>
                <TableHeaderColumn>心率<br />(bpm)</TableHeaderColumn>
                <TableHeaderColumn>体重<br />(kg)</TableHeaderColumn>
                <TableHeaderColumn>时间</TableHeaderColumn>
                <TableHeaderColumn></TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {item.listdata.map(this.renderTableRow)}
            </TableBody>
          </Table>
        </CardText>
      </Card>
    )
  }

  renderTableRow = (item, idx) => {
    return (
      <TableRow key={idx}>
        <TableRowColumn>
          <span style={lowStyle}>{item.low}</span>-<span style={highStyle}>{item.high}</span>
        </TableRowColumn>
        <TableRowColumn>{item.heartbeat}</TableRowColumn>
        <TableRowColumn>{item.weight}</TableRowColumn>
        <TableRowColumn>{item.date}</TableRowColumn>
        <TableRowColumn>
          <IconButton iconClassName="fa fa-trash-o" iconStyle={{ 'fontSize': '16px' }} onClick={() => this.handleDelete(item)} />
        </TableRowColumn>
      </TableRow>
    )
  }
};

ListPage.contextTypes = {
  router: React.PropTypes.object
}

const mapStateToProps = (state) => {
  const {listData, listPending, listError, delPending, delError, needReloadList } = state.heartReducer.heart;
  return {
    listData,
    listPending,
    listError,
    needReloadList,
    delPending,
    delError,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(Object.assign(actions, commonActions), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListPage)
