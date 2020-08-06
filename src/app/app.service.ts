import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

@Injectable()

export class AppService {
    constructor(private http: HttpClient) {}
    getProducts() {
        let lang = localStorage.getItem('lang') || 'vi';
        return this.http.get(`http://localhost:8080/product?language=${lang}`)
        .toPromise()
        .then(res => JSON.parse(JSON.stringify(res)))
    }
}