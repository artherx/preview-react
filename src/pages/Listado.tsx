import { Link } from "react-router-dom";
import Home from "./Home";
import styles from './home.module.css';


export default function Listado() {
    return (
        <>
            <Home />
            <div className="flex flex-col items-center justify-center h-screen gap-20">
                <Link to="/line" className={`${styles.link}`}>Graficador</Link>
                <Link to="/map" className={`${styles.link}`}>Mapa</Link>
                <Link to="/stakeholders" className={`${styles.link}`}>Stakeholders</Link>
            </div>
        </>
    )
}