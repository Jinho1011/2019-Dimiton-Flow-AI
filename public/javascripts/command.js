var cmd1 = document.querySelector(".cmd1");
var cmd2 = document.querySelector(".cmd2");
var cmd3 = document.querySelector(".cmd3");
var cmd4 = document.querySelector(".cmd4");
var cmd5 = document.querySelector(".cmd5");
var cmd6 = document.querySelector(".cmd6");
var form = document.querySelector(".cmd-form")

const formSubmit = s => {
  console.log("TCL: s", s)
  var hiddenField = document.createElement("input");
  hiddenField.setAttribute("type", "hidden");
  hiddenField.setAttribute("name", "cmd");
  hiddenField.setAttribute("value", s.innerHtml);
  form.appendChild(hiddenField);
};

cmd1.addEventListener("click", formSubmit(cmd1));
cmd2.addEventListener("click", formSubmit(cmd2));
cmd3.addEventListener("click", formSubmit(cmd3));
cmd4.addEventListener("click", formSubmit(cmd4));
cmd5.addEventListener("click", formSubmit(cmd5));
cmd6.addEventListener("click", formSubmit(cmd6));
