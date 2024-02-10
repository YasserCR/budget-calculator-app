import React, { useEffect, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, } from "@nextui-org/react";
import { DeleteIcon } from "../../src/assets/DeleteIcon.tsx";
import { EditIcon } from "../../src/assets/EditIcon.tsx";
import CustomerClient from "../fetch/Customer.ts";
import { Customer } from "../types/Customer.ts";

const CustomerPage = () => {

    const [customers, setCustomers] = useState([]);

    const fetchCustomers = async () => {
        const customerClient = new CustomerClient();
        const response = await customerClient.getAllClients();
        setCustomers(response);
    }

    useEffect(() => {
        fetchCustomers();
    }, []);

    return (
        <div>
            <Table>
                <TableHeader>
                    <TableColumn>Nombre</TableColumn>
                    <TableColumn>Apellido</TableColumn>
                    <TableColumn>Email</TableColumn>
                    <TableColumn>Telefono</TableColumn>
                    <TableColumn>Acciones</TableColumn>
                </TableHeader>
                <TableBody>
                    {customers.map((customer: Customer, index: number) => (
                        <TableRow key={index}>
                            <TableCell>{customer.name}</TableCell>
                            <TableCell>{customer.lastname}</TableCell>
                            <TableCell>{customer.email}</TableCell>
                            <TableCell>{customer.phone}</TableCell>
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

export default CustomerPage;