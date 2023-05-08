import { NotatForm } from "./NotatForm";
import {NotatData, Emne} from '../App';

type nyttNotatProps = {
  onSubmit: (data: NotatData) => void
  onLeggTilEmne: (emne: Emne) => void
  tilgjengeligeEmner: Emne[]
}
export function NyttNotat({ onSubmit, onLeggTilEmne, tilgjengeligeEmner}: nyttNotatProps) {
return (
    <>
       <h1 className="mb-4">Nytt Notat</h1>
       <NotatForm onSubmit={onSubmit} onLeggTilEmne={onLeggTilEmne} tilgjengeligeEmner={tilgjengeligeEmner} />
    </>
  )
}

