import {
    Animal,
    Dog,
    Cat,
    printAnimalArray,
    printAnimal,
    addCatToArray,
    printTaxNumbers
} from '../src/co-and-contra-with-arrays';

describe('Basic covariance', () => {
    it('I can print a dog', () => {
        const dog = new Dog("Hasso", "123");
        printAnimal(dog);
    });
    it('I can print a cat', () => {
        const cat = new Cat("Miriam");
        printAnimal(cat);
    });
});


describe('Covariance with Arrays', () => {

    it('I can print an animal array of a cat and a dogs', () => {
        const hasso = new Dog("Hasso", "12345");
        const miriam = new Cat("Miriam");
        const animals : Animal[] = [hasso, miriam];
        printAnimalArray(animals);
    });
    it('I can print a dog array of two dogs', () => {
        const dogs : Dog[] = [new Dog("Hasso","3456"), new Dog("Pluto", "7890")];
        printAnimalArray(dogs);
    });
    it('I can add a cat to animals', () => {
        const animals : Animal[] = [new Dog("Hasso","321"), new Cat("Catty")];
        addCatToArray(animals);
        printAnimalArray(animals);
        // Type mismatch: printTaxNumbers(animals);
    });
    it('I can add a cat to dogs, even if it is not a good thing', () => {
        const dogs : Dog[] = [new Dog("Hasso","654"), new Dog("Rufus","987")];
        addCatToArray(dogs);
        printAnimalArray(dogs);
        printTaxNumbers(dogs); // hidden error, swallowed null pointer exception
    });
});

