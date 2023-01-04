import { Position } from 'reactflow';
import { useSelector } from 'react-redux';

export const DefaultTemplate = (id) => {
  return ({
    id: id,
    type: 'default-template',
    // you can also pass a React component as a label
    data: { 
      title: 'Mặc định',
      value: '' 
    },
    position: { x: 150, y: 125 },
    targetPosition: Position.Left,
  })
}

export const EmailTemplate = (id) => {
    return ({
      id: id,
      type: 'email-template',
      // you can also pass a React component as a label
      data: { 
        title: 'Địa chỉ Email',
        value: 'customer@gmail.com' 
      },
      position: { x: 150, y: 125 },
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
    })
}

export const PhoneTemplate = (id) => {
  return ({
    id: id,
    type: 'phone-template',
    // you can also pass a React component as a label
    data: { 
      title: 'Số điện thoại',
      value: '' 
    },
    position: { x: 150, y: 125 },
    targetPosition: Position.Left,
  })
}

export const QuestionTemplate = (id) => {
  return ({
    id: id,
    type: 'question-template',
    // you can also pass a React component as a label
    data: { 
      title: 'Mẫu câu hỏi',
      value: '' 
    },
    position: { x: 150, y: 125 },
    targetPosition: Position.Left,
  })
}

export const ResponseTemplate = (id) => {
  return ({
    id: id,
    type: 'response-template',
    // you can also pass a React component as a label
    data: { 
      title: 'Câu trả lời nhanh',
      value: ""
    },
    position: { x: 150, y: 125 },
    targetPosition: Position.Left,
  })
}