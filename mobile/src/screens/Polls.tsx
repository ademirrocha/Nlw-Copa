import { useCallback, useState } from "react";
import { FlatList, Icon, useToast, VStack } from "native-base";
import { Octicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native'

import { Header } from "../components/Header";
import { Button } from "../components/Button";
import { api } from "../services/api";
import { Loading } from "../components/Loading";
import { alertError } from "../utils/alert.utils";
import { PollCard, PollCardPros } from "../components/PollCard";
import { EmptyPollList } from "../components/EmptyPollList";

export function Polls() {

    const { navigate } = useNavigation();
    const [isLoading, setIsLoading] = useState(true);
    const [polls, setPolls] = useState<PollCardPros[]>([]);
    const toast = useToast();

    async function fetchPolls() {
        try {
            setIsLoading(true)
            const response = await api.get('/polls');

            setPolls(response.data.polls)
            console.log(response.data.polls)
            
        } catch (error) {
            console.log(error);
            alertError(toast, 'Houve um erro ao buscar os bolões!')
        } finally {
            setIsLoading(false)
        }

    }

    useFocusEffect(useCallback(() => {
        fetchPolls()
    }, []))

    return (
        <VStack flex={1} bgColor="gray.900" >

            <Header title="Meus bolões" />

            <VStack mt={6} mx={5} borderBottomWidth={1} borderColor="gray.600" pb={4} mb={4}>
                <Button 
                    title="BUSCAR BOLÃO POR CÓDIGO" 
                    leftIcon={<Icon as={Octicons} name="search" color="black" size="md" />}
                    onPress={() => navigate('findPoll')}
                />
            </VStack>
            {
                isLoading ? <Loading  /> :
                <FlatList 
                    data={polls}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => <PollCard data={item} />}
                    px={5}
                    showsVerticalScrollIndicator={false}
                    _contentContainerStyle={{
                        pb: 24
                    }}
                    ListEmptyComponent={() => <EmptyPollList />}
                />
            }
            

        </VStack>
    )
}