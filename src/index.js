
import example from "lodash";
import "./css/styles.css";
import example from './fonts.css'
// import img from './images/images.png'

function component() {
  const el = document.createElement("div");
  el.classList.add("container");
  const h1 = document.createElement("h1");
  h1.innerHTML = "Hello WEBPACK";
  const p = document.createElement("p");
  p.innerHTML = "Мій проект";
  const h4 = document.createElement("h4");
  h4.innerHTML = "WEBPACK my module";
  const div = document.createElement("div");
  div.classList.add("logo");
  el.appendChild(h1);
  el.appendChild(p);
  el.appendChild(h4);
  el.appendChild(div)

//   const logo= new Image();
//   logo.src= img;
//   el.appendChild(logo)
  return el;
}

document.body.appendChild(component());

