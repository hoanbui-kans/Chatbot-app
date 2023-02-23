import React, { useState, useEffect } from 'react'
import { ModalLayout, ModalBody, ModalHeader, ModalFooter, Typography, Button, IconButton, Box, Stack, Checkbox} from '@strapi/design-system';
import { Table, Thead, Tbody, Th, Tr, Td, BaseCheckbox, Flex} from '@strapi/design-system';

import SocialButton from "../SocialLoginButton";
import { getListPages, getUserLongTermToken } from '../../../../api/Facebook';

import Rotate from '@strapi/icons/Rotate';
import Trash from '@strapi/icons/Trash';
import Plus from '@strapi/icons/Plus';

const CreateModal = ({ Connection, isLoading, setConnectionCreate, HandleCreateConnection, HandleUpdateConnection }) => {

  const [pages, setPages] = useState(false);
  const [selectPages, setSelectPages] = useState([]);

  const HandleCreate = async () => {
    let data = [];
    Array.from(selectPages).forEach((val) => {
      data.push({
        title: val.name,
        page_id: val.id,
        page_token: val.access_token
      })
    })
    await HandleCreateConnection(data);
    setSelectPages([]);
    setConnectionCreate(false)
  }

  const handleSocialLogin = async (user) => {
    const userToken = await getUserLongTermToken(user._token.accessToken);
    if(userToken){
      const pages = await getListPages(user._profile.id, userToken.access_token);
      if(Array.isArray(pages.data) && pages.data.length){
        setPages(pages.data)
      }
    } else {
      return null;
    }
  };
  
  const handleSocialLoginFailure = (err) => {
    console.error(err);
  };


  const toggleSelected = (page) => {
    if(selectPages.length){
      let newSelected = [];
      const validate = selectPages.find((val) => val.id == page.id);
      if(!validate){
        newSelected = [...selectPages, page];
        setSelectPages(newSelected)
      } else {
        newSelected = selectPages.filter((val) => val.id != page.id);
        setSelectPages(newSelected)
      }
    } else {
      setSelectPages([page])
    }
  }

  const validateSelected = (id) => {
    const validate = selectPages.find((val) => val.id == id);
    return validate ? true : false;
  }

  useEffect(() => {
    console.log('selectPages', selectPages);
  }, [selectPages])

  return (
    <>
      <ModalLayout onClose={() => setConnectionCreate(false)} labelledBy="Tạo mục tiêu mới">
          <ModalHeader>
            <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
              Thêm kết nối đến trang
            </Typography>
          </ModalHeader>
          <ModalBody>
            {
              Array.isArray(pages) && pages.length ? 
                <Stack spacing={3}>
                  <Table colCount={6} rowCount={4}>
                    <Thead>
                      <Tr>
                        <Th>
                          <Typography variant="sigma">ID</Typography>
                        </Th>
                        <Th>
                          <Typography variant="sigma">Tiêu đề trang</Typography>
                        </Th>
                        <Th>
                          <Typography variant="sigma">Hành động</Typography>
                        </Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      { 
                        pages.map(entry => {
                            let existed = false;
                            if(Array.isArray(Connection) && Connection.length){
                              existed = Connection.find((connection) => connection.page_id == entry.id);
                            }
                            if(!existed) {
                              const dataCreate = {
                                title: entry.name,
                                page_id: entry.id,
                                page_token: entry.access_token,
                              }
                              return (
                                <Tr key={entry.id}>
                                  <Td>
                                    <Typography textColor="neutral800">{entry.id}</Typography>
                                  </Td>
                                  <Td>
                                    <Typography textColor="neutral800">{entry.name}</Typography>
                                  </Td>
                                  <Td>
                                    <IconButton onClick={() => HandleCreateConnection([dataCreate])} label="Thêm mới" noBorder icon={<Plus />} />
                                  </Td>
                                </Tr>
                              )
                            }
                        })}
                    </Tbody>
                  </Table>
                    {/* {
                      pages.map((val) => {
                        const checked = validateSelected(val.id);
                        let existed = false;
                        if(Array.isArray(Connection) && Connection.length){
                          existed = Connection.find((connection) => connection.id == val.id);
                        }
                        return (
                            <Box background="neutral100" borderColor="neutral200" hasRadius padding={3} key={val.id} block>
                              {
                                existed ? <>
                                  {
                                    checked ? 
                                        <Checkbox onChange={() => toggleSelected(val)} checked>{val.name}</Checkbox>
                                      : <Checkbox onChange={() => toggleSelected(val)} unchecked>{val.name}</Checkbox>
                                    }
                                </> : 
                                <>
                                  <Typography>{val.name}</Typography>
                                  <Typography>Cập nhật</Typography>
                                  <Typography>Xóa</Typography>
                                </>
                                
                              }
                              
                            </Box>
                          )
                      })
                    } */}
                </Stack>
              :             
              <Stack horizontal spacing={3}>
                <Box background="neutral100" borderColor="neutral200" padding={3} hasRadius>
                    <SocialButton
                      provider="facebook"
                      appId={ENV.CLIENT_FB_APP_ID}
                      onLoginSuccess={handleSocialLogin}
                      onLoginFailure={handleSocialLoginFailure}
                      scope="pages_manage_metadata,pages_read_engagement,pages_messaging,email,public_profile,user_friends,pages_user_locale"
                    >
                      Đăng nhập với Facebook
                    </SocialButton>
                </Box>
              </Stack>
            }
          </ModalBody>
      </ModalLayout>
    </>
  )
}

export default CreateModal