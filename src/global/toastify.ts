import { ToastOptions, toast } from 'react-toastify'

const Emmiter: ToastOptions = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'light'
}

export const notifyError = (msg: string) => {
  toast.error(msg, Emmiter)
}

export const notifySuccess = (msg: string) => {
  toast.success(msg, Emmiter)
}
