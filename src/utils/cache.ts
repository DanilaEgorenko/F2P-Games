import { IGame } from "../pages/game/interfaces";

export function saveData(id: string, data: IGame) {
    const expiration = Date.now() + 5 * 60 * 1000;

    const dataToSave = {
        value: data,
        expiration: expiration
    };

    localStorage.setItem(`${id}`, JSON.stringify(dataToSave));
}

export function hasCachedData(id: string): boolean {
    return !!localStorage.getItem(id);
}

export function getCachedData(id: string): IGame | undefined {
    const savedData = localStorage.getItem(id);
    const parsedData = JSON.parse(savedData as string);
    if (parsedData.expiration <= Date.now()) {
        localStorage.removeItem(id);
    }
    return parsedData.value as IGame;
}