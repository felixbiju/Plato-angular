import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { trigger,state,style,transition,animate,keyframes } from '@angular/animations';

import { TestCaseFactoryService } from '../../shared/services/testcase-factory.service';
import { LoaderService } from '../../shared/services/loader.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { PortfolioService } from '../../shared/services/portfolio.service';
import { ProjectService } from '../../shared/services/project.service';
import { AccountService } from '../../shared/services/account.service';
import { NodeService } from '../../shared/services/node.service'

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

export class Scenario {
  constructor(public name: string, public description: string) { }
}

@Component({
  selector: 'app-test-configuration',
  templateUrl: './test-configuration.component.html',
  styleUrls: ['./test-configuration.component.css'],
  animations: [
    trigger('fadeIn', [
      transition('void => *', [
        style({opacity: 0}),
        animate(1500, style({opacity: 1}))
      ])
    ])
  ]
})

export class TestConfigurationComponent implements OnInit {

  selectedPortfolioName = '';
  selectedAccountName = '';
  selectedProjectName = '';
  currentScenario: any = null;
  currentRelease: any = null;
  portfolios: any[] = [];
  accounts: any[] = [];
  projects: any[] = [];
  selectedscenarioTransaction: any[] = [];
  oldSavedTransactions: any[] = [];
  scenario_name : string;
  myscenario_name : string;
  channels: any[] = [];
  products: any[] = [];
  scenarios: any[] = [];
  releases: any[] = [];
  releaseProductsandScenarios: any[] = [];
  transactions: any[] = [];
  nodes: any[] = [];

  selectedChannel = {
    channelName: '',
    id: ''
  };

  selectedProduct = {
    productName: '',
    id: ''
  };

  selectedScenario = {
    scenarioName: '',
    scenarioId: ''
  };

  selectedTransaction = {
    transaction_name: '',
    transactionName: ''
  };

  selectedRelease = {
    release_id: '',
    release_name: ''
  };

  newRelease = {
    release_name: '',
    channel: {
      id: '',
      channelName: ''
    }
  };

  isScenarioDeleted = false;
  selectedDataset = '';
  myReleaseCard = false;
  myTransactionCard = false;
  availableReleaseCard = '';
  availableTransactionCard = '';
  droppedTransactionCard = '';
  workflow = true;
  selectedNode = 'Node-2';
  stepRightMenuExpansion = 0;
  step = 0;
  stepRightSidenav = 0;
  draggedTransaction: any;
  droppedTransaction: any[] = [];

  constructor(private _tcService: TestCaseFactoryService, private _loader: LoaderService, private _message: MessageService,
              private portfolio: PortfolioService, private account: AccountService, private project: ProjectService,
              private message: MessageService, private _node: NodeService) { }

  ngOnInit() {
    this.getAllChannels();
    this.getAllNodes();
    this.getStoredNames();
  }

  getAllNodes() {
    this._tcService.getAllNodes().subscribe( nodes => {
      this.nodes = nodes;
    },
    err => {
      this._message.clear();
      this._message.add({
        severity: 'error',
        summary: 'Node get request',
        detail: 'HTTP Error & Status: ' + err.status
      });
    });
  }

  getStoredNames() {
    this.getPortfolioList();
    if ( !(localStorage.getItem('portfolio_name') === null) ) {
      this.selectedPortfolioName = localStorage.getItem('portfolio_name');
      this.selectedAccountName = localStorage.getItem('account_name');
      this.selectedProjectName = localStorage.getItem('project_name');
    }
  }

  selectPortfolioName(portfolio) {
    this.selectedPortfolioName = '';
    this.selectedAccountName = '';
    this.selectedProjectName = '';
    this.selectedRelease = null;
    this.selectedPortfolioName = portfolio.portfolio_name;

    localStorage.setItem('portfolio_id', portfolio.portfolio_id);
    localStorage.setItem('portfolio_name', portfolio.portfolio_name);
    this.getAccountList();
  }

  selectAccountName(account) {
    this.selectedAccountName = '';
    this.selectedProjectName = '';
    this.selectedAccountName = account.accountName;

    localStorage.setItem('account_id', account.accountId);
    localStorage.setItem('account_name', account.accountName);
    this.getProjectList();
  }

