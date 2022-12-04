import styled from "@emotion/styled"
import { TimeInput } from "@mantine/dates"
import styles from "./TimeLimit.module.css"

const TimeLimit = ({ time, setTime }) => {
  return (
    <StyledTime
      value={time}
      onChange={setTime}
      label="Límite de tiempo [h:m:s]"
      withSeconds
      hoursLabel="Horas"
      minutesLabel="Minutos"
      seconds="Segundos"
      classNames={{ label: styles.label, input: styles.mywrapper }}
    />
  )
}

const StyledTime = styled(TimeInput)`
  max-width: 120px;
`

export default TimeLimit
