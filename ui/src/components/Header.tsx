import { useState } from "react";
import { AppBar, Box, Button, Drawer, Toolbar, Typography } from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from 'react-router-dom';
import { isProductsPage } from "../utils/productUtils";

const Header = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar>
        <Box sx={{width: '25px'}}>
          {!isProductsPage() && (
            <Box sx={{cursor: 'pointer'}} onClick={() => navigate(`/products`)}>
              <ArrowBackIosIcon />
            </Box>
          )}
        </Box>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Welcome
        </Typography>
        <Button color="inherit" onClick={toggleDrawer(true)}>Cart</Button>
      </Toolbar>
    </AppBar>
    <Drawer open={open} onClose={toggleDrawer(false)}>
      {'opened'}
    </Drawer>
  </Box>
  )
};

export default Header;