  getPortfolioList() {
    this.portfolio.getPortfolioList().subscribe( data => {
        this.portfolios = data;
      },
      err => {
        this.portfolios = [];
        this._message.clear();
        this._message.add({
          severity: 'error',
          summary: 'Portfolios get request',
          detail: 'HTTP Error! Status: ' + err.status,
        });
    });
  }

  getAccountList() {
    this.account.getAccountList(this.selectedPortfolioName).subscribe( data => {
      this.accounts = data;
    },
    err => {
      this.accounts = [];
      this._message.clear();
      this._message.add({
        severity: 'error',
        summary: 'Accounts get request',
        detail: 'HTTP Error! Status: ' + err.status,
      });
    });
  }

  getProjectList() {
    this.project.getProjectList( this.selectedPortfolioName, this.selectedAccountName ).subscribe( data => {
      this.projects = data;
    },
    err => {
      this.projects = [];
      this._message.clear();
      this._message.add({
        severity: 'error',
        summary: 'Projects get request',
        detail: 'HTTP Error! Status: ' + err.status,
      });
    });
  }

  selectProjectName(project) {
    localStorage.setItem('module_name', '');
    this.selectedProjectName = project.projectName;
    localStorage.setItem('project_id', project.project_id);
    localStorage.setItem('project_name', project.projectName);
  }

  setStepRightMenuExpansion(index: number) {
    this.stepRightMenuExpansion = index;
  }

  nextStepRightMenuExpansion() {
    this.stepRightMenuExpansion++;
  }

  setStep(index: number) {
    this.step = index;
  }

  setStepRightSidenav(index: number) {
    this.stepRightSidenav = index;
  }

  nextStep() {
    this.step++;
  }

  dragStart(event, transaction) {
    this.draggedTransaction = transaction;
  }

  dragEnd(event) {
    this.draggedTransaction = null;
  }

