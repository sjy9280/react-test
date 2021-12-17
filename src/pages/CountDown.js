import { DatePicker, message } from "antd";
import { useEffect, useState } from "react";

function CountDown() {

  const [resultState, setResultState] = useState('00:00:00')
  const [timeState, setTimeState] = useState(0)
  const [timeReset, setTimeResetState] = useState(0)

  useEffect((timer) => {
    if (timeState > 0) {
      timer = setInterval(() => {
        countTime(timeState)
      }, 1000)
    }
    return () => clearInterval(timer)
  })

  function changeTime(value) {
    setResultState("")
    const now = new Date().getTime()
    const selectTime = new Date(value).getTime()
    if (now > selectTime) {
      message.error('不可以选择过去的时间', 1)
      setTimeState(0)
      setResultState("00:00:00")
      setTimeResetState(new Date())
      return false
    }
    setTimeState(selectTime)
  }

  function countTime(selectTime) {
    const time = selectTime - new Date().getTime()
    if (time > 0) {
      const h = Math.floor(time / 1000 / 60 / 60)
      const m = Math.floor(time / 1000 / 60 % 60)
      const s = Math.floor(time / 1000 % 60)
      const result = `${ h / 10 >= 1 ? h : '0' + h }:${ m / 10 >= 1 ? m : '0' + m }:${ s / 10 >= 1 ? s : '0' + s }`
      setResultState(result)
    } else {
      setResultState("00:00:00")
    }
  }

  return (
    <div>
      <DatePicker showTime onChange={ changeTime } key={ timeReset } showNow={ false }/>
      <br/>
      <span>
        倒计时：{ resultState }
      </span>
    </div>
  )
}

export default CountDown
