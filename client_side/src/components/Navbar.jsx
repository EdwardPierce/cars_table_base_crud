import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="navContainer">
      <section className="navSection">
        <Link to="/">Cars Specification Table</Link>

        <div className="navLinks">
          <Link to="/create/0">Create Car</Link>
        </div>
      </section>
    </nav>
  );
};
