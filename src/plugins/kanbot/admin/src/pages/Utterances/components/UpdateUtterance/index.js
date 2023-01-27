import React, { useState, useEffect } from 'react'
import { Typography, Button, Box, Stack } from '@strapi/design-system';
import { TextInput, IconButton, AccordionGroup, Accordion, 
         AccordionToggle, AccordionContent, Select, Option  
  } from '@strapi/design-system';
import { Pencil, Trash } from '@strapi/icons';
import Highlighter from "react-highlight-words";

const index = ({ intents, entities, isLoading, utteranceUpdate, setUtteranceUpdate, HandleUpdateUtterance }) => {
  console.log(utteranceUpdate);
  const [message, setMessage] = useState(utteranceUpdate.message);
  const [intent, setIntent] = useState({
    id: utteranceUpdate.intent.id.toString(),
    title: utteranceUpdate.intent.title,
    name: utteranceUpdate.intent.name
  });

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

  useEffect(() => {
    let NewOptions = [];
    if(Array.isArray(utteranceUpdate.entities) && utteranceUpdate.entities.length){
      utteranceUpdate.entities.map((val) => {
        NewOptions.push({
          keyword: {
            start: "",
            end: "",
            body: val.keyword
          },
          entity: {
            id: val.entity.id.toString(),
            title: val.entity.title,
            name: val.entity.name
          }
        })
      })
    }

    setOptions(NewOptions)
  }, [])

  async function HandleCreate () {
    const filterKeywords = options.filter((val) => val.keyword != '' && val.entity != '');
    const data = {
      message: message,
      intent: intent,
      entities: filterKeywords
    }
    await HandleUpdateUtterance(utteranceUpdate.id, data);
    setUtteranceUpdate(false)
  }

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

    console.log('chunks', chunks)
    return chunks;
  };

  return (
    <>
       <Stack borderColor="neutral200" hasRadius background='neutral0' padding={3} spacing={3}>
              <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
                Tạo cấu trúc câu thoại mới
              </Typography>
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
                <TextInput 
                  placeholder="Nhập đoạn văn bản tin nhắn" 
                  label="Đoạn văn bản tin nhắn" 
                  name="title" 
                  onChange={e => setMessage(e.target.value)} 
                  value={message} />
              </Stack>
              {
                Array.isArray(intents) && intents.length ? 
                  <Select 
                    label="Xác minh cho chiến dịch" 
                    value={intent.id} 
                    onChange={(e) => setIntent({
                      id: e,
                      name: intents.find((val) => val.id == e).name
                    })}>
                    { intents.map((val) => <Option value={val.id.toString()} key={val.id}>{val.title}</Option>) }
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
                                  title={options[index].keyword.body ? options[index].keyword.body : "Từ khóa"} 
                                  togglePosition="left" 
                                />
                                <AccordionContent>
                                  <Stack padding={3} spacing={3}>
                                      <TextInput 
                                        style={{width: '100%'}}
                                        value={val.keyword.body}
                                        onChange={(e) => HandleUpdateKeyword(index, {...val, keyword: { ...val.keyword, body: e.target.value}})}
                                        placeholder="Nhập từ khóa" 
                                        label="Từ khóa cho đoạn văn bản" 
                                        name="content"
                                      />
                                      {
                                        Array.isArray(entities) && entities.length ? 
                                          <Select 
                                            label="Mục tiêu" 
                                            value={options[index].entity.id} 
                                            onChange={(e) => HandleUpdateKeyword(index, {...val, 
                                              entity: {
                                                id: e,
                                                name: entities.find((val) => val.id == e).name
                                              }})}>
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
              <Stack horizontal spacing={3}>
                  <Button 
                    onClick={() => setUtteranceCreate(false)} 
                    variant="tertiary">
                      Hủy
                  </Button>
                  <Button 
                  onClick={HandleCreate}
                  loading={isLoading == 'update' ? true : false}
                  >Lưu</Button>
              </Stack>
          </Stack>
    </>
  )
}

export default index