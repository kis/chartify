import React, { Component } from 'react';

export default class ErrorBoundary extends Component<any, any> {
    constructor(props: any) {
      super(props);
      this.state = { hasError: false };
    }
  
    componentDidCatch(error: any, info: any) {
      this.setState({ hasError: true });
    }
  
    render() {
      if (this.state.hasError) {
        return <h1>Something went wrong.</h1>;
      }
      return this.props.children;
    }
}