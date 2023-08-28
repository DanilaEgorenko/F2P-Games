export async function fetchRetry(url: string, options: RequestInit): Promise<Response | undefined> {
    let count = 3;
    while (count > 0) {
        try {
            return await fetch(url, options);
        } catch (error) {
            if (count === 1) {
                throw new Error('Ошибка загрузки');
            }
        }
        count -= 1;
    }
}  