export abstract class Animal {
    protected constructor(protected readonly kind: string,
                          protected readonly name: string) {
    }

    public toString(): string {
        return this.kind + "-" + this.name;
    }
}

export class Dog extends Animal {
    constructor(name: string) {
        super("Dog", name);
    }
}

export class Cat extends Animal {
    constructor(name: string) {
        super("Cat", name);
    }
}

// Co Variance
// ====================

export function printAnimal(animal: Animal) {
    console.log(animal.toString());
}

export function printAnimalArray(animals: Animal[]) {
    for (let animal of animals) {
        console.log(animal.toString());
    }
}


export const sum = (a: number, b: number) => {
    if ('development' === process.env.NODE_ENV) {
        console.log('boop');
    }
    return a + b;
};
