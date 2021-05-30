module.exports = {
    entry: './server/main.js',
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'postcss-loader'],
        },
        {
          test: /\.jsx?$/,
          use: ['babel-loader', 'astroturf/loader'],
        },
        {
          test: /\.ttf$/,
          loader: "url-loader", // or directly file-loader
          include: path.resolve(__dirname, "node_modules/react-native-vector-icons"),
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread']
            }
          }
        },
      ],
      loaders: [
        {
          test: /\.(js|jsx)?$/,
          loader: 'babel-loader',
          query: {
             presets: ['es2015', 'react']
          }
        }
      ]
    }
  }