import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  needsRenew = true;
  get renewDate(): string | null {
    let date = new Date();
    let dd = this.datePipe.transform(date.setDate(date.getDate() + 1));
    return dd;
  }
  filters: string[] = ["ssn","dob"];

  has(appSettings: string[]) {
    return true;
  }
  hasFilters(filters: string[]) {
    let has = false;
    filters.forEach(cf=> {
      if(this.filters.indexOf(cf)>= 0){ has = true; }
    })

    return has;
  }
  async needsRenewFlag(): Promise<boolean>{
    //return Promise.resolve(true);
    let response = await axios.get('/assets/flag.txt');
    return response.data;
  }
  constructor(private readonly datePipe: DatePipe) {}
}
