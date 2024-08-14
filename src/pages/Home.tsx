import { Link } from "react-router-dom";

export default function Home() {
    return (
        <>
            <header style={{ display: 'flex', gap:'100px' }}>
                <Link to="/">Home</Link>
                <Link to="/app">APP</Link>
                <Link to="/trabajo">Trabajo</Link>
            </header>
        </>
    );
}
