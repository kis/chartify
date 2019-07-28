import React from 'react';
import { Link } from 'react-router-dom';
import { DatasetsMenu, MenuLink } from './styles';

const	links = [{
	name: 'Albums',
	path: '/albums'
}, {
	name: 'Movies',
	path: '/movies'
}];

const Header = () => (
	<DatasetsMenu>
		{links.map((link: any, i: number) => {
			return <MenuLink key={i}>
				<Link to={link.path}>{link.name}</Link>
			</MenuLink>
		})}
	</DatasetsMenu>
);

export default Header;
