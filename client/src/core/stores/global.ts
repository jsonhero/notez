import { makeAutoObservable } from 'mobx'

import { createProviderRequiredContext } from '@lib/context-util'

export class GlobalStore {
  selectedIdeaId: string | null = null;
  selectedMetadataTemplateId: string | null = null;

  constructor() {
    makeAutoObservable(this)
  }

  setSelectedIdeaId(ideaId: string | null) {
    this.selectedIdeaId = ideaId;
  }

  setSelectedMetadataTemplateId(metadataTemplateId: string | null) {
    this.selectedMetadataTemplateId = metadataTemplateId;
  }
}

export const GlobalStoreContext = createProviderRequiredContext(GlobalStore)
