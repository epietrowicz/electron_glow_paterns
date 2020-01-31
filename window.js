const os = require('os')
var chart = null;
var timeInput;
var stepInput;
var timeInc;
var frames = 0;
var countLedsInFrame = 0;
var countLeds = 0;

//var numFrames = 3;
var ledsInFrameArray = [];
var colorsInFrameArray = [];
var ledFrameCountArray = [];
var frameArray = [];

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
        display: true,
        text: 'LED Lighting Configurations',
        fontColor: 'rgb(250, 250, 250)',
        fontSize: 16
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
/*
var i = 0;
function updateDatasets(){
  i++;
  chart.data.datasets[0].backgroundColor[i] = 'rgba(0, 255, 0, 1)'
  if(i > 10){
    i = 0;
  }
  chart.update();
}
*/

function updateDatasets(led, colorString){
  chart.data.datasets[0].backgroundColor[led] = colorString;
  ledsInFrameArray[countLeds] = led;
  colorsInFrameArray[countLeds] = colorString;
  chart.update();
  countLedsInFrame++;
  console.log('count leds in frame: ',countLedsInFrame);
  countLeds++;
  console.log('count leds total: ',countLeds);
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
    label: 'RGB Intensity',
    disableInitialLabel: false,
    alwaysOnTop: false, //allow the prompt window to stay over the main Window,
    type: 'multi-input',
    width: 580, // window width
    height: 350, // window height
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
          key: 'Blue',
          label: 'Blue',
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
      ]
  })
  .then((result) => {
    if (result) {
      //console.log('obtained result', result);
      var colorString = 'rgba(' + result.Red + ', ' + result.Blue + ', ' + result.Green + ', 1)';
      //console.log(colorString);
      var led = getLEDLocation(label);
      //console.log(led);

      updateDatasets(led, colorString);

      //ledArray[frames] = led;
      //colorStringArray[frames] = colorString;
    } else {
      //TODO: add indicator that you need all values
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

  timeInc = timeInput / stepInput;
  //console.log('Show started! Time Inc: ', timeInc);
  console.log('Number of frames: ', frames); 
  while(1){
    for(let i = 0; i < frames; i++){
      for (let j = 0; j < ledFrameCountArray[i]; j++){
        chart.data.datasets[0].backgroundColor[ledsInFrameArray[j]] = colorsInFrameArray[j];
        chart.update();
        //console.log('Total count of leds is', countLeds);
        console.log('number of leds in frame array!', ledsInFrameArray[j]);  
        //console.log('number of colors in frame array', colorsInFrameArray[j]);
      }
        //console.log('yep!');  
        sleep(timeInc);
        clearLEDs();
    }
  }
}

function nextFrame(){
  ledFrameCountArray[frames] = countLedsInFrame;
  countLedsInFrame = 0;
  frames++;
  clearLEDs();
  //console.log('Show started! time: ', timeInput, 'step: ', stepInput);
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
  $('#step-input').bind('input propertychange', function() {
    stepInput = this.value
  })
})