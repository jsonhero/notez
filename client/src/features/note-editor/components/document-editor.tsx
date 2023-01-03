import React from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import { Placeholder } from '@tiptap/extension-placeholder'
import Document from '@tiptap/extension-document'
import Text from '@tiptap/extension-text'
import Paragraph from '@tiptap/extension-paragraph'
import _ from 'lodash'

import { AppIdeaFragment, useUpdateIdeaMutation } from '@gql/operations'
import './document-style.css'

import { Reference } from './extensions'
import { referenceSuggestion } from './reference'

const CustomDocument = Document.extend({
  content: 'block*',
})

interface DocumentEditorProps {
  idea: AppIdeaFragment;
}

export const DocumentEditor = ({ idea }: DocumentEditorProps) => {
  const [_result, updateIdeaMutation] = useUpdateIdeaMutation()

  const updateIdeaDocument = (docJson: any) => {
    updateIdeaMutation({
      input: {
        ideaId: idea.id,
        idea: {
          document: docJson,
        }
      }
    })
  }
  const updateIdeaDocumentThrottled = _.throttle(updateIdeaDocument, 2000)
  
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
      updateIdeaDocumentThrottled(editor.getJSON())
    },
    content: idea.document || '<p></p>',
  }, [idea.id])

  return (
    <EditorContent editor={editor} />
  )
}
