import React from 'react';
import { NavLink } from 'react-router-dom';
import './Button.scss';

type ButtonProps = {
    href: string,
    text: string,
}

const Button: React.FC<ButtonProps> = ({href, text}) => {
    return (
        <NavLink className='App__btn' to={href}>{text}</NavLink>
    )
};

export default Button;
