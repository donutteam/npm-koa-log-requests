//
// Imports
//

import chalk from "chalk";

//
// Log Request Middleware
//

/**
 * A class for creating middlewares that logs the starts and ends of requests to the console.
 */
export class LogRequestsMiddleware
{
	/**
	 * A middleware that logs the starts and ends of requests to the console.
	 * 
	 * @type {import("koa").Middleware}
	 */
	execute;

	/**
	 * An object whose keys are IP addresses and whose values are names for those IP addresses.
	 * 
	 * @type {Object}
	 */
	ipNames = {};

	/**
	 * Whether or not to log the start of requests.
	 * 
	 * @type {Boolean}
	 */
	logStart = true;

	/**
	 * The current request number.
	 *
	 * @type {Number}
	 */
	requestNumber = 0;

	/**
	 * Constructs a new LogRequestMiddleware.
	 *
	 * @param {Object} [options] Options for the middleware. Optional.
	 * @param {Object} [options.ipNames] An object whose keys are IP addresses and whose values are names for those IP addresses. Optional.
	 * @param {Boolean} [options.logStart] Whether or not to log the start of requests. Optional, defaults to true.
	 * @author Loren Goodwin
	 */
	constructor(options)
	{
		this.ipNames = options?.ipNames ?? this.ipNames;

		this.logStart = options?.logStart ?? this.logStart;

		this.execute = async (context, next) =>
		{
			//
			// Get Request IP Name
			//

			const ipName = this.ipNames[context.ip] ?? context.ip;

			//
			// Get This Request Number
			//

			const thisRequestNumber = ++this.requestNumber;

			//
			// Build Request String
			//

			const requestStrings = [];

			requestStrings.push(`Request ${ thisRequestNumber }`);
			requestStrings.push(`IP: ${ ipName }`);
			requestStrings.push(`${ context.request.method } ${ context.request.url }`);

			const requestString = requestStrings.join(" | ");

			//
			// Get Start Time
			//

			const startTime = performance.now();

			try
			{
				//
				// Log Request Start
				//

				if (this.logStart)
				{
					const components = [];

					components.push(`[LogRequests] ${ requestString }`);
					components.push("Start");

					console.log(components.join(" | "));
				}

				//
				// Execute Next Middleware
				//

				await next();
			}
			finally
			{
				//
				// Build Request End Log
				//

				const components = [];

				// General
				components.push(`[LogRequests] ${ requestString }`);

				// Duration
				const duration = performance.now() - startTime;

				components.push(`Duration: ${ duration.toFixed(2) }ms`);

				// Status
				components.push(`Status Code: ${ context.response.status }`);

				// Type
				components.push(`Type: ${ context.response.type }`);

				//
				// Log Request End
				//

				const final = components.join(" | ");

				if (context.response.status >= 400)
				{
					console.log(chalk.red(final));
				}
				else if (context.response.status >= 300)
				{
					console.log(chalk.yellow(final));
				}
				else
				{
					console.log(chalk.green(final));
				}
			}
		};
	}
}