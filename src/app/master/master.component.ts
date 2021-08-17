import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Routes } from '@angular/router';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss'],
})
export class MasterComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (Object.entries(params).length > 0)
        console.log(JSON.parse(params.testOne));
    });
  }

  onClick() {
    const currentUrl = this.router.url;
    if (currentUrl.indexOf('first') === -1)
      return this.router.navigate(['program/first'], {
        queryParams: {
          testOne: JSON.stringify({ skip: 1, take: 2, total: 10 }),
        },
      });
    if (currentUrl.indexOf('second') === -1)
      return this.router.navigate(['program/first/second/'], {
        queryParamsHandling: 'preserve',
      });
    if (currentUrl.indexOf('third') === -1)
      return this.router.navigate(['program/first/second/third'], {
        queryParamsHandling: 'preserve',
      });
    return this.router.navigate(['program']);
  }
}