  drop(event) {
    switch (this.draggedTransaction.transaction_name.toLowerCase()) {
      case 'oos':
        if (this.droppedTransaction.length === 0 && this.selectedscenarioTransaction.length > 0) {
          if (this.selectedscenarioTransaction[this.selectedscenarioTransaction.length - 1].transactionName.toLowerCase() === 'mta') {
            this.droppedTransaction = [...this.droppedTransaction, this.draggedTransaction];
            this.draggedTransaction = null;
          } else {
            alert('Cannot perform ' + this.draggedTransaction.transaction_name.toUpperCase() + ' without Quote/New Business/Reinstatement');
          }
        } else if (this.droppedTransaction.length > 0) {
          if (this.droppedTransaction[this.droppedTransaction.length - 1].transaction_name.toLowerCase() === 'mta') {
            this.droppedTransaction = [...this.droppedTransaction, this.draggedTransaction];
            this.draggedTransaction = null;
          } else {
            alert('Cannot perform ' + this.draggedTransaction.transaction_name.toUpperCase() + ' without Quote/New Business/Reinstatement');
          }
        }
      break;

      case 'quote':
        if (this.selectedscenarioTransaction.length === 0 && this.droppedTransaction.length === 0) {
          this.droppedTransaction = [...this.droppedTransaction, this.draggedTransaction];
          this.draggedTransaction = null;
        } else {
          alert(this.draggedTransaction.transaction_name.toUpperCase() + ' is already present.');
        }
      break;

      case 'new business':
        if (this.selectedscenarioTransaction.length === 0 && this.droppedTransaction.length === 0) {
          this.droppedTransaction = [...this.droppedTransaction, this.draggedTransaction];
          this.draggedTransaction = null;
        } else {
          alert(this.draggedTransaction.transaction_name.toUpperCase() + ' is already present.');
        }
      break;

      case 'mta':
        if (this.droppedTransaction.length === 0 && this.selectedscenarioTransaction.length > 0) {
          if (this.selectedscenarioTransaction[this.selectedscenarioTransaction.length - 1].transactionName.toLowerCase() === 'quote' ||
          this.selectedscenarioTransaction[this.selectedscenarioTransaction.length - 1].transactionName.toLowerCase() === 'new business' ||
          this.selectedscenarioTransaction[this.selectedscenarioTransaction.length - 1].transactionName.toLowerCase() === 'mta' ||
          this.selectedscenarioTransaction[this.selectedscenarioTransaction.length - 1].transactionName.toLowerCase() === 'reinstatement'
          ) {
            this.droppedTransaction = [...this.droppedTransaction, this.draggedTransaction];
            this.draggedTransaction = null;
          } else {
            alert('Cannot perform ' + this.draggedTransaction.transaction_name.toUpperCase() + ' without Quote/New Business/Reinstatement');
          }
        } else if (this.droppedTransaction.length > 0) {
          if ( this.droppedTransaction[this.droppedTransaction.length - 1].transaction_name.toLowerCase() === 'quote' ||
          this.droppedTransaction[this.droppedTransaction.length - 1].transaction_name.toLowerCase() === 'new business' ||
          this.droppedTransaction[this.droppedTransaction.length - 1].transaction_name.toLowerCase() === 'mta' ||
          this.droppedTransaction[this.droppedTransaction.length - 1].transaction_name.toLowerCase() === 'reinstatement') {
            this.droppedTransaction = [...this.droppedTransaction, this.draggedTransaction];
            this.draggedTransaction = null;
          } else {
            alert('Cannot perform ' + this.draggedTransaction.transaction_name.toUpperCase() + ' without Quote/New Business/Reinstatement');
          }
        }
      break;

      case 'renewal':
        if (this.droppedTransaction.length === 0 && this.selectedscenarioTransaction.length > 0) {
          if (this.selectedscenarioTransaction[this.selectedscenarioTransaction.length - 1].transactionName.toLowerCase() === 'quote' ||
          this.selectedscenarioTransaction[this.selectedscenarioTransaction.length - 1].transactionName.toLowerCase() === 'new business' ||
          this.selectedscenarioTransaction[this.selectedscenarioTransaction.length - 1].transactionName.toLowerCase() === 'mta' ||
          this.selectedscenarioTransaction[this.selectedscenarioTransaction.length - 1].transactionName.toLowerCase() === 'reinstatement' ||
          this.selectedscenarioTransaction[this.selectedscenarioTransaction.length - 1].transactionName.toLowerCase() === 'oos' ||
          this.selectedscenarioTransaction[this.selectedscenarioTransaction.length - 1].transactionName.toLowerCase() === 'renewal'
          ) {
            this.droppedTransaction = [...this.droppedTransaction, this.draggedTransaction];
            this.draggedTransaction = null;
          } else {
            alert('Cannot perform ' + this.draggedTransaction.transaction_name.toUpperCase() + ' without Quote/New Business/Reinstatement');
          }
        } else if (this.droppedTransaction.length > 0) {
          if ( this.droppedTransaction[this.droppedTransaction.length - 1].transaction_name.toLowerCase() === 'quote' ||
          this.droppedTransaction[this.droppedTransaction.length - 1].transaction_name.toLowerCase() === 'new business' ||
          this.droppedTransaction[this.droppedTransaction.length - 1].transaction_name.toLowerCase() === 'mta' ||
          this.droppedTransaction[this.droppedTransaction.length - 1].transaction_name.toLowerCase() === 'reinstatement' ||
          this.droppedTransaction[this.droppedTransaction.length - 1].transaction_name.toLowerCase() === 'oos' ||
          this.droppedTransaction[this.droppedTransaction.length - 1].transaction_name.toLowerCase() === 'renewal'
          ) {
            this.droppedTransaction = [...this.droppedTransaction, this.draggedTransaction];
            this.draggedTransaction = null;
          } else {
            alert('Cannot perform ' + this.draggedTransaction.transaction_name.toUpperCase() + ' without Quote/New Business/Reinstatement');
          }
        }
      break;

      case 'revised renewal':
        if (this.droppedTransaction.length === 0 && this.selectedscenarioTransaction.length > 0) {
          if (this.selectedscenarioTransaction[this.selectedscenarioTransaction.length - 1].transactionName.toLowerCase() === 'renewal') {
            this.droppedTransaction = [...this.droppedTransaction, this.draggedTransaction];
            this.draggedTransaction = null;
          } else {
            alert('Cannot perform ' + this.draggedTransaction.transaction_name.toUpperCase() + ' without Quote/New Business/Reinstatement');
          }
        } else if (this.droppedTransaction.length > 0) {
          if ( this.droppedTransaction[this.droppedTransaction.length - 1].transaction_name.toLowerCase() === 'renewal') {
            this.droppedTransaction = [...this.droppedTransaction, this.draggedTransaction];
            this.draggedTransaction = null;
          } else {
            alert('Cannot perform ' + this.draggedTransaction.transaction_name.toUpperCase() + ' without Quote/New Business/Reinstatement');
          }
        }
      break;

      case 'cancellation':
        if (this.droppedTransaction.length === 0 && this.selectedscenarioTransaction.length > 0) {
          if ( this.selectedscenarioTransaction[this.selectedscenarioTransaction.length - 1].transactionName.toLowerCase() === 'quote' ||
          this.selectedscenarioTransaction[this.selectedscenarioTransaction.length - 1].transactionName.toLowerCase() === 'new business' ||
          this.selectedscenarioTransaction[this.selectedscenarioTransaction.length - 1].transactionName.toLowerCase() === 'mta' ||
          this.selectedscenarioTransaction[this.selectedscenarioTransaction.length - 1].transactionName.toLowerCase() === 'reinstatement') {
            this.droppedTransaction = [...this.droppedTransaction, this.draggedTransaction];
            this.draggedTransaction = null;
          } else {
            alert('Cannot perform ' + this.draggedTransaction.transaction_name.toUpperCase() + ' without Quote/New Business/MTA/Reinstatement');
          }
        } else if (this.droppedTransaction.length > 0) {
          if ( this.droppedTransaction[this.droppedTransaction.length - 1].transaction_name.toLowerCase() === 'quote' ||
          this.droppedTransaction[this.droppedTransaction.length - 1].transaction_name.toLowerCase() === 'new business' ||
          this.droppedTransaction[this.droppedTransaction.length - 1].transaction_name.toLowerCase() === 'mta' ||
          this.droppedTransaction[this.droppedTransaction.length - 1].transaction_name.toLowerCase() === 'reinstatement') {
            this.droppedTransaction = [...this.droppedTransaction, this.draggedTransaction];
            this.draggedTransaction = null;
          } else {
            alert('Cannot perform ' + this.draggedTransaction.transaction_name.toUpperCase() + ' without Quote/New Business/MTA/Reinstatement');
          }
        }
      break;

      case 'reinstatement':
        if (this.droppedTransaction.length === 0 && this.selectedscenarioTransaction.length > 0) {
          if ( this.selectedscenarioTransaction[this.selectedscenarioTransaction.length - 1].transactionName.toLowerCase() === 'cancellation') {
            this.droppedTransaction = [...this.droppedTransaction, this.draggedTransaction];
            this.draggedTransaction = null;
          } else {
            alert('Cannot perform ' + this.draggedTransaction.transaction_name.toUpperCase() + ' without Cancellation');
          }
        } else if (this.droppedTransaction.length > 0) {
          if ( this.droppedTransaction[this.droppedTransaction.length - 1].transaction_name.toLowerCase() === 'cancellation') {
            this.droppedTransaction = [...this.droppedTransaction, this.draggedTransaction];
            this.draggedTransaction = null;
          } else {
            alert('Cannot perform ' + this.draggedTransaction.transaction_name.toUpperCase() + ' without Cancellation');
          }
        }
      break;
    }
  }

