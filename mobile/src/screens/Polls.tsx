import { Heading, Icon, VStack } from "native-base";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Octicons } from '@expo/vector-icons';

export function Polls() {
    return (
        <VStack flex={1} bgColor="gray.900" >

            <Header title="Meus bolões" />

            <VStack mt={6} mx={5} borderBottomWidth={1} borderColor="gray.600" pb={4} mb={4}>
                <Button 
                    title="BUSCAR BOLÃO POR CÓDIGO" 
                    leftIcon={<Icon as={Octicons} name="search" color="black" size="md" />}
                />
            </VStack>
        </VStack>
    )
}