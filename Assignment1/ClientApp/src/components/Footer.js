import React, { Component } from 'react';
import './Footer.css';


export class Footer extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div id='footer'>
        <div className='footer__container'>
          Jun Lee(HyeonJun Lee)@2021
        </div>
      </div>
    );
  }
}
