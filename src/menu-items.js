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
// import { useUserAuth } from 'context/UserAuthContext';
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
// const {user}=useUserAuth();

// eslint-disable-next-line
export default {
  items: [
    {
      id: 'navigation',
      title: 'Communomy',
      caption: 'Manage Your Assets',
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
      id: 'master',
      title: 'Admin Section',
      type: 'master',
      icon: icons['AccountTreeOutlinedIcon'],
      children: [
        // {
        //   id: 'admin',
        //   title: 'Admin Dashboard',
        //   type: 'master',
        //   url: '/admin-dashboard',
        //   icon: icons['AppsOutlinedIcon']
        // },
        {
          id: 'Manage',
          title: 'Manage Assests',
          type: 'master',
          url: '/admin-assest',
          icon: icons['FormatColorTextOutlinedIcon']
        }
      ]
    },

    {
      id: 'transactions',
      title: 'Transactions',
      type: 'group',
      caption: 'View Transaction',
      icon: icons['AccountTreeOutlinedIcon'],
      children: [
        {
          id: 'sendtnx',
          title: 'Sent Transaction',
          type: 'item',
          url: '/send-transcations',
          icon: icons['FormatColorTextOutlinedIcon']
        },
        {
          id: 'rcvdtnx',
          title: 'Received Transcations',
          type: 'item',
          url: '/recived-transcations',
          icon: icons['FormatColorTextOutlinedIcon']
        }
      ]
    },

    {
      id: 'support',
      title: 'Support',
      caption: 'Contact Support',
      type: 'group',
      icon: icons['ContactSupportOutlinedIcon'],
      children: [
        {
          id: 'contact_menu',
          title: 'Contact Us',
          type: 'item',
          url: '#',
          icon: icons['ContactSupportOutlinedIcon']
        }
      ]
    }
  ]
};
