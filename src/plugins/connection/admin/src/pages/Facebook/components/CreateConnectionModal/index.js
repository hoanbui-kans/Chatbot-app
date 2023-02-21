import React, { useState, useEffect } from 'react'
import { ModalLayout, ModalBody, ModalHeader, ModalFooter, Typography, Button, Box, Stack, Checkbox} from '@strapi/design-system';
import SocialButton from "../SocialLoginButton";
import { getListPages } from '../../../../api/Facebook';

const CreateModal = ({ setConnectionCreate, HandleCreateConnection }) => {

  const [title, setTitle] = useState('');
  const [options, setOptions] = useState([]);
  const [pages, setPages] = useState(false);
  const [selectPages, setSelectPages] = useState([]);

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


  const handleSocialLogin = async (user) => {
    console.log(user);
    const pages = await getListPages(user._profile.id, user._token.accessToken);
    if(Array.isArray(pages.data) && pages.data.length){
      setPages(pages.data)
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
    console.log(id, validate);
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
            <Stack horizontal spacing={3}>
              <Box background="neutral100" borderColor="neutral200" padding={3} hasRadius>
                <Typography>Facebook</Typography>
                <SocialButton
                  provider="facebook"
                  appId="385466796942941"
                  onLoginSuccess={handleSocialLogin}
                  onLoginFailure={handleSocialLoginFailure}
                  scope="pages_manage_metadata,pages_read_engagement,pages_messaging"
                  redirect="http://localhost:1337/api/connect/facebook/callback"
                >
                  Login with Facebook
                </SocialButton>
              </Box>
              <Box background="neutral100" borderColor="neutral200" padding={3} hasRadius>
                <Typography>Instagram</Typography>
              </Box>
              <Box background="neutral100" borderColor="neutral200" padding={3} hasRadius>
                <Typography>Zalo</Typography>
              </Box>
            </Stack>
            {
              Array.isArray(pages) && pages.length ? 
                <Stack spacing={3}>
                    {
                      pages.map((val) => {
                        const checked = validateSelected(val.id);
                        return (
                          <Box background="neutral100" borderColor="neutral200" hasRadius padding={3} key={val.id} block>
                            {
                              checked ? 
                                <Checkbox onChange={() => toggleSelected(val)} checked>{val.name}</Checkbox>
                              : <Checkbox onChange={() => toggleSelected(val)} unchecked>{val.name}</Checkbox>
                            }
                            
                          </Box>
                        )
                      })
                    }
                </Stack>
              : ""
            }
          </ModalBody>
          <ModalFooter startActions={<Button onClick={() => setConnectionCreate(false)} variant="tertiary">
                Hủy
          </Button>} endActions={<Button onClick={HandleCreate}>Lưu</Button>} />
      </ModalLayout>
    </>
  )
}

export default CreateModal