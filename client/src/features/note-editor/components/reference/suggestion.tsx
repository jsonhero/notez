import { ReactRenderer } from '@tiptap/react'
import tippy, { Instance as TippyInstance, Props as TippyProps } from 'tippy.js'
import { SuggestionOptions } from '@tiptap/suggestion'

import { ReferenceList } from './reference-list'

export const referenceSuggestion: Pick<SuggestionOptions, 'render'> = {
  render: () => {
    let component: ReactRenderer<HTMLDivElement>
    let popup: TippyInstance<TippyProps>[]

    return {
      onStart: props => {
        component = new ReactRenderer(ReferenceList, {
          props,
          editor: props.editor,
        })

        if (!props.clientRect) {
          return
        }

        // @ts-ignore
        popup = tippy('body', {
          getReferenceClientRect: props.clientRect,
          appendTo: () => document.body,
          content: component.element,
          showOnCreate: true,
          interactive: true,
          trigger: 'manual',
          placement: 'bottom-start',
        })
      },

      onUpdate(props) {
        component.updateProps(props)

        if (!props.clientRect) {
          return
        }

        popup[0].setProps({
          // @ts-ignore
          getReferenceClientRect: props.clientRect,
        })
      },

      onKeyDown(props) {
        if (props.event.key === 'Escape') {
          popup[0].hide()

          return true
        }

        // @ts-ignore
        return component.ref?.onKeyDown(props)
      },

      onExit() {
        popup[0].destroy()
        component.destroy()
      },
    }
  },
}