  getAllChannels() {
    this._tcService.getAllChannel().subscribe(channels => {
      this.channels = channels;
    },
    err => {
      this.channels = [];
      this._message.clear();
      this._message.add({
        severity: 'error',
        summary: 'Channel get request',
        detail: 'HTTP Error! Status: ' + err.statusText,
      });
    });
  }

  selectDatasetName(dataset) {
    this.selectedDataset = dataset;
    document.getElementById('transactionDataModal').style.display = 'block';
  }

  getProductsByChannelId(channel) {
    this.selectedChannel = channel;
    this.transactions = [];
    localStorage.setItem('channel', JSON.stringify(channel));
    this._tcService.getProductsByChannelId(channel).subscribe( products => {
      this.products = products;
      this.selectedProduct.id = null;
      this.selectedProduct.productName = '';
      this.selectedScenario.scenarioId = null;
      this.selectedScenario.scenarioName = '';
      this.selectedRelease.release_id = null;
      this.selectedRelease.release_name = '';
      this.currentScenario = null;
      this.currentRelease = null;
    },
    err => {
      this.products = [];
      this._message.clear();
      this._message.add({
        severity: 'error',
        summary: 'Products get request',
        detail: 'HTTP Error! Status: ' + err.status,
      });
    });
  }

  getSecnariosByChannelIdAndProductId(product) {
    this.selectedProduct = product;
    this.scenarios = [];
    this.selectedScenario.scenarioId = null;
    this.selectedScenario.scenarioName = null;
    localStorage.setItem('product', JSON.stringify(product));
    this._tcService.getSecnariosByChannelIdAndProductId(JSON.parse(localStorage.getItem('channel')),
    product).subscribe( scenarios => {
      this.scenarios = scenarios;
      if (this.currentScenario === null) {
        console.log('Current scenario loaded.');
        this.selectedScenario.scenarioId = null;
        this.selectedScenario.scenarioName = '';
        this.selectedscenarioTransaction = [];
        this._loader.changeLoaderStatus(false);
      } else if (this.currentScenario !== null) {
        console.log('Current scenario loaded.');
        this._loader.changeLoaderStatus(false);
        this.setSelectedScenario(this.currentScenario);
      }
    },
    err => {
      this.scenarios = [];
      this._message.clear();
      this._message.add({
        severity: 'error',
        summary: 'Scenarios get request',
        detail: 'HTTP Error! Status: ' + err.status,
      });
    });
  }

