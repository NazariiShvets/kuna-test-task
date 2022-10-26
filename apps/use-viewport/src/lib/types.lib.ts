type Tupple<T> = [T, T];

type AssertNotSame<Source, Target> = Source extends Target ? never : Source;

export type { Tupple, AssertNotSame };
