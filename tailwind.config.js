module.exports = {
  purge: ["./pages/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  darkMode: false,
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "940px",
      xl: "1024px",
    },
    extend: {
      colors: {
        "rb-gray-1": "#F2F2f2",
        "rb-gray-2": "#E6E6E6",
        "rb-gray-3": "#DADADA",
        "rb-gray-4": "#999999",
        "rb-gray-5": "#666666",
        "rb-gray-8": "#333333",
        "rb-gray-9": "#141414",
        "rb-gray-10": "#111111",
        "rb-green-4": "#39E687",
        "rb-green-5": "#1FCC6D",
        "rb-green-6": "#06B354",
        "rb-green-7": "#00993A",
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
      borderWidth: {
        3: "3px",
      },
    },
  },
  variants: {
    animation: ["responsive", "hover", "focus"],
    opacity: ["responsive", "group-hover", "hover", "disabled"],
    position: ["responsive", "group-hover", "hover"],
    backgroundColor: [
      "responsive",
      "hover",
      "focus",
      "active",
      "group-hover",
      "disabled",
    ],
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
  plugins: [require("@tailwindcss/ui"), require("@tailwindcss/typography")],
}