  createScenario() {
    this._loader.changeLoaderStatus(true);
    const product = JSON.parse(localStorage.getItem("product"));
    const newScenario = {
      channel: JSON.parse(localStorage.getItem("channel")),
      product: JSON.parse(localStorage.getItem("product")),
      scenarioName: this.scenario_name,
      transactions: []
    }
    this._tcService.addScenario(newScenario).subscribe( data => {
      this.getSecnariosByChannelIdAndProductId(product);
      // this._loader.changeLoaderStatus(false);
    },
    err => {
      this._loader.changeLoaderStatus(false);
      this._message.clear();
      this._message.add({
        severity: 'error',
        summary: 'Scenarios create request',
        detail: 'HTTP Error! Status: ' + err.status,
      });
    });
 }

  deleteScenariobyId(scenario) {
    this._loader.changeLoaderStatus(true);
    const product = JSON.parse(localStorage.getItem('product'));
    if (this.currentScenario !== null) {
      if (this.currentScenario.scenarioId === scenario.scenarioId) {
        this.selectedScenario.scenarioId = null;
        this.selectedScenario.scenarioName = null;
        this.currentScenario = null;
      } else {
        this.selectedScenario.scenarioId = scenario.scenarioId;
        this.selectedScenario.scenarioName = scenario.scenarioName;
      }
    }
    this._tcService.deleteScenariobyId(scenario).subscribe( data => {
      this.getSecnariosByChannelIdAndProductId(product);
      // this._loader.changeLoaderStatus(false);
    },
    err => {
      this._loader.changeLoaderStatus(false);
      this._message.clear();
      this._message.add({
        severity: 'error',
        summary: 'Scenarios delete request',
        detail: 'HTTP Error! Status: ' + err.status,
      });
    });
  }

