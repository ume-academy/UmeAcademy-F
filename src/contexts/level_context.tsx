import React, { createContext, useEffect, useState } from "react";
import { Tlevel } from "../interface/Tlevel";
import instance from "../api";


export interface LevelContextType {
    level: Tlevel[] | []
    setLevel: React.Dispatch<React.SetStateAction<Tlevel[] | []>>
}

export const LevelContext = createContext({} as LevelContextType) 

const Levelprovider = ({children} : {children : React.ReactNode}) => {
    const [level, setLevel] = useState<Tlevel[]>([])

    useEffect(() => {
        (async () => {
            try {
                const {data} = await instance.get('/levels')
                setLevel(data.data)
            } catch (error) {
                console.log("Lấy level thất bại!")
            }
        })()
    }, [])

    return <LevelContext.Provider value={{level, setLevel}}>{children}</LevelContext.Provider>
} 

export default Levelprovider