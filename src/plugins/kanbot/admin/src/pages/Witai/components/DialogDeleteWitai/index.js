import React from 'react'
import { Dialog, DialogBody, DialogFooter, Button, Stack, Flex, Typography } from '@strapi/design-system';
import { Trash,ExclamationMarkCircle } from '@strapi/icons'

const index = ({ WitaiDelete, setWitaiDelete, HandleDeleteWitai }) => {

  const HandleDelete = (e) => {
    HandleDeleteWitai(e);
    setWitaiDelete(false);
  }
  
  return (
    <Dialog onClose={() => setWitaiDelete(false)} title="Xóa nội dung" isOpen={WitaiDelete}>
        <DialogBody icon={<ExclamationMarkCircle />}>
        <Stack spacing={2}>
            <Flex justifyContent="center">
            <Typography id="confirm-description">Bạn có muốn xóa nội dung này?</Typography>
            </Flex>
        </Stack>
        </DialogBody>
        <DialogFooter 
            startAction={<Button onClick={() => setWitaiDelete(false)} variant="tertiary">Hủy</Button>} 
            endAction={<Button onClick={() => HandleDelete(WitaiDelete)} variant="danger-light" startIcon={<Trash />}> Xác nhận</Button>} />
    </Dialog>
  )
}

export default index