  setSelectedScenario(scenario) {
    if (scenario !== null) {
      this.currentScenario = scenario;
      this.toggleWorkFlow(true);
      localStorage.setItem('currentScenario', JSON.stringify(scenario));
      this.selectedscenarioTransaction = [];
      this.droppedTransaction = [];
      this.selectedScenario.scenarioId = scenario.scenarioId;
      this.selectedScenario.scenarioName = scenario.scenarioName;
      localStorage.setItem('copiedTransaction', JSON.stringify(scenario.transactions));
      this.selectedscenarioTransaction = scenario.transactions;
      this.oldSavedTransactions = scenario.transactions;
    }
  }

  createSelectedScenario() {
    this._loader.changeLoaderStatus(true);
    const product = JSON.parse(localStorage.getItem('product'));
    const newScenario = {
      channel: JSON.parse(localStorage.getItem('channel')),
      product: JSON.parse(localStorage.getItem('product')),
      scenarioName: this.myscenario_name,
      transactions:JSON.parse(localStorage.getItem('copiedTransaction'))
    };
    this._tcService.addScenario(newScenario).subscribe( data => {
      localStorage.setItem('currentScenario', JSON.stringify(data));
      this.currentScenario = data;
      this.getSecnariosByChannelIdAndProductId(product);
      // this._loader.changeLoaderStatus(false);
    },
    err => {
      this._loader.changeLoaderStatus(false);
      this._message.clear();
      this._message.add({
        severity: 'error',
        summary: 'Scenario copy Request',
        detail: 'HTTP Error! Status: ' + err.status,
      });
    });
  }

  createTransactionByScenario() {
    if (this.droppedTransaction.length > 0 || this.selectedscenarioTransaction.length > 0) {
      this._loader.changeLoaderStatus(true);
      let formattedTransactions: any[] = [];
      let order = this.selectedscenarioTransaction.length;
      // Adding newly dropped transactions in scenario
      this.droppedTransaction.forEach( element => {
        let newArr: any[] = [];
        newArr.push(element);
        let newObject = {
          transactionName: element.transaction_name,
          order: order++,
          datasets: newArr,
        };
        formattedTransactions.push(newObject);
      });
      const newScenario = {
        channel: JSON.parse(localStorage.getItem('channel')),
        product: JSON.parse(localStorage.getItem('product')),
        scenarioId: this.selectedScenario.scenarioId,
        scenarioName: this.selectedScenario.scenarioName,
        transactions: this.selectedscenarioTransaction.concat(formattedTransactions)
      };
      this._tcService.addTransactionByScenario(newScenario).subscribe( createdScenario => {
        this.droppedTransaction = [];
        this.currentScenario = createdScenario;
        this.getSecnariosByChannelIdAndProductId(JSON.parse(localStorage.getItem('product')));
        // this._loader.changeLoaderStatus(false);
      },
      err => {
        this.getSecnariosByChannelIdAndProductId(JSON.parse(localStorage.getItem('product')));
        this._loader.changeLoaderStatus(false);
        this._message.clear();
        this._message.add({
          severity: 'error',
          summary: 'Transactions request',
          detail: 'HTTP Error! Status: ' + err.status,
        });
      });
    } else {
      console.log('Nothing to create.');
    }
  }

  getAllProductsandScenariosByChannel(channel) {
    this._tcService.getAllProductsandScenariosByChannel(channel).subscribe(products => {
      this.releaseProductsandScenarios = products;
    },
    err => {
      this.releaseProductsandScenarios = [];
      this._message.clear();
      this._message.add({
        severity: 'error',
        summary: 'Products & Scenarios request',
        detail: 'HTTP Error! Status: ' + err.status,
      });
    });
  }

  getAllTransactionsByChannel(product) {
    this.transactions = [];
    const tranObj = {
      portfolio_name: localStorage.getItem('portfolio_name'),
      account_name: localStorage.getItem('account_name'),
      project_name: localStorage.getItem('project_name'),
      user_name: localStorage.getItem('user'),
      channel_name: JSON.parse(localStorage.getItem('channel')).channelName,
      product_name: product.productName
    }
    this._tcService.getAllTransactionsByChannelName(tranObj).subscribe( transactions => {
      this.transactions = transactions;
    },
    err => {
      this.transactions = [];
      this._message.clear();
      this._message.add({
        severity: 'error',
        summary: 'Transactions get request',
        detail: 'HTTP Error! Status: ' + err.status,
      });
    });
  }

