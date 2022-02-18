import {URL} from '../utils/constants';

export function getQuestions() {
    return fetch(URL).then((resp) => {
        return resp.json();
    }).then((result) => {
        return result
    });
}
