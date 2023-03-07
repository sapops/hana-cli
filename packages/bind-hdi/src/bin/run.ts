#!/usr/bin/env ts-node
import { exit } from 'process';
import command from '../index';
command.parseAsync().then(() => {
  exit();
});
