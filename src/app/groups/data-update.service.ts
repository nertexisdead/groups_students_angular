import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataUpdateService {
    private dataUpdateSource = new BehaviorSubject<boolean>(false);
  
    dataUpdate$ = this.dataUpdateSource.asObservable();
  
    updateData(updated: boolean) {
      this.dataUpdateSource.next(updated);
    }
  }
  
  
  
  
  
