import React, { useState, useEffect } from 'react'
import { ModalLayout, ModalBody, ModalHeader, ModalFooter, Typography, Button, Box, Stack} from '@strapi/design-system';
import { TextInput, IconButton, AccordionGroup, Flex, Accordion, AccordionToggle, AccordionContent, Select, Option } from '@strapi/design-system';
import { findManyIntent } from '../../../../api/Intent';
import { findManyEntity } from '../../../../api/Entity';
import { Cross, Pencil, Trash } from '@strapi/icons';
import Loading from '../../../../components/Loading';

const CreateModal = ({ setUtteranceCreate, HandleCreateUtterance }) => {

  const [title, setTitle] = useState('');
  const [options, setOptions] = useState([]);
  const [entities, setEntities] = useState([]);
  const [intents, setIntents] = useState([]);

  const keywordSchema = {
    keyword: '',
  };

  const HandleCreate = async () => {
    const keywords = options.filter((val) => val.keyword != '');

    const data = {
      title: title,
      keywords: keywords
    }
    await HandleCreateUtterance(data);
    setTitle('');
    setOptions([]);
    setEntityCreate(false)
  }

  const HandleUpdateKeyword = (index, keyword) => {
    let newOptions = [];
    options.map((val, _i) => {
      if(index == _i){
        newOptions.push({
          keyword: keyword
        })
      } else {
        newOptions.push(val)
      }
    });
    setOptions(newOptions);
  }

  const HandleDeleteKeyword = (index) => {
    let newOption = options.filter((val, _i) => _i != index);
    setOptions(newOption);
  }

  const HandleAddKeyWords = () => {
    setOptions((options) => [...options, keywordSchema]);
  }

  const [expandedID, setExpandedID] = useState(null);

  const handleToggle = id => () => {
    setExpandedID(s => s === id ? null : id);
  };

  useEffect(async() => {
    if(!entities.length) {
      const getEntities = await findManyEntity();
      setEntities(getEntities);
    }
    if(!intents.length) {
      const getIntents = await findManyIntent();
      setIntents(getIntents);
    }
  }, []);

  return (
    <>
      <ModalLayout onClose={() => setUtteranceCreate(false)} labelledBy="Tạo mục tiêu mới">
          <ModalHeader>
            <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
              Tạo trường dữ liệu mới
            </Typography>
          </ModalHeader>
          <ModalBody>
            <Stack spacing={3}>
                <Box>
                  <TextInput 
                    placeholder="Nhập đoạn văn bản tin nhắn" 
                    label="Đoạn văn bản tin nhắn" 
                    name="title" 
                    onChange={e => setTitle(e.target.value)} 
                    value={title} />
                </Box>
                {
                  Array.isArray(intents) && intents.length ? 
                    <Select label="Mục tiêu">
                      {
                        intents.map((val) => <Option value={val.id.toString()} key={val.id}>{val.title}</Option>)
                      }
                    </Select>
                  :""
                }
                <Stack spacing={3}>
                {
                    Array.isArray(options) && options.length ?
                      <AccordionGroup>
                        {
                          options.map((val, index) => {
                            return(
                             <Accordion expanded={expandedID === `acc-${index}`} onToggle={handleToggle(`acc-${index}`)} id={`acc-${index}`} size="S">
                              <AccordionToggle 
                                    action={
                                    <Stack horizontal spacing={2}>
                                      <IconButton onClick={handleToggle(`acc-${index}`)} label="Chỉnh sửa" icon={<Pencil />} />
                                      <IconButton onClick={() => HandleDeleteKeyword(index)} label="Xóa" icon={<Trash />} />
                                    </Stack>
                                    } 
                                    title={options[index].keyword ? options[index].keyword : "Từ khóa"} 
                                    togglePosition="left" 
                                  />
                                  <AccordionContent>
                                    <Stack padding={3} spacing={3}>
                                        <TextInput 
                                          style={{width: '100%'}}
                                          value={options[index].keyword}
                                          onChange={(e) => HandleUpdateKeyword(index, e.target.value)}
                                          placeholder="Nhập từ khóa" 
                                          label 
                                          name="content"
                                        />
                                        {
                                          Array.isArray(entities) && entities.length ? 
                                            <Select label="Mục tiêu">
                                              {
                                                entities.map((val) => <Option value={val.id.toString()} key={val.id}>{val.title}</Option>)
                                              }
                                            </Select>
                                          :""
                                        }
                                    </Stack>
                                  </AccordionContent>
                            </Accordion>
                            )
                          })
                        }
                    </AccordionGroup > : ""
                  }
                  <Box>
                    <Button variant="secondary" onClick={HandleAddKeyWords}>+ Thêm nhận dạng</Button>
                  </Box>
                </Stack>
            </Stack>
          </ModalBody>
          <ModalFooter startActions={<Button onClick={() => setUtteranceCreate(false)} variant="tertiary">
                Hủy
            </Button>} endActions={<Button onClick={HandleCreate}>Lưu</Button>} />
      </ModalLayout>
    </>
  )
}

export default CreateModal