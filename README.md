# Webpack multi page template

This is my favorite `webpack.config.js` configuration and its sample project.

This configuration has following features.

- Multiple HTML output files with Pug template
- Multiple CSS output files with SASS precompile
- Multiple JS output files with Babel precompile
- CSS/JS inline printing on HTML (using `inline` query)
- Other files will be copied to destination directory
- Dev server and production build

## How to use

On development, execute `yarn watch` and a compiled html will open on your browser.

On production, execute `yarn build` and the compiled assets will generated on `./public` directory.

## License

```
Copyright (c) 2018 toduq
This `webpack.config.js` file is released under the MIT license.
https://opensource.org/licenses/MIT
```

(WARNING: Other files in this repository are NOT the MIT license.)
