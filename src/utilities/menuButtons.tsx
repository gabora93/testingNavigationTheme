import { i18n } from '../i18n/i18n';
export type MenuButton = {
    label: string;
    route: string;
};
export const menuButtons: MenuButton[] =
    [
        { label: i18n.t('bigMenu.profile'), route: "profile" },
        { label: i18n.t('bigMenu.settings'), route: "settings" },
        { label: i18n.t('privacyPolicy.headerTitle'), route: "privacy_policy" },
        { label: i18n.t('bigMenu.about'), route: "about" }
    ];

    export const profileButtons: MenuButton[] =
    [
        { label: i18n.t('profile.changeEmailUserName'), route: "change_username" },
        { label: i18n.t('profile.changePassword'), route: "change_password" },
        { label: i18n.t('profile.updateNotification'), route: "privacy_policy" },
        { label: i18n.t('profile.logout'), route: "about" },
        { label: i18n.t('profile.dissableAccount'), route: "about" },
    ];
