import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Drawer from "@mui/material/Drawer";
import { alpha } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import ListItemButton from "@mui/material/ListItemButton";
import { List } from "@mui/material";
import { Collapse } from "@mui/material";
import RouterLink from "../../../Routes/RouteLink";
import { useResponsive } from "../../../hooks/useresponsive";
import Scrollbar from "../../Scrollbar";
import { NAV } from "../../../themes/config-layout";
import { icon, profileconfig } from "../../sidebar/sidebar-config";
import { ListItemText } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import DeleteConfirmationDialog from "../../ConfirmDialogPop";
import { persistor } from "../../../Redux/Store";
import { logout } from "../../../Redux/Slices/Auth";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { useFetchSideBarItemQuery } from "../../../Redux/SidebarRtkApiQuery";
import { formatKey } from "../../../ulits/Commonfuction";

export default function Nav({ openNav, onCloseNav }) {
  const upLg = useResponsive("up", "lg");
  const [openProfile, setopenProfile] = useState(false);
  const [openLogout, setopenLogout] = useState(false);
  const [pathname, setpathname] = useState("");
  const { data, refetch } = useFetchSideBarItemQuery();
  const dispatch = useDispatch();
  const { user_id, full_name } = useSelector((item) => item.auth.user);
  const { pathname: path } = useLocation();

  useEffect(() => {
    refetch();

    setpathname(path);
  }, [pathname]);

  const LogoutHandle = (e) => {
    e.preventDefault();
    setopenLogout(true);
  };

  const Logoutuser = () => {
    dispatch(logout());
    persistor.purge();
  };
  const profileItem = profileconfig(user_id);
  const renderAccount = (
    <Grid container direction="column">
      <Grid
        item
        sx={{
          my: 3,
          mx: 2.5,
          py: 2,
          px: 2.5,
          display: "flex",
          borderRadius: 1.5,
          alignItems: "center",
          ml: 6,
          bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
        }}
      >
        <Grid container alignItems="center">
          <Grid item>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h6" sx={{ color: "text.secondary" }}>
                {formatKey(full_name) || " "}
              </Typography>
            </div>
          </Grid>
          <Grid item onClick={() => setopenProfile(!openProfile)}>
            <Typography variant="body2" className="relative left-20">
              {openProfile ? (
                <ExpandLess className="relative right-11" />
              ) : (
                <ExpandMore className="relative right-11" />
              )}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Collapse in={openProfile} timeout="auto" unmountOnExit>
        <List component="div" disablePadding sx={{ marginLeft: 6 }}>
          {profileItem?.map((item) => (
            <div key={item.title}>
              <ListItemButton
                alignItems="center"
                component={RouterLink}
                href={item.title !== "Logout" && item.path}
                sx={{
                  minHeight: 44,
                  borderRadius: 0.75,
                  typography: "body2",
                  color: "text.secondary",
                  textTransform: "capitalize",
                  fontWeight: "fontWeightMedium",
                  "&:hover": {
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
                  },
                  ...(item.path === pathname && {
                    color: "primary.main",
                    fontWeight: "fontWeightSemiBold",
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
                    "&:hover": {
                      bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, 0.16),
                    },
                  }),
                }}
                onClick={(e) => item.title === "Logout" && LogoutHandle(e)}
              >
                <Grid
                  container
                  item
                  alignItems="center"
                  sx={{ width: 24, height: 24, mr: 2 }}
                >
                  {item.icon}
                </Grid>
                <ListItemText primary={item.title} />
              </ListItemButton>
            </div>
          ))}
        </List>
      </Collapse>
      <DeleteConfirmationDialog
        open={openLogout}
        title="Logout"
        onDelete={Logoutuser}
        onClose={() => setopenLogout(false)}
      />
    </Grid>
  );

  const renderMenu = (
    <Stack component="nav" spacing={0.5} sx={{ px: 2 }}>
      {data &&
        data?.map((item) => (
          <NavItem key={item.title} item={item} onCloseNav={onCloseNav} />
        ))}
    </Stack>
  );

  const renderContent = (
    <div
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
      className="overflow-y-scroll h-full w-200 bg-lightgreen"
    >
      <Typography
        variant="h5"
        sx={{
          color: "#9333ea",
          fontSize: "lg",
          mt: 5,
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        SUPPORT ELD
      </Typography>

      <div>
        {renderAccount}
        {renderMenu}
      </div>
      <Grid item sx={{ flexGrow: 1 }} />
    </div>
  );

  return (
    <Grid
      container
      direction="column"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.WIDTH },
        height: upLg ? 1 : "auto",
        position: upLg ? "fixed" : "relative",
        borderRight: (theme) =>
          upLg ? `dashed 1px ${theme.palette.divider}` : 0,
      }}
      className={upLg ? "scroll-m-2" : ""}
    >
      {upLg ? (
        renderContent
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: NAV.WIDTH,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Grid>
  );
}

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

