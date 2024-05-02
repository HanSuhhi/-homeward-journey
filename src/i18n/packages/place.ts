export const cn_place = {
  welcome: "你来到了",
  bedroom: {
    name: "卧室",
    description: "晨光透过厚实的窗棂洒进房间，将一切笼罩在柔和的光影之中。木质地板经过岁月的洗礼，散发出一股淡淡的橡木香气。",
  },
};

export const en_place: typeof cn_place = {
  welcome: "You have arrived at the ",
  bedroom: {
    name: "Bedroom",
    description: "Morning light filters through thick window mullions, casting everything in soft shadows. The wooden floor, weathered by the passage of time, emanates a faint aroma of oak.",
  },
};

export type Places = Exclude<keyof typeof cn_place, "welcome">;
