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
    }
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
          },
          {
            id: "",
            title: "",
            type: "danger"
          }
        ] 
      }
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
    }
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
    }
  })
}

export const ResponseTemplate = (id) => {
  return ({
    id: id,
    title: 'Xác thực dữ liệu',
    type: 'response-template',
    data: { 
      request: {
        id: `request-${id}`,
        title: "Bot gửi cho khách hàng",
        message: null,
        type: 'message',
        color: "neutral"
      },
      success: {
        id: `success-${id}`,
        title: "Trả lời khi xác thực thành công",
        message: null,
        type: 'message',
        color: "success"
      },
      error: {
        id: `error-${id}`,
        title: "Trả lời khi xác thực thất bại",
        message: null,
        type: 'message',
        color: "danger"
      }
    }
  })
}