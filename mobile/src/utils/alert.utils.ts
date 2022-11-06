import { IToastService } from "native-base/lib/typescript/components/composites/Toast";

export function alertError(toast: IToastService, description: string) {
    
    return toast.show({
        title: 'Error!',
        description: description,
        placement: 'top',
        bgColor: 'red.500'
    })

}

export function alertWarning(toast: IToastService, description: string) {
    return toast.show({
        title: 'Ops!',
        description: description,
        placement: 'top',
        bgColor: 'yellow.600'
    })
    
}

export function alertSuccess(toast: IToastService, description: string) {
    return toast.show({
        title: 'Sucesso!',
        description: description,
        placement: 'top',
        bgColor: 'green.500'
    })
    
}