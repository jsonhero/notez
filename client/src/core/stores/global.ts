import { makeAutoObservable } from 'mobx'

import { createProviderRequiredContext } from '@lib/context-util'

export class GlobalStore {
  selectedNoteId: string | null = null;
  selectedNoteTableId: string | null = null;

  constructor() {
    makeAutoObservable(this)
  }

  setSelectedNoteId(noteId: string | null) {
    this.selectedNoteId = noteId;
  }

  setSelectedNoteTableId(noteTableId: string | null) {
    this.selectedNoteTableId = noteTableId;
  }
}

export const GlobalStoreContext = createProviderRequiredContext(GlobalStore)
