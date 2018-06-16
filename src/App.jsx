import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
import Table from '../react-gui/src/Table';
import DropdownTable from '../react-gui/src/DropdownTable';
// import './Center.css';
const { dialog } = require('electron').remote;
const fs = require('fs');
const nodePath = require('path');

class File {
  constructor(fileName, matchType, orderNumber) {
    this.fileName = fileName;
    this.matchType = matchType;
    this.orderNumber = orderNumber;
  }
}

function checkIfCompare(folderPath) {
  const files = fs.readdirSync(String(folderPath));
  for (const file of files) {
    if (file.startsWith('compare')) {
      console.log('compare', file);
      return true;
    }
  }
  return false;
}

// const allFiles = ["hello", "world", "shushu"];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // path: "",
      // Need to change this and the secondary one later when connected with the backend.
      allFiles: [],
      primaryFile: '',
      secondaryFiles: [],
      fileDict: {},
      resetKey: '1',
    };

    this.primaryFileSelect = this.primaryFileSelect.bind(this);
    this.matchValueChanged = this.matchValueChanged.bind(this);
    this.orderValueChanged = this.orderValueChanged.bind(this);
    this.openDialog = this.openDialog.bind(this);
  }

  createDict(secondaryFiles) {
    const fileDict = {};
    for (const filename of secondaryFiles) {
      fileDict[filename] = new File(filename, 'match', '1');
    }
    return fileDict;
  }

  calcSecondery(primaryFile = this.state.allFiles[0], allFiles = this.state.allFiles) {
    const index = allFiles.indexOf(primaryFile);
    const newSecondary = [...allFiles];
    newSecondary.splice(index, 1);
    return newSecondary;
  }

  matchValueChanged(filename, matchType) {
    // const primary = this.state.primaryFile;
    const newFileDict = Object.assign({}, this.state.fileDict);
    for (const file in newFileDict) {
      if (newFileDict[file].fileName === filename) {
        newFileDict[file] = new File(filename, matchType, newFileDict[file].orderNumber);
      }
    }
    this.setState({ fileDict: newFileDict }, () => {
      console.log('filedict: ', this.state.fileDict);
    });
  }

  orderValueChanged(filename, orderNumber) {
    // const primary = this.state.primaryFile;
    const newFileDict = Object.assign({}, this.state.fileDict);
    for (const file in newFileDict) {
      if (newFileDict[file].fileName === filename) {
        newFileDict[file] = new File(filename, newFileDict[file].matchType, orderNumber);
      }
    }
    this.setState({ fileDict: newFileDict }, () => {
      console.log('filedict: ', this.state.fileDict);
    });
  }

  primaryFileSelect(primaryFile) {
    const secondaryCopy = this.calcSecondery(primaryFile);
    const newFileDict = this.createDict(secondaryCopy);
    const newResetKey = `${this.state.resetKey}1`;
    this.setState(
      {
        secondaryFiles: secondaryCopy,
        primaryFile,
        fileDict: newFileDict,
        resetKey: newResetKey,
      },
      () => {
        console.log(this.state.fileDict);
      },
    );
  }

  openDialog() {
    const folderPath = dialog.showOpenDialog({
      properties: ['openDirectory'],
    });
    const fastaFiles = [];
    const files = fs.readdirSync(String(folderPath));
    if (checkIfCompare(folderPath) === false) {
      for (const file of files) {
        if (nodePath.extname(file) === '.fasta') {
          fastaFiles.push(file);
        }
      }
      if (fastaFiles.length < 2) {
        dialog.showMessageBox({
          message: `The folder: "${folderPath}" needs to have at least 2 ".fasta" files`,
          type: 'warning',
        });
      } else {
        const newSecondary = this.calcSecondery(fastaFiles[0], fastaFiles);
        const newFileDict = this.createDict(newSecondary);
        this.setState(
          {
            secondaryFiles: newSecondary,
            primaryFile: fastaFiles[0],
            allFiles: fastaFiles,
            fileDict: newFileDict,
          },
          () => {
            console.log(this.state);
          },
        );
      }
    } else {
      dialog.showMessageBox({
        message: `The folder: "${folderPath}" contains a folder/file name "compare_", please remove this folder/file before choosing this location again`,
        type: 'warning',
      });
    }
  }

  render() {
    return (
      <div className="App pa3">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p> */}
        <div className="center">
          <label htmlFor="pathChoose" className="pa1">
            Select a Folder:
          </label>
          <button
            className="f6 link dim ba ph3 pv1 mb2 dib black"
            href="#0"
            id="pathChoose"
            onClick={this.openDialog}
          >
            Browse...
          </button>
        </div>
        <br />
        <div className="center">
          <label htmlFor="primary" className="pa1">
            Select a primary file:
          </label>
          <DropdownTable
            selectOptions={this.state.allFiles}
            onValueChange={this.primaryFileSelect}
            id="primary"
          />
        </div>
        <br />
        <Table
          files={this.state.secondaryFiles}
          onMatchValueChange={this.matchValueChanged}
          onOrderValueChange={this.orderValueChanged}
          resetKey={this.state.resetKey}
        />
      </div>
    );
  }
}

export default App;
