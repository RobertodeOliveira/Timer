import * as S from './styles'
import { Play } from 'phosphor-react'

export function Home() {
  return (
    <S.HomeContainer>
      <form action="">
        <S.FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <S.TaskInput
            type="task"
            placeholder="Dê um nome para o seu projeto"
            list="task-sugestions"
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
          />

          <span>minutos.</span>
        </S.FormContainer>

        <S.CountDownContainer>
          <span>0</span>
          <span>0</span>
          <S.Separator>:</S.Separator>
          <span>0</span>
          <span>0</span>
        </S.CountDownContainer>
        <S.StartCountButton disabled type="submit">
          <Play size={24} /> Começaar
        </S.StartCountButton>
      </form>
    </S.HomeContainer>
  )
}
