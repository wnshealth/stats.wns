import React, { Component } from 'react';

import TableRow from './TableRow';
import store from './store';

class Table extends Component {
  constructor() {
    super();
  }

  componentWillMount() {}

  render() {
    return (
      <section class="stats-table">
        <div className="container">
          <table className="table table-borderless">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Source</th>
                <th scope="col">Daily Leads</th>
                <th scope="col">Weekly Leads</th>
              </tr>
            </thead>
            <tbody>
              { this.props.sources.map( this._eachRow, this ) }
            </tbody>
          </table>
        </div>
      </section>
    );
  }

  _eachRow( source ) {
    return (
      <TableRow source={ source } />
    );
  }
}

export default Table;
