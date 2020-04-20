import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  serverData: JSON;
  employeeData: JSON;
  constructor(private httpClient: HttpClient) {}
  getAllEmployees() {
    this.httpClient.get('http://toubib.pythonanywhere.com//employees').subscribe(data => {
      this.employeeData = data as JSON;
      console.log(this.employeeData);
    });
  }
}
