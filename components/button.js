import styled from "styled-components";
import Link from 'next/link'

const StyledLink = styled.a`
    text-decoration: none;
    color: var(--color-primary-main);
    margin-top: 16px;
    
    &:hover {
      text-decoration: underline;
    }
    ${props => props.customStyle && props.customStyle};
`;

export default function ContinueReading(props){
    const { url } = props;
    return (
        <Link href={url} customStyle={props.customStyle}>
            <StyledLink>Continue reading...</StyledLink>
        </Link>
    )
}