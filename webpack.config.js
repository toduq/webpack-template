const path = require('path')
const globule = require('globule')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

// Dependencies
// yarn add apply-loader autoprefixer babel-core babel-loader babel-preset-env css-loader copy-webpack-plugin extract-text-webpack-plugin@next globule node-sass postcss-loader pug pug-loader raw-loader sass-loader webpack webpack-cli webpack-serve

const opts = {
  src: path.join(__dirname, 'src'),
  dest: path.join(__dirname, 'public')
}

const extensionConversions = {
  pug: 'html',
  sass: 'css',
  js: 'js'
}

const files = {}
Object.keys(extensionConversions).forEach(from => {
  const to = extensionConversions[from]
  globule.find([`**/*.${from}`, `!**/_*.${from}`], {cwd: opts.src}).forEach(filename => {
    files[filename.replace(new RegExp(`.${from}$`, 'i'), `.${to}`)] = path.join(opts.src, filename)
  })
})

const pugLoader = [
  'apply-loader',
  'pug-loader'
]

const sassLoader = [
  {
    loader: 'css-loader',
    options: {
      minimize: true
    }
  },
  {
    loader: 'postcss-loader',
    options: {
      ident: 'postcss',
      plugins: (loader) => [require('autoprefixer')()]
    }
  },
  'sass-loader'
]

const jsLoader = {
  loader: 'babel-loader',
  query: {
    presets: ['env']
  }
}

module.exports = {
  context: opts.src,
  entry: files,
  output: {
    filename: '[name]',
    path: opts.dest
  },
  mode: process.env.WEBPACK_SERVE ? 'development' : 'production',
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: ExtractTextPlugin.extract(pugLoader)
      },
      {
        test: /\.sass$/,
        oneOf: [
          {
            resourceQuery: /inline/,
            use: sassLoader
          },
          {
            use: ExtractTextPlugin.extract(sassLoader)
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules(?!\/webpack-dev-server)/,
        oneOf: [
          {
            resourceQuery: /inline/,
            use: [
              'raw-loader',
              jsLoader
            ]
          },
          {
            use: jsLoader
          }
        ]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('[name]'),
    new CopyWebpackPlugin(
      [{from: {glob: '**/*', dot: true}}],
      {ignore: Object.keys(extensionConversions).map((ext) => `*.${ext}`)}
    )
  ],
  serve: {
    content: opts.dest,
    open: true
  }
}
