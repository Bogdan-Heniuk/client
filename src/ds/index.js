import {Auth, Company, User, Vacancy} from './ds.js'

class DataService{
    get auth() {
        return new Auth();
    }
    get vacancy(){
        return new Vacancy();
    }
    get company(){
        return new Company();
    }
    get user(){
        return new User();
    }
}

export default new DataService();