import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private http = inject(HttpClient);
  apiUrl :string = "https://localhost:44396/api/Payment"; // change to local Check backend for this
  
  constructor(){}  
  
  MakeSalePayment(dto:any):Observable<any>{
    return this.http.post(`${this.apiUrl}/sale`,dto);
  }

}
