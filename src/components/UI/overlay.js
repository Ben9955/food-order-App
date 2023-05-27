import style from "./overlay.module.css";
import ReactDOM from "react-dom";
const Overlay = (props) => {
  return ReactDOM.createPortal(
    <div className={style.overlay}>{props.children}</div>,
    document.getElementById("overlay")
  );
};

export default Overlay;
