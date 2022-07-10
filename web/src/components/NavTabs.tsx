import React, { ReactElement, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import { useNavigate } from "react-router-dom";

interface LinkTabProps {
  label?: string;
  href: string;
  icon?: ReactElement<any, any>;
  iconPosition?: "top" | "bottom" | "end" | "start" | undefined;
}

function LinkTab(props: LinkTabProps) {
  const navigate = useNavigate();

  const toPage = (target: string) => {
    navigate(target);
  };

  return (
    <Tab
      component="a"
      onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
        toPage(props.href);
      }}
      {...props}
    />
  );
}

export default function NavTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs value={value} onChange={handleChange} orientation="vertical" aria-label="nav tabs example">
        <LinkTab label="Prediction" icon={<ImageSearchIcon />} iconPosition='start' href="prediction" />
        <LinkTab label="Log" icon={<FindInPageIcon />} iconPosition='start' href="log" />
      </Tabs>
    </Box>
  );
}
