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
  species: "null";
  serverData: JSON;

  constructor( private sanitizer: DomSanitizer, private httpClient: HttpClient) {}


  ///////////////////////////////////////////////////////////////// global fucntion, take pic then uplaod it then classify it /////////////////////////////////////////////////////////
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

    const upload= await this.imageUpload();
    console.log(" fin upload");
    console.log(" gonna ask for species");
    this.getSpecies();
    console.log("species given and is");
    console.log(this.species);
  }

  ///////////////////////////////////////////////////////////////// upload picture /////////////////////////////////////////////////////////

  imageUpload() {
    console.log(" debut upload");
    let date = new Date(),
      time = date.getTime();
      this.imageName = time +'';

    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );

    let postData = {
      "name": this.imageName,
      "format": this.imageFormat,
      "base64": this.image64
    }

      
      return this.httpClient.post("http://toubib.pythonanywhere.com/imageUpload", postData).toPromise();
  }


  ///////////////////////////////////////////////////////////////// classify picture /////////////////////////////////////////////////////////
  
  getSpecies() {
    // debugger;
    // this.httpClient.get('http://toubib.pythonanywhere.com/getSpecies?name={this.imageName}', 
    console.log("  in getspecies function");
    this.httpClient.get('http://toubib.pythonanywhere.com/getSpecies', 
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
      this.species=this.serverData['species'];
      console.log(this.serverData);
      console.log(this.species);
    });
  }

}

