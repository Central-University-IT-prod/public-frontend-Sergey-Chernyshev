import React from 'react';
import { Link } from 'react-router-dom';

import MenuIcon from './MenuIcon';

const MenuItem = ({ icon, text, link }) => {


    return (
        <Link to={link}>
            <ul >
                <div className="menu__block">
                    <MenuIcon icon={icon} />
                    <div className="menu__block-text">{text}</div>
                </div>
            </ul>
        </Link>
    );
};

export default MenuItem;
