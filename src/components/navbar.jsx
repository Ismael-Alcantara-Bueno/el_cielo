import React from 'react'
import { Link } from 'react-router-dom'
import  Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Container } from 'react-bootstrap'

function navbar() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand><Nav.Link as={Link} to={'/'}>Home</Nav.Link></Navbar.Brand>
          <Nav>
            <Nav.Link as={Link} to={"/Lista"}>
              Lista de videojuegos
            </Nav.Link>
            <Nav.Link as={Link} to={"/Favoritos"}>
              Lista de Favoritos
            </Nav.Link>
            <Nav.Link as={Link} to={"/Agregar"}>
              Agregar Videojuego
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}

export default navbar