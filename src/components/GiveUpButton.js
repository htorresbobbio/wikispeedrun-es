import React, { useContext } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import styled from "@emotion/styled"
import { useModals } from "@mantine/modals"

import { endGame, resetHistory } from "../redux/settingsSlice"
import { StopwatchContext } from "./Stopwatch/StopwatchContext"

const GiveUpButton = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const modals = useModals()
  const stopwatch = useContext(StopwatchContext)

  const onConfirm = () => {
    dispatch(endGame())
    dispatch(resetHistory())
    stopwatch.resetTimer()
    stopwatch.disableTimer(false)
    navigate("/settings")
  }

  const openGiveUpModal = () =>
    modals.openConfirmModal({
      title: "¿Estás seguro que te quieres rendir?",
      children: <p>Todo tu progreso se perderá.</p>,
      labels: { confirm: "Me rindo", cancel: "Continuar" },
      confirmProps: { color: "red" },
      onCancel: () => {},
      onConfirm: onConfirm,
    })

  return <StyledButton onClick={openGiveUpModal}>Rendirse</StyledButton>
}

const StyledButton = styled.button`
  cursor: pointer;
  border: none;
  background: none;
  color: var(--color-text-primary);
  text-align: center;
  padding: 16px;
  padding-left: 0px;

  &:hover {
    color: var(--primary-blue);
  }
`

export default GiveUpButton
