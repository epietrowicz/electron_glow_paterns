const os = require('os')
var chart = null;
var timeInput;
var stepInput;
var timeInc;
var ledCount = 0;
var ledsInFrameArray = [];
var colorsInFrameArray = [];

function getDatasets() {
  const datasets = []
    const ledData = {
      data: [
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
      ],
      backgroundColor: [
        'rgba(0, 0, 0, 1)',
        'rgba(0, 0, 0, 1)',
        'rgba(0, 0, 0, 1)',
        'rgba(0, 0, 0, 1)',
        'rgba(0, 0, 0, 1)',
        'rgba(0, 0, 0, 1)',
        'rgba(0, 0, 0, 1)',
        'rgba(0, 0, 0, 1)',
        'rgba(0, 0, 0, 1)',
        'rgba(0, 0, 0, 1)',
      ],
      borderWidth: 1,
      borderColor: '#777',
    }
  datasets.push(ledData)
  return datasets;
}
function drawChart() {
  chart = new Chart($('.chart'), {
    type: 'doughnut',
    //responsive: false,
    data: {
      labels: [
        'LED 1',
        'LED 2',
        'LED 3',
        'LED 4',
        'LED 5',
        'LED 6',
        'LED 7',
        'LED 8',
        'LED 9',
        'LED 10',
      ],
      datasets: getDatasets()
    },
    options: {
      cutoutPercentage: 85,
      maintainAspectRatio: true,
      title: {
        display: false,
        //text: 'Metallica LED Demo',
        //fontColor: 'rgb(250, 250, 250)',
        //fontSize: 16
      },
      legend: {
        display: false,
        labels: {
          fontColor: 'rgb(250, 250, 250)',
          fontSize: 12,
        },
      },

    onClick: function(event, array) {
        let element = this.getElementAtEvent(event);
        if (element.length > 0) {
            var label = element[0]._model.label;
            //console.log(label);
            drawPrompt(label);
        }
      }
    },
  });
        //setInterval(updateDatasets(led, colorString), 1000);
}
function line(x0, y0, x1, y1, x){
  var result = Math.abs(((x - x1) * (y1 - y0)) / ((x1 - x0) + y1)); 
  var intResult = Math.ceil(result);
  return intResult;
}

