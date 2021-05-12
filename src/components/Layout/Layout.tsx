import { Fragment } from 'react'
import { Link } from 'react-router-dom';
import Auth from '../../application/Auth';
import '../../assets/layout.css';
import { House, Layers, FileBarGraph } from 'react-bootstrap-icons';

export default function Layout(props: any) {
    return (
        <Fragment>
            <Header />
            <div className="container-fluid">
                <div className="row">

                    <NavBar />

                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div
                            className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center 
                        pt-3 pb-2 mb-3 border-bottom">
                            <h1 className="h2">Dashboard</h1>
                        </div>

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

            <ul className="navbar-nav px-3">
                <li className="nav-item text-nowrap">
                    <button className="nav-link btn" onClick={() => Auth.signout()}>Sign out</button>
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