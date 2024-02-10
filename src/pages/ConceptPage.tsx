import React, { useState, useEffect } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, } from "@nextui-org/react";
import { DeleteIcon } from "../../src/assets/DeleteIcon.tsx";
import { EditIcon } from "../../src/assets/EditIcon.tsx";
import { EyeIcon } from "../../src/assets/EyeIcon.tsx";
import ConceptClient from "../fetch/Concept.ts";
import { Concept } from "../types/Concept.ts";

const ConceptPage = () => {

    const [concepts, setConcepts] = useState([]);

    const fetchConcepts = async () => {
        const conceptClient = new ConceptClient();
        const response = await conceptClient.getAllConcepts();
        setConcepts(response);
    };

    useEffect(() => {
        fetchConcepts();
    }, []);

    return (
        <div>
            <Table>
                <TableHeader>
                    <TableColumn>Presupuesto</TableColumn>
                    <TableColumn>Actividad</TableColumn>
                    <TableColumn>Material</TableColumn>
                    <TableColumn>Descripción</TableColumn>
                    <TableColumn>Cantidad</TableColumn>
                    <TableColumn>Precio unitario</TableColumn>
                    <TableColumn>Subtotal</TableColumn>
                    <TableColumn>Fecha de inicio</TableColumn>
                    <TableColumn>Fecha de fin</TableColumn>
                    <TableColumn>Acciones</TableColumn>
                </TableHeader>
                <TableBody>
                    {concepts.map((concept: Concept, index: number) => (
                        <TableRow key={index}>
                            <TableCell>{concept.budgetId.nameBudget}</TableCell>
                            <TableCell>{concept.activityId.name}</TableCell>
                            <TableCell>{concept.materialId.name}</TableCell>
                            <TableCell>{concept.description}</TableCell>
                            <TableCell>{concept.quantity}</TableCell>
                            <TableCell>{concept.unitPrice}</TableCell>
                            <TableCell>{concept.subtotal}</TableCell>
                            <TableCell>{concept.startDate}</TableCell>
                            <TableCell>{concept.endDate}</TableCell>
                            <TableCell>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <EyeIcon />
                                    <EditIcon />
                                    <DeleteIcon />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default ConceptPage;