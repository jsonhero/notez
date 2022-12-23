import { makeAutoObservable } from 'mobx'

import { createProviderRequiredContext } from '@lib/context-util'

export class GlobalStore {
  selectedNoteId: string | null = null;

  constructor() {
    makeAutoObservable(this)
  }

  setSelectedNoteId(noteId: string) {
    this.selectedNoteId = noteId;
  }
}

export const GlobalStoreContext = createProviderRequiredContext(GlobalStore)
