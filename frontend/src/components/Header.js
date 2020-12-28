import React, { useEffect } from 'react';
// useSelector for state, dispatch for actions
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, Navbar, Container, NavDropdown } from 'react-bootstrap';
import { logout, checkSession } from '../actions/userActions';

const Header = () => {
  // Access Redux actions
  const dispatch = useDispatch();

  // User state from Redux
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // User clicks logout button
  const logoutHandler = () => {
    dispatch(logout());
  };

  useEffect(() => {
    // Check user has token
    dispatch(checkSession());
  }, []);

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>Friesland Progress Reports</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              {/* Show email address and links if user logged in */}
              {userInfo ? (
                <NavDropdown title={userInfo.email} id='username'>
                  <LinkContainer to='/dashboard'>
                    <NavDropdown.Item>Dashboard</NavDropdown.Item>
                  </LinkContainer>

                  {/* Parent only links */}
                  {userInfo.role === 'parent' && (
                    <LinkContainer to='/parent'>
                      <NavDropdown.Item>My Children's reports</NavDropdown.Item>
                    </LinkContainer>
                  )}

                  {/* Student only links */}
                  {userInfo.role === 'student' && (
                    <LinkContainer to={`/report/${userInfo._id}`}>
                      <NavDropdown.Item>My Report</NavDropdown.Item>
                    </LinkContainer>
                  )}

                  {/* Teacher and Admin only links */}
                  {userInfo.role === 'teacher' ||
                    (userInfo.role === 'admin' && (
                      <LinkContainer to={`/findstudent`}>
                        <NavDropdown.Item>Find Student</NavDropdown.Item>
                      </LinkContainer>
                    ))}

                  {/* Everyone has access to logout */}
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                // No user? go back to login page
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i class='far fa-user'></i> Login
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
