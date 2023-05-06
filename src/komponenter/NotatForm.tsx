import React, { 
    useState, 
    useEffect, 
    useRef,
    FormEvent,
    KeyboardEventHandler 
} from 'react';
import { Link } from 'react-router-dom';
import { Form, Stack, Row, Col, Button } from 'react-bootstrap';
import CreatableReactSelect from "react-select/creatable";
import { NotatData, Emne } from '../App';

type NotatFormProps = {
    onSubmit: (data: NotatData) => void
}

export function NotatForm({ onSubmit }: NotatFormProps) {
    const titleRef = useRef<HTMLInputElement>(null);
    const markdownRef = useRef<HTMLTextAreaElement>(null);
    const [valgteEmner, setValgteEmner] = useState<Emne[]>([]);

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        onSubmit({
            tittel: titleRef.current!.value,
            markdown: markdownRef.current!.value,
            emner: []
        })
    }

return <Form onSubmit={handleSubmit}>
    <Stack gap={4}>
        <Row>
            <Col>
                <Form.Group controlId="tittel">
                    <Form.Label>Tittel</Form.Label>
                    <Form.Control required ref={titleRef} />
                </Form.Group>
            </Col>

            <Col>
                <Form.Group controlId="emner">
                    <Form.Label>Emner</Form.Label>
                    <CreatableReactSelect
                        isMulti
                        isClearable
                        placeholder="Tast inn et emne.."
                        value={valgteEmner.map(emne => {
                            return { label: emne.label, value: emne.id }
                        })}
                        onChange={emner => {
                            setValgteEmner(emner.map(emne => {
                                return { label: emne.label, id: emne.value}
                            }))
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