import React, { useState, useRef } from 'react'

import { 
    Typography,
    Button, 
    Stack, 
    Grid,
    GridItem,
    ModalLayout,
    ModalBody,
    ModalHeader,
    Box,
    Icon
} from '@strapi/design-system';

import { ResponseTemplate, QuestionTemplate } from '../models/DiagramModel';
import { Plus, Envelop } from '@strapi/icons'
import { addNode } from '../../../slice/conservation-builder-slice';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { Puzzle, List, Picture, Store, Slideshow, ShoppingCart, Folder, Information, Magic, Clock, Star, Phone } from '@strapi/icons';
import ListNode from '../nodes/ListNode';
import PictureNode from '../nodes/PictureNode';
import StoreNode from '../nodes/StoreNode';
import ServiceNode from '../nodes/ServiceNode';
import DetailProductNode from '../nodes/DetailProductNode';
import OrderInfoNode from '../nodes/OrderInfoNode';
import InforNode from '../nodes/InforNode';
import CreateOrderNode from '../nodes/CreateOrderNode';
import WaitingNode from '../nodes/WaitingNode';
import RatingNode from '../nodes/RatingNode';
import PuzzleNode from '../nodes/PuzzleNode';

const Node = [
    {
        name: 'Xác thực dữ liệu',
        description: 'Xác thực nội dung đề nghị khách hàng trả lời',
        icon: Phone,
        color: 'success-light',
        template: ResponseTemplate
    },
    {
        name: 'Mẫu Lựa chọn',
        description: 'Tạo danh sách lựa chọn gồm 2 hay nhiều yếu tố',
        icon: List,
        color: 'danger-light',
        template: ListNode
    },
    {
        name: 'Mẫu hình ảnh',
        description: 'Gửi mẫu hình ảnh',
        icon: Picture,
        color: 'danger-light',
        template: PictureNode
    },
    {
        name: 'Danh sách sản phẩm',
        description: 'Gửi danh sách sản phẩm',
        icon: Store,
        color: 'danger-light',
        template: StoreNode
    },
    {
        name: 'Gửi thông tin dịch vụ',
        description: 'Gửi thông tin dịch vụ dành cho khách hàng',
        icon: Slideshow,
        color: 'danger-light',
        template: ServiceNode
    },
    {
        name: 'Gửi thông tin sản phẩm',
        description: 'Gửi thông tin sản phẩm dành cho khách hàng',
        icon: ShoppingCart,
        color: 'danger-light',
        template: DetailProductNode
    },
    {
        name: 'Gửi thông tin đơn đặt hàng',
        description: 'Gửi thông tin đơn đặt dành cho khách hàng',
        icon: Folder,
        color: 'danger-light',
        template: OrderInfoNode
    },
    {
        name: 'Gửi thông tin giới thiệu',
        description: 'Gửi thông tin giới thiệu cho khách hàng',
        icon: Information,
        color: 'danger-light',
        template: InforNode
    },
    {
        name: 'Tạo đơn hàng',
        description: 'Tạo đơn hàng trên dữ liệu khách hàng đã đề cập trước đó',
        icon: Magic,
        color: 'danger-light',
        template: CreateOrderNode
    },
    {
        name: 'Đợi',
        description: 'Gửi tin nhắn tiếp theo trong một khoảng thời gian chờ',
        icon: Clock,
        color: 'secondary',
        template: WaitingNode
    },
    {
        name: 'Mẫu đánh giá',
        description: 'Gửi mẫu đánh giá dành cho khách hàng',
        icon: Star,
        color: 'danger-light',
        template: RatingNode
    },
    {
        name: 'Chuyển đoạn hội thoại',
        description: 'Chuyển sang một đoạn hội thoại khách thích hợp hơn',
        icon: Puzzle,
        color: 'danger-light',
        template: PuzzleNode
    }
]

const index = ({ setAddNode }) => {
    const dispatch = useDispatch();

    const HandleAddNoteToFlow = (template) => {
        const NewNode = template(uuidv4());
        dispatch(addNode(NewNode));
        setAddNode(false)
    }

    return (
        <div className="x_create_node">
           <Button startIcon={<Plus />}></Button> 
            <ModalLayout onClose={() => setAddNode(false)} labelledBy="title">
                <ModalHeader>
                    <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
                        Thêm trường dữ liệu
                    </Typography>
                </ModalHeader>
                <ModalBody background="neutral100">
                    <Stack spacing={3}>
                        <Typography fontWeight="bold">Thêm trường dữ liệu cho đoạn hội thoại</Typography>
                            <Grid 
                                gap={{
                                    desktop: 5,
                                    tablet: 2,
                                    mobile: 1
                                }}>
                                {
                                    Node.map((val, index) => {
                                        return (
                                            <GridItem key={index} col={6} s={6} xs={12}>
                                                <Stack 
                                                    spacing={4}
                                                    horizontal
                                                    onClick={() => HandleAddNoteToFlow(val.template)} 
                                                    background="neutral0"
                                                    hasRadius
                                                    borderColor="neutral200"
                                                    padding={4}>
                                                        <Box padding={3} hasRadius background="secondary100">
                                                            <Icon color="secondary600" width={`${30 / 16}rem`} height={`${30 / 16}rem`} as={val.icon} />
                                                        </Box>
                                                        <Stack spacing={1}>
                                                            <Typography variant="delta">{val.name}</Typography>
                                                            <Typography variant="pi">{val.description}</Typography>
                                                        </Stack>
                                                </Stack>
                                            </GridItem>
                                        )
                                    })
                                }
                        </Grid>
                    </Stack>
                </ModalBody>
            </ModalLayout>
        </div>
    )
}

export default index