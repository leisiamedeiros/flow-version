import { Fragment } from 'react'
import { Link } from 'react-router-dom';
import '../../assets/layout.css';
import { House, Layers, FileBarGraph } from 'react-bootstrap-icons';
import { Session } from '../../application/Session';

export default function Layout(props: any) {
    return (
        <Fragment>
            <Header />
            <div className="container">
                <div className="row justify-content-md-center">
                    <main className="col-12">
                        {props.children}
                    </main>
                </div>
            </div>
        </Fragment>
    )
}

export function Header() {
    return (
        <header className="navbar navbar-dark sticky-top blip-color-dark flex-md-nowrap p-0 shadow">
            <Link to="/" className="navbar-brand col-md-3 col-lg-2 me-0 px-3">Flow Version</Link>

            <ul className="navbar-nav px-5">
                <li className="nav-item text-nowrap">
                    <button className="nav-link btn" onClick={() => Session.clear()}>Trocar chave chatbot</button>
                </li>
            </ul>
        </header>
    )
}

export function NavBar() {
    return (
        <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
            <div className="position-sticky pt-3">
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">
                            <House />
                            <span className="ms-2">Dashboard</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/">
                            <FileBarGraph />
                            <span className="ms-2">Reports</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/">
                            <Layers />
                            <span className="ms-2">Integrations</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}