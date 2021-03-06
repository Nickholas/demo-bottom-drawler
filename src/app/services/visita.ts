import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class ServicioVisita {

    url = 'api/visita';

    constructor(private http: HttpClient) { }

    public init(id) {
        return this.http.get<any>(environment.apiUrl + this.url + '/init/' + id);
    }
}
