
import "./css/styles.css";
import img from "./images/images.png";

function component() {
  const el = document.createElement("div");
  el.classList.add("container");
  const h1 = document.createElement("h1");
  h1.innerHTML = "Hello WEBPACK";
  const p = document.createElement("p");
  p.innerHTML = "Мій проект";
  const h4 = document.createElement("h4");
  h4.innerHTML = "WEBPACK my module";

  el.appendChild(h1);
  el.appendChild(p);
  el.appendChild(h4);

  const myImg = new Image();
  myImg.src = img;
  el.appendChild(myImg);
  return el;
}

document.body.appendChild(component());
