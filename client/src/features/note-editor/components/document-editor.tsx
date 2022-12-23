import React from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import { Placeholder } from '@tiptap/extension-placeholder'
import Document from '@tiptap/extension-document'
import Text from '@tiptap/extension-text'
import Paragraph from '@tiptap/extension-paragraph'
import _ from 'lodash'

import { useNoteControllerUpdateNoteDocument } from '@api'
import { NoteDto } from '@api/models'
import './document-style.css'

const CustomDocument = Document.extend({
  content: 'block*',
})

interface DocumentEditorProps {
  note: NoteDto;
}

export const DocumentEditor = ({ note }: DocumentEditorProps) => {
  const { mutate: mutateUpdateNoteDocument } = useNoteControllerUpdateNoteDocument()

  const updateNoteDocument = (docJson: any) => {
    mutateUpdateNoteDocument({
      noteId: note.id,
      data: {
        document: docJson,
      },
    })
  }
  const updateNoteDocumentThrottled = _.throttle(updateNoteDocument, 2000)
  
  const editor = useEditor({
    extensions: [
      CustomDocument,
      Paragraph,
      Text,
      Placeholder.configure({
        // showOnlyWhenEditable: false,
        // showOnlyCurrent: false,
        placeholder: ({ node }) => {
          return 'Add Content'
        },
      }),
    ],
    onUpdate({ editor }) {
      updateNoteDocumentThrottled(editor.getJSON())
    },
    content: note.document || '<p></p>',
  }, [note.id])

  return (
    <EditorContent editor={editor} />
  )
}
