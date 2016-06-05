# grunt-init-webepsb
Create a web app with Express and grunt automation for Pug templating engine,
Stylus css preprocessor and Browserify

## Installation
If you haven't already done so, install [grunt-init][]
[grunt-init]: http://gruntjs.com/project-scaffolding

Once grunt is installed place this template in your `~/.grunt-init` directory.
It's recommended that you git clone the repository into the directory.
```
git clone https://github.com/AHaliq/grunt-init-webepsb.git ~/.grunt-init/webepsb
```

## Usage
At the command-line, cd into an empty directory, run this command and follow the prompts.
```
grunt-init-webepsb
```
Default task is to clean `bin` and compiling all public `src` files, following
that starts `grunt-watch` which watches for changes and recompiles only the
changed files that triggers the task.
_Note that grunt-contrib-watch has an issue of not triggering task on file
creation. grunt watch will have to be rerun on new file creation._
```
grunt
```
The file structure for the project will be as follows:
```
root
|- index.js     express setup
|- lib          directory for assets (images, etc.)
|- bin          directory for static files web app serves
|  |- css
|  |- html
|  |- js
|- src
   |- pug
   |  |- tem    pug template/mixin files
   |  |- viw    pug views to be rendered
   |- sty
   |  |- tem    stylus template/mixin files
   |  |- viw    stylus files to be processed
   |- js
      |- frn    frontend js scripts to be browserified
      |- bck    server js scripts
```
Sub directories can be created in any of the leaf directories of the default
structure. 

_Note that this template will generate files in the current directory, so be
sure to change to a new directory first if you don't want to overwrite
existing files._
