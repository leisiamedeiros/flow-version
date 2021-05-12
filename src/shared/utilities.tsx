export default class Utilities {

    static uuidv4(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (character) => {
            let result = Math.random() * 16 | 0, variant = character == 'x' ? result : (result & 0x3 | 0x8);
            return variant.toString(16);
        });
    }
}