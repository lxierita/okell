import styled from "styled-components";
import ContinueReading from "./button";

const HeroImage = styled.img`
    width: 100%;
    object-fit: cover;
    border-radius: 5px;
    max-height: 400px;
`;

const StyledFigure = styled.figure`
    position: relative;
    border-radius: 5px;
`;

const HeroOverlay = styled.div`
  @media(min-width: 100px) {
      background-color: var(--color-bg-paper);
  }
  @media(min-width: 510px) {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: var(--color-primary-dark);
    opacity: 0.2;
    border-radius: 5px;
  }
`;

const HeroCaption = styled.figcaption`
  @media(min-width: 100px){
    position: static;
    color: var(--color-text-primary);
    background-color: var(--color-bg-default);
    width: 100%;
    padding: 4px;
  }
  
  @media(min-width: 510px) {
    width: 90%;
    position: absolute;
    top: 0;
    left: 0;
    color: var(--color-contrast-text);
    border-radius: 5px;
    padding: 32px 0px 32px 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 16px;
    z-index: 1;
    background: none;
  }
  @media(min-width: 579px) {
    width: 60%;
  }
  @media(min-width: 768px) {
    width: 50%;
  }
`;

const HeroTitle = styled.h1`
    font-size: 1.8rem;
    color: inherit;
    @media(min-width: 100px) {
      font-size: 1.3rem;
    }
    @media(min-width: 510px) {
        font-size: 1.5rem;
    }
    @media(min-width: 579px) {
      font-size: 1.6rem;
    }
    @media(min-width: 768px) {
    font-size: 1.8rem;
    }
`;

const HeroDescription = styled.h2`
    font-size: 1.4rem;
    color: inherit;
  
  @media(min-width: 100px) {
    font-size: 1.1rem;
    font-weight: normal;
  }
  @media(min-width: 510px) {
    font-size: 1.1rem;
  }
  @media(min-width: 579px) {
    font-size: 1.2rem;
  }
  @media(min-width: 768px) {
    font-size: 1.4rem;
  }
`;

export default function Hero(props){
    const { imgUrl, title, description, articleUrl } = props
    return (
        <StyledFigure>
            <HeroImage src={imgUrl} />
            <HeroOverlay />
            <HeroCaption>
                <HeroTitle>{title}</HeroTitle>
                <HeroDescription>{description}</HeroDescription>
                <ContinueReading url={articleUrl}/>
            </HeroCaption>
        </StyledFigure>
    )
}
