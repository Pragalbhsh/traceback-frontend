import './Navbar.css';
function Navbar() {
    return (
        <nav
            className="navbar"> // navbar is the class name which we use in the css file
            <h1>TraceBack</h1>
            <button>Report Item</button>
        </nav>
    );
}

export default Navbar;