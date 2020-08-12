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
          this.handleMessageResult(res['message']);
          this.isSubmit = false;
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
        if(res['message']) {
          this.handleMessageResult(res['message']);
        } else {
          this.formProject.setValue(res);
        }
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

  handleMessageResult(message) {
    switch(message) {
      case 'Success':
        this.router.navigateByUrl('/projects');
        break;
      case 'ERR00':
        this.router.navigateByUrl('/error');
        break;
      case 'ERR04':
        alert("Project Info has been modified.");
        this.getProjectDetail();
        break;
      default:
        this.errorCode = message;
    }
  }

}
