import React, { Component } from 'react';

import Charts from './Charts';
import Table from './Table';
import store from './store';
import Events from './events';

const axios = require( 'axios' );
const d3 = require( 'd3' );

class Main extends Component {
  constructor() {
    super();
    this.state = {
      sources: [],
      filter: store.get( 'filter' ),
      created_at_date: ''
    };
    this.events = new Events();

    store.on( 'filter:change', ( val ) => {
      store.set( 'lead_count', store.get( store.get( 'filter' ) + '_total_lead_count' ) );
      store.set( 'created_at_date', store.get( store.get( 'filter' ) + '_created_at_date' ) );
      this.setState({
        filter: val,
        created_at_date: store.get( 'created_at_date' )
      });
    });
  }

  render() {
    return (
      <main role="main">
        <Charts
          filter={ this.state.filter }
          created_at_date={ this.state.created_at_date }
          events={ this.events } />
        <Table sources={ this.state.sources } />
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
      var l = data.created_at_dates.length;
      var sevenDaysAgo = data.created_at_dates[ l - 1 ].created_at_date
        .split( '-' ).splice( 1, 2 ).join( '/' );
      var today = data.created_at_dates[ 0 ].created_at_date
        .split( '-' ).splice( 1, 2 ).join( '/' );

      store.set( 'weekly_total_lead_count', data.weekly_total_lead_count );
      store.set( 'weekly_created_at_date', sevenDaysAgo + '-' + today );
      store.set( 'daily_total_lead_count', data.created_at_dates[ 0 ].daily_total_lead_count );
      store.set( 'daily_created_at_date', today );
      store.set( 'lead_count', store.get( store.get( 'filter' ) + '_total_lead_count' ) );
      store.set( 'created_at_date', store.get( store.get( 'filter' ) + '_created_at_date' ) );
      store.set( 'created_at_dates', data.created_at_dates );

      this._eachDate( data.created_at_dates );
      this.setState( { created_at_date: store.get( 'created_at_date' ) } );
      this.events.emit( 'leads' );
    }).catch( ( error ) => {
      console.log( error );
    });
  }

  _eachDate( dates ) {
    var sources = {};
    var sourcesArray = [];
    var sourceCount = 0;
    var range;

    dates.forEach( ( date, i ) => {
      for ( let prop in date.sources ) {
        let source = date.sources[ prop ];
        if ( !sources[ prop ] ) {
          sources[ prop ] = {
            source_name: source.source_name,
            daily_total_lead_count: 0 === i ? source.lead_count : 0,
            weekly_total_lead_count: 0
          }
          sourceCount++;
        }
        sources[ prop ].weekly_total_lead_count += source.lead_count;
      }
    });

    range = 1 / sourceCount;
    for ( let prop in sources ) {
      sources[ prop ].color = d3.interpolateGnBu( range * sourceCount );
      sources[ prop ].key = sources[ prop ].source_name;
      sourcesArray.push( sources[ prop ] );
      sourceCount--;
    }

    store.set( 'sources', sources );
    this.setState( { sources: sourcesArray } );
  }
}

export default Main;
