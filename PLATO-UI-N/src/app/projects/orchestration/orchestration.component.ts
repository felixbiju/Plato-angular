import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MessageService } from 'primeng/components/common/messageservice';
import { ModuleService } from '../../shared/services/module.service';
import { LoaderService } from '../../shared/services/loader.service';
import { ToolService } from '../../shared/services/tools.service';
import { NodeService } from '../../shared/services/node.service';
import { PermissionService } from '../../shared/services/permissions.service';
import { Tools } from '../../shared/model/tools';
import { CheckPoints } from '../../shared/model/checkPoint';
import { isUndefined } from 'util';
import { AppConfig } from '../../app.config';

@Component({
  selector: 'app-orchestration',
  templateUrl: './orchestration.component.html',
  styleUrls: ['./orchestration.component.css']
})
export class OrchestrationComponent implements OnInit, OnDestroy {

  //
  isTestRightChecked = true;
  testRightUrl = 'http://172.25.14.111:8080/testright';

  allAvailableJobs: Tools[] = [];
  savedToolConfig: Tools[] = [];
  oldSavedConfigs: Tools[] = [];
  updateConfigs: any[] = [];
  deletedToolConfig: any[] = [];
  toolOrder: any[] = [];
  checkPoints: any[] = [];
  newTools: Tools[] = [];
  node_list: any[] = [];
  credential_list: any[] = [];
  subjobnames: any[];
  showSvn = false;
  showGit = false;
  svnUrl = '';
  svnUserName = '';
  svnPassword = '';
  displayname = '';
  availableTools: Tools[] = [];
  selectedTools: Tools[] = [];
  draggedTool: Tools;
  checkpoints: any[] = [];
  savedcheckpoints: any[] = [];
  locallySavedCheckPoints: any[] = [];
  formattedCheckPointArray: any[] = [];
  selectedCheckPointModuleName = '';
  showCheckPointsDetail = false;
  subJobCheckPoints: any[] = [];
  checkedCheckPointArray: any[] = [];
  deletedSubjobsName: any[] = [];
  isAllChecked: any = [];
  buildToolPresent = false;
  isSonarChecked: boolean;
  isDuckcreekChecked: boolean;
  sonarUrl: string;
  sonarKey: string;
  unitTesting: string;
  duckcreekUrl: string;
  Reportpath: string;
  inputParameter: string;
  module_name: string;
  module_description: string;
  jenkinsConfig: string;
  hideCardName: string;
  filterText: string;
  screenPermission: any[];
  postbuildbefore: any[];
  postbuildoptions: any[] = [];
  modifySubJobs: any[] = [];
  showsubjob: string;
   file_pattern: any;
  report_pattern: string;
  myControl = new FormControl();
  postBuildOpts = [
    'trigger only if build is stable',
    'trigger even if build is unstable',
    'trigger even if build fails'
  ];

  gitBrowserTypes = ['(auto)','GitLab'];

  constructor(private message: MessageService, private moduleService: ModuleService,
    private loader: LoaderService, private tool: ToolService, private _node: NodeService,
    private _permissions: PermissionService, private config: AppConfig) { }

  ngOnInit() {
    localStorage.setItem('testrightUrl', this.testRightUrl);
    this.getPermissionByRole();
    this.getSubjobNames();
    this.allAvailableJobs = this.selectedTools.concat(this.savedToolConfig);

    if (localStorage.getItem('newTools') !== null) {
      this.selectedTools = JSON.parse(localStorage.getItem('newTools'));
    } else {
      this.selectedTools = [];
    }

    this.moduleService.currentModuleId.subscribe(data => {
      this.getModuleSubJobsConfig();
      this.getToolConfig();
      this.updateConfigs = [];
      this.newTools = [];
      this.deletedToolConfig = [];
      this.deletedSubjobsName = [];
      this.selectedTools = [];
      this.isSonarChecked = false;
      this.isDuckcreekChecked = false;
      this.sonarUrl = '';
      this.sonarKey = '';
      this.unitTesting = '';
      this.duckcreekUrl = '';
      this.Reportpath = '';
      this.inputParameter = '';

      localStorage.removeItem('toolForDelete');
      this.module_name = localStorage.getItem('module_name');
      this.module_description = localStorage.getItem('module_description');
      this.jenkinsConfig =  this.config.getConfig('jenkinsUrl') + localStorage.getItem('module_name') + '/configure';
    });

    this.moduleService.currentConfig.subscribe(data => {
      if (data === true) {
        console.log('orchestration page config changed >> ' + data);
        this.changeInConfig();
      } else {
        console.log('orchestration page config changed >> ' + data);
        this.cancelAllChanges();
      }
    });

    this._node.getAllNode().subscribe(data => {
      this.node_list = data;
    },
      error => {
        console.error(error);
      });

    this._node.getAllCredentials().subscribe(data => {
      this.credential_list = data;
      console.log('credentials >>>>>> ');
      console.log(this.credential_list);


    },
    error => {
      console.error(error);
    });
  }

