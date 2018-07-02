# SeqCompare
## Explanation about the submodules
The `projectSCE` submodule contains the python code.  
The `reactGUI` submodule contains the React files.
## How to
### Installation
The ```.deb``` file provided will install the project on the target machine - must be x64 architecture.
### Cloning the repository
Input the following in the terminal
* ```git clone https://github.com/tomikonio/SeqCompare.git```
* ```cd SeqCompare```
* ```git submodule init```
* ```git submodule update```
* ```npm install```
* ```cd projectSCE```
* ```mkdir venv```
* ```python3 -m venv venv```
* ```pip3 install -r requirements.txt```
* ```cd ..```
### Runing the code
In order to run the project you need to install [Electron Forge](https://electronforge.io/) by running:  
```npm install -g electron-forge``` - This will install the electron-forge CLI in the global scope.  
  
Now ```cd``` into the SeqCompare folder and run:  
```electron-forge start``` - This will start the project.
