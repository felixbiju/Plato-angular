import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { DashboardService } from '../../shared/services/dashboard.service';
import { Tasks } from '../../shared/model/tasks';
import { Tools } from '../../shared/model/tools';
import { Portfolios } from '../../shared/model/portfolio';
import { Accounts } from '../../shared/model/accounts';
import { Projects } from '../../shared/model/projects';
import { ProjectService } from '../../shared/services/project.service';
import { ToolService } from '../../shared/services/tools.service';
import { AccountService } from '../../shared/services/account.service';
import { PortfolioService } from '../../shared/services/portfolio.service';
import { NodeService } from '../../shared/services/node.service';
import { ToolMapping } from '../../shared/model/toolMapping';
import { CheckPoints } from '../../shared/model/checkPoint';
import { PermissionService } from '../../shared/services/permissions.service';

@Component({
  selector: 'app-config-tools',
  templateUrl: './config-tools.component.html',
  styleUrls: ['./config-tools.component.css']
})
export class ConfigToolsComponent implements OnInit, OnDestroy {

  maintools: any[];
  projects: any[];
  name: string;
  company: string;
  stage: number;
  task = new Tasks();
  selectedID: string;
  id: string;
  roles: any[];
  tools : any[];
  portfolios: any[];
  accounts: any[];
  toolList: Tools[];
  categories: any[];
  index: number;
  toolsInCategory: any[];
  newToolMapping = new ToolMapping();
  existsToolMapping = new ToolMapping();
  toolDetails = new Tools();

  public adf:string[] = [];

  public createTools: number[]=[];
  public checked_array: any[]=[];

  checkAll = false;
  checkTool = false;
  isCreateShow: boolean;
  isEditShow: boolean;
  isDeleteShow: boolean;
  isSettingShow: boolean;

  moduleCheckpoint = new CheckPoints();
  checkPoint_Criteria: any[] = [];
  saveCheckPoint = false;
  savemodule = false;
  moduleOrderNumber = 0;
  checkPointOrder = 0;
  pass_criteria = '';
  fail_criteria = '';
  checkPointModuleName = '';
  checkPoint = '';
  createCheckpoint: any[] = [];
  localCheckPointsArray: any[] = [];
  createCheckPointModule: any[] = [];
  saveCheckPoints: any[] = [];
  checkPointsById: any[] = [];
  checkPointModuleAddBtn = false;
  node_list: any = [];
  portfolio_name = localStorage.getItem('portfolio_name');
  account_name = localStorage.getItem('account_name');
  project_name = localStorage.getItem('project_name');
  filterText: string;
  screenPermission: any[];

  constructor( private dashboard: DashboardService, private _account: AccountService, private _node: NodeService,
               private _project: ProjectService, private _portfolio: PortfolioService, private _tool: ToolService,
               private _permissions: PermissionService ) { }

  ngOnInit() {
    this.getDefaultData();
    this.getMaintools();
  }

  ngOnDestroy() {
    localStorage.removeItem('Config_Portfolio');
    localStorage.removeItem('Config_Account');
    localStorage.removeItem('Config_Project');
  }

