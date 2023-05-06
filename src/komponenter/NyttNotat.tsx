import { NotatForm } from "./NotatForm";
import {NotatData } from '../App';

type nyttNotatProps = {
  onSubmit: (data: NotatData) => void
}
export function NyttNotat({ onSubmit}: nyttNotatProps) {
return (
    <>
       <h1 className="mb-4">Nytt Notat</h1>
       <NotatForm onSubmit={onSubmit} />
    </>
  )
}