  getPermissionByRole() {
    this._permissions.currentRole.subscribe(role => {
      this._permissions.getAllPermissionsByRole(role).subscribe(permissions => {
        if (permissions.permissionData === undefined) {
          console.log('undefined');
          this.screenPermission = [];
        } else {
          permissions.permissionData.forEach(module => {
            if (module.moduleName === 'Project Module') {
              module.screens.forEach(screen => {
                if (screen.screenName === 'Build Configuration Screen') {
                  this.screenPermission = screen.components;
                  console.log(this.screenPermission);
                }
              });
            }
          });
        }
      });
    });
  }

  ngOnDestroy() {
    this.moduleService.changeConfig(false);
    this.moduleService.configChanged = false;
    this.buildToolPresent = false;
  }

  getModuleSubJobsConfig() {
    const moduleConfigUrl = this.config.getConfig('baseUrl') + 'ModulePage/moduleConfig/' + localStorage.getItem('module_name');
    console.log('subjob config url :: ' + moduleConfigUrl);
    this.moduleService.getSubJobs().subscribe(data => {
      this.savedToolConfig = [];
      data.subModules.forEach(element => {
        if (element.tool_name.toLowerCase() === 'build') {
          console.log('build tool find......');
          this.buildToolPresent = true;
          if ((this.getURL(element.report_path, 1) === 'undefined') && (this.getURL(element.report_path, 7) === 'undefined')) {
            this.isSonarChecked = false;
            this.isDuckcreekChecked = false;
          } else {
            this.isSonarChecked = this.getURL(element.report_path, 1);
            this.isDuckcreekChecked = this.getURL(element.report_path, 7);
          }
          this.sonarUrl = this.getURL(element.report_path, 3);
          this.sonarKey = this.getURL(element.report_path, 5);
          this.unitTesting = this.getURL(element.command_to_execute, 1);
          this.duckcreekUrl = this.getURL(element.report_path, 9);
          this.Reportpath = this.getURL(element.report_path, 11);
          this.inputParameter = this.getURL(element.report_path, 13);
          this.module_name = element.subjob_name;
          this.module_description = localStorage.getItem('module_description');
          this.jenkinsConfig = this.getURL(element.command_to_execute, 3);
        } else if (element.postbuild_subjob !== undefined && !(element.postbuild_subjob.length > 0)) {
          element.postBuildTo = [];
          console.log('No post jobs in >>> ' + element.subjob_name);
        } else if (element.postbuild_subjob !== undefined && element.postbuild_subjob.length > 0) {
          element.postBuildTo = element.postbuild_subjob.split(',');
          console.log(element.subjob_name + ' contains post jobs.');
        }
      });
      this.savedToolConfig = data.subModules;
      data.subModules.forEach(subModule => {
        if (subModule.subModuleParametersList.length > 0) {
          subModule.subModuleParametersList.forEach(parameter => {
            if (parameter.key === 'repo_manager') {
              this.savedToolConfig.forEach(tool => {
                if (tool.subModuleId === subModule.subModuleId) {
                  tool.repo_manager = parameter.value;
                }
              });
            }
            if (parameter.key === 'repo_credentials') {
              this.savedToolConfig.forEach(tool => {
                if (tool.subModuleId === subModule.subModuleId) {
                  tool.repo_credentials = parameter.value;
                }
              });
            }
            if (parameter.key === 'repo_path') {
              this.savedToolConfig.forEach(tool => {
                if (tool.subModuleId === subModule.subModuleId) {
                  tool.repo_path = parameter.value;
                }
              });
            }
            if (parameter.key === 'branch_name') {
              this.savedToolConfig.forEach(tool => {
                if (tool.subModuleId === subModule.subModuleId) {
                  tool.branch_name = parameter.value;
                }
              });
            }
            if (parameter.key === 'git_browser_type') {
              this.savedToolConfig.forEach(tool => {
                if (tool.subModuleId === subModule.subModuleId) {
                  tool.git_browser_type = parameter.value;
                }
              });
            }
            if (parameter.key === 'browser_url') {
              this.savedToolConfig.forEach(tool => {
                if (tool.subModuleId === subModule.subModuleId) {
                  tool.browser_url = parameter.value;
                }
              });
            }
            if (parameter.key === 'browser_version') {
              this.savedToolConfig.forEach(tool => {
                if (tool.subModuleId === subModule.subModuleId) {
                  tool.browser_version = parameter.value;
                }
              });
            }
          });
        }
      });
    },
    error => {
      this.savedToolConfig = [];
      this.buildToolPresent = false;
      console.error(error);
    });
  }

  getToolConfig() {
    this.tool.getModulePageToolList().subscribe(data => {
      this.availableTools = data;
    },
      error => {
        this.availableTools = [];
        console.error(error);
      });
  }