  toggleWorkFlow(value) {
    if (value === 'true') {
      this.workflow = true;
      this.myReleaseCard = false;
      this.availableReleaseCard = '';
    } else if (value === 'false') {
      this.workflow = false;
      this.myTransactionCard = false;
      this.availableTransactionCard = '';
      this.droppedTransactionCard = '';
    }
  }

  toggleCards(cardName) {
    if (cardName === 'myReleaseCard') {
      this.myTransactionCard = false;
      this.myReleaseCard = !this.myReleaseCard;
      this.availableReleaseCard = '';
    } else if (cardName === 'myTransactionCard') {
      this.myReleaseCard = false;
      this.myTransactionCard = !this.myTransactionCard;
    } else if (cardName === '') {
      this.myReleaseCard = false;
      this.myTransactionCard = false;
    }
  }

  toggleReleaseCard(release) {
    localStorage.setItem('currentRelease', JSON.stringify(release));
    if (this.availableReleaseCard === '') {
      this.availableReleaseCard = release.release_id;
      this.selectedRelease.release_id = release.release_id;
      this.selectedRelease.release_name = release.release_name;
    } else if (this.availableReleaseCard !== '' && release !== null) {
      this.selectedRelease.release_id = release.release_id;
      this.selectedRelease.release_name = release.release_name;
      this.availableReleaseCard = release.release_id;
    } else if (this.availableReleaseCard !== '' && release === '') {
      this.availableReleaseCard = '';
    } else if (this.availableReleaseCard === '' && release === null) {
      this.availableReleaseCard = '';
    }
  }

  toggleTransactionsCard(transaction) {
    if (this.availableTransactionCard === transaction.scenarioTransactionMappingId) {
      this.availableTransactionCard = '';
    } else if (this.availableTransactionCard !== transaction.scenarioTransactionMappingId) {
      this.availableTransactionCard = transaction.scenarioTransactionMappingId;
    }
  }

  toggleDroppedTransactionsCard(transaction) {
    if (this.droppedTransactionCard === transaction.transaction_name) {
      this.droppedTransactionCard = '';
    } else if (this.droppedTransactionCard !== transaction.transaction_name) {
      this.droppedTransactionCard = transaction.transaction_name;
    }
  }

  createReleaseByChannel() {
    this._loader.changeLoaderStatus(true);
    this.releaseProductsandScenarios.forEach( product => {
      if(product.product_run_status === true) {
        product.product_run_status = 'yes';
      } else if (product.product_run_status === false || product.product_run_status === '') {
        product.product_run_status = 'no';
      }
      product.scenario.forEach( scenario => {
        if(scenario.scenario_run_status === true) {
          scenario.scenario_run_status = 'yes';
        } else if (scenario.scenario_run_status === false || scenario.scenario_run_status === '') {
          scenario.scenario_run_status = 'no';
        }
      });
    });
    const newRelease = {
      release_name: this.newRelease.release_name,
      channel_id: this.newRelease.channel.id,
      channel_name: this.newRelease.channel.channelName,
      products: this.releaseProductsandScenarios
    };
    this._tcService.createReleaseByChannel(newRelease).subscribe( data => {
      data.products.forEach(product => {
        if (product.product_run_status === 'yes') {
          product.product_run_status = true;
        } else if (product.product_run_status === 'no' || product.product_run_status === '') {
          product.product_run_status = false;
        }
        product.scenario.forEach( scenario => {
          if(scenario.scenario_run_status === 'yes') {
            scenario.scenario_run_status = true;
          } else if (scenario.scenario_run_status === 'no' || scenario.scenario_run_status === '') {
            scenario.scenario_run_status = false;
          }
        });
      });
      this.currentRelease = data;
      this.getAllReleasesByChannel(JSON.parse(localStorage.getItem('channel')));
      // this._loader.changeLoaderStatus(false);
    },
    err => {
      this._loader.changeLoaderStatus(false);
      this._message.clear();
      this._message.add({
        severity: 'error',
        summary: 'Release create request',
        detail: 'HTTP Error! Status: ' + err.status,
      });
    });
  }

