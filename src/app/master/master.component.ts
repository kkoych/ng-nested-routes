import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Routes } from '@angular/router';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss'],
})
export class MasterComponent implements OnInit {
  @Input() page: string = '';
  parameters = {};
  paramString = '';

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params[this.page] === undefined) return;
      const queryFromURI = decodeURIComponent(params[this.page]);
      this.parameters = JSON.parse(queryFromURI);
      this.paramString = queryFromURI;
    });
  }

  onClick() {
    if (this.page.length === 0) return this.router.navigate(['']);

    let navUrl = this.router.url.split('?')[0];
    const pageIndexInUrl = navUrl.indexOf(this.page);
    if (!navUrl.endsWith('/')) navUrl += '/';
    if (pageIndexInUrl === -1) {
      navUrl += `${this.page}`;
    } else {
      navUrl = navUrl.slice(0, pageIndexInUrl + this.page.length);
    }

    const params: any = {};
    params[this.page] = encodeURIComponent(
      JSON.stringify({
        skip: ~~(Math.random() * 10),
        take: ~~(Math.random() * 10),
      })
    );

    return this.router.navigate([navUrl], {
      queryParams: params,
      queryParamsHandling: 'merge',
    });
  }
}
