import React, { Component, Fragment } from 'react';
import CSSModules from 'react-css-modules';
import AppContainer from './AppContainer';
import Chart from '../components/Chart/Chart';
import Header from '../components/Header/Header';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import styles from '../components/Chart/chart.css';

class RootContainer extends Component {
  render() {
    return (
        <ErrorBoundary>
            <Fragment>
                <span id="forkongithub">
                    <a href="https://github.com/kis/chartify" target="_blank">Fork me on GitHub</a>
                </span>

                <div styleName="root-container">
                    <header styleName="container">
                        <div styleName="project-title">
                            <h2>Chartify</h2>
                            <h4>React.js plugin for building customizable charts</h4>
                        </div>
                    </header>

                    <main styleName="container">
                        <AppContainer />
                    </main>

                    <footer styleName="container">
                        <div>Made with <img styleName="heart" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Love_Heart_symbol.svg/2000px-Love_Heart_symbol.svg.png" title="love" /> Inspired by <a href="http://kinopoisk.ru" target="_blank">kinopoisk</a></div>
                    </footer>
                </div>
            </Fragment>
        </ErrorBoundary>
    );
  }
}

export default CSSModules(RootContainer, styles, {allowMultiple: true})
