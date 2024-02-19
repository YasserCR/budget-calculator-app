import React, { useEffect, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Input } from "@nextui-org/react";
import { DeleteIcon } from "../../src/assets/DeleteIcon.tsx";
import { EditIcon } from "../../src/assets/EditIcon.tsx";
import ActivityClient from "../fetch/Activity.ts";
import { Activity } from "../types/Activity.ts";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ActivityPage = () => {
    const [activities, setActivities] = useState([]);
    const [filteredActivities, setFilteredActivities] = useState<Activity[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [name, setName] = useState("");
    const [unit, setUnit] = useState("");
    const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchActivities = async () => {
        const activityClient = new ActivityClient();
        const response = await activityClient.getAllActivities();
        setActivities(response);
        applySearchFilter(response);
    };

    const applySearchFilter = (data: Activity[]) => {
        const filteredData = data.filter(activity =>
            activity.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredActivities(filteredData);
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
            setName("");
            setUnit("");
            toast.success("Actividad agregada correctamente");
        } catch (error) {
            toast.error("Error al agregar la actividad");
        }
    };

    const handleDeleteActivity = async (id: number) => {
        const activityClient = new ActivityClient();
        try {
            await activityClient.deleteActivity(id);
            fetchActivities();
            toast.warning("Actividad eliminada correctamente");
        } catch (error) {
            toast.error("Error al eliminar la actividad");
        }
    };

    const handleEditActivity = (activity: Activity) => {
        setEditingActivity(activity);
        setIsEditing(true);
        setModalOpen(true);
        setName(activity.name);
        setUnit(activity.unit);
    };

    const handleUpdateActivity = async () => {
        const activityClient = new ActivityClient();
        try {
            await activityClient.updateActivity(editingActivity!.id!, { name, unit });
            fetchActivities();
            setModalOpen(false);
            setIsEditing(false);
            setEditingActivity(null);
            setName("");
            setUnit("");
            toast.success("Actividad actualizada correctamente");
        } catch (error) {
            toast.error("Error al actualizar la actividad");
        }
    };

    useEffect(() => {
        fetchActivities();
    }, []);

    useEffect(() => {
        applySearchFilter(activities);
    }, [searchTerm, activities]);

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
                    <TableColumn>Unidad</TableColumn>
                    <TableColumn>Acciones</TableColumn>
                </TableHeader>
                <TableBody>
                    {filteredActivities.map((activity: Activity, index: number) => (
                        <TableRow key={index}>
                            <TableCell>{activity.name}</TableCell>
                            <TableCell>{activity.unit}</TableCell>
                            <TableCell>
                                <div style={{ display: "flex", gap: "10px" }}>
                                    <button onClick={() => handleEditActivity(activity)}>
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
                <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                    <Button color="primary" onClick={() => setModalOpen(true)}>
                        Agregar Actividad
                    </Button>
                </div>
            )}
            {modalOpen && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-200 p-8 w-3/4 h-auto z-10 rounded-lg">
                    <h2 className="text-3xl mb-4">{isEditing ? "Editar Actividad" : "Agregar Actividad"}</h2>
                    <div className="space-y-4">
                        <Input label="Nombre" value={name} onChange={(e) => setName(e.target.value)} />
                        <Input label="Unidad" value={unit} onChange={(e) => setUnit(e.target.value)} />
                    </div>
                    <div className="mt-4 flex justify-center space-x-4">
                        <Button onClick={() => { setModalOpen(false); setIsEditing(false); setEditingActivity(null); }}>
                            Cancelar
                        </Button>
                        <Button onClick={isEditing ? handleUpdateActivity : handleSaveActivity}>
                            {isEditing ? "Actualizar" : "Agregar"}
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ActivityPage;
