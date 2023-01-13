import React, { useState } from 'react'
import { ModalLayout, ModalBody, ModalHeader, ModalFooter, Typography, Button, Box, Stack} from '@strapi/design-system';
import { TextInput, IconButton, AccordionGroup, Flex, Accordion, AccordionToggle, AccordionContent } from '@strapi/design-system';
import { Cross, Pencil, Trash } from '@strapi/icons';
import Loading from '../../../../components/Loading';

const CreateModal = ({ setConnectionCreate, HandleCreateConnection }) => {

  const [title, setTitle] = useState('');
  const [options, setOptions] = useState([]);
  const keywordSchema = {
    keyword: '',
  };

  const HandleCreate = async () => {
    setIsLoading(true);
    const keywords = options.filter((val) => val.keyword != '');

    const data = {
      title: title,
      keywords: keywords
    }
    await HandleCreateConnection(data);
    setTitle('');
    setOptions([]);
    setConnectionCreate(false)
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
      <ModalLayout onClose={() => setConnectionCreate(false)} labelledBy="Tạo mục tiêu mới">
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
          </ModalBody>
          <ModalFooter startActions={<Button onClick={() => setConnectionCreate(false)} variant="tertiary">
                Hủy
            </Button>} endActions={<Button onClick={HandleCreate}>Lưu</Button>} />
      </ModalLayout>
    </>
  )
}

export default CreateModal