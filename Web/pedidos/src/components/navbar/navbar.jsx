import Logo from "../../assets/logo.png.png";
import { Link } from "react-router-dom";

function Navbar(){
    return <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-primary ps-3 pe-3">
    <div className="container-fluid">
        <a className="navbar-brand" href="/">
            <img className="mt-1" src={Logo} alt="Delivery Mais" />
        </a>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" 
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" 
                aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                        
            <ul className="navbar-nav ms-4 mb-2 mb-lg-0">
                <li className="nav-item me-4">
                    <Link className="btn btn-outline-light" aria-current="page" to="/">Dashboard</Link>
                </li>
                <li className="nav-item me-4">
                    <Link className="btn btn-outline-light" aria-current="page" to="/pedidos">Pedidos</Link>
                </li>
            </ul>                        

        </div>
    </div>
</nav>
}

export default Navbar;