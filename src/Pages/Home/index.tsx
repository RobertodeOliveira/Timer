import { useForm } from 'react-hook-form'
import * as S from './styles'
import { HandPalm, Play } from 'phosphor-react'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useEffect, useState } from 'react'
import { differenceInSeconds } from 'date-fns'

const newCycleValidationSchema = zod.object({
  task: zod.string().min(1, 'informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'O ciclo precisa ser de no mínimo 5 min')
    .max(60, 'O ciclo precisa ser de no máximo 60 min'),
})

type NewCycleFormData = zod.infer<typeof newCycleValidationSchema>

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interrupteDate?: Date
  finishedDate?: Date
}

export function Home() {
  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondPassed, setAmountSecondPassed] = useState(0)

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
    setCycles(
      cycles.map((cycle) => {
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
  useEffect(() => {
    let interval: number

    if (activeCycle) {
      interval = setInterval(() => {
        setAmountSecondPassed(
          differenceInSeconds(new Date(), activeCycle.startDate),
        )
      }, 1000)
    }
    return () => {
      clearInterval(interval)
      setAmountSecondPassed(0)
    }
  }, [activeCycle])

  // Só receberá o total de segungos se a varável activeCycle for multiplicada por 60,
  // caso contrário será 0
  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
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
        <S.FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <S.TaskInput
            type="task"
            placeholder="Dê um nome para o seu projeto"
            list="task-sugestions"
            disabled={!!activeCycle}
            {...register('task')}
          />

          <datalist id="task-sugestions">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
            <option value="Projeto 4" />
          </datalist>

          <label htmlFor="">durante</label>
          <S.MinutesAmoutInput
            type="number"
            placeholder="00"
            step={5}
            max={60}
            min={5}
            disabled={!!activeCycle}
            {...register('minutesAmount', { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </S.FormContainer>

        <S.CountDownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <S.Separator>:</S.Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </S.CountDownContainer>

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
