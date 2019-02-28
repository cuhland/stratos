import { Store } from '@ngrx/store';

import { ListDataSource } from '../../../../shared/components/list/data-sources-controllers/list-data-source';
import { IListConfig } from '../../../../shared/components/list/list.component.types';
import { AppState } from '../../../../../../store/src/app-state';
import { BaseKubeGuid } from '../../kubernetes-page.types';
import { GetKubernetesPods } from '../../store/kubernetes.actions';

import { entityFactory } from '../../../../../../store/src/helpers/entity-factory';
import { KubernetesPod } from '../../store/kube.types';
import { kubernetesPodsSchemaKey } from '../../store/kubernetes.entities';

export class KubernetesPodsDataSource extends ListDataSource<KubernetesPod, any> {

  constructor(
    store: Store<AppState>,
    kubeGuid: BaseKubeGuid,
    listConfig: IListConfig<KubernetesPod>
  ) {
    const action = new GetKubernetesPods(kubeGuid.guid);
    super({
      store,
      action,
      schema: entityFactory(kubernetesPodsSchemaKey),
      getRowUniqueId: object => object.name,
      paginationKey: action.paginationKey,
      isLocal: true,
      listConfig,
      transformEntities: [{ type: 'filter', field: 'metadata.name' }]
    });
  }

}
