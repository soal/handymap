# Handymap
Geo service for visualize historical events and processes

##Setting up project for development

###Requrements
* Node JS 4.x

###Setting up
####Installing dependencies on Fedora linux
#####Install node 4 repository:
```
sudo dnf install https://rpm.nodesource.com/pub_4.x/fc/23/x86_64/nodesource-release-fc23-1.noarch.rpm
```
#####Nodejs and system dependencies for it:
```
sudo dnf check-update
sudo dnf install nodejs gcc gcc-c++ make glibc-headers
```
#####Install project NodeJS dependencies:
```
sudo npm install -g gulp-cli
npm install
```
Take a break while npm working on =)


##Development server
Use `gulp` for start dev server and serving frontend files:
```
gulp
```
To only build frontend files and not watch for changes:
```
gulp buildDev
```
To start all tests use:
```
gulp test
```
To start only backend tests:
```
gulp testServer
```
To start only frontend tests:
```
gulp testClient
```
