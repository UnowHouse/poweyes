'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"http://www.unow.top:10086/poweyes"',
  // BASE_SOCKET:'"ws://www.unow.top:10086/poweyes"'
  // BASE_API: '"http://139.199.61.250:10088/poweyes"',
  // BASE_SOCKET:'"ws://139.199.61.250:10088/poweyes"'
  	BASE_API: '"http://localhost:10088/poweyes"',
  	BASE_SOCKET:'"ws://localhost:10088/poweyes"'
})
