import { getAPIClient } from './axios';

export const api = getAPIClient();

export const apiSetToken = (token: string) => {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
};