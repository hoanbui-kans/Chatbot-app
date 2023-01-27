import React from 'react'
import { Dialog, DialogBody, DialogFooter, Button, Stack, Flex, Typography } from '@strapi/design-system';
import { Trash,ExclamationMarkCircle } from '@strapi/icons'

const index = ({ entityDelete, setEntityDelete, HandleDeleteEntity }) => {
  return (
    <Dialog onClose={() => setEntityDelete(false)} title="Xóa nội dung" isOpen={entityDelete}>
        <DialogBody icon={<ExclamationMarkCircle />}>
        <Stack spacing={2}>
            <Flex justifyContent="center">
            <Typography id="confirm-description">Bạn có muốn xóa nội dung này?</Typography>
            </Flex>
        </Stack>
        </DialogBody>
        <DialogFooter 
            startAction={<Button onClick={() => setEntityDelete(false)} variant="tertiary">Hủy</Button>} 
            endAction={<Button onClick={() => HandleDeleteEntity(entityDelete)} variant="danger-light" startIcon={<Trash />}> Xác nhận</Button>} />
    </Dialog>
  )
}

export default index