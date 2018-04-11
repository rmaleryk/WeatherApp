export default class CityModel {
    name = 'n/a';
    todayTemp = 'n/a'; 
    tomorrowTemp = 'n/a';
    description = 'n/a';
    icon = '01d';

    constructor(data) {
        Object.assign(this, data);
    }
}