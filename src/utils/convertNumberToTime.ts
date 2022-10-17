
const convertNumberToTime = (time: number) => {
  return time < 10 ? `0${time}:00` : `${time}:00`
}

export default convertNumberToTime
