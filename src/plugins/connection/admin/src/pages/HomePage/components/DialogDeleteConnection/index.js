import React from 'react'
import { Dialog, DialogBody, DialogFooter, Button, Stack, Flex, Typography } from '@strapi/design-system';
import { Trash,ExclamationMarkCircle } from '@strapi/icons'

const index = ({ ConnectionDelete, setConnectionDelete, HandleDeleteConnection }) => {

  const HandleDelete = (e) => {
    HandleDeleteConnection(e);
    setConnectionDelete(false);
  }
  
  return (
    <Dialog onClose={() => setConnectionDelete(false)} title="Xóa nội dung" isOpen={ConnectionDelete}>
        <DialogBody icon={<ExclamationMarkCircle />}>
        <Stack spacing={2}>
            <Flex justifyContent="center">
            <Typography id="confirm-description">Bạn có muốn xóa nội dung này?</Typography>
            </Flex>
        </Stack>
        </DialogBody>
        <DialogFooter 
            startAction={<Button onClick={() => setConnectionDelete(false)} variant="tertiary">Hủy</Button>} 
            endAction={<Button onClick={() => HandleDelete(ConnectionDelete)} variant="danger-light" startIcon={<Trash />}> Xác nhận</Button>} />
    </Dialog>
  )
}

export default index