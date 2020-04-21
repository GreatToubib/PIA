import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { TabsPage } from '../tabs/tabs.page';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  
  constructor( private router: Router, private tabsPage: TabsPage, public route: ActivatedRoute) {

    this.tab3Species = this.route.snapshot.params.species;
  }

  tab3Species:string;

  goToCamera() {
    this.router.navigate(['tabs/camera']);
    };

}
