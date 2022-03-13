import styled from 'styled-components'
import {Fragment} from "react";
import Menu from "../components/menu";
import Hero from "../components/hero";
import Layout from "../components/layout";

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`
const cat = [
  {
    id: "politics",
    label: "Politics"
  },
   {
    id: "food",
    label: "Food"
  },
   {
    id: "asia",
    label: "Asia"
  },
   {
    id: "london",
    label: "London"
  },
   {
    id: "animals",
    label: "Animals"
  },
  {
    id: "movies",
    label: "Movies"
  },
    {
    id: "health",
    label: "Health"
  },
    {
    id: "travel",
    label: "Travel"
  },

  {
    id: "others",
    label: "Others"
  },

]

export default function Home() {
  return (
      <Fragment>
        <Menu {...{categories: cat}} />
          <Layout>
              <Hero
                  articleUrl="/articles/hero"
                  imgUrl="/images/clouds.jpg"
                  title="Title of a longer featured blog post"
                  description="Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents."
              />
          </Layout>
      </Fragment>
  )
}
