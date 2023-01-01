import React from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import { Placeholder } from '@tiptap/extension-placeholder'
import Document from '@tiptap/extension-document'
import Text from '@tiptap/extension-text'
import Paragraph from '@tiptap/extension-paragraph'
import _ from 'lodash'

import { AppNoteFragment, useUpdateNoteMutation } from '@gql/operations'
import './document-style.css'

import { Reference } from './extensions'
import { referenceSuggestion } from './reference'

const CustomDocument = Document.extend({
  content: 'block*',
})

interface DocumentEditorProps {
  note: AppNoteFragment;
}

export const DocumentEditor = ({ note }: DocumentEditorProps) => {
  const [_result, updateNoteMutation] = useUpdateNoteMutation()

  const updateNoteDocument = (docJson: any) => {
    updateNoteMutation({
      input: {
        noteId: note.id,
        note: {
          document: docJson,
        }
      }
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
      Reference.configure({
        HTMLAttributes: {
          class: 'reference',
        },
        suggestion: referenceSuggestion,
      })
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
