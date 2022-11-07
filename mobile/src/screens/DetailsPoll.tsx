import { useRoute } from "@react-navigation/native";
import { HStack, useToast, VStack } from "native-base";
import { useEffect, useState } from "react";
import { Share } from "react-native";
import { EmptyMypollList } from "../components/EmptyMyPollList";
import { Guesses } from "../components/Guesses";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { Option } from "../components/Option";
import { PollCardPros } from "../components/PollCard";
import { PollHeader } from "../components/PollHeader";
import { api } from "../services/api";
import { alertError } from "../utils/alert.utils";

interface RouteParams {
    id: string
}

export function DetailsPoll() {

    const [optionSelected, setOptionSelected] = useState<'guesses' | 'ranking'>('guesses');
    const [isLoading, setIsLoading] = useState(true);
    const toast = useToast();
    const [pollDetails, setPollDetails] = useState<PollCardPros>({} as PollCardPros)

    const route = useRoute();
    const { id } = route.params as RouteParams;

    async function handleCodeShared() {
        await Share.share({
            message: pollDetails.code
        })
    }

    async function fetchPollDetails() {
        try {
            setIsLoading(true)

            const response = await api.get(`/polls/${id}`)
            setPollDetails(response.data.poll)
            
        } catch (error) {
            console.log(error);
            alertError(toast, 'Houve um erro ao buscar os detalhes do bolões!')
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchPollDetails();
    }, [id])

    if(isLoading){
        return (
            <Loading />
        )
    }

    return (
        <VStack flex={1} bgColor="gray.900" >
            <Header title={pollDetails.title} showBackButton showShareButton onShare={handleCodeShared}/>

            {
                pollDetails._count?.participants > 0 ?
                    <VStack px={5} flex={1}>
                        <PollHeader data={pollDetails} />

                        <HStack bgColor="gray.800" p={1} rounded="sm" mb={5} >
                            <Option 
                                title="Seus palpites" 
                                isSelected={optionSelected === 'guesses'} 
                                onPress={() => setOptionSelected('guesses')}
                            />
                            <Option 
                                title="Ranking do grupo" 
                                isSelected={optionSelected === 'ranking'} 
                                onPress={() => setOptionSelected('ranking')}
                            />
                        </HStack>

                        <Guesses pollId={pollDetails.id} />

                    </VStack>
                :
                    <EmptyMypollList code={pollDetails.code} onShare={handleCodeShared} />
            }
            
        </VStack>
    )
}