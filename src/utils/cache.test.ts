import { advanceTo, clear } from 'jest-date-mock';
import { IGame } from '../pages/game/interfaces';
import { getCachedData, hasCachedData, saveData } from './cache';

const expiration = Date.now() + 5 * 60 * 1000;

const localStorageMock = (() => {
    let store: Record<string, string> = {};

    return {
        getItem: (key: string) => store[key] || null,
        setItem: (key: string, value: string) => {
            store[key] = value.toString();
        },
        removeItem: (key: string) => {
            delete store[key];
        },
        clear: () => {
            store = {};
        }
    };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('cache', () => {
    afterEach(() => {
        localStorage.clear();
        clear();
    });

    it('Должно сохранить данные в localStorage', () => {
        const id = 'testId';
        const data: IGame = {
            id: 0,
            title: '',
            thumbnail: '',
            status: '',
            short_description: '',
            description: '',
            game_url: '',
            genre: '',
            platform: '',
            publisher: '',
            developer: '',
            release_date: '',
            freetogame_profile_url: '',
            minimum_system_requirements: {
                os: '',
                processor: '',
                memory: '',
                graphics: '',
                storage: ''
            },
            screenshots: []
        };

        saveData(id, data);

        const savedData = localStorage.getItem(id);
        expect(savedData).toBeDefined();
    });

    it('Должно проверить, существуют ли данные в кеше', () => {
        const id = 'testId';
        localStorage.setItem(id, JSON.stringify({ value: {}, expiration }));

        const result = hasCachedData(id);
        expect(result).toBe(true);
    });

    it('Должно вернуть данные из кеша', () => {
        const id = 'testId';
        const cachedData: IGame = {
            id: 0,
            title: '',
            thumbnail: '',
            status: '',
            short_description: '',
            description: '',
            game_url: '',
            genre: '',
            platform: '',
            publisher: '',
            developer: '',
            release_date: '',
            freetogame_profile_url: '',
            minimum_system_requirements: {
                os: '',
                processor: '',
                memory: '',
                graphics: '',
                storage: ''
            },
            screenshots: []
        };
        localStorage.setItem(id, JSON.stringify({ value: cachedData, expiration }));

        const result = getCachedData(id);
        expect(result).toEqual(cachedData);
    });

    it('Должно вернуть undefined, если expiration истёк', () => {
        const id = 'testId';
        const cachedData: IGame = {
            id: 0,
            title: '',
            thumbnail: '',
            status: '',
            short_description: '',
            description: '',
            game_url: '',
            genre: '',
            platform: '',
            publisher: '',
            developer: '',
            release_date: '',
            freetogame_profile_url: '',
            minimum_system_requirements: {
                os: '',
                processor: '',
                memory: '',
                graphics: '',
                storage: ''
            },
            screenshots: []
        };
        localStorage.setItem(id, JSON.stringify({ value: cachedData, expiration }));
        advanceTo(Date.now() + expiration + 1);

        const result = getCachedData(id);
        expect(result).toBeUndefined();
    });
});
