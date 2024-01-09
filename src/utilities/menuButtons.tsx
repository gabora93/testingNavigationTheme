import { i18n, translate } from '../i18n/i18n';
export type MenuButton = {
    label: string;
    route: string;
    description? :string;
};
export const menuButtons: MenuButton[] =
    [
        { label: 'bigMenu.profile', route: "profile" },
        { label: 'bigMenu.settings', route: "settings" },
        { label: 'privacyPolicy.headerTitle', route: "privacy_policy" },
        { label: 'bigMenu.about', route: "about" }
    ];

    export const profileButtons: MenuButton[] =
    [
        { label: 'profile.changeEmailUserName', route: "change_username" },
        { label: 'profile.changePassword', route: "change_password" },
        { label: 'profile.updateNotification', route: "updateToken" },
        { label: 'changelanguage.btnChangeLanguage', route: "modal" },
        { label: 'profile.dissableAccount', route: "about" },
        { label: 'profile.logout', route: "logout" },
    ];

    export const eligibilityButtons: MenuButton[] = 
    [
        { label: 'eligibilityPaidScreen.btnLoadRackEligibility', route: "order_elegibility", description: 'eligibilityPaidScreen.descriptionLoadRackEligibility'},
        { label: 'eligibilityPaidScreen.btnOrderElegibility', route: "load_elegibility", description: 'eligibilityPaidScreen.descriptionOrderElegibility' },
    ]
