import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { log } from 'console';
import { Computer } from '../types/computer';
@Component({
  selector: 'app-computers',
  templateUrl: './computers.component.html',
  styleUrl: './computers.component.css'
})
export class ComputersComponent implements OnInit {
  computers: Computer[] = [];
  constructor(private apiService : ApiService){ }

  
   ngOnInit(): void {
    this.apiService.getComputers().then(  
      (response) => {
        this.computers = response;
        },
        (error) => {
          console.error(error);
          }
    );
  
   }
   
}
