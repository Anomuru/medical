declare module '*.jpg';
declare module '*.png';
declare module '*.svg';


declare const __IS_DEV__: boolean;

type OptionalRecord<K extends keyof any, T> = {
    [P in K]?: T;
};

type DeepPartial<T> = T extends object
    ? {
        [P in keyof T]?: DeepPartial<T[P]>;
    }
    : T;



declare module '*.sass' {
    const content: Record<string, string>;
    export default content;
}