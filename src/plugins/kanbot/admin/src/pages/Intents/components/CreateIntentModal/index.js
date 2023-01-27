import React, { useState, useEffect } from 'react'
import { ModalLayout, ModalBody, ModalHeader, ModalFooter, Typography, Button, Box, Stack} from '@strapi/design-system';
import { TextInput, Select, Option, Status } from '@strapi/design-system';
import { Drag, Pencil } from '@strapi/icons';

const CreateModal = ({ entities, isLoading, setIntentCreate, HandleCreateIntent }) => {

  const [title, setTitle] = useState('');

  const [updateEntities, setUpdateEntities] = useState([]);
  const [EntitiesSelected, setEntitiesSelected] = useState([]);

  const HandleCreate = async () => {
    const data = {
      title: title,
      entities: updateEntities,
    }
    await HandleCreateIntent(data);
    setTitle('');
    setUpdateEntities([]);
  }

  useEffect(() => {
    const selected = [];
    if(Array.isArray(updateEntities) && updateEntities.length){
        updateEntities.map((Id) => {
            let entry = entities.find((val) => val.id == Id);
            selected.push(entry);
        })
    }
    setEntitiesSelected(selected);
  }, [updateEntities]);


  return (
    <>
      <ModalLayout onClose={() => setIntentCreate(false)} labelledBy="Tạo mục tiêu mới">
          <ModalHeader>
            <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
              Tạo mục tiêu mới
            </Typography>
          </ModalHeader>
          <ModalBody>
            <Stack spacing={3}>
                <Box>
                  <TextInput 
                    placeholder="Nhập tiêu đề cho mục tiêu" 
                    label="Tiêu đề" 
                    name="title" 
                    onChange={e => setTitle(e.target.value)} 
                    value={title} 
                  />
                </Box>
                {
                  Array.isArray(entities) && entities.length ? 
                  <Stack spacing={3}>
                    <Select 
                      multi 
                      name="entities"
                      label="Chọn các trường dữ liệu" 
                      placeholder="Lựa chọn danh sách trường dữ liệu"
                      value={updateEntities} 
                      onChange={setUpdateEntities}
                      onClear={() => setUpdateEntities([])}
                      clearLabel="Xóa tất cả"
                      selectButtonTitle="Chọn danh sách sổ xuống"
                    >
                        {
                          entities.map((val) => {
                            return(
                              <Option key={val.id} value={val.id.toString()}>{val.title}</Option>
                            )
                          })
                        }
                    </Select>
                    {
                      Array.isArray(EntitiesSelected) && EntitiesSelected.length ? 
                        <Stack spacing={3}>
                            {
                              EntitiesSelected.map((val) => {
                                return (
                                  <Stack horizontal spacing={3} padding={2} hasRadius borderColor="neutral200">
                                      <Status variant="success" size="S" showBullet={false}>
                                        <Typography variant="pi">
                                          <Drag style={{width: 12, height: 12}}/>
                                        </Typography>
                                      </Status>
                                      <Typography fontWeight="bold">{val.title}</Typography>
                                  </Stack>
                                )
                              })
                            }
                        </Stack>
                      : ""
                    }
                    <Box>
                    </Box>
                  </Stack>
                  : ""
                }
            </Stack>
          </ModalBody>
          <ModalFooter startActions={<Button onClick={() => setIntentCreate(false)} variant="tertiary">
                Hủy
              </Button>} 
                  endActions={
                    <Button 
                      onClick={() => HandleCreate()} 
                      loading={ isLoading == "create" ? true : false}>
                        Lưu
                    </Button>
                  } />
      </ModalLayout>
    </>
  )
}

export default CreateModal