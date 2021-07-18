import React, {useState, Fragment} from "react";
import ReactApexChart from "react-apexcharts";

export default function ApexChart({c1, c2}){

  // const relDiff = (a, b) => {
  //   return  100 * ( ( a - b ) / ( (a+b)/2 ) );
  //  }

    let com1 = {
      name: c1.data[0].Comune,
      istat: c1.data[0].CODISTAT,
      Vaccinati: c1.data.map(({ Vaccinati }) => parseInt(Vaccinati)),
      totVax: c1.data.map(({ Vaccinati }) => parseInt(Vaccinati)).reduce((a, b) => a + b, 0),
      Target: c1.data.map(({ Target }) => parseInt(Target)),
      totTarget: c1.data.map(({ Target }) => parseInt(Target)).reduce((a, b) => a + b, 0),
    };
    let com2 = {
      name: c2.data[0].Comune,
      istat: c2.data[0].CODISTAT,
      Vaccinati: c2.data.map(({ Vaccinati }) => parseInt(Vaccinati)),
      totVax: c2.data.map(({ Vaccinati }) => parseInt(Vaccinati)).reduce((a, b) => a + b, 0),
      Target: c2.data.map(({ Target }) => parseInt(Target)),
      totTarget: c2.data.map(({ Target }) => parseInt(Target)).reduce((a, b) => a + b, 0),
    };

    let com1VaxPercent = [];
    let com2VaxPercent = [];

    //Percentuale vaccinati
    for (let i = 0; i<com1.Vaccinati.length; i++) {
      com1VaxPercent.push((((com1.Vaccinati[i] / com1.Target[i]) * 100).toFixed(2))*-1);
      com2VaxPercent.push(((com2.Vaccinati[i] / com2.Target[i]) * 100).toFixed(2));
    }
      com1VaxPercent.push((((com1.totVax / com1.totTarget) * 100).toFixed(2))*-1);
      com2VaxPercent.push(((com2.totVax / com2.totTarget) * 100).toFixed(2));

    // let diff = [];
    // let diff2 = [];

    // for(let i = 0; i < com1VaxPercent.length; i++){
    //   diff[i] = (com1VaxPercent[i] - com2VaxPercent[i]) * -10;
    // }
    // for(let i = 0; i < com1VaxPercent.length; i++){
    //   diff2[i] = com2VaxPercent[i] - com1VaxPercent[i];
    // }
    var series = [
      {
          name: com1.name,
          data: com1VaxPercent
      },
      {
          name: com2.name,
          data: com2VaxPercent
      }
    ]

    const [options] = useState({
        chart: {
          type: 'bar',
          height: 440,
          stacked: true
        },
        // colors: ['#00FF00', '#00FF00'],
        plotOptions: {
          bar: {
            horizontal: true,
            barHeight: '100%',
          },
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          width: 1,
          colors: ["#fff"]
        },
        
        grid: {
          xaxis: {
            lines: {
              show: true
            }
          },
          yaxis: {
            lines: {
              show: true
            }
          }
        },
        yaxis: {
          min: -100,
          max: 100,
        },
        tooltip: {
          shared: false,
          x: {
            formatter: function (val) {
              return val
            }
          },
          y: {
            formatter: function (val) {
              return Math.abs(val) + "%"
            }
          }
        },
        xaxis: {
          categories: [
              '12-19',
              '20-29',
              '30-39',
              '40-49',
              '50-59',
              '60-69',
              '70-79',
              '>80',
              'Totali'
          ],
          labels: {
            formatter: function (val) {
              return Math.abs(Math.round(val)) + "%"
            }
          }
        },
      })

      return (
        <Fragment>
        <div id="chart">
          <ReactApexChart options={options} series={series} type="bar" height={440} />
        </div>
        </Fragment>
      )
}