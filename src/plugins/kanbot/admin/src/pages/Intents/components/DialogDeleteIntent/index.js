import React from 'react'
import { Dialog, DialogBody, DialogFooter, Button, Stack, Flex, Typography } from '@strapi/design-system';
import { Trash,ExclamationMarkCircle } from '@strapi/icons'

const DeleteDialog = ({ intentDelete, isLoading, setIntentDelete, HandleDeleteIntent }) => {
  return (
    <Dialog onClose={() => setIntentDelete(false)} title="Xóa nội dung" isOpen={intentDelete}>
        <DialogBody icon={<ExclamationMarkCircle />}>
        <Stack spacing={2}>
            <Flex justifyContent="center">
            <Typography id="confirm-description">Bạn có muốn xóa nội dung này?</Typography>
            </Flex>
        </Stack>
        </DialogBody>
        <DialogFooter 
          startAction={<Button onClick={() => setIntentDelete(false)} variant="tertiary">Hủy</Button>} 
          endAction={<Button 
          onClick={() => HandleDeleteIntent(intentDelete)} 
          variant="danger-light" 
          startIcon={<Trash />}
          loading={ isLoading == "delete" ? true : false}
        >Xác nhận</Button>} />
    </Dialog>
  )
}

export default DeleteDialog