import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../../shared/services/report.service';
@Component({
  selector: 'app-trend-report',
  templateUrl: './trend-report.component.html',
  styleUrls: ['./trend-report.component.css']
})
export class TrendReportComponent implements OnInit {

  trends:any[];
  trends_jobs: any[];
  trenddetail:any[];  

  reports: any[];
  path:string;

public trendChartLabels = ['FAST', 'QTP', 'BROWSERSTACK', 'SELENIUM', 'WEBSERVICE', 'SONAR'];
public tableTrend = [
          { 
            scenario: "Build 1",
            data: ['p','f','n','p','p','f']
          },
          { 
            scenario: "Build 2",
            data: ['f','f','n','n','n','n']
          },
          { 
            scenario: "Build 3",
            data: ['f','f','f','n','p','n']
          },
          { 
            scenario: "Build 4",
            data: ['p','f','n','p','n','p']
          }
];

trendChartColors: Array<any> = [];
trendChartOptions: any = {
  scaleShowVerticalLines: false,
  animation: {
      duration: 0
  },
  responsive: true,
  legend: {
      display: true,
      position: 'top',
      labels: {
          fontColor: 'black',
          fontSize : 10,
          boxWidth : 10
      }
  },
  scales: {
    xAxes: [
      {
        display: true,
        stacked: true,
        ticks: {
          fontColor: 'black',
          fontSize: 10
        },
        barPercentage: 0.7
      }
    ],
    yAxes: [
      {
        display: true,
        labelString: 'Pass',
        stacked: true,
        gridLines: {
            zeroLineColor: '#4a4a4a',
            zeroLineWidth: 5,
            color : 'transparent'
        },
        ticks: {
          fontColor: 'black',
          fontSize: 0,
          beginAtZero: false
        }
      }
    ]
  },
  tooltips: {
    //mode: "label",
    callbacks: {
        label: function(tooltipItem, data) {
            var legend = new Array();
            var status = '';
            if(tooltipItem.yLabel > 0){
              legend.push(
                data.datasets[tooltipItem.datasetIndex].label+' -- Passed'
              )
            }else if (tooltipItem.yLabel < 0){
              legend.push(
                data.datasets[tooltipItem.datasetIndex].label+' -- Failed'
              )
            }else {
              legend.push(
                data.datasets[tooltipItem.datasetIndex].label+' -- No Run'
              ) 
            }
            return legend;
        }
    }
  }
};
trendChartLabels2: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
trendChartType = 'line';
trendChartLegend = true;
trendChartData: any[] = [
  {
    data: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    lineTension: 0,
    label: 'BUILD'
  },
  {
    data: [2, 2, -2, -2, -2, 2, 2, 2, 2, 2],
    lineTension: 0,
    label: 'FAST'
  },
  {
    data: [2, 2, 2, 2, 2, -2, -2, -2, 2, 2],
    lineTension: 0,
    label: 'BROWSERSTACK'
  },
  {
    data: [2, 2, -2, 2, 2, 2, 2, -2, 2, 2],
    lineTension: 0,
    label: 'PDF'
  },
  {
    data: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    lineTension: 0,
    label: 'JMETER'
  },
  {
    data: [2, 2, 2, 2, 2, -2, 2, 2, -2, 2],
    lineTension: 0,
    label: 'WEBSERVICE'
  }
];

  constructor(private report: ReportService) { }

  ngOnInit() {
    this.report.getBuildHistoryData().subscribe( data => {
      this.reports = data;      
      console.log(">>>>getBuildHistoryData");
      console.log(data);
      console.log(">>>>getBuildHistoryData");
    });

    this.report.getChartcolour().subscribe( data => {
      console.log("lineChartColors");      
      console.log(data.linchartColors); 
    });

    this.report.getTrendData1().subscribe( data => {
      // console.log("report====="+ JSON.stringify(data));
      this.trends = data.Viacom_job; 
      let buildlength=data.Viacom_job.length;
      console.log(buildlength);
      for(let i=0;i<buildlength;i++)
      {
        // this.lineChartLabels.push('#'+(i+1));
      }
      // this.lineChartLabels=data.Viacom_job.Build_no;
      this.trends_jobs=data.Viacom_jobkeys;
    });
  }

  // getDetailedGraph(trendjob, terndjobkey){
  
  //   // this.lineChartData=[];
  //   console.log(JSON.stringify(this.lineChartData));
  //   console.log("this is trend data");
  //   console.log(JSON.stringify(trendjob.graph_detail));
  //    this.lineChartData=trendjob.graph_detail;
  //     // this.lineChartData=trendjob;
  //   console.log("dataaaaaaaaaaaa");
  //   console.log(JSON.stringify(this.lineChartData));
  //   // reportdetailsdiv
  //   document.getElementById(terndjobkey).style.display='block';

  // }


  getDetailedGraph(trendjob, terndjobkey){
     document.getElementById('graphpopup').style.display='block';
    }
  
  viewGraph(graphkey){
      var x = document.getElementById(graphkey);
      if (x.style.display === 'none') {
        x.style.display = 'block';
      } else {
        x.style.display = 'none';
      } 
    }

  closeGraph(terndjobkey){
    document.getElementById(terndjobkey).style.display='none';
    // this.lineChartData=[];
     
  }

}

