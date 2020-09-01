const { colors, fontFamily } = require("tailwindcss/defaultTheme")

module.exports = {
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "940px",
      xl: "1024px",
    },
    extend: {
      colors: {
        "nextjs-body": "#111111",
        "nextjs-mid-gray": "#696969",
        "nextjs-blue": "#0070f3",
        "nextjs-blue-hover": "#68b5fb",
        "nextjs-cyan": "#79FFE1",
        "nextjs-violet": "#7928CA",
        "nextjs-alert": "#FF0080",
        "nextjs-accent-1": "#FAFAFA",
        "nextjs-accent-2": "#EAEAEA",
      },
      fontFamily: {
        sans: ['"Inter"', ...fontFamily.sans],
      },
      boxShadow: {
        default: "0px 1px 2px rgba(0, 0, 0, 0.20)",
        sm:
          "0px 0px 0px 1px rgba(133, 137, 147, 0.12), 0px 1px 3px 0px rgba(174, 180, 191, 0.20)",
        lg:
          "0px 12px 24px 0px rgba(33, 33, 38, 0.11), 0px 2px 8px 0px rgba(44, 44, 48, 0.10)",
        nextjs: "rgba(0, 0, 0, 0.12) 0px 8px 30px 0px",
      },
      transitionDuration: {
        5: "5ms",
      },
      lineHeight: {
        45: "4.5rem",
      },
    },
  },
  variants: {
    opacity: ["responsive", "group-hover", "hover"],
    position: ["responsive", "group-hover", "hover"],
    backgroundColor: ["responsive", "hover", "focus", "active", "group-hover"],
    textColor: ["responsive", "hover", "focus", "group-hover"],
    visibility: ["group-hover"],
    cursor: ["responsive", "hover", "disabled"],
    borderWidth: ["responsive", "hover", "focus"],
    borderColor: ["responsive", "hover", "focus", "active", "group-hover"],
    margin: ["responsive", "hover", "focus", "odd", "even", "group-hover"],
    shadow: ["responsive", "hover", "focus"],
    fontSize: ["responsive", "hover", "focus", "group-hover"],
    fontWeight: ["responsive", "hover", "focus", "active", "group-hover"],
    padding: ["responsive", "hover", "focus", "group-hover"],
    transitionDuration: ["responsive", "hover", "focus"],
    transitionTimingFunction: ["responsive", "hover", "focus", "group-hover"],
    gridTemplateColumns: ["responsive", "hover", "focus"],
    gap: ["responsive", "hover", "focus"],
  },
  plugins: [require("@tailwindcss/ui")],
}
