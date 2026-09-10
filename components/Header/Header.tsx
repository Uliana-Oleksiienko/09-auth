import Navbar from "../Navbar/Navbar";
import css from "./Header.module.css";

const Header = () => {
  return (
    <header className={css.header}>
      <Navbar />
    </header>
  );
};

export default Header;