import React from "react";
import { Navbar, NavItem } from "react-materialize";
const Nav = () => (
  <Navbar brand="logo" left>
    <NavItem href="/">Getting started</NavItem>
    <NavItem href="/signin">Sign Up</NavItem>
  </Navbar>
);

export default Nav;
