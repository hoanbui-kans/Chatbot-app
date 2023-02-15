import React, { useState, useEffect } from 'react'
import { 
    Typography, Button, Box, Stack, Select, 
    Option, Textarea
} from '@strapi/design-system';

import { BillingField, ShippingField, ProductField } from '../../models/OrderModel';
import { ProductModel } from '../../models/ProductModel';

import Highlighter from "react-highlight-words";

const ResponseController = ({ stateEditor }) => {

  const [message, setMessage] = useState('');
  const [options, setOptions] = useState([]); 
  const [highlightText, setHigtlightText] = useState([]);
  
  const HandleAddKeyToMessage = (e) => {
    setMessage((message) => message + ' ' + e)
  }

  const HandleUpdateKeyword = (e) => {
    setOptions(e);
  }

  const HandleDeleteKeyword = (index) => {
    let newOption = options.filter((val, _i) => _i != index);
    setOptions(newOption);
  }

  const [expandedID, setExpandedID] = useState(null);

  const handleToggle = id => () => {
    setExpandedID(s => s === id ? null : id);
  };

  useEffect(() => {
    let Keywords = [];
    if(Array.isArray(options) && options.length){
      options.map((val) => {
        Keywords.push(`{${val}}`);
      })
    }
    setHigtlightText(Keywords);
  }, [options])

  const [type, setType] = useState('ecommerce');

  return (
    <>
      <Stack spacing={3}>
            <Typography variant="beta" fontWeight="bold" textColor="neutral800">
                Tạo cấu trúc câu thoại mới
            </Typography>
            {
            message !== '' ?    
            <Box borderColor="neutral200" hasRadius background='neutral100' padding={3} spacing={3}>             
                <Highlighter
                    highlightClassName="hightlightTxt"
                    searchWords={options.map((val) => `{${val}}`)}
                    autoEscape={false}
                    textToHighlight={message}
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
            <Select label="Dữ liệu đầu vào">
                <Option>Sản phẩm</Option>
                <Option>Dịch vụ</Option>
                <Option>Thông tin đơn hàng</Option>
            </Select>
            {
                Array.isArray(options) && options.length ?
                <Stack horizontal spacing={1}>
                {
                    options.map((val, index) => {
                    return(
                        <Button 
                          size="S" 
                          key={index} 
                          padding={3} 
                          variant="secondary"
                          onClick={() => HandleAddKeyToMessage(`{${val}}`)}
                        >
                        {`{${val}}`}
                        </Button>
                    )
                    })
                }
                </Stack> : ""
            }
            {
                type == 'ecommerce' ?
                    <Select 
                        label="Chọn dữ liệu" 
                        value={options}
                        onClear={() => setOptions([])}
                        multi withTags
                        onChange={(e) => HandleUpdateKeyword(e)}>
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
    </Stack>
    <Button>Lưu mẫu</Button>
    </>
  )
}

export default ResponseController