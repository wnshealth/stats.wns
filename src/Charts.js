import React, { Component } from 'react';
import ChartJS from 'chart.js';
import CountUp from 'countup.js';

import store from './store';

const d3 = require( 'd3' );

class Chart extends Component {
  constructor() {
    super();

    store.on( 'lead_count:change', ( val ) => {
      if ( this.count ) this.count.update( val );
    });
  }

  componentWillMount() {
    this.props.events.on( 'leads', this._renderCharts, this );
  }

  render() {
    return (
      <section className="jumbotron text-center">
        <div className="container">
          <div className="stats-container">
            <div className="row">
              <div className="count-container col-sm-12">
                <div className="count" ref="count"></div>
              </div>
            </div>
            <div className="row">
              <div className="filter-container col-sm-12">
                <div className="filter">{ this.props.filter + ' leads' }</div>
                <div className="created_at_date text-muted">{ this.props.created_at_date }</div>
              </div>
            </div>
          </div>
          <div className="daily-container">
            <canvas
              id="daily"
              width="400"
              height="400"
              ref="daily"
              style={ { display: [ 'none', 'block' ][ +( 'daily' === store.get( 'filter' ) ) ] } }></canvas>
          </div>
          <div className="weekly-container">
            <canvas
              id="weekly"
              width="640"
              height="400"
              ref="weekly"
              style={ { display: [ 'none', 'block' ][ +( 'weekly' === store.get( 'filter' ) ) ] } }></canvas>
          </div>
        </div>
      </section>
    );
  }

  componentDidMount() {
    var opts = {
      useEasing: true,
      useGrouping: true,
      separator: ',',
      decimal: '.'
    };

    this.count = new CountUp( this.refs.count, 0, 0, 0, 4, opts );
    if ( !this.count.error ) this.count.start();
  }

  _renderCharts() {
    var dailyCtx = document.querySelector( '#daily' );
    var weeklyCtx = document.querySelector( '#weekly' );
    var dailyData = this._dailyData();
    var weeklyData = this._weeklyData();

    new ChartJS( dailyCtx, {
      type: 'pie',
      data: {
        datasets: [
          {
            data: dailyData.data,
            backgroundColor: dailyData.backgroundColor
          }
        ],
        labels: dailyData.labels
      },
      options: {
        legend: {
          display: false
        },
        responsive: true
      }
    });

    new ChartJS( weeklyCtx, {
      type: 'bar',
      data: weeklyData,
      options: {
        title: {
          display: false
        },
        legend: {
          display: false
        },
        tooltips: {
          mode: 'index',
          intersect: false
        },
        scales: {
          xAxes: [ { stacked: true } ],
          yAxes: [ { stacked: true } ]
        },
        responsive: true
      }
    });
  };

  _dailyData() {
    var stats = store.get( 'created_at_dates' )[ 0 ];
    var sources = store.get( 'sources' );
    var data = {
      data: [],
      backgroundColor: [],
      labels: []
    };

    for ( let prop in stats.sources ) {
      data.data.push( stats.sources[ prop ].lead_count );
      data.backgroundColor.push( sources[ prop ].color );
      data.labels.push( stats.sources[ prop ].source_name );
    }

    return data;
  }

  _weeklyData() {
    var stats = store.get( 'created_at_dates' ).reverse();
    var sources = store.get( 'sources' );
    var data = {
      labels: [],
      datasets: []
    };

    stats.forEach( ( stat ) => {
      data.labels.push( stat.created_at_date.split( '-' ).splice( 1, 2 ).join( '/' ) );
    });

    for ( let prop in sources ) {
      let source = sources[ prop ];
      let dataset = {
        label: source.source_name,
        backgroundColor: source.color,
        data: []
      };

      stats.forEach( ( stat ) => {
        dataset.data.push( stat.sources[ prop ] ? stat.sources[ prop ].lead_count : 0 );
      });

      data.datasets.push( dataset );
    }

    return data;
  }
}

export default Chart;
