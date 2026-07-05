export type CharacterPoseId =
  | "welcomePose"
  | "ctaPose"
  | "holdingTablet"
  | "thumbsUp"
  | "thinking"
  | "pointingLeft"
  | "pointingRight"
  | "confidentArms"
  | "casualStanding"
  | "celebratingGrowth"
  | "waving"
  | "frontView"
  | "threeQuarterView";

export interface CharacterAsset {
  id: CharacterPoseId;
  src: string;
  /** Accessible alt text describing the founder's pose/expression, not the fact that it's an image. */
  alt: string;
}

export const characterAssets: Record<CharacterPoseId, CharacterAsset> = {
  welcomePose: {
    id: "welcomePose",
    src: "/assets/characters/welcome-pose.png",
    alt: "Ismael standing with arms open in a welcoming gesture",
  },
  ctaPose: {
    id: "ctaPose",
    src: "/assets/characters/cta-pose.png",
    alt: "Ismael gesturing toward the viewer with one hand open and one pointing",
  },
  holdingTablet: {
    id: "holdingTablet",
    src: "/assets/characters/holding-tablet.png",
    alt: "Ismael holding a tablet and smiling at the camera",
  },
  thumbsUp: {
    id: "thumbsUp",
    src: "/assets/characters/thumbs-up.png",
    alt: "Ismael giving a thumbs up",
  },
  thinking: {
    id: "thinking",
    src: "/assets/characters/thinking.png",
    alt: "Ismael with his hand on his chin in a thoughtful pose",
  },
  pointingLeft: {
    id: "pointingLeft",
    src: "/assets/characters/pointing-left.png",
    alt: "Ismael smiling and pointing to his left",
  },
  pointingRight: {
    id: "pointingRight",
    src: "/assets/characters/pointing-right.png",
    alt: "Ismael smiling and pointing to his right",
  },
  confidentArms: {
    id: "confidentArms",
    src: "/assets/characters/confident-arms.png",
    alt: "Ismael standing confidently with arms crossed",
  },
  casualStanding: {
    id: "casualStanding",
    src: "/assets/characters/casual-standing.png",
    alt: "Ismael standing casually with hands in his pockets",
  },
  celebratingGrowth: {
    id: "celebratingGrowth",
    src: "/assets/characters/celebrating-growth.png",
    alt: "Ismael celebrating with both fists raised",
  },
  waving: {
    id: "waving",
    src: "/assets/characters/waving.png",
    alt: "Ismael waving hello",
  },
  frontView: {
    id: "frontView",
    src: "/assets/characters/front-view.png",
    alt: "Ismael facing forward with arms crossed",
  },
  threeQuarterView: {
    id: "threeQuarterView",
    src: "/assets/characters/34-view.png",
    alt: "Ismael in a three-quarter angle portrait with arms crossed",
  },
};

export const characterAssetList: CharacterAsset[] = Object.values(characterAssets);

/**
 * Reserved for logo files once brand marks are added to public/assets/logos.
 * Folder exists but is currently empty — no files to reference yet.
 */
export const logoAssets = {} as const;

/**
 * Reserved for general marketing imagery once files are added to public/assets/images.
 * Folder exists but is currently empty — no files to reference yet.
 */
export const imageAssets = {} as const;

/**
 * Reserved for production video files once added to public/assets/videos.
 * Folder exists but is currently empty — raw candidates only live under references/videos
 * (moodboard/source material, not served from the public site).
 */
export const videoAssets = {} as const;
