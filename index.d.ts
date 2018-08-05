type Callback<T> = <E extends Error>(err: E, value: T) => never;

interface DeAsync {
    <R>(fn: (callback: Callback<R>) => void): () => R;
    <T1, R>(fn: (arg1: T1, callback: Callback<R>) => void): (arg1: T1) => R;
    <T1, T2, R>(fn: (arg1: T1, arg2: T2, callback: Callback<R>) => void): (arg1: T1, arg2: T2) => R;
    <T1, T2, T3, R>(fn: (arg1: T1, arg2: T2, arg3: T3, callback: Callback<R>) => void): (arg1: T1, arg2: T2, arg3: T3) => R;
    <T1, T2, T3, T4, R>(fn: (arg1: T1, arg2: T2, arg3: T3, arg4: T4, callback: Callback<R>) => void): (arg1: T1, arg2: T2, arg3: T3, arg4: T4) => R;
    <T1, T2, T3, T4, T5, R>(fn: (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, callback: Callback<R>) => void): (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5) => R;
    <T1, T2, T3, T4, T5, T6, R>(fn: (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6, callback: Callback<R>) => void): (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6) => R;
    (fn: Function): Function

    sleep(timeout: number): void;

    runLoopOnce(): void;

    loopWhile(pred: () => boolean): void;

    await<T>(promise: Promise<T>): T;
}

declare const instance: DeAsync;

export = instance;
