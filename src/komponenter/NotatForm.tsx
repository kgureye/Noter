import React, { 
    useState, 
    useEffect, 
    useRef,
    FormEvent,
    KeyboardEventHandler ,
} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Stack, Row, Col, Button } from 'react-bootstrap';
import CreatableReactSelect from "react-select/creatable";
import { NotatData, Emne } from '../App';
import { v4 as uuidV4 } from "uuid";

type NotatFormProps = {
    onSubmit: (data: NotatData) => void
    onLeggTilEmne: (emne: Emne) => void
    tilgjengeligeEmner: Emne[]
}

export function NotatForm({ onSubmit, onLeggTilEmne, tilgjengeligeEmner}: NotatFormProps) {
    const titleRef = useRef<HTMLInputElement>(null);
    const markdownRef = useRef<HTMLTextAreaElement>(null);
    const [valgteEmner, setValgteEmner] = useState<Emne[]>([]);
    const navigate = useNavigate()

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        onSubmit({
            tittel: titleRef.current!.value,
            markdown: markdownRef.current!.value,
            emner: []
        })
        navigate("..")
    }




return <Form onSubmit={handleSubmit}>
    <Stack gap={4}>
        <Row>
            <Col>
                <Form.Group controlId="tittel">
                    <Form.Label>Tittel</Form.Label>
                    <Form.Control ref={titleRef} required />
                </Form.Group>
            </Col>

            <Col>
                <Form.Group controlId="emner">
                    <Form.Label>Emner</Form.Label>
                    <CreatableReactSelect
                        isMulti
                        isClearable
                        onCreateOption={label => {
                        const nyttEmne = { id: uuidV4(), label}
                        onLeggTilEmne(nyttEmne)
                        setValgteEmner(valgteEmner => [...valgteEmner, nyttEmne])
                        }}
                        placeholder="Tast inn et emne.."
                        value={valgteEmner.map(emne => {
                            return { label: emne.label, value: emne.id }
                        })}
                        options={tilgjengeligeEmner.map(emne => {
                            return { label: emne.label, value: emne.id}
                        })}
                        onChange={emner => {
                            setValgteEmner(emner.map(emne => {
                                return { label: emne.label, id: emne.value}
                            })
                          )
                        }}
                       />
                </Form.Group>
            </Col>
        </Row>
        <Form.Group controlId="markdown">
            <Form.Label> Innhold </Form.Label>
            <Form.Control required as="textarea" rows={12} ref={markdownRef} />
        </Form.Group>
        <Stack direction="horizontal" gap={1} className="justify-content-end">
                <Button type="submit" variant="primary"> Lagre </Button>
            <Link to="..">
                <Button type="button" variant="outline-secondary"> Avbryt </Button>
            </Link>
        </Stack>
    </Stack>
</Form>
}