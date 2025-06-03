"use client";
import HookTester from "@/components/HookTester";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    console.log("page3");
  }, []);
  return <HookTester />;
}
