const os = require('os')
var chart = null;

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
        'rgba(0, 0, 255, 1)',
        'rgba(255, 0, 0, 1)',
        'rgba(0, 255, 0, 1)',
        'rgba(0, 0, 255, 1)',
        'rgba(255, 0, 0, 1)',
        'rgba(0, 255, 0, 1)',
        'rgba(0, 0, 255, 1)',
        'rgba(255, 0, 0, 1)',
        'rgba(0, 255, 0, 1)',
        'rgba(0, 0, 255, 1)',
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
              //alert(label);
              drawPrompt(label);
          }
      }
    },
  });

  setInterval(updateDatasets, 1000);
}

function updateDatasets(){

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
      console.log('obtained result', result),
      
      //IN CASE OF MULTI-INPUT THE RESULT WILL BE IN THIS FORMAT:
      elem = inputArray[1];
      {
        console.log(elem)
      }
      
    } else {
      // in this case the window has been closed or the input are null
    }
  })
  .catch((error) => {
    console.log('uh-oh', error);
  })
}

$(() => {
  drawChart();
})