  createSubJobs(newTools: any[]) {
    this.toolOrder = [];
    console.log('creating tools');

    if (newTools.length > 0) {
      this.loader.changeLoaderStatus(true);
      localStorage.setItem('newTools', JSON.stringify(newTools));
      let job_order = 1;
      if (this.savedToolConfig.length > 0) {
        job_order = this.savedToolConfig.length + 1;
      }
      // console.log("111");
      
      for (let i = 0; i < newTools.length; i++) {
        // console.log("222");
        newTools[i].subjob_description = newTools[i].subjob_name + ' description';
        newTools[i].order_number = job_order;
        this.file_pattern = this.Reportpath.split(',');
        this.Reportpath=this.file_pattern[0];
        console.log("LENGTH"+this.file_pattern.length);
        if(this.file_pattern.length>1){
          for(let j = 1; j < this.file_pattern.length; ++j){
            newTools[i].report_pattern += this.file_pattern[j] + ',';
          }
          newTools[i].report_pattern.substring(0, newTools[i].report_pattern.length-1);
          console.log("REPORT_PATTERN >>> "+newTools[i].report_pattern);          
        }

        if (newTools[i].tool_name.toLowerCase() === 'build') {
          localStorage.setItem('testrightUrl', this.testRightUrl)
          const buildToolFormat = {
            order_number: 0,
            category_id: newTools[i].category_id,
            tool_id: newTools[i].tool_id,
            tool_name: newTools[i].tool_name,
            subjob_name: localStorage.getItem('module_name'),
            subjob_description: localStorage.getItem('module_description'),
            node_id: newTools[i].node_id,
            node_name: newTools[i].node_name,
            command_to_execute: 'unitTesting,' + this.unitTesting + ',' + 'jenkinsConfig,' + this.jenkinsConfig,
            report_path: 'isSonarChecked,' + this.isSonarChecked + ',' + 'sonarUrl,' + this.sonarUrl + ',' +
            'sonarKey,' + this.sonarKey + ',' + 'isDuckcreekChecked,' + this.isDuckcreekChecked + ',' +
            'duckcreekUrl,' + this.duckcreekUrl + ',' + 'Reportpath,' + this.Reportpath + ',' +
            'inputParameter,' + this.inputParameter
          };
          newTools[i] = buildToolFormat;
        }

        if (newTools[i].tool_name === 'maven' || newTools[i].tool_name === 'svn') {
          const mavenToolFormat = {
            subjob_name: newTools[i].subjob_name,
            node_name: newTools[i].node_name,
            command_to_execute: newTools[i].command_to_execute,
            report_path: 'svn,' + newTools[i].svnUrl + ',' + localStorage.getItem('credential_id'),
            category_id: newTools[i].category_id,
            node_id: newTools[i].node_id,
            tool_id: newTools[i].tool_id,
            tool_name: newTools[i].tool_name,
            subjob_description: 'maven',
            order_number: job_order,
          };
          newTools[i] = mavenToolFormat;
        }

        //jyoti
        if (newTools[i].tool_name === 'sonar') {
          const sonarToolFormat = {
            subjob_name: newTools[i].subjob_name,
            node_name: newTools[i].node_name,
            command_to_execute: newTools[i].command_to_execute,
            report_path: 'svn,' + newTools[i].svnUrl + ',' + localStorage.getItem("credential_id") + ',' + newTools[i].report_path,
            category_id: newTools[i].category_id,
            node_id: newTools[i].node_id,
            tool_id: newTools[i].tool_id,
            tool_name: newTools[i].tool_name,
            subjob_description: 'sonar',
            order_number: job_order,
          };
          newTools[i] = sonarToolFormat;
        } //jyoti

        let repo = [];
        // repo: any[];
        const obj1 = {
          key: 'repo_manager',
          value: newTools[i].repo_manager
        }
        if(obj1.value!==null && obj1.value!=='' && obj1.value!==undefined && obj1.value!=="") repo.push(obj1);

        const obj2 = {
          key: 'repo_path',
          value: newTools[i].repo_path
        }
        repo.push(obj2);

        const obj3 = {
          key: 'repo_credentials',
          value: newTools[i].repo_credentials
        }
        repo.push(obj3);

        const obj4 = {
          key: 'branch_name',
          value: newTools[i].branch_name
        }
        repo.push(obj4);

        const obj5 = {
          key: 'git_browser_type',
          value: newTools[i].git_browser_type
        }
        repo.push(obj5);

        const obj6 = {
          key: 'browser_url',
          value: newTools[i].browser_url
        }
        repo.push(obj6);

        const obj7 = {
          key: 'browser_version',
          value: newTools[i].browser_version
        }
        repo.push(obj7);

        const obj8 = {
          key: 'report_pattern',
          value: newTools[i].report_pattern
        }
        repo.push(obj8);
        console.log("OBJ8 ->>>>> " + obj8);
        console.log("OBJ8 ->>>>> " + obj8.value +"  "+ obj8.key + "\n");

        if (newTools[i].tool_name !== 'sonar' && newTools[i].tool_name !== 'maven'
        && newTools[i].tool_name !== 'svn' && newTools[i].tool_name.toLowerCase() !== 'build'
        && isUndefined(newTools[i].postBuildTo)) {
          console.log('generic format tool without post build');
          const toolFormat = {
            subjob_name: newTools[i].subjob_name,
            node_name: newTools[i].node_name,
            command_to_execute: newTools[i].command_to_execute,
            report_path: newTools[i].report_path,
            category_id: newTools[i].category_id,
            node_id: newTools[i].node_id,
            tool_id: newTools[i].tool_id,
            tool_name: newTools[i].tool_name,
            subjob_description: newTools[i].subjob_name + ' description',
            order_number: job_order,
            // postbuild_subjob: newTools[i].postBuildTo.toString(),
            postBuild_trigger_option: newTools[i].postBuild_trigger_option,
          };
          newTools[i] = toolFormat;
          job_order = job_order + 1;
        } else if (newTools[i].tool_name !== 'sonar' && newTools[i].tool_name !== 'maven'
          && newTools[i].tool_name !== 'svn' && newTools[i].tool_name.toLowerCase() !== 'build'
          && !isUndefined(newTools[i].postBuildTo)) {
          console.log('generic format tool with post build');
          const toolFormat = {
            subjob_name: newTools[i].subjob_name,
            node_name: newTools[i].node_name,
            command_to_execute: newTools[i].command_to_execute,
            report_path: newTools[i].report_path,
            category_id: newTools[i].category_id,
            node_id: newTools[i].node_id,
            tool_id: newTools[i].tool_id,
            tool_name: newTools[i].tool_name,
            subjob_description: newTools[i].subjob_name + ' description',
            order_number: job_order,
            postbuild_subjob: newTools[i].postBuildTo.toString(),
            postBuild_trigger_option: newTools[i].postBuild_trigger_option,
          };
          newTools[i] = toolFormat;
        }
        newTools[i].subModuleParametersList = repo;
        job_order = job_order + 1;
      }

      for (let i = 0; i < newTools.length; i++) {
        this.toolOrder.push(newTools[i].subjob_name);
      }
      for (let i = 0; i < this.savedToolConfig.length; i++) {
        this.toolOrder.push(this.savedToolConfig[i].subjob_name);
      }

      console.log('order >> ' + this.toolOrder.toString);

      const addSubJobs = {
        moduleId: localStorage.getItem('module_id'),
        moduleName: localStorage.getItem('module_name'),
        moduleSubJobsOrder: this.toolOrder.toString(),
        subModules: newTools,
      };

      console.log(addSubJobs);
      localStorage.setItem('mid', addSubJobs.moduleId);

      this.moduleService.createSubJobs(addSubJobs).subscribe(data => {
        this.selectedTools = [];
        this.toolOrder = [];
        this.newTools = [];
        localStorage.removeItem('newTools');
        this.getModuleSubJobsConfig();
        this.message.clear();
        this.message.add({
          severity: 'success',
          summary: 'SubJobs - ',
          detail: 'SubJobs created: ' + newTools.length
        });
        this.loader.changeLoaderStatus(false);
        this.moduleService.configChanged = false;
      },
      error => {
        console.error(error);
        this.loader.changeLoaderStatus(false);
      });
    }
  }

