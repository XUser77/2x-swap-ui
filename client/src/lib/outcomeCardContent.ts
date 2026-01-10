type colorType = "green" | "red" | "yellow";

type OutcomeCardProps = {
  title: string;
  subtitle: string;
  color: colorType;
  bullets: string[];
  footer: string;
}[];

export const slides: OutcomeCardProps = [
  {
    title: "Price Goes Up",
    subtitle: "The position is closed with profit",
    color: "green",
    bullets: [
      "The Liquidity Pool receives its share first",
      "User A receives the remaining profit",
      "Profit is shared according to predefined rules",
    ],
    footer:
      "User A benefits from upside while LPs earn from successful positions.",
  },
  {
    title: "Price Drops (up to 50%)",
    subtitle: "Loss is absorbed by User A",
    color: "yellow",
    bullets: [
      "The Liquidity Pool is fully returned",
      "User A absorbs the loss",
      "LP capital remains protected",
    ],
    footer: "Losses are first absorbed by the trader, not the pool.",
  },
  {
    title: "Price Drops Significantly",
    subtitle: "The loss exceeds User A’s deposit",
    color: "red",
    bullets: [
      "All available funds are returned to the Liquidity Pool",
      "User A loses their full deposit",
      "LPs may incur partial loss depending on market movement",
    ],
    footer: "Extreme market moves can impact both sides.",
  },
];
