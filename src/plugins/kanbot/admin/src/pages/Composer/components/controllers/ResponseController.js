import React, { useState } from 'react'
import { Select, Option,  Searchbar, SearchForm, Box, Typography, Stack, Button, Grid, GridItem, Status } from '@strapi/design-system';

import Message from '@strapi/icons/Message';
import BulletList from '@strapi/icons/BulletList';
import PicturePlus from '@strapi/icons/PicturePlus';
import Puzzle from '@strapi/icons/Puzzle';

const ResponseController = () => {
    const [value, setValue] = useState('');
    return (
        <div>
            <Box paddingBottom={3}>
                <Typography>
                Mẫu câu trả lời
                </Typography>
            </Box>
            <Grid gap={3}>
                <GridItem col={4}>
                   <Button style={{height: 140}} fullWidth size="L" variant="success-light">
                        <Stack spacing={3}>
                                <span style={{height: 50, width:50, borderRadius: '50%'}} background="neutral200">
                                    <Message style={{ width: 50, height: 50}}/>
                                </span>
                                <Typography>Tin nhắn</Typography>
                        </Stack>
                   </Button>
                </GridItem>
                <GridItem col={4}>
                   <Button style={{height: 140}} fullWidth size="L" variant="secondary">
                        <Stack spacing={3}>
                                <span style={{height: 50, width:50, borderRadius: '50%'}} background="neutral200">
                                    <Puzzle style={{ width: 50, height: 50}}/>
                                </span>
                                <Typography>Câu trả lời nhanh</Typography>
                        </Stack>
                   </Button>
                </GridItem>
                <GridItem col={4}>
                   <Button style={{height: 140}} fullWidth size="L" variant="danger-light">
                        <Stack spacing={3}>
                                <span style={{height: 50, width:50, borderRadius: '50%'}} background="neutral200">
                                    <PicturePlus style={{ width: 50, height: 50}}/>
                                </span>
                                <Typography>Mẫu</Typography>
                        </Stack>
                   </Button>
                </GridItem>
            </Grid>
        </div>
    )
    }

export default ResponseController