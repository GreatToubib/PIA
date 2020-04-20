import { Component } from '@angular/core';
import { Plugins, CameraResultType, CameraSource} from '@capacitor/core';
import { DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import { HttpClient, HttpHeaders,  HttpResponse } from '@angular/common/http';

const { Camera } = Plugins;

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  imageName="null";
  imageFormat= "null";
  image64= "";
  photo: SafeResourceUrl;

  constructor( private sanitizer: DomSanitizer, private httpClient: HttpClient) {}

  async takePicture() {
    console.log(" il faut prendre la photo");
    const image = await Camera.getPhoto({
      quality: 95,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      // Base64 or dataURL or Uri
      source: CameraSource.Camera,
      saveToGallery: true
    });
    console.log(" la photo a été prise");
    this.imageFormat=image.format;
    this.image64=image.base64String;
    this.photo=this.sanitizer.bypassSecurityTrustResourceUrl( image && (image.dataUrl));
    this.imageUpload();

  }

  imageUpload() {
    let date = new Date(),
      time = date.getTime();
      this.imageName = time +'.'+ this.imageFormat;

    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );

    let postData = {
      "name": this.imageName,
      "format": this.imageFormat,
      "base64": this.image64
    }

    this.httpClient.post("http://toubib.pythonanywhere.com/imageUpload", postData)
    // http://127.0.0.1:5002/
    // http://toubib.pythonanywhere.com/
      .subscribe(data => {
        console.log(data['_body']);
       }, error => {
        console.log(error);
      });
  }




}