  deleteAllSubJobs() {
    this.loader.changeLoaderStatus(true);
    this.moduleService.deleteAllSubjobsByModuleId().subscribe(data => {
      console.log('Deleted SubJob :>> ' + data);
      localStorage.removeItem('newTools');
      this.selectedTools = [];
      this.savedToolConfig = [];
      this.message.clear();
      this.message.add({
        severity: 'info',
        summary: 'SubJobs -',
        detail: 'All SubJobs are deleted.'
      });
      this.loader.changeLoaderStatus(false);
    },
    error => {
      console.error(error);
      this.loader.changeLoaderStatus(false);
    });
  }

  deleteSubJobs() {
    if (this.deletedToolConfig.length > 0) {
      this.deletedToolConfig.forEach(element => {
        this.deletedSubjobsName.push(element.subjob_name);
      });
      this.loader.changeLoaderStatus(true);
      console.log('deleted subjobs name >> ');
      console.log(this.deletedSubjobsName);

      this.moduleService.deleteSubJobByName(this.deletedSubjobsName).subscribe(data => {
        this.getModuleSubJobsConfig();
        this.message.clear();
        localStorage.removeItem('toolForDelete');
        this.message.add({
          severity: 'success',
          summary: 'SubJobs -',
          detail: 'Subjobs deleted: ' + this.deletedToolConfig.length
        });
        this.deletedSubjobsName = [];
        this.deletedToolConfig = [];
        this.moduleService.configChanged = false;
        this.loader.changeLoaderStatus(false);
      },
      error => {
        this.deletedSubjobsName = [];
        this.deletedToolConfig = [];
        this.loader.changeLoaderStatus(false);
        console.error(error);
      });
    }
  }

