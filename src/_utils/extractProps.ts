export  type ExtractBasePropsType<T> = {
    [K in keyof T]: T[K] extends { type: infer Type; default: infer Default }
        ? Type | Default
        : T[K];
};