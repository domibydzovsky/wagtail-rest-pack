import React, {MutableRefObject, useEffect, useState} from 'react'

export const useResize = (myRef: MutableRefObject<any>, max: {width: number, height: number}) => {
    const [size, setSize] = useState({width: 0, height: 0})
    useEffect(() => {
        const handleResize = () => {
            let width = myRef.current.offsetWidth;
            let height = myRef.current.offsetHeight;
            if (width> max.width) {
                width = max.width;
            }
            if (height > max.height) {
                height = max.height;
            }
            setSize({width: width, height: height})
        }
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [myRef])
    return size
}