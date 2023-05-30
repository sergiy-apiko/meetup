import { useEffect, useState } from 'react'

const useRendered = () => {
    const [rendered, setRendered] = useState(false)
    useEffect(() => {
        setRendered(true)
    }, [])
    return rendered
}

export default useRendered
