export class User {
    constructor (
        public email: string,
        public id: string,
        public _token: string,
        public _tokenExpirationDate: Date
    ) { }

    get token() {
        if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate)
            return null;
        return this._token;
    }
}