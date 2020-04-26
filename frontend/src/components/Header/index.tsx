import React from 'react';

import { Link, useHistory } from 'react-router-dom';

import { Container, MenuItemSelected } from './styles';

import Logo from '../../assets/logo.svg';

interface HeaderProps {
  size?: 'small' | 'large';
}

const Header: React.FC<HeaderProps> = ({ size = 'large' }: HeaderProps) => {
  const history = useHistory();

  return (
    <Container size={size}>
      <header>
        <img src={Logo} alt="GoFinances" />
        <nav>
          <Link to="/">
            Listagem
            <MenuItemSelected active={history.location.pathname === '/'} />
          </Link>
          <Link to="/import">
            Importar
            <MenuItemSelected
              active={history.location.pathname === '/import'}
            />
          </Link>
        </nav>
      </header>
    </Container>
  );
};

export default Header;