  updateAllSubjobs() {
    this.moduleService.getSubJobs().subscribe(data => {
      this.oldSavedConfigs = data.subModules;
      const buildTool = this.savedToolConfig.filter((val, i) => val.tool_name.toLowerCase() === 'build')[0];
      if (buildTool !== undefined) {
        const buildToolFormat = {
          moduleId: buildTool.moduleId,
          tool_name: buildTool.tool_name.trim(),
          subjob_name: buildTool.subjob_name.trim(),
          subjob_description: localStorage.getItem('module_description').trim(),
          subModuleId: buildTool.subModuleId,
          node_name: buildTool.node_name.trim(),
          command_to_execute: 'unitTesting,' + this.unitTesting.trim() + ',' + 'jenkinsConfig,' + this.jenkinsConfig.trim(),
          report_path: 'isSonarChecked,' + this.isSonarChecked + ',' + 'sonarUrl,'
          + this.sonarUrl.trim() + ',' + 'sonarKey,' + this.sonarKey.trim() + ','
          + 'isDuckcreekChecked,' + this.isDuckcreekChecked + ',' + 'duckcreekUrl,'
          + this.duckcreekUrl.trim() + ',' + 'Reportpath,' + this.Reportpath.trim()
          + ',' + 'inputParameter,' + this.inputParameter.trim()
        };
        this.updateConfigs.push(buildToolFormat);
      }

      this.oldSavedConfigs.forEach(oldElement => {
        this.savedToolConfig.forEach(newElement => {
          if (newElement.subjob_name === oldElement.subjob_name) {
            if (newElement.postBuildTo) {
              newElement.postbuild_subjob = newElement.postBuildTo.toString();
            } else {
              newElement.postBuildTo = [];
              newElement.postbuild_subjob = '';
            }
            if (newElement.command_to_execute.localeCompare(oldElement.command_to_execute) !== 0) {
              if ((this.updateConfigs.filter(ele => ele.subjob_name === newElement.subjob_name).length === 0)) {
                this.updateConfigs.push(newElement);
              }
            }
            if (newElement.report_path.localeCompare(oldElement.report_path) !== 0) {
              if (this.updateConfigs.filter(ele => ele.subjob_name === newElement.subjob_name).length === 0) {
                this.updateConfigs.push(newElement);
              }
            }
            if (newElement.node_name.localeCompare(oldElement.node_name) !== 0) {
              if (this.updateConfigs.filter(ele => ele.subjob_name === newElement.subjob_name).length === 0) {
                this.updateConfigs.push(newElement);
              }
            }

            if (newElement.postbuild_subjob !== undefined) {
              if (newElement.postbuild_subjob.localeCompare(oldElement.postbuild_subjob) !== 0) {
                if (this.updateConfigs.filter(ele => ele.subjob_name === newElement.subjob_name).length === 0) {
                  this.updateConfigs.push(newElement);
                }
              }
            }

            if (newElement.postBuild_trigger_option !== undefined) {
              if (newElement.postBuild_trigger_option.localeCompare(oldElement.postBuild_trigger_option) !== 0) {
                if (this.updateConfigs.filter(ele => ele.subjob_name === newElement.subjob_name).length === 0) {
                  this.updateConfigs.push(newElement);
                }
              }
            }

            if (newElement.isladyBugChecked !== oldElement.isladyBugChecked) {
              if (this.updateConfigs.filter(ele => ele.subjob_name === newElement.subjob_name).length === 0) {
                this.updateConfigs.push(newElement);
              }
            }
            if (newElement.isAlmChecked !== oldElement.isAlmChecked) {
              if (this.updateConfigs.filter(ele => ele.subjob_name === newElement.subjob_name).length === 0) {
                this.updateConfigs.push(newElement);
              }
            }
          }
        });
      });

      this.updateConfigs.forEach(updatedTool => {
        this.savedToolConfig.forEach(oldTool => {
          if (oldTool.subModuleId === updatedTool.subModuleId ) {
            oldTool = updatedTool;
          }
        });
      });

      console.log('updated tools >> ');
      console.log(this.updateConfigs);
      localStorage.setItem('b', JSON.stringify(this.updateConfigs));

      // reordering of subjobs with updated subjobs
      for ( let i = 0; i < this.savedToolConfig.length; i++ ) {
        if (this.savedToolConfig[i].tool_name.toLowerCase() === 'build') {
          this.savedToolConfig[i].order_number = 0;
        } else {
          this.savedToolConfig[i].order_number = i + 1;
        }
        if (!isUndefined(this.savedToolConfig[i].subModuleParametersList)) {
          this.savedToolConfig[i].subModuleParametersList.forEach(parameter => {
            if (parameter.key === 'repo_manager') {
              parameter.value = this.savedToolConfig[i].repo_manager;
            } else if (parameter.key === 'repo_path') {
              parameter.value = this.savedToolConfig[i].repo_path;
            } else if (parameter.key === 'repo_credentials') {
              parameter.value = this.savedToolConfig[i].repo_credentials;
            } else if (parameter.key === 'branch_name') {
              parameter.value = this.savedToolConfig[i].branch_name;
            } else if (parameter.key === 'git_browser_type') {
              parameter.value = this.savedToolConfig[i].git_browser_type;
            } else if (parameter.key === 'browser_url') {
              parameter.value = this.savedToolConfig[i].browser_url;
            } else if (parameter.key === 'browser_version') {
              parameter.value = this.savedToolConfig[i].browser_version;
            }
          });
        }
      }

      this.loader.changeLoaderStatus(true);
      this.moduleService.configChanged = true;
      this.moduleService.updateAllSubjobs(this.savedToolConfig).subscribe(value => {
        this.getModuleSubJobsConfig();
        this.loader.changeLoaderStatus(false);
        this.moduleService.configChanged = false;
        this.message.clear();
        this.message.add({
          severity: 'check',
          summary: 'Subjobs :',
          detail: this.savedToolConfig.length + ' subjobs updated'
        });
        this.updateConfigs = [];
      }, error => {
        this.getModuleSubJobsConfig();
        console.error(error);
        this.moduleService.configChanged = false;
        this.loader.changeLoaderStatus(false);
        this.message.clear();
        this.message.add({
          severity: 'success',
          summary: 'Subjobs - ',
          detail: 'Unable to update Subjob/Subjobs.'
        });
        this.updateConfigs = [];
      });
    }, error => {
      this.updateConfigs = [];
      this.savedToolConfig = [];
      this.oldSavedConfigs = [];
      console.error(error);
    });
  }

