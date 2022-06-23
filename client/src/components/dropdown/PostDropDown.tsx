import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
// import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
// import PersonAdd from '@mui/icons-material/PersonAdd';
// import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import { Edit, MoreVert, Settings } from '@mui/icons-material';
// import { useSelector } from 'react-redux';
// import { selectTheme } from '../../features/themeSlice'

interface Props {
    userId: string,
    postId: string,
    handleDelete: () => void

}

const PostDropDown: React.FC<Props> = ({ userId, postId, handleDelete }) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    // const darkTheme = useSelector(selectTheme)
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title={"post settings"}>
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <div className='cursor-pointer p-1.5 dark:hover:bg-navBar_BG hover:bg-light_feed_primary transition-all duration-300 ease-out rounded-lg'>
                            <MoreVert className='dark:text-navBar_Text text-black' />
                        </div>
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        backgroundColor: "#161B22",
                        color: "#F0F6FC",
                        // border: "1px solid #F0F6FC",
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: '#161B22',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem
                    onClick={handleDelete}
                >
                    <ListItemIcon>
                        <Settings fontSize="small" className='text-navBar_Text' />
                    </ListItemIcon>
                    <span className='font-sans'>
                        Delete
                    </span>
                </MenuItem>
                <MenuItem
                // onClick={logOut}
                >
                    <ListItemIcon>
                        <Edit fontSize="small" className='text-navBar_Text' />
                    </ListItemIcon>
                    <span className='font-sans'>
                        Edit
                    </span>
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
}

export default PostDropDown
