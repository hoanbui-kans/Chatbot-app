import React, { useState, useEffect } from 'react'
import { ModalLayout, ModalBody, ModalHeader, ModalFooter, Typography, Button, Box, Stack} from '@strapi/design-system';
import { TextInput, Status, Grid, GridItem, IconButton } from '@strapi/design-system';
import { Cross } from '@strapi/icons';
import Drag from '@strapi/icons/Drag';

const CreateModal = ({ setEntityCreate, HandleCreateEntity }) => {

  const [title, setTitle] = useState('');
  const [updateEntities, setUpdateEntities] = useState([]);
  const [EntitiesSelected, setEntitiesSelected] = useState([]);

  const [values, setValues] = useState([]);

  const [options, setOptions] = useState([{
    keyword: '',
    synonyms: ['Nhập tiêu đề cho mục tiêu' , 'Nhập tiêu đề cho mục tiêu',, 'Nhập tiêu đề cho mục tiêu', 'Nhập tiêu đề cho mục tiêu', 'Nhập tiêu đề cho mục tiêu', 'Nhập tiêu đề cho mục tiêu']
  }]);

  const HandleCreate = async () => {
    const data = {
      title: title,
      entities: updateEntities,
    }
    await HandleCreateEntity(data);
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
      <ModalLayout onClose={() => setEntityCreate(false)} labelledBy="Tạo mục tiêu mới">
          <ModalHeader>
            <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
              Tạo trường dữ liệu mới
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
                    value={title} />
                </Box>
                <Box>
                {
                    Array.isArray(options) && options.length ?
                      options.map((val, index) => {
                        return(
                          <Box padding={3} borderColor="neutral200" hasRadius key={index}>
                            <Stack spacing={4}>
                              <TextInput 
                                  placeholder="Nhập từ khóa" 
                                  label="Từ khóa" 
                                  name="content"
                              />
                              <Stack padding={3} background="neutral100" hasRadius spacing={4}>
                                <TextInput 
                                    placeholder="Nhập từ đồng nghĩa" 
                                    label="Từ đồng nghĩa" 
                                    name="content"
                                />
                                {
                                  Array.isArray(val.synonyms) && val.synonyms.length ? 
                                    <Grid gap={3} horizontal>
                                        {
                                          val.synonyms.map((val, index) => {
                                            return(
                                                <GridItem col={3}>
                                                    <Status 
                                                        size='S'
                                                        showBullet={false}
                                                        key={index}
                                                        variant='primary'
                                                        >
                                                        <Stack spacing={3} variant="alternative" horizontal>
                                                            <Typography variant="pi" fontWeight="bold">{ val }</Typography>
                                                            <IconButton style={{background: "unset"}} noBorder size="S"  label="Xóa" icon={<Cross stylle={{width: 8, height: 8}}/>}/>
                                                        </Stack>
                                                    </Status>
                                                </GridItem>
                                              )
                                          })
                                        }
                                    </Grid>
                                  : ""
                                }
                              </Stack>
                            </Stack>
                          </Box>
                        )
                      }) : ""
                  }
                </Box>
            </Stack>
          </ModalBody>
          <ModalFooter startActions={<Button onClick={() => setEntityCreate(false)} variant="tertiary">
                Hủy
            </Button>} endActions={<Button onClick={() => HandleCreate()}>Lưu</Button>} />
      </ModalLayout>
    </>
  )
}

export default CreateModal