import { Center, FlatList, Text, useToast } from 'native-base';
import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { alertError, alertSuccess, alertWarning } from '../utils/alert.utils';
import { Game, GameProps } from './Game';
import { Loading } from './Loading';

interface Props {
  pollId: string;
}

export function Guesses({ pollId }: Props) {

  const [isLoading, setIsLoading] = useState(true);
  const [games, setGames] = useState<GameProps[]>([]);
  const [firstTeamPoints, setFirstTeamPoints] = useState('');
  const [secondTeamPoints, setSecondTeamPoints] = useState('');

  const toast = useToast();

  async function fetchGames() {
    try {
        setIsLoading(true)

        const response = await api.get(`/polls/${pollId}/games`)
        setGames(response.data.games)
        
        
    } catch (error) {
        console.log(error);
        alertError(toast, 'Houve um erro ao buscar os jogos!')
    } finally {
        setIsLoading(false)
    }
  }

  async function handleGuessConfirm(gameId: string) {
    try {
      setIsLoading(true)
      if(!firstTeamPoints.trim() || !secondTeamPoints.trim()){
        return alertWarning(toast, 'Informe o placar do palpite!')
      }

      await api.post(`/polls/${pollId}/games/${gameId}/guesses`, {
        firstTeamPoints: Number(firstTeamPoints),
        secondTeamPoints: Number(secondTeamPoints)
      })
      alertSuccess(toast, 'Palpite adicionado com sucesso!')
      fetchGames();
      
    } catch (error) {
        console.log(error);
        alertError(toast, 'Houve um erro ao enviar o palpite!')
    } finally {
        setIsLoading(false)
    }
  }



  useEffect(() => {
    fetchGames();
  }, [pollId])

  if(isLoading){
    return (
        <Loading />
    )
}

  return (
    <FlatList 
      data={[]}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <Game 
          data={item}
          setFirstTeamPoints={setFirstTeamPoints}
          setSecondTeamPoints={setSecondTeamPoints}
          onGuessConfirm={() => handleGuessConfirm(item.id)}
        />
      )}
      ListEmptyComponent={<Center><Text flex={1} color="gray.500" alignItems="center"> Nenhum Jogo registrado ainda! </Text></Center>}
    />
  );
}
