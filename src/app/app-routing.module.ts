import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirstComponent } from './first/first.component';
import { SecondComponent } from './first/second/second.component';
import { FourthComponent } from './first/second/third/fourth/fourth.component';
import { ThirdComponent } from './first/second/third/third.component';

const routes: Routes = [
  {
    path: 'first',
    component: FirstComponent,
    children: [
      {
        path: 'second',
        component: SecondComponent,
        children: [
          {
            path: 'third',
            component: ThirdComponent,
            children: [
              {
                path: 'fourth',
                component: FourthComponent,
              },
            ],
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
