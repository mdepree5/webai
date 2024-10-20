#!/usr/bin/env node

import { Command } from 'commander';
import inquirer from 'inquirer';
import fs from 'fs-extra';
import path from 'path';

const program = new Command();

// Snake Case helper function`
function toSnakeCase(text) {
  return text
    .trim() // Remove leading/trailing spaces
    .toLowerCase() // Convert the entire string to lowercase
    .replace(/[\s\W-]+/g, '_'); // Replace spaces and non-word characters with underscores
}

// Kebab Case helper function
function toKebabCase(text) {
  return text
    .trim() // Remove leading/trailing spaces
    .toLowerCase() // Convert the entire string to lowercase
    .replace(/[\s\W_]+/g, '-'); // Replace spaces, non-word characters, and underscores with hyphens
}

// Function to create folder structure and boilerplate files
function createRepository(elementName) {
  const kebabElementName = toKebabCase(elementName);
  const repoPath = path.join(process.cwd(), kebabElementName);

  // Create the directory
  if (fs.existsSync(repoPath)) {
    console.log('Directory already exists.');
    process.exit(1);
  } else {
    fs.mkdirSync(repoPath);
    console.log(`Created directory: ${kebabElementName}`);
  }

  // Create element subdirectory
  const snakeElementName = toSnakeCase(kebabElementName);
  const elementSubDirectory = path.join(repoPath, snakeElementName);
  fs.mkdirSync(elementSubDirectory);
  const initFilePathName = path.join(snakeElementName, '__init__.py');

  // Create boilerplate files
  const files = [
    {
      fileName: 'README.md',
      content: `# ${kebabElementName}\n\nA new project repository.`,
    },
    {
      fileName: '.gitignore',
      content: 'node_modules\n.DS_Store\n',
    },
    {
      fileName: initFilePathName,
      content: `// Entry point for ${kebabElementName}\nprint('Hello World!');`,
    },
  ];

  for (const file of files) {
    const filePath = path.join(repoPath, file.fileName);
    fs.writeFileSync(filePath, file.content);
    console.log(`Created file: ${filePath}`);
  }

  console.log(`Element ${kebabElementName} setup is complete`);
}

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

program
  // .command('create-new-element <repo-name>')
  .command('create-new-element')
  .description('Create a new local element with boilerplate')
  .action(() => {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'elementName',
          message: 'Enter the name of your element:',
          validate: (input) => (input ? true : 'Element Name cannot be empty.'),
        },
      ])
      .then((answers) => {
        const { elementName } = answers;
        createRepository(elementName);
      });
  });

// Parse command line arguments
program.parse(process.argv);
