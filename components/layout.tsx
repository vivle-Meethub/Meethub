import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
  seoTitle?: string;
}

export default function Layout({ seoTitle, children }: LayoutProps) {
  const router = useRouter();
  const onClick = () => {
    router.back();
  };
  return (
    <div>
      <Head>
        <title>{seoTitle} | MeetHub</title>
        <link rel="icon" type="image/x-icon" href="/static/favicon.ico" />
        <meta name="description" content="Generated by create next app" />
      </Head>
      <Header/>
      {children}
    </div>
  );
}
