import { Component } from '@angular/core';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrl: './add-new.component.css'
})
export class AddNewComponent {

  toggleTextArea() {
    
    const componentDetails:any = document.querySelector(".component-details");

    
    
        componentDetails.style.display = "block";
 
  }
 }



