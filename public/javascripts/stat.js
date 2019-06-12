var resData;
var dataData;
var turbResult = document.querySelector(".turb-result");
var turbValue = document.querySelector("#turb-value").innerHTML;

turbResult.innerHTML = turbValue;


$.ajax({
  url: "/javascripts/result.csv",
  dataType: "text"
}).done(getRes);

$.ajax({
  url: "/javascripts/data.csv",
  dataType: "text"
}).done(getData);

function getRes(data) {
  resData = data.split("\n");
  adjData();
}

function getData(data) {
  dataData = data.split("\n");
  adjData();
}

function adjData() {
  // for (var i in resData) {
  //   resData[i] = parseInt(resData[i]);
  // }

  // for (var k in dataData) {
  //   dataData[k] = parseInt(dataData[k]);
  // }

  var chart = new Chartist.Line(
    "#canvas",
    {
      series: [resData, dataData]
    },
    {
      showPoint: false
    }
  );
}
