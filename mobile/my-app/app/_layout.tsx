import { ThemeProvider } from "../context/ThemeContext";
import "../styles/global.css";
import { Stack } from "expo-router";

export default function RootLayout() {
  return <ThemeProvider>
    <Stack/>
  </ThemeProvider>;
}
