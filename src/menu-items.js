// assets
import NavigationOutlinedIcon from '@mui/icons-material/NavigationOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import ChromeReaderModeOutlinedIcon from '@mui/icons-material/ChromeReaderModeOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import Diversity1RoundedIcon from '@mui/icons-material/Diversity1Rounded';
const icons = {
  NavigationOutlinedIcon: NavigationOutlinedIcon,
  HomeOutlinedIcon: HomeOutlinedIcon,
  ChromeReaderModeOutlinedIcon: ChromeReaderModeOutlinedIcon,
  HelpOutlineOutlinedIcon: HelpOutlineOutlinedIcon,
  SecurityOutlinedIcon: SecurityOutlinedIcon,
  AccountTreeOutlinedIcon: AccountTreeOutlinedIcon,
  BlockOutlinedIcon: BlockOutlinedIcon,
  AppsOutlinedIcon: AppsOutlinedIcon,
  ContactSupportOutlinedIcon: ContactSupportOutlinedIcon,
  Diversity1RoundedIcon: Diversity1RoundedIcon
};

// eslint-disable-next-line
export default {
  items: [
    {
      id: 'navigation',
      title: 'Communomy',
      caption: 'Dashboard',
      type: 'group',
      icon: icons['NavigationOutlinedIcon'],
      children: [
        {
          id: 'dashboard',
          title: 'Dashboard',
          type: 'item',
          icon: icons['HomeOutlinedIcon'],
          url: '/dashboard'
        }
      ]
    },
    {
      id: 'user_community',
      title: 'community',
      caption: 'Manage Community',
      type: 'group',
      icon: icons['NavigationOutlinedIcon'],
      children: [
        {
          id: 'community',
          title: 'My Community',
          type: 'item',
          icon: icons['Diversity1RoundedIcon'],
          url: '/manage-community'
        }
      ]
    },

    {
      id: 'pages',
      title: 'Pages',
      caption: 'Prebuild Pages',
      type: 'group',
      icon: icons['NavigationOutlinedIcon'],
      children: [
        {
          id: 'sample-page',
          title: 'Sample Page',
          type: 'item',
          url: '/sample-page',
          icon: icons['ChromeReaderModeOutlinedIcon']
        },
        {
          id: 'auth',
          title: 'Authentication',
          type: 'collapse',
          icon: icons['SecurityOutlinedIcon'],
          children: [
            {
              id: 'login-1',
              title: 'Login',
              type: 'item',
              url: '/application/login',
              target: true
            },
            {
              id: 'register',
              title: 'Register',
              type: 'item',
              url: '/application/register',
              target: true
            }
          ]
        }
      ]
    },
    {
      id: 'transactions',
      title: 'Transactions',
      type: 'group',
      icon: icons['AccountTreeOutlinedIcon'],
      children: [
        {
          id: 'sendtnx',
          title: 'Send Transaction',
          type: 'item',
          url: '/send-transcations',
          icon: icons['AppsOutlinedIcon']
        },
        {
          id: 'rcvdtnx',
          title: 'Recived Transcations',
          type: 'item',
          url: '/recived-transcations',
          icon: icons['FormatColorTextOutlinedIcon']
        }
      ]
    },

    {
      id: 'auth',
      title: 'Authentication',
      type: 'collapse',
      icon: icons['SecurityOutlinedIcon'],
      children: [
        {
          id: 'login-1',
          title: 'Login',
          type: 'item',
          url: '/application/login',
          target: true
        },
        {
          id: 'register',
          title: 'Register',
          type: 'item',
          url: '/application/register',
          target: true
        }
      ]
    },
    // {
    //   id: 'utils',
    //   title: 'Utils',
    //   type: 'group',
    //   icon: icons['AccountTreeOutlinedIcon'],
    //   children: [
    //     {
    //       id: 'util-icons',
    //       title: 'Icons',
    //       type: 'item',
    //       url: 'https://mui.com/material-ui/material-icons/',
    //       icon: icons['AppsOutlinedIcon'],
    //       external: true,
    //       target: true
    //     },
    //     {
    //       id: 'util-typography',
    //       title: 'Typography',
    //       type: 'item',
    //       url: '/utils/util-typography',
    //       icon: icons['FormatColorTextOutlinedIcon']
    //     }
    //   ]
    // },
    {
      id: 'support',
      title: 'Support',
      type: 'group',
      icon: icons['ContactSupportOutlinedIcon'],
      children: [
        {
          id: 'disabled-menu',
          title: 'Disabled Menu',
          type: 'item',
          url: '#',
          icon: icons['BlockOutlinedIcon'],
          disabled: true
        },
        {
          id: 'documentation',
          title: 'Documentation',
          type: 'item',
          url: 'https://codedthemes.gitbook.io/materially-react-material-documentation/',
          icon: icons['HelpOutlineOutlinedIcon'],
          chip: {
            label: 'Help?',
            color: 'primary'
          },
          external: true,
          target: true
        }
      ]
    }
  ]
};
