const {readFileSync} = require('fs');
const {normalize} = require('../utils/keymaps-normalize');
const {defaultPlatformKeyPath} = require('./paths');

const commands = {};
const keys = {};

const _setKeysForCommands = function(keymap) {
  for (const command in keymap) {
    if (command) {
      commands[command] = normalize(keymap[command]);
    }
  }
};

const _setCommandsForKeys = function(commands_) {
  for (const command in commands_) {
    if (command) {
      keys[commands_[command]] = command;
    }
  }
};

const _import = function(customsKeys) {
  try {
    const mapping = JSON.parse(readFileSync(defaultPlatformKeyPath()));
    _setKeysForCommands(mapping);
    _setKeysForCommands(customsKeys);
    _setCommandsForKeys(commands);

    return {commands, keys};
  } catch (err) {
    //eslint-disable-next-line no-console
    console.error(err);
  }
};

const _extend = function(customsKeys) {
  if (customsKeys) {
    for (const command in customsKeys) {
      if (command) {
        commands[command] = normalize(customsKeys[command]);
        keys[normalize(customsKeys[command])] = command;
      }
    }
  }
  return {commands, keys};
};

module.exports = {
  import: _import,
  extend: _extend
};
