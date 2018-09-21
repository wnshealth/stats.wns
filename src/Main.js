import React, { Component } from 'react';

import Charts from './Chart';
import store from './store';
import Events from './events';

const axios = require( 'axios' );

class Main extends Component {
  constructor() {
    super();
    this.state = {
      leads: 0,
      filter: store.get( 'filter' )
    };
    this.events = new Events();

    store.on( 'leads:change', ( val ) => {
      this.setState( { leads: val } );
    });

    store.on( 'filter:change', ( val ) => {
      this.setState( { filter: val } );
    });
  }

  render() {
    return (
      <main role="main">
        <Charts
          leads={ this.state.leads }
          filter={ this.state.filter }
          events={ this.events }/>
      </main>
    )
  }

  componentDidMount() {
    axios.get( 'https://api.wnsposting.com/v1/stats', {
      params: {
        token: 'JNTr40Kkptr3418dY1tI'
      }
    }).then( ( response ) => {
      var data = response.data;
      store.set( 'leads', data.total_leads );
      this.events.emit( 'leads' );
    }).catch( ( error ) => {
      console.log( error );
    });
  }
}

export default Main;
