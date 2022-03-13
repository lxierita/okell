import styled from "styled-components";

const StyledMain = styled.main`
    width: 100%;
    padding: 32px;
    margin-block: 32px;
`;
export default function Layout(props){
    return <StyledMain>
        {props.children}
    </StyledMain>
}