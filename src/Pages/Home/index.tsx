import * as S from './styles'
import { HandPalm, Play } from 'phosphor-react'

import { useEffect, useState } from 'react'
import { differenceInSeconds } from 'date-fns'
import { NewCycleForm } from './components/NewCycleForm'
import { Countdown } from './components/Countdown'

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interrupteDate?: Date
  finishedDate?: Date
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

  function handleCreateNewCycle(data: NewCycleFormData) {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }
    setCycles((status) => [...status, newCycle])
    setActiveCycleId(id)
    reset()
  }

  function handleInterruptCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interrupteDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
    setActiveCycleId(null)
  }

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  // useEffect utilizado para fazer o monitoramento da mudança de valor em segundos

  // Só receberá o total de segungos se a varável activeCycle for multiplicada por 60,
  // caso contrário será 0

  const currentSeconds = activeCycle ? totalSeconds - amountSecondPassed : 0
  // Só receberá se a subtração for diferente de 0
  const minutesAmount = Math.floor(currentSeconds / 60)
  // É preciso converter os segundos em minutos
  const secondsAmount = currentSeconds % 60
  // Recolher o resto da divisão, que serão os segundos restantes de um determinado minuto
  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    }
  }, [activeCycle, minutes, seconds])

  const task = watch('task')
  const isSubmitDisable = !task

  console.log(cycles)
  console.log(activeCycleId)

  return (
    <S.HomeContainer>
      <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
        <NewCycleForm />
        <Countdown />
        {activeCycle ? (
          <S.StopCountButton onClick={handleInterruptCycle} type="button">
            Interromper
            <HandPalm size={24} />
          </S.StopCountButton>
        ) : (
          <S.StartCountButton type="submit" disabled={isSubmitDisable}>
            <Play size={24} /> Começaar
          </S.StartCountButton>
        )}
      </form>
    </S.HomeContainer>
  )
}
