export const NAV_ITEMS = [
  { label: 'My Properties', href: '/dashboard/property', icon: '/assets/icons/properties-icon.svg' },
  { label: 'Reports', href: '/dashboard/reports', icon: '/assets/icons/reports-icon.svg' },
  { label: 'Media', href: '/dashboard/media', icon: '/assets/icons/media-icon.svg' },
  { label: 'Profile', href: '/dashboard/account/profile', icon: '/assets/icons/user-accounts-icon.svg' },
] as const;

export const PROPERTY_TABS = [
  { label: 'Dashboard', href: '/dashboard/property' },
  { label: 'History', href: '/dashboard/property/history' },
  { label: 'Media', href: '/dashboard/property/media' },
] as const;

export const ACCOUNT_TABS = [
  { label: 'Profile', href: '/dashboard/account/profile' },
  { label: 'Update Password', href: '/dashboard/account/update-pass' },
] as const;
