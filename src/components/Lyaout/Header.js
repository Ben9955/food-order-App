import HeaderButton from "./HeaderCartButton";
import style from "./Header.module.css";
const Header = ({ onButtonClick }) => {
  return (
    <>
      <header className={style.header}>
        <h1>OurMeals</h1>
        <HeaderButton onButtonClick={onButtonClick} />
      </header>
      <div className={style.img_header}>
        <img
          src="https://images.unsplash.com/photo-1592861956120-e524fc739696?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
          alt="Table of food"
        />
      </div>
    </>
  );
};

export default Header;
