import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../home/tab1.module').then(m => m.Tab1PageModule)
          }
        ]
      },
      {
        path: 'camera',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../camera/tab2.module').then(m => m.Tab2PageModule)
          }
        ]
      },
      {
        path: 'results',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../results/tab3.module').then(m => m.Tab3PageModule)
          }
        ]
      },
      {
        path: 'results/:species',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../results/tab3.module').then(m => m.Tab3PageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
