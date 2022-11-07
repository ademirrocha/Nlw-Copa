import { useState } from "react";
import { Heading, useToast, VStack } from "native-base";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { alertError, alertSuccess, alertWarning } from "../utils/alert.utils";
import { api } from "../services/api";
import { useNavigation } from "@react-navigation/native";


export function FindPoll() {

    const [isLoading, setIsLoading] = useState(false);
    const [code, setCode] = useState('');
    const toast = useToast();
    const { navigate } = useNavigation();

    async function handleJoinPoll() {
        try {
            setIsLoading(true)

            if(!code.trim()){
                return alertWarning(toast, 'Informe o código do bolão')
            }
    
            if(code.trim().length != 7){
                return alertWarning(toast, 'O código do bolão deve ter 7 caracteres')
            }

            await api.post('/polls/join', { code });
            alertSuccess(toast, 'Você entrou no bolão com sucesso')
            setIsLoading(false)
            setCode('')
            navigate('polls')
            

            
        } catch (error) {
            setIsLoading(false)
            if(error.response?.data?.message){
                return alertWarning(toast, error.response.data.message)
            }

            alertError(toast, 'Houve um erro ao buscar o bolão!')
            throw error;
            
        } 
    }

    return (
        <VStack flex={1} bgColor="gray.900" >
            <Header title="Buscar por código" showBackButton/>

            <VStack mt={8} mx={5} alignItems='center'>
                
                <Heading fontFamily='heading' color="white" fontSize='xl' mb={8} textAlign="center">
                    Encontre um bolão através de {'\n'} 
                    seu código único
                </Heading>

                <Input 
                    mb={2}  
                    placeholder='Qual o código do bolão?'
                    autoCapitalize="characters"
                    onChangeText={setCode}
                    value={code}
                />

                <Button 
                    title="BUSCAR BOLÃO"
                    isLoading={isLoading}
                    onPress={handleJoinPoll}
                />

            </VStack>
        </VStack>
    )
}