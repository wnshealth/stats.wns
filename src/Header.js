import React, { Component } from 'react';

import store from './store';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      filter: null
    };

    store.on( 'filter:change', ( val ) => { this.setState( { filter: val } ); } );
  }

  render() {
    return (
      <header>
        <div className="collapse bg-dark" id="navbarHeader">
          <div className="container">
            <div className="row">
              <div className="col-sm-8 col-md-7 py-4">
                <h4 className="text-white">Stats</h4>
                <p className="text-muted">WNS lead acquisition stats, powered by AWS.</p>
              </div>
              <div className="col-sm-4 offset-md-1 py-4">
                <h4 className="text-white">Filters</h4>
                <ul className="list-unstyled text-muted">
                  <li
                    className={ 'daily' === this.state.filter ? 'text-white' : '' }
                    onClick={ this._onClick.bind( this, 'daily' ) }>Daily</li>
                  <li
                    className={ 'weekly' === this.state.filter ? 'text-white': '' }
                    onClick={ this._onClick.bind( this, 'weekly' ) }>Weekly</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="navbar navbar-dark bg-dark shadow-sm">
          <div className="container d-flex justify-content-between">
            <a href="#" className="navbar-brand d-flex align-items-center">
              <strong>WNS</strong>
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
        </div>
      </header>
    );
  }

  _onClick( filter ) {
    store.set( 'filter', filter );
  }

  componentDidMount() {
    store.set( 'filter', 'daily' );
  }
}

export default Header;
