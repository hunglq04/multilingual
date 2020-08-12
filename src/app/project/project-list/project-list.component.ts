import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProjectService } from '../project.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  formSearch: FormGroup;
  projectList = [];
  deleteIds = [];
  isNotDelete = true;

  constructor(private fb: FormBuilder, private projectService: ProjectService) { }

  ngOnInit(): void {
    this.formSearch = this.fb.group({
      keywordSearch: '',
      status: ''
    });
    this.fetchData();
  }

  // Event handler start
  search() {
    this.deleteIds = [];
    this.fetchData();
  }

  reset() {
    this.formSearch.reset({
      keywordSearch: '',
      status: ''
    });
    this.deleteIds = [];
    this.isNotDelete = true;
    this.fetchData();
  }

  selectRecord(event, projectId) {
    let isCheck = event.currentTarget.checked;
    if(isCheck) {
      this.deleteIds.push(projectId)
    } else {
      this.deleteIds = this.deleteIds.filter(n => n != projectId);
    }
    console.log(this.deleteIds);
  }

  deleteOne(projectId) {
    if(!this.confirmDelete()) {
      return;
    }
    this.isNotDelete = false;
    this.deleteIds = [projectId];
    this.delete();
  }

  deleteMany() {
    if(!this.confirmDelete()) {
      return;
    }
    this.delete();
  }

  canDelete(status) {
    return status == 'NEW';
  }

  confirmDelete() {
    if(confirm("Do you wanna delete?")) {
      return true;
    };
    return false;
  }
  // Event handler end

  // Call service start
  fetchData() {
    this.projectService.searchProjects(this.formSearch.value)
      .subscribe(res => {
        this.projectList = Object.values(res);
      })
  }

  delete() {
    this.projectService.deleteProject(this.deleteIds)
      .subscribe(res => {
        console.log("DELETE SUCCESS", res);
        this.reset();
      }, err => {
        console.log("DELETE FAIL", err);
      });
  }
  // Call servce end

}
