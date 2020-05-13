
import React from 'react';
import './NavBar.css';

const NavBar = ({ userName, onLogout, onWriteMessage }) => (
	<div className="nav-bar">
		<div className="nav-bar-left">
			<button className="action-buttons" onClick={onWriteMessage} title="Write Message">✎</button>
		</div>
		<div className="logo-container">
			<span className="heavy">Guest Book</span>
		</div>
		<div className="nav-bar-right">
			<button className="action-buttons" disabled>{userName || ''}</button>
			<button className="action-buttons" onClick={onLogout} title="Logout">✗</button>
		</div>
	</div>
);

export default NavBar;
