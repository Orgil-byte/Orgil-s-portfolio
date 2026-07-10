export type Greeting = Readonly<{
  text: string;
  holdMs: number;
}>;

export const greetings: readonly Greeting[] = [
  { text: "Hello", holdMs: 500 },
  { text: "Bonjour", holdMs: 230 },
  { text: "Ciao", holdMs: 230 },
  { text: "Hola", holdMs: 230 },
  { text: "Olá", holdMs: 230 },
  { text: "Hallo", holdMs: 230 },
  { text: "Сайн байна уу", holdMs: 950 },
];
