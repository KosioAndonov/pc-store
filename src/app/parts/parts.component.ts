import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Part } from '../types/part';

@Component({
  selector: 'app-parts',
  templateUrl: './parts.component.html',
  styleUrl: './parts.component.css'
})
export class PartsComponent {
  parts: Part[] = [];
  constructor(private apiService : ApiService){ }

  
   ngOnInit(): void {
    this.apiService.getParts().then(  
      (response) => {
        this.parts = response;
        },
        (error) => {
          console.error(error);
          }
    );
    
    
   }

}
