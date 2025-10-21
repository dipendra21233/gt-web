'use client'
import { ToastType } from '@/types/module/commonModule'
import {
    COMMON_TOAST_TIMEOUT,
    TOAST_COMMON_POSITION,
    TOAST_COMMON_THEME
} from '@/utils/constant'
import {
    toast,
    ToastContainer,
    ToastContainerProps,
    ToastContent,
    ToastOptions
} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export function showToast(
    message: ToastContent,
    type: ToastType = ToastType.DEFAULT,
    options?: ToastOptions
): void {
    const commonOptions: ToastOptions = {
        position: TOAST_COMMON_POSITION,
        autoClose: COMMON_TOAST_TIMEOUT,
        closeOnClick: true,
        hideProgressBar: true,
        pauseOnHover: true,
        draggable: true,
        theme: TOAST_COMMON_THEME,
        ...options,
    }

    switch (type) {
        case ToastType.SUCCESS:
            toast.success(message, commonOptions)
            break
        case ToastType.ERROR:
            toast.error(message, commonOptions)
            break
        case ToastType.INFO:
            toast.info(message, commonOptions)
            break
        case ToastType.WARNING:
            toast.warn(message, commonOptions)
            break
        default:
            toast(message, commonOptions)
    }
}

export function showErrorToast(
    message: ToastContent,
    options?: ToastOptions
): void {
    showToast(message, ToastType.ERROR, {
        className: 'custom-toast-error-box w-100',
        ...options,
    })
}

export function showSuccessToast(
    message: ToastContent,
    options?: ToastOptions
): void {
    showToast(message, ToastType.SUCCESS, {
        className: 'custom-toast-success',
        ...options,
    })
}

export function showDefaultToast(
    message: ToastContent,
    options?: ToastOptions
): void {
    showToast(message, ToastType.DEFAULT, {
        className: 'custom-toast',
        ...options,
    })
}

const CustomToast = (props: ToastContainerProps) => {
    return <ToastContainer {...props} />
}

export default CustomToast
