import styled from "@emotion/styled"

import LinkButton from "./LinkButton"
import { WikiHeader } from "./Wiki/WikiDisplay"

function About() {
  return (
    <Wrapper>
      <AboutHeader>Wiki Speedrun</AboutHeader>
      <p>
        El objetivo de este juego es navegar desde un artículo de wikipedia inicial hacia otro, en la menor cantidad de clicks y tiempo.
      </p>

      <SecondaryHeading>Funciones</SecondaryHeading>

      <FeatureList>
        <li>Modo claro/oscuro</li>
        <li>Botón de compartir genera URL con la misma configuración y artículos</li>
        <li>No se necesita crear cuenta</li>
        <li>Elige tus propios artículos</li>
        <li>
          Temporizador justo y de alta precisión
          <ul>
            <li>se detiene mientras se carga el siguiente artículo</li>
          </ul>
        </li>
        <li>Tiempo límite opcional</li>
        <li>Mantiene el historial de tu avance en la sesión</li>
        <li>Código Abierto</li>
      </FeatureList>

      <StyledLinkButton text="Jugar" to={"/settings"} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding-top: var(--border-gap);
  padding-left: var(--border-gap);
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const AboutHeader = styled(WikiHeader)`
  border-bottom: 1px solid var(--color-border-secondary);
  margin-bottom: 0.25em;
`

const StyledLinkButton = styled(LinkButton)`
  background: var(--secondary-blue);
  color: var(--color-text-primary);
`

const SecondaryHeading = styled.h3`
  font-size: ${24 / 16}rem;
  font-weight: 400;

  border-bottom: 1px solid var(--color-border-secondary);
  margin-top: 16px;
  margin-bottom: 0.25em;
`

const FeatureList = styled.ul`
  li:not(:last-child) {
    margin-bottom: 8px;
  }
`
export default About
