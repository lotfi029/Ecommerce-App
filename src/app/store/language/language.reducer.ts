import { createReducer, on } from '@ngrx/store';
import { languageAction } from './language.action';

const initialLan = localStorage.getItem('lang') ?? 'en';
export const languageReducer = createReducer(
  initialLan,
  on(languageAction, (state, action) => action.lang) 
);

