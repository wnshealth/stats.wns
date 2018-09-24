import React, { Component } from 'react';

class TableRow extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <tr>
        <td className="color"><div style={ { backgroundColor: this.props.source.color } }></div></td>
        <td>{ this.props.source.source_name }</td>
        <td>{ this.props.source.daily_total_lead_count }</td>
        <td>{ this.props.source.weekly_total_lead_count }</td>
      </tr>
    );
  }
}

export default TableRow;
