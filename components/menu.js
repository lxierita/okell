import {useRouter} from "next/router";
import {useState} from "react";
import styled from "styled-components";

const FlexWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-content: center;
    background-color: var(--color-primary-main);
    letter-spacing: 1.3px;
    border-radius: ${props => props.smRadius ? "0px 0px 2px 2px" : "0px"};
    gap: ${props => props.gap ? props.gap : 0};
    box-shadow: ${props => props.hasShadow && "inset 0px 7px 8px -9px var(--color-primary-dark)"};
`;

const TitleText = styled.div`
    color: var(--color-contrast-text);
    font-size: 1.6rem;
    padding: 16px 32px;
    margin-left: 16px;
    letter-spacing: 5px;
`;

const MainLink = styled.div`
  display: flex;
  align-content: flex-end;
  align-self: flex-end;
  
  & > a {
    display: inline-block;
    padding: 16px;
    text-decoration: none;
    color: ${props => props.isActive ? "var(--color-contrast-text)" : "var(--color-primary-gray)"};
    border-bottom: ${props => props.isActive ? "3px solid var(--color-secondary-light)" : "3px solid var(--color-primary-main)"};
`;

const SecondaryLinks = styled.nav`
    display: flex;
    justify-content: space-between;
    padding: 16px;
    width: 100%;
    letter-spacing: 1px;
  
    & > a {
      display: inline-block;
      color: var(--color-primary-gray);
      text-decoration: none;
    }
`;

export default function Menu(props) {
    const router = useRouter();
    const [isHome, updateLoc] = useState(router.pathname === "/");

    return (
        <header>
            <FlexWrapper>
                <TitleText>OKELL</TitleText>
                <FlexWrapper gap="8px">
                    <MainLink isActive={isHome}>
                        <a href="/" >Home</a>
                    </MainLink>
                    <MainLink>
                        <a href="/business-linkin" onClick={() => updateLoc("/business-linkin")}>Business Link-In</a>
                    </MainLink>
                </FlexWrapper>
            </FlexWrapper>
            {isHome && (
                <FlexWrapper smRadius hasShadow>
                    <SecondaryLinks>
                        {props.categories.map(i => <a href={`/articles/${i.id}`} key={i.id}>{i.label}</a>)}
                    </SecondaryLinks>
                </FlexWrapper>
            )}
        </header>
    )
}