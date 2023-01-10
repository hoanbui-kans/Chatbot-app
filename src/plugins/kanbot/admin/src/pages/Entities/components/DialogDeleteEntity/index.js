import React from 'react'
import { Dialog, DialogBody, DialogFooter, Button, Stack, Flex, Typography } from '@strapi/design-system';
import { Trash,ExclamationMarkCircle } from '@strapi/icons'

const DeleteDialog = ({ deleteId, setDeleteId, HandleDeleteIntent }) => {

  const HandleDelete = (e) => {
    HandleDeleteIntent(e);
    setDeleteId(false);
  }
  
  return (
    <Dialog onClose={() => setDeleteId(false)} title="Xóa nội dung" isOpen={deleteId}>
        <DialogBody icon={<ExclamationMarkCircle />}>
        <Stack spacing={2}>
            <Flex justifyContent="center">
            <Typography id="confirm-description">Bạn có muốn xóa nội dung này?</Typography>
            </Flex>
        </Stack>
        </DialogBody>
        <DialogFooter 
            startAction={<Button onClick={() => setDeleteId(false)} variant="tertiary">Hủy</Button>} 
            endAction={<Button onClick={HandleDelete} variant="danger-light" startIcon={<Trash />}> Xác nhận</Button>} />
    </Dialog>
  )
}

export default DeleteDialog