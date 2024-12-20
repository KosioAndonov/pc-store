import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrl: './add-new.component.css'
})
export class AddNewComponent implements OnInit{
  NewForm: FormGroup;
  selectedValue: string = '';

  onItemTypeChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedValue = selectElement.value;
  }

  constructor(private fb: FormBuilder, private apiService: ApiService, private route: ActivatedRoute) {
    this.NewForm = this.fb.group({
      id: ['', [ Validators.required]],
      img: ['', [ Validators.required]],
      memory: ['',],
      ram: ['',],
      videoCard: ['',],
      price: ['',],
      processor: ['',],
      info: ['',],
      type: ['',],
    });
  }

  onSubmit() {

    try {
      this.apiService.addComponent(this.selectedValue, this.NewForm.value);
      this.NewForm.reset();
      this.selectedValue = '';
    } catch (error) {
      throw error
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if(id){
        this.setValues(id);
      }
    }) 
  }

  setValues(id:any){

    this.apiService.getComponentById(id).then(data => {
      this.NewForm.patchValue({ ...data });
      this.selectedValue = data.type;
      })

  }
}



