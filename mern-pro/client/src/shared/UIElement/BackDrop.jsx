import "./BackDrop.css";
import ReactDom from "react-dom";

const BackDrop = (props) => {
  return ReactDom.createPortal(
    <div className="backDrop" onClick={props.onClick}></div>,
    document.getElementById('backdrop-hook')
  );
};

export default BackDrop;
