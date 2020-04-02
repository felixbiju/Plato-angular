import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import { AppConfig } from '../../app.config';

@Injectable()
export class ToolService {



  constructor( private http: Http, private config: AppConfig) { }

  getAllTools(project_id){
    const url = this.config.getConfig('baseUrl') + 'ToolConfigService/fetchMappedToolsFromProjectMapping/' + project_id;
    return this.http.get(url).map( (res: Response) => res.json() );
  }

  getModulePageToolList() {
    const url = this.config.getConfig('baseUrl') + 'ModulePage/toolList/' + localStorage.getItem('project_id');
    return this.http.get(url).map((res: Response) => res.json());
  }

  getAllToolsInCategory(category_id) {
    const url = this.config.getConfig('baseUrl') + 'ToolConfigService/allToolsInCategory/' + category_id;
    return this.http.get(url).map((res: Response) => res.json());
  }

  getAllCategories() {
    const url = this.config.getConfig('baseUrl') + 'ToolConfigService/allCategories/';
    return this.http.get(url).map((res: Response) => res.json());
  }

  getToolDetails(tool_mapping_id) {
    const url = this.config.getConfig('baseUrl') + 'ToolConfigService/getParticularToolDetails/' + tool_mapping_id;
    return this.http.get(url).map((res: Response) => res.json());
  }

  getToolMappingDetails(tool_mapping_id) {
    const url = this.config.getConfig('baseUrl') + 'ToolConfigService/getParticularToolDetails/' + tool_mapping_id;
    return this.http.get(url).map((res: Response) => res.json());
  }

  addToolMapping(project_id, tool_id) {
    const url = this.config.getConfig('baseUrl') + 'ToolConfigService/create/' + project_id + "/" + tool_id;
    return this.http.get(url).map((res: Response) => res.text());
  }

  editTool(newToolMapping) {
    const url = this.config.getConfig('baseUrl') + 'ToolConfigService/update/';
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put(url, newToolMapping, { headers: headers }).map((res: Response) => res.text());
  }

  deleteToolMapping(checked_tool_id) {
    const url = this.config.getConfig('baseUrl') + 'ToolConfigService/delete/' + checked_tool_id;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.delete(url, { headers: headers }).map((res: Response) => res.text());
  }

  // TOOL-CONFIG PAGE CHECKPOINTS METHODS
  addLiveBuildCheckPoints(newCheckPoints) {
    const url = this.config.getConfig('baseUrl') + 'CheckpointService/createCheckpointTemplate/';
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(url, newCheckPoints, {headers: headers}).map( (res: Response) => res.text());
  }

  getLiveBuildCheckPoints(mapping_id) {
    const url = this.config.getConfig('baseUrl') + 'CheckpointService/getCheckpointTemplate/' + mapping_id;
    return this.http.get(url).map((res: Response) => res.json());
  }

  getCheckPointByModuleId(module) {
    const url = this.config.getConfig('baseUrl') + 'CheckpointService/getSingleCheckpointTemplate/' + module.module_checkpoint_id;
    return this.http.get(url).map((res: Response) => res.json());
  }

  updateSingleCheckpoint(updatedModuleCheckPoint) {
    const url = this.config.getConfig('baseUrl') + 'CheckpointService/updateSingleCheckpointTemplate/';
    return this.http.put(url, updatedModuleCheckPoint).map((res: Response) => res.text());
  }

  updateCheckpoint(updatedcheckpointMoudle) {
    const url = this.config.getConfig('baseUrl') + 'CheckpointService/updateCheckpointTemplate/';
    return this.http.put(url, updatedcheckpointMoudle).map((res: Response) => res.text());
  }

  deleteCheckpointDetails(checkPoint) {
    const url = this.config.getConfig('baseUrl') + 'CheckpointService/deleteCheckpointDetailTemplate/' + checkPoint.checkpoint_criteria_id;
    return this.http.delete(url).map((res: Response) => res.text());
  }

  deleteCheckpointByModule(module) {
    const url = this.config.getConfig('baseUrl') + 'CheckpointService/deleteCheckpointTemplate/' + module.module_checkpoint_id;
    return this.http.delete(url).map((res: Response) => res.text());
  }

  // Module Page Checkpoints Methods
  getModulePageCheckPoints(subModuleId) {
    const url = this.config.getConfig('baseUrl') + 'CheckpointService/getCheckpointsForSubjob/' + subModuleId;
    return this.http.get(url).map((res: Response) => res.json());
  }

  getModulePageCheckPointsTemplate(subModuleId, tool_name, project_id) {
    const url = this.config.getConfig('baseUrl') + 'CheckpointService/getCheckpointTemplateToolProject/' + tool_name + '/' + project_id;
    return this.http.get(url).map((res: Response) => res.json());
  }

  addModulePageCheckPoints(subjob_name, checkpointsData) {
    const url = this.config.getConfig('baseUrl') + 'CheckpointService/createCheckpoint/';
    return this.http.post(url, checkpointsData).map((res: Response) => res.text());
  }


  // ****************************************************************************
  addTool(newTool){
    const url=this.config.getConfig('baseUrl')+"ToolConfigService/createTool/";
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(url, newTool, { headers: headers }).map(res => res.text()).catch(this.errorHandler);
  }

  getParticularMainById(tool_id){
      const url = this.config.getConfig('baseUrl') + "ToolConfigService/fetchParticularTool/"+ tool_id;
      return this.http.get(url).map((res: Response) => res.json()).catch(this.errorHandler);
  }

  updateMaintool(updatedTool){
    const url=this.config.getConfig('baseUrl')+"ToolConfigService/updateTool/";
    return this.http.put(url, updatedTool).map((res: Response) => res.text());
  }

  deleteMainTool(tool) {
    const url = this.config.getConfig('baseUrl') +"ToolConfigService/deleteTool/" + tool.tool_id;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.delete(url, { headers: headers }).map((res: Response) => res.text()).catch(this.errorHandler);
  }

  getAllMainTool() {
    const url=this.config.getConfig('baseUrl') +"ToolConfigService/allfromToolMaster"
    return this.http.get(url).map((res: Response) => res.json());
  }

  errorHandler(err: Response) {
    let msg = '';
    switch (err.status) {
      case 404:
        msg = 'Not Found.';
      break;

      case 500:
        msg = 'Server connection Failed.';
      break;
    }
    return Observable.throw(msg);
  }

  // ********************************************************************************************
}
