import React, { useEffect, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, } from "@nextui-org/react";
import { DeleteIcon } from "../../src/assets/DeleteIcon.tsx";
import { EditIcon } from "../../src/assets/EditIcon.tsx";
import MaterialClient from "../fetch/Material.ts";
import { Material } from "../types/Material.ts";

const MaterialPage = () => {

    const [materials, setMaterials] = useState([]);

    const fetchMaterials = async () => {
        const materialClient = new MaterialClient();
        const response = await materialClient.getAllMaterials();
        setMaterials(response);
    }

    useEffect(() => {
        fetchMaterials();
    }, []);

    return (
        <div>
            <Table>
                <TableHeader>
                    <TableColumn>Nombre</TableColumn>
                    <TableColumn>Cantidad</TableColumn>
                    <TableColumn>Precio</TableColumn>
                    <TableColumn>Acciones</TableColumn>
                </TableHeader>
                <TableBody>
                    {materials.map((material: Material, index: number) => (
                        <TableRow key={index}>
                            <TableCell>{material.name}</TableCell>
                            <TableCell>{material.quantity}</TableCell>
                            <TableCell>{material.price}</TableCell>
                            <TableCell>
                                <div style={{ display: 'flex', gap: '10px' }}>
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

export default MaterialPage;