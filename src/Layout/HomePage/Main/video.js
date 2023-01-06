import React, { Component } from "react";

export class video extends Component {
  constructor( props ){
    super();
    this.state = { ...props };
  }
  componentWillMount(){
    window.location.replace('http://localhost:3002')
  }
  render(){
    return (<section></section>);
  }
}

export default video;