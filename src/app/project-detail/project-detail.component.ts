import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {

  formProject: FormGroup;

  constructor() { 
    this.formProject = new FormGroup ({
      id: new FormControl(),
      projectNumber: new FormControl(),
      projectName: new FormControl(),
      customer: new FormControl(),
      group: new FormControl(),
      members: new FormControl(),
      status: new FormControl(),
      startDate: new FormControl(),
      endDate: new FormControl(),
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.formProject.value);
  }

}
