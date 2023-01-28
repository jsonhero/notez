import React, { useState } from 'react';
import EmojiPicker, { Emoji, EmojiClickData } from 'emoji-picker-react';
import { Button, Box, Popover, PopoverTrigger, PopoverContent } from '@chakra-ui/react'

import { AppMetadataTemplateFragment, useUpdateMetadataTemplateMutation } from '@gql/operations'

interface IconPickerProps {
  metadataTemplate: AppMetadataTemplateFragment;
}

export const IconPicker = ({ metadataTemplate }: IconPickerProps) => {
  const [selectedEmoji, setSelectedEmoji] = useState<string>(metadataTemplate.unicodeIcon || '1f423')
  const [_result, updateMetadataTemplateMutation] = useUpdateMetadataTemplateMutation()

  const onSelectEmoji = (data: EmojiClickData) => {
    setSelectedEmoji(data.unified)

    updateMetadataTemplateMutation({
      input: {
        metadataTemplateId: metadataTemplate.id,
        template: {
          unicodeIcon: data.unified,
        }
      }
    })
  }

  return (
    <Box mb="small">
      <Popover>
        <PopoverTrigger>
          <Button variant="unstyled">
            <Emoji unified={selectedEmoji} size={24} />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <EmojiPicker onEmojiClick={onSelectEmoji}/>
        </PopoverContent>
      </Popover>
    </Box>
  )
}