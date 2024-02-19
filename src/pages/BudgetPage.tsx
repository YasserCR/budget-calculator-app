import React, { useEffect, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Input, Button, Select, SelectItem, } from "@nextui-org/react";
import { EyeIcon } from "../../src/assets/EyeIcon.tsx";
import { DeleteIcon } from "../../src/assets/DeleteIcon.tsx";
import { EditIcon } from "../../src/assets/EditIcon.tsx";
import BudgetClient from "../fetch/Budget";
import { Budget } from "../types/Budget";
import { toast } from "react-toastify";
import { Customer } from "../types/Customer";
import CustomerClient from "../fetch/Customer.ts";
import { BudgetStatus } from "../enums/BudgetStatus.ts";

const BudgetPage = () => {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [filteredBudgets, setFilteredBudgets] = useState<Budget[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [nameBudget, setNameBudget] = useState('');
  const [customerId, setCustomerId] = useState<Customer | null>(null);
  const [total, setTotal] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [status, setStatus] = useState('');
  const [active, setActive] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [editingBudget, setEditingBudget] = useState<Budget | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [customers, setCustomers] = useState([]);

  const clearForm = () => {
    setNameBudget('');
    setCustomerId(null);
    setTotal(0);
    setStartDate('');
    setEndDate('');
    setStatus('');
    setActive(false);
    setGenerated(false);
    setAccepted(false);
  };



  const fetchBudgets = async () => {
    const budgetClient = new BudgetClient();
    const response = await budgetClient.getAllBudgets();
    setBudgets(response);
    applySearchFilter(response);
  };

  const applySearchFilter = (data: Budget[]) => {
    const filteredData = data.filter(budget =>
      budget.nameBudget.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBudgets(filteredData);
  };


  const today = new Date().toISOString().split("T")[0];

  const handleSaveBudget = async () => {
    if (
      nameBudget === "" ||
      customerId === null ||
      total === 0 ||
      startDate === "" ||
      endDate === "" ||
      status === ""
    ) {
      toast.error("Todos los campos son obligatorios");
      return;
    }
    const budgetClient = new BudgetClient();
    const newBudget: Budget = {
      nameBudget,
      customerId,
      total,
      startDate,
      endDate,
      status,
      active,
      generated,
      accepted,
    };
    try {
      await budgetClient.createBudget(newBudget);
      fetchBudgets();
      setModalOpen(false);
      setNameBudget('');
      setCustomerId(null);
      setTotal(0);
      setStartDate('');
      setEndDate('');
      setStatus('');
      setActive(false);
      setGenerated(false);
      setAccepted(false);
      toast.success("Presupuesto agregado correctamente");
    } catch (error) {
      toast.error("Error al agregar el presupuesto");
    }
  };

  const fetchCustomers = async () => {
    const customerClient = new CustomerClient();
    const response = await customerClient.getAllClients();
    setCustomers(response);
  }

  const handleUpdateBudget = async () => {
    if (
      nameBudget === "" ||
      customerId === null ||
      total === 0 ||
      startDate === "" ||
      endDate === "" ||
      status === ""
    ) {
      toast.error("Todos los campos son obligatorios");
      return;
    }
    const budgetClient = new BudgetClient();
    const updatedBudget: Budget = {
      // Utiliza el id del presupuesto que estás editando
      id: editingBudget!.id,
      nameBudget,
      customerId,
      total,
      startDate,
      endDate,
      status,
      active,
      generated,
      accepted,
    };
    try {
      await budgetClient.updateBudget(editingBudget!.id!, updatedBudget);
      fetchBudgets();
      setModalOpen(false);
      setNameBudget('');
      setCustomerId(null);
      setTotal(0);
      setStartDate('');
      setEndDate('');
      setStatus('');
      setActive(false);
      setGenerated(false);
      setAccepted(false);
      toast.success("Presupuesto actualizado correctamente");
    } catch (error) {
      toast.error("Error al actualizar el presupuesto");
    }
  };

  const handleDeleteBudget = async (id: number) => {
    const budgetClient = new BudgetClient();
    try {
      await budgetClient.deleteBudget(id);
      fetchBudgets();
      toast.warning("Presupuesto eliminado correctamente");
    } catch (error) {
      toast.error("Error al eliminar el presupuesto");
    }
  };

  const handleEditBudget = (budget: Budget) => {
    setEditingBudget(budget);
    setIsEditing(true);
    setModalOpen(true);
    setNameBudget(budget.nameBudget);
    setCustomerId(budget.customerId);
    setTotal(budget.total);
    setStartDate(budget.startDate);
    setEndDate(budget.endDate);
    setStatus(budget.status);
    setActive(budget.active);
    setGenerated(budget.generated);
    setAccepted(budget.accepted);
  };

  useEffect(() => {
    fetchBudgets();
    fetchCustomers();
  }, []);

  useEffect(() => {
    applySearchFilter(budgets);
  }, [searchTerm, budgets]);

  useEffect(() => {
    if (isEditing && editingBudget) {
      setStatus(editingBudget.status);
    }
  }, [isEditing, editingBudget]);

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
          {filteredBudgets.map((budget: Budget, index: number) => (
            <TableRow key={index}>
              <TableCell>{budget.nameBudget}</TableCell>
              <TableCell>{budget.customerId.name}</TableCell>
              <TableCell>{budget.total}</TableCell>
              <TableCell>{budget.status}</TableCell>
              <TableCell>{budget.active ? "Si" : "No"}</TableCell>
              <TableCell>{budget.generated ? "Si" : "No"}</TableCell>
              <TableCell>{budget.accepted ? "Si" : "No"}</TableCell>
              <TableCell>{budget.startDate}</TableCell>
              <TableCell>{budget.endDate}</TableCell>
              <TableCell>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <EyeIcon />
                  <button onClick={() => handleEditBudget(budget)}>
                    <EditIcon />
                  </button>
                  <button onClick={() => handleDeleteBudget(budget.id!)}>
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
          <Button color="primary" onClick={() => {
            setModalOpen(true);
            setEditingBudget(null);
            setIsEditing(false);
          }}>Agregar Presupuesto</Button>
        </div>
      )}
      {modalOpen && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-200 p-8 w-3/4 h-auto z-10 rounded-lg">
          <h2 className="text-3xl mb-4">{isEditing ? 'Editar Presupuesto' : 'Agregar Presupuesto'}</h2>
          <div className="space-y-4">
            <Input label="Nombre" type="text" value={nameBudget} onChange={(e) => setNameBudget(e.target.value)} />
            <Select
              placeholder="Seleccione un cliente"
              value={customerId?.id || ''}
              onChange={(event) => setCustomerId(customers.find((customer: Customer) => customer.id === Number(event.target.value)) || null)}
              defaultSelectedKeys={customerId?.id?.toString() || ''}
            >
              {customers.map((customer: Customer) => (
                <SelectItem value={customer.id?.toString()} key={customer.id?.toString() || customer.toString()}>{customer.name}</SelectItem>
              ))}
            </Select>
            <Input label="Total" type="number" value={total.toString()} onChange={(e) => setTotal(Number(e.target.value))} />

            <Select
              label="Estado"
              value={status}
              onChange={(e) => setStatus(e.target.value as BudgetStatus)}
              defaultSelectedKeys={[status.toString()]}
            >
              {Object.values(BudgetStatus).map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </Select>
            <Input label="Activo" type="checkbox" checked={active} onChange={() => setActive(!active)} />
            <Input label="Generado" type="checkbox" checked={generated} onChange={() => setGenerated(!generated)} />
            <Input label="Aceptado" type="checkbox" checked={accepted} onChange={() => setAccepted(!accepted)} />
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="start-date">
              Fecha de inicio
            </label>
            <Input id="start-date" type="date" value={startDate} min={today} onChange={(e) => setStartDate(e.target.value)} />

            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="end-date">
              Fecha de fin
            </label>
            <Input id="end-date" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </div>
          <div className="mt-4 flex justify-center space-x-4">
            <Button onClick={() => { setModalOpen(false); setIsEditing(false); setEditingBudget(null); clearForm(); }}>Cancelar</Button>
            {/* Usa handleUpdateBudget para actualizar y handleSaveBudget para agregar */}
            <Button onClick={isEditing ? handleUpdateBudget : handleSaveBudget}>
              {isEditing ? 'Actualizar' : 'Agregar'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BudgetPage;
