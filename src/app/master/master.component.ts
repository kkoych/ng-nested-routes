import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { RandomnessService } from '../randomness.service';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss'],
})
export class MasterComponent implements OnInit {
  @Input() page: string | undefined = undefined;
  allQueryParamMap: ParamMap | null = null;
  componentParameters: any = {};
  existingComponentParams: string | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private rs: RandomnessService
  ) {}

  ngOnInit(): void {
    if (this.page === undefined) return;
    const pageString = this.castToString(this.page);

    this.route.queryParamMap.subscribe((paramMap) => {
      this.allQueryParamMap = paramMap;
      this.existingComponentParams = paramMap.get(pageString);
    });
  }

  onClick(): void {
    if (this.page === undefined) {
      this.router.navigate(['']);
      return;
    }

    // Build url for navigation
    // vvv IMPROVEMENT vvv
    let navUrl = this.router.url.split('?')[0];
    const pageIndexInUrl = navUrl.indexOf(this.page);
    if (!navUrl.endsWith('/')) navUrl += '/';
    if (pageIndexInUrl === -1) {
      navUrl += `${this.page}`;
    } else {
      navUrl = navUrl.slice(0, pageIndexInUrl + this.page.length);
    }
    // move to separate method in component
    // ^^^ IMPROVEMENT ^^^

    // Preserve and add new query parameters
    // vvv IMPROVEMENT vvv
    const urlSegmentsSet = new Set();
    navUrl
      .split('/')
      .filter((segment) => segment.length > 0)
      .forEach((segment) => {
        urlSegmentsSet.add(segment);
      });
    const existingParamKeysSet = new Set();
    if (this.allQueryParamMap?.keys.length === 0) {
      existingParamKeysSet.add(this.page);
    }
    if (!existingParamKeysSet.has(this.page)) {
      existingParamKeysSet.add(this.page);
    }
    this.allQueryParamMap?.keys.forEach((key) => {
      existingParamKeysSet.add(key);
    });
    const paramKeysSet = new Set(
      [...urlSegmentsSet].filter((segment) => existingParamKeysSet.has(segment))
    );
    const queryParams: Params = {};
    paramKeysSet.forEach((key) => {
      const keyString = this.castToString(key);
      const newParameters =
        keyString === this.page ? this.rs.generateParameters() : {};

      let oldParams = JSON.parse(
        this.allQueryParamMap?.get(keyString) as string
      );
      if (this.allQueryParamMap?.get(keyString) === null) {
        queryParams[keyString] = newParameters;
      } else {
        queryParams[keyString] = Object.assign(oldParams, newParameters);
      }
      queryParams[keyString] = JSON.stringify(queryParams[keyString]);
    });

    // move to separate method in component
    // ^^^ IMPROVEMENT ^^^
    this.router.navigate([navUrl], {
      queryParams: queryParams,
    });
  }

  // Helper function for TypeScript casting
  // vvv IMPROVEMENT vvv
  castToString(input: any): string {
    return input as string;
  }
  // move to separate file
  // ^^^ IMPROVEMENT ^^^
}
