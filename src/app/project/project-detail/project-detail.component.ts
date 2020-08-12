import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {

  formProject: FormGroup;
  projectId = '';
  groups = [];
  isSubmit = false;
  isNew = true;
  errorCode = '';

  constructor(
    private fb: FormBuilder, 
    private projectService: ProjectService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.formProject = this.fb.group ({
      id: [''],
      projectNumber: ['', Validators.required],
      projectName: ['', Validators.required],
      customer: ['', Validators.required],
      groupId: ['', Validators.required],
      members: [''],
      status: 'NEW',
      startDate: ['', Validators.required],
      endDate: [''],
      version: ['']
    });
    this.getGroupData();
    this.route.paramMap.subscribe(params => {
      this.projectId = params.get('id');
      this.isNew = Number.isNaN(+this.projectId);
      this.getProjectDetail();
    })
  }

  onSubmit() {
    this.isSubmit = true;
    if(this.formProject.valid) {
      this.projectService.saveOrUpdateProject(this.formProject.value)
        .subscribe(res => {
          let message = res['message'];
          if(message == "Success") {
            console.log("SAVE SUCCESS", res);
            this.router.navigateByUrl('/projects');
          } else {
            this.errorCode = message;
            console.log(this.errorCode);
          }
        }, err => {
          console.log("SAVE ERROR", err);
          this.isSubmit = false;
        });
    }
  }

  getGroupData() {
    this.projectService.getGroups()
      .subscribe(res => {
        this.groups = Object.values(res);
      }, err => {
        console.log("GET GROUP FAIL",err);
      });
  }

  getProjectDetail() {
    if(!this.isNew) {
      this.projectService.getOne(this.projectId)
      .subscribe(res => {
        console.log("PROJECT DETAIL", res);
        this.formProject.setValue(res);
      }, err => {
        console.log("PROJECT DETAIL ERROR", err);
      })
    } else {
      this.reset();
    }
  }

  reset() {
    this.projectId = '';
    this.isNew = true;
    this.errorCode = ''
    this.isSubmit = false;
    this.formProject.setValue({
      id:'',
      projectNumber: '',
      projectName: '',
      customer: '',
      groupId: '',
      members: '',
      status: 'NEW',
      startDate: '',
      endDate: '',
      version: '',
    });
  }

}
