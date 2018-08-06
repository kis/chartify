import React, { PureComponent, Fragment } from 'react';
import { Route, Link } from 'react-router-dom';
import CSSModules from 'react-css-modules';
import styles from './header.css';

class Header extends PureComponent {
	render() {
		return (
			<ul styleName="datasets-menu">
				<li>
					<Link to="/albums">Albums</Link>
				</li>
				<li>
					<Link to="/movies">Movies</Link>
				</li>
			</ul>
		);
	}
}

export default CSSModules(Header, styles, {allowMultiple: true})
