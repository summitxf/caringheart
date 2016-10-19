import React from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import IconButton from 'material-ui/IconButton';
import LinearProgress from 'material-ui/LinearProgress';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from './redux/actions.js'
import { commonActions } from '../../components/commonRedux'

const addBtnStyle = {
  position: "fixed",
  right: "5%",
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
    if (this.props.needReloadList) {
      this.props.actions.fetchList();
    }
  }

  openAdd = () => {
    this.context.router.push('/app/water/add')
  }

  render() {
    const { listData, fetchListPending, fetchListError } = this.props

    return (
      <div>
        <div style={addBtnStyle}>
          <FloatingActionButton mini={true} onTouchTap={() => this.openAdd()} >
            <ContentAdd />
          </FloatingActionButton>
        </div>
        {fetchListPending && <div>
          <Card>
            <CardHeader title="加载中..." subtitle={<LinearProgress mode="indeterminate" />} />
          </Card>
        </div>}
        {fetchListError && <div>
          <Card>
            <CardHeader title="获取失败" subtitle={fetchListError.message || fetchListError.toString()} />
          </Card>
        </div>}
        {!fetchListPending && !fetchListError && (!listData || listData.length < 1) ?
          (<div>
            <Card>
              <CardHeader title="无数据" />
            </Card>
          </div>)
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
      <Card key={idx}>
        <CardHeader
          title={item.groupdate}
          subtitle={
            <Table>
              <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                <TableRow>
                  <TableHeaderColumn>入量(ml)</TableHeaderColumn>
                  <TableHeaderColumn>出量(ml)</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false}>
                <TableRow>
                  <TableRowColumn style={inStyle}>{item.groupinamount}</TableRowColumn>
                  <TableRowColumn style={outStyle}>{item.groupoutamount}</TableRowColumn>
                </TableRow>
              </TableBody>
            </Table>
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
          {item.type === 'in' ? '入' : '出'}-<span style={item.type === 'in' ? inStyle : outStyle}>{item.amount}</span>
        </TableRowColumn>
        <TableRowColumn>{item.date}</TableRowColumn>
        <TableRowColumn>
          <IconButton iconClassName="fa fa-trash-o" iconStyle={{ 'fontSize': '16px' }} />
        </TableRowColumn>
      </TableRow>
    )
  }
};

ListPage.contextTypes = {
  router: React.PropTypes.object
}

const mapStateToProps = (state) => {
  const {listData, fetchListPending, fetchListError, needReloadList } = state.waterReducer;
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
