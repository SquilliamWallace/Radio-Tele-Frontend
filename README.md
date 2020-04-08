# Radio-Tele-Frontend
Repository for the front end web application on the radio telescope project

# Setup

### Install VSCode
Install **Visual Studio Code** from <https://code.visualstudio.com/>. Follow the normal installation instructions and *accept all defaults*.

### Install Plugins
Install the following Plug-ins inside VSCode. To install plugins, launch VSCode select the building block icon on the left. Search for plugins by name in the search bar and then click "install". The plugins should then appear in the *Enabled* section.
* Auto Close Tag 
* Bracket Pair Colorizer
* Copy Relative Path
* Gitlens - Git Supercharged 
* Npm
* Npm intellisense
* One Monokai Theme
* Vetur
Do some research on these plugins to learn how to effectively use them. Especially focus on [Gitlens](https://gitlens.amod.io/) to learn how to manage your local repository in VSCode.

### Additional Installations
* Install Git from <https://git-scm.com/downloads>
* Install Node.JS/npm from <https://nodejs.org/en/>

### Clone Repostory
1. Launch VSCode
2. From the tabs at the top, select *Terminal* --> *New Terminal*
3. In the terminal, navigate to whatever directory you want to place your local repository in, and then execute the following command:  
`git clone https://github.com/YCPRadioTelescope/Radio-Tele-Frontend.git`  
This makes a local repostory in the current directory.
4. From the tabs at the top, select *File* --> *Open Folder* and then select the **vue-front-end** folder inside of the **Radio-Tele-Frontend** folder that was just cloned. The files should now appear in the file explorer on the left.
5. If the branch displayed at the bottom left does not say **development**, then click on it to open the branch selection dialogue box at the top. Then search for the **origin/development** branch and then select it to check out that branch.
**Note**: Check package.json for any dependencies marked with a “^” before the version number, this indicates automatic updating and can lead to problems down the road.

### Run the app
1. In the terminal, make sure you are in the **vue-front-end** directory and then type the following commands to install, build, and run the web application locally.  
   `npm run install`  
   `npm run build`  
   `npm run dev`  
   **Note**: If it fails to compile or run, try `npm run serve` instead.
2. Open any web browser and navigate to `localhost:8081`. If you see the landing page and can get to the login page, then the application is running successfully. 
From now on, you should be able to run the application using only the `npm run dev` command. You can now start developing!

### Setup Back-End Application
It is **highly recommended** that you also setup the back-end application so that you can host the back-end locally and eliminate dependency on the remote database. If AWS goes offline, or if you do not have internet, you can still continue developing by running both the front-end and back-end applications on localhost.  
To setup the back-end, see <https://github.com/YCPRadioTelescope/RT-Contracts>  
**Note**: Consider installing [Postman](https://www.postman.com/downloads/) for debugging API calls.

# Additionoal Information
### Learn Vue.JS
* To start your own vue project, see <https://cli.vuejs.org/guide/creating-a-project.html#vue-create>
* To understand the mechanics of Vue.JS, see <https://vuejs.org/v2/guide/>
* To understand the mechanics of Vuetify, see <https://vuetifyjs.com/en/getting-started/quick-start>

### AWS
Here is the link to the [AWS Management Console](https://317377631261.signin.aws.amazon.com/console "AWS Management Console"). See the back-end team to get credentials.