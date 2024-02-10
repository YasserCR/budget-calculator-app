import React, { useEffect, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, } from "@nextui-org/react";
import { DeleteIcon } from "../../src/assets/DeleteIcon.tsx";
import { EditIcon } from "../../src/assets/EditIcon.tsx";
import { EyeIcon } from "../../src/assets/EyeIcon.tsx";
import BudgetClient from "../fetch/Budget.ts";
import { Budget } from "../types/Budget.ts";

const BudgetPage = () => {

    const [budgets, setBudgets] = useState([]);

    const fetchBudgets = async () => {
        const budgetClient = new BudgetClient();
        const response = await budgetClient.getAllBudgets();
        setBudgets(response);
    };

    useEffect(() => {
        fetchBudgets();
    }, []);

    return (
        <div>
            <Table>
                <TableHeader>
                    <TableColumn>Nombre</TableColumn>
                    <TableColumn>Cliente</TableColumn>
                    <TableColumn>Total</TableColumn>
                    <TableColumn>Fecha de inicio</TableColumn>
                    <TableColumn>Fecha de fin</TableColumn>
                    <TableColumn>Estado</TableColumn>
                    <TableColumn>Activo</TableColumn>
                    <TableColumn>Generado</TableColumn>
                    <TableColumn>Aceptado</TableColumn>
                    <TableColumn>Acciones</TableColumn>
                </TableHeader>
                <TableBody>
                    {budgets.map((budget: Budget, index: number) => (
                        <TableRow key={index}>
                            <TableCell>{budget.nameBudget}</TableCell>
                            <TableCell>{budget.customerId.name}</TableCell>
                            <TableCell>{budget.total}</TableCell>
                            <TableCell>{budget.startDate}</TableCell>
                            <TableCell>{budget.endDate}</TableCell>
                            <TableCell>{budget.status}</TableCell>
                            <TableCell>{budget.active ? "Si" : "No"}</TableCell>
                            <TableCell>{budget.generated ? "Si" : "No"}</TableCell>
                            <TableCell>{budget.accepted ? "Si" : "No"}</TableCell>
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

export default BudgetPage;