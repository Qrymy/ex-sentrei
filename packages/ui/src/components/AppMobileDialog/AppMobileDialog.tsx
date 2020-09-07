import Badge from "@material-ui/core/Badge";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import NotificationsIcon from "@material-ui/icons/Notifications";
import PersonIcon from "@material-ui/icons/Person";
import SettingsIcon from "@material-ui/icons/Settings";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import signout from "@sentrei/common/services/signout";
import DarkModeButton from "@sentrei/ui/components/DarkModeButton";
import IntlForm from "@sentrei/ui/components/IntlForm";
import MuiMenuItem from "@sentrei/ui/components/MuiMenuItem";

export interface Props {
  notificationCount?: number;
  anchorEl?: Element | ((element: Element) => Element) | null | undefined;
  open: boolean;
  onClose?:
    | ((event: {}, reason: "backdropClick" | "escapeKeyDown") => void)
    | undefined;
}

export default function AppMobileDialog({
  notificationCount,
  anchorEl,
  open,
  onClose,
}: Props): JSX.Element {
  const {t} = useTranslation();

  return (
    <Menu
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      id="mobile-menu"
      keepMounted
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
    >
      <MuiMenuItem href="/profile">
        <ListItemIcon>
          <PersonIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary={t("common:common.profile")} />
      </MuiMenuItem>
      <MuiMenuItem href="/notifications">
        <ListItemIcon>
          <Badge color="secondary" badgeContent={notificationCount}>
            <NotificationsIcon fontSize="small" />
          </Badge>
        </ListItemIcon>
        <ListItemText primary={t("common:common.notifications")} />
      </MuiMenuItem>
      <MuiMenuItem href="/settings">
        <ListItemIcon>
          <SettingsIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary={t("common:common.settings")} />
      </MuiMenuItem>
      <Divider />
      <MenuItem onClick={(): Promise<void> => signout()}>
        <ListItemIcon>
          <ExitToAppIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary={t("common:common.logout")} />
      </MenuItem>
      <Divider />
      <MenuItem disabled>
        <ListItemText primary={t("common:common.mode")} />
      </MenuItem>
      <ListItem>
        <IconButton>
          <DarkModeButton />
        </IconButton>
      </ListItem>
      <Divider />
      <MenuItem disabled>
        <ListItemText primary={t("common:common.language")} />
      </MenuItem>
      <ListItem>
        <IntlForm />
      </ListItem>
    </Menu>
  );
}
