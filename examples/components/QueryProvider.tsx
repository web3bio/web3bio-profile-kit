"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
const client = new QueryClient();
export default function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log("page2");
  useEffect(() => {
    console.log("queryProvider loaded");
  }, []);
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
