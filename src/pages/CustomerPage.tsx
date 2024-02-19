import React, { useEffect, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Input, Button } from "@nextui-org/react";
import { DeleteIcon } from "../../src/assets/DeleteIcon.tsx";
import { EditIcon } from "../../src/assets/EditIcon.tsx";
import CustomerClient from "../fetch/Customer.ts";
import { Customer } from "../types/Customer.ts";
import { toast } from "react-toastify";

const CustomerPage = () => {
    const [customers, setCustomers] = useState([]);
    const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

    const fetchCustomers = async () => {
        const customerClient = new CustomerClient();
        const response = await customerClient.getAllClients();
        setCustomers(response);
        applySearchFilter(response);
    }

    const applySearchFilter = (data: Customer[]) => {
        const filteredData = data.filter(customer =>
            customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.phone.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredCustomers(filteredData);
    }

    const handleSaveCustomer = async () => {
        if (name === "" || lastname === "" || email === "" || phone === "") {
            toast.error("Todos los campos son obligatorios");
            return;
        }

        const customerClient = new CustomerClient();
        const newCustomer: Customer = { name, lastname, email, phone };

        try {
            if (editingCustomer) {
                // Si estamos editando, llamamos a la función de actualizar
                await customerClient.updateClient(editingCustomer.id!, newCustomer);
            } else {
                // Si no estamos editando, llamamos a la función de crear
                await customerClient.createClient(newCustomer);
            }

            // Actualizamos la lista de clientes y limpiamos los campos
            fetchCustomers();
            setModalOpen(false);
            setName('');
            setLastname('');
            setEmail('');
            setPhone('');
            setEditingCustomer(null);
        } catch (error) {
            // Manejo de errores
        }
    }

    const handleDeleteCustomer = async (id: number) => {
        const customerClient = new CustomerClient();

        try {
            await customerClient.deleteClient(id);
            fetchCustomers();
        } catch (error) {
            // Manejo de errores
        }
    }

    const handleEditCustomer = (customer: Customer) => {
        // Al hacer clic en editar, abrimos el modal con los detalles del cliente para editar
        setEditingCustomer(customer);
        setModalOpen(true);
        setName(customer.name);
        setLastname(customer.lastname);
        setEmail(customer.email);
        setPhone(customer.phone);
    }

    useEffect(() => {
        fetchCustomers();
    }, []);

    useEffect(() => {
        applySearchFilter(customers);
    }, [searchTerm, customers]);

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
                    <TableColumn>Apellido</TableColumn>
                    <TableColumn>Email</TableColumn>
                    <TableColumn>Telefono</TableColumn>
                    <TableColumn>Acciones</TableColumn>
                </TableHeader>
                <TableBody>
                    {filteredCustomers.map((customer: Customer, index: number) => (
                        <TableRow key={index}>
                            <TableCell>{customer.name}</TableCell>
                            <TableCell>{customer.lastname}</TableCell>
                            <TableCell>{customer.email}</TableCell>
                            <TableCell>{customer.phone}</TableCell>
                            <TableCell>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                    <button onClick={() => handleEditCustomer(customer)}>
                                        <EditIcon />
                                    </button>
                                    <button onClick={() => handleDeleteCustomer(customer.id!)}>
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
                    <h2 className="text-3xl mb-4">{editingCustomer ? 'Editar Cliente' : 'Agregar Cliente'}</h2>
                    <div className="space-y-4">
                        <Input label="Nombre" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                        <Input label="Apellido" type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} />
                        <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <Input label="Teléfono" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>
                    <div className="mt-4 flex justify-center space-x-4">
                        <Button onClick={() => { setModalOpen(false); setName(''); setLastname(''); setEmail(''); setPhone(''); setEditingCustomer(null); }}>Cancelar</Button>
                        <Button onClick={handleSaveCustomer}>{editingCustomer ? 'Actualizar' : 'Agregar'}</Button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CustomerPage;
