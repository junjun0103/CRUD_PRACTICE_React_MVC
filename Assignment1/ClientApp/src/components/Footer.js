import React, { Component } from 'react';
import './Footer.css';


export class Footer extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div id='footer'>
        <div className='footer__links__container'>
          <a className='footer_links'>Home</a>
          <a className='footer_links'>Customer</a>
          <a className='footer_links'>Product</a>
          <a className='footer_links'>Sales</a>
          <a className='footer_links'>Store</a>
        </div>
      </div>
    );
  }
}
