#!/usr/bin/env ts-node
import { exit } from 'process';
import '../index';
import hana2cds from '../index';
hana2cds.parseAsync().then(() => {
  exit();
});
