import React, { useEffect, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Input, } from "@nextui-org/react";
import { DeleteIcon } from "../../src/assets/DeleteIcon.tsx";
import { EditIcon } from "../../src/assets/EditIcon.tsx";
import ActivityClient from "../fetch/Activity.ts";
import { Activity } from "../types/Activity.ts";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ActivityPage = () => {

    const [activities, setActivities] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [name, setName] = useState("");
    const [unit, setUnit] = useState("");

    const fetchActivities = async () => {
        const activityClient = new ActivityClient();
        const response = await activityClient.getAllActivities();
        setActivities(response);
    };

    const handleSaveActivity = async () => {
        if (name === "" || unit === "") {
            toast.error("Todos los campos son obligatorios");
            return;
        }
        const activityClient = new ActivityClient();
        const newActivity: Activity = { name, unit };
        try {
            await activityClient.createActivity(newActivity);
            fetchActivities();
            setModalOpen(false);
            setName('');
            setUnit('');
            toast.success("Actividad agregada correctamente");
        } catch (error) {
            toast.error("Error al agregar la actividad");
        }
    }

    const handleDeleteActivity = async (id: number) => {
        const activityClient = new ActivityClient();
        try {
            await activityClient.deleteActivity(id);
            fetchActivities();
            toast.warning("Actividad eliminada correctamente");
        } catch (error) {
            toast.error("Error al eliminar la actividad");
        }
    }

    const handleEditActivity = async () => {
        toast.warning("Funcionalidad no implementada");
    }


    useEffect(() => {
        fetchActivities();
    }, []);

    return (
        <div>
            <Table>
                <TableHeader>
                    <TableColumn>Nombre</TableColumn>
                    <TableColumn>Unidad</TableColumn>
                    <TableColumn>Acciones</TableColumn>
                </TableHeader>
                <TableBody>
                    {activities.map((activity: Activity, index: number) => (
                        <TableRow key={index}>
                            <TableCell>{activity.name}</TableCell>
                            <TableCell>{activity.unit}</TableCell>
                            <TableCell>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <button onClick={() => handleEditActivity()}>
                                        <EditIcon />
                                    </button>
                                    <button onClick={() => handleDeleteActivity(activity.id!)}>
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
                    <Button color="primary" onClick={() => setModalOpen(true)}>Agregar Actividad</Button>
                </div>
            )}
            {modalOpen && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-200 p-8 w-1/2 h-1/3 z-10 rounded-lg">
                    <h2 className="text-3xl mb-4">Agregar Actividad</h2>
                    <div className="space-y-4">
                        <Input label="Nombre" value={name} onChange={(e) => setName(e.target.value)} />
                        <Input label="Unidad" value={unit} onChange={(e) => setUnit(e.target.value)} />
                    </div>
                    <div className="mt-4 flex justify-center space-x-4">
                        <Button onClick={() => setModalOpen(false)}>Cancelar</Button>
                        <Button onClick={handleSaveActivity}>Agregar</Button>
                    </div>
                </div>
            )}

        </div>
    );
}

export default ActivityPage;