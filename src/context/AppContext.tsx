import { createContext, ReactNode } from "react";

export interface AppContextValue {
}

export const AppContext = createContext<AppContextValue>({});

interface AppProviderProps {
    children: ReactNode;
}

export const AppProvider = (props: AppProviderProps) => {
    return (
        <AppContext.Provider value={{}}>
            {props.children}
        </AppContext.Provider>
    );
};