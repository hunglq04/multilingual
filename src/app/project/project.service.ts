import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'

const BASE_URL = "http://localhost:8080";
const SEARCH_ENDPOINT = "/search";
const SAVE_ENDPOINT = "/saveProject";
const DELETE_ENDPOINT = "/delete"

@Injectable()
export class ProjectService {
    constructor(private http: HttpClient) {}

    searchProjects(searchForm) {
        let requestURL = `${BASE_URL}${SEARCH_ENDPOINT}?keywordSearch=${searchForm.keywordSearch}&status=${searchForm.status}`;
        return this.http.get(requestURL);
    }

    saveOrUpdateProject(projectForm) {
        let requestURL = `${BASE_URL}${SAVE_ENDPOINT}`;
        return this.http.post(requestURL, {
            body: projectForm
        });
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

}