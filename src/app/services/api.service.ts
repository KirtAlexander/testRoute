import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable, catchError, throwError } from 'rxjs';
import { Package } from '@/models/package';
import { Costumer } from '@/models/costumer';
import { Employee } from '@/models/employee';
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

    updatePackage(idPackage:number,modelo:Package):Observable<Package>{
        return this.http.put<Package>(`${this.endpoint}api/package/edit/${idPackage}`, modelo)
    }

    deletePackage(idPackage:number):Observable<void>{                                        
        return this.http.delete<void>(`${this.endpoint}api/package/delete/${idPackage}`)
    }
    //<--- COSTUMERS --->
    getCostumers(): Observable<Costumer[]> {
        return this.http.get<Costumer[]>(`${this.endpoint}api/Costumer`)
    }

    addCostumer(modelo: Costumer): Observable<Costumer> {
        return this.http.post<Costumer>(`${this.endpoint}api/Costumer`, modelo)
    }

    updateCostumer(idCostumer: number, modelo: Costumer): Observable<Costumer> {
        return this.http.put<Costumer>(`${this.endpoint}api/Costumer${idCostumer}`, modelo)
    }

    deleteCostumer(idCostumer: number): Observable<void> {
        return this.http.delete<void>(`${this.endpoint}api/Costumer${idCostumer}`)
    }

     //<--- EMPLOYEES --->
     getEmployees(): Observable<Employee[]> {
        return this.http.get<Employee[]>(`${this.endpoint}api/Employee`)
    }

    addEmployee(modelo: Employee): Observable<Employee> {
        return this.http.post<Employee>(`${this.endpoint}api/Employee`, modelo)
    }

    updateEmployee(idEmployee: number, modelo: Employee): Observable<Employee> {
        return this.http.put<Employee>(`${this.endpoint}api/Employee${idEmployee}`, modelo)
    }

    deleteEmployee(idEmployee: number): Observable<void> {
        return this.http.delete<void>(`${this.endpoint}api/Employee${idEmployee}`)
    }
}
