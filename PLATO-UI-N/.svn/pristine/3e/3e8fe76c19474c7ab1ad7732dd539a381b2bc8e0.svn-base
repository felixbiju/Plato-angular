import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare var methodWordCloud: any;
declare var classWordCloud: any;
declare var casesWordCloud: any;
declare var clickedData: any;
declare var resetClickData: any;
declare var createTreeMap: any;

@Component({
  selector: 'app-testright',
  templateUrl: './testright.component.html',
  styleUrls: ['./testright.component.css']
})
export class TestrightComponent implements OnInit {

  PopupData = {
    title: "",
    type: ""
  };
  releasesName = [];
  scenarioName = [];
  testCases = [];
  testClasses = [];
  testMethods = [];

  classesCountPerScenario = [];
  defectsCountPerScenario = [];

  scenarioCountPerRelease = [];
  testcaseCountPerRelease = [];
  classesCountPerRelease = [];
  defectCountPerRelease = [];
  priority: any = [
    "#ff4444", //red
    "#ffbb33", //yello
    "#00C851", //green
    "#33b5e5" //blue
  ];

  public popupChartType: string = "bar";
  public popupChartLegend: boolean = true;

  public classChartLabels: string[] = [
    "APBNK_REL-1.0",
    "APBNK_REL-2.0",
    "APBNK_REL-3.0",
    "APBNK_REL-4.0",
    "APBNK_REL-5.0",
    "APBNK_REL-6.0",
    "APBNK_REL-7.0",
    "APBNK_REL-8.0"
  ];
  public classChartData: any[] = [

    {
      data: [2, 4, 5, 6, 4, 3, 5, 5],
      label: "Impacted TestCase"
    },
    {
      data: [5, 4, 6, 4, 5, 6, 4, 3],
      label: "Methods"
    },
    {
      data: [2, 4, 5, 6, 4, 5, 3, 3],
      label: "No. of Commits"
    },
    {
      data: [3, 4, 5, 6, 4, 2, 5, 5],
      label: "No. of Developers"
    }
  ];

  public classChartDataDev:any[] = [
    {
      data: [3, 4, 5, 3, 3 ,3, 6,	5],
      label: 'Navneet',
      type: 'bar',
    },
    {
      data: [2, 1, 5, 0, 5, 3, 3, 5],
      label: 'Harsh',
      type: 'bar'
    },
    {
      data: [2, 5, 3, 3, 5, 0, 6,	3],
      label: 'Rajesh',
      type: 'bar'
    },
    {
      data: [2, 5,	3,	3, 1, 2, 3, 2],
      label: 'Shivendra',
      type: 'bar'
    }
  ];

  public casesChartLabels: string[] = [
    "APBNK_REL-1.0",
    "APBNK_REL-2.0",
    "APBNK_REL-3.0",
    "APBNK_REL-4.0",
    "APBNK_REL-5.0",
    "APBNK_REL-6.0",
    "APBNK_REL-7.0",
    "APBNK_REL-8.0"
  ];
  public casesChartData: any[] = [
   {
      data: [4, 2, 1, 5, 3, 2, 1, 3],
      label: "Impacted Classes"
    },
    {
      data: [3, 2, 3, 2, 1, 3, 3, 5],
      label: "Impacted Methods"
    },
    {
      data: [3, 2, 1, 3, 4, 2, 1, 3],
      label: "No. of Commits"
    },
    {
      data: [4, 4, 3, 3, 2, 1, 3, 2],
      label: "No. of Developers"
    }
  ];

