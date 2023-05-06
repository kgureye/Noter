import "bootstrap/dist/css/bootstrap.min.css"
import { Container } from "react-bootstrap"
import { Navigate, Route, Routes } from "react-router-dom"
import { NyttNotat } from "./komponenter/NyttNotat";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useMemo } from "react";
import { v4 as uuidV4 } from "uuid";

export type Notat = {
  id: string,
} & NotatData

export type NotatData = {
  tittel: string,
  markdown: string,
  emner: Emne[]
}

export type Emne = {
  id: string,
  label: string
}

export type RåNotat = {
  id: string
} & RåNotatData

export type  RåNotatData = {
  tittel: string,
  markdown: string,
  emneId: string[]
}

function App() {
  const [notater, setNotater] = useLocalStorage<RåNotat[]>("notater", [])
  const [emner, setEmner] = useLocalStorage<Emne[]>("emner", [])

  /* Loop through my different notes, and keep the ifnromation about the notes but also want you to get the tags that have the associated IDs inside if our note that is being stored    */
  const notaterMedEmner = useMemo(() => {
    return notater.map(notat => {
      return {...notat, emner: emner.filter(emne => notat.emneId.includes(emne.id))}
    })
  }, [notater, emner])

  function onOpprettNotat({emner, ...data }: NotatData) {
    setNotater(tidlNotater => {
      return [...tidlNotater, { ...data, id: uuidV4(), emneId: emner.map(emne => emne.id) }]
    })
  }

  return (
    <Container className="my-4">
      <Routes>
        <Route path="/" element={ <h1>Hjemmeside</h1> } />
        <Route path="/ny" element={ <NyttNotat onSubmit={onOpprettNotat} /> } />
        <Route path="/:id">
          <Route index element={ <h1>Vis ID</h1> } />
          <Route path="rediger" element={ <h1>Rediger ID (notat)</h1> } />
        </Route>
        <Route path="*" element={ <Navigate to="/" /> } />
      </Routes>
   </Container>
  )
}

export default App
