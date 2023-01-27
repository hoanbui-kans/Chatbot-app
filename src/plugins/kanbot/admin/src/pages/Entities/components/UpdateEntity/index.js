import React, { useState } from 'react'
import { ModalLayout, ModalBody, ModalHeader, ModalFooter, Typography, Button, Box, Stack} from '@strapi/design-system';
import { TextInput, IconButton, AccordionGroup, Flex, Accordion, AccordionToggle, AccordionContent } from '@strapi/design-system';
import { Cross, Pencil, Trash } from '@strapi/icons';
import Loading from '../../../../components/Loading';

const index = ({ setIsLoading, entityUpdate, setEntityUpdate, HandleUpdateEntity }) => {

  const [title, setTitle] = useState(entityUpdate.title);
  const [options, setOptions] = useState(entityUpdate.keywords);
  const keywordSchema = {
    keyword: '',
  };

  const HandleUpdate = async () => {
    setIsLoading(true);
    const keywords = options.filter((val) => val.keyword != '');
    const data = {
      ...entityUpdate,
      keywords: keywords
    }
    await HandleUpdateEntity(data);
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

  return (
    <>
      <Stack padding={3} hasRadius background="neutral0" borderColor="neutral200" spacing={3}>
          <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
                    Thêm nhận dạng cho "{title}"
                </Typography>
                <Stack spacing={3}>
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
                                        <Box padding={3}>
                                            <TextInput 
                                              style={{width: '100%'}}
                                              value={options[index].keyword}
                                              onChange={(e) => HandleUpdateKeyword(index, e.target.value)}
                                              placeholder="Nhập từ khóa" 
                                              label 
                                              name="content"
                                            />
                                        </Box>
                                      </AccordionContent>
                                </Accordion>
                                )
                              })
                            }
                        </AccordionGroup > : ""
                      }
                      <Box>
                        <Button variant="secondary" onClick={HandleAddKeyWords}>+ Thêm từ khóa</Button>
                      </Box>
                    </Stack>
                </Stack>
                <Stack horizontal spacing={3} style={{justifyContent: "end"}}>
                  <Button onClick={() => setEntityUpdate(false)} variant="tertiary">
                      Hủy
                  </Button>
                  <Button onClick={HandleUpdate}>Lưu</Button>
            </Stack>
      </Stack>
    </>
  )
}

export default index