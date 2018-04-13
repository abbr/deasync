/**
 * Created by user on 2018/4/13/013.
 */

declare namespace DeAsync
{
	export interface IApi
	{
		<T>(fn: (argv, done: <U extends Error>(err: U, value: T) => never) => T, ...argv): T,
		<T>(fn: (done: <U extends Error>(err: U, value: T) => never) => T, ...argv): T,
		<T>(fn: (...argv) => T, ...argv): T,

		sleep(timeout: number): never,
		runLoopOnce(): never,
		loopWhile(pred: (...argv) => boolean): never,
		await<T>(pr: Promise<T>): T

		default: IApi,
	}
}

declare const DeAsync: DeAsync.IApi;
export = DeAsync;

export as namespace DeAsync;
