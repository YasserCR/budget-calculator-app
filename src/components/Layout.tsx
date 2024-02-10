import React from "react";
import { Link } from "react-router-dom";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenuItem, NavbarMenu } from "@nextui-org/react";


const Layout: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [selectedItem, setSelectedItem] = React.useState("");

    const menuItems = [
        { text: "Actividades", route: "/activity" },
        { text: "Presupuestos", route: "/budget" },
        { text: "Clientes", route: "/customer" },
        { text: "Conceptos", route: "/concept" },
        { text: "Materiales", route: "/material" },
    ];

    return (
        <Navbar onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="md:hidden"
                />
                <NavbarBrand>
                    <p className="font-bold text-inherit ml-4">Budget Calculator</p>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden md:flex gap-4 justify-center ml-24">
                {menuItems.map((item, index) => (
                    <NavbarItem key={`${item.text}-${index}`}>
                        <Link
                            to={item.route}
                            onClick={() => setSelectedItem(item.text)}
                            className={`text-lg ${selectedItem === item.text ? "text-primary" : "text-foreground"}`}
                        >
                            {item.text}
                        </Link>
                    </NavbarItem>
                ))}
            </NavbarContent>
            <NavbarContent justify="end">
            </NavbarContent>
            <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item.text}-${index}`}>
                        <Link
                            to={item.route}
                            className={`w-full text-lg ${selectedItem === item.text ? "text-primary" : "text-foreground"}`}
                            onClick={() => setSelectedItem(item.text)}
                        >
                            {item.text}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
};

export default Layout;