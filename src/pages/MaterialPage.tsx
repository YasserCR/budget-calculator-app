import React, { useEffect, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Input } from "@nextui-org/react";
import { DeleteIcon } from "../../src/assets/DeleteIcon.tsx";
import { EditIcon } from "../../src/assets/EditIcon.tsx";
import MaterialClient from "../fetch/Material.ts";
import { Material } from "../types/Material.ts";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MaterialPage = () => {
    const [materials, setMaterials] = useState([]);
    const [filteredMaterials, setFilteredMaterials] = useState<Material[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(0.0);
    const [editingMaterial, setEditingMaterial] = useState<Material | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchMaterials = async () => {
        const materialClient = new MaterialClient();
        const response = await materialClient.getAllMaterials();
        setMaterials(response);
        applySearchFilter(response);
    }

    const applySearchFilter = (data: Material[]) => {
        const filteredData = data.filter(material =>
            material.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredMaterials(filteredData);
    }

    const handleSaveMaterial = async () => {
        if (name === "" || quantity === 0 || price === 0.0) {
            toast.error("Todos los campos son obligatorios");
            return;
        }
        const materialClient = new MaterialClient();
        const newMaterial: Material = { name, quantity, price };
        try {
            await materialClient.createMaterial(newMaterial);
            fetchMaterials();
            setModalOpen(false);
            setName('');
            setQuantity(0);
            setPrice(0.0);
            toast.success("Material agregado correctamente");
        } catch (error) {
            toast.error("Error al agregar el material");
        }
    }

    const handleDeleteMaterial = async (id: number) => {
        const materialClient = new MaterialClient();
        try {
            await materialClient.deleteMaterial(id);
            fetchMaterials();
            toast.warning("Material eliminado correctamente");
        } catch (error) {
            toast.error("Error al eliminar el material");
        }
    }

    const handleEditMaterial = (material: Material) => {
        setEditingMaterial(material);
        setIsEditing(true);
        setModalOpen(true);
        setName(material.name);
        setQuantity(material.quantity);
        setPrice(material.price);
    }

    const handleUpdateMaterial = async () => {
        const materialClient = new MaterialClient();
        try {
            await materialClient.updateMaterial(editingMaterial!.id!, { name, quantity, price });
            fetchMaterials();
            setModalOpen(false);
            setIsEditing(false);
            setEditingMaterial(null);
            setName('');
            setQuantity(0);
            setPrice(0.0);
            toast.success("Material actualizado correctamente");
        } catch (error) {
            toast.error("Error al actualizar el material");
        }
    }

    useEffect(() => {
        fetchMaterials();
    }, []);

    useEffect(() => {
        applySearchFilter(materials);
    }, [searchTerm, materials]);

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
                <div style={{ width: '50%' }}>
                    <Input
                        placeholder="Buscar..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
            <Table>
                <TableHeader>
                    <TableColumn>Nombre</TableColumn>
                    <TableColumn>Cantidad</TableColumn>
                    <TableColumn>Precio</TableColumn>
                    <TableColumn>Acciones</TableColumn>
                </TableHeader>
                <TableBody>
                    {filteredMaterials.map((material: Material, index: number) => (
                        <TableRow key={index}>
                            <TableCell>{material.name}</TableCell>
                            <TableCell>{material.quantity}</TableCell>
                            <TableCell>{material.price}</TableCell>
                            <TableCell>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <button onClick={() => handleEditMaterial(material)}>
                                        <EditIcon />
                                    </button>
                                    <button onClick={() => handleDeleteMaterial(material.id!)}>
                                        <DeleteIcon />
                                    </button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {!modalOpen && (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <Button color="primary" onClick={() => setModalOpen(true)}>Agregar Material</Button>
                </div>
            )}
            {modalOpen && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-200 p-8 w-3/4 h-auto z-10 rounded-lg">
                    <h2 className="text-3xl mb-4">{isEditing ? 'Editar Material' : 'Agregar Material'}</h2>
                    <div className="space-y-4">
                        <Input label="Nombre" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                        <Input label="Cantidad" type="number" value={quantity.toString()} onChange={(e) => setQuantity(Number(e.target.value))} />
                        <Input label="Precio" type="number" step="0.01" value={price.toString()} onChange={(e) => setPrice(parseFloat(e.target.value))} />
                    </div>
                    <div className="mt-4 flex justify-center space-x-4">
                        <Button onClick={() => { setModalOpen(false); setIsEditing(false); setEditingMaterial(null); }}>Cancelar</Button>
                        <Button onClick={isEditing ? handleUpdateMaterial : handleSaveMaterial}>{isEditing ? 'Actualizar' : 'Agregar'}</Button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MaterialPage;
