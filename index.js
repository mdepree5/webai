#!/usr/bin/env node

const { Command } = require('commander');
const program = new Command();

// Define the commands and options
program.name('webai').description('A CLI for webAI').version('1.0.0');

program
  .command('start')
  .description('Start something')
  .action(() => {
    console.log('Starting something...');
  });

program
  .command('stop')
  .description('Stop something')
  .action(() => {
    console.log('Stopping something...');
  });

// Parse command line arguments
program.parse(process.argv);