  updateRelease(updatedRelease) {
    this._loader.changeLoaderStatus(true);
    updatedRelease.products.forEach( product => {
      if(product.product_run_status === true) {
        product.product_run_status = 'yes';
      } else if (product.product_run_status === false || product.product_run_status === '') {
        product.product_run_status = 'no';
      }
      product.scenario.forEach( scenario => {
        if(scenario.scenario_run_status === true) {
          scenario.scenario_run_status = 'yes';
        } else if (scenario.scenario_run_status === false || scenario.scenario_run_status === '') {
          scenario.scenario_run_status = 'no';
        }
      });
    });
    this._tcService.updateRelease(updatedRelease).subscribe( data => {
      data.products.forEach(product => {
        if(product.product_run_status === 'yes') {
          product.product_run_status = true;
        } else if (product.product_run_status === 'no' || product.product_run_status === '') {
          product.product_run_status = false;
        }
        product.scenario.forEach( scenario => {
          if(scenario.scenario_run_status === 'yes') {
            scenario.scenario_run_status = true;
          } else if (scenario.scenario_run_status === 'no' || scenario.scenario_run_status === '') {
            scenario.scenario_run_status = false;
          }
        });
      });
      this.currentRelease = data;
      this.releases = [];
      this.getAllReleasesByChannel(this.selectedChannel);
      // this._loader.changeLoaderStatus(false);
    },
    err => {
      this._loader.changeLoaderStatus(false);
      this._message.clear();
      this._message.add({
        severity: 'error',
        summary: 'Release update Request - ',
        detail: 'HTTP Error & Status: ' + err.status,
      });
    });
  }

  deleteReleaseById(release) {
    this._loader.changeLoaderStatus(true);
    if (this.currentRelease !== null) {
      if (this.currentRelease.release_id === release.release_id) {
        this.toggleReleaseCard('');
        this.currentRelease = null;
        this.selectedRelease.release_id = null;
        this.selectedRelease.release_name = null;
      }
    }
    this._tcService.deleteReleaseById(release).subscribe(data => {
      this.releases = [];
      this.getAllReleasesByChannel(this.selectedChannel);
      // this._loader.changeLoaderStatus(false);
      this.message.clear();
      this.message.add({
        severity: 'info',
        summary: 'Release Delete - ',
        detail: 'Delete Successfuly.'
      });
    },
    err => {
      this._loader.changeLoaderStatus(false);
      this.message.clear();
      this.message.add({
        severity: 'error',
        summary: 'Release Delete - ',
        detail: 'HTTP Error & Status: ' + err.status,
      });
    });
  }

  getAllReleasesByChannel(channel) {
    this.releases = [];
    this._tcService.getAllReleasesByChannel(channel).subscribe( releases => {
      this.releases = releases;
      this.releases.forEach( release => {
        release.products.forEach(product => {
          if(product.product_run_status === 'yes') {
            product.product_run_status = true;
          } else if (product.product_run_status === 'no' || product.product_run_status === '') {
            product.product_run_status = false;
          }
          product.scenario.forEach( scenario => {
            if(scenario.scenario_run_status === 'yes') {
              scenario.scenario_run_status = true;
            } else if (scenario.scenario_run_status === 'no' || scenario.scenario_run_status === '') {
              scenario.scenario_run_status = false;
            }
          });
        });
      });
      if (this.currentRelease === null) {
        console.log('No current release.');
        this.toggleCards('');
        this.toggleReleaseCard('');
        this.selectedRelease.release_id = null;
        this.selectedRelease.release_name = null;
        this._loader.changeLoaderStatus(false);
      } else if (this.currentRelease !== null) {
        console.log('Current release loaded.');
        this.toggleCards('');
        this._loader.changeLoaderStatus(false);
        this.toggleReleaseCard(this.currentRelease);
      }
    },
    err => {
      this.releases = [];
      this._loader.changeLoaderStatus(false);
      this._message.clear();
      this._message.add({
        severity: 'error',
        summary: 'Scenarios create request',
        detail: 'HTTP Error! Status: ' + err.status,
      });
    });
  }
}
