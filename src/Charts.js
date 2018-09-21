import React, { Component } from 'react';
import ChartJS from 'chart.js';

import store from './store';

var d3 = require( 'd3' );

class Chart extends Component {
  constructor() {
    super();
  }

  componentWillMount() {
    this.props.events.on( 'leads', this._renderChart );
  }

  render() {
    return (
      <section className="jumbotron text-center">
        <div className="container">
          <h1 className="jumbotron-heading">{ this._h1() }</h1>
          <p className="lead text-muted"></p>
        </div>
        <canvas id="pie" width="400" height="400"></canvas>
      </section>
    );
  }

  _h1() {
    return this.props.leads + ' ' + this.props.filter + ' leads'
  }

  _renderChart() {
    var ctx = document.querySelector( '#pie' );
    var pie = new ChartJS( ctx, {
      type: 'pie',
      data: {
        datasets: [{
          data: [ 10, 20, 30 ],
          backgroundColor: [
            d3.interpolateRdBu( 0.2 ),
            d3.interpolateRdBu( 0.5 ),
            d3.interpolateRdBu( 0.75 )
          ]
        }],
        labels: [
          'Red',
          'Yellow',
          'Blue'
        ]
      },
      options: {
        responsive: false,
        legend: {
          display: false
        }
      }
    });
  }
}

export default Chart;
