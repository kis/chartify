import React from 'react';
import { Link } from 'react-router-dom';
import CSSModules from 'react-css-modules';
import styles from './header.css';

const	links = [{
	name: 'Albums',
	path: '/albums'
}, {
	name: 'Movies',
	path: '/movies'
}];

const Header = () => (
	<ul styleName="datasets-menu">
		{links.map((link: any, i: number) => {
			return <li styleName="menu-link" key={i}>
				<Link to={link.path}>{link.name}</Link>
			</li>
		})}
	</ul>
);

export default CSSModules(Header, styles, {allowMultiple: true})
