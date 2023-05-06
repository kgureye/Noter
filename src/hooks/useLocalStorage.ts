import { useState, useEffect } from 'react'

export function useLocalStorage<E>(key: string, initialValue: E | (() => E))  {
    const [verdi, setVerdi] = useState<E>(() => {
        //Check to see if data is in LS
        const jsonVerdi = localStorage.getItem(key)
        if (jsonVerdi == null) {
            if (typeof initialValue === 'function') {
                return (initialValue as () => E)
        } else {
            return initialValue
        }
    } else {
        return JSON.parse(jsonVerdi)
    }
  })

  /* Oppdaterer LS hver gang en endring skjer */
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(verdi))
  }, [verdi, key])

  return [verdi, setVerdi] as [E, typeof setVerdi]  /* Så TS forstår hva disse typene er */
}

/* Tells TypeScript that initialValue is going to be a function that returns the type of E and we're going to call it */