#!/usr/bin/env node
const program = require('commander')

program.version(require('../package.json').version)

program
  .command('init <name>')
  .description('init project...')
  .action(require('../lib/init'))
  /* .action(name => {
    console.log('init ' + name)
  }) */

program
  .command('refresh')
  .description('refresh routers and menu')
  .action(require('../lib/refresh'))

program.parse(process.argv)
