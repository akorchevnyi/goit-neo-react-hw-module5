import css from "./NotFoundPage.module.css";
import { Link, useLocation } from "react-router-dom";

export default function NotFoundPage() {
    const location = useLocation();
    const backUrl = location.state ?? "/";

    return <div className="container">
        <Link to={backUrl} className="back-btn">← Back</Link>
        <h2 className={css.wrapper}>🚧 Oops! This page does not exist. 🚀</h2>
    </div>;
}