  deleteToolCard() {
    const tool = JSON.parse(localStorage.getItem('toolForDelete'));
    this.selectedTools = this.selectedTools.filter((val, i) => val.tool_name !== tool.tool_name);
    this.savedToolConfig = this.savedToolConfig.filter((val, i) => val.subjob_name !== tool.subjob_name);
    this.deletedToolConfig.push(tool);
    document.getElementById('confirmDelete01').style.display = 'none';
    this.moduleService.configChanged = true;
  }

  change(e, checkPoint, checkPointModule) {
    if (e.checked) {
      this.checkPoints.push(checkPoint);
    } else {
      const removedCheckPointIndex = this.findCheckPointIndex(checkPoint, this.checkPoints);
      checkPointModule.checkpoint_criteria.checked = 'false';
      this.checkPoints = this.checkPoints.filter((val, i) => i !== removedCheckPointIndex);
    }
  }

  advanceConfig(advanceConfig) {
    if (advanceConfig === 'svn') {
      this.showSvn = true;
      this.showGit = false;
    }

    if (advanceConfig === 'git') {
      this.showGit = true;
      this.showSvn = false;
    }
  }

  dragStart(event, tool: Tools) {
    this.draggedTool = tool;
    this.draggedTool.subjob_name = '';
  }

  drop(event) {
    const draggedToolIndex = this.findIndex(this.draggedTool, this.selectedTools);
    if (this.draggedTool.tool_name.toLowerCase() === 'build') {
      if (this.buildToolPresent) {
        alert('Build Tool is already present.');
      } else {
        if (draggedToolIndex < 0) {
          this.selectedTools = [...this.selectedTools, this.draggedTool];
          this.draggedTool = null;
          this.moduleService.configChanged = true;
        }
      }
    } else {
      if (draggedToolIndex < 0) {
        this.selectedTools = [...this.selectedTools, this.draggedTool];
        this.draggedTool = null;
        this.moduleService.configChanged = true;
      } else {
        alert('Please save the similar tool first : ' + this.draggedTool.tool_name);
      }
    }
  }

  getSubjobNames() {
    this.moduleService.getSubjobNames().subscribe(data => {
      this.subjobnames = data;
    });
  }

  leave(e, subjob) {
    this.getSubjobNames();
    if (this.subjobnames.includes(subjob)) {
      this.showsubjob = subjob;
    }
  }

  enter(e, subjob) {
    if (this.showsubjob !== null) {
      this.showsubjob = null;
    }
  }

  dragEnd(event) {
    this.draggedTool = null;
  }

  findIndex(tool: Tools, arrName) {
    let index = -1;
    for (let i = 0; i < arrName.length; i++) {
      if (tool.tool_id === arrName[i].tool_id) {
        index = i;
        break;
      }
    }
    return index;
  }

  findCheckPointIndex(item, arrName) {
    let index = -1;
    for (let i = 0; i < arrName.length; i++) {
      if (item === arrName[i]) {
        index = i;
        break;
      }
    }
    return index;
  }

