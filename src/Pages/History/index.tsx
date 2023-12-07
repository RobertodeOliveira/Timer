import * as S from './styles'
import { CyclesContext } from '../../context/CyclesContext'
import { useContext } from 'react'
import { formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

export function History() {
  const { cycles } = useContext(CyclesContext)

  return (
    <S.HistoryContainer>
      <h1>Meu histórico</h1>
      <S.HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map((cycle) => {
              return (
                <tr key={cycle.id}>
                  <td>{cycle?.task}</td>
                  <td>{cycle?.minutesAmount} minutos</td>
                  <td>
                    {formatDistanceToNow(cycle.startDate, {
                      addSuffix: true,
                      locale: ptBR,
                    })}
                  </td>
                  <td>
                    {cycle.finishedDate && (
                      <S.Status statuscolor="green">Concluído</S.Status>
                    )}

                    {cycle.interrupteDate && (
                      <S.Status statuscolor="red">Interrompido</S.Status>
                    )}

                    {!cycle.interrupteDate && !cycle.finishedDate && (
                      <S.Status statuscolor="yellow">Em andamento</S.Status>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </S.HistoryList>
    </S.HistoryContainer>
  )
}
