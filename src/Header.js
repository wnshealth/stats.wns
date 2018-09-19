import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <header>
        <div class="collapse bg-dark" id="navbarHeader">
          <div class="container">
            <div class="row">
              <div class="col-sm-8 col-md-7 py-4">
                <h4 class="text-white">Analytics</h4>
                <p class="text-muted">Daily/weekly WNS lead acquisition stats.</p>
              </div>
              <div class="col-sm-4 offset-md-1 py-4">
                <h4 class="text-white">Filters</h4>
                <ul class="list-unstyled text-muted">
                  <li>Daily</li>
                  <li>Weekly</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="navbar navbar-dark bg-dark shadow-sm">
          <div class="container d-flex justify-content-between">
            <a href="#" class="navbar-brand d-flex align-items-center">
              <strong>WNS</strong>
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
