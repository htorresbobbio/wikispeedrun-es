import React, { useState } from "react"
import styled from "@emotion/styled"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { Drawer } from "@mantine/core"
import VisuallyHidden from "@reach/visually-hidden"

import GiveUpButton from "../GiveUpButton"
import Icon from "../Icon"
import Logo from "../Logo"
import History from "../History"
import { QUERIES } from "../../constants"
import { selectGameIsRunning } from "../../redux/settingsSelectors"
import { DarkToggle } from "../DarkToggle"
import { ThemeContext } from "../App"

const links = [
  { name: "Jugar", path: "/settings" },
  { name: "Acerca de", path: "/about" },
]

function Header() {
  const gameIsRunning = useSelector(selectGameIsRunning)
  const [opened, setOpened] = useState(false)
  const { colorMode } = React.useContext(ThemeContext)

  return (
    <HeaderNav>
      <StyledDrawer
        data-theme={colorMode}
        opened={opened}
        onClose={() => setOpened(false)}
        padding="xl"
        styles={{
          drawer: {
            backgroundColor: "var(--color-bg)",
          },
        }}
        size="85%">
        <Wrapper>
          <Logo />
          <History />
        </Wrapper>
      </StyledDrawer>

      <Pages>
        {gameIsRunning ? (
          <>
            <ToggleHistoryDrawer onClick={() => setOpened(true)}>Historial</ToggleHistoryDrawer>
            <GiveUpButton />
          </>
        ) : (
          links.map((link) => (
            <li key={link.name}>
              <StyledLink to={link.path}>{link.name}</StyledLink>
            </li>
          ))
        )}
      </Pages>
      <MiscNav>
        <li style={{ display: "grid", placeItems: "center" }}>
          <DarkToggle />
        </li>
        <li>
          <GithubLink href="https://github.com/htorresbobbio/wikispeedrun-es" target="_blank" rel="noreferrer">
            <GithubIcon id="github" />
            <VisuallyHidden>Código fuente en Github</VisuallyHidden>
          </GithubLink>
        </li>
      </MiscNav>
    </HeaderNav>
  )
}

const HeaderNav = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-left: var(--border-gap);
  border-bottom: 1px solid var(--secondary-blue);
`

const Pages = styled.ul`
  display: flex;
  flex-direction: row;
  list-style-type: none;
  gap: 32px;
  padding-left: 0;
  text-align: baseline;

  @media ${QUERIES.tabletAndSmaller} {
    gap: 8px;
  }
`

const StyledLink = styled(Link)`
  display: block;
  text-decoration: none;
  padding: 12px;
  color: var(--color-text-primary);

  &:visited {
    color: inherit;
  }

  &:hover {
    color: var(--primary-blue);
  }

  &:first-of-type {
    padding-left: 0;
  }
`

const MiscNav = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: row;
  gap: 16px;
`

const GithubLink = styled.a`
  display: block;
  padding: 12px;
  margin: 2px;
  text-decoration: none;
  &:visited {
    color: inherit;
  }

  &:hover {
    color: var(--primary-blue);
  }
`

const GithubIcon = styled(Icon)`
  width: 24px;
  height: 24px;
`

const StyledDrawer = styled(Drawer)`
  display: none;

  @media ${QUERIES.tabletAndSmaller} {
    display: block;
  }
`
const ToggleHistoryDrawer = styled.button`
  display: none;

  cursor: pointer;
  border: none;
  background: none;
  color: var(--color-text-primary);
  text-align: center;
  padding: 16px;

  &:hover {
    color: var(--primary-blue);
  }

  @media ${QUERIES.tabletAndSmaller} {
    display: block;
  }
`

const Wrapper = styled.div`
  align-self: flex-start;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  padding-bottom: 32px;
`

export default Header
