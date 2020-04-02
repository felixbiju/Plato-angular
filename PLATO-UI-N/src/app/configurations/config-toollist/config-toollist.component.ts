import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToolService } from '../../shared/services/tools.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { NodeService } from '../../shared/services/node.service';
import { Maintool } from '../../shared/model/maintool';
import { PermissionService } from '../../shared/services/permissions.service';

@Component({
  selector: 'app-config-toollist',
  templateUrl: './config-toollist.component.html',
  styleUrls: ['./config-toollist.component.css']
})
export class ConfigToollistComponent implements OnInit {

  categories: any[];
  currentCategoryID = 2;
  tool = new Maintool();
  toolsInCategory:any[];
  tool_name : string;
  command_to_execute : string;
  report_path : string;
  defaultselected = 'Automation Stack';
  screenPermission: any[];
  Config_Maintool: {
    tool_id: number;
    tool_name: string;
    command_to_execute: string;
    report_path: string;
    node_name: string;
    category_id: number;
    category_name: string;
    node_id: number;
  };
  isEditShow = false;
  isDeleteShow = false;
  selectAll = false;
  selectedTool = false;

  public checked_array: any[] = [];

  constructor(private _tool: ToolService,private _node: NodeService, private message: MessageService,
              private _permissions: PermissionService) { }

  ngOnInit() {
    this.getAllCategories();
    this.getDefaultData();
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
                if (screen.screenName.toLowerCase() === 'tool list screen') {
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
    this.currentCategoryID = 2;
    this._tool.getAllToolsInCategory(this.currentCategoryID).subscribe(data =>{
    this.toolsInCategory = data})
  }

  selectetoolcategoryValue(category_name,category_id){
    this.currentCategoryID = category_id;
  }

  createTool() {
    const newTool = {
      tool_name : this.tool_name,
      command_to_execute : this.command_to_execute,
      report_path : this.report_path,
      category_id : this.currentCategoryID,
      node_name: 'master'
    }
    this._tool.addTool(newTool).subscribe( data => {
      this.message.clear();
      this.message.add({
        severity: 'check',
        summary: 'Tool : '+this.tool_name,
        detail: data,
      });
      this.selectedCategoryValue(newTool.category_id);
    },
    error => {
      this.message.clear();
      this.message.add({
        severity: 'error',
        summary: 'Tool : '+this.tool_name,
        detail: error,
      });
    });

  }

  isChecked(tool) {
    if (this.checked_array.includes(tool.tool_id)) {
      this.checked_array = this.checked_array.filter((val, i) => val !== tool.tool_id);
    } else {
      this.checked_array.push(tool.tool_id);
      this.Config_Maintool = tool;
    }

    if (this.checked_array.length === 1) {
      this.isEditShow = true;
      this.isDeleteShow = true;
    } else if (this.checked_array.length >= 2) {
      this.isEditShow = false;
      this.isDeleteShow = true;
    } else if (this.checked_array.length < 1) {
      this.isEditShow  = false;
      this.isDeleteShow  = false;
    }
  }

  setAllChecked() {
    this.checked_array = [];
    if(!this.selectAll) {
      this.isEditShow = false;
      this.isDeleteShow = true;
      this.selectedTool = true;
    } else {
      this.isEditShow = false;
      this.isDeleteShow = false;
      this.selectedTool = false;
    }
  }

  updateMaintool() {
    let tool_id = this.Config_Maintool.tool_id;
    const updatedTool = {
      tool_id: tool_id,
      tool_name: this.tool.tool_name,
      command_to_execute: this.tool.command_to_execute,
      report_path:this.tool.report_path,
      node_name: this.tool.node_name,
      category_id:this.tool.category_id
    }

    this._tool.updateMaintool(updatedTool).subscribe(data => {
      this.message.clear();
      this.message.add({
        severity: 'check',
        summary: 'Tool : '+this.Config_Maintool.tool_name,
        detail: 'Tool modified successfully',
      });
      this.selectedCategoryValue(this.Config_Maintool.category_id);
    },
    error => {
      this.message.clear();
      this.message.add({
        severity: 'error',
        summary: 'Tool - '+this.Config_Maintool.tool_name,
        detail: error,
      });
    });
  }

  getAllCategories() {
    this._tool.getAllCategories().subscribe(data => { this.categories = data});
  }

  selectedCategoryValue(category_id) {
    this.currentCategoryID = category_id;
    this._tool.getAllToolsInCategory(this.currentCategoryID).subscribe(data =>{
      this.toolsInCategory = data
    },
    err => {
      this.toolsInCategory = [];
    });
  }

  getParticularTool(){
    this._tool.getParticularMainById(this.Config_Maintool.tool_id).subscribe( data => {
      this.tool = data;
    });
  }

  deleteTool(){
    this._tool.deleteMainTool(this.Config_Maintool).subscribe( data => {
      let categoryName = this.Config_Maintool.category_name;
      let categoryID = this.Config_Maintool.category_id;
      this.selectedCategoryValue(categoryID);
      this.message.clear();
      this.message.add({
        severity: 'check',
        summary: 'Tool - '+this.Config_Maintool.tool_name,
        detail: 'Tool deleted successfully',
      });
    },
    error => {
      this.message.clear();
      this.message.add({
        severity: 'error',
        summary: 'Tool - '+this.Config_Maintool.tool_name,
        detail: error,
      });
    });
  }

  resetForm(form: NgForm) {
    form.reset();
  }

  isAllChecked() {
    this.isEditShow = false;
    this.isDeleteShow = false;
  }
}
