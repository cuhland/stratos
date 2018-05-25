import { Injectable } from '@angular/core';
import { Headers, Http, URLSearchParams } from '@angular/http';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { AppState } from '../app-state';
import {
  SetUAAScope,
  SETUP_UAA,
  SETUP_UAA_SCOPE,
  SetupUAA,
  SetupUAAFailed,
  SetupUAASuccess,
} from './../actions/setup.actions';

@Injectable()
export class UAASetupEffect {

  constructor(
    private http: Http,
    private actions$: Actions,
    private store: Store<AppState>
  ) { }

  baseUrl = '/pp/v1/setup';

  @Effect() uaaSetupRequest$ = this.actions$.ofType<SetupUAA>(SETUP_UAA)
    .switchMap(({ setupData }) => {

      const headers = new Headers();
      const params = new URLSearchParams();

      params.set('console_client', setupData.console_client);
      params.set('username', setupData.username);
      params.set('password', setupData.password);
      params.set('skip_ssl_validation', setupData.skip_ssl_validation.toString() || 'false');
      params.set('uaa_endpoint', setupData.uaa_endpoint);

      if (setupData.console_client_secret) {
        params.set('console_client_secret', setupData.console_client_secret);
      }

      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      return this.http.post(this.baseUrl, params, {
        headers
      })
        .map(data => new SetupUAASuccess(data.json()))
        .catch((err, caught) => [new SetupUAAFailed(`Failed to setup UAA endpoint. ${this.fetchError(err)}`)]);
    });

  @Effect() uassSetScope = this.actions$.ofType<SetUAAScope>(SETUP_UAA_SCOPE)
    .switchMap(({ scope }) => {
      const headers = new Headers();
      const params = new URLSearchParams();

      params.set('console_admin_scope', scope);
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      return this.http.post(`${this.baseUrl}/update`, params, {
        headers
      })
        .map(data => new SetupUAASuccess({}))
        .catch((err, caught) => [new SetupUAAFailed(`Failed to setup Administrator scope. ${this.fetchError(err)}`)]);
    });

  private fetchError(err): string {
    try {
      const body = JSON.parse(err._body);
      return body.error;
    } catch (err) { }
    return '';
  }
}
