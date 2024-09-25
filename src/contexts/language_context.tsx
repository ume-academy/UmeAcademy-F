import React, { createContext, useEffect, useState } from "react";
import { Tlanguage } from "../interface/Tlanguage";
import instance from "../api";

export interface LanguageContextType {
    language: Tlanguage[]
    setLanguage: React.Dispatch<React.SetStateAction<Tlanguage[]>>
}

export const LanguageContext = createContext({} as LanguageContextType)

const LanguageProvider = ({children}: {children: React.ReactNode}) => {
    const [language, setLanguage] = useState<Tlanguage[]>([])

    useEffect(() => {
        (async() => {
            try {
                const {data} = await instance.get('/languages')
                setLanguage(data.data)
            } catch (error) {
                console.log("Lấy language thất bại!")
            }
        })()
    }, [])

    return <LanguageContext.Provider value={{language, setLanguage}}>{children}</LanguageContext.Provider>
}

export default LanguageProvider