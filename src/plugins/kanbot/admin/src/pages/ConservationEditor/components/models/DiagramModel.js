import { Position } from 'reactflow';
import { useSelector } from 'react-redux';

export const DefaultTemplate = (id) => {
  return ({
    id: id,
    type: 'default-template',
    // you can also pass a React component as a label
    data: { 
      title: 'Mặc định',
      response: [
        {
          id: ``,
          title: "",
          type: "primary"
        }
      ] 
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
        response: [
          {
            id: "",
            title: "",
            type: "",
            port: "left",
            type: "success"
          },
          {
            id: "",
            title: "",
            type: "",
            port: "right",
            type: "danger"
          }
        ] 
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
      response: [
        {
          id: ``,
          title: "",
          type: "primary"
        }
      ] 
    },
    position: { x: 150, y: 125 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  })
}

export const ResponseTemplate = (id) => {
  return ({
    id: id,
    type: 'response-template',
    // you can also pass a React component as a label
    data: { 
      title: 'Xác thực dữ liệu',
      request: {
        id: "",
        title: ""
      },
      response: [
        {
          id: ``,
          title: "",
          type: "success"
        },
        {
          id: ``,
          title: "",
          type: "danger"
        }
      ] 
    },
    position: { x: 150, y: 125 },
    targetPosition: Position.Left,
  })
}