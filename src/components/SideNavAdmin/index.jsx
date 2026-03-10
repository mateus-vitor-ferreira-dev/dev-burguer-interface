import { navLinks } from './navLink';
import Logo from '../../assets/Logo.png';
import { SignOutIcon } from '@phosphor-icons/react';
import { Container, Footer, NavLink, NavLinkContainer, LogoContainer } from './styles';
import { useUser } from '../../hooks/UserContext';
import { useResolvedPath } from 'react-router-dom';


export function SideNavAdmin() {

    const { logout } = useUser();
    const { pathname } = useResolvedPath();

    return (
        <Container>
            <LogoContainer>
                <img src={Logo} alt="Hamburguer Logo DevBurguer" />
            </LogoContainer>
            <NavLinkContainer>
                {navLinks.map( (link) => (
                    <NavLink 
                        key={link.id}
                        to={link.path}
                        $isActive={pathname === link.path}
                    > 
                        {link.icon}
                        <span>
                        {link.label}
                        </span> 
                    </NavLink>
                ))}
            </NavLinkContainer>
            <Footer>
                <NavLink to='/login' onClick={logout}>
                    <SignOutIcon />
                    <p>Sair</p>
                </NavLink>
            </Footer>
        </Container>
    )
}