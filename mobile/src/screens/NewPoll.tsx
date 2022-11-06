import { Heading, VStack, Text, useToast } from "native-base";
import { Header } from "../components/Header";
import Logo from '../assets/logo.svg';
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useState } from "react";
import { alertError, alertSuccess } from "../utils/alert.utils";
import { api } from "../services/api";

export function NewPoll() {

    const [title, setTitle] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();

    async function handlePollCreate() {
        if(!title.trim()){
            return alertError(toast, 'Informe o nome do bolão')
        }

        if(title.length < 3){
            return alertError(toast, 'O nome do bolão deve ter pelo menos 3 caracteres')
        }

        try {
            setIsLoading(true);

            await api.post('/polls', { title })

            alertSuccess(toast, 'Bolão criado com sucesso!');

            setTitle('');

        } catch (error) {
            console.log(error);
            alertError(toast, 'Não foi possível criar o bolão')
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <VStack flex={1} bgColor="gray.900" >
            <Header title="Criar Novo Bolão"/>

            <VStack mt={8} mx={5} alignItems='center'>
                <Logo width={212} height={40} />

                <Heading fontFamily='heading' color="white" fontSize='xl' my={8} textAlign="center">
                    Crie seu próprio bolão da copa {'\n'}
                    e compartilhe entre amigos!
                </Heading>

                <Input 
                    mb={2}  
                    placeholder='Qual nome do seu bolão?'
                    onChangeText={setTitle}
                    value={title}
                />

                <Button 
                    title="CRIAR MEU BOLÃO"
                    onPress={handlePollCreate}
                    isLoading={isLoading}
                />

                <Text color="gray.200" fontSize='sm' textAlign="center" px={10} mt={4} >
                    Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas.
                </Text>

            </VStack>
        </VStack>
    )
}