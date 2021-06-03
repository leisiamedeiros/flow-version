export default class Utilities {

    static uuidv4(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (character) => {
            let result = Math.random() * 16 | 0, variant = character == 'x' ? result : (result & 0x3 | 0x8);
            return variant.toString(16);
        });
    }

    static generateVersion(): string {
        const today = new Date();
        const month = (today.getMonth() + 1);
        return `${today.getFullYear()}${month}${today.getDate()}${today.getHours()}${today.getMinutes()}${today.getSeconds()}`;
    }

    static countElementsByKey(items: string[], key: string): number {
        return items.filter(el => el.includes(key)).length;
    }

    static returnElementsByKey(items: string[], key: string): string[] {
        return items.filter(el => el.includes(key));
    }

}