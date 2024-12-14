import { MagnifyingGlass } from "react-loader-spinner";
import css from "./Loader.module.css";

export function Loader() {
    return <div className={css.container}>
        <MagnifyingGlass/>
    </div>;
}
