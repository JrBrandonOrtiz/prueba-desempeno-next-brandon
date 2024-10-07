"use client";
import Link from "next/link";
import styled from "styled-components";
import { FaRegHeart } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { useSession, signOut } from "next-auth/react";
import Input from "../UI/Input/Input"; 
import Button from "../UI/Button/Button"; 

const NavBarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background: #1a0592;
  border-bottom: 1px solid #ccc;
  border-radius: 10px;
  flex-wrap: wrap;
`;

const Logo = styled.a`
  font-size: 24px;
  font-weight: bold;
  color: #ffffff;
  text-decoration: none;
  margin-right: auto;
`;

const SearchContainer = styled(Input)`
  width: 200px;
  margin: 0 20px;
  border-radius: 20px;

  @media (max-width: 768px) {
    width: 150px;
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const IconButton = styled(Button)`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
  color: white;
  border-radius: 50%;
  padding: 10px;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
    background: rgba(255, 255, 255, 0.1);
  }
`;

const StyledLink = styled(Link)`
  font-size: 16px;
  text-decoration: none;
  color: #000;
  padding: 8px 12px;
  border-radius: 20px;
  transition: background 0.3s ease, color 0.3s ease;

  &:hover {
    background: #e6e4e48e;
  }

  &.register {
    background-color: #000;
    color: #fff;
  }
`;

const LogoutButton = styled.button`
  font-size: 16px;
  color: #fff;
  background: transparent;
  border: 2px solid #fff;
  border-radius: 20px;
  padding: 8px 12px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const NavBar = () => {
  const { data: session } = useSession();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    window.location.href = 'http://localhost:3000';
  };

  return (
    <NavBarContainer>
      <Logo href="/">WorkStore</Logo>

      {session ? (
        <>
          <SearchContainer type="text" placeholder="Search products..." />
          <IconContainer>
            <IconButton label={<IoCartOutline />} />
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
          </IconContainer>
        </>
      ) : (
        <>
          <StyledLink href="/login">Sign In</StyledLink>
          <StyledLink href="/register" className="register">Sign Up</StyledLink>
        </>
      )}
    </NavBarContainer>
  );
};

export default NavBar;

//