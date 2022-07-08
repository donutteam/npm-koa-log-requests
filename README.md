# Koa Log Requests
A class for creating Koa middlewares that log when requests start and end.

## Installation
Install the package with NPM:

```
npm install @donutteam/koa-log-requests
```

## Usage
To use this class, simply instantiate an instance and add it to your Koa stack:

```js
import Koa from "koa";

import { LogRequestsMiddleware } from "@donutteam/koa-log-requests";

const app = new Koa();

const logRequestsMiddleware = new LogRequestsMiddleware();

// Be sure to add the execute function on the instance
// and NOT the instance itself
app.use(logRequestsMiddleware.execute);
```

## Options
An object containing various options can be passed to the middleware's constructor.

These options can also be manually modified on the instance afterwards, if you need to do so for some reason.

### ipNames
An object whose keys are IP addresses and whose values are names for those IP addresses.

```js
// Name requests coming from your own machine
const logRequestsMiddleware = new LogRequestsMiddleware(
	{
		ipNames:
		{
			"::ffff:127.0.0.1": "This Machine",
		},
	});
```

This is useful if your application is communicated with from machines you know the identity of and you want to be named in the logs.

### logStart
Whether or not to log the start of requests. Optional, defaults to `true`.

```js
// Disable request start logging
const logRequestsMiddleware = new LogRequestsMiddleware(
	{
		logStart: false,
	});
```

## License
[MIT](https://github.com/donutteam/koa-log-requests/blob/main/LICENSE.md)