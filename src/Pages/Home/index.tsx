import { HandPalm, Play } from 'phosphor-react'
import { Countdown } from './components/Countdown'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'
import { NewCycleForm } from './components/NewCycleForm'
import { useContext } from 'react'
import { CyclesContext } from '../../context/CyclesContext'

import * as S from './styles'
import * as zod from 'zod'

const newCycleValidationSchema = zod.object({
  task: zod.string().min(1, 'informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'O ciclo precisa ser de no mínimo 5 min')
    .max(60, 'O ciclo precisa ser de no máximo 60 min'),
})

type NewCycleFormData = zod.infer<typeof newCycleValidationSchema>

export function Home() {
  const { createNewCycle, interruptCurrentCycle, activeCycle } =
    useContext(CyclesContext)
  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { handleSubmit, watch, reset } = newCycleForm

  function handleCreateNewCycle(data: NewCycleFormData) {
    createNewCycle(data)
    reset()
  }

  const task = watch('task')
  const isSubmitDisable = !task

  return (
    <S.HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />
        {activeCycle ? (
          <S.StopCountButton onClick={interruptCurrentCycle} type="button">
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
