import React, { Component } from 'react';

import Charts from './Charts';
import store from './store';
import Events from './events';

const axios = require( 'axios' );

const LEAD_COUNT_MAP = {
  'daily': 'daily_total_lead_count',
  'weekly': 'weekly_total_lead_count'
};

class Main extends Component {
  constructor() {
    super();
    this.state = {
      lead_count: 0,
      filter: store.get( 'filter' )
    };
    this.events = new Events();

    store.on( 'lead_count:change', ( val ) => {
      this.setState( { lead_count: val } );
    });

    store.on( 'filter:change', ( val ) => {
      this.setState( { filter: val } );
      store.set( 'lead_count', store.get( LEAD_COUNT_MAP[ store.get( 'filter' ) ] ) || 0 );
    });
  }

  render() {
    return (
      <main role="main">
        <Charts
          lead_count={ this.state.lead_count }
          filter={ this.state.filter }
          events={ this.events }/>
      </main>
    )
  }

  componentDidMount() {
    axios.get( 'https://api.wnsposting.com/v1/stats/weekly', {
      params: {
        token: 'JNTr40Kkptr3418dY1tI'
      }
    }).then( ( response ) => {
      var data = response.data;
      store.set( 'weekly_total_lead_count', data.weekly_total_lead_count );
      store.set( 'daily_total_lead_count', data.created_at_dates[ 1 ].daily_total_lead_count );
      store.set( 'lead_count', store.get( LEAD_COUNT_MAP[ store.get( 'filter' ) ] ) );
      this.events.emit( 'leads' );
    }).catch( ( error ) => {
      console.log( error );
    });
  }
}

export default Main;
