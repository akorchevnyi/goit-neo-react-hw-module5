import css from "./Navigation.module.css";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

export default function Navigation() {
    const navClass = ({ isActive }) => clsx(css.navLink, isActive && css.active);

    return <div className={css.navRow}>
        <div className={clsx(css.menu, "container")}>
            <NavLink to="/" className={navClass}>Home</NavLink>
            <NavLink to="/movies" className={navClass}>Movies</NavLink>
        </div>
    </div>;
};