/*
function getColorTransitionState(startColor, endColor, percent){
  var returnColor = {red:0.0, green:0.0,blue:0.0};  
  returnColor.red = line(0.0, startColor.red, 100.0, endColor.red, percent);
  returnColor.green = line(0.0, startColor.green, 100.0, endColor.green, percent);
  returnColor.blue = line(0.0, startColor.blue, 100.0, endColor.blue, percent);
  return returnColor;
}*/
function getColorTransitionState(startColor, endColor, steps){
  var returnColor = {red:0, green:0,blue:0};

  if(startColor.red == endColor.red){
    returnColor.red = startColor.red;
  } else {
    returnColor.red = Math.abs(Math.round((endColor.red - startColor.red) / (steps+1)));
  }
  if(startColor.green == endColor.green){
    returnColor.green = startColor.green;
  } else {
    returnColor.green = Math.abs(Math.round((endColor.green - startColor.green) / (steps+1)));
  }
  if(startColor.blue == endColor.blue){
    returnColor.blue = startColor.blue;
  } else {
    returnColor.blue = Math.abs(Math.round((endColor.blue - startColor.blue) / (steps+1)));
  }
  return returnColor;
}
function makeRGBString(red, green, blue){
  return ('rgba(' + red + ',' + green + ',' + blue + ', 1)');
}
function makeRipple(color1, color2){
  var returnColorA = getColorTransitionState(color1, color2, 2);
  var returnColorB = getColorTransitionState(color1, color2, 2);

  updateDatasets(0, makeRGBString(color1.red, color1.green, color1.blue));
  updateDatasets(1,  makeRGBString(color1.red, color1.green, color1.blue));
  updateDatasets(2, makeRGBString(returnColorA.red, returnColorA.green, returnColorA.blue));
  updateDatasets(3, makeRGBString(returnColorB.red+returnColorA.red, 
                                  returnColorB.green+returnColorA.green, 
                                  returnColorB.blue+returnColorA.blue));
  updateDatasets(4, makeRGBString(color2.red, color2.green, color2.blue));
  updateDatasets(5, makeRGBString(color2.red, color2.green, color2.blue));
  updateDatasets(6, makeRGBString(color2.red, color2.green, color2.blue));

  updateDatasets(7, makeRGBString(returnColorB.red+returnColorA.red, 
                                  returnColorB.green+returnColorA.green, 
                                  returnColorB.blue+returnColorA.blue));
  updateDatasets(8, makeRGBString(returnColorA.red, returnColorA.green, returnColorA.blue));
  updateDatasets(9,  makeRGBString(color1.red, color1.green, color1.blue));
}
function rainbowPattern(){
  console.log("rainbow clicked");
  //'rgba(' + result.Red + ', ' + result.Green + ', ' + result.Blue + ', 1)';
  updateDatasets(0, 'rgba(255,0,0)');
  updateDatasets(1, 'rgba(178,76,0)');
  updateDatasets(2, 'rgba(101,153,0)');
  updateDatasets(3, 'rgba(25,229,0)');
  updateDatasets(4, 'rgba(0,203,0)');
  updateDatasets(5, 'rgba(0,127,76)');
  updateDatasets(6, 'rgba(0,50,153)');
  updateDatasets(7, 'rgba(0,0,229)');
  updateDatasets(8, 'rgba(76,0,152)');
  updateDatasets(9, 'rgba(153,0,76)');
}
function whitePattern(){
  var color2 = {red: 255, green: 255, blue: 255};
  var color1 = {red: 0, green: 0, blue: 0};
  makeRipple(color1, color2);
}
function bluePattern(){
  var color1 = {red: 0, green: 0, blue: 255};
  var color2 = {red: 0, green: 255, blue: 255};
  makeRipple(color1, color2);
}
function greenPattern(){
  var color1 = {red: 255.0, green: 255.0, blue: 0.0};
  var color2 = {red: 0.0, green: 255.0, blue: 0.0};
  makeRipple(color1, color2);
}
function redPattern(){
  var color1 = {red: 255.0, green: 0.0, blue: 0.0};
  var color2 = {red: 255.0, green: 55.0, blue: 0.0};
  makeRipple(color1, color2);
}
function purplePattern(){
  var color2 = {red: 255.0, green: 0.0, blue: 120.0};
  var color1 = {red: 25.0, green: 6.0, blue: 46.0};
  makeRipple(color1, color2);
}
function updateDatasets(led, colorString){
  chart.data.datasets[0].backgroundColor[led] = colorString;
  ledsInFrameArray[ledCount] = led;
  colorsInFrameArray[ledCount] = colorString;
  ledCount++;
  chart.update();
}
function getLEDLocation(label){
  switch(label){
    case 'LED 1':
      return 0;
    case 'LED 2':
      return 1;
    case 'LED 3':
      return 2;
    case 'LED 4':
      return 3;
    case 'LED 5':
      return 4;
    case 'LED 6':
      return 5;
    case 'LED 7':
      return 6;
    case 'LED 8':
      return 7;
    case 'LED 9':
      return 8;
    case 'LED 10':
      return 9;
    default:
      return 0;
  }
}
function drawPrompt(label){
  const prompt = require('electron-multi-prompt');
  prompt({
    title: label + ' Mix',
    value: 'Single input value',
    disableInitialLabel: true,
    alwaysOnTop: false, //allow the prompt window to stay over the main Window,
    type: 'multi-input',
    width: 310, // window width
    height: 310, // window height
    resizable: true,
    buttonsStyle: {
      texts: {
        ok_text: 'Okay', //text for ok button
        cancel_text: 'Cancel', //text for cancel button
      }
    },
      inputArray:[
        {
          key: 'Red',
          label: 'Red',
          value: '0 to 255',
          attributes: {
            placeholder: '0 to 255',
            type: 'number'
          }
        },
        {
          key: 'Green',
          label: 'Green',
          value: '0 to 255',
          attributes: {
            placeholder: '0 to 255',
            type: 'number'
          }
        },
        {
          key: 'Blue',
          label: 'Blue',
          value: '0 to 255',
          attributes: {
            placeholder: '0 to 255',
            type: 'number'
          }
        },
      ]
  })
  .then((result) => {
    if (result) {
      //console.log('obtained result', result);
      if(!result.Red){
        result.Red = '0';
      }
      if(!result.Blue){
        result.Blue = '0';
      }
      if(!result.Green){
        result.Green = '0';
      }
      //var colorString = 'rgba(' + result.Red + ', ' + result.Green + ', ' + result.Blue + ', 1)';
      var colorString = makeRGBString(result.Red,result.Green,result.Blue);
      var led = getLEDLocation(label);
      updateDatasets(led, colorString);
    } else {
    }
  })
  .catch((error) => {
    console.log('uh-oh', error);
  })
}
function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}
function startGlow(){
  setInterval(()=>{
    clearLEDs();
    for(let i = 0; i < ledsInFrameArray.length; i++){
      chart.data.datasets[0].backgroundColor[ledsInFrameArray[i]] = colorsInFrameArray[i];
      chart.update();
      if(ledsInFrameArray[i] < 9){
        ledsInFrameArray[i] = ledsInFrameArray[i] + 1;
      } else {
        ledsInFrameArray[i] = 0;
      }
    }
  }, timeInput);
}
function clearLEDs(){
  for (let i = 0; i < 10; i++){
    chart.data.datasets[0].backgroundColor[i] = 'rgba(0, 0, 0, 1)'
  }
  chart.update();
}
$(() => {
  drawChart();
  $('#time-input').bind('input propertychange', function() {
    timeInput = this.value
  })
})