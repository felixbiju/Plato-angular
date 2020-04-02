import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MessageService } from 'primeng/components/common/messageservice';
import { NodeService } from '../../shared/services/node.service';
import { PermissionService } from '../../shared/services/permissions.service';
import { AppConfig } from '../../app.config';


@Component({
  selector: 'app-config-node',
  templateUrl: './config-node.component.html',
  styleUrls: ['./config-node.component.css']
})

export class ConfigNodeComponent implements OnInit {

  selectAll = false;
  selectedNode = false;
  currentNode: any = {
    node_id: null,
    node_name: null,
    status: null
  };
  downloadUrl = '';
  node_list: any[];
  isLoading = true;
  node1_name: string;
  node_name: string;
  node_id: number;
  isEditShow: boolean;
  isDeleteShow: boolean;
  public checked_array: any[] = [];
  screenPermission: any[];

  constructor(private _node: NodeService, private message: MessageService, private _router: Router,
  private _permissions: PermissionService, private config: AppConfig) { }

  ngOnInit() {
    this.getPermissionByRole();
    this.getAllNode();
  }

  getPermissionByRole() {
    this._permissions.currentRole.subscribe(role => {
      this._permissions.getAllPermissionsByRole(role).subscribe(permissions => {
        if (permissions.permissionData === undefined) {
          this.screenPermission = [];
        } else {
          permissions.permissionData.forEach(module => {
            if (module.moduleName.toUpperCase() === 'CONFIGURATION MODULE') {
              module.screens.forEach(screen => {
                if (screen.screenName.toLowerCase() === 'node screen') {
                  this.screenPermission = screen.components;
                }
              });
            }
          });
        }
      });
    });
  }

  setAllChecked() {
    localStorage.removeItem('node_id');
    this.node_id = 0;
    if (!this.selectAll) {
      this.isEditShow = false;
      this.isDeleteShow = true;
      this.selectedNode = true;
    } else {
      this.isEditShow = false;
      this.isDeleteShow = false;
      this.selectedNode = false;
    }
    this.checked_array = [];
  }

  isChecked(node_id, node1_name) {
    if (this.checked_array.includes(node_id)) {
      this.checked_array = this.checked_array.filter((val, i) => val !== node_id);
    } else {
      this.checked_array.push(node_id);
      localStorage.setItem('node_id', node_id);
      this.node_id = node_id;
    }

    if (this.checked_array.length === 1) {
      this.isEditShow = true;
      this.isDeleteShow = true;
      localStorage.setItem('node_id', this.checked_array[0]);
      this.node_id = this.checked_array[0];
    } else if (this.checked_array.length >= 2) {
      this.isEditShow = false;
      this.isDeleteShow = true;
    } else if (this.checked_array.length < 1) {
      this.isEditShow = false;
      this.isDeleteShow = false;
    }
    localStorage.setItem('node_id', node_id);
    this.node_id = node_id;
    localStorage.setItem('node_name', node1_name);
  }

  getAllNode() {
    this._node.getAllNode().subscribe(
      data => {
        this.node_list = data;
        this.isLoading = false;
      },
      error => {
        this.node_list = [];
        this.isLoading = false;
        this.message.clear();
        this.message.add({
          severity: 'error',
          summary: 'Node - Error while fetching nodes',
          detail: error._body,
      });
    });
  }

  getNodeName() {
    this.node_name = localStorage.getItem('node_name');
  }

  createNode() {
    const newNode = {
      node_name: this.node1_name
    };
    this._node.addNode(newNode).subscribe( data => {
      this.getAllNode();
      this.message.clear();
      this.message.add({
        severity: 'check',
        summary: 'Creating Node: ' + newNode.node_name,
        detail: 'Successful',
      });
      this.getAllNode();
    },
    error => {
      this.message.clear();
      this.message.add({
        severity: 'error',
        summary: 'Error while creating Node: ' + newNode.node_name,
        detail: error._body,
      });
    });
  }

  updateNode() {
    const updatedNode = {
      node_id: this.node_id,
      node_name : this.node_name
    };

    this._node.updateNode(updatedNode).subscribe(data => {
      this.getAllNode();
      this.message.clear();
      this.message.add({
        severity: 'check',
        summary: 'Updating Node: '+updatedNode.node_name ,
        detail: data,
      });
    },
    error => {
      this.message.clear();
      this.message.add({
        severity: 'error',
        summary: 'Error while updating node '+updatedNode.node_name,
        detail: error._body,
      });
    });

    this.checked_array = [];
  }

  deleteNode() {
    this._node.deleteNodeById(this.node_id).subscribe(data => {
      this.isLoading = true;
      this.getAllNode();
      this.message.clear();
      this.message.add({
        severity: 'check',
        summary: 'Node -',
        detail: data,
      });
    },
    error => {
      this.message.clear();
      this.message.add({
        severity: 'error',
        summary: 'Node - Error while deleting node',
        detail: error._body,
      });
    });
  }

  launchNode(currentNode) {
    document.getElementById('startNode').style.display = 'block';
    this.currentNode = currentNode;
    this.downloadUrl = this.config.getConfig('jenkinsUrl') + 'computer/' + currentNode.node_name + '/slave-agent.jnlp';
  }
}
