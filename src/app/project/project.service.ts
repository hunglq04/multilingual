import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'

const BASE_URL = "http://localhost:8080";
const SEARCH_ENDPOINT = "/search";
const SAVE_ENDPOINT = "/saveProject";
const DELETE_ENDPOINT = "/delete";
const GET_ONE_ENDPOINT = "/getProject";
const GROUP_ENDPOINT = "/group";

@Injectable()
export class ProjectService {
    constructor(private http: HttpClient) {}

    searchProjects(searchForm) {
        let requestURL = `${BASE_URL}${SEARCH_ENDPOINT}?keywordSearch=${searchForm.keywordSearch}&status=${searchForm.status}`;
        return this.http.get(requestURL);
    }

    saveOrUpdateProject(projectForm) {
        let requestURL = `${BASE_URL}${SAVE_ENDPOINT}`;
        return this.http.post(requestURL, projectForm);
    }

    deleteProject(projectIds) {
        let requestURL = `${BASE_URL}${DELETE_ENDPOINT}`;
        let options = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
            }),
            body: projectIds,
          };
        return this.http.delete(requestURL, options);
    }

    getOne(projectId) {
        let requestURL = `${BASE_URL}${GET_ONE_ENDPOINT}/${projectId}`;
        return this.http.get(requestURL);
    }

    getGroups() {
        let requestURL = `${BASE_URL}${GROUP_ENDPOINT}`;
        return this.http.get(requestURL);
    }

}