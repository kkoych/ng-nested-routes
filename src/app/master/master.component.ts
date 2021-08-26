import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss'],
})
export class MasterComponent implements OnInit {
  @Input() page: string | undefined = undefined;
  parameters = {};
  paramString = '';

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    if (this.page === undefined) return;

    this.route.queryParams.subscribe((params) => {
      // Helper function for TypeScript
      // vvv IMPROVEMENT vvv
      function castToString(input: any): string {
        return input as string;
      }
      // move to separate file
      // ^^^ IMPROVEMENT ^^^

      const castPageAsString = castToString(this.page);
      if (params[castPageAsString] === undefined) return;
      const queryFromURI = decodeURIComponent(params[castPageAsString]);
      this.parameters = JSON.parse(queryFromURI);
      this.paramString = queryFromURI;
    });
  }

  onClick(): void {
    if (this.page === undefined) {
      this.router.navigate(['']);
      return;
    }

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
        skip: ~~(Math.random() * 100),
        take: ~~(Math.random() * 100),
      })
    );

    this.router.navigate([navUrl], {
      queryParams: params,
      queryParamsHandling: 'merge',
    });
  }
}
