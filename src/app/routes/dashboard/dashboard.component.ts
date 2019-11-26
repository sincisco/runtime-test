import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { CustomCompRepo } from '@data-studio/component/custom';
import { StandardCompRepo } from '@data-studio/component/standard';
import { mockGeneratorRepo } from '@data-studio/generator/mock';
import { standardGeneratorRepo } from '@data-studio/generator/standard';
import { Runtime } from '@data-studio/runtime';
import { IPage } from '@data-studio/shared';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {

  _page: IPage;

  constructor(private http: _HttpClient) {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    const runtime = Runtime.getInstance();
    runtime.addComponentRepository([StandardCompRepo, CustomCompRepo]);
    runtime.addGeneratorRepository([standardGeneratorRepo, mockGeneratorRepo]);

    this.http.get('assets/tmp/zijin.template.json').subscribe((file) => {
      const page = this._page = runtime.open(file);
      document.getElementById('app-content').append(page.element);
      document.getElementById('app-content').addEventListener('click', () => {
        page.enterFullScreen();
      });
    });
  }

  ngOnDestroy(): void {
    this._page.destroy();
  }

}
