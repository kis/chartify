import React, { PureComponent, Fragment } from 'react';
import { Route, Link } from 'react-router-dom';
import CSSModules from 'react-css-modules';
import styles from './header.css';

class Header extends PureComponent {
	constructor(props) {
		super();
		this.state = {
			links: [{
				name: 'Albums',
				path: '/albums'
			}, {
				name: 'Movies',
				path: '/movies'
			}]
		}
	}
	
	render() {
		const { links } = this.state;

		return (
			<ul styleName="datasets-menu">
				{links.map((link, i) => {
					return <li styleName="menu-link" key={i}>
						<Link to={link.path}>{link.name}</Link>
					</li>
				})}
			</ul>
		);
	}
}

export default CSSModules(Header, styles, {allowMultiple: true})
