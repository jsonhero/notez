import { makeAutoObservable } from 'mobx'

import { createProviderRequiredContext } from '@lib/context-util'

export class GlobalStore {
  selectedIdeaId: string | null = null;
  selectedMetadataTemplateId: string | null = null;
  leftBarExpanded: boolean = true;
  rightBarExpanded: boolean = true;

  constructor() {
    makeAutoObservable(this)
  }

  toggleLeftBar() {
    this.leftBarExpanded = !this.leftBarExpanded
  }

  toggleRightBar() {
    this.rightBarExpanded = !this.rightBarExpanded
  }

  setSelectedIdeaId(ideaId: string | null) {
    this.selectedIdeaId = ideaId;
  }

  setSelectedMetadataTemplateId(metadataTemplateId: string | null) {
    this.selectedMetadataTemplateId = metadataTemplateId;
  }
}

export const GlobalStoreContext = createProviderRequiredContext(GlobalStore)
