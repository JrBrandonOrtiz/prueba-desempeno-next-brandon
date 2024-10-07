
import styled from "styled-components";

const FooterContainer = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #1a0592;
  color: white;
  position: relative;
  bottom: 0;
  width: 100%;
`;

const FooterText = styled.p`
  margin: 0;
`;

const Footer = () => {
    console.log("Footer rendered");
    return (
      <FooterContainer>
        <FooterText>© {new Date().getFullYear()} WorkStore. All rights reserved.</FooterText>
      </FooterContainer>
    );
  };
  
export default Footer;