  getMaintools(){
    this._tool.getAllMainTool().subscribe(data=> {
      this.maintools = data;
      console.log(this.maintools);
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
            if (module.moduleName.toUpperCase() === 'CONFIGURATION MODULE') {
              module.screens.forEach(screen => {
                if (screen.screenName.toLowerCase() === 'project-tools mapping') {
                  this.screenPermission = screen.components;
                }
              });
            }
          });
        }
      });
    });
  }

  getDefaultData() {
    this.getPermissionByRole();
    // this._permissions.getAllPermissions().subscribe(permisssion => {
    //   permisssion.permissionData.forEach(module => {
    //     if (module.moduleName.toUpperCase() === 'CONFIGURATION MODULE') {
    //       module.screens.forEach(screen => {
    //         if (screen.screenName.toLowerCase() === 'project-tools mapping') {
    //           this.screenPermission = screen.components;
    //         }
    //       });
    //     }
    //   });
    //   console.log(this.screenPermission);
    // });
    this.isCreateShow = true;
    this.isEditShow = false;
    this.isDeleteShow = false;
    this._portfolio.getAllPortfolio().subscribe(  data => {
      this.portfolios = data
    });
    this._account.getAllAccountList(localStorage.getItem('portfolio_id')).subscribe(data => { this.accounts = data });
    this._project.getProjectList1(localStorage.getItem('portfolio_id'), localStorage.getItem('account_id')).subscribe(data => { this.projects = data });
    this.getAllTools(localStorage.getItem('project_id'));
    this.getAllCategories();
  }

  isChecked(checked_tool_id) {
    if (this.checked_array.includes(checked_tool_id)) {
      console.log("Unchecked tool is >> " + checked_tool_id);
      this.checked_array = this.checked_array.filter((val, i) => val !== checked_tool_id);
      console.log(this.checked_array);
    } else {
      this.checked_array.push(checked_tool_id);
      localStorage.setItem('project_tool_mapping_id', checked_tool_id);
      console.log("checked project tool mapping id >> " + this.checked_array);
    }

    if (this.checked_array.length === 1) {
      this.isEditShow = true;
      this.isDeleteShow = true;
      localStorage.setItem('checked_tool_id', this.checked_array[0]);
    } else if (this.checked_array.length >= 2) {
      this.isEditShow = false;
      this.isDeleteShow = true;
      localStorage.removeItem('project_tool_mapping_id');
    } else if (this.checked_array.length < 1) {
      this.isEditShow = false;
      this.isDeleteShow = false;
    }
  }

  isCheckedForCreation(tool_id){
    if(this.createTools.includes(tool_id)){
      console.log(this.createTools.includes(tool_id));
      this.index=this.createTools.indexOf(tool_id);
      this.createTools.splice(this.index, 1);
    } else {
      console.log(this.createTools.includes(tool_id));
      this.createTools.push(tool_id);
    }
    console.log("checked_tool_id >> " + this.createTools);

    if(this.isEditShow === true) {
      this.isEditShow = false;
      this.isDeleteShow = false;
    } else {
      this.isEditShow = true;
      this.isDeleteShow = true;
    }
  }

  setAllChecked() {
    this.checked_array = [];
    localStorage.removeItem('project_tool_mapping_id');
    if(!this.checkAll) {
      this.isEditShow = false
      this.isDeleteShow = true;
      this.checkTool = true;
    } else {
      this.isEditShow  =  false
      this.isDeleteShow = false;
      this.checkTool = false;
    }
  }

  selectedLiveBuild(tool) {
    const tool_project_tool_mapping_id = tool.tool_project_mapping_id;
    if (tool_project_tool_mapping_id !== null) {
      document.getElementById('reportConfig01').style.display = 'block';
      console.log("project tool mapping id >> " + tool_project_tool_mapping_id);
      localStorage.setItem('project_tool_mapping_id', tool_project_tool_mapping_id);
      this.getCheckPoints(tool_project_tool_mapping_id);
    } else {
      alert('Can not find tool_project_mapping_id.');
    }
  }

  selectedPortfolioValue(portfolio) {
    localStorage.setItem('Config_Portfolio', JSON.stringify(portfolio));
    this._account.getAllAccountList(portfolio.portfolio_id).subscribe(data => {
      this.accounts = data;
    });
    this._project.getProjectList1(portfolio.portfolio_id, null).subscribe(data => {
      this.projects = data;
    },
      err => {
        this.projects = [];
      }
    );
    this.tools = [];
  }

  selectedAccountValue(account) {
    localStorage.setItem('Config_Account', account);
    const portfolio = JSON.parse(localStorage.getItem('Config_Portfolio'));
    this._project.getProjectList1(portfolio.portfolio_id, account.accountId).subscribe(data => {
      this.projects = data;
      },
      err => {
        this.projects = [];
      }
    );
  }

  selectedProjectValue(project) {
    localStorage.setItem('Config_Project', JSON.stringify(project));
    this.getAllTools(project.project_id);
  }

  selectedCategoryValue(category_name,category_id) {
    localStorage.removeItem('category_id');
    localStorage.setItem('category_id',category_id);
    const categoryID = localStorage.getItem('category_id');
    console.log("in ts : "+categoryID);
    this._tool.getAllToolsInCategory(categoryID).subscribe(data =>{
      this.toolsInCategory = data
    },
      err => {
        this.toolsInCategory = [];
      });

  }

  selectedToolValue(tool_name,tool_id) {
    localStorage.removeItem('tool_id');
    localStorage.setItem('tool_id',tool_id);
    const toolID = localStorage.getItem('tool_id');
    console.log("in ts : "+toolID);
    this._tool.getToolDetails(toolID).subscribe(data =>{this.toolDetails = data});
  }

  getAllTools(project_id) {
    this._tool.getAllTools(project_id).subscribe(data => {
      this.tools = data;
      this.getNodeList();
    },
    err => {
      this.tools = [];
    });
  }

  getNodeList() {
    this._node.getAllNode().subscribe(data => {
      this.node_list = data;
    },
    error => {
      this.node_list = [];
    });
  }

  getAllCategories() {
    this._tool.getAllCategories().subscribe(data => { this.categories = data});
  }

  createToolMapping() {
    const projectID=localStorage.getItem('project_id');
    const tool_ids=this.createTools;
    console.log(tool_ids);
    for(let i=0; i<tool_ids.length; i++) {
      this._tool.addToolMapping(projectID,tool_ids[i]).subscribe(data => { });
    }
    alert('Tools Mapped Succesfully.');
    this._tool.getAllTools(projectID).subscribe(data => { this.tools = data});
    this.createTools = [];
  }

  getParticularTool(){
    const checked_tool_id = localStorage.getItem('checked_tool_id');
    this._tool.getToolDetails(checked_tool_id).subscribe( data => {
      this.existsToolMapping = data;
      console.log('hi :: ' + this.existsToolMapping.tool_id);
      console.log(data);
    });
  }

  updateTool(){
    const projectID = localStorage.getItem('project_id');
    console.log('update tool >> ');
    console.log(this.existsToolMapping);
    this._tool.editTool(this.existsToolMapping).subscribe(data => {
      this._tool.getAllTools(projectID).subscribe( data => {
         this.tools = data;
      });
      this.isEditShow = false;
      this.isDeleteShow = false;
      this.checked_array = [];
    });
  }

  deleteToolMapping(){
    const projectID = localStorage.getItem('project_id');
    const tool_mapping_id = localStorage.getItem('checked_tool_id');
    console.log("Tool to be deleted from ptm >> " + tool_mapping_id);
    this._tool.deleteToolMapping(tool_mapping_id).subscribe(data => {
      console.log(data);
      this.checked_array = [];
      this._tool.getAllTools(projectID).subscribe(data => { this.tools = data});
    });
  }

  addCheckPointModule(module_name) {
    this.checkPointModuleAddBtn = true;
    this.createCheckPointModule.push(module_name);
    this.checkPoint = '';
    this.pass_criteria = '';
    this.fail_criteria = '';
  }

  deleteCheckPointModule(module_name) {
    const checkPointModule = this.localCheckPointsArray.find(x => x.module_name === module_name);
    if (checkPointModule) {
      const checkPointModuleIndex = this.findCheckPointModuleIndex(module_name, this.localCheckPointsArray);
      this.localCheckPointsArray = this.localCheckPointsArray.filter((val, i) => i !== checkPointModuleIndex);
      console.log('deleted :: ' + module_name);
    } else {
      console.log(module_name + ' module not found.');
    }
  }

  findCheckPointModuleIndex(module_name, arrName) {
    let index = -1;
    for (let i = 0; i < arrName.length; i++) {
      if (module_name === arrName[i].module_name) {
        index = i;
        break;
      }
    }
    return index;
  }

  addCheckPointName(moduleName, checkPointName, pass_condition, fail_condition) {
    if (this.createCheckpoint.length <= 0) {
      this.checkPointOrder = 0;
    } else {
      this.checkPointOrder = this.createCheckpoint.length;
    }
    this.checkPointOrder++;
    const checkPoint = {
      order_number: this.checkPointOrder,
      checkpoint_name: checkPointName,
      pass_criteria: pass_condition,
      fail_criteria: fail_condition
    }

    this.createCheckpoint.push(checkPoint);
    this.saveCheckPoint = true;
  }

  saveCheckPointsInArray(id) {
    const checkPoint = this.saveCheckPoints.find(x => x === id);
    if (checkPoint) {
      const removedCheckPointIndex = this.findCheckPointIndex(id, this.saveCheckPoints);
      this.saveCheckPoints = this.saveCheckPoints.filter((val, i) => i !== removedCheckPointIndex);
    } else {
      this.saveCheckPoints.push(id);
    }
  }

  saveCheckPointsConfigurations(moduleName) {
    if(this.localCheckPointsArray.length > 0 && this.moduleOrderNumber <= this.localCheckPointsArray.length) {
      this.moduleOrderNumber = this.localCheckPointsArray.length;
    } else if(this.checkPointsById.length > 0 && this.moduleOrderNumber <= this.checkPointsById.length) {
      this.moduleOrderNumber = this.checkPointsById.length;
    }

    this.moduleOrderNumber++;
    const subjob_checkpoint = {
      order_number: this.moduleOrderNumber,
      module_name: moduleName,
      checkpoint_criteria: this.createCheckpoint
    }
    this.localCheckPointsArray.push(subjob_checkpoint);
    localStorage.setItem('localCheckPoints', JSON.stringify(this.localCheckPointsArray) );
    console.log(this.localCheckPointsArray);
    this.createCheckPointModule = [];
    this.createCheckpoint = [];
    this.savemodule = true;
    this.checkPointModuleAddBtn = false;
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

  saveCheckPointConfiguration() {
    const checkPoints = JSON.parse(localStorage.getItem('localCheckPoints'));
    console.log(checkPoints);
    console.log('send this array to server');
    const formattedCheckPoints = {
      project_tool_mapping_id: localStorage.getItem('project_tool_mapping_id'),
      subjob_checkpoint: this.localCheckPointsArray
    };
    console.log(formattedCheckPoints);
    this._tool.addLiveBuildCheckPoints(formattedCheckPoints).subscribe(data =>{
      console.log(data);
      this.localCheckPointsArray = [];
      this.moduleOrderNumber = 0;
      this.checkPointOrder = 0;
      document.getElementById('reportConfig01').style.display = 'none';
    });

    const updatedcheckpointMoudle = {
      project_tool_mapping_id: localStorage.getItem('project_tool_mapping_id'),
      subjob_checkpoint: this.checkPointsById
    }
    console.log(updatedcheckpointMoudle);
    this._tool.updateCheckpoint(updatedcheckpointMoudle).subscribe(data => {
      console.log(data);
    });
  }

  getCheckPoints(tool_mapping_id) {
    console.log(tool_mapping_id);
    this._tool.getLiveBuildCheckPoints(tool_mapping_id).subscribe(data => {
      console.log(data);
      this.checkPointsById = data;
    },
    err =>{
      this.checkPointsById = [];
    });
  }

  getCheckPointByModuleId(module) {
    this._tool.getCheckPointByModuleId(module).subscribe(data => {
      console.log(data);
      this.moduleCheckpoint = data;
      this.checkPoint_Criteria = data.checkpoint_criteria;
      document.getElementById('updateCheckPoint').style.display = 'block';
    });
  }

  updateCheckPoint(module) {
    const updatedModuleCheckPoint = {
      tool_name: module.tool_name,
      order_number: module.order_number,
      module_subjob_id: module.module_subjob_id,
      module_name: module.module_name,
      module_checkpoint_id: module.module_checkpoint_id,
      checkpoint_criteria: this.checkPoint_Criteria,
    }
    console.log(updatedModuleCheckPoint);
    this._tool.updateSingleCheckpoint(updatedModuleCheckPoint).subscribe(data => {
      console.log(data);
      this.getCheckPoints(localStorage.getItem('project_tool_mapping_id'));
      document.getElementById('updateCheckPoint').style.display = 'none';
    });
  }

  deleteCheckPointDetails(checkPoint) {
    this._tool.deleteCheckpointDetails(checkPoint).subscribe(data => {
      console.log(data);
      this.getCheckPoints(localStorage.getItem('project_tool_mapping_id'));
    });
  }

  deleteCheckPointModuleOnServer(module) {
    this._tool.deleteCheckpointByModule(module).subscribe(data => {
      console.log(data);
      this.getCheckPoints(localStorage.getItem('project_tool_mapping_id'));
    });
  }

  clearcheckpoints() {
    this.checkPointModuleAddBtn = false;
    this.createCheckPointModule = [];
    this.createCheckpoint = [];
  }

  resetForm(form: NgForm) {
    form.reset();
  }
}
