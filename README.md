# Handymap
Geo service for visualize historical events and processes

##Setting up project for development

###Requrements
* Node JS 4.x
* Python 3.4
* Flask
* SQLAlhemy
* Flask-Failsafe
* Flask-Migrate
* Flask-Script
* Flask-SQLAlchemy
* Flask-User
* Flask-Via
* Coverage python module
* PostgreSQL

###Setting up
####Installing dependencies on Fedora linux
#####Install node 4 repository:
```
sudo dnf install -y https://rpm.nodesource.com/pub_4.x/fc/23/x86_64/nodesource-release-fc23-1.noarch.rpm
```
#####Nodejs, Python and system dependencies for it:
```
sudo dnf check-update
sudo dnf install -y nodejs gcc gcc-c++ make glibc-headers python3 python3-virtualenv python3-devel python3-psycopg2 postgresql postgresql-devel postgresql-server postgresql-contrib libffi-devel redhat-rpm-config
```
#####Setting up python environment:
Create virtual python environment:
```
cd path/to/your/project/folder
virtualenv-3.4 hm_env
```
where hm_env — name for your virtual environment for this project.

Switch to this environment:
```
source hm_env/bin/activate
```

Install project Python dependencies:
```
pip install -r requirements.txt
```
#####Install project NodeJS dependencies:
```
sudo npm install -g gulp-cli
npm install
```
Take a break while npm working on =)

#####Start PostgreSQL database server:
```
sudo postgresql-setup --initdb
sudo systemctl start postgresql
```
Enable autostart PostgreSQL database server on system boot:
```bash
sudo systemctl enable postgresql
```
Done! =)

##Development server
Use `gulp` for start dev server and serving frontend files:
```
gulp
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
If you want start only Python development server without serving frontent files use `manage.py`:
```
./manage.py runserver
```
To use Python shell in Handymap context:
```
./manage.py shell
```
