# SeqCompare
## Explanation about the submodules
The `projectSce` submodule contains the python code.  
The `react-gui` submodule contains the React files.
### Screenshot
<img src="https://lh6.googleusercontent.com/MCALI22rG7xfScEWc_m5nAEqE2RPYp4VNBy-1pDkIuSHZ6bRGZL-9swOiZglGj7aT9vuQe2Wjpl3_-y90GSk=w1920-h943-rw" width="600">


## How to
### Installation
The ```.deb``` files provided in the [releases](https://github.com/tomikonio/SeqCompare/releases) will install the project on the target machine.
### Cloning the repository
Input the following in the terminal
* ```git clone https://github.com/tomikonio/SeqCompare.git```
* ```cd SeqCompare```
* ```git submodule init```
* ```git submodule update```
* ```npm install```
* ```cd projectSce```
* ```mkdir venv```
* ```python3 -m venv venv```
* ```source venv/bin/activate```
* ```pip3 install -r requirements.txt```
* ```cd ..```
### Runing the code
In order to run the project you need to install [Electron Forge](https://electronforge.io/) by running:  
```npm install -g electron-forge``` - This will install the electron-forge CLI in the global scope.  
  
Now ```cd``` into the SeqCompare folder and run:  
```electron-forge start``` - This will start the project.