  public methodsChartLabels: string[] = [
    "APBNK_REL-1.0",
    "APBNK_REL-2.0",
    "APBNK_REL-3.0",
    "APBNK_REL-4.0",
    "APBNK_REL-5.0",
    "APBNK_REL-6.0",
    "APBNK_REL-7.0",
    "APBNK_REL-8.0"
  ];
  public methodsChartData: any[] = [
    {
      data: [4, 1, 5, 3, 2, 2, 1, 5],
      label: "Impacted TestCase"
    },
    {
      data: [3, 2, 3, 1, 5, 3, 2, 5],
      label: "Methods"
    },
    {
      data: [4, 2, 1, 3, 1, 5, 3, 2],
      label: "No. of Commits"
    },
    {
      data: [4, 1, 5, 3, 2, 4, 3, 2],
      label: "No. of Developers"
    }
  ];

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    stacked: false,
    scales: {
      xAxes: [
        {
          display: true
        }
      ],
      yAxes: [
        {
          type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
          display: true,
          position: "left",
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  };

  public barChartColors: Array<any> = [
    {
      backgroundColor: "rgba(41, 182, 246, 0.8)",
      borderColor: "rgba(41, 182, 246,1)"
    },
    {
      backgroundColor: "rgba(92, 107, 192,0.8)",
      borderColor: "rgba(92, 107, 192,1)"
    },
    {
      backgroundColor: "rgba(103, 58, 183,0.7)",
      borderColor: "rgba(103, 58, 183,1.0)"
    },
    {
      backgroundColor: "rgba(0, 184, 212,1.0)",
      borderColor: "rgba(0, 184, 212,1.0)"
    },
    {
      backgroundColor: "rgba(0, 191, 165,1.0)",
      borderColor: "rgba(0, 191, 165,1.0)"
    }
  ];

  releaseVSscenarios: Array<any> = [
    {
      data: [],
      label: ""
    }
  ];

  releaseVSscenariosLabels: Array<any> = [["Rel 1"]];

  scenarioVSclasses: Array<any> = [
    {
      data: [],
      label: ""
    }
  ];

  scenarioVSclassesLabels: Array<any> = [["Rel 1"]];

  // lineChart
  lineChartData: Array<any> = [
    {
      data: [86, 71, 107, 100, 60, 85, 96, 100, 93, 100, 96, 91, 68, 54],

      label: "Test Case"
    }
  ];

  lineChartLabels: Array<any> = [
    ["Release 1"],
    ["Release 2"],
    ["Release 3"],
    ["Release 4"],
    ["Release 5"],
    ["Release 6"],
    ["Release 7"],
    ["Release 8"],
    ["Release 9"],
    ["Release 10"]
  ];

  public RELvsSCElineChartOptions: any = {
    responsive: true,
    stacked: false,
    scales: {
      xAxes: [
        {
          display: true
        }
      ],
      yAxes: [
        {
          type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
          display: true,
          position: "left"
        }
      ]
    }
  };

  public lineChartOptions: any = {
    responsive: true,
    stacked: false,
    scales: {
      xAxes: [
        {
          display: true
        }
      ],
      yAxes: [
        {
            scaleLabel: {
                display: true,
                labelString: 'No. of Commits'
            }
        }
      ]
    }
  };
  public PopupChartColors: Array<any> = [
    {
      // dark greyrgb(92, 107, 192)rgb(0, 188, 212)
      backgroundColor: "rgba(92, 107, 192,0.8)",
      borderColor: "rgba(92, 107, 192,1)",
      pointBackgroundColor: "rgba(92, 107, 192,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "rgba(92, 107, 192,1)",
      pointHoverBorderColor: "rgba(92, 107, 192,1)"
    },
    {
      // greyrgb(66, 165, 245)
      backgroundColor: "rgba(0, 188, 212,0.8)",
      borderColor: "rgba(0, 188, 212,1)",
      pointBackgroundColor: "rgba(0, 188, 212,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "rgba(0, 188, 212,0.8)",
      pointHoverBorderColor: "rgba(0, 188, 212,0.8)"
    },
    {
      // dark greyrgb(255, 112, 67)
      backgroundColor: "rgba(255, 112, 67,0.8)",
      borderColor: "rgba(255, 112, 67,1)",
      pointBackgroundColor: "rgba(255, 112, 67,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "rgba(255, 112, 67,1)",
      pointHoverBorderColor: "rgba(255, 112, 67,1)"
    },
    {
      // greyrgb(156, 204, 101)
      backgroundColor: "rgba(156, 204, 101,0.8)",
      borderColor: "rgba(156, 204, 101,1)",
      pointBackgroundColor: "rgba(156, 204, 101,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "rgba(156, 204, 101,0.8)",
      pointHoverBorderColor: "rgba(156, 204, 101,0.8)"
    },
    {
      // dark greyrgb(92, 107, 192)rgb(0, 188, 212)
      backgroundColor: "rgba(92, 107, 192,0.8)",
      borderColor: "rgba(92, 107, 192,1)",
      pointBackgroundColor: "rgba(92, 107, 192,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "rgba(92, 107, 192,1)",
      pointHoverBorderColor: "rgba(92, 107, 192,1)"
    }
  ];
  public lineChartColors: Array<any> = [
    {
      // greyrgb(66, 165, 245)
      backgroundColor: "rgba(0, 188, 212,0)",
      borderColor: "rgba(0, 188, 212,1)",
      pointBackgroundColor: "rgba(0, 188, 212,0)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "rgba(0, 188, 212,0.8)",
      pointHoverBorderColor: "rgba(0, 188, 212,0.8)"
    },
    {
      // dark greyrgb(255, 112, 67)
      backgroundColor: "rgba(255, 112, 67,0)",
      borderColor: "rgba(255, 112, 67,1)",
      pointBackgroundColor: "rgba(255, 112, 67,0)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "rgba(255, 112, 67,1)",
      pointHoverBorderColor: "rgba(255, 112, 67,1)"
    },
    {
      // greyrgb(156, 204, 101)
      backgroundColor: "rgba(156, 204, 101,0)",
      borderColor: "rgba(156, 204, 101,1)",
      pointBackgroundColor: "rgba(156, 204, 101,0)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "rgba(156, 204, 101,0.8)",
      pointHoverBorderColor: "rgba(156, 204, 101,0.8)"
    },
    {
      // dark greyrgb(92, 107, 192)rgb(0, 188, 212)
      backgroundColor: "rgba(92, 107, 192,0)",
      borderColor: "rgba(92, 107, 192,1)",
      pointBackgroundColor: "rgba(92, 107, 192,0)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "rgba(92, 107, 192,1)",
      pointHoverBorderColor: "rgba(92, 107, 192,1)"
    }
  ];
  public lineChartColors1: Array<any> = [
    {
      // dark greyrgb(92, 107, 192)rgb(0, 188, 212)
      backgroundColor: "transparent",
      borderColor: "transparent",
      pointBackgroundColor: "transparent",
      pointBorderColor: "transparent",
      pointHoverBackgroundColor: "transparent",
      pointHoverBorderColor: "transparent"
    },
    {
      // greyrgb(66, 165, 245)
      backgroundColor: "rgba(0, 188, 212,0)",
      borderColor: "rgba(0, 188, 212,1)",
      pointBackgroundColor: "rgba(0, 188, 212,0)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "rgba(0, 188, 212,0.8)",
      pointHoverBorderColor: "rgba(0, 188, 212,0.8)"
    },
    {
      // dark greyrgb(255, 112, 67)
      backgroundColor: "rgba(255, 112, 67,0)",
      borderColor: "rgba(255, 112, 67,1)",
      pointBackgroundColor: "rgba(255, 112, 67,0)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "rgba(255, 112, 67,1)",
      pointHoverBorderColor: "rgba(255, 112, 67,1)"
    },
    {
      // greyrgb(156, 204, 101)
      backgroundColor: "rgba(156, 204, 101,0)",
      borderColor: "rgba(156, 204, 101,1)",
      pointBackgroundColor: "rgba(156, 204, 101,0)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "rgba(156, 204, 101,0.8)",
      pointHoverBorderColor: "rgba(156, 204, 101,0.8)"
    },
    {
      // dark greyrgb(92, 107, 192)rgb(0, 188, 212)
      backgroundColor: "rgba(92, 107, 192,0)",
      borderColor: "rgba(92, 107, 192,1)",
      pointBackgroundColor: "rgba(92, 107, 192,0)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "rgba(92, 107, 192,1)",
      pointHoverBorderColor: "rgba(92, 107, 192,1)"
    }
  ];
  public lineChartLegend: boolean = true;
  public lineChartType: string = "line";

  popupChartData: Array<any> = [
    {
      data: [2, 4, 5, 6],
      lineTension: 0,
      label: "Test Case"
    }
  ];

  radarChartLabel: Array<any> = [
    ["Release 1"],
    ["Release 2"],
    ["Release 3"],
    ["Release 4"]
  ];

  completeData: any;
  allScenarios: Array<any> = [];
  allClasses: Array<any> = [];

  constructor(private httpService: HttpClient) { }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  ngOnInit() {
    this.httpService
    .get("../../assets/localDB/DataSet/newFormat.json")
    .subscribe(data => {
      // this.releaseVSscenarios = [];
      let arr = [];
      let cases = [];
      let classes = [];
      let num = 3;
      this.completeData = data;

      // this.completeData.forEach(release => {
      //   this.releasesName.push(release.name);
      //   this.scenarioCountPerRelease.push(release.test_scenarios.length);
      //   release.test_scenarios.forEach(scenario => {
      //     scenario.testcases.forEach(testcase => {
      //       this.testCases.push(testcase.name);
      //       testcase.stepDetails.forEach(step => {
      //         step.server_repo.action.class.forEach(singleClass => {
      //           this.testClasses.push(singleClass.name);
      //           singleClass.methods.array.forEach(method => {
      //             this.testMethods.push(method);
      //           });
      //         });
      //       });
      //     });
      //   });
      // });

      console.log(this.completeData);
      this.completeData.forEach(release => {
        this.releasesName.push(release.name);
        this.scenarioCountPerRelease.push(release.test_scenarios.length);
        let totalDefect = 0;
        let totalClasses = 0;
        release.test_scenarios.forEach(scenario => {
          let scenarioDefect = 0;
          this.testcaseCountPerRelease.push(scenario.testcases.length);
          this.scenarioName.push(scenario.name);
          const obj = {
            text: scenario.name,
            weight: this.getRandomInt(2, 6),
            color: this.priority[this.getRandomInt(0, 3)]
          };

          scenario.testcases.forEach(testcase => {
            this.testCases.push(testcase.name);
            totalDefect = totalDefect + testcase.defects;
            scenarioDefect = scenarioDefect + testcase.defects;
            const obj = {
              text: testcase.name,
              weight: this.getRandomInt(0, 100),
              color: this.priority[this.getRandomInt(0, 3)]
            };

            testcase.stepDetails.forEach(step => {
              this.classesCountPerScenario.push(
                step.server_repo.action.class.length
              );

              totalClasses =
                totalClasses + step.server_repo.action.class.length;

              step.server_repo.action.class.forEach(singleClass => {
                this.testClasses.push(singleClass.name);
                this.testMethods.push(singleClass.methods);

                const obj = {
                  text: singleClass.name,
                  weight: 1,
                  color: this.getRandomInt(0, 3)
                };

                classes.push(obj);

                this.allClasses.push(singleClass.name);
              });
            });

            cases.push(obj);
          });
          arr.push(obj);
          num = num + 1;
          this.defectsCountPerScenario.push(scenarioDefect);
        });
        this.defectCountPerRelease.push(totalDefect);
        this.classesCountPerRelease.push(totalClasses);
      });

      let case_string: string = this.testCases.join(" ");
      let class_string: string = this.testClasses.join(" ");
      let method_string: string = this.testMethods.join(" ");

      methodWordCloud(method_string);
      classWordCloud(class_string);
      casesWordCloud(case_string);

      const obj1 = {
        text: "create.html",
        weight: 10,
        color: this.priority[this.getRandomInt(0, 3)]
      };
      const obj2 = {
        text: "DBIntializer.java",
        weight: 2,
        color: this.priority[this.getRandomInt(0, 3)]
      };
      const obj3 = {
        text: "VerifyLogin.jsp",
        weight: 2,
        color: this.priority[this.getRandomInt(0, 3)]
      };

      classes.push(obj1);
      classes.push(obj2);
      classes.push(obj3);
      this.releaseVSscenariosLabels = this.releasesName;

      this.scenarioVSclassesLabels = this.scenarioName;

      const objClassesScenario = {
        data: this.classesCountPerScenario,

        label: "Classes"
      };
      const objDefectScenario = {
        data: this.defectsCountPerScenario,

        label: "Defects"
      };
      this.scenarioVSclasses.push(objClassesScenario);
      this.scenarioVSclasses.push(objDefectScenario);
      // this.releaseVSscenarios = [];
      // this.releaseVSscenariosLabels = [];
      // let releasevsscenarioData = [];
      const objScenario = {
        // data: this.scenarioCountPerRelease,
        data: [6, 8, 5, 15, 9, 6, 4, 20],
        label: "Test Scenarios"
      };
      this.releaseVSscenarios.push(objScenario);
      const objTestcase = {
        // data: this.testcaseCountPerRelease,
        data: [33, 50, 30, 50, 60, 30, 25, 80],
        label: "Test cases"
      };
      this.releaseVSscenarios.push(objTestcase);
      const objClass = {
        data: this.classesCountPerRelease,

        label: "Classes"
      };
      this.releaseVSscenarios.push(objClass);
      const objDefect = {
        // data: this.defectCountPerRelease
        data: [20, 15, 10, 25, 22, 12, 10, 30],
        label: "Total Defects"
      };
      this.releaseVSscenarios.push(objDefect);
      // this.releaseVSscenarios = releasevsscenarioData;

      let count = 0;
    });

  this.httpService
    .get("../../assets/localDB/DataSet/treeMap.json")
    .subscribe(data => {
      createTreeMap(data);
    });
  }

  scenarioAnalyser(scenario: any) {
    this.completeData.test_scenarios.include(scenario);
  }

  togglePopup() {
    var x = document.getElementById("popup");
    var loader = document.getElementById("loader");
    var popup = document.getElementById("mainPopup");

    if (x.style.display === "block") {
      x.style.display = "none";
      loader.style.display = "block";
      popup.style.display = "none";
    } else if (x.style.display === "none") {
      x.style.display = "block";

      setTimeout(() => {
        loader.style.display = "none";
        popup.style.display = "block";
      }, 1000);
    }
  }
}
