import React, { useState } from 'react'
import { 
    Typography, Button, Box, Stack,
    AccordionGroup, Accordion, 
    AccordionToggle, IconButton, AccordionContent } from '@strapi/design-system';
import { TextInput } from '@strapi/design-system';
import slugify from 'slugify';
import { Pencil, Trash } from '@strapi/icons';

const index = ({ setEntityCreate, isLoading, HandleCreateEntity }) => {

  const [title, setTitle] = useState('');
  const [options, setOptions] = useState([]);
  
  const keywordSchema = {
    keyword: '',
  };

  const HandleCreate = async () => {
    const keywords = options.filter((val) => val.keyword != '');

    const data = {
      title: title,
      name: slugify( title, { replacement: '_', locale: 'vi' }),
      keywords: keywords
    }
    await HandleCreateEntity(data);
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


  return (
    <>
      <Stack spacing={3}>
          <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
            Tạo trường dữ liệu mới
          </Typography>
          <Stack background="neutral0" padding={3} spacing={3} borderColor="neutral200" hasRadius>
              <TextInput 
                placeholder="Nhập tiêu đề cho trường dữ liệu" 
                label="Tiêu đề" 
                name="title" 
                onChange={e => setTitle(e.target.value)} 
                value={title} />
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
            <Stack spacing={3} horizontal>
                <Button onClick={() => setEntityCreate(false)} variant="tertiary">
                    Hủy
                </Button>
                <Button 
                  onClick={HandleCreate}
                  loading={isLoading == 'create' ? true : false}>Tạo mới</Button>
            </Stack>
      </Stack>
    </>
  )
}

export default index