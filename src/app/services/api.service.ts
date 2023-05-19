import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable, catchError, throwError } from 'rxjs';
import { Package } from '@/models/package';
@Injectable({
    providedIn: 'root'
})
export class ApiService {

    private endpoint:string = environment.endPoint

    constructor(private http: HttpClient) {}

    getPackages():Observable<Package[]>{
        return this.http.get<Package[]>(`${this.endpoint}api/package/list`)
    }

    addPackage(modelo:Package):Observable<Package>{
        return this.http.post<Package>(`${this.endpoint}api/package/addPackage`, modelo)
    }

    updatePackage(idPackage:string,modelo:Package):Observable<Package>{
        console.log(`${this.endpoint}${idPackage}`);
        return this.http.put<Package>(`${this.endpoint}api/package/edit/${idPackage}`, modelo)
    }

    deletePackage(idPackage:number):Observable<void>{                                        
        return this.http.delete<void>(`${this.endpoint}api/package/delete/${idPackage}`)
    }
}
