'use client'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function ToastProvider() {
    return (
        <ToastContainer
            position="top-right"
            autoClose={5000}
            closeOnClick
            pauseOnFocusLoss
            theme="dark"
            hideProgressBar={true}
        />
    )
}
