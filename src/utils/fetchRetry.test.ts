import { fetchRetry } from './fetchRetry';

class Response {
    constructor(public body: any, public init: any) { }
}

describe('fetchRetry', () => {
    const mockFetch = jest.fn();

    beforeEach(() => {
        mockFetch.mockReset();
        global.fetch = mockFetch;
    });

    it('Должно вернуть ошибку, если все попытки провалились', async () => {
        mockFetch.mockRejectedValue(new Error('Fetch error'));

        const url = 'https://example.com';
        const options = { method: 'GET' };

        await expect(fetchRetry(url, options)).rejects.toThrow('Ошибка загрузки');

        expect(mockFetch).toHaveBeenCalledTimes(3);
    });
});
