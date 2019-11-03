import { h, VNode } from "preact";
import { useState } from "preact/hooks";
import classnames from "classnames";

import Image from "../Image";
import { Character, Faction } from "../../data/character/type";
import {
  getRoutesFromPartnerEndings,
  getEndingContentForRoute,
} from "../../data/ending";
import { PartnerEndings, Route } from "../../data/ending/type";

import styles from "./styles.css";

type Props = {
  className?: string;
  characterA: Character;
  characterB: Character;
  characterASlug: string;
  characterBSlug: string;
  partnerEndings: PartnerEndings;
};

export default function PartnerEndingsCard(props: Props): VNode<Props> {
  const {
    className = "",
    characterA,
    characterB,
    characterASlug,
    characterBSlug,
    partnerEndings,
  } = props;
  const portraitAImageURL = `/${characterASlug}_l.png`;
  const portraitBImageURL = `/${characterBSlug}_l.png`;
  const availableRoutes = getRoutesFromPartnerEndings(partnerEndings);

  const [selectedRouteIndex, setSelectedRouteIndex] = useState(0);
  const selectedRoute = availableRoutes[selectedRouteIndex];
  const selectedEndingContent = getEndingContentForRoute(
    partnerEndings,
    selectedRoute,
  );

  return (
    <div className={classnames(styles.endingsCard, className)}>
      <div
        className={styles.left}
        style={{
          backgroundImage: `url(${getRouteLargeImageURL(selectedRoute)})`,
        }}
      >
        <div className={styles.character}>
          <img src={portraitAImageURL} className={styles.portrait} />
          <Badge name={characterA} className={styles.badge} />
        </div>
        <div className={classnames(styles.character, styles.characterB)}>
          <img
            src={portraitBImageURL}
            className={classnames(styles.portrait, styles.portraitB)}
          />
          <Badge
            name={characterB}
            className={classnames(styles.badge, styles.badgeB)}
          />
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.routes}>
          {availableRoutes.map((route: Route, index: number) => {
            const faction = getRouteFaction(route);
            return (
              <Image
                contentFill="height"
                key={route}
                srcSetPNG={`/${faction}_emblem@1x.png 1x, /${faction}_emblem@2x.png 2x, /${faction}_emblem@3x.png 3x`}
                srcSetWEBP={`/${faction}_emblem@1x.webp 1x, /${faction}_emblem@2x.webp 2x, /${faction}_emblem@3x.webp 3x`}
                placeholderSrc={`/${faction}_emblem.svg`}
                onClick={(): void => setSelectedRouteIndex(index)}
                className={classnames(styles.routeIcon, {
                  [styles.routeIconSelected]: selectedRouteIndex === index,
                })}
              />
            );
          })}
        </div>
        <div className={styles.content}>
          {selectedEndingContent != null
            ? selectedEndingContent
                .split("\n")
                .map((ending: string, index: number) => (
                  <div key={index}>{ending}</div>
                ))
            : null}
          <div className={styles.contentBackground} />
        </div>
      </div>
    </div>
  );
}

type BadgeProps = {
  className?: string;
  name: string;
};

function Badge(props: BadgeProps): VNode<BadgeProps> {
  const { className, name } = props;

  return (
    <div className={classnames(styles.badge, className)}>
      <SVGBadge />
      <span className={styles.badgeText}>{name}</span>
    </div>
  );
}

function SVGBadge(): VNode {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 318 42"
      className={styles.badgeSvg}
    >
      <defs>
        <radialGradient r="90%" id="gradient">
          <stop offset="0%" stopColor="#3c2e4f" />
          <stop offset="100%" stopColor="#0d0a11" />
        </radialGradient>
      </defs>
      <g>
        <path
          d="M1.75 21.25L20 2.75h278.62L317.5 20.5 299 39.37H19.62L1.75 21.25z"
          strokeOpacity="null"
          strokeWidth="3"
          stroke="#aba38c"
          fill="url(#gradient)"
        />
      </g>
    </svg>
  );
}

function getRouteFaction(route: Route): Faction {
  if (route === "Crimson Flower") {
    return "empire";
  } else if (route === "Azure Moon") {
    return "holy";
  } else if (route === "Verdant Wind") {
    return "alliance";
  } else {
    return "church";
  }
}

function getRouteLargeImageURL(route: Route): string {
  if (route === "Crimson Flower") {
    return "/empire_emblem_l.png";
  } else if (route === "Azure Moon") {
    return "/holy_emblem_l.png";
  } else if (route === "Verdant Wind") {
    return "/alliance_emblem_l.png";
  } else {
    return "/church_emblem_l.png";
  }
}
