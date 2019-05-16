import { Action } from '@ngrx/store';
import { EntityCatalogueHelpers } from '../../../core/src/core/entity-catalogue/entity-catalogue.helper';
import {
  applicationSchemaKey,
  appStatsSchemaKey,
  appSummarySchemaKey,
  cfUserSchemaKey,
  organizationSchemaKey,
  routeSchemaKey,
  serviceInstancesSchemaKey,
  spaceSchemaKey,
  userProfileSchemaKey,
  userProvidedServiceInstanceSchemaKey
} from '../helpers/entity-factory';
import { endpointStoreNames } from '../types/endpoint.types';
import { IRequestDataState, IRequestState } from '../types/entity.types';
import { RequestTypes } from './../actions/request.actions';
import { requestDataReducerFactory } from './api-request-data-reducer/request-data-reducer.factory';
import { requestReducerFactory } from './api-request-reducer/request-reducer.factory';
import { IRequestArray } from './api-request-reducer/types';
import { appStatsReducer } from './app-stats-request.reducer';
import { applicationAddRemoveReducer } from './application-add-remove-reducer';
import { updateApplicationRoutesReducer } from './application-route.reducer';
import { endpointDisconnectApplicationReducer } from './endpoint-disconnect-application.reducer';
import { addOrUpdateUserFavoriteMetadataReducer, deleteUserFavoriteMetadataReducer } from './favorite.reducer';
import { updateOrganizationSpaceReducer } from './organization-space.reducer';
import { routeReducer, updateAppSummaryRoutesReducer } from './routes.reducer';
import { serviceInstanceReducer } from './service-instance.reducer';
import { systemEndpointsReducer } from './system-endpoints.reducer';
import { endpointDisconnectUserReducer, userReducer, userSpaceOrgReducer } from './users.reducer';
import { userFavoritesEntitySchema } from '../../../core/src/base-entity-types';


/**
 * This module uses the request data reducer and request reducer factories to create
 * the reducers to be used when making http requests
 */

const requestActions = [
  RequestTypes.START,
  RequestTypes.SUCCESS,
  RequestTypes.FAILED,
  RequestTypes.UPDATE
] as IRequestArray;

function chainReducers(baseReducer, extraReducers) {
  return (state, action) => {
    let newState = baseReducer(state, action);
    let nextState;
    Object.keys(extraReducers).forEach(key => {
      nextState = extraReducers[key].reduce((s, reducer) => {
        return reducer(s, action);
      }, newState[key]);
      if (nextState !== newState[key]) {
        newState = {
          ...newState,
          ...{
            [key]: nextState
          }
        };
      }
    });
    return newState;
  };
}
// Extensions can add to this list
// TODO: These should all be put somewhere nice - NJ
const baseStratosEntities = [
  EntityCatalogueHelpers.endpointType,
  userProfileSchemaKey,
  userFavoritesEntitySchema.entityType,
  'user',
  'system'
];

export function registerAPIRequestEntity(schemaKey: string) {
  // TODO Can this be done via an action that the catalogue fires off? NJ
  baseStratosEntities.push(schemaKey);
}

export function requestReducer(state: IRequestState, action: Action) {
  const baseRequestReducer = requestReducerFactory(baseStratosEntities, requestActions);
  const extraReducers = {
    [appStatsSchemaKey]: [appStatsReducer]
  };
  return chainReducers(baseRequestReducer, extraReducers)(state, action);
}

export function requestDataReducer(state: IRequestDataState, action: Action) {
  const baseDataReducer = requestDataReducerFactory(baseStratosEntities, requestActions);

  const extraReducers = {
    [cfUserSchemaKey]: [userReducer, endpointDisconnectUserReducer],
    [routeSchemaKey]: [routeReducer],
    [serviceInstancesSchemaKey]: [serviceInstanceReducer],
    [userProvidedServiceInstanceSchemaKey]: [serviceInstanceReducer],
    [endpointStoreNames.type]: [systemEndpointsReducer],
    [appSummarySchemaKey]: [updateAppSummaryRoutesReducer],
    [applicationSchemaKey]: [
      updateApplicationRoutesReducer(),
      endpointDisconnectApplicationReducer()
    ],
    [spaceSchemaKey]: [
      endpointDisconnectApplicationReducer(),
      applicationAddRemoveReducer(),
      userSpaceOrgReducer(true)
    ],
    [organizationSchemaKey]: [
      updateOrganizationSpaceReducer(),
      endpointDisconnectApplicationReducer(),
      userSpaceOrgReducer(false)
    ],
    [userFavoritesEntitySchema.entityType]: [
      addOrUpdateUserFavoriteMetadataReducer,
      deleteUserFavoriteMetadataReducer
    ]
  };

  return chainReducers(baseDataReducer, extraReducers)(state, action);
}
