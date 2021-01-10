import {Animal, Dog, Cat, printAnimalArray, printAnimal} from '../src/co-and-contra-with-classes';

describe('For starters', () => {
    it('I can print a dog', () => {
        const dog = new Dog("Hasso");
        printAnimal(dog);
    });
    it('I can print a cat', () => {
        const cat = new Cat("Miriam");
        printAnimal(cat);
    });
    it('I can print an animal array of a cat and a dogs', () => {
        const hasso = new Dog("Hasso");
        const miriam = new Cat("Miriam");
        const animals : Animal[] = [hasso, miriam];
        printAnimalArray(animals);
    });
    it('I can print a dog array of two dogs', () => {
        const dogs : Dog[] = [new Dog("Hasso"), new Dog("Pluto")];
        printAnimalArray(dogs);
    });
});
