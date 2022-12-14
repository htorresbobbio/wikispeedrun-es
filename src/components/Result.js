import { useSelector } from "react-redux"
import styled from "@emotion/styled/macro"
import { keyframes } from "@emotion/react"
import { DialogOverlay, DialogContent } from "@reach/dialog"
import VisuallyHidden from "@reach/visually-hidden"
import ConfettiExplosion from "react-confetti-explosion"

import Icon from "./Icon"
import Stopwatch from "./Stopwatch/Stopwatch"
import UnstyledButton from "./UnstyledButton"
import LinkButton from "./LinkButton"
import { QUERIES } from "../constants"
import {
  selectEndingArticle,
  selectHistory,
  selectIsWin,
  selectStartingArticle,
  selectWinTime,
} from "../redux/settingsSelectors"
import { useEffect } from "react"
import { useRef } from "react"

const Result = ({ isOpen, onDismiss }) => {
  const startTitle = useSelector(selectStartingArticle).title
  const endTitle = useSelector(selectEndingArticle).title
  const history = useSelector(selectHistory)
  const isWin = useSelector(selectIsWin)
  const winTime = useSelector(selectWinTime)

  let theme = useRef("light")

  useEffect(() => {
    theme.current = JSON.parse(localStorage.getItem("theme"))
  }, [])

  const confettiParams = {
    force: 0.6,
    duration: 4000,
    particleCount: 400,
    floorHeight: 1600,
    floorWidth: 1600,
  }

  const wordInString = (s, word) => new RegExp("\\b" + word + "\\b", "i").test(s)

  return (
    <Wrapper data-theme={theme.current} isOpen={isOpen} onDismiss={onDismiss}>
      <Backdrop />
      <Content aria-label="Resultados">
        <ConfettiWrapper>
          {isWin === true ? <ConfettiExplosion {...confettiParams} /> : null}
          <InnerWrapper>
            <CloseButton onClick={onDismiss}>
              <Icon id="close" />
              <VisuallyHidden>Salir de resultados</VisuallyHidden>
            </CloseButton>
            {isWin ? (
              <ContentWrapper>
                <Heading>¡Ganaste!</Heading>
                <InfoText>
                  Desde <b>{startTitle}</b> a <b>{endTitle} </b>
                  en {history.length - 1} clicks.
                </InfoText>
                <Stopwatch time={winTime} />
                {wordInString(endTitle, "anime") ? (
                  <div>
                    <Image
                      src={window.location.origin + "/wiki-waifu.png"}
                      alt="Wikipedia Waifu by @ina_den_"
                      width={600}
                      height={800}
                    />
                    <SocialLink
                      href="https://twitter.com/Ina_den_"
                      target="_blank"
                      rel="noreferrer">
                      Art by Ina-den
                    </SocialLink>
                  </div>
                ) : null}
                <LinkButton text="Jugar otra vez" to={"/settings"} />
              </ContentWrapper>
            ) : (
              <ContentWrapper>
                <Heading>Perdiste</Heading>
                <LinkButton text="Intentar otra vez" to={"/settings"} />
              </ContentWrapper>
            )}
          </InnerWrapper>
        </ConfettiWrapper>
      </Content>
    </Wrapper>
  )
}

export default Result

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const Wrapper = styled(DialogOverlay)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: transparent;

  display: flex;
  justify-content: center;
  align-items: center;
`

const InnerWrapper = styled.div`
  overflow: auto;
  display: flex;
  flex-direction: column;
  animation: ${fadeIn} 600ms both;
  animation-delay: 400ms;

  text-align: center;
  vertical-align: middle;

  width: 100%;
`

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--color-backdrop-bg);
  animation: ${fadeIn} 500ms;
`

const Content = styled(DialogContent)`
  position: relative;
  background: var(--color-bg-secondary);
  width: 70%;
  padding: 56px;

  max-height: 90%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media ${QUERIES.tabletAndSmaller} {
    padding: 56px 24px;
  }
`

const CloseButton = styled(UnstyledButton)`
  position: absolute;
  top: 10px;
  right: 0px;
  padding: 16px;
`

const Heading = styled.h2`
  color: var(--color-text-primary);
  font-size: ${36 / 16}rem;

  @media ${QUERIES.tabletAndSmaller} {
    font-size: ${24 / 16}rem;
  }
`

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;

  @media ${QUERIES.tabletAndSmaller} {
    gap: 16px;
  }
`

const InfoText = styled.p`
  color: var(--color-text-primary);
  font-size: ${18 / 16}rem;

  @media ${QUERIES.tabletAndSmaller} {
    font-size: ${16 / 16}rem;
  }
`

const Image = styled.img`
  display: block;
  object-fit: contain;
  height: auto;
  max-height: 600px;
`

const ConfettiWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const SocialLink = styled.a`
  display: block;
  color: var(--color-text-primary);
  padding: 12px 24px;
`