  getToolCheckPoints(tool) {
    if (tool.subModuleId !== undefined) {
      localStorage.setItem('checkpointTool', tool.subjob_name);
      this.tool.getModulePageCheckPoints(tool.subModuleId).subscribe(data => {
        // console.log(data);
        this.subJobCheckPoints = data;
      },
      err => {
        this.subJobCheckPoints = [];
      });
    }
    this.loader.changeLoaderStatus(true);
    const project_id = localStorage.getItem('project_id');
    this.tool.getModulePageCheckPointsTemplate(tool.subModuleId, tool.tool_name, project_id).subscribe(data => {
      this.savedcheckpoints = [];
      this.savedcheckpoints = this.comparingCheckPoints(data, this.subJobCheckPoints);
    },
    error => {
      this.loader.changeLoaderStatus(false);
      this.message.clear();
      this.message.add({
        severity: 'error',
        summary: 'Checkpoints - ',
        detail: error._body
      });
    });
    // this.savedcheckpoints = [];
    // this.savedcheckpoints = this.comparingCheckPoints(tool, this.subJobCheckPoints);
  }

  comparingCheckPoints(data, subjobCheckPoints: any[]): any[] {
    let checkpoints = data;
    if (checkpoints.length > 0 || subjobCheckPoints.length > 0) {
      for (let i = 0; i < checkpoints.length; i++) {
        for (let j = 0; j < subjobCheckPoints.length; j++) {
          if (subjobCheckPoints[j].module_name === checkpoints[i].module_name) {
            for (let r = 0; r < checkpoints[i].checkpoint_criteria.length; r++) {
              for (let c = 0; c < subjobCheckPoints[j].checkpoint_criteria.length; c++) {
                if (subjobCheckPoints[j].checkpoint_criteria[c].checkpoint_name ===
                  checkpoints[i].checkpoint_criteria[r].checkpoint_name) {
                  const checked = {
                    checkpoint_name: checkpoints[i].checkpoint_criteria[r].checkpoint_name,
                    checkpoint_criteria_id: checkpoints[i].checkpoint_criteria[r].checkpoint_criteria_id,
                    fail_criteria: checkpoints[i].checkpoint_criteria[r].fail_criteria,
                    pass_criteria: checkpoints[i].checkpoint_criteria[r].pass_criteria,
                    order_number: checkpoints[i].checkpoint_criteria[r].order_number,
                    checked: true
                  };
                  checkpoints[i].checkpoint_criteria[r] = checked;
                  break;
                } else {
                  const checked = {
                    checkpoint_name: checkpoints[i].checkpoint_criteria[r].checkpoint_name,
                    checkpoint_criteria_id: checkpoints[i].checkpoint_criteria[r].checkpoint_criteria_id,
                    fail_criteria: checkpoints[i].checkpoint_criteria[r].fail_criteria,
                    pass_criteria: checkpoints[i].checkpoint_criteria[r].pass_criteria,
                    order_number: checkpoints[i].checkpoint_criteria[r].order_number,
                    checked: false
                  };
                  checkpoints[i].checkpoint_criteria[r] = checked;
                }
              }
            }
          }
        }
      }
    }
    //comparing locallysaved and template checkpoints for checked or unchecked
    if (checkpoints.length > 0 || this.locallySavedCheckPoints.length > 0) {
      for (let i = 0; i < checkpoints.length; i++) {
        for (let j = 0; j < this.locallySavedCheckPoints.length; j++) {
          if (this.locallySavedCheckPoints[j].module_name === checkpoints[i].module_name) {
            for (let r = 0; r < checkpoints[i].checkpoint_criteria.length; r++) {
              for (let c = 0; c < this.locallySavedCheckPoints[j].checkpoint_criteria.length; c++) {
                if (this.locallySavedCheckPoints[j].checkpoint_criteria[c].checkpoint_name ===
                  checkpoints[i].checkpoint_criteria[r].checkpoint_name) {
                  const checked = {
                    checkpoint_name: checkpoints[i].checkpoint_criteria[r].checkpoint_name,
                    checkpoint_criteria_id: checkpoints[i].checkpoint_criteria[r].checkpoint_criteria_id,
                    fail_criteria: checkpoints[i].checkpoint_criteria[r].fail_criteria,
                    pass_criteria: checkpoints[i].checkpoint_criteria[r].pass_criteria,
                    order_number: checkpoints[i].checkpoint_criteria[r].order_number,
                    checked: true
                  };
                  checkpoints[i].checkpoint_criteria[r] = checked;
                  break;
                } else {
                  const checked = {
                    checkpoint_name: checkpoints[i].checkpoint_criteria[r].checkpoint_name,
                    checkpoint_criteria_id: checkpoints[i].checkpoint_criteria[r].checkpoint_criteria_id,
                    fail_criteria: checkpoints[i].checkpoint_criteria[r].fail_criteria,
                    pass_criteria: checkpoints[i].checkpoint_criteria[r].pass_criteria,
                    order_number: checkpoints[i].checkpoint_criteria[r].order_number,
                    checked: false
                  };
                  checkpoints[i].checkpoint_criteria[r] = checked;
                }
              }
            }
          }
        }
      }
    }
    checkpoints = checkpoints;
    this.loader.changeLoaderStatus(false);
    // open modal when data is ready
    document.getElementById('reportConfig01').style.display='block';
    return checkpoints;
  }

