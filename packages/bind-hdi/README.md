# Bind existing HDI container to your local environment

This CLI was created for a very specific use case. In our team we used to work in SAP Web IDE (Native Hana) to build our database artifacts. One of the key features available in this app - is ability to build personal containers with own independent schema

Meanwhile if we use another IDE like VS Code we need to resolve service binding manually.

This command does not create a new service binding. However what it does it connects to prebuilt hdi (via di-builder service binding) and updates your default-env.json with credentials of the service you want to bind to.

## Prerequisites
First of all please make sure that all services are generated. If you want to keep using your personal container you need to clone your project in Web IDE and build it there. If you want to connect to a main non-personal container - you need to deploy it first using `xs deploy` and then you can use this CLI

## Don't forget to ignore default-env.json
Please beware that publishing default-env.json in git repos may trigger bad consequences. Therefore it's highly recommended to include `default-env.json` to your `.gitignore` file

## Usage
```
Usage: bind-hdi [options]

Options:
  -s, --service <container>  Source container to bind
  -a, --as <alias>           bind as..
  --target-container         as target container
  --to <json>                json file to update
  -h, --help                 display help for command
```

Exapmple
```
# bind to a personal HDI container as a target container
npx bind-hdi --service=USERNAME-hash-service-app --as=your_app_db --to=db/default-env.json --target-container
```
Such a command will create/update default-env.json file in db folder with following values:
```json
{
	"VCAP_SERVICES": {
		"hana": [
			{
				"name": "USERNAME-hash-service-app",
				"label": "hana",
				"tags": [
					"hana",
					"database",
					"relational"
				],
				"plan": "hdi-shared",
				"credentials": {
					"schema": "YOUR_APP_2",
                    ...					
				}
			}
		]
	},
	"SERVICE_REPLACEMENTS": [
		{
			"key": "your_app_db",
			"service": "USERNAME-hash-service-app"
		}
	],
	"TARGET_CONTAINER": "USERNAME-hash-service-app"
}
```

You can see that it will generate not only VCAP_VALUES but SERVICE_REPLACEMENTS as well as it's needed for @sap/hdi-deploy module. TARGET_CONTAINER is updated by use of --target-container flag.

Now let's assume we have another external service used in our app (for example in .hdbgrants file). Without it our app won't deploy. So let's add it too 

```
npx bind-hdi --service=external_app-container --as=EXTERNAL_APP_SERVICE --to=db/default-env.json
```

So let's check how our default-env.json looks now:
```json
{
	"TARGET_CONTAINER": "USERNAME-hash-service-app",
	"VCAP_SERVICES": {
		"hana": [
			{
				"name": "USERNAME-hash-service-app",
				"label": "hana",
				"tags": [
					"hana",
					"database",
					"relational"
				],
				"plan": "hdi-shared",
				"credentials": {
					"schema": "YOUR_APP_2",
					...
				}
			},
			{
				"name": "external_app-container",
				"label": "hana",
				"tags": [
					"hana",
					"database",
					"relational"
				],
				"plan": "hdi-shared",
				"credentials": {
					"schema": "EXTERNAL_APP_SCHEMA",
					...
				}
			}
		]
	},
	"SERVICE_REPLACEMENTS": [
		{
			"key": "your_app_db",
			"service": "USERNAME-hash-service-app"
		},
		{
			"key": "EXTERNAL_APP_SERVICE",
			"service": "external_app-container"
		}
	]
}
```

## Deployment
If your HDI container ( db module ) is set up in a standard way it's enough just to run `npm start` in db folder
```
cd db
npm start
```
It will work in the same way as you would have run it from Web IDE.



