import davidKim from "../../assets/avatars/david-kim.svg";
import emmaWilson from "../../assets/avatars/emma-wilson.svg";
import jamesWright from "../../assets/avatars/james-wright.svg";
import lisaNakamura from "../../assets/avatars/lisa-nakamura.svg";
import marcusJohnson from "../../assets/avatars/marcus-johnson.svg";
import oliviaMartinez from "../../assets/avatars/olivia-martinez.svg";
import ryanObrien from "../../assets/avatars/ryan-obrien.svg";
import sarahChen from "../../assets/avatars/sarah-chen.svg";

const avatarFallbackByFile = {
    "david-kim.svg": davidKim,
    "emma-wilson.svg": emmaWilson,
    "james-wright.svg": jamesWright,
    "lisa-nakamura.svg": lisaNakamura,
    "marcus-johnson.svg": marcusJohnson,
    "olivia-martinez.svg": oliviaMartinez,
    "ryan-obrien.svg": ryanObrien,
    "sarah-chen.svg": sarahChen,
};

export function getFriendAvatar(picture) {
    const seed = picture?.replace(/\.svg$/i, "") ?? "friend";

    return `https://i.pravatar.cc/160?u=keenkeeper-${seed}`;
}

export function getFriendAvatarFallback(picture) {
    return avatarFallbackByFile[picture] ?? emmaWilson;
}