  addCheckPoints() {
    this.moduleService.configChanged = true;
    this.savedcheckpoints.forEach(ele => {
      ele.checkpoint_criteria = ele.checkpoint_criteria.filter((val, i) => val.checked === true);
    });
    this.savedcheckpoints = this.savedcheckpoints.filter(x => x.checkpoint_criteria.length > 0);
    this.subJobCheckPoints = this.savedcheckpoints;
    this.locallySavedCheckPoints = this.savedcheckpoints;
    this.isAllChecked = [];
    this.addCheckPointsOnServer();
  }

  addCheckPointsOnServer() {
    if (this.moduleService.configChanged && localStorage.getItem('checkpointTool') !== null) {
      this.loader.changeLoaderStatus(true);
      const formattedData = {
        subjob_name: localStorage.getItem('checkpointTool'),
        subjob_checkpoint: this.savedcheckpoints
      };
      console.log(formattedData);
      this.tool.addModulePageCheckPoints(localStorage.getItem('checkpointTool'), formattedData).subscribe(data => {
        this.locallySavedCheckPoints = [];
        this.subJobCheckPoints = [];
        this.savedcheckpoints = [];
        this.moduleService.configChanged = false;
        this.loader.changeLoaderStatus(false);
        document.getElementById('reportConfig01').style.display = 'none';
        this.message.clear();
        this.message.add({
          severity: 'success',
          summary: 'CheckPoints',
          detail: 'Added Successfully'
        });
      },
        error => {
          document.getElementById('reportConfig01').style.display = 'none';
          this.loader.changeLoaderStatus(false);
          console.error(error);
          // this.message.clear();
          // this.message.add({
          //   severity: 'Error',
          //   summary: 'CheckPoints',
          //   detail: 'Unable to add checkpoint.'
          // });
        });
    } else {
      console.log('checkpoints not change.');
    }
  }

  selectedCredentialValue(credential_id, display_name) {
    localStorage.setItem('credential_id', credential_id);
    localStorage.setItem('display_name', display_name);
    this.displayname = localStorage.getItem(display_name);
  }

  getURL(path, index) {
    const str = path;
    const res = str.split(',');
    if (res[index] === 'true') {
      return true;
    } else if (res[index] === 'false') {
      return false;
    }
    return (res[index]);
  }

  saveToolLocal(tool) {
    localStorage.setItem('toolForDelete', JSON.stringify(tool));
  }

  changeInConfig() {
    if (this.moduleService.configChanged === true) {
      document.getElementById('confirmBox02').style.display = 'block';
      this.moduleService.configChanged = !this.moduleService.configChanged;
    }
  }

  allSelect(checked, index) {
    this.savedcheckpoints.forEach(element => {
      if (element.module_name === index) {
        element.checkpoint_criteria.forEach(ele => {
          ele.checked = checked[index];
        });
      }
    });
  }

  cancelAllChanges() {
    this.moduleService.configChanged = false;
    this.getModuleSubJobsConfig();
    this.getToolConfig();
    this.updateConfigs = [];
    this.newTools = [];
    this.deletedToolConfig = [];
    this.deletedSubjobsName = [];
    this.selectedTools = [];
  }

  openNewWindow(url) {
    console.log('config url >> ' + url);
    window.open(url);
  }

  toggleSize(cardId) {
    let x = document.getElementById(cardId);
    if (x.style.display === 'none') {
      x.style.display = 'block';
      this.hideCardName = '';
    } else if (x.style.display === 'block') {
      x.style.display = 'none';
      this.hideCardName = cardId;
    }
  }

  toggleBuildCard(tool_name) {
    console.log('hide build tool >> ' + tool_name);
    let x = document.getElementById(tool_name.toLowerCase());
    if (x.style.display === 'none') {
      x.style.display = 'block';
      this.hideCardName = '';
    } else if (x.style.display === 'block') {
      x.style.display = 'none';
      this.hideCardName = tool_name;
    }
  }

  getAvailableJobs(selectedTool: Tools) {
    this.allAvailableJobs = this.selectedTools.concat(this.savedToolConfig);
    this.allAvailableJobs = this.allAvailableJobs.filter((val, i) => val.subjob_name !== '');
    if (selectedTool.subjob_name !== '') {
      this.allAvailableJobs = this.allAvailableJobs.filter((val, i) => val.subjob_name !== selectedTool.subjob_name);
    }
    this.allAvailableJobs.forEach(tool => {
      if (tool.postbuild_subjob !== undefined && selectedTool.subjob_name !== tool.subjob_name) {
        tool.postBuildTo.forEach(jobName => {
          this.allAvailableJobs = this.allAvailableJobs.filter((val, i) => val.subjob_name !== jobName);
        });
      }
    });
  }

  resetPostBuild(currentTool) {
    currentTool.postBuildTo = [];
    currentTool.postbuild_subjobs = '';
    currentTool.postBuild_trigger_option = '';
  }


  accordianToggle(subModuleId) {
    document.getElementById(subModuleId + 'Accordian').classList.toggle('active');
    var panel = document.getElementById(subModuleId + 'Panel');
    // alert(panel);
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  }
}
