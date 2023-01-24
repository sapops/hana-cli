import { CSN, Definition } from '@sap/cds/apis/csn';

interface Options {
  case: 'snake' | 'camel' | 'pascal';
  suffix: string;
}

export async function convertCSN(model: any, options: Options): CSN {
  return {
    namespace: model.namespace,
    definitions: new Proxy(model.definitions, {get(target, p: string, receiver) {

        return {
            kind: "entity",
            projection: {
                from: {
                    ref:[p]
                },
                columns : Object.keys(target[p].elements).map(e => ({ref:[e], as: ""}))
            },
           
        }
    },})
  };
}


