import React, { useState } from 'react'
import { Stack, Typography } from '@strapi/design-system';
import { Pagination, Dots, PageLink, PreviousLink, NextLink } from '@strapi/design-system';
import { Select, Option } from '@strapi/design-system';
import { Searchbar, SearchForm, Grid, GridItem } from '@strapi/design-system';
import { Card, CardHeader, CardContent, CardAsset,  CardBody, CardCheckbox, CardTimer, CardTitle, CardSubtitle, CardBadge } from '@strapi/design-system';

const TableContent = ({ assets }) => {
    if(Array.isArray(assets) && assets.length) {
        return (
            <Grid justifyContent="start" gap={4}>
                {
                    assets.map((asset) => {
                        return (
                            <GridItem key={asset.id} col={3}>
                                <Card >
                                    <CardHeader>
                                        <CardCheckbox/>
                                        <CardAsset src={asset.url} />
                                    </CardHeader>
                                    <CardBody>
                                        <CardContent>
                                            <CardTitle>{asset.name}</CardTitle>
                                            <CardSubtitle>{asset.size} KB</CardSubtitle>
                                        </CardContent>
                                    </CardBody>
                                </Card>
                            </GridItem>
                        )
                    })
                }
            </Grid>
        )
    } 
    return (
        <Typography>None</Typography>
    )
}

const index = ({ assets }) => {

    const [value, setValue] = useState();
    const [error, toggleError] = useState();
    const [disabled, toggleDisabled] = useState();
    const [content, setContent] = useState("");
    const [paged, setPaged] = useState(1);

    return (
            <Stack spacing={6}>
                <SearchForm>
                    <Searchbar name="searchbar" onClear={() => setContent('')} value={content} onChange={e => setContent(e.target.value)} clearLabel="Clearing the plugin search" placeholder="Tìm kiếm hình ảnh...">
                        Tìm kiếm hình ảnh...
                    </Searchbar>
                </SearchForm>
                <TableContent assets={assets}/>
                <Stack horizontal spacing={3}>
                    <Select 
                        id="select1" 
                        aria-label="Choose your meal" 
                        placeholder="Phân trang" 
                        onClear={() => setValue(undefined)} 
                        clearLabel="Clear the meal" 
                        error={error} 
                        value={value} 
                        onChange={setValue} 
                        disabled={disabled} 
                        selectButtonTitle="Carret Down Button">
                            <Option value="pizza">12</Option>
                            <Option value="hamburger">24</Option>
                            <Option value="bagel">36</Option>
                    </Select>
                    <Pagination activePage={1} pageCount={26}>
                            <PreviousLink to="/1">Go to previous page</PreviousLink>
                            <PageLink number={1} to="/1">
                                Go to page 1
                            </PageLink>
                            <PageLink number={2} to="/2">
                                Go to page 2
                            </PageLink>
                            <Dots>And 23 other links</Dots>
                            <PageLink number={25} to="/25">
                                Go to page 3
                            </PageLink>
                            <PageLink number={26} to="/26">
                                Go to page 26
                            </PageLink>
                            <NextLink to="/3">Go to next page</NextLink>
                    </Pagination>
                </Stack>
            </Stack>
  )
}

export default index