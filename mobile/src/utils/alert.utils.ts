import { IToastService } from "native-base/lib/typescript/components/composites/Toast";

export function alertError(toast: IToastService, title: string) {
    
    return toast.show({
        title: title,
        placement: 'top',
        bgColor: 'red.500'
    })

}

export function alertSuccess(toast: IToastService, title: string) {
    return toast.show({
        title: title,
        placement: 'top',
        bgColor: 'green.500'
    })
    
}