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
    type: 'respomse-template',
    // you can also pass a React component as a label
    data: { 
      title: 'Câu trả lời nhanh',
      value: {
        text: "Pick a color:",
        quick_replies:[
          {
            "content_type":"text",
            "title":"Red",
            "payload" : "messaging_postbacks",
            "image_url":"http://example.com/img/red.png"
          },{
            "content_type":"text",
            "title":"Green",
            "payload" : "messaging_postbacks",
            "image_url":"http://example.com/img/green.png"
          }
        ]
      } 
    },
    position: { x: 150, y: 125 },
    targetPosition: Position.Left,
  })
}