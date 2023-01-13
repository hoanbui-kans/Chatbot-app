import React from 'react'
import { Dialog, DialogBody, DialogFooter, Button, Stack, Flex, Typography } from '@strapi/design-system';
import { Trash,ExclamationMarkCircle } from '@strapi/icons'

const index = ({ OrderDelete, setOrderDelete, HandleDeleteOrder }) => {

  const HandleDelete = (e) => {
    setIsLoading(true);
    HandleDeleteOrder(e);
    setOrderDelete(false);
    setIsLoading(false)
  }
  
  return (
    <Dialog onClose={() => setOrderDelete(false)} title="Xóa nội dung" isOpen={OrderDelete}>
        <DialogBody icon={<ExclamationMarkCircle />}>
        <Stack spacing={2}>
            <Flex justifyContent="center">
            <Typography id="confirm-description">Bạn có muốn xóa nội dung này?</Typography>
            </Flex>
        </Stack>
        </DialogBody>
        <DialogFooter 
            startAction={<Button onClick={() => setOrderDelete(false)} variant="tertiary">Hủy</Button>} 
            endAction={<Button onClick={() => HandleDelete(OrderDelete)} variant="danger-light" startIcon={<Trash />}> Xác nhận</Button>} />
    </Dialog>
  )
}

export default index