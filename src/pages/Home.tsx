import { Link } from "react-router-dom";
import styles from './home.module.css'
export default function Home() {
    return (
        <>
            <header className="bg-gray-800 text-white flex flex-row justify-evenly h-10 items-center">
                <Link to="/" className={`${styles.link}`}>Home</Link>
                <Link to="/app" className={`${styles.link}`}>APP</Link>
                <Link to="/trabajo" className={`${styles.link}`}>Trabajo</Link>
            </header>
        </>
    );
}
