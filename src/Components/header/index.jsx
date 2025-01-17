import PropTypes from "prop-types";

import Stack from "@mui/material/Stack";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";

import { useResponsive } from "../../hooks/useresponsive";

import { bgBlur } from "../../themes/css";

// import Iconify from 'src/components/iconify';
import ListIcon from "@mui/icons-material/List";

// import Searchbar from './common/searchbar';
import { NAV, HEADER } from "../../themes/config-layout";
// import AccountPopover from './common/account-popover';
// import LanguagePopover from './common/language-popover';
// import NotificationsPopover from './common/notifications-popover';

// ----------------------------------------------------------------------

export default function Header({ onOpenNav }) {
  const theme = useTheme();

  const lgUp = useResponsive("up", "lg");
  const renderContent = (
    <>
      {!lgUp && (
        <IconButton onClick={onOpenNav} sx={{ mr: 1 ,}}>
          <ListIcon icon="eva:menu-2-fill" />
        </IconButton>
      )}
      {/* <Searchbar /> */}
   
      <div sx={{ flexGrow: 1 }} />
      <Stack direction="row" alignItems="center" spacing={1}>
        {/* <LanguagePopover /> */}
        {/* <NotificationsPopover /> */}
        {/* <AccountPopover /> */}
      </Stack>
    </>
  );

  return (
    <AppBar
      sx={{
        boxShadow: "none",

        height: HEADER.H_MOBILE,
        zIndex: theme.zIndex.appBar + 1,
        ...bgBlur({
          color: theme.palette.background.default,
        }),
        transition: theme.transitions.create(["height"], {
          duration: theme.transitions.duration.shorter,
        }),
        ...(lgUp && {
          width: `calc(100% - ${NAV.WIDTH + 1}px)`,
          height: HEADER.H_DESKTOP,
        }),
      }}
    >
      <Toolbar
  sx={{
    display: 'flex',
    justifyContent: 'flex-start', // Align content at the start (left)
    alignItems: 'center', // Center items vertically
    height: 1,
    px: { lg: 5 },
  }}
>
  {renderContent}
</Toolbar>

    </AppBar>
  );
}

Header.propTypes = {
  onOpenNav: PropTypes.func,
};
