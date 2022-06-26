![](https://edge.furret.codes/f/css-library-template.png)

# CSS Library Template

A scaffolding to create your own CSS library with easy build tools and post-processing, so
all you have to focus on is styling. Inspired by the water.css project structure and adapted
to work on Replit with additional features!

## Features

- Useful CSS scaffolding
- CSS Imports
- Theming capabilities
- Autoprefixing and Browser Support
- Minification
- Tooling for developers
- Detailed build statistics
- Browser previewing
- and more!

## Documentation

### Code Structure 

Your code will be entirely written in the [src/](#src/) directory. This section will
be structured according to the directories.

#### [src/builds/](#src/builds/)

This directory should likely remain static, but here you specify what builds for your CSS
will look like. By default, a main build, light theme build, and dark theme build have been
created, but you could import other partials to create custom builds. Each of these will
have a full and minified version to accompany it in the final distribution.

#### [src/preview/](#src/preview/)

This directory contains the files that will be used for the preview website. You can add
and write any static content here and it will be served to the browser. This is mostly
helpful for previewing but can also work as a client-facing example/documentation website.

#### [src/styles/](#src/styles/)

This directory contains all your CSS partials, assets, and themes. The
[src/styles/core.css](#src/styles/core.css) file is consumed by each of the builds (in
effect bundling all the partials). You can modify this behavior by changing imports in this
file and in the builds directory. [src/styles/variables.css](#src/styles/variables.css) file
contains global variables that are added to all files regardless of theme.

### Tooling

This Repl also contains some run scripts to make development easier!
```shell
# This command builds and bundles files,
# runs a server to display the css, and
# watches the src/ directory for changes
# to rebuild and refresh.
#
# The run button uses this command.
$ yarn dev

# This command will just build the files
# for the distribution and for the website
# without running a server.
$ yarn build

# These commands can be used to lint files.
$ yarn lint # checks css and js
$ yarn lint:css # checks css only
$ yarn lint:js # checks js only
$ yarn lint:fix # checks and fixes css and js errors

# These commands can be used to format files.
$ yarn format # checks for formatting issues
$ yarn format:fix # fixes formatting issues
```