import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import { ToastContainer } from "react-toastify";

import { AppProvider } from "./context/AppContext";
import ActivityPage from "./pages/ActivityPage";
import BudgetPage from "./pages/BudgetPage";
import ConceptPage from "./pages/ConceptPage";
import CustomerPage from "./pages/CustomerPage";
import MaterialPage from "./pages/MaterialPage";
import Layout from "./components/Layout";


function App() {
  return (
    <NextUIProvider>
      <AppProvider>
        <BrowserRouter>
          <ToastContainer />
          <Layout />
          <Routes>
            <Route path="/" element={<ActivityPage />} />
            <Route path="/activity" element={<ActivityPage />} />
            <Route path="/budget" element={<BudgetPage />} />
            <Route path="/concept" element={<ConceptPage />} />
            <Route path="/customer" element={<CustomerPage />} />
            <Route path="/material" element={<MaterialPage />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </NextUIProvider>
  );
}

export default App
