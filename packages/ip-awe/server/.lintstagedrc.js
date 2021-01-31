const { CLIEngine } = require('eslint');

const cli = new CLIEngine({});

module.exports = {
  '*': 'prettier --write',
  'src/**/*.{js,ts,tsx}': filenames => [
    `eslint --fix --max-warnings=0 ${filenames.filter(file => !cli.isPathIgnored(file)).join(' ')}`,
    `cross-env CI=true jest --env=jsdom --findRelatedTests ${filenames.join(' ')}`,
  ],
};