function NavItem({ item, onCloseNav }) {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const { pathname } = useLocation();
  let active = item.path === pathname;
  useEffect(() => {
    setOpen(false);
  }, []);
  return (
    <div component="nav" key={item.title}>
      {/* Your content here */}

      {!item.children?.length ? (
        <Grid key={item.title}>
          <ListItemButton
            component={RouterLink}
            href={item.path}
            sx={{
              minHeight: 44,
              borderRadius: 0.75,
              typography: "body2",
              color: "text.secondary",
              textTransform: "capitalize",
              fontWeight: "fontWeightMedium",
              "&:hover": {
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
              },
              ...(active && {
                color: "primary.main",
                fontWeight: "fontWeightSemiBold",
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
                "&:hover": {
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
                },
              }),
            }}
            onClick={onCloseNav}
          >
            <Grid
              container
              alignItems="center"
              sx={{ width: 24, height: 24, mr: 2 }}
            >
              {icon(`${item.icon}`)}
            </Grid>
            <ListItemText primary={item.title} />
          </ListItemButton>
        </Grid>
      ) : (
        <div component="nav" key={item.title}>
          <ListItemButton onClick={handleClick}>
            <Grid
              container
              alignItems="center"
              sx={{ width: 24, height: 24, mr: 2 }}
            >
              {icon(`${item.icon}`)}
            </Grid>
            <ListItemText primary={item.title} />
            {open ? (
              <ExpandLess className="relative right-11" />
            ) : (
              <ExpandMore className="relative right-11" />
            )}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit className="ml-8">
            {item?.children.map((childItem, index) => (
              <List component="div" disablePadding key={index}>
                <ListItemButton
                  component={RouterLink}
                  href={childItem.path}
                  sx={{
                    minHeight: 44,
                    borderRadius: 0.75,
                    typography: "body2",
                    color: "text.secondary",
                    textTransform: "capitalize",
                    fontWeight: "fontWeightMedium",
                    "&:hover": {
                      bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, 0.16),
                    },
                    ...(childItem.path === pathname && {
                      color: "primary.main",
                      fontWeight: "fontWeightSemiBold",
                      bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, 0.08),
                      "&:hover": {
                        bgcolor: (theme) =>
                          alpha(theme.palette.primary.main, 0.16),
                      },
                    }),
                  }}
                  onClick={onCloseNav}
                >
                  <Grid
                    container
                    alignItems="center"
                    sx={{ width: 24, height: 24, mr: 2 }}
                  >
                    {icon(`${childItem.icon}`)}
                  </Grid>
                  <ListItemText primary={childItem.title} />
                </ListItemButton>
              </List>
            ))}
          </Collapse>
        </div>
      )}
    </div>
  );
}

NavItem.propTypes = {
  item: PropTypes.object,
  onCloseNav: PropTypes.func,
};
