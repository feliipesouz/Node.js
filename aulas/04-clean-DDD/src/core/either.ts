export class Left<L> {
    readonly value: L

    constructor(value: L) {
        this.value = value
    }
}

export class Rigth<R> {
    readonly value: R

    constructor(value: R){
        this.value = value
    }
}

export type Either<L,R> = Left<L> | Rigth<R>

export const left = <L, R>(value: L): Either<L,R> => {
    return new Left(value)
}

export const right = <L, R>(value: R): Either<L, R> => {
    return new Left(value)
}