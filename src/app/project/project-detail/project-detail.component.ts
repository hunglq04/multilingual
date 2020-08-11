import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {

  formProject: FormGroup;
  isSubmit = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formProject = this.fb.group ({
      id: [null],
      projectNumber: [null, Validators.required],
      projectName: [null, Validators.required],
      customer: [null, Validators.required],
      group: [null, Validators.required],
      members: [null],
      status: 'NEW',
      startDate: [null, Validators.required],
      endDate: [null],
    })
  }

  onSubmit() {
    console.log(this.formProject.value);
    console.log(this.formProject.valid);
    this.isSubmit = true;
  }

}
