import { Component } from '@angular/core';
import { HttpClient, HttpHeaders,  HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  hi1= "";
  serverData: JSON;
  test = " testFinaleeeee";
  constructor(private httpClient: HttpClient) { 
  }

  ngOnInit(){}
  
  sayHi1() {
    // debugger;
    this.httpClient.get('http://toubib.pythonanywhere.com/hello1', 
    // http://127.0.0.1:5002/
    // http://toubib.pythonanywhere.com/
    {
      headers:
        new HttpHeaders(
          {
            'Content-Type': 'application/json'
          }
        )
    }
    ).subscribe(data => {
      // debugger;
      this.serverData = data as JSON;
      this.hi1=this.serverData['text'];
      console.log(this.serverData);
    });
  }

  sendPostRequest() {
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );

    let postData = {
            "test": this.test
    }

    this.httpClient.post("http://toubib.pythonanywhere.com/customers", postData)
    // http://127.0.0.1:5002/
    // http://toubib.pythonanywhere.com/
      .subscribe(data => {
        console.log(data['_body']);
       }, error => {
        console.log(error);
      });
  }
  
}

