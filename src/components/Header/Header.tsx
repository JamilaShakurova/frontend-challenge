import React from 'react';
import Button from '../Button/Button';
import './Header.scss';

const Header: React.FC = () => {

    return (
        <header className='App__header'>
            <Button href={'/'} text='Все котики'/>
            <Button href={'/favorite-cats'} text='Любимые котики'/>
        </header>
    )
};

export default Header;
