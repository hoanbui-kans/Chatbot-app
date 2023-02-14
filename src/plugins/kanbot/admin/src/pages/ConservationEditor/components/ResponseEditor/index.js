import React, { useState, useEffect } from 'react'
import { 
    Typography, Button, Box, Stack, 
    ModalLayout, ModalHeader, ModalBody,
    TextInput, IconButton, AccordionGroup, Accordion,    
    AccordionToggle, AccordionContent, Select, Option, Textarea   
} from '@strapi/design-system';

import { Pencil, Trash } from '@strapi/icons';

import { BillingField, ShippingField, ProductField } from '../models/OrderModel';
import { ProductModel } from '../models/ProductModel';

import Highlighter from "react-highlight-words";

const index = ({ intents }) => {

  const [message, setMessage] = useState('');

  const [options, setOptions] = useState([]); 
  const [highlightText, setHigtlightText] = useState([]);

  const keywordSchema = {
    entity: {
      id: "",
      title: "",
      name: ""
    },
    keyword: {
      start: "",
      end: "",
      body: ""
    },
  };


  const HandleUpdateKeyword = (index, option) => {
    let newOptions = [];
    options.map((val, _i) => {
      if(index == _i){
        newOptions.push(option)
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

  useEffect(() => {
    let Keywords = [];
    if(Array.isArray(options) && options.length){
      options.map((val) => {
        Keywords.push(val.keyword.body);
      })
    }
    setHigtlightText(Keywords);
    console.log(options);
  }, [options])

  // Complex example
  const findChunksAtBeginningOfWords = ({
    autoEscape,
    caseSensitive,
    sanitize,
    searchWords,
    textToHighlight
  }) => {
    const chunks = [];
    const textLow = textToHighlight.toLowerCase();
    // Add chunks for every searchWord
    const UpdateOptions = [];

    let indexOptions = 0;

    searchWords.forEach(sw => {
      const lw = sw.toLowerCase()
      const indexInWord = textLow.indexOf(lw);
      const start = indexInWord;
      const end = indexInWord + sw.length;
      let newOptions = options;

      if(start != -1){
        newOptions[indexOptions].keyword = {
            ...newOptions[indexOptions].keyword,
            start: start,
            end: end
        }
        chunks.push({
          body: sw,
          start: start,
          end: end
        });
      } else {
        newOptions[indexOptions].keyword = {
            ...newOptions[indexOptions].keyword,
            start: 0,
            end: 0
        }
        chunks.push({
          body: sw,
          start: 0,
          end: 0
        });
      }
      setOptions(newOptions);
      indexOptions++;
    });
    return chunks;
  };

  const [type, setType] = useState('ecommerce');

  return (
    <>
        <ModalLayout labelledBy="title">
                    <ModalHeader>
                      <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
                        Tạo cấu trúc câu thoại mới
                      </Typography>
                    </ModalHeader>
                    <ModalBody>
                    <Stack spacing={3}>
                      {
                        message !== '' ?    
                        <Box borderColor="neutral200" hasRadius background='neutral100' padding={3} spacing={3}>             
                            <Highlighter
                              highlightClassName="hightlightTxt"
                              searchWords={highlightText}
                              autoEscape={true}
                              textToHighlight={message}
                              findChunks={findChunksAtBeginningOfWords}
                            />
                        </Box>
                        : ""
                      }
                    <Stack spacing={3}>
                      <Textarea  
                        placeholder="Nhập đoạn văn bản tin nhắn" 
                        label="Đoạn văn bản tin nhắn" 
                        name="title" 
                        onChange={e => setMessage(e.target.value)} 
                        value={message} />
                    </Stack>
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
                                        title={`{${options[index].keyword.body ? options[index].keyword.body : "Từ khóa"}}`} 
                                        togglePosition="left" 
                                      />
                                      <AccordionContent>
                                        <Stack padding={3} spacing={3}>
                                            {
                                                type == 'ecommerce' ?
                                                    <Select 
                                                        label="Chọn dữ liệu" 
                                                        value={val.keyword.body}
                                                        onChange={(e) => HandleUpdateKeyword(index, {...val, keyword: { ...val.keyword, body: e}})}>
                                                        {
                                                            ProductModel.map((_val, _index) => {
                                                                return(
                                                                    <Option key={_index} value={_val.name}>{_val.label}</Option>
                                                                )
                                                            })
                                                        }
                                                    </Select>
                                                    : ""
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
        </ModalLayout>
    </>
  )
}

export default index