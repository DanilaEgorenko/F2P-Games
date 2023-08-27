import { ISelect } from "../../../interfaces";

export const sorts: ISelect[] = [{ label: 'По дате выпуска', value: 'release-date' },
{ label: 'По алфавиту', value: 'alphabetical' }, { label: 'По релевантности', value: 'relevance' }, { label: 'По популярности', value: 'popularity' }];