# Handymap
Geo service for visualize historical events and processes

## Setting up project for development

### Requrements
* Node JS 6.x

### Setting up
#### Installing dependencies on Fedora linux
##### Install node 4 repository:
``` bash
sudo dnf install https://rpm.nodesource.com/pub_6.x/fc/23/x86_64/nodesource-release-fc23-1.noarch.rpm
```
##### Nodejs and system dependencies for it:
``` bash
sudo dnf check-update
sudo dnf install nodejs gcc gcc-c++ make glibc-headers
```
##### Install project NodeJS dependencies:
``` bash
npm install
```
Take a break while npm working on =)


## Build Setup
####  Serve at localhost:8080
``` bash
npm run dev
```

#### Build for production with minification
``` bash
npm run build
```

#### Lint all \*.js and \*.vue files
``` bash
npm run lint
```

#### Run unit tests
``` bash
npm test
```
