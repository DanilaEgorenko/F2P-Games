import dateToRu from './dateToRu';

describe('dateToRu', () => {
    it('Должно вернуть дату в российском формате', () => {
        const inputDate = '2023-08-30';
        const expectedOutput = '30-08-2023';

        const result = dateToRu(inputDate);

        expect(result).toBe(expectedOutput);
    });

    it('Должен обрабатывать разные даты ввода', () => {
        const inputDate1 = '2021-01-15';
        const inputDate2 = '2022-12-01';
        const inputDate3 = '2023-05-20';

        const result1 = dateToRu(inputDate1);
        const result2 = dateToRu(inputDate2);
        const result3 = dateToRu(inputDate3);

        expect(result1).toBe('15-01-2021');
        expect(result2).toBe('01-12-2022');
        expect(result3).toBe('20-05-2023');
    });

    it('Должен обрабатывать крайние случаи', () => {
        const inputDate = '2000-02-29';

        const result = dateToRu(inputDate);

        expect(result).toBe('29-02-2000');
    });
});
