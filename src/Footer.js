import React, { Component } from 'react';

class Footer extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <footer>
        <div class="powered">
          <a href="https://aws.amazon.com/what-is-cloud-computing">
            <img src="https://d0.awsstatic.com/logos/powered-by-aws.png" alt="Powered by AWS Cloud Computing" />
          </a>
        </div>
      </footer>
    );
  }
}

export default Footer;
