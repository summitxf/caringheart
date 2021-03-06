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

const inStyle = { color: "#FF5722" };
const outStyle = { color: "#03A9F4" };

class ListPage extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    this.props.actions.changeHeaderAndFooter('出入量', 0);
    if (this.props.needReloadList && !this.props.pending) {
      this.props.actions.fetchList();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.needReloadList && !nextProps.pending) {
      this.props.actions.fetchList();
    }
  }

  componentWillUnmount() {
    this.props.actions.dismissOptError();
  }

  openAdd = () => {
    this.context.router.push('/app/water/add')
  }

  handleDelete = item => {
    this.props.actions.deleteData(item);
  }

  render() {
    const { listData, pending, optError, needReloadList } = this.props

    return (
      <div>
        <div style={addBtnStyle}>
          <FloatingActionButton mini={true} onTouchTap={() => this.openAdd()} >
            <ContentAdd />
          </FloatingActionButton>
        </div>
        {(!pending && !optError && (!listData || listData.length < 1)) &&
          <Card>
            <CardHeader title="无数据" />
          </Card>
        }
        {(!pending && !optError && (listData && listData.length > 0)) &&
          <div>
            {listData.map(this.renderCard)}
          </div>
        }
      </div>
    )
  }

  renderCard = (item, idx) => {
    return (
      <Card key={idx}>
        <CardHeader
          title={item.groupdate.substring(0, 10)}
          subtitle={
            <div>
              <div><span>入量(ml)</span> <span style={inStyle}>{item.groupinamount}</span></div>
              <div><span>出量(ml)</span> <span style={outStyle}>{item.groupoutamount}</span></div>
            </div>
          }
          actAsExpander={true}
          showExpandableButton={true}
          />
        <CardText expandable={true}>
          <Table>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn>出入量(ml)</TableHeaderColumn>
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
          {item.type === 'in' ? '入' : '出'} <span style={item.type === 'in' ? inStyle : outStyle}>{item.amount}</span>
        </TableRowColumn>
        <TableRowColumn>{item.date.substring(11, 19)}</TableRowColumn>
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
  const { pending, optError } = state.commonReducer;
  const { listData, needReloadList } = state.waterReducer.water;
  return {
    pending,
    optError,
    listData,
    needReloadList,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(Object.assign(actions, commonActions), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListPage)
